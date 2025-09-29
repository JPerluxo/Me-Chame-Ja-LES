const { UserTypeValues } = require('../enums/UserTypeEnum');

class ValidateUserStrategy {
    static async execute(data) {
        try {
            const missingFields = ['cpf', 'name', 'surname', 'email', 'password', 'birthDate', 'type', 'isActive'].filter(field => !(field in data));

            if (missingFields.length > 0) {
                throw new Error(`Os seguintes campos estão faltando: ${missingFields.join(', ')}.`);
            }

            if (
                ([data.cpf, data.name, data.surname, data.email, data.password, data.birthDate].some(v => v === undefined || v === null || v === ''))
                || (data.type === undefined || data.type === null)
                || (data.isActive === undefined || data.isActive === null)) {
                throw new Error('Todos os campos obrigatórios devem estar preenchidos.');
            }

            if (typeof data.cpf !== 'string') {
                throw new Error('O campo "CPF" deve conter uma string.');
            }
            else if (!/^\d{11}$/.test(data.cpf)) {
                throw new Error('O campo "CPF" deve conter uma string numérica de 11 dígitos.');
            }

            if (typeof data.name !== 'string') {
                throw new Error('O campo "Nome" deve conter uma string.');
            }

            if (typeof data.surname !== 'string') {
                throw new Error('O campo "Sobrenome" deve conter uma string.');
            }

            if (typeof data.email !== 'string') {
                throw new Error('O campo "E-mail" deve conter uma string.');
            }

            if (typeof data.password !== 'string') {
                throw new Error('O campo "Senha" deve conter uma string.');
            }

            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
            if (!passwordRegex.test(data.password)) {
                throw new Error('A senha deve ter pelo menos 8 caracteres, incluir letras maiúsculas, minúsculas e caracteres especiais.');
            }

            if (typeof data.birthDate !== 'string' || isNaN(Date.parse(data.birthDate))) {
                throw new Error('O campo "Data de Nascimento" deve conter uma data válida no formato YYYY-MM-DD.');
            }

            const type = typeof data.type === 'string' ? parseInt(data.type, 10) : data.type;
            if (isNaN(type) || !UserTypeValues.includes(type)) {
                throw new Error('O campo "Tipo do Usuário" deve ter um valor válido.');
            }

            if (typeof data.isActive !== 'boolean') {
                throw new Error('O campo "Usuário Ativo?" deve conter um booleano.');
            }
        } catch (error) {
            throw error.message;
        }
    }
}

module.exports = ValidateUserStrategy;
