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
    // calculate value base on card face
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
  toString() {
    return `${this.#suit}-${this.#face}`
  }
}

class Deck {
  #cards = []
  constructor() {
    // construct standard deck consist of 52 cards
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

  // helper functions
  const readLine = (msg) => new Promise(
    (res, rej) => 
      rl.question(msg, 
        (ans) => res(ans)
      )
  )

  const sumCardValue = 
    (cards) => 
      cards.reduce(
        (a, i) => a + i.value
      )
  const printCards = (cards) => cards.join(', ')

  let accumulateChip = 0

  // game loop
  for (;;) {
    // 1. you placing bets
    const betAmoutText = await readLine('Please put your bet\n')
    const betAmount = parseInt(betAmoutText, 10)

    // deduct bet amount from balance
    accumulateChip -= betAmount

    // 2. dealer reset deck and shuffle deck
    const deck = new Deck()
    deck.shuffle()
    
    // 3. dealer pull 2 cards from deck for you
    const yourCards = deck.draw(2)
    // 4. dealer pull 2 cards from deck for himself
    const dealerCards = deck.draw(2)

    // show card to screen
    console.log(`You got ${printCards(yourCards)}`)
    console.log(`The dealer got ${printCards(dealerCards)}`)

    // 5. compare values of card in yor hand against dealer
    const yourCardsValue = sumCardValue(yourCards)
    const dealerCardsValue = sumCardValue(dealerCards)

    // 5.1. player > dealer, dealer pay you the amount you bet
    if (yourCardsValue > dealerCardsValue) {
      accumulateChip += betAmount * 2 // multiply by 2 because dealer deduct you when you bet, 
                                      // you get amout you bet returned too (observe from example)
      console.log(`You won!!, received ${betAmount} chips`)
    }

    // 5.2. player < dealer, you lose the bet
    else if (yourCardsValue < dealerCardsValue) {
      // dealer got the chips that you place bet
      console.log(`You lose!!, paid ${betAmount} chips`)
    }

    // 5.3. player = dealer, you got nothing
    else {
      console.log(`Tie, no one gain, no one lose`)
    }

    // 6. you choose to play again or stop
    const playAgainAns = await readLine('Wanna play more (Yes/No)?\n')
    if (playAgainAns.toLowerCase() === 'no') break;
  }

  if (accumulateChip > 0)
    console.log(`You got total ${accumulateChip} chips`)
  else if (accumulateChip < 0)
    console.log(`You owe dealer ${Math.abs(accumulateChip)} chips`)
  else
    console.log(`You got nothing`)

  rl.close()
}

main()
