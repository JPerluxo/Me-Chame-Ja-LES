const ValidateUserStrategy = require('../strategies/User/ValidateUserStrategy');
const CheckUserIfExistsStrategy = require('../strategies/User/CheckUserIfExistsStrategy');
const SaveUserStrategy = require('../strategies/User/SaveUserStrategy');
const UpdateUserStrategy = require('../strategies/User/UpdateUserStrategy');
const GetUsersStrategy = require('../strategies/User/GetUsersStrategy');
const DeleteUserStrategy = require('../strategies/User/DeleteUserStrategy');
const AuthUserStrategy = require('../strategies/User/AuthUserStrategy');
const { Op } = require("sequelize");


class UserService {
    static async validateUser(email, password) {
        try {
            console.log("📩 Iniciando login para:", email);

            const user = await AuthUserStrategy.execute({ email, password });
            if (!user) return null;

            const formattedUser = {
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password,
                cellphone: user.cellphone,
                type: user.type,
                createdAt: user.createdAt,
            };

            console.log("✅ Usuário formatado no UserService:", formattedUser);
            return formattedUser;
        } catch (error) {
            console.error("❌ Erro no validateUser:", error);
            throw error;
        }
    }

    static async saveUser(user) {
        try {
            await ValidateUserStrategy.execute(user);
            await CheckUserIfExistsStrategy.execute({ email: user.email }, "mustNotExist");
            return await SaveUserStrategy.execute(user);
        } catch (error) {
            throw error;
        }
    }

    static async updateUser(user) {
        try {
            await CheckUserIfExistsStrategy.execute({ id: user.id }, "mustExist");
            await ValidateUserStrategy.execute(user);
            await CheckUserIfExistsStrategy.execute({ email: user.email, id: { [Op.ne]: user.id } }, "mustNotExist");
            return await UpdateUserStrategy.execute(user);
        } catch (error) {
            throw error;
        }
    }

    static async getUserById(id) {
        try {
            await CheckUserIfExistsStrategy.execute({ id: id }, "mustExist");
            return await GetUsersStrategy.execute(id);
        } catch (error) {
            throw error;
        }
    }

    static async getAllUsers() {
        try {
            return await GetUsersStrategy.execute();
        } catch (error) {
            throw error;
        }
    }

    static async deleteUser(user) {
        try {
            await CheckUserIfExistsStrategy.execute({ id: user.id }, "mustExist");
            return await DeleteUserStrategy.execute(user.id);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserService;
