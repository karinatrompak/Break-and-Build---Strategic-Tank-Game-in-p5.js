let scene = 0;

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
