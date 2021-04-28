var tela;
let MENU=0, START=1, OPCOES=2, CREDITOS=3, FAZE_1=4, FAZE_2=5, FAZE_3=6, SAIR=7; 
let bg_menu;
let fontBold;
let fontRegular;

var asterisk;

// variaveis do gameplay da fase 1 o vetor para o inimigo me indicaram por que é o mais adequado para estrutura de repetiçao e ter total controle dos objetos na tela .

var inimigos = [];//conter todos inimigos criados
var quedasX = [];//conter todo movimento de cada inimigo em x 
var quedasY = [];//conter todo movimento de cada inimigo em y
var sentidosX = [];// todos os sentidos do movimento em x 
var sentidosY= []; // todos os sentidos do movimento em y
var speedX = 1.8; // velocidade dos inimigos em x
var speedY = 2.3; // velocidade dos inimigos em y

//Inimigo Unitário
var enemy;
var sentidoX=0, sentidoY=0;

//Variáveis do player
var player;
var px=360, py=230;// posiçao em x e y posiçao inicial do personagem
var speedPX = 0, speedPY = 0;

//Banco de questões e respostas
let questoes = ["Quanto é 7 + 5 ?", "Quanto é 14 - 7?", "quanto é 20 + 3 ?"," quanto é 30 + 8 ?", " quanto é 42 +1?" , "quanto é 24+ 33?" , "quanto é 20 - 13?"," quanto é 22-11?","quanto é 60 +40?","quanto é 120 -100?" ,"quanto é 60*3?","quanto é 12*3?","quanto é 300-200 ?","quanto é 30 -15?","quanto é 66+3?","quanto é 30/5?","quanto é 100/100?","quanto é 23+20?","quanto é 30*0?","quanto é 150+50?","quanto é 22-18?","quanto é 30*4?","quanto é 10/5?","quanto é100/4?","quanto é 37-4?","quanto é 25+25?","quanto é 23-2?","quanto é 30*2?","quanto é 20/10?","quanto é 22-17?","quanto é 34 - 7","quanto é 18-17?","quanto é 41 + 26?","quanto é 33*3?","quanto é 33+41?","quanto é 77+24?","quanto é 70-20?","quanto é 22+20?","quanto é 33/11?","quanto é 40*2?"]
let alternativas = [
  [12, 11, 13],
  [11, 7, 9],
  [20,22,23] ,
  [38,37,33],
  [41,43,49],
  [57,52,67],
  [3,7,11],
  [11,15,17],
  [110,120,100],
  [20,22,24],
  [120,180,190],
  [36,37,38],
  [101,100,103],
  [12,18,15],
  [69,66,63],
  [7,6,8],
  [1,4,2],
  [55,51,53],
  [30,0,3],
  [175,200,250],
  [3,5,4],
  [120,122,124],
  [4,2,6],
  [25,20,30],
  [34,33,36],
  [51,52,50],
  [20,21,22],
  [59,58,60],
  [10,13,17],
  [5,6,7],
  [29,26,27],
  [1,3,4],
  [66,68,67],
  [99,98,97],
  [73,72,74],
  [103,101,104],
  [56,55,50],
  [43,42,45],
  [3,6,9],
  [81,80,82]
];

let respostas = [12,7,23,38,43,57,7,11,100,20,180,36,100,15,69,6,1,53,0,200,4,120,2,25,33,50,21,60,10,5,27,1,67,99,74, 101,50,42,3,80];

var painel;
var posicaoQuestao;
var nAlternativa=0;
var objsAlternativa=[];
var x_alternativa, y_alternativa;
var pontos = 0;
var vidas = 5;
var textVidas;
var protectionTime = 0;
var collisionTime = 0;
let img_gameover;
var bRestart;


