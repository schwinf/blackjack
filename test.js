var Deck = require('./Deck.js');
var player = require('./player.js');
var dealer = require('./dealer.js');
var Card = require('./Card.js');

const _ante = 15, _maxRounds = 20, _startingMoneyAmount = 200;
var _numberOfDecks = 1, _deck, _round = 1, _pot = 0;
var _players = [new player('Huey', _startingMoneyAmount),
                new player('Dewey', _startingMoneyAmount),
                new player('Luey', _startingMoneyAmount),
                new player('Scrooge', _startingMoneyAmount)];
var _dealer = new dealer('Dealer');

function buildDeck() {
    _deck = new Deck();
    for (i = 0; i < 7; i++) {
        _deck.cards = _deck.cards.concat(new Deck().cards);
    }
}

function shuffle(deck) {
    for (let i = deck.cards.length - 2; i > 0; i--) {
        const j = Math.floor(Math.random() * (i));
        [deck.cards[i], deck.cards[j]] = [deck.cards[j], deck.cards[i]];
    }
    return deck;
}

function deal(deck, players) {
    for (let i = 0; i < 2; i++) {
        for (let i = 0; i < _players.length; i++) {
            players[i].playerHand.push(deck.cards.pop());
        }
        _dealer.dealerHand.push(deck.cards.pop());
    }
}

buildDeck();
for (let i = 0; i < _players.length; i++) _pot = _pot + _players[i].anteUp(_ante);
_deck = shuffle (_deck);
deal( _deck, _players);

//_dealer.dealerHand.push(new Card('A', 'black', 'spade'));
//_dealer.dealerHand.push(new Card('4', 'black', 'club'));
//_players[0].playerHand.push(new Card('A', 'black', 'club'));
//_players[0].playerHand.push(new Card('J', 'black', 'club'));

console.log( 'Dealer','Players','Action');
console.log( _dealer.upCard().value, '    ', _players[0].playerHand[0].value, _players[0].playerHand[1].value);
console.log('              ', _players[0].evaluate( _dealer.upCard()));
console.log('      ', _players[1].playerHand[0].value, _players[1].playerHand[1].value);
console.log('              ', _players[1].evaluate( _dealer.upCard()));
console.log('      ', _players[2].playerHand[0].value, _players[2].playerHand[1].value);
console.log('              ', _players[2].evaluate( _dealer.upCard()));
console.log('      ', _players[3].playerHand[0].value, _players[3].playerHand[1].value);
console.log('              ', _players[3].evaluate( _dealer.upCard()));