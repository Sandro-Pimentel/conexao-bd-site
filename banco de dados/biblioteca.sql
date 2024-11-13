CREATE DATABASE biblioteca;

USE biblioteca;

CREATE TABLE livros(
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(70) NOT NULL,
    autor VARCHAR(60) NOT NULL,
    genero VARCHAR(35) NOT NULL,
    preco DECIMAL(6,2) NOT NULL
);