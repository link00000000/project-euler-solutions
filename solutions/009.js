// A Pythagorean triplet is a set of three natural numbers, a < b < c, for which,
//  a2 + b2 = c2
// For example, 32 + 42 = 9 + 16 = 25 = 52.
// There exists exactly one Pythagorean triplet for which a + b + c = 1000.Find the product abc.

function findPathagoreanTripletProduct(desiredSum)
{
    let a = 1;
    let b = 2;
    let c = (a * a) + (b * b);

    while(true)
    {
        b++;
        if(a + b + c > desiredSum)
        {
            ++a;
            b = a + 1;
        }
        c = Math.sqrt((a * a) + (b * b));

        if(a > desiredSum)
        {
            return false;
        }

        if(a + b + c == desiredSum)
        {
            return a * b * c;
        }
    }
}

let solution = findPathagoreanTripletProduct(1000);
console.log(solution);
