from flask import Flask, render_template, request, redirect, url_for
import mysql.connector
from datetime import datetime

app = Flask(__name__, static_folder='../bioguard-front', template_folder='../bioguard-front')

# Função de inicialização do banco de dados
def init_db():
    conn = mysql.connector.connect(
        host='localhost',
        user='root',
        password='123456',
        database='bioguarddb'
    )
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS Pontos (
            id INT AUTO_INCREMENT PRIMARY KEY,
            funcionario_id INT,
            data_hora DATETIME NOT NULL,
            tipo ENUM('entrada', 'saida', 'almoco_entrada', 'almoco_saida') NOT NULL,
            FOREIGN KEY (funcionario_id) REFERENCES Funcionarios(id)
        )
    ''')
    conn.commit()
    conn.close()

# Função para registrar um evento de ponto
def registrar_ponto(funcionario_id, tipo_registro):
    conn = mysql.connector.connect(
        host='localhost',
        user='root',
        password='123456',
        database='bioguarddb'
    )
    cursor = conn.cursor()
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    cursor.execute('''
        INSERT INTO Pontos (funcionario_id, data_hora, tipo)
        VALUES (%s, %s, %s)
    ''', (funcionario_id, timestamp, tipo_registro))
    conn.commit()
    conn.close()
    return f'Registro de {tipo_registro} para o funcionário {funcionario_id} em {timestamp} realizado com sucesso.'

@app.route('/')
def index():
    return render_template('registro_ponto.html')

@app.route('/registrar', methods=['POST'])
def registrar():
    funcionario_id = request.form['funcionario_id']
    tipo_registro = request.form['tipo_registro']
    message = registrar_ponto(funcionario_id, tipo_registro)
    return render_template('registro_ponto.html', message=message)

if __name__ == "__main__":
    init_db()
    app.run(debug=True)
