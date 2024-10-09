let arrayUsers;
let arrayLogin;

//Board
let board = [];
let madeiraBtn;
let aguaBtn;
let metalBtn;
let tijoloBtn;
let materialPlayer;
let boardClicable=false;

//Tanque
let player, tankSpeed = 5,
  tankSize = 10,
  bulletSpeed = 7,
  bulletSize = 2;
let tanks = [];
let bullets = [];
let sceneanterior;
let visivel;

function login(){
  
    let name = nameInput.value();
    let pass = passInput.value();
  
    let user = {
      "name":name,
      "pass":pass
    }
  
    httpPost('/login',user,'json', (respostaServidor)=>{
      arrayLogin = respostaServidor;// Array que contem a informação do login
      if(respostaServidor.length>0){
        userServidor = respostaServidor;
        loadJSON('/getMaterial/:id'+userServidor[0].id,(resposta)=>{
          materialPlayer=resposta;
          nameInput.remove();
          passInput.remove();
          loginBtn.remove();
          registerBtn.remove();
          scene=1;
          loop()
  
        });     
      }else{
        alert("Erro de login")
      }
  
    });
}

function register(){

    let name = nameInput.value();  
    let pass = passInput.value();
  
    let user = {
      "name":name,
      "pass":pass
    }
  
    httpPost('/register', user,'json', (respostaServidor)=>{
  
    console.log(respostaServidor);
  
    if(respostaServidor.ack==0){
  
        console.log(user);
        alert("Utilizador já existe");
      }else{
        alert("Registo com sucesso")
      }
  
  });
  
}

function headerMenu(){

    loadJSON('/getInformation/:id', (dataDoServidor)=>{
        arrayUsers = dataDoServidor;
    })

}; 
  
function identificarUser(){

    for(let i=0; i<arrayLogin.length; i++){
        let loginUser= arrayLogin[i];
      for(let j = 0; j< arrayUsers.length; j++){
        let userData = arrayUsers[j];
        if(loginUser.id_player === userData.id_player){
          userN.username = loginUser.username;
          userN.pontos = loginUser.pontos;
          userN.dinheiro = loginUser.dinheiro;
          break;
        } 
      } 
      }
};

function gameBoard(){
  background(255)
  tanque();
  scene=2;
  loop();
};

function base(){
    console.log(materialPlayer);
    jogarimgBtn.remove();
    baseimgBtn.remove();
    leaderimgBtn.remove();
    scene=3;
    loop();

}    
  
function create_Board(){
  let i = 0;
  let j = 0;
  
  let initialPosX=width*0.25;
  let initialPosY=height*0.15;
  let nTiles=8;
  let sizeTile=50;
  let boardSizeX=initialPosX+nTiles*50;
  let boardSizeY=initialPosY+nTiles*50;

  for (let x = initialPosX; x < boardSizeX; x += sizeTile) {
    board[i] = [];
    for (let y = initialPosY; y < boardSizeY; y += sizeTile) {
      board[i][j] = new Tile(x, y, i, j, 50);
      j++;
    }
    j = 0;
    i++;
  }
}

function draw_Board(){

  background(255);

for(let i=0; i < board.length; i++){
  for(let j=0; j<board[i].length; j++){
    board[i][j].draw_Tile();
    board[i][j].clr="red";
  }
}
}

function mousePressed(){

  if(scene==1){ 

     for(let i=0; i<arrButtonsMenu.length;i++){
      if(arrButtonsMenu[i].on_Click(mouseX,mouseY)){
        if(arrButtonsMenu[i].conteudo==jogarimgBtn){
          scene=2;
          loop();
        }else if(arrButtonsMenu[i].conteudo==baseimgBtn){
          scene=3;
          loop();
        }else if(arrButtonsMenu[i].conteudo==storeimgBtn){
          scene=4;
          loop();
        }else{
          leaderPopup();
          loop();
        }
      }
    }
  }

    if(scene==4){
     for(let i=0; i<arrButtons.length;i++){
      if(arrButtons[i].on_Click(mouseX,mouseY)){
        
        if (arrButtons[i].conteudo == returnBtnimage){
          scene=1;
          console.log("mudou");
        }
        if(arrButtons[i].conteudo==aguaimgBtn){
          comprarAgua();
          loop()
        }else if(arrButtons[i].conteudo==madeiraimgBtn){
          comprarMadeira();
          loop()
        }else if(arrButtons[i].conteudo==metalimgBtn){
          comprarMetal();
          loop()
        }else if(arrButtons[i].conteudo==tijoloimgBtn){
          comprarTijolo() ;
          loop()
        };        
        }
      }
    }

     if(scene==3){
        for(let i=0; i<board.length; i++) {
         for(let j=0; j<board[i].length; j++) {
          if(board[i][j].click_Tile(mouseX,mouseY)){
            if(controloImagem==1){
              board[i][j].img= imgmadeira;
            }else if(controloImagem==2){
              board[i][j].img= imgmetal;
            }else if(controloImagem==3){
              board[i][j].img= imgtijolo;
            }else{
              board[i][j].img= imgagua;
            }
            board[i][j].empty=false;
             loop()
            /*let material = {
              "id_player":userServidor[0].id,
              "objeto":objeto,
              "PosX":i,
              "PosY":j
            }
  
            httpPost('/insertMaterial',material,'json',(resposta)=> {
             
              if(objeto=="Madeira"){
                board[i][j].clr = 150 ;
              }else if(objeto=="Metal"){
                board[i][j].clr = 220;
              }else if(objeto=="Água"){
                board[i][j].clr = 60;
              }else if(objeto=="Tijolo"){
                board[i][j].clr = 100;
              }
             
  
            });*/
            break;
          }
        }
      }
    }

      for(let i=0; i<arrButtonsBase.length; i++){
        if(arrButtonsBase[i].on_Click(mouseX, mouseY)){
          if(arrButtonsBase[i].conteudo==madeiraimgBtn){
            controloImagem=1;
          }else if(arrButtonsBase[i].conteudo==metalimgBtn){
            controloImagem=2;
          }else if(arrButtonsBase[i].conteudo==tijoloimgBtn){
            controloImagem=3;
          }else{
            controloImagem=4;
          }
        }
      }
  }

  

