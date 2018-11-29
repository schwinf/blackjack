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

for (let j = 0; j < 2; j++ ) for (let i = 0; i < _players.length + 1; i++) _dealer.deal( _players[i] );

//_dealer.dealerHand.pop();
//_dealer.dealerHand.push(new Card('Ace', 'red', 'Hearts'));
//_players[0].hands[0].pop();
//_players[0].hands[0].pop();
//_players[0].hands[0].push(new Card('Ace', 'black', 'Spades'));
//_players[0].hands[0].push(new Card('Ten', 'red', 'Hearts'));

console.log( _dealer.name, _dealer.getUpCard().value );

for ( let i = 0; i < _players.length; i++ ) {
    if ( _dealer.getUpCard().value === 'Ace' ) _players[i].insurance()
    if ( _players[i].evaluate( _dealer.getUpCard()) == 'W' ) _players[i].surrender( _ante )
    else while ( _players[i].evaluate( _dealer.getUpCard()) == 'H' || _players[i].evaluate( _dealer.getUpCard()) == 'W' )
             _dealer.deal( _players[i], 1 )
    var dealerComplete = false;
    for ( let j = 0; j < _players.length; j++ ) {
        let playerDisposition = _players[j].evaluate( _dealer.getUpCard());
        if ( playerDisposition != 'Win' && playerDisposition != 'Bust' && playerDisposition != 'W') dealerComplete = true
    }
    if ( dealerComplete ) {
        var dealerScore = _dealer.evaluateDealer();
        var k = 0;
    }
}

for (let i = 0; i < _players.length; i++) {
    console.log( _players[i].name );
    for ( let j = 0; j < _players[i].hands[0].length; j++ )
        console.log( '          ', _players[i].hands[0][j].value);
    console.log('                        ', _players[i].evaluate(_dealer.getUpCard()));
}
console.log( dealerComplete, _dealer.dealerHand[0].value, _dealer.dealerHand[1].value, dealerScore );