const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, '../db/');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const logFile = path.join(logDir, 'log.json');

const log = (procType, location, mail) => {
    const logEntry = {
        timestamp: new Date().toISOString(),
        procType,
        location,
        mail
    };

    fs.readFile(logFile, 'utf8', (err, data) => {
        let logs = [];
        if (!err && data) {
            try {
                logs = JSON.parse(data);
            } catch (parseErr) {
                console.error('Log dosyası parse hatası:', parseErr);
            }
        }
        
        logs.push(logEntry);
        
        fs.writeFile(logFile, JSON.stringify(logs, null, 2), 'utf8', (writeErr) => {
            if (writeErr) {
                console.error('Log yazarken hata oluştu:', writeErr);
            }
        });
    });
};

module.exports = log;
