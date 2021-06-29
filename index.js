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

        fs.writeFile("size.json", JSON.stringify([
            img.bitmap.width,
            img.bitmap.height
        ]), (err2) => {
            if (err2) throw err2;
            
            console.log("Wrote size of image");
            fs.unlink(`${__dirname}/temp/${req.file.filename}.png`, (err3) => {
                if (err3) throw err3;
    
                console.log("Serialize done");
                res.json(jsonDATA);
            });
        });
    });
});

app.get("/size", (req, res) => {
	fs.readFile("size.json", (err, data) => {
		if (err) return res.status(500).end();
		res.json(JSON.parse(data.toString()));
	});
});

app.listen(3000, () => {
	console.log("Running");
});