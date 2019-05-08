const LANG = require('./languages.json');

const figlet = require('figlet');
const prompts = require('prompts');
const request = require('async-request');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

// Prepends id with leading 0s
function idToString(id)
{
    if(id < 10)
        return "00" + id;
    if(id < 100)
        return "0" + id;
    return id;
}

// Get latest exercise number from project euler
async function getLargestExerciseID()
{
    try {
        let res = await request("https://projecteuler.net/archives;page=999999999999999999");
        let $ = cheerio.load(res.body);
        return parseInt($('#problems_table tr:last-child td:first-child').text());
    } catch(e) {
        throw e;
    }
}

// Create output directory if it doesn't exist
async function createOutputDirectory()
{
    let outputDir = path.join(__dirname, '..', 'solutions');
    fs.mkdirSync(outputDir, { recursive: true });
}

// Get exercise text from project euler site
async function getExerciseText(id)
{
    try {
        let res = await request("https://projecteuler.net/problem=" + id);
        let $ = cheerio.load(res.body);
        return $('.problem_content').text().trim();
    } catch(e) {
        throw e;
    }
}

// Writes exercises to file
async function writeFile(exerciseId, overwrite, lang)
{
    let outputDir = path.join(__dirname, '..', 'solutions');
    if(overwrite || (!overwrite && !fs.existsSync(path.join(outputDir, idToString(exerciseId)) + lang.ext)))
    {
        console.log('Writing exercise ' + exerciseId);
        let commentedText = await getExerciseText(exerciseId);
        commentedText = lang.comment + ' ' + commentedText.replace(/\n/g, '\n' + lang.comment + ' ');
        fs.writeFileSync(path.join(outputDir, idToString(exerciseId)) + lang.ext, commentedText);
    }
    else
    {
        console.log('Skipping exercise ' + exerciseId);
    }

}

// Prints welcome message
console.log('A downloader for');
figlet('Project Euler', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(data);
});

// Main program
(async () => {
    const LARGEST_EXERCISE_ID = await getLargestExerciseID();

    let language = await prompts({
        type: 'select',
        name: 'language',
        message: 'Choose a language',
        choices: Object.keys(LANG),
        format: val => LANG[Object.keys(LANG)[val]]
    });

    let downloadAll = await prompts({
        type: 'toggle',
        name: 'downloadAll',
        message: 'Download all exercises?',
        initial: true,
        active: 'yes',
        inactive: 'no'
    });

    let problemSet = downloadAll.downloadAll ?
    Object({ problemSet: Array.from(Array(LARGEST_EXERCISE_ID)).map((e, i) => ++i) }) :
    await prompts({
        type: 'list',
        name: 'problemSet',
        message: 'Enter the exercises you would like to download\n  Separate items with a comma (,)',
        validate: val => {
            val = val.split(',');
            for(var i = 0; i < val.length; ++i)
            {
                if(isNaN(val[i]))
                    return "Exercise IDs must be integers. Input: " + val[i].trim();

                val[i] = parseInt(val[i]);
                if(val[i] < 1)
                    return "Exercise IDs must be greater than 0. Input: " + val[i];
                if(val[i] > LARGEST_EXERCISE_ID)
                    return "Exercise IDs cannot be greater than the number of exercises, " + LARGEST_EXERCISE_ID + ". Input: " + val[i];
            }
            return true;
        },
        format: val => {
            for(var i = 0; i < val.length; ++i)
                val[i] = parseInt(val[i]);
            return [...new Set(val.sort())];
        }
    });

    let overwriteFiles = await prompts({
        type: 'toggle',
        name: 'overwriteFiles',
        message: 'Overwrite files while downloading?',
        active: 'yes',
        inactive: 'no'
    });

    await createOutputDirectory();

    for(var i = 0; i < problemSet.problemSet.length; ++i)
    {
        await writeFile(problemSet.problemSet[i], overwriteFiles.overwriteFiles, language.language);
    }

    process.exit(0);
})();
