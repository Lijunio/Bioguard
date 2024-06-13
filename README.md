# **BioGuard**

BioGuard é um sistema de gerenciamento de ponto que utiliza um leitor de biometria. O projeto é composto por um frontend em JavaScript, um backend em Node.js e Python, e um banco de dados MySQL local.

## **Índice**

- [Visão Geral](#visão-geral)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso](#uso)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Contribuição](#contribuição)
- [Licença](#licença)
- [Contato](#contato)

## **Visão Geral**

![Arquitetura do Projeto BioGuard](https://via.placeholder.com/800x400.png?text=BioGuard+Architecture)

## **Instalação**

### **Backend**

1. Clone o repositório:
   ```sh
   git clone https://github.com/seu-usuario/BioGuard.git
   ```

2. Navegue até o diretório do backend e instale as dependências:
   ```sh
   cd bioguard-backend
   npm install
   ```

### **Frontend**

1. Navegue até o diretório do frontend e instale as dependências:
   ```sh
   cd ../bioguard-front
   npm install
   ```

## **Configuração**

### **Banco de Dados**

1. Configure o banco de dados MySQL local:
   - Crie um banco de dados chamado `bioguard`.
   - Importe as tabelas necessárias (`Funcionarios`, `Departamentos`, `Pontos`) usando os scripts SQL fornecidos (`database.sql`).

2. Atualize o arquivo de configuração do backend (`config.js` ou `settings.js`) com as credenciais do seu banco de dados MySQL.

### **Backend**

1. Inicie o servidor backend:
   ```sh
   node index.js
   ```

### **Frontend**

1. Inicie o servidor frontend:
   ```sh
   npm start
   ```

## **Uso**

1. Acesse a aplicação no seu navegador:
   ```
   http://localhost:3000
   ```

2. Utilize o leitor de biometria para registrar o ponto ou para consultar registros existentes.

## **Estrutura do Projeto**

```plaintext
BioGuard/
│
├── bioguard-backend/
│   ├── database.sql
│   ├── index.js
│   ├── leitor_biometrico.py
│   ├── node_modules/
│   ├── package-lock.json
│   ├── package.json
│   └── venv/
│
├── bioguard-front/
│   ├── home.css
│   ├── imagens/
│   ├── script.js
│   ├── styles.css
│   ├── cadastro.html
│   ├── consulta.html
│   ├── consulta_cadastro.html
│   ├── index.html
│   └── registro_ponto.html
│
└── README.md
```

## **Funcionalidades**

- **Registro de Ponto:** Use o leitor de biometria para registrar a entrada e saída dos funcionários.
- **Consulta de Pontos:** Verifique os registros de ponto dos funcionários.
- **Gerenciamento de Funcionários e Departamentos:** Adicione, edite e remova informações de funcionários e departamentos.

## **Tecnologias Utilizadas**

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Python
- **Banco de Dados:** MySQL

## **Contribuição**

1. Fork o repositório
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## **Licença**

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

## **Contato**

Elias Ribeiro - (https://lijunio.github.io/portfolio/index.html) - eliasjunio.ribeiro95@gmail.com

Link do Projeto: (https://lijunio.github.io/bioguard/)
