// INITIALISATION SECTION
const gamesAddress = '0x2925cB8e322700ED83A768CDb22384b10db445cb'
const abi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "_backer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "_layer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "odds",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "enum Games.Selection",
				"name": "_selection",
				"type": "uint8"
			}
		],
		"name": "BetMatched",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "enum Games.Selection",
				"name": "selection",
				"type": "uint8"
			}
		],
		"name": "GameWinner",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "NewStatus",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "teams",
						"type": "string"
					},
					{
						"internalType": "enum Games.GameStatus",
						"name": "status",
						"type": "uint8"
					},
					{
						"internalType": "enum Games.Selection",
						"name": "winner",
						"type": "uint8"
					}
				],
				"indexed": false,
				"internalType": "struct Games.Game",
				"name": "_game",
				"type": "tuple"
			}
		],
		"name": "Payout",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "player",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "PlayerDeposit",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "player",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "PlayerWithdrawal",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "ValueReceived",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "_player",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_odds",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "enum Games.Selection",
				"name": "_selection",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "enum Games.BetType",
				"name": "_betType",
				"type": "uint8"
			}
		],
		"name": "unmatchedBetCreated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "enum Games.Selection",
				"name": "winner",
				"type": "uint8"
			}
		],
		"name": "changeGameStatus",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "deposit",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "enum Games.BetType",
				"name": "_betType",
				"type": "uint8"
			},
			{
				"internalType": "enum Games.Selection",
				"name": "_selection",
				"type": "uint8"
			},
			{
				"internalType": "enum Games.Stake",
				"name": "_stake",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "_odds",
				"type": "uint256"
			}
		],
		"name": "placeBet",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdrawAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "teams",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "admin",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "allBets",
		"outputs": [
			{
				"internalType": "address",
				"name": "player",
				"type": "address"
			},
			{
				"internalType": "enum Games.BetType",
				"name": "betType",
				"type": "uint8"
			},
			{
				"internalType": "enum Games.Selection",
				"name": "selection",
				"type": "uint8"
			},
			{
				"internalType": "enum Games.Stake",
				"name": "stake",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "odds",
				"type": "uint256"
			},
			{
				"internalType": "enum Games.BetStatus",
				"name": "status",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "betId",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "enum Games.Selection",
				"name": "",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "backBetsAvailable",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "enum Games.Selection",
				"name": "",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "backBetsId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "betCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "enum Games.Selection",
				"name": "",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "firstIndexOfBackBet",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "enum Games.Selection",
				"name": "",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "firstIndexOfLayBet",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "game",
		"outputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "teams",
				"type": "string"
			},
			{
				"internalType": "enum Games.GameStatus",
				"name": "status",
				"type": "uint8"
			},
			{
				"internalType": "enum Games.Selection",
				"name": "winner",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "enum Games.Selection",
				"name": "_selection",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "_odds",
				"type": "uint256"
			},
			{
				"internalType": "enum Games.Stake",
				"name": "_stake",
				"type": "uint8"
			}
		],
		"name": "getBackBetsAvailable",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_player",
				"type": "address"
			}
		],
		"name": "getBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_betId",
				"type": "uint256"
			}
		],
		"name": "getBetStatus",
		"outputs": [
			{
				"internalType": "enum Games.BetStatus",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "enum Games.Selection",
				"name": "_selection",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "_odds",
				"type": "uint256"
			},
			{
				"internalType": "enum Games.Stake",
				"name": "_stake",
				"type": "uint8"
			}
		],
		"name": "getLayBetsAvailable",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_player",
				"type": "address"
			},
			{
				"internalType": "enum Games.Selection",
				"name": "_selection",
				"type": "uint8"
			}
		],
		"name": "getPayout",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_player",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_betNumber",
				"type": "uint256"
			}
		],
		"name": "getPlayerBet",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "player",
						"type": "address"
					},
					{
						"internalType": "enum Games.BetType",
						"name": "betType",
						"type": "uint8"
					},
					{
						"internalType": "enum Games.Selection",
						"name": "selection",
						"type": "uint8"
					},
					{
						"internalType": "enum Games.Stake",
						"name": "stake",
						"type": "uint8"
					},
					{
						"internalType": "uint256",
						"name": "odds",
						"type": "uint256"
					},
					{
						"internalType": "enum Games.BetStatus",
						"name": "status",
						"type": "uint8"
					},
					{
						"internalType": "uint256",
						"name": "betId",
						"type": "uint256"
					}
				],
				"internalType": "struct Games.Bet",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_player",
				"type": "address"
			}
		],
		"name": "getPlayerNumberOfBets",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTeams",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "enum Games.Selection",
				"name": "",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "layBetsAvailable",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "enum Games.Selection",
				"name": "",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "layBetsId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "players",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
