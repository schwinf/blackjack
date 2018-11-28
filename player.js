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
        var score = 0;
        if ( this.hands[0].length === 2 ) initialDeal = true
        let j = this.getNumericValue( dealerUpCard.value, false );
        let firstCard = this.getNumericValue( this.hands[0][0].value, false );
        let secondCard = this.getNumericValue( this.hands[0][1].value, false );
        if ( initialDeal ) {
            if ( firstCard === secondCard ) return _pair[firstCard][j]
            else if ( firstCard === 11 || secondCard === 11 ) {
                if ( firstCard === 11 ) return _soft[secondCard][j]
                else return _soft[firstCard][j]
            
            } else return _hard[firstCard + secondCard][j];
        } else {
            for ( let i = 0; i < this.hands[0].length; i++ ) 
                score += this.getNumericValue( this.hands[0][i].value, false )
            if ( score === 21 ) return 'Blackjack'
            else if ( score > 21 ) {
                score  = 0;
                for ( let i = 0; i < this.hands[0].length; i++ ) 
                    score += this.getNumericValue( this.hands[0][i].value, true )
            }
            if ( score === 21 ) return 'Blackjack'
            else if (score > 21 ) return 'Bust'
            else return _hard[score][j];
        }
    },
    this.getNumericValue = function ( value, isSoft ) {
        switch ( value ) {
            case 'J':
            case 'Q':
            case 'K':
                numericValue = 10;
                break;
            case 'A':
                if ( isSoft ) numericValue = 1
                else numericValue = 11
                break;
            default:
                numericValue = parseInt( value );
        }
        return numericValue;
    }
}

module.exports = Player;