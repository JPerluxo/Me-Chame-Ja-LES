const ValidateUserStrategy = require('../strategies/ValidateUserStrategy');
const SaveUserStrategy = require('../strategies/SaveUserStrategy');

class UserService {
    static async saveUser(user) {
        try {
            await ValidateUserStrategy.execute(user);
            return await SaveUserStrategy.execute(user);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserService;
