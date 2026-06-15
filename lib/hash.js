const crypto = require('crypto');

export const hashFile = (filepath) => {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash('sha256');
        const stream = require('fs').createReadStream(filepath);

        stream.on('data', (data) => hash.update(data)); 
        stream.on('end', () => resolve(hash.digest('hex'))); 
        stream.on('error', (err) => reject(err));
    }); 
}