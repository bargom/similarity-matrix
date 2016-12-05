(function() {
  'use strict';
  var levenshtein = require('fast-levenshtein');
  var Matrix = require('matrix-js');

  var SCORE_UNIQUE = 2;
  var SCORE_SIMILAR_MIN = 1;
  var SCORE_NOT_UNIQUE = 0;

  function _calculateResultArray(mainArr, resultIndexes, childArr) {
    return mainArr.map((item, index) => {
      let resultIndex = resultIndexes.indexOf(index);
      return (resultIndex > -1) ? childArr[resultIndex] : '';
    });
  }

  function _calculateResultIndexes(mxScoreSum) {
    let resultIndexes = [];
    mxScoreSum = new Matrix(mxScoreSum).trans();
    mxScoreSum.forEach((row, rowIndex) => {
      let max = 0;
      let indexOfMax = 0;
      row.forEach((col, index) => {
        if (col >= max) {
          max = col;
          indexOfMax = index;
          // check if index is taken
          if (resultIndexes.every(x => x !== index)) {
            resultIndexes[rowIndex] = index;
          }
        }
      });
    });
    return resultIndexes;
  }

  function _calculateLevenMatrix(mainArr, childArr) {
    return mainArr.map((mainItem) => {
      return childArr.map((childItem) => levenshtein.get(mainItem, childItem));
    });
  }

  function _calculateMatrix(mxLeven) {
    // calculate min=2 points, equal+min = 1, other 0
    // [3, 1, 2] ==> [0, 2, 0]
    // [3, 1, 1] ==> [0, 1, 1]
    return mxLeven.map((mxLevenRow) => {
      let min = Math.min.apply(Math, mxLevenRow);
      let score = mxLevenRow.indexOf(min) === mxLevenRow.lastIndexOf(min) ? SCORE_UNIQUE : SCORE_SIMILAR_MIN;
      return mxLevenRow.map((item) => (item === min) ? score : SCORE_NOT_UNIQUE);
    });
  }

  var SimilarityMatrix = {
    calculateNewIndex: function(mainArr, childArr) {
      let mxLeven = _calculateLevenMatrix(mainArr, childArr);
      let mxLeftRight = _calculateMatrix(mxLeven);
      mxLeven = new Matrix(mxLeven).trans();
      let mxUpDown = new Matrix(_calculateMatrix(mxLeven)).trans();
      let mxScoreSum = new Matrix(mxUpDown).add(new Matrix(mxLeftRight));
      let resultIndexes = _calculateResultIndexes(mxScoreSum);
      let resultArray = _calculateResultArray(mainArr, resultIndexes, childArr);
      return {resultArray, resultIndexes};
    }
  }

  // amd
  if (typeof define !== "undefined" && define !== null && define.amd) {
    define(function() {
      return SimilarityMatrix;
    });
  }
  // commonjs
  else if (typeof module !== "undefined" && module !== null && typeof exports !== "undefined" && module.exports === exports) {
    module.exports = SimilarityMatrix;
  }
  // web worker
  else if (typeof self !== "undefined" && typeof self.postMessage === 'function' && typeof self.importScripts === 'function') {
    self.SimilarityMatrix = SimilarityMatrix;
  }
  // browser main thread
  else if (typeof window !== "undefined" && window !== null) {
    window.SimilarityMatrix = SimilarityMatrix;
  }
}());
