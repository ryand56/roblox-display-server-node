const express = require('express');
const app = express();
const jimp = require('jimp');

app.use(express.static('public'));

app.post('/upload', (req, res) => {
    if (!req.body) return res.sendStatus(400);
    jimp.read(Buffer.from(req.body, 'base64'), (err, image) => {
        if (err) return res.sendStatus(415);
        let jsondata = {};
        for (let heightcount = 0; heightcount <= image.bitmap.height; heightcount++) {
            for (let widthcount = 0; widthcount <= image.bitmap.width; widthcount++) {
                let color = jump.intToRGBA(image.getPixelColor(widthcount, heightcount));
                jsondata[widthcount + ',' + heightcount] = color;
            }
        }
        res.send({
            size: {
                x: image.bitmap.width,
                y: image.bitmap.height
            },
            data: jsondata
        });
    });
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
