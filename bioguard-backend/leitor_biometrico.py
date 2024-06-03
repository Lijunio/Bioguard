import mysql.connector
from datetime import datetime

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
    print(f'Registro de {tipo_registro} para o funcionário {funcionario_id} em {timestamp} realizado com sucesso.')

# Funções para simular as operações
def registro_entrada(funcionario_id):
    registrar_ponto(funcionario_id, 'entrada')

def registro_saida_almoco(funcionario_id):
    registrar_ponto(funcionario_id, 'almoco_saida')

def registro_retorno_almoco(funcionario_id):
    registrar_ponto(funcionario_id, 'almoco_entrada')

def registro_saida(funcionario_id):
    registrar_ponto(funcionario_id, 'saida')

# Função principal para simulação
def main():
    while True:
        print("\n1. Registrar Entrada")
        print("2. Registrar Saída para Almoço")
        print("3. Registrar Retorno de Almoço")
        print("4. Registrar Saída")
        print("5. Sair")
        escolha = input("Escolha uma opção: ")

        if escolha == '5':
            break

        funcionario_id = input("Digite o ID do funcionário: ")

        if escolha == '1':
            registro_entrada(funcionario_id)
        elif escolha == '2':
            registro_saida_almoco(funcionario_id)
        elif escolha == '3':
            registro_retorno_almoco(funcionario_id)
        elif escolha == '4':
            registro_saida(funcionario_id)
        else:
            print("Opção inválida. Tente novamente.")

if __name__ == "__main__":
    init_db()
    main()
