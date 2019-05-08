// 2520 is the smallest number that can be divided by each of the numbers from 1 to 10 without any remainder.
// What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20?

const DIVISIBILITY_RANGE = [1, 20];

function check_divisibility(x)
{
    for(var i = DIVISIBILITY_RANGE[0]; i <= DIVISIBILITY_RANGE[1]; ++i)
    {
        if(x % i != 0)
            return false;
    }
    return true;
}

function find_next_evenly_divisible_number()
{
    for(var i = 21; true; ++i)
    {
        if(check_divisibility(i))
            return i;
    }
}

let solution = find_next_evenly_divisible_number();
console.log(solution);
