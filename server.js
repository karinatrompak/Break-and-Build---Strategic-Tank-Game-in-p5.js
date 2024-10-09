const express = require('express')
var bodyParser = require('body-parser')
const mysql = require('mysql2')
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.static('public'))

const dbase =mysql.createConnection({
    host:"localhost",
    port:"3306",
    user:"root",
    password:"root",
    database:"breakandbuild",
    //socketPath:"/Applications/MAMP/tmp/mysql/mysql.sock"
});

dbase.connect(function(err){
    if(err)throw err;
    console.log("Database Connected");
});

app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)
})

app.post('/login',(req,res)=>{

    let name = req.body.name;
    let pass = req.body.pass;
    
    let sql = "SELECT * FROM registo WHERE username='"+name+"' AND password = '"+pass+"';"
  
    dbase.query(sql, (err,result)=>{
    if(err) throw err; 
  
      res.send(result);
      console.log(result);
  
    });
  
  });

app.post('/register',(req,res)=>{

    let name = req.body.name;
    let pass = req.body.pass;
  
    let sql = "SELECT * from registo WHERE username ='"+name+"';"
  
    dbase.query(sql, (err,result)=>{
    if(err) throw err; 
  
      if(result.length>0){
      
        res.send({"ack":0})
      
      }else{
  
        let sql = "INSERT INTO registo (`username`,`password`) VALUES ('"+name+"','"+pass+"');";
  
          dbase.query(sql, (err,result)=>{
          if(err) throw err; 
  
          res.send({"ack":1});
  
    });
  
      }
  
    });
  
  });

app.get('/getInformation/:id',(req,res)=>{

    let id_player=req.params.id;
  
    let sql = "SELECT * FROM registo";
  
      dbase.query(sql, (err,result)=>{
         if(err) throw err; 
  
          res.send(result);
  
      });
  
});

app.post('/insertMaterial',(req,res)=>{

  console.log(req.body);

  let id_player = req.body.id_player;
  let objeto = req.body.objeto;
  let posX = req.body.PosX;
  let posY = req.body.PosY;

  let sql = "INSERT INTO materiais (`id_player`,`objeto`,`PosX`,`PosY`) VALUES ('"+id_player+"','"+objeto+"','"+posX+"','"+posY+"');";

    dbase.query(sql, (err,result)=>{
       if(err) throw err; 

        res.send(result);

    });

});

app.get('/getMaterial/:id',(req,res)=>{

  let id_player=req.params.id;

  let sql = "SELECT * FROM materiais WHERE id_player='"+id_player+"';";

    dbase.query(sql, (err,result)=>{
       if(err) throw err; 

        res.send(result);

    });

});

app.post('/comprar/madeira', (req, res) => {
  let precoMadeira = 15;
  let id_player = req.body.id_player;

  let VerificarSaldo = "SELECT dinheiro FROM registo WHERE id_player ='"+id_player+"';"

  dbase.query(VerificarSaldo, (err, result) => {

    if (err) {
        console.error(err);
        res.send("Erro ao verificar saldo");
        return;
    }

    if (result.length === 0) {
        res.send("Nenhum saldo encontrado para o jogador");
        return;
    } 

    let saldoAtual = result[0].dinheiro;
    if (saldoAtual >= precoMadeira) {
        let novoSaldo = saldoAtual - precoMadeira;

        let AtualizarSaldo = "UPDATE registo SET dinheiro = '" + novoSaldo + "' WHERE id_player = '" + id_player + "';";

        dbase.query(AtualizarSaldo, (err, result) => {
            if (err) {
                console.error(err);
                res.send("Erro ao processar a compra");
                return;
            }
            res.send("Compra de madeira bem-sucedida!");
        });
    } else {
        res.send("Saldo insuficiente para comprar madeira");
    }

  });
});
