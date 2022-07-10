const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();

const app = express();
app.use("/assets",express.static("assets"));



const connection = mysql.createConnection({
    host : "localhost",
    user: "root",
    password: "",
    database: "fivemweb"
});


//database bağlanma

connection.connect(function(error){
if (error) throw error
else console.log("Veritabanı bağlantısı başarıyla sağlandı.")
});

//web port ayarı

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/",encoder,function(req,res){
var ad = req.body.username;
var sifre = req.body.password;

    connection.query("select * from users where ad= ? sifre= ?",[ad,sifre],function(error,results,fields){
        if (results.length >= 0) {
            res.redirect("/admindex");
        } else {
            res.redirect("/");
        }
        res.end();
    })
})

//login başarılı olursa atacağı sayfa

app.get("/adminindex",function(req,res){
    res.sendFile(__dirname + "/adminindex.html");
})


app.listen(3131);