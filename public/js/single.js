var width = window.innerWidth;
var height = window.innerHeight;
var gameRatio = innerWidth/innerHeight;

var game = new Phaser.Game(Math.ceil(480*gameRatio), 480, Phaser.CANVAS, 'screen', {preload: preload, create: create, update: update});

var floor;

function preload() {
	game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	game.scale.setScreenSize(true);

	game.load.spritesheet('background', 'images/streaks.png', 250, 480);
	game.load.spritesheet('scott1', 'images/scott1.png', 58, 76);
	game.load.spritesheet('scott2', 'images/scott2.png', 58, 76);
	game.load.spritesheet('floor', 'images/floor1.png', 250, 33);
	game.load.image('line', 'images/blank_line.png');
	game.load.image('spikeUp', 'images/spike_up.png');
	game.load.image('spikeDown', 'images/spike_down.png');
	game.load.image('scottGuitar', 'images/scott_guitar.gif');
	game.load.image('scottFall', 'images/scott_fall.png');

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

	// group for all spikes (used later for 'collision')
	spikes = game.add.group();


	////////////////
	// TOP SCREEN
	////////////////

	floor = game.add.sprite(0, 140, 'floor');
	floor.scale.y = 0.3;
	floor.width = game.width;

	floor.animations.add('move', [0, 1, 2, 3, 4, 5], 10, true);
	floor.animations.play('move');


	line1 = game.add.sprite(0, 145, 'line');
	line1.width = game.width;
	game.physics.arcade.enable(line1);
	line1.body.immovable = true;


	scott1 = game.add.sprite(game.width/4, 90, 'scott1');
	scott1.scale.x = 0.5;
	scott1.scale.y = 0.5;

	scott1.animations.add('run', [0, 1, 2, 3, 4, 5, 6, 7],15 ,true);
	scott1.animations.add('jump', [8, 9, 10, 11, 12, 13, 14, 15, 16, 17], 15, true);
	scott1.animations.play('run');

	game.physics.arcade.enable(scott1);
	scott1.body.gravity.y = 900;


	spawnSpikeUp1();

	(function loop() {
		var rand = Math.round(Math.random() * 1000) + 600;
		setTimeout(function() {
			spawnSpikeUp1();
			loop();
		}, rand);
	}());


	////////////////
	// BOTTOM SCREEN
	////////////////

	floor = game.add.sprite(0, 287, 'floor');
	floor.scale.y = 0.3;
	floor.width = game.width;

	floor.animations.add('move', [0, 1, 2, 3, 4, 5], 10, true);
	floor.animations.play('move');


	line2 = game.add.sprite(0, 292, 'line');
	line2.width = game.width;
	game.physics.arcade.enable(line2);
	line2.body.immovable = true;
 

	scott2 = game.add.sprite(game.width/4, 237, 'scott2');
	scott2.scale.x = 0.5;
	scott2.scale.y = 0.5;

	scott2.animations.add('run', [0, 1, 2, 3, 4, 5, 6, 7],15 ,true);
	scott2.animations.add('jump', [8, 9, 10, 11, 12, 13, 14, 15, 16, 17], 15, true);
	scott2.animations.play('run');

	game.physics.arcade.enable(scott2);
	scott2.body.gravity.y = 950;


	spawnSpikeUp2();

	(function loop() {
		var rand = Math.round(Math.random() * 1000) + 600;
		setTimeout(function() {
			spawnSpikeUp2();
			loop();
		}, rand);
	}());


	line = game.add.sprite(0, 0, 'line');
	line.scale.x = 0.01;
	line.scale.y = game.height;
	game.physics.arcade.enable(line);

}




