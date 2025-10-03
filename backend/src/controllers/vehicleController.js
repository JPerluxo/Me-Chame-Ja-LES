const express = require('express');
const router = express.Router();
const VehicleService = require('../services/VehicleService');

router.post('/save', async (req, res) => {
    const vehicle = req.body;

    try {
        const result = await VehicleService.saveVehicle(vehicle);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: `Erro ao salvar veículo: ${error}`, status: 500 });
    }
});

router.post('/update', async (req, res) => {
    const vehicle = req.body;

    try {
        const result = await VehicleService.updateVehicle(vehicle);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: `Erro ao alterar veículo: ${error}`, status: 500 });
    }
});

router.get('/getById', async (req, res) => {
    const id = req.query.id

    try {
        const result = await VehicleService.getVehicleById(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: `Erro ao consultar veículo: ${error}`, status: 500 });
    }
});

router.get('/getAll', async (req, res) => {
    try {
        const result = await VehicleService.getAllVehicles();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: `Erro ao consultar veículos: ${error}`, status: 500 });
    }
});

router.post('/delete', async (req, res) => {
    const vehicle = req.body;

    try {
        const result = await VehicleService.deleteVehicle(vehicle);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: `Erro ao deletar veículo: ${error}`, status: 500 });
    }
});

module.exports = router;
