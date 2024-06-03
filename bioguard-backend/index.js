const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'bioguarddb'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL Connected...');

  db.query('CREATE DATABASE IF NOT EXISTS BioGuardDB', (err, result) => {
    if (err) throw err;

    db.changeUser({ database: 'BioGuardDB' }, (err) => {
      if (err) throw err;

      db.query(`CREATE TABLE IF NOT EXISTS Departamentos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(50) NOT NULL
      )`, (err, result) => {
        if (err) throw err;
      });

      db.query(`CREATE TABLE IF NOT EXISTS Funcionarios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        cpf VARCHAR(14) NOT NULL UNIQUE,
        data_nascimento DATE NOT NULL,
        cargo VARCHAR(50) NOT NULL,
        departamento_id INT,
        data_admissao DATE NOT NULL,
        FOREIGN KEY (departamento_id) REFERENCES Departamentos(id)
      )`, (err, result) => {
        if (err) throw err;
      });

      db.query(`CREATE TABLE IF NOT EXISTS Pontos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        funcionario_id INT,
        data_hora DATETIME NOT NULL,
        tipo ENUM('entrada', 'saida', 'almoco_entrada', 'almoco_saida') NOT NULL,
        FOREIGN KEY (funcionario_id) REFERENCES Funcionarios(id)
      )`, (err, result) => {
        if (err) throw err;
      });
    });
  });
});

app.get('/', (req, res) => {
  res.send('BioGuard API');
});

function converterData(data) {
  const [dia, mes, ano] = data.split('/');
  return `${ano}-${mes}-${dia}`;
}

app.post('/api/funcionarios', (req, res) => {
  const newEmployee = {
    ...req.body,
    data_nascimento: converterData(req.body.data_nascimento),
    data_admissao: converterData(req.body.data_admissao)
  };
  const sql = 'INSERT INTO Funcionarios SET ?';
  db.query(sql, newEmployee, (err, result) => {
    if (err) throw err;
    res.send('Employee added...');
  });
});

app.get('/api/funcionarios', (req, res) => {
  const sql = `
    SELECT 
      f.id, f.nome, f.cpf, f.data_nascimento, f.cargo, 
      d.nome AS departamento_nome, f.data_admissao 
    FROM 
      Funcionarios f 
    JOIN 
      Departamentos d ON f.departamento_id = d.id
  `;
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/api/pontos', (req, res) => {
  const { funcionario_id, tipo_registro, data_hora } = req.body;
  const sql = 'INSERT INTO Pontos (funcionario_id, data_hora, tipo) VALUES (?, ?, ?)';
  db.query(sql, [funcionario_id, data_hora, tipo_registro], (err, result) => {
    if (err) throw err;
    res.send('Point added...');
  });
});

app.get('/api/pontos', (req, res) => {
  const sql = `
    SELECT 
      f.nome AS funcionario_nome, 
      d.nome AS departamento_nome, 
      p.data_hora, 
      p.tipo 
    FROM 
      Funcionarios f
    JOIN 
      Pontos p ON p.funcionario_id = f.id
    JOIN 
      Departamentos d ON f.departamento_id = d.id
    ORDER BY 
      TIME(p.data_hora) DESC
  `;
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
