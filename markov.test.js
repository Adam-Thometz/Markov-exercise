const {MarkovMachine} = require('./markov')

describe('test markov chains', () => {
  let markov;
  beforeEach(() => {
    markov = new MarkovMachine('The cat in the hat is in the hat')
  })

  test('test words in Markov chain', () => {
    words = [
      'The', 'cat', 'in',
      'the', 'hat', 'is',
      'in',  'the', 'hat'
    ]
    expect(markov.words).toEqual(words)
  })

  test('test chains in Markov chain', () => {
    expect(markov.chains.get('The')).toEqual(['cat'])
    expect(markov.chains.get('the')).toEqual(['hat', 'hat'])
    expect(markov.chains.get('hat')).toEqual(['is', null])
  })

  test('test makeText() function in Markov chain', () => {
    const text = markov.makeText()

    expect(text).toEqual(expect.any(String))
    expect(text.substring(text.length, text.length-3)).toEqual('hat')
  })
})