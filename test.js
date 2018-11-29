var deck = require('./Deck.js');
var player = require('./player.js');
var dealer = require('./dealer.js');
var Card = require('./Card.js');

const _ante = 15, _maxRounds = 20, _startingMoneyAmount = 200;
var _numberOfDecks = 1, _deck = deck, _round = 1, _pot = 0;
var _players = [new player('Huey', _startingMoneyAmount),
                new player('Dewey', _startingMoneyAmount),
                new player('Luey', _startingMoneyAmount),
                new player('Scrooge', _startingMoneyAmount)];
var _dealer = new dealer('dealer');

//_players[0].hands[0].pop();
//_players[0].hands[0].pop();
//_players[0].hands[0].push(new Card('Ace', 'black', 'Spades'));
//_players[0].hands[0].push(new Card('Two', 'red', 'Hearts'));

for (let i = 0; i < _players.length; i++) _dealer.deal( _players[i], 2 );
console.log( _dealer.name, _dealer.getUpCard().value );

for ( let i = 0; i < _players.length; i++ ) {
    if ( _dealer.getUpCard().value === 'Ace' ) _players[i].insurance()
    if ( _players[i].evaluate( _dealer.getUpCard()) == 'W' ) _players[i].surrender( _ante )
    else while ( _players[i].evaluate( _dealer.getUpCard()) == 'H' || _players[i].evaluate( _dealer.getUpCard()) == 'W' )
             _dealer.deal( _players[i], 1 )
}

for (let i = 0; i < _players.length; i++) {
    console.log( _players[i].name );
    for ( let j = 0; j < _players[i].hands[0].length; j++ )
        console.log( '          ', _players[i].hands[0][j].value);
    console.log('                        ', _players[i].evaluate(_dealer.getUpCard()));
}








/*function buildDeck() {
    _deck = new Deck();
    for (i = 0; i < 7; i++) {
        _deck.cards = _deck.cards.concat(new Deck().cards);
    }
}

function shuffle(deck) {
    for (let i = deck.cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i));
        [deck.cards[i], deck.cards[j]] = [deck.cards[j], deck.cards[i]];
    }
    return deck;
}

function deal(deck, players) {
    for (let i = 0; i < 2; i++) {
        for (let i = 0; i < _players.length; i++) {
            players[i].hands[0].push(deck.cards.pop());
        }
        _dealer.hand.push(deck.cards.pop());
    }
}

buildDeck();
for (let i = 0; i < _players.length; i++) _players[i].anteUp( _ante )
_deck = shuffle (_deck);
deal( _deck, _players);

//_dealer.hand.pop();
//_dealer.hand.push(new Card('7', 'black', 'club'));
//_players[0].hands[0].pop();
//_players[0].hands[0].pop();
//_players[0].hands[0].push(new Card('4', 'black', 'heart'));
//_players[0].hands[0].push(new Card('2', 'black', 'club'));

console.log( 'Dealer','Players','Action');
console.log( _dealer.upCard().value);

for ( let i = 0; i < _players.length; i++ ) {
    if ( _dealer.upCard().value === 'A' ) _players[i].insurance()
    if ( _players[i].evaluate( _dealer.upCard()) == 'W' ) _players[i].surrender( _ante )
    else while ( _players[i].evaluate( _dealer.upCard()) == 'H' || _players[i].evaluate( _dealer.upCard()) == 'W' )
             _dealer.hitPlayer( _deck, _players[i] )
}

for (let i = 0; i < _players.length; i ++) {
    for (let j = 0; j < _players[i].hands[0].length; j++) {
        console.log( '        ', _players[i].hands[0][j].value )
    } 
    console.log( '              ', _players[i].evaluate( _dealer.upCard()));
}*/