var path = require('path');

module.exports = (root) => {
    return (req, res, next) => {
        const filePath = `${root + req.path}.${req.method.toLowerCase()}.json`;
        res.sendFile(filePath, {
            root: path.resolve(__dirname, '../')
        }, (err) => {
            if (err) {
                next();
            } else {
                console.log('Send Mock Data: ' + filePath)
            }
        });
    }
}
