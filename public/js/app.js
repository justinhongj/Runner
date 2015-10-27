var width = window.innerWidth;
var height = window.innerHeight;
var gameRatio = innerWidth/innerHeight;

var game = new Phaser.Game(Math.ceil(480*gameRatio), 480, Phaser.CANVAS, 'screen', {preload: preload, create: create, update: update});

var floor;

function preload() {
	game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	game.scale.setScreenSize(true);

	game.load.image('background', 'images/background.jpg');
	game.load.spritesheet('scott1', 'images/scott1.png', 58, 76);
	game.load.spritesheet('scott2', 'images/scott2.png', 58, 76);
	game.load.spritesheet('floor', 'images/floor1.png', 250, 33);
	game.load.image('line', 'images/blank_line.png');

}

function create() {
	var background = game.add.image(0, 0, 'background');
	background.scale.y = game.rnd.realInRange(0.37, 0.37);

	// TOP SCREEN

	floor = game.add.sprite(0, 135, 'floor');
	floor.scale.y = game.rnd.realInRange(0.3, 0.3);
	floor.scale.x = game.rnd.realInRange(4, 4);

	floor.animations.add('move', [0, 1, 2, 3, 4, 5], 10, true);
	floor.animations.play('move');

	line2 = game.add.sprite(0, 140, 'line');
	line2.scale.x = game.rnd.realInRange(4, 4);
	game.physics.arcade.enable(line2);
	line2.body.immovable = true;

	scott2 = game.add.sprite(width*0.18, 85, 'scott2');
	scott2.scale.x = game.rnd.realInRange(0.5, 0.5);
	scott2.scale.y = game.rnd.realInRange(0.5, 0.5);

	scott2.animations.add('run', [0, 1, 2, 3, 4, 5, 6, 7],15 ,true);
	scott2.animations.add('jump', [8, 9, 10, 11, 12, 13, 14, 15, 16, 17], 15, true);
	scott2.animations.play('run');

	game.physics.arcade.enable(scott2);
	scott2.body.gravity.y = 1000;

	// BOTTOM SCREEN

	floor = game.add.sprite(0, 287, 'floor');
	floor.scale.y = game.rnd.realInRange(0.3, 0.3);
	floor.scale.x = game.rnd.realInRange(4, 4);

	floor.animations.add('move', [0, 1, 2, 3, 4, 5], 10, true);
	floor.animations.play('move');

	line1 = game.add.sprite(0, 292, 'line');
	line1.scale.x = game.rnd.realInRange(4, 4);
	game.physics.arcade.enable(line1);
	line1.body.immovable = true;

	scott1 = game.add.sprite(width*0.18, 237, 'scott1');
	scott1.scale.x = game.rnd.realInRange(0.5, 0.5);
	scott1.scale.y = game.rnd.realInRange(0.5, 0.5);

	scott1.animations.add('run', [0, 1, 2, 3, 4, 5, 6, 7],15 ,true);
	scott1.animations.add('jump', [8, 9, 10, 11, 12, 13, 14, 15, 16, 17], 15, true);
	scott1.animations.play('run');

	game.physics.arcade.enable(scott1);
	scott1.body.gravity.y = 1000;


	cursors = game.input.keyboard.createCursorKeys();
}

function update() {

	game.physics.arcade.collide(scott1, line1);
	game.physics.arcade.collide(scott2, line2);

	if (cursors.up.isDown) {
		scott1.animations.play('jump');
		scott1.body.velocity.y = -250;
	}

	if (scott1.body.velocity.y === 0) {
		scott1.animations.play('run');
	}
}