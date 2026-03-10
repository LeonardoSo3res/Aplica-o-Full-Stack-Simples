const express=require('express'), sqlite3=require('sqlite3').verbose(), path=require('path');
const app=express();
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));
const db=new sqlite3.Database('db.sqlite');
db.run('CREATE TABLE IF NOT EXISTS usuarios(id INTEGER PRIMARY KEY AUTOINCREMENT,nome TEXT,email TEXT)');

app.get('/api/usuarios',(_,r)=>db.all('SELECT * FROM usuarios',(_,rows)=>r.json(rows)));
app.get('/api/usuarios/:id',(req,r)=>db.get('SELECT * FROM usuarios WHERE id=?',[req.params.id],(_,row)=>r.json(row)));
app.post('/api/usuarios',(req,r)=>{const {nome,email}=req.body;db.run('INSERT INTO usuarios(nome,email) VALUES(?,?)',[nome,email],function(){r.json({id:this.lastID,nome,email})})});
app.put('/api/usuarios/:id',(req,r)=>{const {nome,email}=req.body;db.run('UPDATE usuarios SET nome=?,email=? WHERE id=?',[nome,email,req.params.id],()=>r.json({id:req.params.id,nome,email}))});
app.delete('/api/usuarios/:id',(req,r)=>db.run('DELETE FROM usuarios WHERE id=?',[req.params.id],()=>r.json({success:true})));

app.listen(3000,()=>console.log('Servidor rodando em http://localhost:3000'));