//  Hit on Soft 17 Rule Strategy
//  Adapted from https://en.wikipedia.org/wiki/Blackjack#Basic_strategy
//  S = stand, H = hit, L = split, N = Natural, W = surrender (if not allowed, then hit)
//  Dh = double (if not allowed, then hit), Ds = double (if not allowed, then stand)

var BasicStrategy = require('./BasicStrategy.js');

function Hs17Strategy() {

    var Hs17Strategy = new BasicStrategy();
    this.hard = Hs17Strategy.hard;
    this.pair = Hs17Strategy.pair;
    this.soft = Hs17Strategy.soft;

    this.hard[15][11] = 'W';
    this.hard[17][11] = 'W';
    this.pair[8][11] = 'W';
}

module.exports = Hs17Strategy;