function leaderPopup(){
   
   let popupContainer = createDiv('');
   let linhas = [];

   let backgroundImage = createImg('/images/LeaderBoard.png');
    backgroundImage.size(400, 400);
    backgroundImage.parent(popupContainer);

   for (let i = 0; i < Math.min(arrayUsers.length, 10); i++) {
     let jogador = arrayUsers[i];
     let linha = createP(`${i + 1}. ${jogador.username} - ${jogador.pontos}`);
     linha.parent(popupContainer);
     linhas = linha;
   }
   linhas.position(width/2, height/2);

   let fecharBotao = createButton('Fechar');
   fecharBotao.mousePressed(() => {
     popupContainer.remove();
   });
   fecharBotao.parent(popupContainer);

   let posX = (windowWidth - backgroundImage.width) / 2.25;
   let posY = (windowHeight - backgroundImage.height) / 2.25;

   popupContainer.position(posX, posY);
   fecharBotao.position(width/8, height/2.2);
   
   
}

function keyPressed(){
  if (keyCode == 32)
    bullets.push(new Bullet(player.x, player.y, bulletSize,
      player.dir, bulletSpeed));
}

function tanque(){
 
  if (keyIsDown(UP_ARROW)) {
    player.y -= tankSpeed;
    player.dir = 'u';
  } else if (keyIsDown(DOWN_ARROW)) {
    player.y += tankSpeed;
    player.dir = 'd';
  } else if (keyIsDown(LEFT_ARROW)) {
    player.x -= tankSpeed;
    player.dir = 'l';
  } else if (keyIsDown(RIGHT_ARROW)) {
    player.x += tankSpeed;
    player.dir = 'r';
  }

  if (bullets.length > 0) {
    for (var i = 0; i < bullets.length; i++) {
      bullets[i].render(200, 200, 0);
      if (bullets[i].x < 0 || bullets[i].x > width ||
        bullets[i].y < 0 || bullets[i].y > height)
        bullets.splice(i, 1)
    }
  }

  player.x = constrain(player.x, 0, width);
  player.y = constrain(player.y, 0, height);

  player.render('/images/tanquecima.jpg');
  for (var i = 0; i < tanks.length; i++) 
    tanks[i].render(200,0,0);
 
}

/*function returnMenu(){
  returnBtn = createButton('<');
  returnBtn.position(width/1.25, height/1.15);
  returnBtn.style('font-size', '45px')
  returnBtn.style('background-color', 'transparent');
  returnBtn.style('color', '0');
  returnBtn.style('border', 'transparent');
  returnBtn.size(50,50);
  returnBtn.mousePressed(sceneanterior);
}*/

function loja(){
  scene=4;
  loop();
}

function comprarAgua(){
  let precoAgua = 100;
  let saldoMoedas = arrayLogin.dinheiro;
  if (saldoMoedas >= precoAgua) {
      let compra = { item: 'agua' };

      httpPost('/comprar/agua', 'json', compra, (result) => {
 
          if (result) {
              saldoMoedas -= precoAgua;
              alert("Água comprada!");
              console.log("Novo saldo:", saldoMoedas);
          } else {
              console.log("Erro ao comprar água.");
          }
      });
  } else {
      alert("Saldo insuficiente para comprar água.");
  }
}

function comprarMadeira(){
  let precoMadeira = 15;
  let saldoMoedas = arrayLogin.dinheiro;
  if (saldoMoedas >= precoMadeira) {
      let compra = { item: 'madeira' };

      httpPost('/comprar/madeira', 'json', compra, (result) => {
 
          if (result) {
              saldoMoedas -= precoMadeira;
              alert("Madeira comprada!");
              console.log("Novo saldo:", saldoMoedas);
          } else {
              console.log("Erro ao comprar madeira.");
          }
      });
  } else {
      alert("Saldo insuficiente para comprar madeira.");
  }
}

function comprarTijolo(){
  let precoTijolo = 35;
  let saldoMoedas = arrayLogin.dinheiro;
  if (saldoMoedas >= precoTijolo) {
      let compra = { item: 'tijolo' };

      httpPost('/comprar/tijolo', 'json', compra, (result) => {
 
          if (result) {
              saldoMoedas -= precoTijolo;
              alert("Tijolo comprado!");
              console.log("Novo saldo:", saldoMoedas);
          } else {
              console.log("Erro ao comprar tijolo.");
          }
      });
  } else {
      alert("Saldo insuficiente para comprar tijolo.");
  }
}

function comprarMetal(){
  let precoMetal = 70;
  let saldoMoedas = arrayLogin.dinheiro;
  if (saldoMoedas >= precoMetal) {
      let compra = { item: 'metal' };

      httpPost('/comprar/metal', 'json', compra, (result) => {
 
          if (result) {
              saldoMoedas -= precoMetal;
              alert("Metal comprado!");
              console.log("Novo saldo:", saldoMoedas);
          } else {
              console.log("Erro ao comprar metal.");
          }
      });
  } else {
      alert("Saldo insuficiente para comprar metal.");
  }
}


