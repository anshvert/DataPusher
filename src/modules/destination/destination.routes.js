const express = require('express');
const DestinationService = require('./destination.service');
const { destinationSchema } = require('./destination.model');
const validate = require('../../middleware/validate');

const router = express.Router();

// Create Destination
router.post('/create', validate(destinationSchema), (req, res, next) => {
    DestinationService.createDestination(req.body, (err, destination) => {
        if (err) return res.status(err.message === 'Account not found' ? 404 : 500).json({ error: err.message });
        res.status(201).json(destination);
    });
});

// Read Destination
router.get('/:id', (req, res, next) => {
    DestinationService.getDestination(req.params.id, (err, destination) => {
        if (err) return res.status(404).json({ error: 'Destination not found' });
        res.json(destination);
    });
});

// Update Destination
router.put('/:id', validate(destinationSchema), (req, res, next) => {
    DestinationService.updateDestination(req.params.id, req.body, (err, destination) => {
        if (err) return res.status(404).json({ error: 'Destination not found' });
        res.json(destination);
    });
});

// Delete Destination
router.delete('/:id', (req, res, next) => {
    DestinationService.deleteDestination(req.params.id, (err) => {
        if (err) return res.status(404).json({ error: 'Destination not found' });
        res.status(204).send();
    });
});

module.exports = router;