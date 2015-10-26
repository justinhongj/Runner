var Boot = {

	preload: function() {
		this.game.load.image('loadingBar', 'public/images/');
	},

	create: function() {
		game.scale.scaleMode = PhaserScaleManager.SHOW_ALL;
		game.scale.setScreenSize(true);

		this.game.state.start('Preload');
	}
};