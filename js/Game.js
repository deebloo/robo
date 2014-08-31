/**
 * Global Variables accessible by all game states
 *
 */
// Initiate Game
var game = new Phaser.Game(globals.stageWidth, globals.stageHeight, Phaser.AUTO, '');

// Add the Main game state
game.state.add('main', Main_State);

// Start Main game state
game.state.start('main');