function preload() {
	fontBold = loadFont('assets/Amatic-Bold.otf');
	fontRegular = loadFont('assets/AmaticSC-Regular.otf');
	asterisk = loadAnimation('assets/asterisk.png', 'assets/triangle.png', 'assets/square.png', 'assets/cloud.png', 'assets/star.png', 'assets/mess.png', 'assets/monster.png');
}

function setup() {
	textSize(62);
	textFont(fontBold);
	textAlign(CENTER, CENTER);
	
	bg_menu = loadImage('imgs/bg_math_man.jpg');
    img_gameover = loadImage('imgs/gameover1.png')  
  
	createCanvas(720, 460);
	carregarCena(MENU);
}

function draw() {
  if(tela==MENU){
	background(bg_menu);
	animation(asterisk, 110, 200);
  }
  
  if(tela==START){
    
    // movimento dos personagens
    moverPlayer(); 
    
    // move cade  inimigo que esta no vetor inimigos 
    for(x=0; x<inimigos.length; x++){
        moverInimigo(x);
    }
    
    checkAlternativaCollision();
    checkEnemyCollision();
    
    textVidas.html("Pontos: " + pontos + "<br>Vidas: " + vidas);
    
    if(protectionTime!=0){
      protectionTime--;
      
      if(protectionTime<0){
        protectionTime = 0;
      }
    }
    
    if(collisionTime!=0){
      collisionTime--;
      
      if(collisionTime<0){
        collisionTime = 0;
      }
    }
    
    if(vidas<=0){
      //Game Over
      textVidas.html("");
      background(img_gameover);
      limparStart();
      createRestartButton();
    }
  }
  
  if(tela==OPCOES){
    //background(bg_menu);
	let s = 'Tela de Opções';
	fill(50);
	text(s, 10, 10, 440, 120);
  }
  
  if(tela==CREDITOS){
    //background(bg_menu);
	let s = 'Tela de Créditos';
	fill(50);
	text(s, 10, 10, 440, 120);
  }
  
  if(tela==FAZE_1){
    //background(bg_menu);
	let s = 'Faze 1';
	fill(50);
	text(s, 10, 10, 440, 120);
  }
  
  if(tela==FAZE_2){
	//background(bg_menu);
	let s = 'Faze 2';
	fill(50);
	text(s, 10, 10, 440, 120);
  }
  
  if(tela==FAZE_3){
	//background(bg_menu);
	let s = 'Faze 3';
	fill(50);
	text(s, 10, 10, 440, 120);
  }
  
}

function checkAlternativaCollision(){
  if(collisionTime==0){
    for(i=0; i<objsAlternativa.length; i++){
      if(checkCollision(objsAlternativa[i])){
        if(parseInt(objsAlternativa[i].html())==respostas[posicaoQuestao]){
            pontos=pontos + 10;
            removerAlternativas()
            gerarQuestao();
            gerarAsAlternativas();
            gerarInimigo();
        } else{
            objsAlternativa[i].remove();
            pontos=pontos-5;
        }
        collisionTime = 120;
      }
    }
  }
}

function checkEnemyCollision(){
  if(protectionTime==0){
    for(i=0; i<inimigos.length; i++){
      if(checkCollision(inimigos[i])){
        sentidosX[i] = -sentidosX[i];
        vidas--;
        protectionTime = 200;
      }
    }
  }
}
  
function checkCollision(obj){
  var isCollised = false;
  
  if((obj.x+40  >= player.x && obj.x <= player.x + 66) && (obj.y+40  >= player.y && obj.y <= player.y + 72)){
    isCollised = true;
  }
  
  return isCollised;
}

//é chamada várias vezes
function moverPlayer(){
  player.position(player.x+speedPX, player.y+speedPY);
}

// movimentação do personagem (Player)
// é chamada quando um butão é pressionado
function keyPressed(){
  if(keyCode === ENTER){
     gerarInimigo();
  }
  
  if(keyCode == RIGHT_ARROW){
     speedPX = 3;
     player.style('padding-right', '8px');
  }
  
  if(keyCode == LEFT_ARROW){
     speedPX = -3;
     player.style('padding-left', '8px');
  }
  
  if(keyCode == UP_ARROW){
      speedPY = -3;
      player.style('padding-top', '8px');
  }
  
  if(keyCode == DOWN_ARROW){
     speedPY = 3;
     player.style('padding-bottom', '8px');
  }
}

