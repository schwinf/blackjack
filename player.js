var BasicStrategy = require('./BasicStrategy.js');
var _Strategy = new BasicStrategy();
//var Hs17Strategy = require('./Hs17Strategy.js');
//var _Strategy = new Hs17Strategy();

var _pair = _Strategy.pair;
var _hard = _Strategy.hard;
var _soft = _Strategy.soft;

function Player(name, money){
    this.name = name,
    this.money = money,
    this.bettingBox = 0,
    this.hasInsurance = false,
    this.isDoubleDown = false,
    this.hands = [[]],
    this.hasSplit = false;
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
        this.hands[this.hands.length - 1].push(secondCard);
        this.hasSplit = true;
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

    this.evaluate = function( dealerUpCard, hand ) {
        let j = this.getNumericValue( dealerUpCard.value, true );

        if ( this.hands[hand].length === 2 )
            if ( this.hands[hand][0].value === this.hands[hand][1].value )
                return _pair[this.getNumericValue( this.hands[hand][0].value, true )][j]

        let isSoft = false;
        for ( let i = 0; i < this.hands[hand].length; i++ )
            if ( this.hands[hand][i].value === 'Ace' ) {
                isSoft = true;
                break;
            }

        let score = this.scoreHand( isSoft, hand );
        if ( isSoft ) {
            if ( score < 21 ) return _soft[score - 11][j]
            else if (score > 21 ) score = this.scoreHand( false, hand )
        }

        if ( score < 21 ) return _hard[score][j]
        else if (score > 21 ) return 'Bust'
        else return 'Win'
    },

    this.scoreHand = function ( isSoft, hand ) {
        let score = 0;
        for ( let i = 0; i < this.hands[hand].length; i++ )
            score += this.getNumericValue( this.hands[hand][i].value, isSoft )
        return score;
    },

    this.getNumericValue = function ( value, isSoft ) {
        let numericValue = 0;
        switch ( value ) {
            case 'Two':
                numericValue = 2;
                break;
            case 'Three':
                numericValue = 3;
                break;
            case 'Four':
                numericValue = 4;
                break;
            case 'Five':
                numericValue = 5;
                break;
            case 'Six':
                numericValue = 6;
                break;
            case 'Seven':
                numericValue = 7;
                break;
            case 'Eight':
                numericValue = 8;
                break;
            case 'Nine':
                numericValue = 9;
                break;
            case 'Ten':
            case 'Jack':
            case 'Queen':
            case 'King':
                numericValue = 10;
                break;
            case 'Ace':
                if ( isSoft ) numericValue = 11
                else numericValue = 1
                break;
            default:
        }
        return numericValue;
    }
}

module.exports = Player;