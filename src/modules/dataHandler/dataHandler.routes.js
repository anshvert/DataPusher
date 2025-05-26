const express = require('express');
const DataHandlerService = require('./dataHandler.service');

const router = express.Router();

router.post('/incoming_data', async (req, res, next) => {
    if (!req.is('application/json')) {
        return res.status(400).json({ error: 'Invalid Data' });
    }

    const appSecretToken = req.get('CL-X-TOKEN');
    if (!appSecretToken) {
        return res.status(401).json({ error: 'Un Authenticate' });
    }

    try {
        const result = await DataHandlerService.handleIncomingData(appSecretToken, req.body);
        res.status(200).json(result);
    } catch (err) {
        res.status(err.message === 'Un Authenticate' ? 401 : 500).json({ error: err.message });
    }
});

module.exports = router;