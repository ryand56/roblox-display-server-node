const fs = require("fs");
const multerUpload = require("multer")({ dest: "temp/" });
const jimp = require("jimp");
const express = require("express");
const app = express();

app.get("/data", multerUpload.single("image"), (req, res) => {
    jimp.read(`${__dirname}/temp/${req.file.filename}.png`, (err, img) => {
        if (err) throw err;
    
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

        fs.unlink(`${__dirname}/temp/${req.file.filename}.png`, (err2) => {
            if (err2) throw err2;

            console.log("Serialize done");
            res.json({ size: { x: img.bitmap.width, y: img.bitmap.height }, data: jsonDATA });
        });
    });
});

app.listen(3000, () => {
	console.log("Running");
});