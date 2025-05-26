const express = require('express');
const AccountService = require('./account.service');
const { accountSchema } = require('./account.model');
const validate = require('../../middleware/validate');

const router = express.Router();

// Create Account
router.post('/create', validate(accountSchema), (req, res, next) => {
    AccountService.createAccount(req.body, (err, account) => {
        if (err) return res.status(400).json({ error: 'Email already exists' });
        res.status(201).json(account);
    });
});

// Read Account
router.get('/:id', (req, res, next) => {
    AccountService.getAccount(req.params.id, (err, account) => {
        if (err || !account) return res.status(404).json({ error: 'Account not found' });
        res.json(account);
    });
});

// Update Account
router.put('/:id', validate(accountSchema), (req, res, next) => {
    AccountService.updateAccount(req.params.id, req.body, (err, account) => {
        if (err) return res.status(404).json({ error: 'Account not found or email exists' });
        res.json(account);
    });
});

// Delete Account
router.delete('/:id', (req, res, next) => {
    AccountService.deleteAccount(req.params.id, (err) => {
        if (err) return res.status(404).json({ error: 'Account not found' });
        res.status(204).send();
    });
});

// Get Destinations for Account
router.get('/:id/destinations', (req, res, next) => {
    AccountService.getDestinations(req.params.id, (err, destinations) => {
        if (err) return res.status(500).json({ error: 'Internal server error' });
        res.json(destinations);
    });
});

module.exports = router;