'use strict';

const SimilarityMatrix = require('../lib');
const assert = require('assert');
var a, b, c, d, e, f;

it('should exist', () => {
    assert.ok(SimilarityMatrix);
});

describe('SimilarityMatrix operations', () => {
    before(() => {
      a = SimilarityMatrix.calculateNewIndex(['abc', 'ab1', 'ab2'], ['ab2']);
      b = SimilarityMatrix.calculateNewIndex(['abc', 'ab1', 'ab2'], ['xy2', 'ab5', 'xb1']);
      c = SimilarityMatrix.calculateNewIndex(['abc', 'ab1', 'ab2'], []);
      d = SimilarityMatrix.calculateNewIndex(['abc', 'ab1', 'ab2'], ['abc', 'ab1', 'ab2']);
    });
    it('should return correct a', () => {
      assert.deepEqual(a.resultIndexes, [2]);
      assert.deepEqual(a.resultArray, ['', '', 'ab2']);
      assert.deepEqual(b.resultIndexes, [2, 0, 1]);
      assert.deepEqual(b.resultArray, ['ab5', 'xb1', 'xy2']);
      assert.deepEqual(c.resultIndexes, []);
      assert.deepEqual(c.resultArray, ['', '', '']);
      assert.deepEqual(d.resultIndexes, [0, 1, 2]);
      assert.deepEqual(d.resultArray, ['abc', 'ab1', 'ab2']);
    });
});
