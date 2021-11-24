const Games = artifacts.require("Games");

/// There is 20 tests here that follow to betting logic,
/// and they build on each other meaning that for n > m : Test(n) takes into account the state changes made by Test(m)
/// Tests check in order for  : 
/// Test 1-4 contract deployment variables
/// Test 5-7 Deposit and withdrawal functions
/// Test 8-17 Bet placement functions
/// Test 18 Payout updates caused by placing bets
/// Test 19 Only owner can change the game status
/// Test 20 Owner change game status
/// Test 20 Balance update after game is settled

contract('Games', (accounts) => {

  describe('Check Initial Variables', () => {

    it('should make account[0] the admin', async () => {
      const gameInstance = await Games.deployed();
      const admin = await gameInstance.admin.call();

      assert.equal(admin, accounts[0], "Not the admin");
    });

    it('should check game status is open', async () => {
      const gameInstance = await Games.deployed();
      const game = await gameInstance.game.call();

      assert.equal(game[2], 0, "Game not Open");
    });

    
    it('should check that there are no bets yet', async () => {
      const gameInstance = await Games.deployed();
      const betCount = await gameInstance.betCount.call();

      assert.equal(betCount, 0, "Bet count is not 0");
    });


    it('should check game winner is open', async () => {
      const gamesInstance = await Games.deployed();
      const winner = await gamesInstance.game.call();

      assert.equal(winner[3], 0, "Wrong winner");
    });
  })

  describe('Check Deposit/Withdrawal Functions', () => {
    it('should deposit 1 ETH and update balance ', async () => {
      const gameInstance = await Games.deployed();
      await gameInstance.deposit(web3.utils.toWei('1', "ether"), {from : accounts[0], value: web3.utils.toWei('1', "ether") });
      const balance = await gameInstance.getBalance(accounts[0]);
      assert.equal(balance, web3.utils.toWei('1', "ether"), "Deposit failed");
    });

    it('should deposit withdraw 0.5 ETH and update balance ', async () => {
      const gameInstance = await Games.deployed();
      await gameInstance.withdraw(web3.utils.toWei('500', "finney"));
      const balance = await gameInstance.getBalance(accounts[0]);
      assert.equal(balance, web3.utils.toWei('500', "finney"), "Withdrawal failed");
    });

    it('should  withdraw rest of balance and update it ', async () => {
      const gameInstance = await Games.deployed();
      await gameInstance.withdrawAll();
      const balance = await gameInstance.getBalance(accounts[0]);
      assert.equal(balance, 0, "Withdrawal failed");
    });
  })


  describe('Betting workflow', () => {
    it('should deposit 2 ETH and place 1 back ETH bet and update balance ', async () => {
        const gameInstance = await Games.deployed();
        await gameInstance.deposit(web3.utils.toWei('2', "ether"), {from : accounts[0], value: web3.utils.toWei('2', "ether") });
        await gameInstance.placeBet(0, 1, 3, 300, {from : accounts[0], value: web3.utils.toWei('1', "ether") });
        const betCount = await gameInstance.betCount.call();
        const balance = await gameInstance.getBalance(accounts[0]);
        assert.equal(betCount, 1, "Bet unplaced");
        assert.equal(balance, web3.utils.toWei('1', "ether"), "Wrong bet amount placed");

    });

    it('should place 0.1 ETH back bet and update balance ', async () => {
      const gameInstance = await Games.deployed();
      await gameInstance.placeBet(0, 1, 2, 200, {from : accounts[0], value: web3.utils.toWei('100', "finney") });
      const betCount = await gameInstance.betCount.call();
      const balance = await gameInstance.getBalance(accounts[0]);
      assert.equal(betCount, 2, "Bet unplaced");
      assert.equal(balance, web3.utils.toWei('900', "finney"), "Wrong bet amount placed");

    });

    it('should place 0.01 ETH back bet and update balance ', async () => {
      const gameInstance = await Games.deployed();
      await gameInstance.placeBet(0, 1, 1, 250, {from : accounts[0], value: web3.utils.toWei('10', "finney") });
      const betCount = await gameInstance.betCount.call();
      const balance = await gameInstance.getBalance(accounts[0]);
      assert.equal(betCount, 3, "Bet unplaced");
      assert.equal(balance, web3.utils.toWei('890', "finney"), "Wrong bet amount placed");

    });

    it('should place 0.001 ETH back bet and update balance ', async () => {
      const gameInstance = await Games.deployed();
      await gameInstance.placeBet(0, 1, 0, 400, {from : accounts[0], value: web3.utils.toWei('1', "finney") });
      const betCount = await gameInstance.betCount.call();
      const balance = await gameInstance.getBalance(accounts[0]);
      assert.equal(betCount, 4, "Bet unplaced");
      assert.equal(balance, web3.utils.toWei('889', "finney"), "Wrong bet amount placed");

    });

    it('should check that player account[0] placed 4 bets ', async () => {
      const gameInstance = await Games.deployed();
      const numOfBets = await gameInstance.getPlayerNumberOfBets(accounts[0]);
      assert.equal(numOfBets, 4, "Wrong num of Bets");

    });

    it('should check that player account[0] payout are correct ', async () => {
      const gameInstance = await Games.deployed();

      const homePayout = await gameInstance.getPayout(accounts[0],1);
      const drawPayout = await gameInstance.getPayout(accounts[0],2);
      const awayPayout = await gameInstance.getPayout(accounts[0],3);

      assert.equal(homePayout, web3.utils.toWei('1111', "finney"), "Wrong payout");
      assert.equal(drawPayout, web3.utils.toWei('1111', "finney"), "Wrong payout");
      assert.equal(awayPayout, web3.utils.toWei('1111', "finney"), "Wrong payout");

    });

    it('should deposit 3 ETH and place 2 ETH lay bet, match it and update balance ', async () => {
      const gameInstance = await Games.deployed();
      await gameInstance.deposit(web3.utils.toWei('3', "ether"), {from : accounts[1], value: web3.utils.toWei('3', "ether") });
      await gameInstance.placeBet(1, 1, 3, 300, {from : accounts[1], value: web3.utils.toWei('2', "ether") });
      const betCount = await gameInstance.betCount.call();
      const balance = await gameInstance.getBalance(accounts[1]);
      const firstPlayerBetStatus = await gameInstance.getBetStatus(1);
      const secondPlayerBetStatus = await gameInstance.getBetStatus(5);
      assert.equal(betCount, 5, "Bet unplaced");
      assert.equal(balance, web3.utils.toWei('1', "ether"), "Wrong bet amount placed");
      assert.equal(firstPlayerBetStatus, 1, "Bet unmatched");
      assert.equal(secondPlayerBetStatus, 1, "Bet unmatched");

    });

    it('should place 0.1 ETH lay bet, match it and update balance ', async () => {
      const gameInstance = await Games.deployed();
      await gameInstance.placeBet(1, 1, 2, 200, {from : accounts[1], value: web3.utils.toWei('100', "finney") });
      const betCount = await gameInstance.betCount.call();
      const balance = await gameInstance.getBalance(accounts[1]);
      const firstPlayerBetStatus = await gameInstance.getBetStatus(2);
      const secondPlayerBetStatus = await gameInstance.getBetStatus(6);
      assert.equal(betCount, 6, "Bet unplaced");
      assert.equal(balance, web3.utils.toWei('900', "finney"), "Wrong bet amount placed");
      assert.equal(firstPlayerBetStatus, 1, "Bet unmatched");
      assert.equal(secondPlayerBetStatus, 1, "Bet unmatched");

    });

    it('should place 0.01 ETH lay bet, match it and update balance ', async () => {
      const gameInstance = await Games.deployed();
      await gameInstance.placeBet(1, 1, 1, 250, {from : accounts[1], value: web3.utils.toWei('15', "finney") });
      const betCount = await gameInstance.betCount.call();
      const balance = await gameInstance.getBalance(accounts[1]);
      const firstPlayerBetStatus = await gameInstance.getBetStatus(3);
      const secondPlayerBetStatus = await gameInstance.getBetStatus(7);
      assert.equal(betCount, 7, "Bet unplaced");
      assert.equal(balance, web3.utils.toWei('885', "finney"), "Wrong bet amount placed");
      assert.equal(firstPlayerBetStatus, 1, "Bet unmatched");
      assert.equal(secondPlayerBetStatus, 1, "Bet unmatched");

    });

    it('should place 0.001 ETH lay bet, match it and update balance ', async () => {
      const gameInstance = await Games.deployed();
      await gameInstance.placeBet(1, 1, 0, 400, {from : accounts[1], value: web3.utils.toWei('3', "finney") });
      const betCount = await gameInstance.betCount.call();
      const balance = await gameInstance.getBalance(accounts[1]);
      const firstPlayerBetStatus = await gameInstance.getBetStatus(4);
      const secondPlayerBetStatus = await gameInstance.getBetStatus(8);
      assert.equal(betCount, 8, "Bet unplaced");
      assert.equal(balance, web3.utils.toWei('882', "finney"), "Wrong bet amount placed");
      assert.equal(firstPlayerBetStatus, 1, "Bet unmatched");
      assert.equal(secondPlayerBetStatus, 1, "Bet unmatched");

    });
  })

  describe('Payout updates', () => {
    it('should check that player account[0] and player account[1] have correct payouts ', async () => {
      const gameInstance = await Games.deployed();

      const homePayoutOne = await gameInstance.getPayout(accounts[0],1);
      const drawPayoutOne = await gameInstance.getPayout(accounts[0],2);
      const awayPayoutOne = await gameInstance.getPayout(accounts[0],3);
      const homePayoutTwo = await gameInstance.getPayout(accounts[1],1);
      const drawPayoutTwo = await gameInstance.getPayout(accounts[1],2);
      const awayPayoutTwo = await gameInstance.getPayout(accounts[1],3);

      assert.equal(homePayoutOne, web3.utils.toWei('3229', "finney"), "Wrong payout");
      assert.equal(drawPayoutOne, 0, "Wrong payout");
      assert.equal(awayPayoutOne, 0, "Wrong payout");
      assert.equal(homePayoutTwo, 0, "Wrong payout");
      assert.equal(drawPayoutTwo, web3.utils.toWei('3229', "finney"), "Wrong payout");
      assert.equal(awayPayoutTwo, web3.utils.toWei('3229', "finney"), "Wrong payout");

    });
  })

  describe('Settle game', () => {
    it('should not let non admin to change the game status', async () => {
      const gameInstance = await Games.deployed();
      try { 
        await gameInstance.changeGameStatus(1, {from: accounts[1]});
      } catch(e) {
        return e;
      }
      const game = await gameInstance.game.call();

      assert.equal(game[2], 0, "Game status shouldn't change");
    });

    it('should change the game status and update balances of accounts[0] and account[1]', async () => {
      const gameInstance = await Games.deployed();
      await gameInstance.changeGameStatus(1);
      const game = await gameInstance.game.call();
      const balanceZero = await gameInstance.getBalance(accounts[0]);
      const balanceOne = await gameInstance.getBalance(accounts[1]);

      assert.equal(game[2], 1, "Game status should change");
      assert.equal(balanceZero, web3.utils.toWei('4118', "finney"), "Wrong balance");
      assert.equal(balanceOne, web3.utils.toWei('882', "finney"), "Wrong balance");
    });
  })

});