const network = "Rinkeby"
const gamesAdmin = '0xb7b0Cc067285714Be5029df8077056b20bcFB877'

var web3 = new Web3(window.ethereum)
const games = new web3.eth.Contract(abi, gamesAddress)
games.setProvider(window.ethereum)


// CONNECTION SECTION

window.addEventListener("load", async () => {
	let mmDetected = document.getElementById("mm-detected")
    if(typeof window.ethereum !== 'undefined') {
        
		await ethereum.request({method: 'eth_requestAccounts'})
		let balance = document.getElementById('balance');
		var playerBalance = await games.methods.getBalance(ethereum.selectedAddress ).call();
		let ethBalance = playerBalance / 10**18;
		balance.innerHTML = 'Your Balance : ' + ethBalance + '  ETH';
        mmDetected.innerHTML = "Log in to play"	

    }	

    else {
        console.log("Metamask not available, install it")
		mmDetected.innerHTML = "Metamask not available, please install it"
        alert("install metamask")
    }
})


const mmEnable = document.getElementById("mm-connect")
mmEnable.onclick  = async () => {
	let mmCurrentAccount = document.getElementById("mm-current-account");
	let mmDetected = document.getElementById("mm-detected");
	if(typeof window.ethereum !== 'undefined') {
		await ethereum.request({method: 'eth_requestAccounts'})
    	mmCurrentAccount.innerHTML = "Logged in to " + '"' + ethereum.selectedAddress + '"'
		mmDetected.innerHTML = ""	

	} else {
		alert("install metamask")

	}
    
}

window.addEventListener("load", async ()=> {
   
	let h2 = document.getElementById('game-object');
	let h3 = document.getElementById('game-status');
	let teams = await games.methods.getTeams().call();
	let game = await games.methods.game().call();
	h2.innerHTML += ' ' + teams;
	let winner = game[3];
	switch(winner){
		case '0' :
            h3.innerHTML = 'The game is open place your bets !!';
          break;
        case '1':
            h3.innerHTML = 'The game is finished home team won !!';
          break;
		case '2':
            h3.innerHTML = 'The game is ended in draw !!';
          break;
        default:
            h3.innerHTML = 'The game is finished away team won !!';


	}
})

/// BALANCE
const balance = document.getElementById('balance')

async function displayBalance(address) {
	let playerBalance = await games.methods.getBalance(address).call();
	let ethBalance = playerBalance / 10**18;
	balance.innerHTML = 'Your Balance : ' + ethBalance + '  ETH';

}


/// DEPOSIT SECTION
const deposit = document.getElementById('deposit');
const depositButton = document.getElementById('deposit-button');
depositButton.onclick = async () => {
	const depositAmount = web3.utils.toWei(deposit.value, 'ether') ;


	await games.methods.deposit(depositAmount).send(
        {from: ethereum.selectedAddress,
         to: gamesAddress,
         value: depositAmount,
    })

	displayBalance(ethereum.selectedAddress);




}


/// WITHDRAW SECTION
const withdraw = document.getElementById('withdraw');
const withdrawButton = document.getElementById('withdraw-button');
withdrawButton.onclick = async () => {
	const withdrawAmount = web3.utils.toWei(withdraw.value, 'ether');
	console.log(withdrawAmount)
	
	await games.methods.withdraw(withdrawAmount).send(
        {from: ethereum.selectedAddress,
         to: gamesAddress,
         value: '0',
    });
	
	displayBalance(ethereum.selectedAddress);


}


/// WITHDRAW ALL SECTION
const withdrawAllButton = document.getElementById('withdraw-all');
withdrawAllButton.onclick = async () => {
	await games.methods.withdrawAll().send(
        {from: ethereum.selectedAddress,
         to: gamesAddress,
         value: '0',
    });
	displayBalance(ethereum.selectedAddress);
}

// PLACING BET
const playerBets = document.getElementById("player-bets");
const betForm = document.getElementById("bet-form");
const odds = betForm.elements["odds"];
const selection = betForm.elements["selection"];
const betType = betForm.elements["bet-type"];
const stake = betForm.elements['stake'];
const submitBet= betForm.elements["submit-bet"];

