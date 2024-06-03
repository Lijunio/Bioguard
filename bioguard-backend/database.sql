CREATE DATABASE BioGuardDB;
USE BioGuardDB;

CREATE TABLE Departamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL
);

CREATE TABLE Funcionarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    data_nascimento DATE NOT NULL,
    cargo VARCHAR(50) NOT NULL,
    departamento_id INT,
    data_admissao DATE NOT NULL,
    FOREIGN KEY (departamento_id) REFERENCES Departamentos(id)
);


CREATE TABLE Pontos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    funcionario_id INT,
    data_hora DATETIME NOT NULL,
    tipo ENUM('entrada', 'saida', 'almoco_entrada', 'almoco_saida') NOT NULL,
    FOREIGN KEY (funcionario_id) REFERENCES Funcionarios(id)
);

INSERT INTO Departamentos (nome) VALUES ('Recursos Humanos'), ('TI'), ('Financeiro');