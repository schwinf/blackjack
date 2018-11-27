function Dealer( name, money ) {
    this.name = name,
    this.hand = [],
    this.upCard = function() {
        return this.hand[1];
    }
    this.hitPlayer = function( deck, player ) {
        player.hands[0].push(deck.cards.pop());
    }
    this.evaluate = function() {
        console.log('Not Implemented');
    }
};

module.exports = Dealer;