submitBet.onclick = async () => {

    const playerOdds = odds.value;
    const contractOdds = parseInt(odds.value*100);
    let contractBetType = 0;
	let inputStake = stake.value;
	let mul = (inputStake == 'Finney') ? 1 : (inputStake == 'TenFinney') ? 10 : (inputStake == 'HundredFinney' )? 100 : 1000; 
	let contractStake = inputStake == 'Finney' ? 0 : inputStake == 'TenFinney' ? 1 : inputStake == 'HundredFinney' ? 2 : 3; 
    let playerStake = mul * parseInt(web3.utils.toWei('1', 'finney'));
   

    if(betType.value === "Lay") {
        contractBetType = 1;
		playerStake = parseInt(playerStake * (parseFloat(odds.value)-1));
    }


    let contractSelection = 0

    switch(selection.value) {
        case "Away":
            contractSelection = 3
          break;
        case "Draw":
            contractSelection = 2
          break;
        default:
            contractSelection = 1
      }
   

	

    await games.methods.placeBet(contractBetType, contractSelection, contractStake, contractOdds).send(
        {from: ethereum.selectedAddress,
		to: gamesAddress,
		value: '0',
         
         
    })


	displayBalance(ethereum.selectedAddress);

    playerBets.innerHTML = `Your new bet:
	 Odds = ${playerOdds},
	 Selection = ${selection.value},
	 Bet Type = ${betType.value},
	 Stake = ${playerStake/10**18} ETH.
	`  
	var numberOfBets = await games.methods.getPlayerNumberOfBets(ethereum.selectedAddress).call()

    

	var lastBet = await games.methods.getPlayerBet(ethereum.selectedAddress, numberOfBets-1).call()


}


// PAYOUT DISPLAY
const playerHomePayout = document.getElementById("player-home-payout");
const playerDrawPayout = document.getElementById("player-draw-payout");
const playerAwayPayout = document.getElementById("player-away-payout");
const displayPayout = document.getElementById("display-payout");

displayPayout.onclick = async () => {
	var homePayout = await games.methods.getPayout(ethereum.selectedAddress, 1).call() / 10**18;
	var drawPayout = await games.methods.getPayout(ethereum.selectedAddress, 2).call() / 10**18;
	var awayPayout = await games.methods.getPayout(ethereum.selectedAddress, 3).call() / 10**18;
	console.log(homePayout)

	playerHomePayout.innerHTML = "Home Win Payout :" + homePayout + " ETH" + "<br />" ;
	playerDrawPayout.innerHTML = "Draw Win Payout :" + drawPayout + " ETH" + "<br />" ;
	playerAwayPayout.innerHTML = "Away Win Payout :" + awayPayout + " ETH" + "<br />" ;

}


// BETS DISPLAY
const thePlayerBets = document.getElementById("display-bets");
const theBets = document.getElementById("display-bets-button");


theBets.onclick = async () => {
	var bets = await games.methods.getPlayerNumberOfBets(ethereum.selectedAddress).call();
	console.log("number of bets :" + bets);
	if (bets===0) {
		thePlayerBets.innerHTML = "You have no bets";
	} else {
		thePlayerBets.innerHTML = "";
		for(let i=0; i<bets; i++) {
			
			var Bet = await games.methods.getPlayerBet(ethereum.selectedAddress, i).call();
			thePlayerBets.innerHTML += displayThePlayerBet(Bet) + "<br/>";
			
		}
		playerBets.innerHTML = ''

	}
}

function displayThePlayerBet( Bet) {
	// var icon = (area == 1) ? icon1 : (area == 2) ? icon2 : icon0;

	let _betType = (Bet[1]==0) ? "Back" : "Lay";
	let _selection = (Bet[2]==1) ? "Home" : (Bet[2]==2) ? "Draw" : "Away";
	let _stake = (Bet[3]==0) ? "0.001 ETH" : (Bet[3]==1) ? "0.01 ETH" : (Bet[3]==2) ? "0.1 ETH" : "1 ETH";
	let _odds = Bet[4]/100;
	let _status = (Bet[5]==0) ? "Unmatched" : (Bet[5]==1) ? "Matched" : (Bet[5]==2) ? "Closed" :(Bet[5]==3) ? "Won" : "Lost" ;
	let _betId = parseInt(Bet[6]);

	let _betAction = (Bet[1]==0) ? "Backed" : "Layed";

	let _displayBet =  "Bet Id : " + _betId + "<br/>" + "You " + _betAction + " " + _selection + " with " + _stake+ " @" + _odds + ", your bet is '" + _status + "'.";

	

	


	return _displayBet;
}

const playerNumberOfBets = document.getElementById("number-of-bets");
const numberOfBets = document.getElementById("number-of-bets-button");

numberOfBets.onclick = async () => {
	let numberOfBets = await games.methods.getPlayerNumberOfBets(ethereum.selectedAddress).call();

	playerNumberOfBets.innerHTML = "Your number of bets is :" + numberOfBets;
	
}