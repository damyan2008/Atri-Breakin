let monitorDown = screen.height;

let movementMode = "mouse", modeCycle = 1, movementSpeed = 12;

let player2X = 500, playerMode = "single", playerModeCycle = 1;

let playerShir = 200, playerX = 400 - playerShir/2, playerY = monitorDown - 200,
    playerVis = 10, playerSkorost, playerCelX = playerX,
    tipNaKletka = [], tX = 400, tY = 300, tdX = 3, tdY = 4, tShir = 25,
    kletkaShir = 40, cvetove = ["orange", "green", "cyan", "pink", "yellow", "white", "purple"];

let monitor = screen.width;
let dq1 = 30;

let difficulty = 6;
let brBoxes = Math.abs(dq1 * difficulty);
let ballMoving = true;
let ballMovingCounter = 0;

for(let i = 0; i < dq1; i++) {
    tipNaKletka[i] = [];
    for(let j = 0; j < difficulty; j++) {tipNaKletka[i][j] = randomInteger(7);}
}

let playing = false;

function update() {

    if(isKeyPressed[70]) {//Game freeze
        ballMovingCounter += 0.1;
    }

    if(Math.ceil(ballMovingCounter) % 2 == 0 && brBoxes >= 1) {//Game freeze
        ballMoving = true;
    }else{
        ballMoving = false;
    }


    if(isKeyPressed[32]){
        playing = true;
    }

    if(Math.ceil(modeCycle) % 2 == 0) {
        movementMode = "keys"
    }else{
        movementMode = "mouse";
    }

    if(Math.ceil(playerModeCycle) % 2 == 0) {
        playerMode = "double";
    }else{
        playerMode = "single";
    }

    if (playerMode == "double"){
        movementMode = "keys";
    }

    if(ballMoving == true) {
        tX = tX + tdX;  tY = tY + tdY;
        playerX = playerX + (playerCelX - playerX);
        /*if(isKeyPressed[65]){ playerCelX = playerCelX - 10;}//A=65
        if(isKeyPressed[68]){ playerCelX = playerCelX + 10;}//D=68*/
        
        if (movementMode == "mouse"){

        playerCelX = mouseX - playerShir / 2;

        }else{
            if(isKeyPressed[65]){//A
                playerCelX -= movementSpeed;
            }

            if(isKeyPressed[68]){//D
                playerCelX += movementSpeed;
            }

            if(isKeyPressed[37]){//<-
                player2X -= movementSpeed;
            }

            if(isKeyPressed[39]){//->
                player2X += movementSpeed;
            }
        }
    }


    
    if(playing == true){
        
        if(tX < 0) {
            tdX = -tdX
            tX = 0;
        }else if(tX > monitor - tShir){
            tdX = -tdX
            tX = monitor - tShir;
        }; 

        if(tY < 0) {
            tdY = -tdY
        } // Сблъсък между топче и екрана

        if(areColliding(playerX, playerY, playerShir, playerVis, tX, tY, tShir, tShir)) { // сблъсък между топче и играч
            let cX = playerX + playerShir/2, cY = playerY + playerVis/2;
            tdX = (tX-cX)/20;
            tdY = (tY-cY)/5;
        }

        if(playerMode == "double"){
            if(areColliding(player2X, playerY + 15, playerShir, playerVis, tX, tY, tShir, tShir)) { // сблъсък между топче и играч 2
                let cX = player2X + playerShir/2, cY = playerY + 15 + playerVis/2;
                tdX = (tX-cX)/20;
                tdY = (tY-cY)/5;
            }
        }

        for(let i = 0; i < dq1; i++) {   // сблъсък между таблица и топче
            for(let j = 0; j < difficulty; j++) {
                if(tipNaKletka[i][j] != -1 && areCollidingUD(tX, tY, tShir, tShir, (monitor / 2 - 655) + i*kletkaShir * 1.1, j*kletkaShir * 1.1 + 70, kletkaShir, kletkaShir)) {
                    tdY = -tdY;
                    
                    tipNaKletka[i][j] = -1; // Унищожаваме клетка
                    brBoxes--;
                    return;
                } else if(tipNaKletka[i][j] != -1 && areCollidingSides(tX, tY, tShir, tShir, (monitor / 2 - 655) + i*kletkaShir * 1.1, j*kletkaShir * 1.1 + 70, kletkaShir, kletkaShir)) {
                    tdX = -tdX;
                    
                    tipNaKletka[i][j] = -1; // Унищожаваме клетка
                    brBoxes--;
                    return;
            }
        }    
    }
    }else{
        tY = playerY - tShir - 5;
        tX = playerX + playerShir / 2 - 10;

        if(isKeyPressed[80]){//P
            modeCycle += 0.1;
        }

        if(isKeyPressed[79]){//O
            playerModeCycle += 0.1; 
        }
    }

    if(playerCelX < 0){
        playerCelX = 0;
    }else if(playerCelX + playerShir > monitor){
        playerCelX = monitor - playerShir;
    }

    if(player2X < 0){
        player2X = 0;
    }else if(player2X + playerShir > monitor){
        player2X = monitor - playerShir;
    }
    
}
function draw() {

    context.fillStyle = "grey";
    context.fillRect(0, 0, monitor, monitorDown);
    context.strokeRect(0, 0, monitor, monitorDown);

    context.fillStyle = "purple";
    context.fillRect(playerX, playerY, playerShir, playerVis);
    context.strokeRect(playerX, playerY, playerShir, playerVis);

    if(playerMode == "double"){
        context.fillStyle = "red";
        context.fillRect(player2X, playerY + 15, playerShir, playerVis);
        context.strokeRect(player2X, playerY + 15, playerShir, playerVis);
    }

    for(let i = 0; i < dq1; i++) {
        for(let j = 0; j < difficulty; j++) {
            if(tipNaKletka[i][j] != -1) {
                context.fillStyle = cvetove[ tipNaKletka[i][j] ];
                context.fillRect((monitor / 2 - 655) + i*kletkaShir * 1.1, j*kletkaShir * 1.1 + 70, kletkaShir, kletkaShir);
            }
        }
    }
    drawImage(ballOrTree, tX, tY, tShir, tShir);

    if(playing == false){
        context.font = "50px Arial"
        context.fillStyle = "Black"
        context.fillText("Click or Press Space to Start", monitor / 2 - 250, 50, 450, 10);
    }

    if(tY > playerY){

        context.font = "50px Arial"
        context.fillStyle = "Black"
        context.fillText("Press R to restart", monitor / 2 - 200, 50, 400, 10);

        if(isKeyPressed[82]){
            playing = false;

            for(let i = 0; i < dq1; i++) {
                tipNaKletka[i] = [];
                for(let j = 0; j < difficulty; j++) {tipNaKletka[i][j] = randomInteger(7);}
            }
        }

    }

    if(playing == false) {
        context.font = "20px Arial"
        context.fillStyle = "Black"
        context.fillText("Press E for easy mode;", 20, 400, 400, 10);
        context.fillText("Press M for medium mode;", 20, 450, 400, 10);
        context.fillText("Press H for hard mode;", 20, 500, 400, 10);
        context.fillText("Movement mode: " + movementMode + " (P to change)", 20, 550, 400, 10);
        context.fillText("Player mode: " + playerMode + " (O to change)", 20, 600, 400, 10);
        context.fillText("Press F to pause the game", 20, 650, 400, 10);

        if(isKeyPressed[69]) {
            difficulty = 3;

            for(let i = 0; i < dq1; i++) {
                tipNaKletka[i] = [];
                for(let j = 0; j < difficulty; j++) {tipNaKletka[i][j] = randomInteger(7);}
            }

        }else if(isKeyPressed[77]){
            difficulty = 6;

            for(let i = 0; i < dq1; i++) {
                tipNaKletka[i] = [];
                for(let j = 0; j < difficulty; j++) {tipNaKletka[i][j] = randomInteger(7);}
            }

        }else if(isKeyPressed[72]){
            difficulty = 10;

            for(let i = 0; i < dq1; i++) {
                tipNaKletka[i] = [];
                for(let j = 0; j < difficulty; j++) {tipNaKletka[i][j] = randomInteger(7);}
            }
        }
        brBoxes = Math.abs(dq1 * difficulty);
    }

    if(brBoxes <= 0){
        ballMoving = false;

        context.font = "50px Arial"
        context.fillStyle = "Black"
        context.fillText("YOU WON!", monitor / 2 - 200, 250, 400, 10);

        context.font = "20px Arial"
        context.fillText("Press R to play again.", monitor / 2 - 200, 350, 400, 10);

        if(isKeyPressed[82]){//R
            playing = false;
            ballMoving = true;
            
            for(let i = 0; i < dq1; i++) {
                tipNaKletka[i] = [];
                for(let j = 0; j < difficulty; j++) {tipNaKletka[i][j] = randomInteger(7);}
            }
        }
    }

}

function keyup(key) {
    console.log("Key code: " + key);
}

function mouseup() {

    if (mouseup){
        playing = true;
    }
}

