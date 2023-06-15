let playerShir = 230,playerX = 400 - playerShir/2, playerY = 550,
    playerVis = 10, playerSkorost, playerCelX = playerX,
    tipNaKletka = [], tX = 400, tY = 300, tdX = 3, tdY=4, tShir=20,
    kletkaShir = 40,cvetove = ["orange", "green", "cyan", "pink", "yellow", "white", "purple"];

let difficulty = 6;
let brBoxes = 20 * difficulty;
let ballMoving = true;
    
for(let i = 0; i < 20; i++) {
    tipNaKletka[i] = [];
    for(let j = 0; j < difficulty; j++) {tipNaKletka[i][j] = randomInteger(7);}
}

let playing = false;

function update() {

    if(ballMoving == true) {
        tX = tX + tdX;  tY = tY + tdY;
        playerX = playerX + (playerCelX-playerX);
        /*if(isKeyPressed[65]){ playerCelX = playerCelX - 10;}//A=65
        if(isKeyPressed[68]){ playerCelX = playerCelX + 10;}//D=68*/
        
        playerCelX = mouseX - playerShir / 2;
    }


    
    if(playing == true){
        
        if(tX < 0 || tX > 800 - tShir) {tdX = -tdX}; 
        if(tY < 0) {tdY = -tdY} // Сблъсък между топче и екрана
        if(areColliding(playerX, playerY, playerShir, playerVis, tX, tY, tShir, tShir)) { // сблъсък между топче и играч
            let cX = playerX + playerShir/2, cY = playerY + playerVis/2;
            tdX = (tX-cX)/20;
            tdY = (tY-cY)/10;
        }
        for(let i = 0; i < 20; i++) {   // сблъсък между таблица и топче
            for(let j = 0; j < difficulty; j++) {
                if(tipNaKletka[i][j] != -1 && areColliding(tX, tY, tShir, tShir, i*kletkaShir, j*kletkaShir + 100, kletkaShir, kletkaShir)) {
                    tdY = -tdY;
                    tipNaKletka[i][j] = -1; // Унищожаваме клетка
                    brBoxes--;
                    return;
                }
            }
        }
    }else{
        tY = playerY - 25;
        tX = playerX + playerShir / 2;
    }

    if(playerX < 0){
        playerX = 0;
    }else if(playerX + playerShir > 800){
        playerX = 800 - playerShir;
    }
    
}
function draw() {

    context.fillStyle = "grey";
    context.fillRect(0, 0, 800, 600);
    context.strokeRect(0, 0, 800, 600);

    context.fillStyle = "purple";
    context.fillRect(playerX, playerY, playerShir, playerVis);
    context.strokeRect(playerX, playerY, playerShir, playerVis);

    for(let i = 0; i < 20; i++) {
        for(let j = 0; j < difficulty; j++) {
            if(tipNaKletka[i][j] != -1) {
                context.fillStyle = cvetove[ tipNaKletka[i][j] ];
                context.fillRect(i*kletkaShir, j*kletkaShir + 100, kletkaShir, kletkaShir);
            }
        }
    }
    drawImage(ballOrTree, tX, tY, tShir, tShir);

    if(playing == false){
        context.font = "50px Arial"
        context.fillStyle = "Black"
        context.fillText("Click to Start", 200, 50, 400, 10);
    }

    if(tY > playerY){

        context.font = "50px Arial"
        context.fillStyle = "Black"
        context.fillText("Press R to restart", 200, 50, 400, 10);

        if(isKeyPressed[82]){
            playing = false;

            for(let i = 0; i < 20; i++) {
                tipNaKletka[i] = [];
                for(let j = 0; j < 6; j++) {tipNaKletka[i][j] = randomInteger(5);}
            }
        }

    }

    if(playing == false) {
        context.font = "20px Arial"
        context.fillStyle = "Black"
        context.fillText("Press E for easy mode;", 20, 400, 400, 10);
        context.fillText("Press M for easy mode;", 20, 450, 400, 10);
        context.fillText("Press H for easy mode;", 20, 500, 400, 10);

        if(isKeyPressed[69]) {
            difficulty = 3;

            for(let i = 0; i < 20; i++) {
                tipNaKletka[i] = [];
                for(let j = 0; j < difficulty; j++) {tipNaKletka[i][j] = randomInteger(7);}
            }

        }else if(isKeyPressed[77]){
            difficulty = 6;

            for(let i = 0; i < 20; i++) {
                tipNaKletka[i] = [];
                for(let j = 0; j < difficulty; j++) {tipNaKletka[i][j] = randomInteger(7);}
            }

        }else if(isKeyPressed[72]){
            difficulty = 10;

            for(let i = 0; i < 20; i++) {
                tipNaKletka[i] = [];
                for(let j = 0; j < difficulty; j++) {tipNaKletka[i][j] = randomInteger(7);}
            }
        }
        brBoxes = 20 * difficulty;
    }

    if(brBoxes <= 0){
        ballMoving = false;

        context.font = "50px Arial"
        context.fillStyle = "Black"
        context.fillText("YOU WON!", 270, 250, 400, 10);

        context.font = "20px Arial"
        context.fillText("Press R to play again.", 300, 350, 400, 10);

        if(isKeyPressed[82]){
            playing = false;
            ballMoving = true;
            
            for(let i = 0; i < 20; i++) {
                tipNaKletka[i] = [];
                for(let j = 0; j < 6; j++) {tipNaKletka[i][j] = randomInteger(5);}
            }
        }
    }

}

function keyup(key) {
}

function mouseup() {

    if (mouseup){
        playing = true;
    }
}

