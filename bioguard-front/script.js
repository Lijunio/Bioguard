// Função para validar o CPF
function validarCPF(cpf) {
    return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf);
}

// Função para validar a data no formato DD/MM/YYYY
function validarData(data) {
    return /^\d{2}\/\d{2}\/\d{4}$/.test(data);
}

// Função para exibir ícones de validação ao lado dos campos de entrada
function mostrarValidacao(campo, valido) {
    const icone = document.getElementById(`${campo.id}-validation`);
    if (valido) {
        icone.innerHTML = '✓';
        icone.classList.remove('error');
        icone.classList.add('success');
    } else {
        icone.innerHTML = '✗';
        icone.classList.remove('success');
        icone.classList.add('error');
    }
}

// Função para formatar o CPF
function formatarCPF(cpf) {
    cpf = cpf.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (cpf.length > 11) {
        cpf = cpf.substring(0, 11);
    }
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return cpf;
}

// Função para formatar a data no formato DD/MM/YYYY
function formatarData(data) {
    data = data.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (data.length > 8) {
        data = data.substring(0, 8);
    }
    data = data.replace(/(\d{2})(\d)/, '$1/$2');
    data = data.replace(/(\d{2})(\d)/, '$1/$2');
    return data;
}

// Valida os campos de entrada em tempo real
document.getElementById('cadastroForm')?.addEventListener('input', function(event) {
    const campo = event.target;
    let valido = true;

    if (campo.id === 'cpf') {
        campo.value = formatarCPF(campo.value);
        valido = validarCPF(campo.value);
    } else if (campo.id === 'data_nascimento' || campo.id === 'data_admissao') {
        campo.value = formatarData(campo.value);
        valido = validarData(campo.value);
    } else {
        valido = campo.value.trim() !== '';
    }

    mostrarValidacao(campo, valido);
});

// Cadastro de funcionários
document.getElementById('cadastroForm')?.addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = {
        nome: document.getElementById('nome').value,
        cpf: document.getElementById('cpf').value,
        data_nascimento: document.getElementById('data_nascimento').value,
        cargo: document.getElementById('cargo').value,
        departamento_id: document.getElementById('departamento_id').value,
        data_admissao: document.getElementById('data_admissao').value
    };

    // Validação final antes de enviar
    const campos = ['nome', 'cpf', 'data_nascimento', 'cargo', 'departamento_id', 'data_admissao'];
    let formValido = true;

    campos.forEach(campoId => {
        const campo = document.getElementById(campoId);
        let valido = true;

        if (campoId === 'cpf') {
            valido = validarCPF(campo.value);
        } else if (campoId === 'data_nascimento' || campoId === 'data_admissao') {
            valido = validarData(campo.value);
        } else {
            valido = campo.value.trim() !== '';
        }

        mostrarValidacao(campo, valido);

        if (!valido) {
            formValido = false;
        }
    });

    if (!formValido) {
        alert('Por favor, corrija os campos destacados.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/funcionarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        if (response.ok) {
            alert('Funcionário cadastrado com sucesso!');
            fetchFuncionarios(); // Atualiza a lista de funcionários após o cadastro
            document.getElementById('cadastroForm').reset(); // Limpa os campos do formulário
            // Remove os ícones de validação
            campos.forEach(campoId => {
                const icone = document.getElementById(`${campoId}-validation`);
                icone.innerHTML = '';
            });
        } else {
            alert('Erro ao cadastrar funcionário.');
        }
    } catch (error) {
        console.error('Erro:', error);
    }
});

// buscar e exibir os funcionários na tabela de consulta
async function fetchFuncionarios() {
    try {
        const response = await fetch('http://localhost:3000/api/funcionarios');
        const funcionarios = await response.json();
        const tableBody = document.querySelector('#funcionariosTable tbody');
        tableBody.innerHTML = '';
        funcionarios.forEach(funcionario => {
            const row = document.createElement('tr');
            const dataNascimento = new Date(funcionario.data_nascimento).toLocaleDateString('pt-BR');
            const dataAdmissao = new Date(funcionario.data_admissao).toLocaleDateString('pt-BR');
            row.innerHTML = `
                <td>${funcionario.nome}</td>
                <td>${funcionario.cpf}</td>
                <td>${dataNascimento}</td>
                <td>${funcionario.cargo}</td>
                <td>${funcionario.departamento_nome}</td>
                <td>${dataAdmissao}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Erro:', error);
    }
}

// Função para registrar ponto
document.getElementById('registroPontoForm')?.addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = {
        funcionario_id: document.getElementById('funcionario_id').value,
        tipo_registro: document.getElementById('tipo_registro').value,
        data_hora: getHoraBrasilia() // Captura a hora local ajustada para o horário de Brasília
    };

    try {
        const response = await fetch('http://localhost:3000/api/pontos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        if (response.ok) {
            alert('Ponto registrado com sucesso!');
            document.getElementById('registroPontoForm').reset(); // Limpa os campos do formulário
        } else {
            alert('Erro ao registrar ponto.');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao registrar ponto.');
    }
});

// Função para obter a hora de Brasília
function getHoraBrasilia() {
    const agora = new Date();
    const offset = -3; // UTC-3 para horário de Brasília
    const horaBrasilia = new Date(agora.getTime() + (offset * 60 * 60 * 1000));
    return horaBrasilia.toISOString().slice(0, 19).replace('T', ' ');
}

// exibir os pontos na tabela de consulta
async function fetchPontos() {
    try {
        const response = await fetch('http://localhost:3000/api/pontos');
        const pontos = await response.json();
        const tableBody = document.querySelector('#pontosTable tbody');
        tableBody.innerHTML = '';

        pontos.forEach(ponto => {
            const row = document.createElement('tr');
            const dataHora = new Date(ponto.data_hora).toLocaleString('pt-BR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            row.innerHTML = `
                <td>${ponto.funcionario_nome}</td>
                <td>${ponto.departamento_nome}</td>
                <td>${dataHora}</td>
                <td>${formatarTipoPonto(ponto.tipo)}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Erro:', error);
    }
}

function formatarTipoPonto(tipo) {
    switch (tipo) {
        case 'entrada':
            return 'Entrada';
        case 'saida':
            return 'Saída';
        case 'almoco_entrada':
            return 'Volta Almoço';
        case 'almoco_saida':
            return 'Saída Almoço';
        default:
            return tipo;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('#funcionariosTable')) {
        fetchFuncionarios();
    }
    if (document.querySelector('#pontosTable')) {
        fetchPontos();
    }
    atualizarRelogio();
});

function atualizarRelogio() {
    const relogio = document.getElementById('relogio');
    if (relogio) {
        const agora = new Date();
        const horarioFormatado = agora.toLocaleTimeString();
        const dataFormatada = agora.toLocaleDateString('pt-BR');
        relogio.innerText = `${dataFormatada} ${horarioFormatado}`;
    }
}

setInterval(atualizarRelogio, 1000);
atualizarRelogio();
