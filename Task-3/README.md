# Task-3 — Todo API (TypeORM + PostgreSQL + Zod) [JS/ESM]

- Ortam değişkeni kullanılmıyor. Bağlantı ayarları `src/data-source.js` içinde sabit (localhost:5432, postgres/postgres, db: todo_db). İstersen bu dosyayı güncelle.
- TypeORM synchronize: false; şema migration ile yönetilir.

ERD (metin)
- User: id (uuid, pk), username (unique), email (unique), password_hash, created_at
- Todo: id (uuid, pk), title, description, completed, user_id (fk → users.id, on delete cascade), created_at, updated_at
- İlişki: User (1) — (N) Todo
- Index: todos.completed, todos.created_at

Komutlar
- npm run typeorm:migrate → migration:run
- npm run typeorm:revert → migration:revert
- npm run dev → nodemon ile API
- npm start → prod başlatma

API Notları
- Şifre response’larda dönmez.
- Zod hataları: 400, şema: { error: 'VALIDATION_ERROR', errors: [{ path, message }] }
- GET /api/todos: completed=true|false, q, page, limit, sort=createdAt, order=asc|desc
- GET /api/users/:id/todos: page, limit, completed
- Var olmayan userId → 404 (tercihimiz).

Migration İlk Çalıştırma
1) PostgreSQL’de `todo_db` oluştur ve kullanıcı/şifreyi `src/data-source.js` ile eşle.
2) npm run typeorm:migrate
