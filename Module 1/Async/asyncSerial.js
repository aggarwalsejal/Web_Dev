let fs=require("fs");
let Files=["./f1.txt","./f2.txt","./f3.txt"];
for(let i=0;i<Files.length; i++){
    let fkdata=fs.readFileSync(Files[i],"utf8");
    console.log(fkdata);
};