let fs = require("fs");
let files = ["./f1.txt" , "./f2.txt" , "./f3.txt"];

for(let i =0;i<files.length;i++){
    let data1 = fs.readFileSync(files[i],"utf8");
    let promise = Promise.resolve(data1);
    promise.then(function(data){
        console.log(promise);
    });
    promise.catch(function(error){
        console.log(promise);
    });
}