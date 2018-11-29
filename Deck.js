let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
let values = ['Ace', 'King', 'Queen', 'Jack', 'Ten', 'Nine', 'Eight', 'Seven', 'Six', 'Five', 'Four', 'Three', 'Two'];
let deck = [];

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

createDeck();
shuffleDeck(deck);
//console.log(deck);

module.exports = deck;

/*var Card = require('./Card.js');

const suits =  ['diamond','heart','club','spade'];
const values = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];

var cards = function(){
    var cards = [];
    suits.forEach(function(suit){
        values.forEach(function(value){
            var color;
            if(suit === 'spade' || suit === 'club'){
                color = 'black';
            }
            else{
                color = 'red';
            }

            cards.push(new Card(value, color, suit));
        });
    });
    return cards;
};

function Deck(){
    this.size = function(){
        return this.cards.length;
    },
    this.cards = cards()
};

module.exports = Deck;
*/