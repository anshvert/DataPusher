const axios = require('axios');
const AccountService = require('../account/account.service');
const DestinationService = require('../destination/destination.service');

class DataHandlerService {
    static async handleIncomingData(appSecretToken, data) {
        return new Promise((resolve, reject) => {
            AccountService.getAccountByToken(appSecretToken, async (err, account) => {
                if (err || !account) return reject(new Error('Un Authenticate'));

                DestinationService.getDestinationsByAccount(account.id, async (err, destinations) => {
                    if (err) return reject(new Error('Internal server error'));

                    for (const dest of destinations) {
                        try {
                            if (dest.http_method === 'GET') {
                                await axios.get(dest.url, { params: data, headers: dest.headers });
                            } else if (['POST', 'PUT'].includes(dest.http_method)) {
                                await axios({
                                    method: dest.http_method.toLowerCase(),
                                    url: dest.url,
                                    data,
                                    headers: dest.headers,
                                });
                            }
                        } catch (error) {
                            console.error(`Failed to send to ${dest.url}:`, error.message);
                        }
                    }
                    resolve({ message: 'Data forwarded successfully' });
                });
            });
        });
    }
}

module.exports = DataHandlerService;