var Card = require('./card.js');

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
