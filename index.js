const readline = require('readline')

const CardSuits = ['Spades', 'Hearts', 'Diamonds', 'Clubs'];
const CardFaces = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'King', 'Queen', 'Jack'];

class Card {
  #face
  #suit
  constructor(face, suit) {
    this.#face = face
    this.#suit = suit
  }
  get suit() {
    return this.#suit
  }
  get face() {
    return this.#face
  }
  get value() {
    switch (this.#face) {
      case 10:
      case 'King':
      case 'Queen':
      case 'Jack':
        return 0
      case 'Ace':
        return 1
      default:
        return this.#face
    }
  }
}

class Deck {
  #cards = []
  constructor() {
    for (const suit of CardSuits) {
      for (const face of CardFaces) {
        const card = new Card(face, suit)
        this.#cards.push(card)
      }
    }
  }
  shuffle() {
    const cards = this.#cards
    const len = cards.length
    for (let i = 0; i < len; i += 1) {
      const s = Math.floor(Math.random() * len)
      const tmp = cards[i]
      cards[i] = cards[s]
      cards[s] = tmp
    }
  }
  get cards() {
    return this.#cards
  }
  draw(numcard = 1) {
    return this.#cards.splice(0, numcard)
  }
}

async function main() {
  const rl = readline.createInterface(
    {
      input: process.stdin,
      output: process.stdout
    }
  )
  const read = (msg) => new Promise(
    (res, rej) => 
      rl.question(msg, 
        (ans) => res(ans)
      )
  )
  for (;;) {
    // you placing bets
    // dealer reset deck and shuffle deck
    // dealer pull 2 cards from deck for you
    // dealer pull 2 cards from deck for himself
    // compare values of card in yor hand against dealer
    // 1. player > dealer, dealer pay you the amount you bet
    // 2. player = dealer, you got nothing
    // 3. player < dealer, you lose the bet
    // you choose to continue or stop
  }
}
main()
