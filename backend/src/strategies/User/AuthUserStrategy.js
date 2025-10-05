const User = require('../../models/user');

class AuthUserStrategy {
  static async execute({ email, password }) {
    try {
      if (!User) {
        throw new Error("❌ O model User não foi carregado corretamente!");
      }

      const user = await User.findOne({
        where: { email },
        raw: true,
      });

      console.log("📦 Resultado bruto do banco:", user);

      if (!user) {
        throw new Error("Usuário não encontrado.");
      }

      if (password !== user.password) {
        throw new Error("Senha incorreta.");
      }

      return user;
    } catch (error) {
      console.error("🔥 Erro dentro do AuthUserStrategy:", error);
      throw error;
    }
  }
}

module.exports = AuthUserStrategy;