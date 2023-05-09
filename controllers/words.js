
const anagrams = async function(string) {
    // use datamuse api to find list of words - api.datamuse.com/words?sp=
    // take in a string, check all scrambled possibilities to find actual english words that are made of the same letters
    // filter down the list of possibilities by length first

if (typeof string !== "string") {
    string = string.toString()
}
let arr = string.split('')
let fill = '?'
let testingArr = []
let wordsArr = []
let baseUrl = 'https://api.datamuse.com'
let url

for (let i = 0; i < string.length; i++) {
    testingArr.push(`${arr[i]}${fill.repeat(string.length-1)}`)
}

for (let word of testingArr) {
    url = new URL(`/words?sp=${word}&max=400`, baseUrl)
    await fetch(url)
        .then((response) => response.json())
        .then((data) => {
            for (let x = 0; x < data.length; x++)
            wordsArr.push(data[x].word)
        }
        )
}
// now, before I actually return the entire array, I need to filter it down to answers that would actually make sense in
    // context. namely, only answers that have the same letter frequency as the given string (same letters, same amount of 
    // times). 
    let numSum = arr.map((e) => e.charCodeAt()).reduce((a, b) => a + b, 0)
    let ansArr = wordsArr.filter(entry => {
        
        if (entry.split('').every(el => arr.includes(el)) && 
            entry.split('').map(e => e.charCodeAt()).reduce((a, b) => a + b, 0) === numSum &&
            entry != string) {
            return true
        }
    })
    console.log(ansArr)
    return [...new Set(ansArr)]
}

module.exports = {
    wordsList: async (req, res) => {
        try{
            console.log(req.body.entry) // this grabs the input from the form
            console.log('working so far')
            res.render("index.ejs", {words: await anagrams(req.body.entry)}) // had a problem here, needed to wrap index.ejs in quotes.
        }catch(err) {
            console.log(err)
        }
    }
}