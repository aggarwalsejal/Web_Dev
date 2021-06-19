let fs=require("fs");
let Files=["./f1.txt","./f2.txt","./f3.txt"];
for(let i=0;i<Files.length; i++){
    fs.readFile(Files[i],function(err,data){
        console.log(data+" ");
    });
};
