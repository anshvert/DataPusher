const express = require('express');
const accountRoutes = require('./modules/account/account.routes');
const destinationRoutes = require('./modules/destination/destination.routes');
const dataHandlerRoutes = require('./modules/dataHandler/dataHandler.routes');

const app = express();
app.use(express.json());

// Mount routes
app.use('/accounts', accountRoutes);
app.use('/destinations', destinationRoutes);
app.use('/server', dataHandlerRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});