// A palindromic number reads the same both ways. The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99.
// Find the largest palindrome made from the product of two 3-digit numbers.

function is_palindrome(x)
{
    x = x.toString();
    if(x.length < 2)
        return true;
    if(x[0] != x[x.length - 1])
        return false;
    return is_palindrome(x.substr(1, x.length - 2));
}

function find_largest_palindrome_product(numDigits)
{
    let largestPossibleInteger = Math.pow(10, numDigits);
    let largestPalindrome = 0;

    for(var i = 1; i < largestPossibleInteger; ++i)
    {
        for(var j = 1; j < largestPossibleInteger; ++j)
        {
            let isProductPalindrome = is_palindrome(i * j);
            console.log(`(${Math.round(i / largestPossibleInteger * 100)}%) Testing ${i} * ${j} = ${i * j}: ${isProductPalindrome}`);
            if(isProductPalindrome && largestPalindrome < i * j)
                largestPalindrome = i * j;
        }
    }
    return largestPalindrome;
}

let solution = find_largest_palindrome_product(3);
console.log(solution);
