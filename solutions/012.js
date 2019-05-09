// The sequence of triangle numbers is generated by adding the natural numbers. So the 7th triangle number would be 1 + 2 + 3 + 4 + 5 + 6 + 7 = 28. The first ten terms would be:
// 1, 3, 6, 10, 15, 21, 28, 36, 45, 55, ...
// Let us list the factors of the first seven triangle numbers:
//  1: 1 3: 1,3 6: 1,2,3,610: 1,2,5,1015: 1,3,5,1521: 1,3,7,2128: 1,2,4,7,14,28
// We can see that 28 is the first triangle number to have over five divisors.
// What is the value of the first triangle number to have over five hundred divisors?

const NUM_DIVISORS = 500;

function getNumDivisors(x)
{
    let numDivisors = 0;
    for(var i = 0; i < Math.sqrt(x); ++i)
        if(x % i == 0)
            ++numDivisors;
    return numDivisors % 2 == 0 ? numDivisors * 2 : (numDivisors - 1) * 2 + 1;
}

function findFirstTriangleNumberWithNDivisors(n)
{
    let triangleNum = 0;
    let numDivisors = 0;
    for(var i = 1; true; ++i)
    {
        numDivisors = getNumDivisors(triangleNum);

        if(numDivisors >= n)
            return triangleNum;

        triangleNum += i;
    }
    return triangleNum;
}

let solution = findFirstTriangleNumberWithNDivisors(NUM_DIVISORS);
console.log('Solution: ' + solution);
