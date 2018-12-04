var deck = require('./Deck.js');
var player = require('./player.js');
var dealer = require('./dealer.js');
var Card = require('./Card.js');

const _ante = 15, _maxRounds = 20, _startingMoneyAmount = 40;
var _numberOfDecks = 1, _deck = deck, _round = 1, _pot = 0;
var _players = [new player('Huey', _startingMoneyAmount),
                new player('Dewey', _startingMoneyAmount),
                new player('Luey', _startingMoneyAmount),
                new player('Scrooge', _startingMoneyAmount)];
var _dealer = new dealer('dealer');


deal = function(){
    for (let j = 0; j < 2; j++ ) {
        for (let i = 0; i < _players.length + 1; i++) {
            _dealer.deal( _players[i], 0 );
        }
    }
}

// testing split
//_players[0].hands[0].pop();
//_players[0].hands[0].pop();
//_players[0].hands[0].push(new Card( 'Eight' ));
//_players[0].hands[0].push(new Card( 'Eight' ));


play = function( i, handIndex ) {
    // insurance not recommended for long run
    if ( _dealer.getUpCard().value === 'Ace' ) _players[i].insurance( )
    let playerDecision = '';

    let handSize = _players[i].hands[handIndex].length;
    if ( handSize > 1 ) {
        playerDecision = _players[i].evaluate( _dealer.getUpCard(), handIndex );
    }
    switch ( handSize ) {
        case 1:         // hand was split, needs another card before evaluating
            _dealer.deal( _players[i], handIndex );  
            playerDecision = _players[i].evaluate( _dealer.getUpCard(), handIndex );
            break;
        case 2:         // can only double down on first two cards
            if ( playerDecision.charAt( 0 ) === 'D' ) {
                playerDecision = playerDecision.charAt( 0 );
            }
            break;
        case 3:         // double down not allowed, so get the second character in 'Dh' or 'Ds' for decision
            if ( playerDecision.charAt( 0 ) === 'D' ) {
                playerDecision = playerDecision.charAt( 1 ).toUpperCase( );
            }
            break;
        default:
            break;
    }

    switch ( playerDecision ) {
        case 'W':       // surrender not advised for basic strategy in long run
            _players[i].surrender( _ante );
            break;
        case 'D':       // double down--only one more card to be dealt
            _dealer.deal( _players[i], handIndex );
            _players[i].isDoubleDown = true;
            break;  
        case 'L':       // split hand, deal on current hand until played out
            if(_players[i].money < (_ante * 2)){
                _players[i].split( handIndex, _ante );
                _dealer.deal( _players[i], handIndex );
                while ( handIndex < _players[i].hands.length ) {
                    play( i, handIndex++ );
                }
            }
            break;
        case 'H':       // surrender (W) not allowed on third card, so hit; also 'Dh' is hit with > 2 cards 
            while ( _players[i].evaluate( _dealer.getUpCard(), handIndex ) === 'H' || 
                    _players[i].evaluate( _dealer.getUpCard(), handIndex ) === 'W' ||
                    _players[i].evaluate( _dealer.getUpCard(), handIndex ) === 'Dh') {
                        _dealer.deal( _players[i], handIndex );
                    }
            break;
        default:
            break;
    }
}
//start of game play
for ( let rounds = 1; (rounds <= _maxRounds) && (_players.length > 0); rounds++){
    console.log("Round: " + rounds);
    deal();
    for ( let i = 0; i < _players.length; i++ ) {
        _players[i].anteUp(_ante);
        let handIndex = 0;
        play( i, handIndex ); 

        //The dealer hand will not be completed if all players have either busted or received blackjack
        var dealerComplete = false;
        for ( let j = 0; j < _players.length; j++ ) {
            let playerDisposition = _players[j].evaluate( _dealer.getUpCard(), handIndex );
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
        for ( w = 0; w < _players[i].hands.length; w++ ) {
            if( (_dealer.scoreHand( _players[i].hands[w] ) === dealerScore) && dealerScore <= 21) {
                if(_players[i].hasBlackJack){
                    _dealer.payOut(_players[i], _ante);
                    _player.hasBlackJack = false;
                }
                else {
                    _players[i].money += _ante;
                }
            }
            else if((_dealer.scoreHand( _players[i].hands[w] ) >= dealerScore && (_dealer.scoreHand( _players[i].hands[w] ) <= 21)) || ((dealerScore > 21) && ((_dealer.scoreHand( _players[i].hands[w] ) <= 21 ))) || _dealer.scoreHand( _players[i].hands[w] == "Blackjack")){
                if(_players[i].isDoubleDown){
                    _dealer.payOut(_players[i], _ante);
                    _players[i].isDoubleDown = false;
                }
                _dealer.payOut( _players[i], _ante);
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
        let totalMoney = '';
    
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
            totalMoney += _players[i].money;
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
                totalMoney += ' ';
                uline += ' ';
            }
        }
        console.log(names);
        console.log(' '.repeat(_dealer.name.length) + '     ' + totalMoney);
        console.log(uline); 
        
        for ( let n = 0; n < printCards.length; n++ ) console.log( printCards[n] );
        console.log(scores);
    }
    printResults();
    for ( let y = 0; y < _players.length; y++ ) {
        var index = _players.indexOf(_players[y]);
        if( _players[y].money < _ante){
            if(index != -1){
                _players.splice(index, 1);
                --y;
            }
        }
    }
    for ( let z = 0; z < _players.length; z++ ) {
        _players[z].hands = [[]];
    }
    
    _dealer.dealerHand = [];
}