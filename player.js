var BasicStrategy = require('./BasicStrategy.js');
var _basicStrategy = new BasicStrategy();

var _pair = _basicStrategy.pair;
var _hard = _basicStrategy.hard;
var _soft = _basicStrategy.soft;

function player( playerName, amount ) {
    this.name = playerName,
    this.money = amount,
    this.playerHand = []
};

player.prototype.anteUp = function ( ante ) {
    this.money = this.money - ante;
    return ante;
}

player.prototype.getNumericValue = function ( value ) {
    switch ( value ) {
        case 'J':
        case 'Q':
        case 'K':
            numericValue = 10;
            break;
        case 'A':
            numericValue = 11;
            break;
        default:
            numericValue = parseInt( value );
    }
    return numericValue;
}

player.prototype.evaluate = function ( dealerUpCard ) {
    let j = this.getNumericValue( dealerUpCard.value );
    let firstCard = this.getNumericValue( this.playerHand[0].value );
    let secondCard = this.getNumericValue( this.playerHand[1].value );

    if ( firstCard === secondCard ) return _pair[firstCard][j]

    else if ( firstCard === 'A' || secondCard === 'A' ) {
        if ( firstCard === 'A') return _soft[secondCard][j]
        else return _soft[firstCard][j]
        
    } else return _hard[firstCard + secondCard][j];
}

module.exports = player;