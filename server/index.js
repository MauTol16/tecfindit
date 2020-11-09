const express = require('express');
const app = express();
const mysql =require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'tecfind-db',
}) 

app.get('/', (req,res)=> {
    const sqlInsertUser = "INSERT INTO Users(nombreUsuario,correo,contraseña) VALUES ('pampu','pampu@tec.mx','pampu123');"
    db.query(sqlInsertUser, (err,result)=>{
        if (err) {
            console.log(err);
          }
        res.send("hello world");
    })
    
});

/*
app.get('/login', (req,res)=> {
    res.send("hello world");
});
app.get('/signup', (req,res)=> {
    res.send("hello world");
});

*/

app.listen(3001, ()=> {
    console.log('running on port 3001');
});