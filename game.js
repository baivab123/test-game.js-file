class Game{
    constructor(){
        this.reset = createButton("Reset");
    }
    readGameState(){
        var gameStateRef = database.ref("gameState");
        gameStateRef.on("value",(data)=>{
            gameStateValue = data.val()
        });
    }
    start(){
        playerObj = new Player();
        playerObj.readPlayerCount();
    }
    update(state){
     database.ref("/").update({
         gameState : state
     })   
    }
    handleElements(){
        this.reset.position(width-60,10);
        formObj.hide();
    }
    handleResetButton(){
        this.reset.mousePressed(()=>{
            database.ref("/").update({
                gameState : 0,
                playerCount : 0 , 
                players : [] 
            })
            window.location.reload();
        })
    }
    handlePlayerControls(){
        if(keyIsDown(UP_ARROW)){ 
            playerObj.positionY = playerObj.positionY-10;
            playerObj.update();
        }
        if(keyIsDown(DOWN_ARROW)){ 
            playerObj.positionY = playerObj.positionY+10;
            playerObj.update();
        }
    }
    playerAttack(x,y,v,img,index){
        var laser = createSprite(x,y,10,10)
        laser.velocityX = v;
        laser.scale = 0.1;
        laser.y = y;
        laser.addImage("playerLaser",img);
        laserGroup.add(laser);

    } 
    playerValues(){
        if(playerObj.index === 1){
            a = 50;
            b = 150;
            c = playerImg;
            d = 0.06;

            player1 = createSprite(a,b);
            player1.addImage("player",c);
            player1.scale = d; 
        }
        else{
            a = 445;
            b = 150;
            c = enemyImg;
            d = 0.3;
            player2 = createSprite(a,b);
            player2.addImage("player",c);
            player2.scale = d; 
        }
        playersArray=[player1,player2];
    }

    play(){
        this.handleElements();
        this.handleResetButton();
        Player.getPlayerInfo();
        this.handlePlayerControls();
        if(allPlayers !== undefined){
            var index  = 0;
            for(var plr in allPlayers ){
                index = index + 1;
                var y = allPlayers[plr].positionY;
                playersArray[index-1].position.y = y;
                if(index === playerObj.index){
                    this.playerValues();
                }
            }
            drawSprites();
        }
    }

}