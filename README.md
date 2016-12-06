# similarity-matrix
Calculates the similarity of 2 string arrays and sorts the seconds one by similarity to first

The similarity is calculated with levenshtein.

##Example 1
- Input Array ['abc', 'ab1', 'ab2']
- Array to compare ['ab2']

You can think this as a list you retrieved coming from a master database, and a list coming from another database, that you want to present.

The correct presentation should be:
```
abc     
ab1     
ab2     ab2
```
as this solver will return `{resultArray: ['', '', 'ab2'], resultIndexes: [2]}`

##Example 2
- Input Array ['abc', 'ab1', 'ab2']
- Array to compare ['xy2', 'ab5', 'xb1']

This one is harder to sort manually. There are multiple solutions, but the solver will find the best matching sorting.

The correct presentation should be:
```
abc     ab5    -> similarity = 2
ab1     xb1    -> similarity = 2   
ab2     xy2    -> similarity = 1
```
as this solver will return `{resultArray: ['ab5', 'xb1', 'xy2'], resultIndexes: [2, 0, 1]}`

##How to use

```javascript
const SimilarityMatrix = require('similarity-matrix');
var solved = SimilarityMatrix.calculateNewIndex(['abc', 'ab1', 'ab2'], ['ab2']);

console.log(solved.resultIndexes); // => [2]
console.log(solved.resultArray); // =>  ['', '', 'ab2']

```
The calculation returns an object with 2 arrays. 
- *resultIndexes:* The new indexes of each element. In the example 1 it is returned `[2]`, meaning that the first element in the second array has a new index of `2`
- *resultArray:* An array which is already calculated as the modified version of the second array.
