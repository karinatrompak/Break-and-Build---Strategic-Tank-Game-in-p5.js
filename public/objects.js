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

 /* class Menu{
    constructor(username,pontos,dinheiro){
      this.username = username;
      this.pontos = pontos;
      this.dinheiro = dinheiro;
    }

    text(""+this.username, width/9, height/13.5);
    text("XP"+this.pontos, width/2.1, height/13.5);
    text("$"+this.dinheiro, width/1.1, height/13.5);

  }*/


  