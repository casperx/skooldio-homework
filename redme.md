## Skooldio Backend Homework
Pokdeng Game written in JavaScript

---
### How to play
```
npm start
```
1. The initial step is putting your bets. After placing your bet, say 5 chips, the dealer will shuffle the deck, and deal two cards for you. The dealer gets the last pair.
2. The values of the cards as shown
   * `Ace` is one point. 
   * Numbers 2 to 9 have face values
   * the `King`, `Queen`, `Jack`, and 10 are zero. 
3. Then it comes to scoring against the dealer, players can beat, tie with, or lose. 
   1. If Player beat the dealer, you get the payout equal to the original bet
   2. If Player tie with the dealer, you get nothing
   3. Otherwise, you lose the bet.
4. Player chose to continue or stop
   1. If you continue, then start step 1 again. 
5. At the end of the game,  the game shows your net chip on hand.
