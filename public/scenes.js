//Imagens
let telainicial;
let fundo;
let user;
let store;
let iconSize = 50;
let userN = {
    "username":"x",
    "pontos":"XP",
    "dinheiro":"$"
};

let font;

//Loja
let imgagua;
let imgmadeira;
let imgtijolo;
let imgmetal;
let comprarBtn;
let lojafundo;
let metalimgBtn;
let madeiraimgBtn;
let tijoloimgBtn;
let aguaimgBtn;

//Login e resgisto inputs
let nameInput;
let passInput;
let loginBtn;
let registerBtn;

//Menu
let textElement1;
let textElement2;
let textElement3;
let imagemUser;
let jogarimgBtn;
let baseimgBtn;
let leaderimgBtn;
let storeimgBtn;

let returnBtnimage;

let controloImagem=0;

let arrButtons=[];
let arrButtonsMenu = [];
let arrButtonsBase = [];
let tanqueimagem;
let tanqueimagemD;
let tanqueimagemE;
let tanqueimagemB;

let balaimagem;
let balaimagemR;
let balaimagemL;
let balaimagemD;

function preload(){
    telainicial = loadImage('/images/telainicio_2.gif');
    fundo = loadImage('/images/Tela_Inicial.png');
    user = loadImage('images/user.png');
    lojafundo = loadImage('/images/LojaScene.png');
    font = loadFont('/assets/Capture it.ttf');
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
    returnBtnimage = loadImage('/images/return.png')
    headerMenu();
}

function loginScene(){
    push();
    clear();
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

    showImageButtonsMenu()
    pop();

}

function gameScene(){
    gameBoard();
}

function baseScene(){
    draw_Board();
    showImageButtonsBase ();
}

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

function createImageButtonsStore(){

    arrButtons[0]=new Button(width/8.9, height/1.5,aguaimgBtn,120,50)
    arrButtons[1]=new Button(width/2.83, height/1.5,madeiraimgBtn,110,65)
    arrButtons[2]=new Button(width/1.71, height/1.5,tijoloimgBtn,110,75)
    arrButtons[3]=new Button(width/1.23, height/1.5,metalimgBtn,110,70)
    arrButtons[4]=new Button(width/1.25, height/1.15,returnBtnimage,50,50);
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
}

function showImageButtonsBase(){

    for(let i=0;i<arrButtonsBase.length;i++){

        arrButtonsBase[i].draw_Button();

    }
}