let scene = 0;
let controloImagem = 0;

//Board 
let boardClicable=false;

//Cabeçalho
let iconSize = 50;
let userN = {
    "username":"x",
    "pontos":"XP",
    "dinheiro":"$"
};
// Arrays
let arrayLogin = [];
let arrayUsers = [];
let arrButtons=[];
let arrButtonsMenu = [];
let arrButtonsBase = [];
let board = [];

//Login e Registo inputs
let nameInput;
let passInput;
let loginBtn;
let registerBtn;

// Fonte
let font;
// Imagens
let telainicial;
let fundo;
let user;
let store;
let jogarimgBtn;
let baseimgBtn;
let storeimgBtn;
let leaderimgBtn;

let imgagua;
let imgmadeira;
let imgmetal;
let imgtijolo;
let madeiraimgBtn;
let metalimgBtn;
let aguaimgBtn;
let tijoloimgBtn

let tanqueimagem;
let tanqueimagemD;
let tanqueimagemE;
let tanqueimagemB;
let balaimagem;
let balaimagemD;
let balaimagemL;
let balaimagemR;



//Tanque
let player, tankSpeed = 5,
  tankSize = 10,
  bulletSpeed = 7,
  bulletSize = 2;
let tanks = [];
let bullets = [];
let sceneanterior;
let visivel;


function preload(){
    font = loadFont('/assets/Capture it.ttf');
    telainicial = loadImage('/images/telainicio_2.gif');
    fundo = loadImage('/images/Tela_Inicial.png');
    user = loadImage('images/user.png');
    lojafundo = loadImage('/images/LojaScene.png');
    imgagua = loadImage('/images/water.jpg');
    imgmadeira = loadImage('/images/wood.jpg');
    imgtijolo = loadImage('/images/brick.jpg')
    imgmetal = loadImage('/images/metal.jpg');
    madeiraimgBtn = loadImage('/images/MadeiraBtn.png');
    metalimgBtn = loadImage('/images/MetalBtn.png');
    aguaimgBtn = loadImage('/images/AguaBtn.png');
    tijoloimgBtn = loadImage('/images/TijoloBtn.png');
    jogarimgBtn = loadImage('/images/JogarBTN.png');
    baseimgBtn = loadImage('/images/BaseBTN.png');
    storeimgBtn = loadImage('/images/gas-station.png');
    leaderimgBtn = loadImage('/images/podium.png');
    tanqueimagem = loadImage('/images/tanquecima.jpg');
    tanqueimagemD = loadImage('/images/tanque_right.jpg');
    tanqueimagemE = loadImage('/images/tanque_left.jpg');
    tanqueimagemB = loadImage('/images/tanque_down.jpg');
    balaimagem = loadImage('/images/bala.png');
    balaimagemD = loadImage('/images/balaD.png');
    balaimagemL = loadImage('/images/balaL.png');
    balaimagemR = loadImage('/images/balaR.png');
    returnBtnimage = loadImage('/images/return.png');
    headerMenu();
}


function setup() {
    createCanvas(windowWidth , windowHeight);
    create_Board();
    createImageButtonsStore();
    createImageButtonMenu();
    createImageButtonBase();
    player = new Tank(true, 300, 300, tankSize, 'u');
}

function draw() {
    console.log(scene)
    if (scene==0){
      loginScene();
    }else if(scene==1){
      console.log("cena menu")
      menuScene();    
    }else if(scene==2){
      console.log("jogo")
      gameScene();
    }else if(scene==3){
      console.log("base scene")
      baseScene();
    }else if(scene==4){
      storeScene();
    }
    
    if(scene!=2)
    noLoop();
}

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

