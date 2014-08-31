var stageHeight = 500,
    stageWidth = 800;

var player = null,
    star = null,
    spaceShip = null,
    cursors = null,
    score = 0,
    bg = null,
    playerVelocity = 250,
    starVelocity = 350,
    text = null;

// Initiate Game
var game = new Phaser.Game(stageWidth, stageHeight, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload()
{
  // Load robot asset
  game.load.spritesheet('robot', 'assets/robot.png', 55, 100);
  game.load.image('star', 'assets/star.png');
  game.load.image('background', 'assets/bg.jpg');
  game.load.image('spaceShip', 'assets/SpaceShipSmall.png');
}

function create()
{
  bg = game.add.sprite(0, 0, 'background');
  bg.scale.setTo(.45,.45);

  star = new Character(stageWidth, Math.floor((Math.random() * stageHeight) + 1), 'star', true, false);

  spaceShip = new Character(Math.floor((Math.random() * stageWidth) + 1), -68, 'spaceShip', true, false);

  star.checkWorldBounds = true;
  spaceShip.checkWorldBounds = true;

  star.events.onOutOfBounds.add(function() {
    star.reset(stageWidth, Math.floor((Math.random() * stageHeight) + 1));

    starVelocity += 15;
    playerVelocity += 15;
  });

  spaceShip.events.onOutOfBounds.add(function() {
    spaceShip.reset(Math.floor((Math.random() * stageWidth) + 1), -50);
  });

  // Add robot to game board
  player = new Character(50, 70, 'robot', true, true);

  player.body.setSize(20, 55, 25, 25);

  // Create inputs
  cursors = game.input.keyboard.createCursorKeys();

  // Left animation
  player.animations.add('player-left', [0, 1], 12, true);

  // Idle animation
  player.animations.add('player-idle', [2, 3], 12, true);

  // Right animation
  player.animations.add('player-right', [4, 5], 12, true);

  var style = { font: "25px Arial", fill: "#ff0044", align: "left" };
  text = game.add.text(30, 30, "Score:" + score, style);
}

function update()
{
  // Reset the player velocity
  player.body.velocity.x = 0;
  player.body.velocity.y = 0;

  setTimeout(function() {
    star.body.velocity.x = -starVelocity;
  }, 1000);

  if(score > 10) {
    spaceShip.body.velocity.y = 250;
  }

  game.physics.arcade.collide(player, star, keepScore);
  game.physics.arcade.collide(player, spaceShip, kill);

  //Move the player up, down, left, or right
  MovePlayer(player, playerVelocity, playerVelocity, { left: 'player-left', right: 'player-right', idle: 'player-idle' });
}

function keepScore(init) {
  score++;

  text.setText("Score:" + score);

  starVelocity += 25;
  playerVelocity += 15;

  star.reset(stageWidth, Math.floor((Math.random() * stageHeight) + 1));
}

function kill() {
  alert('You have died');

  player.kill();
  star.destroy();
  spaceShip.destroy();
}