var width = window.innerWidth;
var height = window.innerHeight;
var gameRatio = innerWidth/innerHeight;

var game = new Phaser.Game(Math.ceil(480*gameRatio), 480, Phaser.CANVAS, 'screen', {preload: preload, create: create, update: update});

function preload() {
	game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	game.scale.setScreenSize(true);

	game.load.image('background', 'images/background.jpg');
	game.load.spritesheet('scott1', 'images/scott1.png', 108, 140);
	game.load.spritesheet('scott2', 'images/scott2.png', 108, 140);
	game.load.spritesheet('scott1Jump', 'images/scott_jump.gif', 43.9, 76);

}

function create() {
	var background = game.add.image(0, 0, 'background');
	background.scale.y = game.rnd.realInRange(0.37, 0.37);
	
	scott1 = game.add.sprite(width*0.18, 240, 'scott1');
	scott1.scale.x = game.rnd.realInRange(0.25, 0.25);
	scott1.scale.y = game.rnd.realInRange(0.25, 0.25);

	scott1.animations.add('run', [0, 1, 2, 3, 4, 5, 6, 7],15 ,true);
	scott1.animations.play('run');

	// scott1Jump = game.add.sprite(width*0.18, 240, 'scott1Jump');
	// scott1Jump.animations.add('jump', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 18, true);

	scott2 = game.add.sprite(width*0.18, 100, 'scott2');
	scott2.scale.x = game.rnd.realInRange(0.25, 0.25);
	scott2.scale.y = game.rnd.realInRange(0.25, 0.25);

	scott2.animations.add('run', [0, 1, 2, 3, 4, 5, 6, 7],15 ,true);
	scott2.animations.play('run');

	cursors = game.input.keyboard.createCursorKeys();
}

function update() {
	// if (cursors.up.onDown) {
	// 	scott1Jump.animations.play('jump');
	// }
}