const express = require('express');
const router = express.Router();
const UserService = require('../services/UserService');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserService.validateUser(email, password);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Usuário ou senha inválidos",
      });
    }

    console.log("🚀 Enviando ao frontend:", user);

    return res.status(200).json({
      success: true,
      message: "Login realizado com sucesso!",
      user,
    });
  } catch (error) {
    console.error("🔥 Erro no login:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao realizar login",
    });
  }
});

router.post('/save', async (req, res) => {
    const user = req.body;

    try {
        const result = await UserService.saveUser(user);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: `Erro ao salvar usuário: ${error}`, status: 500 });
    }
});

router.post('/update', async (req, res) => {
    const user = req.body;

    try {
        const result = await UserService.updateUser(user);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: `Erro ao alterar usuário: ${error}`, status: 500 });
    }
});

router.get('/getById', async (req, res) => {
    const id = req.query.id

    try {
        const result = await UserService.getUserById(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: `Erro ao consultar usuário: ${error}`, status: 500 });
    }
});

router.get('/getAll', async (req, res) => {
    try {
        const result = await UserService.getAllUsers();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: `Erro ao consultar usuários: ${error}`, status: 500 });
    }
});

router.post('/delete', async (req, res) => {
    const user = req.body;

    try {
        const result = await UserService.deleteUser(user);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: `Erro ao deletar usuário: ${error}`, status: 500 });
    }
});

module.exports = router;
