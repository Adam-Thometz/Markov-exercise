/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    const chains = new Map();

    for (let i = 0; i < this.words.length; i++) {
      const word = this.words[i]
      const nextWord = this.words[i+1] || null

      if (chains.has(word)) {
        chains.get(word).push(nextWord)
      } else {
        chains.set(word, [nextWord])
      }
    }
    this.chains = chains
  }

  /** return random text from chains */

  static randChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
  }

  makeText(numWords = 100) {
    const keys = Array.from(this.chains.keys())
    const out = []
    
    let key = MarkovMachine.randChoice(keys)
    while (out.length < numWords && key !== null) {
      out.push(key)
      key = MarkovMachine.randChoice(this.chains.get(key))
    }

    return out.join(" ")
  }
}

module.exports = {MarkovMachine}