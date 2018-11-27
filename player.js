var BasicStrategy = require('./BasicStrategy.js');
var _basicStrategy = new BasicStrategy();

var _pair = _basicStrategy.pair;
var _hard = _basicStrategy.hard;
var _soft = _basicStrategy.soft;

function Player(name, money){
    this.name = name,
    this.money = money,
    this.bettingBox = 0,
    this.hasInsurance = false,
    this.isDoubleDown = false,
    this.hands = [[]],
    this.hit =  function(hand,card){
        this.hands[hand].push(card);
    },
    this.stay = function(){
         
    },
    this.anteUp = function(ante){
        this.bettingBox = this.bettingBox + ante;
        this.money = this.money - ante;
    },
    
    this.split = function(hand, ante){
        this.anteUp(ante);
        this.hands.push([]);
        var secondCard = this.hands[hand].pop();
        this.hands[hand+1].push(secondCard);
    },
    this.doubleDown = function(hand, card, ante){
        this.anteUp(ante);
        this.hands[hand].push(card);
        this.isDoubleDown = true;
    },
    this.insurance = function(ante){
        //this.anteUp(ante);
        this.hasInsurance = true;
    }
    this.surrender = function( ante ){
        this.bettingBox = this.bettingBox - ante * 0.5;
        this.money = this.money + ante * 0.5;
    },
    this.evaluate = function( dealerUpCard ) {
        var initialDeal = false;
        var extraValue = 0;
        if ( this.hands[0].length === 2 ) initialDeal = true
        let j = this.getNumericValue( dealerUpCard.value );
        let firstCard = this.getNumericValue( this.hands[0][0].value );
        let secondCard = this.getNumericValue( this.hands[0][1].value );
        if ( initialDeal ) {
            if ( firstCard === secondCard ) return _pair[firstCard][j]
            else if ( firstCard === 11 || secondCard === 11 ) {
                if ( firstCard === 11 ) return _soft[secondCard][j]
                else return _soft[firstCard][j]
            
            } else return _hard[firstCard + secondCard][j];
        } else {
            for ( let i = 2; i < this.hands[0].length; i++ ) 
                extraValue += this.getNumericValue(this.hands[0][i].value)
            if ( firstCard + secondCard + extraValue === 21 ) return 'Blackjack'
            else if (firstCard + secondCard + extraValue > 21 ) return 'Bust'
            else return _hard[firstCard + secondCard + extraValue][j];
        }
    },
    this.getNumericValue = function ( value ) {
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
    /*this.evaluate = function( dealerUpCard ){
        let j = this.getNumericValue( dealerUpCard.value );
        let firstCard = this.getNumericValue( this.hands[0][0].value );
        let secondCard = this.getNumericValue( this.hands[0][1].value );
        if ( firstCard === secondCard ) return _pair[firstCard][j]
        else if ( firstCard === 'A' || secondCard === 'A' ) {
            if ( firstCard === 'A') return _soft[secondCard][j]
            else return _soft[firstCard][j]
        
        } else return _hard[firstCard + secondCard][j];
    },*/
}

module.exports = Player;