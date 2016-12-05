# similarity-matrix
Calculates the similarity of 2 string matrixes and sorts the seconds one by similarity to first

The similarity is calculated with levenshtein.

##Example
- Input Matrix ["abc", "ab1", "ab2"]
- Matrix to compare ["ab2"]

You can think this as a list you retrieved coming from a master database, and a list coming from another database, that you want to present.

The correct presentation should be:
abc     
ab1     
ab2     ab2

as this solver will return ['', '', 'ab2']

##How to use

```javascript
const SimilarityMatrix = require('../lib');
var solved = SimilarityMatrix.calculateNewIndex(['abc', 'ab1', 'ab2'], ['ab2']);

console.log(solved.resultIndexes); // => [2]
console.log(solved.resultArray); // =>  ['', '', 'ab2']

```

