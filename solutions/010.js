// The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17.
// Find the sum of all the primes below two million.

function isPrime(num)
{
    for(var i = 2; i <= Math.sqrt(num); ++i)
        if(num % i == 0)
            return false;
    return true;
}

function addPrimesBelowN(n)
{
    let sum = 0;
    for(var i = 2; i < n; ++i)
        sum += isPrime(i) ? i : 0;
    return sum;
}

let solution = addPrimesBelowN(2000000);
console.log(solution);
