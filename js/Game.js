var stageHeight = 500, stageWidth = 800;

var player = null,
  star = null,
  star2 = null,
  cursors = null,
  bg = null,
  count = 0,
  playerVelocity = 250,
  starVelocity = 350;

// Initiate Game
var game = new Phaser.Game(stageWidth, stageHeight, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload()
{
  // Load robot asset
  game.load.spritesheet('robot', 'assets/robot.png', 55, 100);
  game.load.image('star', 'assets/star.png');
  game.load.image('background', 'assets/bg.jpg');
}

function create()
{
  bg = game.add.sprite(0, 0, 'background');
  bg.scale.setTo(.45,.45);

  star = new Character(stageWidth, Math.floor((Math.random() * stageHeight) + 1), 'star', true, false);

  star2 = new Character(Math.floor((Math.random() * stageWidth) + 1), -20, 'star', true, false);

  star.checkWorldBounds = true;
  star2.checkWorldBounds = true;

  star.events.onOutOfBounds.add(function() {
    star.reset(stageWidth, Math.floor((Math.random() * stageHeight) + 1));

    starVelocity += 25;
    playerVelocity += 15;

    count++;
  });

  star2.events.onOutOfBounds.add(function() {
    star2.reset(Math.floor((Math.random() * stageWidth) + 1), -20);
  });

  // Add robot to game board
  player = new Character(50, 50, 'robot', true, true);

  // Create inputs
  cursors = game.input.keyboard.createCursorKeys();

  // Left animation
  player.animations.add('player-left', [0, 1], 12, true);

  // Idle animation
  player.animations.add('player-idle', [2, 3], 12, true);

  // Right animation
  player.animations.add('player-right', [4, 5], 12, true);
}

function update()
{
  // Reset the player velocity
  player.body.velocity.x = 0;
  player.body.velocity.y = 0;

  setTimeout(function() {
    star.body.velocity.x = -starVelocity;
  }, 1000);

  if(starVelocity > 500) {
    star2.body.velocity.y = starVelocity;
  }

  game.physics.arcade.collide(player, star, kill);
  game.physics.arcade.collide(player, star2, kill);

  //Move the player up, down, left, or right
  MovePlayer(player, playerVelocity, playerVelocity, { left: 'player-left', right: 'player-right', idle: 'player-idle' });
}

function kill() {
  alert('You have died');

  player.kill();
  star.destroy();
  star2.destroy();
}