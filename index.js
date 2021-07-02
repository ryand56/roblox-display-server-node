const express = require("express");
const app = express();

app.use(express.text());

const jimp = require("jimp");

app.get("/data", (req, res) => {
    if (!req.body) return res.status(400).end();
    jimp.read(Buffer.from(req.body, "base64"), (err, img) => {
        if (err) return res.status(415).end();
    
        let jsonDATA = {};
        let widthCount = 0;
        let heightCount = 0;
    
        while (heightCount <= img.bitmap.height)
        {
            while (widthCount <= img.bitmap.width)
            {
                jsonDATA[`${widthCount.toString()},${heightCount.toString()}`] = jimp.intToRGBA(img.getPixelColor(widthCount, heightCount));
                widthCount++;
            }
            heightCount++;
            widthCount = 0;
        }

        console.log("Serialize done");
        res.json({ size: { x: img.bitmap.width, y: img.bitmap.height }, data: jsonDATA });
    });
});

app.listen(3000, () => {
	console.log("Running");
});