//é chamado se um botão for liberado
function keyReleased(){
  if(keyCode == RIGHT_ARROW || keyCode == LEFT_ARROW){
      speedPX=0;
      player.style('padding', '20px');
  }
  
  if(keyCode == UP_ARROW || keyCode == DOWN_ARROW){
      speedPY=0;
      player.style('padding', '20px');
  }
}

function limparStart(){
  player.remove();
  painel.remove();
  textVidas.remove()
  vidas=5;

  //remove inimigos
  for(x=0; x<inimigos.length; x++){
    inimigos[x].remove();
  }

  removerAlternativas();
}

function carregarCena(cena){
	//verifica de qual tela está saindo
	if(tela==MENU){
		bStart.remove();
		bOpcoes.remove();
		bCreditos.remove();
		bSair.remove();
	} else if(tela==START){
		bBack.remove();
        if(cena != START && !bRestart){
          limparStart();
        } else if(cena != START && bRestart){
           bRestart.remove();         
        }
  
	} else if(tela==OPCOES){
		bBack.remove();
	} else if(tela==CREDITOS){
		bBack.remove();
        img1.remove()
        img2.remove()
        img3.remove()
        texto1.remove()
        texto2.remove()
        texto3.remove()
	}
	
	//atribui a cena
	tela = cena;
  
  //carrega os componentes das respectivas telas
  if(tela==MENU){
	cor_botao = color(255, 90, 181);
	
	bStart = createButton('START');
	bStart.position(500, 180);
	bStart.style("width", "180px");
	bStart.style("height", "40px");
	bStart.style("background-color", cor_botao);
	bStart.style("border-radius", "20px");
	
	//atribuindo função ao button
	bStart.mousePressed(openStart);

	bOpcoes = createButton('Opções');
	bOpcoes.position(500, 230);
	bOpcoes.style("width", "180px");
	bOpcoes.style("height", "40px");
	bOpcoes.style("background-color", cor_botao);
	bOpcoes.style("border-radius", "20px");
	
	//atribuindo função ao button
	bOpcoes.mousePressed(openOpcoes);
	
	bCreditos = createButton('Créditos');
	bCreditos.position(500, 280);
	bCreditos.style("width", "180px");
	bCreditos.style("height", "40px");
	bCreditos.style("background-color", cor_botao);
	bCreditos.style("border-radius", "20px");
	
	//atribuindo função ao button
	bCreditos.mousePressed(openCreditos);
	
	bSair = createButton('Sair');
	bSair.position(500, 330);
	bSair.style("width", "180px");
	bSair.style("height", "40px");
	bSair.style("background-color", cor_botao);
	bSair.style("border-radius", "20px");
	
	//atribuindo função ao button
	bSair.mousePressed(sair);
  }
  
  if(tela==START){
	background(200, 250, 200);
	createBackButton();

    gerarPainel();
    gerarQuestao();
    gerarAsAlternativas();
    gerarPlayer();
	gerarInimigo();
    
    textVidas = createDiv("Vidas: " + vidas);
    textVidas.position(590, 20);
    textVidas.style('font-size', '24px');
    textVidas.style('font-weight', 'bolder'); 
    
  }
  
  if(tela==OPCOES){
    background(200, 250, 200);
	createBackButton();
  }
  
  if(tela==CREDITOS){
    background(200, 250, 200);
	createBackButton();
    
    //Criar as imagens de perfil
    img1 = createDiv("");
    img1.style("border-style", 'solid');
    img1.style("border-color", 'black');
    img1.style('border-radius', '40px');
    img1.html("<img style='border-radius: 40px' src='imgs/gameover1.png' width='100' height='120'>")
    img1.position(60, 170);
    
    //Nome 1
    texto1 = createDiv("Rauanderson Marinho<br>Graduando de C&T");
    texto1.style("text-align", "center");
    texto1.style("width", "160px")
    texto1.position(40, 310);
    
    //Criar as imagens de perfil
    img2 = createDiv("");
    img2.style("border-style", 'solid');
    img2.style("border-color", 'black');
    img2.style('border-radius', '40px');
    img2.html("<img style='border-radius: 40px' src='imgs/gameover1.png' width='100' height='120'>")
    img2.position(320, 170);
    
    //Nome 1
    texto2 = createDiv("Rauanderson Marinho<br>Graduando de C&T");
    texto2.style("text-align", "center");
    texto2.style("width", "160px")
    texto2.position(300, 310);
    
    //Criar as imagens de perfil
    img3 = createDiv("");
    img3.style("border-style", 'solid');
    img3.style("border-color", 'black');
    img3.style('border-radius', '40px');
    img3.html("<img style='border-radius: 40px' src='imgs/gameover1.png' width='100' height='120'>")
    img3.position(560, 170);
    
    //Nome 1
    texto3 = createDiv("Rauanderson Marinho<br>Graduando de C&T");
    texto3.style("text-align", "center");
    texto3.style("width", "160px")
    texto3.position(540, 310);
    
  }
  
  if(tela==FAZE_1){
    background(200, 250, 200);
	createBackButton();
  }
  
  if(tela==FAZE_2){
    background(250, 200, 200);
	createBackButton();
  }
  
  if(tela==FAZE_3){
    background(200, 180, 250);
	createBackButton();
  }
  
  if(tela==SAIR){
    background(200, 250, 200);
  }
}

