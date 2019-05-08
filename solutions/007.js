// By listing the first six prime numbers: 2, 3, 5, 7, 11, and 13, we can see that the 6th prime is 13.
// What is the 10 001st prime number?

function isPrime(num)
{
    for(var i = 2; i <= Math.sqrt(num); ++i)
        if(num % i == 0)
            return false;
    return true;
}

function findNextPrime(index)
{
    while(!isPrime(++index));
    return index;
}

function getNthPrime(n)
{
    let nthPrime = 1;
    for(var i = 0; i < n; ++i)
    {
        nthPrime = findNextPrime(nthPrime);
    }
    return nthPrime;
}

let solution = getNthPrime(10001);
console.log(solution);
