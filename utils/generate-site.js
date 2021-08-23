const fs = require('fs');

const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/index.html', fileContent, err => {
            if (err) {
                reject(err);
                return;
            }
            resolve({
                ok: true,
                message: 'File created!'
            })
        })
    })
};

const copyFile = filePath => {
    return new Promise((resolve, reject) => {
        fs.copyFile('../src/style.css', '../dist/style/.css', filePath, err => {
            if (err) {
                reject(err);
                return;
            }
            resolve({
                ok: true,
                message: 'Style sheet copied!'
            })
        })
    })
};

module.exports = {
    writeFile, copyFile
};