var player = require('./player.js');
var _player = new player();

//let upCard = dealer.dealerHand[1];
let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
let values = ['Ace', 'King', 'Queen', 'Jack', 'Ten', 'Nine', 'Eight', 'Seven', 'Six', 'Five', 'Four', 'Three', 'Two'];
let deck = [];
let willHit = false;

function createDeck() {
    for(let c = 0; c < 8; c++){
        for(let suitIdx = 0; suitIdx<suits.length; suitIdx++){
            for(let valueIdx = 0; valueIdx < values.length; valueIdx++){
                let card= {
                    suit: suits[suitIdx],
                    value: values[valueIdx]
                };
                deck.push(card);
            }
        }
    }
    return deck;
}

function shuffleDeck(deck) {
    for(let i = 0; i < deck.length; i++) {
        let swapIdx = Math.trunc(Math.random() * deck.length);
        let tmp = deck[swapIdx];
        deck[swapIdx] = deck[i];
        deck[i] = tmp;
    }
}

function dealer(name){
    this.name = name,
    this.hasNatural = false,
    this.dealerHand =[],

    this.deal = function( player, hand ){
        if (player) player.hands[hand].push(this.getNextCard());
        else this.dealerHand.push(this.getNextCard());
    },

    this.getNextCard = function() {
        return deck.shift();
    },

    this.getCardNumericValue = function(card){
        switch(card.value){
            case 'Ace':
                return 1;
            case 'Two':
                return 2;
            case 'Three':
                return 3;
            case 'Four':
                return 4;
            case 'Five':
                return 5;
            case 'Six':
                return 6;
            case 'Seven':
                return 7;
            case 'Eight':
                return 8;
            case 'Nine':
                return 9;
            default:
                return 10;
        }
    },

    this.scoreHand = function( hand ){
        let score = 0;
        let isSoft = false;
        for( let i = 0; i < hand.length; i++ ){
            if ( hand[i].value === 'Ace' ) isSoft = true
            score += this.getCardNumericValue(hand[i]);
        }
        if ( isSoft ) {
            score += 10;
            if ( score > 21 ) score -=10;
            else if ( score === 21 && hand.length === 2 ) score = 'Blackjack'
        }
        return score;
    },
    this.evaluateDealer = function( ) {
        let score = 0;
        let isSoft = false;

        for ( let i = 0; i < this.dealerHand.length; i++ ) {
            if ( this.dealerHand[i].value === 'Ace' ) isSoft = true
            score += this.getCardNumericValue(this.dealerHand[i]);
        }
        if ( isSoft ) {
            score += 10;
            if ( score === 21 ) {}
            else if ( score > 17 ) score -=10;
        }
        return score;
    },

    this.evaluateRound = function(playerScore, dealerScore){
        if(evaluate(_player['playerHand']) > evaluate(dealer['dealerHand'] && evaluate(_player['[playerHand'].score)) <= 21){
            payOut();
        }
        else {
            collectAnte();
        }
    },

    this.getUpCard = function(){
        return this.dealerHand[1];
    },

    this.payOut = function(){
        _player.money += ante * 2;
    },

    this.collectAnte = function(){
        _player.money += 0;
    }
};

createDeck();
shuffleDeck(deck);

module.exports = dealer;
