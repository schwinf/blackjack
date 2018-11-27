//var player = require('./player.js');
//var _player = new player();

let upCard = dealer.dealerHand[1];
let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
let values = ['Ace', 'King', 'Queen', 'Jack', 'Ten', 'Nine', 'Eight', 'Seven', 'Six', 'Five', 'Four', 'Three', 'Two'];
let deck = [];
let willHit = false;


function createDeck() {
    for(let suitIdx = 0; suitIdx<suits.length; suitIdx++){
        for(let valueIdx = 0; valueIdx < values.length; valueIdx++){
            let card= {
                suit: suits[suitIdx],
                value: values[valueIdx]
            };
            deck.push(card);
        }
    }
    for(let i = 0; i < 8; i++){
        deck = createDeck();
        deck.concat(deck);
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

    this.deal = function(){
        //for(let i = 0; i < 2; i++){
        //_player['playerHand'].push(getNextCard());
        //}
        this.dealerHand.push(getNextCard());
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

    this.evaluate = function(cardArray){
        let score = 0;
        let hasAce = false;
        for(let i = 0; i < cardArray.length; i++){
            let card = cardArray[i];
            score += getCardNumericValue(card);
            if(card.value === "Ace"){
                hasAce = true;
            }
        }
    },

    this.evaluateDealer = function(cardArray){
        let score = 0;
        let hasAce = false;
        for(let i = 0; i < cardArray.length; i++){
            let card = cardArray[i];
            score += getCardNumericValue(card);
            if(card.value === "Ace"){
                hasAce = true;
            }
        }
        if(score <= 17){
            dealer['dealerHand'].push(getNextCard());
        } else if(hasAce && score === 21){
            hasNatural = true;
        }
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
        let upCard = this.dealerHand[1];
    },

    this.payOut = function(){
        _player.money += ante * 2;
    },

    this.collectAnte = function(){
        _player.money += 0;
    }
};

module.exports = dealer;