var Main_State = {
  /**
   * Global Variables for Current State
   */
  playerVelocity: 250,
  starVelocity: 350,
  spaceShipVelocity: 0,
  score: 0,
  scoreSaver: 0,
  text: 'Score: 0',
  bg: null,
  star: null,
  spaceShip: null,
  player: null,
  cursors: null,
  scrollSpeed: 1,

  /**
   * @name PRELOAD
   * @description Place all of the assets and anything else that should be done before the State rendered
   */
  preload: function()
  {
    // Load Robot
    game.load.spritesheet('robot', 'assets/robot.png', 55, 100);

    // Load Star
    game.load.image('star', 'assets/star.png');

    // Load background
    game.load.image('background', 'assets/bg.jpg');

    // Load spaceship
    game.load.image('spaceShip', 'assets/SpaceShipSmall.png');
  },

  /**
   * @name CREATE
   * @description All Code to run immediately AFTER the preload method
   */
  create: function()
  {

    // Add background sprite
    this.bg = game.add.tileSprite(0, 0, game.stage.bounds.width, game.height, 'background');


    // Create the star 'Character'
    this.star = new Character(game.width, Math.floor((Math.random() * game.height) + 1), 'star', true, false);

    // Check to see if the star is in the world
    this.star.checkWorldBounds = true;

    // Add listener to check if star
    this.star.events.onOutOfBounds.add(function()
    {

      this.star.reset(game.width, Math.floor((Math.random() * game.height) + 1));

    }.bind(this));

    this.spaceShip = new Character(Math.floor((Math.random() * game.width) + 1), -68, 'spaceShip', true, false);

    this.spaceShip.checkWorldBounds = true;

    this.spaceShip.events.onOutOfBounds.add(function()
    {

      this.spaceShip.reset(Math.floor((Math.random() * game.width) + 1), -50);

    }.bind(this));

    // Add robot to game board
    this.player = new Character(50, 70, 'robot', true, true);

    // Create inputs
    this.cursors = game.input.keyboard.createCursorKeys();

    // Left animation
    this.player.animations.add('player-left', [0, 1], 12, true);

    // Idle animation
    this.player.animations.add('player-idle', [2, 3], 12, true);

    // Right animation
    this.player.animations.add('player-right', [4, 5], 12, true);

    // Text to display with the score
    var style = { font: "25px Arial", fill: "#ff0044", align: "left" };

    this.text = game.add.text(30, 30, "Score: " + this.score, style);

  },

  /**
   * @name UPDATE
   * @description main game logub
   */
  update: function()
  {
    this.bg.tilePosition.x -= this.scrollSpeed;

    // Reset the player velocity
    this.player.body.velocity.x = 0;

    this.player.body.velocity.y = 0;

    this.spaceShip.body.velocity.y = this.spaceShipVelocity;

    setTimeout(function()
    {

      this.star.body.velocity.x = -this.starVelocity;

    }.bind(this), 1000);

    // Set collision with the player sprite and the star sprite
    game.physics.arcade.collide(this.player, this.star, function()
    {

      this.keepScore();

    }.bind(this));

    // Set the collision with the player sprite and the spaceship sprite
    game.physics.arcade.collide(this.player, this.spaceShip, function()
    {

      this.kill();

    }.bind(this));

    //Move the player up, down, left, or right
    MovePlayer(this.player, this.cursors, this.playerVelocity, this.playerVelocity, { left: 'player-left', right: 'player-right', idle: 'player-idle' });

  },

  /**
   * @name KeepScore
   * @description handle the scoring
   */
  keepScore: function()
  {

    // Up the score by 1
    this.score++;

    // Update the score counter by 1
    this.scoreSaver++;

    // If score saver is > 10
    if(this.scoreSaver >= 10)
    {
      // Up scroll speed
      this.scrollSpeed += 2;

      // Reset the score saver
      this.scoreSaver = 0;

      // Up the star velocity by 25
      this.starVelocity += 50;

      // Up the player velocity by 15
      this.playerVelocity += 50;

      // If the spaceship has not yet been initialized
      if(this.spaceShipVelocity === 0)
      {

        // Increase the spaceships velocity
        this.spaceShipVelocity += 150

      }
      // Else up the space ships velocity by 25
      else
      {

        this.spaceShipVelocity += 25

      }

    }

    // Set the Score counter
    this.text.setText("Score: " + this.score);

    // Reset the star position
    this.star.reset(game.width, Math.floor((Math.random() * game.height) + 1));

  },

  /**
   * @name Kill
   * @description Kill the player and end the game
   */
  kill: function()
  {

    // alert the player that the game has ended
    alert('You have died');

    // Kill the player sprite
    this.player.kill();

    // Destroy the star sprite
    this.star.destroy();

    // Destroy the space ship sprite
    this.spaceShip.destroy();

  }
};