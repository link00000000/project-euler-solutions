// The prime factors of 13195 are 5, 7, 13 and 29.
// What is the largest prime factor of the number 600851475143 ?

function find_largest_prime_factor(x) {
    let largestFactor;
    for(var i = 1; i < x / Math.sqrt(x); i += 2)
    {
        console.log(
            'Checking number',
            i,
            '/',
            Math.round(Math.sqrt(x)),
            '...',
            Math.round(i / Math.sqrt(x) * 100),
            '%'
        );
        if(x % i == 0 && is_prime(i))
        {
            largestFactor = i;
        }
    }
    return largestFactor;
}

function is_prime(x) {
    for(var i = 2; i <= Math.sqrt(x); ++i)
    {
        if(x % i == 0)
        {
            return false;
        }
    }
    return true;
}

let solution = find_largest_prime_factor(600851475143);
console.log('Solution:', solution);
