// The sum of the squares of the first ten natural numbers is,
// 1^2 + 2^2 + ... + 10^2 = 385
// The square of the sum of the first ten natural numbers is,
// (1 + 2 + ... + 10)^2 = 552 = 3025
// Hence the difference between the sum of the squares of the first ten natural numbers and the square of the sum is 3025 − 385 = 2640.
// Find the difference between the sum of the squares of the first one hundred natural numbers and the square of the sum.

const NUM_ITEMS = 100;

function calcSumOfSquares(n)
{
    let sum = 0;
    for(var i = 1; i <= n; ++i)
        sum += (i * i);
    return sum;
}

function calcSquareOfSums(n)
{
    let sum = 0;
    for(var i = 0; i <= n; ++i)
        sum += i;
    return sum * sum;
}

let solution = calcSquareOfSums(NUM_ITEMS) - calcSumOfSquares(NUM_ITEMS);
console.log(solution);