function gerarPlayer(){
  player = createDiv("👀");
  player.style("background", "#eaa");
  player.style('font-size', '24px'); 
  player.style('padding', '20px');
  player.style("border-style", 'solid');
  player.style("border-color", 'black');
  player.style('border-radius', '40px');
  
  //posicionar player no centro (px, py)
  player.position(px, py);
}

function gerarPainel(){
  painel = createDiv("");
  painel.style("background", color(255, 90, 181));
  painel.style('font-size', '24px'); 
  painel.style('color', 'black');
  painel.style('padding', '10px');
  painel.style('width', '720px');
  painel.style("border-style", 'solid');
  painel.style("border-color", 'black');
  painel.style('border-bottom-right-radius', '40px');
  painel.style('border-bottom-left-radius', '40px');
  painel.style('text-align', 'center');
}

function gerarQuestao(){
  var q = random(questoes);
  posicaoQuestao = questoes.indexOf(q);
  painel.html(q);
}

function gerarAsAlternativas(){
  for(i=0; i<3; i++){
      gerarAlternativa()
      posicionarAlternativa(alternativa);
      objsAlternativa.push(alternativa)
      nAlternativa++;
    }
  nAlternativa=0;
}

function gerarAlternativa(){
  alternativa = createDiv(alternativas[posicaoQuestao][nAlternativa]);
  alternativa.style("background", color(90, 255, 90));
  alternativa.style('font-size', '18px'); 
  alternativa.style('color', 'black');
  alternativa.style('width', '50px');
  alternativa.style('padding-top', '10px');
  alternativa.style('padding-bottom', '10px');
  alternativa.style('padding-right', '2px');
  alternativa.style("border-style", 'solid');
  alternativa.style("border-color", 'black');
  alternativa.style('border-radius', '40px');
  alternativa.style('text-align', 'center');
}

