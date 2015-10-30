var width = window.innerWidth;
var height = window.innerHeight;
var gameRatio = innerWidth/innerHeight;

var game = new Phaser.Game(Math.ceil(480*gameRatio), 480, Phaser.CANVAS, 'screen', {preload: preload, create: create, update: update});

function preload() {
	game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	game.scale.setScreenSize(true);
}

function create() {

}

function update() {
	
}