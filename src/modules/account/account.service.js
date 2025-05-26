const { v4: uuidv4 } = require('uuid');
const db = require('../../config/db');

class AccountService {
    static createAccount({ email, account_name, website }, callback) {
        const id = uuidv4();
        const app_secret_token = uuidv4();
        db.run(
            'INSERT INTO accounts (id, email, account_name, app_secret_token, website) VALUES (?, ?, ?, ?, ?)',
            [id, email, account_name, app_secret_token, website || null],
            function (err) {
                if (err) return callback(err);
                callback(null, { id, email, account_name, app_secret_token, website });
            }
        );
    }

    static getAccount(id, callback) {
        db.get('SELECT * FROM accounts WHERE id = ?', [id], callback);
    }

    static updateAccount(id, { email, account_name, website }, callback) {
        db.run(
            'UPDATE accounts SET email = ?, account_name = ?, website = ? WHERE id = ?',
            [email, account_name, website || null, id],
            function (err) {
                if (err || this.changes === 0) return callback(err || new Error('Account not found'));
                callback(null, { id, email, account_name, website });
            }
        );
    }

    static deleteAccount(id, callback) {
        db.run('DELETE FROM accounts WHERE id = ?', [id], function (err) {
            if (err || this.changes === 0) return callback(err || new Error('Account not found'));
            callback(null);
        });
    }

    static getDestinations(accountId, callback) {
        db.all('SELECT * FROM destinations WHERE account_id = ?', [accountId], callback);
    }

    static getAccountByToken(appSecretToken, callback) {
        db.get('SELECT * FROM accounts WHERE app_secret_token = ?', [appSecretToken], callback);
    }
}

module.exports = AccountService;