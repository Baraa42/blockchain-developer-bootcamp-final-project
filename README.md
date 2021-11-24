# P2P Betting Dapp : blockchain-developer-bootcamp-final-project

## Project url : 

https://infallible-poitras-6d0d9d.netlify.app/

## Walkthrough video url : 

https://www.youtube.com/watch?v=--tgAcL835M

## The Project

The P2P Betting Decentralized App is a project to demonstrate learnings in the Consensys Academy Blockchain Developer bootcamp.

It serves to show, creation, compilation, testing and interface interaction with the Ethereum network via wallets such as MetaMask.

Technologies used include:

- Truffle for testing, compilation and migration.
- Web3 and MetaMask integration.

## Description 

The project implements a P2P betting contract for any event with 3 outcomes ( e.g football game with Home/Win/Draw).

One of the main limitations here is that the betting contract is deployed by the admin (contract owner), initially the game status is Open and only the owner can change it (this functionality should be changed in the futur and the status of the game should be changed by an oracle like Chainlink)

The order matching algorithm is simplified here and players can only bet one of these stakes :
  - 1 Ether
  - 0.1 Ether
  - 0.01 Ether
  - 0.001 Ether

The user/player first deposit an initial amount to the contract, afterwards his balance is updated. He can also withdraw his balance or part of it at anytime.

The user/player can then place bets if he has enough balance, once the bet is placed the balance is updated and his potential payout is also updated according to the Bet amount and odds.

When a bet is placed, the contract checks if there is an already existing player who wants to bet on the other side and matches the 2 players, otherwise the bet is marked as unmatched and waits for another player to match it.
 
## Directory structure

1. src - contains source code for the UI : index.html, app.js and styles.css.
2. contracts :
	+ Games.sol the main contract used for projects
	+ Other contracts are under construction for improving the project, to be ignored for the submission
3. test  : 
	* Game.js : 20 truffle unit tests
4. node_modules :
	* Contains OpenZeppelin Ownable contract
5. docs - additional readme documents :
	 
    
    
## Prerequisite knowledge and components required
1. Truffle is installed - ( the version used is `v5.4.17`)
2. Node JS is installed - (everything was tested under `v14.18.1`) :
	- `npm i -g truffle`
3. Openzeppelin contracts and libraries :
	- `npm i @openzeppelin/contracts`
5. Git ( it is assumed you know how to use Git and have relevant HTTPS/SSH capability to clone)
6. A Browser with the MetaMask extension installed. 
7. Test Ether on the Rinkeby network.

## Download, and test steps
### Downloading
1. Open a terminal window.
2. Clone and pull down this repository into a branch via git - `git clone git@github.com:Bibix93/blockchain-developer-bootcamp-final-project.git`
3. Go to the directory you cloned into - `cd blockchain-developer-bootcamp-final-project`
### Testing
1. Check that truffle is running on `http://127.0.0.1:9545/`
2. Run truffle develop.
3. Run test.

## Workflow and Interacting with the Dapp
1. Connect to Metamask on Rinkeby and get some test ETH from the faucet :
	- Official Faucet : https://faucet.rinkeby.io/
	- Back up Faucet : https://rinkeby-faucet.com/
	
2. Go to https://infallible-poitras-6d0d9d.netlify.app/ or Run the project locally by opening index.html with the browser.
3. Deposit some ETH in the contract.
4. Place your bets.
5. Withdraw ETH the you don't need for betting.

## Public address for certification :
- `baraa.eth`



  

