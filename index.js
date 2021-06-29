const fs = require("fs");
const jimp = require("jimp");
const express = require("express");
const app = express();

app.get("/data", (req, res) => {
    jimp.read(`${__dirname}/temp/file.png`, (err2, img) => {
        if (err2) throw err2;
    
        let jsonDATA = {};
        let widthCount = 0;
        let heightCount = 0;
    
        // Will be replaced soon
        while (heightCount <= 0)
        {
            while (widthCount <= 0)
            {
                jsonDATA[`${widthCount.toString()},${heightCount.toString()}`] = jimp.intToRGBA(img.getPixelColor(widthCount, heightCount));
                widthCount++;
            }
            heightCount++;
            widthCount = 0;
        }
        
        console.log("Serialize done");
        res.json(jsonDATA);
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