import { users } from "../db/User.js";
import { todos } from "../db/Todo.js";
import { v4 as uuidv4 } from 'uuid';

export const getAllUsers = (req, res) => {
    const usersWithoutPassword = users.map(user => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    });
    res.status(200).json(usersWithoutPassword);
};

export const getUserById = (req, res) => {
    const id = req.params.id;
    const user = users.find(user => user.id === id);
    
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    
    const { password, ...userWithoutPassword } = user;
    res.status(200).json(userWithoutPassword);
};

export const addUser = (req, res) => {
    const { username, email, password } = req.body;
    
    const newUser = {
        id: uuidv4(),
        username,
        email,
        password
    };
    users.push(newUser);
    
    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json(userWithoutPassword);
};

export const getUserTodos = (req, res) => {
    const userId = req.params.id;
    
    const user = users.find(user => user.id === userId);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    
    const userTodos = todos.filter(todo => todo.userId === userId);
    res.status(200).json(userTodos);
};