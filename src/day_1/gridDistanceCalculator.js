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
}

const move = function(prevPosition, distance, directionIndex) {
  const direction = compassPoints[directionIndex];
  const newPosition = Object.assign({}, prevPosition);
  const axis = compassDirections[direction].axis;
  const multiplier = compassDirections[direction].multiplier;
  newPosition[axis] = prevPosition[axis] + (distance * multiplier);
  return newPosition;
}

const gridDistanceCalculator = function(directionsString) {
  console.log();
  console.log('Received instructions: ', directionsString);
  let currentDirectionIndex = 0;
  let currentPosition = {
    x: 0,
    y: 0
  }
  const parsedDirections = parseDirections(directionsString);
  parsedDirections.forEach(function(instruction) {

    console.log('INSTRUCTION: ', instruction)
    currentDirectionIndex = rotate(currentDirectionIndex, instruction.direction);
    console.log('Now facing: ', compassPoints[currentDirectionIndex]);
    currentPosition = move(currentPosition, instruction.distance, currentDirectionIndex);
    console.log('Moved: ', instruction.distance);
    console.log('New position: ', currentPosition);
  });
  const x = currentPosition.x;
  const y = currentPosition.y;
  return (x < 0 ? (x * -1) : x) + (y < 0 ? (y * -1) : y);
}

module.exports = gridDistanceCalculator;
