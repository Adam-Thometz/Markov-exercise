/** Command-line tool to generate Markov text. */
const fs = require('fs')
const cheerio = require('cheerio');
const axios = require('axios')
const {MarkovMachine} = require('./markov')

function markovFile(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error('Invalid file path', err)
            process.exit(1)
        } else {
            const markov = new MarkovMachine(data)
            console.log(markov.makeText())
        }
    })
}

async function markovWeb(path) {
    let res;
    try {
        res = await axios.get(path)
    } catch (err) {
        console.error('Invalid URL', err)
        process.exit(1)
    }
    // const parse = cheerio.load(res.data)
    // console.log(parse)
    const markov = new MarkovMachine(res.data)
    console.log(markov.makeText())
}

let [source, path] = process.argv.slice(2);

if (source === 'file') {
    markovFile(path)
} else if (source === 'url') {
    markovWeb(path)
} else {
    console.error("Specify either 'file' or 'url")
    process.exit(1)
}