const isNumber = require('lodash/isNumber');

const compassPoints = [
  'NORTH',
  'EAST',
  'SOUTH',
  'WEST'
];

const compassDirections = {
  NORTH: {
    axis: 'y',
    multiplier: 1
  },
  EAST: {
    axis: 'x',
    multiplier: 1
  },
  SOUTH: {
    axis: 'y',
    multiplier: -1
  },
  WEST: {
    axis: 'x',
    multiplier: -1
  }
}

const turningDirections = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT'
};

const parseDirections = function(directionsString) {
  const directionsArray = directionsString.split(',');
  return directionsArray.map(function(instruction) {
    const instructionObj = {};
    let currentChar;
    let distance = '';
    for (let i = 0; i  < instruction.length; i++) {
      currentChar = instruction[i];
      if (currentChar === 'L') {
        instructionObj.direction = turningDirections.LEFT;
      } else if (currentChar === 'R') {
        instructionObj.direction = turningDirections.RIGHT;
      } else if (isNumber(parseInt(currentChar))) {
        distance += currentChar;
      }
    }
    instructionObj.distance = parseInt(distance, 10);
    return instructionObj;
  });
}

const rotate = function(prevDirectionIndex, direction){
  if (direction === turningDirections.LEFT) {
    return (prevDirectionIndex + compassPoints.length - 1) % compassPoints.length;
  } else if (direction === turningDirections.RIGHT) {
    return (prevDirectionIndex + 1) % compassPoints.length;
  } else {
    console.error('Invalid direction: ', direction);
    process.exit(1);
  }
};

const move = function(prevPosition, distance, directionIndex) {
  const direction = compassPoints[directionIndex];
  const newPosition = Object.assign({}, prevPosition);
  const axis = compassDirections[direction].axis;
  const multiplier = compassDirections[direction].multiplier;
  const positionsPassedThrough = [];

  for (let i = 0; i < distance; i++) {
    newPosition[axis] = newPosition[axis] + (multiplier);
    positionsPassedThrough.push(Object.assign({}, newPosition));
  }
  return {
    newPosition,
    passedThrough: positionsPassedThrough
  };
};

const firstLocationVisitedTwice = function(directionsString) {
  console.log();
  console.log('Received instructions: ', directionsString);
  let currentDirectionIndex = 0;
  let currentPosition = {
    x: 0,
    y: 0
  };
  let oldPosition, journeyData, resultPosition;

  const visitedPositions = [];
  const parsedDirections = parseDirections(directionsString);

  for(let i = 0; i < parsedDirections.length; i++) {
    const instruction = parsedDirections[i];
    console.log('INSTRUCTION: ', instruction)

    currentDirectionIndex = rotate(currentDirectionIndex, instruction.direction);
    console.log('Now facing: ', compassPoints[currentDirectionIndex]);

    oldPosition = Object.assign({}, currentPosition);
    journeyData = move(currentPosition, instruction.distance, currentDirectionIndex);
    currentPosition = journeyData.newPosition;
    console.log('Moved: ', instruction.distance);
    console.log('New position: ', currentPosition);

    for(let j = 0; j < journeyData.passedThrough.length; j++) {
      const position = journeyData.passedThrough[j];
      if (!visitedPositions[position.x]) {
        visitedPositions[position.x] = [];
        visitedPositions[position.x][position.y] = 1;
      } else if (!visitedPositions[position.x][position.y]) {
        visitedPositions[position.x][position.y] = 1;
      } else {
        resultPosition = position;
        break;
      }
    }
    if (resultPosition) {
      break;
    }
  }

  if (resultPosition) {
    const x = resultPosition.x;
    const y = resultPosition.y;
    return (x < 0 ? (x * -1) : x) + (y < 0 ? (y * -1) : y);
  } else {
    console.log('Failed no place visited twice...', visitedPositions);
  }
};

module.exports = firstLocationVisitedTwice;
