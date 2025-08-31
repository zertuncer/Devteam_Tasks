import { todos } from "../db/Todo.js";
import { v4 as uuidv4 } from 'uuid';

export const getAllTodos = (req, res) => {
    let filteredTodos = [...todos];
    
    if (req.query.completed !== undefined) {
        const completed = req.query.completed === 'true';
        filteredTodos = filteredTodos.filter(todo => todo.completed === completed);
    }
    
    if (req.query.q) {
        const searchTerm = req.query.q.toLowerCase();
        filteredTodos = filteredTodos.filter(todo => 
            todo.title.toLowerCase().includes(searchTerm) ||
            todo.description.toLowerCase().includes(searchTerm)
        );
    }
    
    res.status(200).json(filteredTodos);
};

export const getTodoById = (req, res) => {
    const id = req.params.id;
    const todo = todos.find(todo => todo.id === id);
    
    if (!todo) {
        return res.status(404).json({ error: "Todo not found" });
    }
    
    res.status(200).json(todo);
};

export const addTodo = (req, res) => {
    const { title, description, userId, completed = false } = req.body;
    
    const newTodo = {
        id: uuidv4(),
        title,
        description,
        completed,
        userId
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
};

export const updateTodo = (req, res) => {
    const id = req.params.id;
    const { title, description, completed } = req.body;
    
    const todoIndex = todos.findIndex(todo => todo.id === id);
    
    if (todoIndex === -1) {
        return res.status(404).json({ error: "Todo not found" });
    }
    
    todos[todoIndex] = { 
        ...todos[todoIndex], 
        title, 
        description, 
        completed 
    };
    res.status(200).json(todos[todoIndex]);
};

export const deleteTodo = (req, res) => {
    const id = req.params.id;
    
    const todoIndex = todos.findIndex(todo => todo.id === id);
    
    if (todoIndex === -1) {
        return res.status(404).json({ error: "Todo not found" });
    }
    
    todos.splice(todoIndex, 1);
    res.status(204).send();
};

export const patchTodo = (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    
    const todoIndex = todos.findIndex(todo => todo.id === id);
    
    if (todoIndex === -1) {
        return res.status(404).json({ error: "Todo not found" });
    }
    
    todos[todoIndex] = { 
        ...todos[todoIndex], 
        ...updates 
    };
    res.status(200).json(todos[todoIndex]);
};