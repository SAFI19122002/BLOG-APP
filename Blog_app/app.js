// const express = require('express');
import express from "express";
const app = express();
const port = 3000;

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Dummy data for blog posts
let posts = [
    { id: 1, title: 'First Post', content: 'This is the first blog post.' },
    { id: 2, title: 'Second Post', content: 'This is the second blog post.' },
];

// Home page route - view all posts
app.get('/', (req, res) => {
    res.render('index', { posts: posts });
});

// New post form route
app.get('/new', (req, res) => {
    res.render('new');
});

// Create new post route
app.post('/create', (req, res) => {
    const { title, content } = req.body;
    const id = posts.length + 1;
    posts.push({ id, title, content });
    res.redirect('/');
});

// View single post route
app.get('/post/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(post => post.id === id);
    res.render('view', { post: post });
});

// Edit post form route
app.get('/edit/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(post => post.id === id);
    res.render('edit', { post: post });
});

// Update post route
app.post('/update/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, content } = req.body;
    const post = posts.find(post => post.id === id);
    post.title = title;
    post.content = content;
    res.redirect('/');
});

// Delete post route
app.post('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);
    posts = posts.filter(post => post.id !== id);
    res.redirect('/');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
