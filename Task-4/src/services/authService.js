import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { UserRepo } from '../repositories/UserRepo.js';
import { ElevatedTokenRepo } from '../repositories/ElevatedTokenRepo.js';
import { AppError } from '../middleware/utils/AppError.js';

export class AuthService {
    constructor() {
        this.userRepo = new UserRepo();
        this.elevatedTokenRepo = new ElevatedTokenRepo();
    }

    async register(userData) {
        const { username, email, password } = userData;
        
        // Check if user already exists
        const existingUser = await this.userRepo.findByEmail(email);
        if (existingUser) {
            throw new AppError(400, 'Email already exists');
        }

        // Hash password
        const password_hash = await bcrypt.hash(password, 10);
        
        // Create user
        const user = await this.userRepo.create({
            username,
            email,
            password_hash
        });

        return {
            id: user.id,
            username: user.username,
            email: user.email
        };
    }

    async login(credentials) {
        const { email, password } = credentials;
        
        // Find user
        const user = await this.userRepo.findByEmail(email);
        if (!user) {
            throw new AppError(401, 'Invalid credentials');
        }

        // Check password
        const isValidPassword = await bcrypt.compare(password, user.password_hash);
        if (!isValidPassword) {
            throw new AppError(401, 'Invalid credentials');
        }

        // Generate JWT
        let payload;
        if (email === process.env.ADMIN_EMAIL) {
            payload = { isAdmin: true, adminEmail: email };
        } else {
            payload = { userId: user.id };
        }

        const accessToken = jwt.sign(
            payload,
            process.env.JWT_SECRET || 'supersecret',
            { expiresIn: process.env.JWT_EXPIRES_IN || '30m' }
        );

        return { accessToken };
    }

    async requestElevatedToken(userId, action) {
        // Generate opaque token
        const token = uuidv4();
        
        // Calculate expiration
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + (parseInt(process.env.ELEVATED_TOKEN_TTL_MIN) || 10));
        
        // Save token
        await this.elevatedTokenRepo.create({
            token,
            userId,
            action,
            expiresAt
        });

        // Get user for email
        const user = await this.userRepo.findById(userId);
        if (!user) {
            throw new AppError(404, 'User not found');
        }

        // Send email (mock service)
        await this.sendMail(
            user.email,
            'Elevated Access Request',
            `Click the link to ${action}: http://localhost:3000/api/me/${action}/${token}`
        );

        return { success: true };
    }

    async changeEmail(userId, newEmail, token) {
        // Check if email already exists
        const existingUser = await this.userRepo.findByEmail(newEmail);
        if (existingUser) {
            throw new AppError(400, 'Email already exists');
        }

        // Update user email
        await this.userRepo.update(userId, { email: newEmail });
        
        // Get updated user
        const user = await this.userRepo.findById(userId);
        
        return {
            id: user.id,
            email: user.email
        };
    }

    async changePassword(userId, newPassword) {
        // Hash new password
        const password_hash = await bcrypt.hash(newPassword, 10);
        
        // Update user password
        await this.userRepo.update(userId, { password_hash });
        
        return { success: true };
    }

    async sendMail(to, title, content) {
        try {
            await fetch('http://localhost:1186/api/internal/mail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    to,
                    from: 'no-reply@my-todo-application.com',
                    content,
                    type: 'html',
                    title
                }),
            });
        } catch (error) {
            console.error('Mail service error:', error);
            // Don't throw error for mail service failure
        }
    }
}
