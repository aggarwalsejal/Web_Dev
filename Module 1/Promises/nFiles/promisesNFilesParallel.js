// let fs=require("fs");
// let files=["./f1.txt","./f2.txt","./f3.txt"];
// for(let i =0;i<files.length;i++){
//     let p=fs.promises.readFile(files[i],"utf8");
//     p.then(function(data){
//         console.log(p);
//     });
//     p.catch(function(error){
//         console.log(p);
//     });
// }

let fs = require("fs");
let files = ["./f1.txt" , "./f2.txt" , "./f3.txt"];

for(let i =0;i<files.length;i++){
    let promise = fs.promises.readFile(files[i] , "utf8");
    promise.then(function(data){
        console.log(promise);
    });
    promise.catch(function(error){
        console.log(promise);
    });
}