function update() {

	////////////////
	// COLLISION
	////////////////

	game.physics.arcade.collide(scott1, line1);
	game.physics.arcade.collide(scott2, line2);


	////////////////
	// MOVEMENT
	////////////////

	// Player 1 Movement
	if (game.input.keyboard.isDown(Phaser.Keyboard.Q)) {
		if (scott1.body.velocity.y === 0) {
			scott1.animations.play('jump');
			scott1.body.velocity.y = -370;
		}
	}

	if (scott1.body.velocity.y === 0) {
		scott1.animations.play('run');
	}

	if (scott1.body.position.x < game.width/4) {
		scott1.body.velocity.x = 20;
	}

	// Player 2 Movement
	if (game.input.keyboard.isDown(Phaser.Keyboard.P)) {
		if (scott2.body.velocity.y === 0) {
			scott2.animations.play('jump');
			scott2.body.velocity.y = -370;
		}
	}
	if (scott2.body.velocity.y === 0) {
		scott2.animations.play('run');
	}

	if (scott2.body.position.x < game.width/4) {
		scott2.body.velocity.x = 20;
	}


	////////////////
	// PENALTY
	////////////////

	// Player 1 Penalty
	if (game.physics.arcade.overlap(scott1, spikes)) {
		scott1.body.velocity.x = -300;
		window.setTimeout(scott1Normalize, 200);
	}
	function scott1Normalize() {
		scott1.body.velocity.x = 0;
	}

	if (game.physics.arcade.overlap(scott1, line)) {
		scott1.kill();
	}

	// Player 2 Penalty
	if (game.physics.arcade.overlap(scott2, spikes)) {
		scott2.body.velocity.x = -300;
		window.setTimeout(scott2Normalize, 200);
	}
	function scott2Normalize() {
		scott2.body.velocity.x = 0;
	}

	if (game.physics.arcade.overlap(scott2, line)) {
		scott2.kill();
	}


	////////////////
	// GAMEOVER
	////////////////

	if (!(scott1.alive)) {
		gameover();
	}
	if (!(scott2.alive)) {
		gameover();
	}
}


function spawnSpikeUp1() {
	spikeUp1 = game.add.sprite(game.width, 91, 'spikeUp');
	spikeUp1.scale.y = 0.22;
	spikeUp1.scale.x = 0.5;
	game.physics.arcade.enable(spikeUp1);
	spikeUp1.body.velocity.x = -600;
	spikes.add(spikeUp1);
}

function spawnSpikeUp2() {
	spikeUp2 = game.add.sprite(game.width, 238, 'spikeUp');
	spikeUp2.scale.y = 0.22;
	spikeUp2.scale.x = 0.5;
	game.physics.arcade.enable(spikeUp2);
	spikeUp2.body.velocity.x = -600;
	spikes.add(spikeUp2);
}

function gameover() {
	text = game.add.text(game.width/2, 40, 'GAME OVER', {fill: '#ffffff'});
	text.anchor.set(0.5);

	// restartText = game.add.text(game.width/2, 90, 'Play Again', {fill: '#ffffff', font: '200px'});
	// restartText.anchor.set(0.5);
	// restart = game.add.sprite(game.width/2, 140, 'scottGuitar');
	// restart.anchor.set(0.5);
	// restart.inputEnabled = true;

	// homeText = game.add.text(game.width/2, 200, 'Main Menu', {fill: '#ffffff', font: '200px'});
	// homeText.anchor.set(0.5);
	// home = game.add.sprite(game.width/2, 260, 'scottFall');
	// home.anchor.set(0.5);
	// home.inputEnabled = true;

	scott1.body.velocity.x = 400;
	scott2.body.velocity.x = 400;
	spikeUp1.body.velocity.x = -200;
	spikeUp2.body.velocity.x = -200;

	// restart.events.onInputDown.add(restart);
	// home.events.onInputDown.add(goHome);


	// scottFall = game.add.sprite(game.width/2, 120, 'scottFall');
	// scottFall.anchor.set(0.5);
	// scottFall.animations.add('death', [0, 1, 2, 3, 4], 3, true);
	// scottFall.animations.play('death');

	$('body').fadeOut(3500, function(){
		window.location.replace("http://localhost:4567");
	});
}

function goHome() {
	$('body').fadeOut(4000, function(){
		window.location.replace("http://localhost:4567/gameover");
	});
}

function restart() {
	$('body').fadeOut(4000, function(){
		window.location.replace("http://localhost:4567/single");
	});
}


// Multiplayer functionality

// function player1Win() {
// 	text = game.add.text(20, 20, 'Player 1 Wins!!', {fill: '#ffffff'});
// 	scott1.body.velocity.x = 400;
// }

// function player2Win() {
// 	text = game.add.text(20, 160, 'Player 2 Wins!!', {fill: '#ffffff'});
// 	scott2.body.velocity.x = 400;
// }
