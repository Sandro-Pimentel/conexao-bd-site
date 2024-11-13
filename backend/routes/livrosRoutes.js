const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/post', async (req, res) => {
    const {nome, autor, genero, preco} = req.body;

    try {
        const [result] = await db.execute(
            'INSERT INTO livros(nome, autor, genero, preco) VALUES (?, ?, ?, ?);',
            [nome, autor, genero, preco]
        );

        res.status(201).json({message: 'Livro cadastrado com sucesso!'});
    } catch(error) {
        res.status(500).json({error: error.message});
    }
});

router.get('/', async (req, res) => {
    try {
        const [rows] = await db.execute(
            'SELECT * FROM livros;'
        );

        if(rows.length > 0) {
            res.status(200).json(rows);
        } else {
            res.status(404).json({message: 'Credenciais inválidas!'});
        }
    } catch(error) {
        res.status(500).json({message: error.message});
    }
});

router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const {nome, autor, genero, preco} = req.body;

    try {
        const [result] = await db.execute(
            'UPDATE livros SET nome = ?, autor = ?, genero = ?, preco = ? WHERE id = ?',
            [nome, autor, genero, preco, id]
        );

        if(result.affectedRows > 0) {
            res.status(201).json({message: 'Livro atualizado com sucesso!'});
        } else {
            res.status(404).json({message: 'Livro não encontrado'});
        }

    } catch(error) {
        res.status(500).json({message: error.message});
    }
});

router.delete('/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const [result] = await db.execute(
            'DELETE FROM livros WHERE id = ?',
            [id]
        );
        
        if(result.affectedRows > 0) {
            res.status(201).json({message: 'Livro deletado com sucesso!'});
        } else {
            res.status(404).json({message: 'Livro não encontrado'});
        }
    } catch(error) {
        res.status(500).json({message: error.message});
    }
});

module.exports = router;