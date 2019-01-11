# Numbers

It is a board casual game. The objective is to select the numbers in the board to increment the score and defeat the AI. It's running live [here](https://sosegon.github.io/numbers-demo/).

## How to play

The game's been created to be quite intuitive. There are three simple steps:

  1. **Select the direction of your moves**: In the first turn, you need to select the direction (horizontal or vertical) of your moves throughout the game. You do this by selecting one of the highlighted numbers.
  2. **Let the AI make its move:** Once you select a number, it is the AI's turn to make a move.
  3. **Select a number in your chosen direction:** Select one of the highlighted numbers in the direction you chose in step 1. Go to step 2.

The numbers selected by each players are added to the corresponding scores. The game ends under one of the following conditions:

  1. There are no more numbers in the board.
  2. One of the players cannot make a move.

The player with the highest score wins.

![Gameplay](./numbers.gif)

## Development

The game is being developed using [React](https://reactjs.org/) and [Redux](https://redux.js.org/). The logic of the game is defined in the clasess under the folder [model](https://github.com/sosegon/numbers/tree/master/src/js/model). Those classes serve to create objects that will be handled in the [containers](https://github.com/sosegon/numbers/tree/master/src/js/containers) to present them in the [components](https://github.com/sosegon/numbers/tree/master/src/js/components). The state of the game is save in [local storage](https://github.com/sosegon/numbers/tree/master/src/js/dataLocalStorageManager) for a next session.

## Documentation

Documentation can be found [here](https://sosegon.github.io/numbers).
