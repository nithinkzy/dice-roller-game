
// Name : Nithin Kumar Kollerethu Suresh
// StudentID : 300991463
// Date : June 25,2018

let app;
(function(app) {
  "use strict";

  // Game Variables
  let stage;
  let canvas;
  let helloLabel;
  let assetManager;
  let startButton;
  let matchLabel;
    
  let firstDice;  
  let secondDice;  
  let DiceValue1; 
  let DiceValue2; 
  let manifest = [
      { id: "1", src: "/Assets/images/1.png" }, 
      { id: "2", src: "/Assets/images/2.png" }, 
      { id: "3", src: "/Assets/images/3.png" }, 
      { id: "4", src: "/Assets/images/4.png" },
      { id: "5", src: "/Assets/images/5.png" },
      { id: "6", src: "/Assets/images/6.png" },
      { id: "blank", src: "/Assets/images/blank.png" },
      { id: "StartButton", src: "/Assets/images/StartButton.png" }
    ];

  function Init() {
      console.log("App Initializing...");
      assetManager = new createjs.LoadQueue();
      assetManager.installPlugin(createjs.Sound);
      assetManager.on("complete", Start);
      assetManager.loadManifest(manifest);
  }
// Function to roll the two dice.
function diceRoll(){
 stage.removeAllChildren();
  stage.addChild(startButton);
  var random1 = (Math.floor(Math.random()*6)+ 1);
  var random2 = (Math.floor(Math.random() * 6) + 1);

  var randomImg1 = assetManager.getResult(random1);
  var randomImg2 = assetManager.getResult(random2);

  firstDice = new createjs.Bitmap(randomImg1);
  secondDice = new createjs.Bitmap(randomImg2);
  firstDice.x = 10;
  firstDice.y = 60;
 
  secondDice.x = 640 - (firstDice.getBounds().width) - 30;
  secondDice.y = 60;

  DiceValue1 = new createjs.Text(random1);
  DiceValue2 = new createjs.Text(random2);

  DiceValue1.x = firstDice.x + (firstDice.getBounds().width * 0.4);
  DiceValue2.x = secondDice.x + (secondDice.getBounds().width * 0.4);

  DiceValue1.y = 100 + firstDice.getBounds().height + 5;
  DiceValue2.y = 100 + secondDice.getBounds().height + 5;

  stage.addChild(firstDice);
  stage.addChild(secondDice);
  stage.addChild(DiceValue1);
  stage.addChild(DiceValue2);
  
// Check if the dice are same 
  if(random1==random2){
    match();
  }

}
//Function runs when both dice match
function match(){
  matchLabel = new createjs.Text("Match", "40px Consolas", "#FF6347");
     matchLabel.x = 250;
    matchLabel.y = 130;
    stage.addChild(matchLabel);
}
  /**
   * The Start function initializes the createjs Stage object,
   * sets the framerate and sets up the Main Game Loop to
   * trigger every frame
   *
   */
  function Start() {
    console.log("App Started...");
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20);
    createjs.Ticker.framerate = 60;
    createjs.Ticker.on("tick", Update);

    Main();
  }

  /**
   * This is the Main Game Loop it runs at 60 fps
   *
   */
  function Update() {
    stage.update();
  }

  /**
   *  This is the main function - place all your code here
   *
   */
  function Main() {
    console.log("Main Function...");

    // hello label
    helloLabel = new createjs.Text("Hello, World!", "60px Consolas", "#000000");
    helloLabel.regX = helloLabel.getBounds().width * 0.5;
    helloLabel.regY = helloLabel.getBounds().height * 0.5;
    helloLabel.x = 320;
    helloLabel.y = 200;
    stage.addChild(helloLabel);

    // start button
    startButton = new createjs.Bitmap(assetManager.getResult("StartButton"));
    startButton.regX = startButton.getBounds().width * 0.5;
    startButton.regY = startButton.getBounds().height * 0.5;
    startButton.x = 320;
    startButton.y = 300;
    stage.addChild(startButton);

    // start button listeners
    startButton.addEventListener("click", function() {
      stage.removeAllChildren();
      startButton = new createjs.Bitmap(assetManager.getResult("StartButton"));
    startButton.regX = startButton.getBounds().width * 0.5;
    startButton.regY = startButton.getBounds().height * 0.5;
    startButton.x = 320;
    startButton.y = 400;
    stage.addChild(startButton);
    startButton.addEventListener("click",diceRoll);

        console.log("Start Button Clicked");
    });

    startButton.addEventListener("mouseover", function(event) {
        event.currentTarget.alpha = 0.7;
    });

    startButton.addEventListener("mouseout", function(event) {
        event.currentTarget.alpha = 1.0;
    });
  }

  window.addEventListener("load", Init);
})(app | (app = {}));