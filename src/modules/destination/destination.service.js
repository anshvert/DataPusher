const db = require('../../config/db');

class DestinationService {
    static createDestination({ account_id, url, http_method, headers }, callback) {
        db.get('SELECT id FROM accounts WHERE id = ?', [account_id], (err, row) => {
            if (err || !row) return callback(new Error('Account not found'));
            db.run(
                'INSERT INTO destinations (account_id, url, http_method, headers) VALUES (?, ?, ?, ?)',
                [account_id, url, http_method.toUpperCase(), JSON.stringify(headers)],
                function (err) {
                    if (err) return callback(err);
                    callback(null, { id: this.lastID, account_id, url, http_method, headers });
                }
            );
        });
    }

    static getDestination(id, callback) {
        db.get('SELECT * FROM destinations WHERE id = ?', [id], (err, row) => {
            if (err || !row) return callback(err || new Error('Destination not found'));
            row.headers = JSON.parse(row.headers);
            callback(null, row);
        });
    }

    static updateDestination(id, { url, http_method, headers }, callback) {
        db.run(
            'UPDATE destinations SET url = ?, http_method = ?, headers = ? WHERE id = ?',
            [url, http_method.toUpperCase(), JSON.stringify(headers), id],
            function (err) {
                if (err || this.changes === 0) return callback(err || new Error('Destination not found'));
                callback(null, { id, url, http_method, headers });
            }
        );
    }

    static deleteDestination(id, callback) {
        db.run('DELETE FROM destinations WHERE id = ?', [id], function (err) {
            if (err || this.changes === 0) return callback(err || new Error('Destination not found'));
            callback(null);
        });
    }

    static getDestinationsByAccount(accountId, callback) {
        db.all('SELECT * FROM destinations WHERE account_id = ?', [accountId], (err, rows) => {
            if (err) return callback(err);
            rows.forEach((row) => (row.headers = JSON.parse(row.headers)));
            callback(null, rows);
        });
    }
}

module.exports = DestinationService;