//Cenas
//Scene 0 
function loginScene(){
    push();
    //clear();
    fill(0);
    background(255);
    //background(telainicial);
    image(telainicial,0,0,width,height);
    textFont(font);
    text("Nome", width/7, height/1.8);
    nameInput = createInput('');
    nameInput.position(width/7, height/1.75);
    nameInput.size(200);

    text("Palavra-passe", width/7, height/1.58);
    passInput = createInput('');
    passInput.position(width/7, height/1.54);
    passInput.size(200);

    loginBtn = createButton('Login');
    loginBtn.position(width/7, height/1.4);
    loginBtn.size(80,25);
    loginBtn.mousePressed(login);

    registerBtn = createButton('Registo');
    registerBtn.position(width/4.2, height/1.4);
    registerBtn.size(80,25);
    registerBtn.mousePressed(register);

    pop();
}
//Scene 1
function menuScene(){
    background(fundo);
    push();
    fill(255);
    textFont(font);

    let iconX = width / 13 - iconSize / 2;
    let iconY = 37;     
    imagemUser = image(user, iconX, iconY, iconSize, iconSize);  
    textSize(20);
    identificarUser();
    textElement1 = text(""+userN.username, width/8.6, height/10);
    textElement2 =text("XP"+userN.pontos, width/2.11, height/9.8);
    textElement3 =text(userN.dinheiro, width/1.10, height/10); 
    console.log(textElement1);
    showImageButtonsMenu()

    pop();

}
//Scene 2
function gameScene(){
  gameBoard();
}
//Scene 3
function baseScene(){
    draw_Board();
    showImageButtonsBase ();
}
//Scene 4
function storeScene(){
    loop();
    loja();
    fill(255);
    background(lojafundo);
    textFont(font);

    let iconX = width / 13 - iconSize / 2;
    let iconY = 37;     
   //imagemUser = image(user, iconX, iconY, iconSize, iconSize);  
    textSize(20);
    identificarUser();
    textElement1 = text(""+userN.username, width/8.6, height/10);
    textElement2 = text("XP"+userN.pontos, width/2.11, height/9.8);
    textElement3 = text(userN.dinheiro, width/1.10, height/10);
 
    showImageButtonsStore();

    visivel = false;
}

//Funções
//Board
function gameBoard(){
    background(255)
    tanque();
    scene=2;
    loop();
}

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

//Botões
function createImageButtonsStore(){

    arrButtons[0]=new Button(width/8.9, height/1.5,aguaimgBtn,120,50)
    arrButtons[1]=new Button(width/2.83, height/1.5,madeiraimgBtn,110,65)
    arrButtons[2]=new Button(width/1.71, height/1.5,tijoloimgBtn,110,75)
    arrButtons[3]=new Button(width/1.23, height/1.5,metalimgBtn,110,70)
    arrButtons[4]=new Button(width/8.6, height/1.15,returnBtnimage,50,50);
}

function showImageButtonsStore(){

    console.log("mostra");
    console.log(arrButtons)
    for(let i=0;i<arrButtons.length;i++){

        arrButtons[i].draw_Button();

    }
}

function createImageButtonMenu(){
    arrButtonsMenu[0]= new Button(width/5, height/2.2,jogarimgBtn,300,120);
    arrButtonsMenu[1]= new Button(width/1.5, height/2.2,baseimgBtn,300,120);
    arrButtonsMenu[2]= new Button(width/1.09, height/1.155555,storeimgBtn,50,50);
    arrButtonsMenu[3]= new Button(width/1.232, height/1.155555,leaderimgBtn,50,50);
}

function showImageButtonsMenu(){

    for(let i=0;i<arrButtonsMenu.length;i++){

        arrButtonsMenu[i].draw_Button();

    }
}

function createImageButtonBase(){
    arrButtonsBase[0]= new Button(100, 100, madeiraimgBtn,100,50);
    arrButtonsBase[1]= new Button(100, 200, tijoloimgBtn,100,50);
    arrButtonsBase[2]= new Button(100, 300, metalimgBtn,100,50);
    arrButtonsBase[3]= new Button(100, 400, aguaimgBtn,100,50);
    arrButtonsBase[4]= new Button(width/8.6, height/1.15,returnBtnimage,50,50);
}

