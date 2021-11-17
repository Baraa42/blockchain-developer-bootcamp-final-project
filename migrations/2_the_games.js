const Games = artifacts.require("TheGames");

module.exports = function (deployer) {
  deployer.deploy(Games, 'Madrid');
};
