const keypad = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8 ,9]
];

const directions = {
  U: {
    axis: 'y',
    multiplier: -1
  },
  R: {
    axis: 'x',
    multiplier: 1
  },
  D: {
    axis: 'y',
    multiplier: 1
  },
  L: {
    axis: 'x',
    multiplier: -1
  }
};

const startingPosition = {
  x: 1,
  y: 1
};

const keyPadSolver = function(directionsString) {
  const directionSequences = directionsString.split('\n');
  let resultSequence ='';

  let currentPosition = Object.assign({}, startingPosition);

  directionSequences.forEach(function(sequence) {
    console.log();
    console.log('Starting at: ', currentPosition)

    const sequenceArray = sequence.split('').filter(function(char) {
      return Object.keys(directions).indexOf(char) !== -1;
    });

    console.log('SEQARR: ', `'${sequenceArray}'`)

    sequenceArray.forEach(function(direction) {
      console.log('Direction is: ', direction)

      const axis = directions[direction].axis;
      if (axis === 'x') {
        currentPosition.x = currentPosition.x + directions[direction].multiplier;
        currentPosition.x = Math.max(currentPosition.x, 0);
        currentPosition.x = Math.min(currentPosition.x, keypad[currentPosition.y].length - 1);
      } else {
        currentPosition.y = currentPosition.y + directions[direction].multiplier;
        currentPosition.y = Math.max(currentPosition.y, 0);
        currentPosition.y = Math.min(currentPosition.y, keypad.length - 1);
      }

      console.log('New POS: ', currentPosition)
    });

    resultSequence += keypad[currentPosition.y][currentPosition.x];
  });

  return resultSequence;
};

module.exports = keyPadSolver;