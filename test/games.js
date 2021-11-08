const Games = artifacts.require("Games");

contract('Games', (accounts) => {
  it('should make account[0] the admin', async () => {
    const gamesInstance = await Games.deployed();
    const admin = await gamesInstance.admin.call();

    assert.equal(admin, accounts[0], "Not the admin");
  });

  it('should check game status is open', async () => {
    const gamesInstance = await Games.deployed();
    const game = await gamesInstance.game.call();

    assert.equal(game[2], 0, "Game not Open");
  });

  
  it('should check that there are no bets yet', async () => {
    const gamesInstance = await Games.deployed();
    const betCount = await gamesInstance.betCount.call();

    assert.equal(betCount, 0, "Bet count is not 0");
  });


  it('should check game winner is open', async () => {
    const gamesInstance = await Games.deployed();
    const winner = await gamesInstance.game.call();

    assert.equal(winner[3], 0, "Wrong winner");
  });

//   it('should not let change game status', async () => {
//     const gamesInstance = await Games.deployed();
//     await gamesInstance.changeGameStatus(1, {from : accounts[1]});
//     const winner = await gamesInstance.game.call();

//     assert.equal(winner[3], 0, "Only admin can change game status");
//   });

    it('should place a bet ', async () => {
        const gamesInstance = await Games.deployed();
        await gamesInstance.placeBet(0, 1, 300, {from : accounts[0], value: 1e+15 });
        const betCount = await gamesInstance.betCount.call();

        assert.equal(betCount, 1, "Bet unplaced");
  });

    it('match bet ', async () => {
        const gamesInstance = await Games.deployed();
        await gamesInstance.placeBet(1, 1, 300, {from : accounts[1], value: 2*1e+15 });
        const betCount = await gamesInstance.betCount.call();
        const status1 = await gamesInstance.getBetStatus(1);
        const status2 = await gamesInstance.getBetStatus(2);

        assert.equal(status1, 1, "Bet unmatched");
        assert.equal(status2, 1, "Bet unmatched");
        assert.equal(betCount, 2, "Bet unplaced");
});

    it('should change game status', async () => {
        const gamesInstance = await Games.deployed();
        await gamesInstance.changeGameStatus(1, {from : accounts[0]});
        const winner = await gamesInstance.game.call();

        assert.equal(winner[3], 1, "Game status not changed");
  });


  

  //   it('should not let change game status', async () => {
//     const gamesInstance = await Games.deployed();
//     await gamesInstance.changeGameStatus(1, {from : accounts[1]});
//     const winner = await gamesInstance.game.call();

//     assert.equal(winner[3], 0, "Only admin can change game status");
//   });





//   it('should call a function that depends on a linked library', async () => {
//     const metaCoinInstance = await MetaCoin.deployed();
//     const metaCoinBalance = (await metaCoinInstance.getBalance.call(accounts[0])).toNumber();
//     const metaCoinEthBalance = (await metaCoinInstance.getBalanceInEth.call(accounts[0])).toNumber();

//     assert.equal(metaCoinEthBalance, 2 * metaCoinBalance, 'Library function returned unexpected function, linkage may be broken');
//   });
//   it('should send coin correctly', async () => {
//     const metaCoinInstance = await MetaCoin.deployed();

//     // Setup 2 accounts.
//     const accountOne = accounts[0];
//     const accountTwo = accounts[1];

//     // Get initial balances of first and second account.
//     const accountOneStartingBalance = (await metaCoinInstance.getBalance.call(accountOne)).toNumber();
//     const accountTwoStartingBalance = (await metaCoinInstance.getBalance.call(accountTwo)).toNumber();

//     // Make transaction from first account to second.
//     const amount = 10;
//     await metaCoinInstance.sendCoin(accountTwo, amount, { from: accountOne });

//     // Get balances of first and second account after the transactions.
//     const accountOneEndingBalance = (await metaCoinInstance.getBalance.call(accountOne)).toNumber();
//     const accountTwoEndingBalance = (await metaCoinInstance.getBalance.call(accountTwo)).toNumber();


//     assert.equal(accountOneEndingBalance, accountOneStartingBalance - amount, "Amount wasn't correctly taken from the sender");
//     assert.equal(accountTwoEndingBalance, accountTwoStartingBalance + amount, "Amount wasn't correctly sent to the receiver");
//   });
});
