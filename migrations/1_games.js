const Game = artifacts.require("Games");

module.exports = function (deployer) {
  deployer.deploy(Game, 'FC Ethereum vs Real Solana');
};
