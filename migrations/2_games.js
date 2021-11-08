const Games = artifacts.require("Games");

module.exports = function (deployer) {
  deployer.deploy(Games, 'Madrid');
};
