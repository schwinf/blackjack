function dealer( dealerName ) {
    this.name = dealerName,
    this.dealerHand = []
    this.upCard = function() {
        return this.dealerHand[1];
    }
};

module.exports = dealer;