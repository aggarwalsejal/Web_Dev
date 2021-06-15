const fs = require("fs");
const cheerio = require("cheerio");


let htmlKaData = fs.readFileSync("./index.html" , "utf8");


let ch = cheerio.load(htmlKaData);

console.log(ch);

let pTag=ch("p");
console.log(pTag);