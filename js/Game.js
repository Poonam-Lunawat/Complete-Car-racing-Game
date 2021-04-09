class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
      car1=createSprite(100,200);
      car1.addImage("car1",car1_img);
      car2=createSprite(300,200);
      car2.addImage("car2",car2_img);
      car3=createSprite(500,200);
      car3.addImage("car3",car3_img);
      car4=createSprite(700,200);
      car4.addImage("car4",car4_img);

      cars= [car1,car2,car3,car4];

      
  }

  play(){
    form.hide();
   // textSize(30);
   // text("Game Start", 120, 100)
    Player.getPlayerInfo();
    player. getCarsAtEnd();
    if(allPlayers !== undefined){
      background(ground)
      image(track,0,-displayHeight*4, displayWidth,displayHeight*5);
      var index=0;
      var y,x=200;
      for (var plr in allPlayers)
      {
        index++;
        x=x+200;
        y=displayHeight-allPlayers[plr].distance;
        cars[index-1].x=x;
        cars[index-1].y=y;
        if(index===player.index)
        {
          cars[index-1].shapeColor="red";
          //cars[index-1].debug=true;
          camera.position.x= displayWidth/2;
          camera.position.y= cars[index-1].y;
        }
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      carsound.play();
      player.distance +=100
      player.update();
      
    }
    else
    {
        carsound.pause();
    }
    if(player.distance>4000)
    {
      carsound.stop();
      gameState=2;
      player.rank +=1;
      player.update();
      //finished++;
      player.updateCarsAtEnd(player.rank)
    }
     drawSprites();
  }
  end()
  {
  textSize(50)

   
  /*swal({
    title: `Awesome!${"\n"}Rank${"\n"}${player.rank}`,
    text: "You reached the finish line successfully",
   
  }); */
 
    
    if(player.rank===4) 
  {
 
    background(winner)
    camera.position.x=0;
    camera.position.y=0;
    Player.getPlayerInfo();
    imageMode(CENTER)
    image(winner,0,-displayHeight*4, displayWidth-50,displayHeight*5-50);
    fill("purple")
    for(var p in allPlayers)
    {
      if(allPlayers[p].rank ===1)
      { 
         
         text( allPlayers[p].name,  displayWidth/7-200, displayHeight/9 + 100);
      }
      else
      {

       if(allPlayers[p].rank===2)
        {

          text( allPlayers[p].name,  displayWidth/7+100, displayHeight/9 +200 );
        }
        else
        {
          if(allPlayers[p].rank ===3)
             text( allPlayers[p].name,  displayWidth/8-650, displayHeight/9 + 200);
        }

      }
    }

  }
  }
}
