var Deck = require('./Deck.js');

// The Duck Tales guys are going to the casino and 
// they want to simulate 20 games of black jack.  Each
// players starts with 200 dollars.  Each game is $15.  If
// they lose all their money they can no longer play.  Simulate
// the outcome.  At the end output the player and how much
// they each won / lost.

// RULES
// Number of Decks between 1-8
// Dealer Hits on 16 and Below

//Simulation Data 
const _ante = 15, _maxRounds = 200;
var _numberOfDecks = 1, _deck, _round = 1;
var _players = [new Player('Huey', 200),
new Player('Dewey', 200),
new Player('Luey', 200),
new Player('Scrooge', 200)];
var _dealer = new Dealer('Dealer');