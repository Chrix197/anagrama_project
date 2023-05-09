// const fetch = require("node-fetch")

module.exports = {
    anagrams: function(string) {
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
    let url = ''

    for (let i = 0; i < string.length; i++) {
        testingArr.push(`${arr[i]}${fill.repeat(string.length-1)}`)
    }

    for (let word of testingArr) {
        url = `api.datamuse.com/words?sp=${word}`
        fetch(url)
            .then((response) => response.json())
            .then((data) => 
                console.log(data.word),
                wordsArr.push(data.word)
            )
    }
    return wordsArr
}
}