function gerarInimigo(){
  enemy = createDiv("");
  enemy.style("background", "#f55");
  enemy.style('font-size', '24px'); 
  enemy.style('padding', '20px');
  enemy.style("border-style", 'solid');
  enemy.style("border-color", 'black');
  enemy.style('border-radius', '40px');

  posicionarInimigo(enemy);

  //enquanto exister sentidos em X e Y iguais a 0, pegue sentidos aleatoriamente 
  while(sentidoX==0 || sentidoY==0){
    sentidoX = parseInt(random(-3, 3));
    sentidoY = parseInt(random(-3, 3));
  }

  //atribuindo as caracteristicas do inimigo aos vetores
  inimigos.push(enemy);
  quedasX.push(enemy.x);
  quedasY.push(enemy.y);
  sentidosX.push(sentidoX);
  sentidosY.push(sentidoY);

  //limpando sentidos de base
  sentidoX=0;
  sentidoY=0
}

function posicionarInimigo(enemy){
    x_ideal = false;
    y_ideal = false;
	x_enemy = random(1, 680);
	y_enemy = random(1, 420);
  
    //evitando area de cascimento do player
    if(x_enemy<280 || x_enemy>480){
      x_ideal = true;
    }
    if(y_enemy<150 || y_enemy>310){
      y_ideal = true;
    }
  
    if(x_ideal || y_ideal){
      enemy.position(x_enemy, y_enemy);
    } else{
      posicionarInimigo(enemy);
    }
}

//Usa as posiçoes dos vetores inimigos, quedas e sentidos para determinar a posição de cada inimigo
function moverInimigo(index){
  quedasX[index] = quedasX[index] + speedX*sentidosX[index];
  quedasY[index] = quedasY[index] + speedY*sentidosY[index];
    
  inimigos[index].position(quedasX[index], quedasY[index]);
  
  // se chegar nos limites da tela (mudar sentido) 
  if(quedasX[index]>=680){
    sentidosX[index] = -sentidosX[index];
  }
  
  if(sentidosX[index]<0 && quedasX[index]<=0){
    sentidosX[index] = -sentidosX[index];
  }
  
  if(quedasY[index]>=420){
    sentidosY[index] = -sentidosY[index];
  }
  
  if(sentidosY[index]<0 && quedasY[index]<=0){
    sentidosY[index] = -sentidosY[index];
  }
}

function posicionarAlternativa(alternativa){
    x_ideal = false;
    y_ideal = false;
	x_alternativa = random(1, 680);
	y_alternativa = random(1, 420);
  
    //evitando area de cascimento do player
    if(x_alternativa<280 || x_alternativa>480){
      x_ideal = true;
    }
    if(y_alternativa<150 || y_alternativa>310){
      y_ideal = true;
    }
  
    if(x_ideal || y_ideal){
      alternativa.position(x_alternativa, y_alternativa);
    } else{
      posicionarAlternativa(alternativa);
    }
}

function removerAlternativas(){
  for(i=0; i<3; i++){
    objsAlternativa[i].remove();
  }
  objsAlternativa=[];
}

//funções de criação
function createBackButton(){
	bBack = createButton('<');
	bBack.position(10, 10);
	bBack.style("width", "40px");
	bBack.style("height", "40px");
	bBack.style("background-color", cor_botao);
	bBack.style("border-radius", "20px");
	
	//atribuindo função ao button
	bBack.mousePressed(back);
}

function createRestartButton(){
	bRestart = createButton('Tentar Novamente');
	bRestart.position(250, 360);
	bRestart.style("width", "230px");
	bRestart.style("height", "40px");
    bRestart.style('font-size', '24px');
	bRestart.style("background-color", cor_botao);
	bRestart.style("border-radius", "20px");
    bRestart.style('font-weight', 'bolder'); 
	
	//atribuindo função ao button
	bRestart.mousePressed(restart);
}

//funções dos buttons
function openStart(){carregarCena(START);}
function openOpcoes(){carregarCena(OPCOES);}
function openCreditos(){carregarCena(CREDITOS);}
function back(){carregarCena(MENU);}
function restart(){
  carregarCena(START);
  bRestart.remove();
}
function sair(){carregarCena(SAIR);}