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

for (let j = 0; j < 2; j++ ) {
    for (let i = 0; i < _players.length + 1; i++) {
        _dealer.deal( _players[i], 0 );
    }
}

//_dealer.dealerHand.pop();
//_dealer.dealerHand.push(new Card('Ace', 'red', 'Diamonds'));
//_players[0].hands[0].pop();
//_players[0].hands[0].push(new Card('Eight', 'red', 'Hearts'));

play = function( i, hand ) {
    // insurance not recommended for long run
    if ( _dealer.getUpCard().value === 'Ace' ) {
        _players[i].insurance();
    }
    // surrender
    if ( _players[i].evaluate( _dealer.getUpCard(), hand ) === 'W' ) {
        _players[i].surrender( _ante );
    }
    // double down only deal one card, and only after first two cards are dealt (only first char of evaluate())
    else if ( _players[i].evaluate( _dealer.getUpCard(), hand ).charAt(0) === 'D' ) {
        _dealer.deal( _players[i], hand );
    } // TODO: correctly implement re-splitting
    else if ( _players[i].evaluate( _dealer.getUpCard(), hand ) === 'L' ) {
        _players[i].split( hand );
        _dealer.deal( _players[i], hand );
        _dealer.deal( _players[i], hand + 1 );
        for ( let k = hand; k < 2; k++ ) {
            play( i, k );
        }
    }
    else {
        while ( _players[i].evaluate( _dealer.getUpCard(), hand ) === 'H'
                 || _players[i].evaluate( _dealer.getUpCard(), hand ) === 'W'
                 || _players[i].evaluate( _dealer.getUpCard(), hand ) === 'Dh') {
                    _dealer.deal( _players[i], hand );
                 }
    }
}
//start of game play
for ( let i = 0; i < _players.length; i++ ) {
    let hand = 0;
    // The play() function is recursive for split hands, but it only correctly plays the original 
    // and first split hands.
    play( i, hand ); 

    //The dealer hand will not be completed if all players have either busted or received blackjack
    var dealerComplete = false;
    for ( let j = 0; j < _players.length; j++ ) {
        let playerDisposition = _players[j].evaluate( _dealer.getUpCard(), hand );
        if ( playerDisposition != 'Win' && playerDisposition != 'Bust' && playerDisposition != 'W') {
            dealerComplete = true;
        }
    }
    if ( dealerComplete ) while (_dealer.evaluateDealer() < 17) _dealer.deal()
    //end of game play
    //start of attempt to determine winner(s)
    var results = [];
    let handId = '';
    results.push([]);
    let u = 0;
    results[u].push( _dealer.name );
    let dealerScore = _dealer.scoreHand( _dealer.dealerHand )
    results[u++].push( dealerScore );
    //if ( dealerScore === 'BlackJack' ) results[u++].push('Win');
    //else if ( dealerScore > 21 ) results[u++].push('Lose');

    for ( s = 0; s < _players.length; s++ ) {

        for ( t = 0; t < _players[s].hands.length; t++ ) {
            let score = _dealer.scoreHand( _players[s].hands[t] );
            if ( t === 1 ) handId = ' split #' + ( t );
            else handId = '';
            results.push([]);
            results[u].push( _players[s].name + handId );
            results[u++].push( score );
            //if ( dealerScore = 'BlackJack' ) results[u++].push('Lose');
            //else if (( score = 'BlackJack' || score === 21 ) && dealerScore != 'BlackJack' ) results[u++].push('Win');
        }
    }
}
// A 'Blackjack' in with the numeric values renders this sort function useless.
// May need to track blackjacks with another dimension in the array.
results.sort(function(a,b) {
    return b[1]-a[1];
});
console.log('');
//for ( v = 0; v < results.length; v++ ) console.log( results[v][0], results[v][1], results[v][2]);
for ( v = 0; v < results.length; v++ ) console.log( results[v][0], results[v][1])
console.log('');

printResults = function( ) {  // this function prints the tabular report with the cards in it for testing
    let width = 10;

    let names = _dealer.name;
    names += ' '.repeat(width - dealer.name.length);
    let uline = '-'.repeat(dealer.name.length);
    uline += ' '.repeat(width - dealer.name.length);
    let printCards = [];
  
    for ( var p = 0;  p < _dealer.dealerHand.length; p++ ) {
        if ( p === 1 ) {
            printCards[p] = '*' + _dealer.dealerHand[p].value;
        }
        else {
            printCards[p] = _dealer.dealerHand[p].value;
        }
        printCards[p] += ' '.repeat( width - _dealer.dealerHand[p].value.length - p );
    }
    var scores = '' + _dealer.scoreHand( _dealer.dealerHand );
    scores += ' '.repeat( width - scores.length );
    let handsCount = 0;

    for (let i = 0; i < _players.length; i++) {
        names += _players[i].name;
        uline += '-'.repeat(_players[i].name.length);
        let numHands = _players[i].hands.length;

        for ( k = 0; k < numHands; k++ ) {
            handsCount++;

            for ( var m = 0;  m < _players[i].hands[k].length; m++ ) {
                if ( typeof printCards[m] === 'undefined' ) {
                    printCards[m] = '';
                }
                if ( printCards[m].length < handsCount * 10) {
                    printCards[m] += ' '.repeat( handsCount * 10 - printCards[m].length);
                } 
                printCards[m] += _players[i].hands[k][m].value;
                printCards[m] += ' '.repeat( width - _players[i].hands[k][m].value.length );
            }
            let score = '' + _dealer.scoreHand( _players[i].hands[k] );
            scores += score;
            scores += ' '.repeat( width - score.length );
        }
        for (let j = width * numHands; j > _players[i].name.length; j--) { 
            names += ' '; 
            uline += ' ';
        }
    }
    console.log(names);
    console.log(uline); 
    for ( let n = 0; n < printCards.length; n++ ) console.log( printCards[n] );
    console.log(scores);
}
printResults();