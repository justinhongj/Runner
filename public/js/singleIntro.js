var width = window.innerWidth;
var height = window.innerHeight;
var gameRatio = innerWidth/innerHeight;

var game = new Phaser.Game(Math.ceil(480*gameRatio), 480, Phaser.CANVAS, 'screen', {preload: preload, create: create, update: update});

function preload() {
	game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	game.scale.setScreenSize(true);

	game.load.spritesheet('background', 'images/streaks.png', 250, 480);
	game.load.spritesheet('scott1', 'images/scott1.png', 58, 76);
	game.load.spritesheet('scott2', 'images/scott2.png', 58, 76);

}

function create() {

	////////////////
	// BACKGROUND
	////////////////

	background = game.add.sprite(0, 0, 'background');
	background.height = game.height;
	background.width = game.width;

	background.animations.add('streak', [0, 1, 2, 3, 2, 1], 10, true);
	background.animations.play('streak');

	////////////////
	// MAIN MENU
	////////////////

	instructions = game.add.text(game.width/2, 60, 'Control both runners to avoid the spikes!', {fill: '#ffffff'});
	instructions.anchor.set(0.5);

	player1 = game.add.text(game.width/2, 140, "Press 'Q' to Jump", {fill: '#637A9D'});
	player1.anchor.set(0.5);

	player2 = game.add.text(game.width/2, 210, "Press 'P' to Jump", {fill: '#CA85B4'});
	player2.anchor.set(0.5);

	start = game.add.text(game.width/2, 270, "Press 'Space' to Start");
	start.anchor.set(0.5);


	////////////////
	// ANIMATIONS
	////////////////

	scott1 = game.add.sprite(game.width/4, 140, 'scott1');
	scott1.anchor.set(0.5);
	scott1.animations.add('run', [0, 1, 2, 3, 4, 5, 6, 7],15 ,true);
	scott1.animations.add('jump', [8, 9, 10, 11, 12, 13, 14, 15, 16, 17], 15, true);
	scott1.animations.play('run');

	scott2 = game.add.sprite((game.width/4), 210, 'scott2');
	scott2.anchor.set(0.5);
	scott2.animations.add('run', [0, 1, 2, 3, 4, 5, 6, 7],15 ,true);
	scott2.animations.add('jump', [8, 9, 10, 11, 12, 13, 14, 15, 16, 17], 15, true);
	scott2.animations.play('run');

}

function update() {

	if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			window.location.replace('http://localhost:4567/single');
			$('body').fadeOut(3000, function(){startGame();});
	}

}

// function single() {
// 	$('body').fadeOut(3500, function(){
// 		window.location.replace("http://localhost:4567/single");
// 	});
// }