var game = null;
var score = 50;
var timer = 0;
var end = false;
var nullHigh = false;
var otherHigh = false;
var highscores = 0;
var got = 0;
var start = true;
var play = false;
var gotM = 50;
var counter = 0;
var timer = 0;
var highscore = 0;
var seconds = 0;
var loop = 0;
var timerText = 0;
var resetText = 0;
var reseted = false;
var lastTime = 0;
var pEnabled = true;
var bigBtn = true;

function init(){
	game = new Phaser.Game(900, 600, Phaser.CANVAS, '', null, false, false);

	game.state.add("MainGame", MainGame);

	game.state.start("MainGame");
}

var MainGame = function() {
}

MainGame.prototype = {
	init: function(){
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignVertically = true;

	},

	preload: function(){
		game.load.image("Player", "assets/img/player.png");
		game.load.image("Point", "assets/img/point.png");
		game.load.image("PlayBtn", "assets/img/playBtn.png");
		//game.load.image(1, "assets/img/invisible.png");
		this.game.stage.backgroundColor = "#FF7F24";
	},

	create: function(){
		start = true;
		play = false;
		this.player = game.add.sprite(150, 100, "Player");
		this.point = game.add.sprite(game.rnd.integerInRange(-39, 843), game.rnd.integerInRange(-39, 543), "Point");
		//this.point = game.add.sprite(700, 0, "Point");
		
		this.player.scale.setTo(3, 3);
		this.point.scale.setTo(3, 3)

		this.arrow = game.input.keyboard.createCursorKeys();
		this.reset = game.input.keyboard.addKey(Phaser.Keyboard.H);
		this.play = game.input.keyboard.addKey(Phaser.Keyboard.P);
		this.btnW = game.input.keyboard.addKey(Phaser.Keyboard.W);
		this.btnA = game.input.keyboard.addKey(Phaser.Keyboard.A);
		this.btnS = game.input.keyboard.addKey(Phaser.Keyboard.S);
		this.btnD = game.input.keyboard.addKey(Phaser.Keyboard.D);
		loop = game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this)
		highscore = localStorage.getItem("highscore");
		if(highscore == null) highscore = "Kein Highscore vorhanden!";
		this.text = game.add.text(0, 0, "Points to get:50 \nGot:0 \nHighscore:" + highscore + "\nLast Time:" + lastTime, {font: "20px Arial", fill: "#000000"});
		this.playBtn = game.add.button(800, 30, "PlayBtn", function(){
			if (pEnabled = true){
				bigBtn = false;
				this.playBtn.scale.setTo(4.7, 4.7);
				setTimeout(function(){
					bigBtn = true
				},75)
				start = false;
				play = true;
				seconds = 0;
				score = 50;
				console.log("playBtn"),
				pEnabled = false;
			}
		}, this, 2, 1, 0);
		this.playBtn.scale.setTo(5, 5);
		this.playBtn.anchor.setTo(0.5, 0.5);
		timerText = game.add.text(game.world.centerX, 15, "Time: 0", { font: "20px Arial", fill: "#000000", align: "center" });
		timerText.anchor.setTo(0.5, 0.5);
		highscore = localStorage.getItem("highscore");
		if(highscore == null) highscore = "No Highscore!";
		if(lastTime == 0) lastTime = "Not Played!";
	},
	update: function(){
		if (bigBtn == true)this.playBtn.scale.setTo(5, 5);
		highscore = localStorage.getItem("highscore");
		if (start == false && end == false) play = true;
		if (play == true && this.arrow.up.isDown||play == true && this.btnW.isDown)this.player.y = this.player.y -4;
		if (play == true && this.arrow.down.isDown||play == true && this.btnS.isDown)this.player.y = this.player.y +4;
		if (play == true && this.arrow.left.isDown||play == true && this.btnA.isDown)this.player.x = this.player.x -4;
		if (play == true && this.arrow.right.isDown||play == true && this.btnD.isDown)this.player.x = this.player.x +4;
		if(start == true)score = 50;
		if(highscore == null) highscore = "No Highscore!";
		if(lastTime == 0) lastTime = "Not Played!";
		this.text.setText("Points to get:" + score + "\nGot:" + got + "\nHighscore:" + highscore + "\nLast Time:" + lastTime);
		if (this.player.x >828)this.player.x = 828;
		if (this.player.x < -21)this.player.x = -21;
		if (this.player.y >528)this.player.y = 528;
		if (this.player.y < -24)this.player.y = -24;
		
	
		if (Phaser.Math.distance(this.player.x, this.player.y, this.point.x, this.point.y) < 30 && play == true){
			score = score -1;
			got = gotM - score;
			this.point.x = game.rnd.integerInRange(-13, 843);
			this.point.y = game.rnd.integerInRange(-13, 543);
		}

		if (this.point.x >675 && this.point.y <10){
			this.point.x = game.rnd.integerInRange(-13, 843);
			this.point.y = game.rnd.integerInRange(-13, 543);}

		if (this.play.isDown && pEnabled == true){
			start = false;
			play = true;
			seconds = 0;
			score = 50;
			console.log("playBtn"),
			pEnabled = false;
		}

		if(start == true) pEnabled = true;
		if (score == 0 && play == true){
			end = true; 
			lastTime = seconds;
	
		highscore = localStorage.getItem("highscore");
		

		if (highscore == null){
			nullHigh = true;
			highscore = seconds;
		}

		if(highscore > seconds){
			highscore = seconds;
			otherHigh = true;
		}

		localStorage.setItem("highscore", highscore);
		play = false;
		end = true
		reseted = false;
		start = true;
		}


		if (this.reset.isDown && reseted == false){
			reseted = true;
			console.log("H");
			localStorage.clear();
			resetText = game.add.text(725, 0, "Highscore reseted!" , {font: "20px Arial", fill: "#000000"});
			setTimeout(function(){
				resetText.destroy();
			},1000)
			console.log(highscore);
			}
			timerText.setText("Time:" + seconds);

	},
}

function updateCounter(){
if (play == true)	seconds++;
else seconds = 0;
}

function play(){
	if (pEnabled = true){
			start = false;
			play = true;
			seconds = 0;
			score = 50;
			console.log("playBtn"),
			pEnabled = false;
		}
}