function showImageButtonsBase(){

    for(let i=0;i<arrButtonsBase.length;i++){

        arrButtonsBase[i].draw_Button();

    }
}

function keyPressed(){
  if (keyCode == 32){
    bullets.push(new Bullet(player.x, player.y, bulletSize,
      player.dir, bulletSpeed));}
  if(scene == 0){
    if(keyCode == 13){
        login();
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

class Button{
  
    constructor(cx,cy,tx,l,a){
  
      this.centroX=cx;
      this.centroY=cy;
      this.largura=l;
      this.altura=a;
      this.corBt="#f5dd67";
      this.corBordaBt = "#ebeae6";
      this.tamTexto=20;
      this.corTexto=0;
      this.conteudo=tx;
    }
    
    draw_Button(){
 

        image(this.conteudo, this.centroX,this.centroY,this.largura,this.altura);

    }
    
    on_Click(x,y){
    
      if (
      x > this.centroX - this.largura / 2 &&
      x < this.centroX + this.largura / 2 &&
      y > this.centroY - this.altura / 2 &&
      y < this.centroY + this.altura / 2
    ) {
      return true;
    } else {
      return false;
    }
    }
    
    on_Hover(x,y){
    
      if (
      x > this.centroX - this.largura / 2 &&
      x < this.centroX + this.largura / 2 &&
      y > this.centroY - this.altura / 2 &&
      y < this.centroY + this.altura / 2
    ) {
      return true;
    } else {
      return false;
    }
    }    
    
}

class Tile {
    constructor(x, y, tx, ty, s, img) {
      this.x = x;
      this.y = y;
      this.tx = tx;
      this.ty = ty;
      this.s = s;
      this.clr="red";
      this.empty=true;
      this.img=img;
    }
  
    draw_Tile() {
      if(this.empty){
        fill(this.clr)
      square(this.x, this.y, this.s);
      }else{
        image(this.img, this.x, this.y, this.s);
      }

      
    }
  
    click_Tile(x, y) {
      if (
        x > this.x &&
        x < this.x + this.s &&
        y > this.y &&
        y < this.y + this.s
      ) {
        return true;
      } else {
        return false;
      }
    }
}

class Tank {
    constructor(iP, tx, ty, ts, tdir ) {
      this.x = tx;
      this.y = ty;
      this.s = ts;
      this.isPlayer = iP;
      this.dir = tdir;
    }
  
    rectTank(tx, ty) {
    }
  
    render(r,g,b) {
      fill(r,g,b);
      imageMode(CENTER);
      //center
      this.rectTank(this.x, this.y);
  
      // Cabeça do tanque
      if (this.dir == 'u') {
        this.rectTank(this.x, this.y - this.s);
        imageMode()
        image(tanqueimagem,this.x,this.y);
      } else if (this.dir == 'd') {
        this.rectTank(this.x, this.y - this.s);
        imageMode();
        image(tanqueimagemB,this.x,this.y);
      } else if (this.dir == 'l') {
        this.rectTank(this.x, this.y - this.s);
        imageMode();
        image(tanqueimagemE,this.x,this.y);
      } else if (this.dir == 'r') {
        this.rectTank(this.x, this.y - this.s);
        imageMode();
        image(tanqueimagemD,this.x,this.y);
      }
    }
}

class Bullet {
  constructor(tx, ty, ts, tdir, tspeed) {
    this.x = tx;
    this.y = ty;
    this.s = ts;
    this.dir = tdir;
    this.speed = tspeed;
  }

  render(r,g,b) {
    fill(r,g,b);
    switch (this.dir) {
      case 'u': this.y -= this.speed;	image(balaimagem, this.x , this.y, 60, 60); break;
      case 'd': this.y += this.speed;	image(balaimagemD, this.x , this.y, 60, 60); break;
      case 'l': this.x -= this.speed; image(balaimagemL, this.x , this.y, 60, 60); break;
      case 'r': this.x += this.speed;	image(balaimagemR, this.x , this.y, 60, 60); break;
  }
}
}

