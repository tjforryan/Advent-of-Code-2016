const chai = require('chai');
const expect = chai.expect;

const gridDistanceCalculator = require('../../src/day_1/gridDistanceCalculator.js')

describe ('Grid Distance Calculator', function() {
  describe ('Single instructions will result in the value given', function() {
    it('L1 will result in 1', function () {
      expect(gridDistanceCalculator('L1')).to.equal(1);
    });
    it('R1 will result in 1', function () {
      expect(gridDistanceCalculator('R1')).to.equal(1);
    });
    it('L6 will result in 6', function () {
      expect(gridDistanceCalculator('L6')).to.equal(6);
    });
    it('R6 will result in 6', function () {
      expect(gridDistanceCalculator('R6')).to.equal(6);
    });
  });
  describe('Multiple, non-backtracking instructions', function() {
    it('will result in their sum', function () {
      expect(gridDistanceCalculator('L1, R1, L1, R1')).to.equal(4);
    });
  });
  describe('Backtracking instruction', function() {
    it('will result in a value based on the distance from origin according to the grid', function() {
      expect(gridDistanceCalculator('R5, L5, R5, R3')).to.equal(12);
    });
  });
  describe('The actual question', function() {
    it('will be something', function() {
      const input = `R1, L3, R5, R5, R5, L4, R5, R1, R2, L1, L1, R5, R1, L3, L5, L2, R4, L1, R4, R5, L3, R5, L1, R3, L5,
       R1, L2, R1, L5, L1, R1, R4, R1, L1, L3, R3, R5, L3, R4, L4, R5, L5, L1, L2, R4, R3, R3, L185, R3, R4, L5, L4, 
       R48, R1, R2, L1, R1, L4, L4, R77, R5, L2, R192, R2, R5, L4, L5, L3, R2, L4, R1, L5, R5, R4, R1, R2, L3, R4, R4, 
       L2, L4, L3, R5, R4, L2, L1, L3, R1, R5, R5, R2, L5, L2, L3, L4, R2, R1, L4, L1, R1, R5, R3, R3, R4, L1, L4, R1, 
       L2, R3, L3, L2, L1, L2, L2, L1, L2, R3, R1, L4, R1, L1, L4, R1, L2, L5, R3, L5, L2, L2, L3, R1, L4, R1, R1, R2, 
       L1, L4, L4, R2, R2, R2, R2, R5, R1, L1, L4, L5, R2, R4, L3, L5, R2, R3, L4, L1, R2, R3, R5, L2, L3, R3, R1, R3`;
      expect(gridDistanceCalculator(input)).to.equal(298);
    });
  });
});
