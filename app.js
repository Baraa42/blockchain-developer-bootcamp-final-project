console.log("hello")
// const gamesAddress2 = "0xAafdBbc3c90228D8a2BbEC2b8A3c33DaC1b8A16a"
// const gamesAddress  = "0xd4DD3A0De1ceCcd586E54e5559A3094Eb9789b07"
// const gamesABI2 = [
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "kickOff",
// 				"type": "uint256"
// 			},
// 			{
// 				"internalType": "string",
// 				"name": "teams",
// 				"type": "string"
// 			}
// 		],
// 		"stateMutability": "nonpayable",
// 		"type": "constructor"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": false,
// 				"internalType": "enum Games.Selection",
// 				"name": "selection",
// 				"type": "uint8"
// 			}
// 		],
// 		"name": "GameWinner",
// 		"type": "event"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [],
// 		"name": "NewStatus",
// 		"type": "event"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": false,
// 				"internalType": "address",
// 				"name": "_backer",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": false,
// 				"internalType": "address",
// 				"name": "_layer",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": false,
// 				"internalType": "uint256",
// 				"name": "odds",
// 				"type": "uint256"
// 			},
// 			{
// 				"indexed": false,
// 				"internalType": "enum Games.Selection",
// 				"name": "_selection",
// 				"type": "uint8"
// 			}
// 		],
// 		"name": "betMatched",
// 		"type": "event"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": false,
// 				"internalType": "address",
// 				"name": "_player",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": false,
// 				"internalType": "uint256",
// 				"name": "_odds",
// 				"type": "uint256"
// 			},
// 			{
// 				"indexed": false,
// 				"internalType": "enum Games.Selection",
// 				"name": "_selection",
// 				"type": "uint8"
// 			},
// 			{
// 				"indexed": false,
// 				"internalType": "enum Games.BetType",
// 				"name": "_betType",
// 				"type": "uint8"
// 			}
// 		],
// 		"name": "unmatchedBetCreated",
// 		"type": "event"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "admin",
// 		"outputs": [
// 			{
// 				"internalType": "address",
// 				"name": "",
// 				"type": "address"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "enum Games.Selection",
// 				"name": "winner",
// 				"type": "uint8"
// 			}
// 		],
// 		"name": "changeGameStatus",
// 		"outputs": [
// 			{
// 				"internalType": "bool",
// 				"name": "",
// 				"type": "bool"
// 			}
// 		],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "enum Games.Selection",
// 				"name": "_selection",
// 				"type": "uint8"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "_odds",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "getBackBetsAvailable",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "enum Games.Selection",
// 				"name": "_selection",
// 				"type": "uint8"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "_odds",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "getLayBetsAvailable",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address payable",
// 				"name": "_player",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "enum Games.Selection",
// 				"name": "_selection",
// 				"type": "uint8"
// 			}
// 		],
// 		"name": "getPayout",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "payout",
// 		"outputs": [
// 			{
// 				"internalType": "bool",
// 				"name": "",
// 				"type": "bool"
// 			}
// 		],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "enum Games.BetType",
// 				"name": "_betType",
// 				"type": "uint8"
// 			},
// 			{
// 				"internalType": "enum Games.Selection",
// 				"name": "_selection",
// 				"type": "uint8"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "_odds",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "placeBet",
// 		"outputs": [],
// 		"stateMutability": "payable",
// 		"type": "function"
// 	}
// ] 
// const gamesABI = [
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "string",
// 				"name": "teams",
// 				"type": "string"
// 			}
// 		],
// 		"stateMutability": "nonpayable",
// 		"type": "constructor"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": false,
// 				"internalType": "enum Games.Selection",
// 				"name": "selection",
// 				"type": "uint8"
// 			}
// 		],
// 		"name": "GameWinner",
// 		"type": "event"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [],
// 		"name": "NewStatus",
// 		"type": "event"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": false,
// 				"internalType": "address",
// 				"name": "_backer",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": false,
// 				"internalType": "address",
// 				"name": "_layer",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": false,
// 				"internalType": "uint256",
// 				"name": "odds",
// 				"type": "uint256"
// 			},
// 			{
// 				"indexed": false,
// 				"internalType": "enum Games.Selection",
// 				"name": "_selection",
// 				"type": "uint8"
// 			}
// 		],
// 		"name": "betMatched",
// 		"type": "event"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": false,
// 				"internalType": "address",
// 				"name": "_player",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": false,
// 				"internalType": "uint256",
// 				"name": "_odds",
// 				"type": "uint256"
// 			},
// 			{
// 				"indexed": false,
// 				"internalType": "enum Games.Selection",
// 				"name": "_selection",
// 				"type": "uint8"
// 			},
// 			{
// 				"indexed": false,
// 				"internalType": "enum Games.BetType",
// 				"name": "_betType",
// 				"type": "uint8"
// 			}
// 		],
// 		"name": "unmatchedBetCreated",
// 		"type": "event"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "admin",
// 		"outputs": [
// 			{
// 				"internalType": "address payable",
// 				"name": "",
// 				"type": "address"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "betCount",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "enum Games.Selection",
// 				"name": "winner",
// 				"type": "uint8"
// 			}
// 		],
// 		"name": "changeGameStatus",
// 		"outputs": [
// 			{
// 				"internalType": "bool",
// 				"name": "",
// 				"type": "bool"
// 			}
// 		],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "enum Games.Selection",
// 				"name": "_selection",
// 				"type": "uint8"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "_odds",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "getBackBetsAvailable",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "_betId",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "getBet",
// 		"outputs": [
// 			{
// 				"components": [
// 					{
// 						"internalType": "address payable",
// 						"name": "player",
// 						"type": "address"
// 					},
// 					{
// 						"internalType": "enum Games.BetType",
// 						"name": "betType",
// 						"type": "uint8"
// 					},
// 					{
// 						"internalType": "enum Games.Selection",
// 						"name": "selection",
// 						"type": "uint8"
// 					},
// 					{
// 						"internalType": "uint256",
// 						"name": "odds",
// 						"type": "uint256"
// 					},
// 					{
// 						"internalType": "enum Games.BetStatus",
// 						"name": "status",
// 						"type": "uint8"
// 					},
// 					{
// 						"internalType": "uint256",
// 						"name": "betId",
// 						"type": "uint256"
// 					}
// 				],
// 				"internalType": "struct Games.Bet",
// 				"name": "",
// 				"type": "tuple"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "_betId",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "getBetStatus",
// 		"outputs": [
// 			{
// 				"internalType": "enum Games.BetStatus",
// 				"name": "",
// 				"type": "uint8"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "enum Games.Selection",
// 				"name": "_selection",
// 				"type": "uint8"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "_odds",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "getLayBetsAvailable",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address payable",
// 				"name": "_player",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "enum Games.Selection",
// 				"name": "_selection",
// 				"type": "uint8"
// 			}
// 		],
// 		"name": "getPayout",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "_player",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "_betNumber",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "getPlayerBet",
// 		"outputs": [
// 			{
// 				"components": [
// 					{
// 						"internalType": "address payable",
// 						"name": "player",
// 						"type": "address"
// 					},
// 					{
// 						"internalType": "enum Games.BetType",
// 						"name": "betType",
// 						"type": "uint8"
// 					},
// 					{
// 						"internalType": "enum Games.Selection",
// 						"name": "selection",
// 						"type": "uint8"
// 					},
// 					{
// 						"internalType": "uint256",
// 						"name": "odds",
// 						"type": "uint256"
// 					},
// 					{
// 						"internalType": "enum Games.BetStatus",
// 						"name": "status",
// 						"type": "uint8"
// 					},
// 					{
// 						"internalType": "uint256",
// 						"name": "betId",
// 						"type": "uint256"
// 					}
// 				],
// 				"internalType": "struct Games.Bet",
// 				"name": "",
// 				"type": "tuple"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "_player",
// 				"type": "address"
// 			}
// 		],
// 		"name": "getPlayerNumberOfBets",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "getTeams",
// 		"outputs": [
// 			{
// 				"internalType": "string",
// 				"name": "",
// 				"type": "string"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "payout",
// 		"outputs": [
// 			{
// 				"internalType": "bool",
// 				"name": "",
// 				"type": "bool"
// 			}
// 		],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "enum Games.BetType",
// 				"name": "_betType",
// 				"type": "uint8"
// 			},
// 			{
// 				"internalType": "enum Games.Selection",
// 				"name": "_selection",
// 				"type": "uint8"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "_odds",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "placeBet",
// 		"outputs": [],
// 		"stateMutability": "payable",
// 		"type": "function"
// 	}
// ]

const gamesAddress = '0x2925cB8e322700ED83A768CDb22384b10db445cb'
const gamesABI = [
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



window.addEventListener("load", function() {
    if(typeof window.ethereum !== 'undefined') {
        console.log("Metamask detected")
        let mmDetected = document.getElementById("mm-detected")
        mmDetected.innerHTML = "Metamask has been detected"


    }

    else {
        console.log("Metamask not available, install it")
        alert("install metamask")
    }
})

const mmEnable = document.getElementById("mm-connect")
mmEnable.onclick  = async () => {
    await ethereum.request({method: 'eth_requestAccounts'})
    const mmCurrentAccount = document.getElementById("mm-current-account")
    mmCurrentAccount.innerHTML = "Here is you current account: " + ethereum.selectedAddress 

}

window.addEventListener("load", async ()=> {
    let match = document.getElementById("match-id");
	var teams = await games.methods.getTeams().call();
	match.innerHTML = teams;
})

// const Odds = document.getElementById("odds-input-button");

// ssOdds.onclick = async () => {
//     const oddsValue = document.getElementById("selection-input-box");


// }
const playerBets = document.getElementById("player-bets");
const betForm = document.getElementById("bet-form");
const odds = betForm.elements["odds"];
const selection = betForm.elements["selection"];
const betType = betForm.elements["bet-type"];
const submitButton = betForm.elements["submit-button"];
console.log("odds : " + odds.value +" selection: "+ selection.value + " bet type: "+ betType.value); 

betForm.addEventListener('submit', (event) => {
    // handle the form data

    // stop form submission
    event.preventDefault();

});

var web3 = new Web3(window.ethereum)
const games = new web3.eth.Contract(gamesABI, gamesAddress)


games.setProvider(window.ethereum)

submitButton.onclick = async () => {
    const playerOdds = odds.value;
    // console.log("the odds are: "+playerOdds);
    // console.log("odds : " + odds.value +" selection: "+ selection.value + " bet type: "+ betType.value); 
    
    
    const _odds = parseInt(odds.value*100);

    let _betType = 0;
    let _stake = web3.utils.toWei('1', 'finney');
    if(betType.value == "Lay") {
        _betType =1;
        let _stakeValue = parseInt((odds.value-1)*1000).toString();
        _stake = web3.utils.toWei(_stakeValue, 'szabo');
    }
    let _selection = 0
    switch(selection.value) {
        case "Away":
            _selection = 3
          break;
        case "Draw":
            _selection = 2
          break;
        default:
            _selection = 1
      }

    
    

    console.log("odds : " + _odds +" selection: "+ _selection + " bet type: "+ _betType);   
    console.log(_stake)

    await games.methods.placeBet(_betType, _selection, _odds).send(
        {from: ethereum.selectedAddress,
         to: gamesAddress,
         value: _stake,
    })

    playerBets.innerHTML = `Your new bet:
	 Odds = ${playerOdds}
	 Selection = ${_selection}
	 Bet Type = ${_betType}
	`  
	var numberOfBets = await games.methods.getPlayerNumberOfBets(ethereum.selectedAddress).call()

    console.log(numberOfBets)

	var lastBet = await games.methods.getPlayerBet(ethereum.selectedAddress, 0).call()
	console.log(lastBet)

}

// const betStatus = document.getElementById("bet-status")

// betStatus.onclick = async () => {
//         console.log("click")

//         var _betStatus = await games.methods.getBackBetsAvailable(2, 300).call();
//         console.log(_betStatus)
//         const betStatusDiv = document.getElementById("bet-status-div")
//         betStatusDiv.innerHTML = "bet status: " + _betStatus

//     }

const playerPayout = document.getElementById("player-payout")
const displayPayout = document.getElementById("display-payout")

displayPayout.onclick = async () => {
	var homePayout = await games.methods.getPayout(ethereum.selectedAddress, 1).call() / 10**18;
	var drawPayout = await games.methods.getPayout(ethereum.selectedAddress, 2).call() / 10**18;
	var awayPayout = await games.methods.getPayout(ethereum.selectedAddress, 3).call() / 10**18;

	playerPayout.innerHTML = "Home win payout :" + homePayout + " Eth" + "<br />" +  " Draw win payout :" + drawPayout + " Eth" + "<br />" + " Away win payout :" + awayPayout + " Eth" ;

}

const payoutStatus = document.getElementById("payout-status")
const getPayout = document.getElementById("get-payout")

getPayout.onclick = async () => {

	// games.methods.payout().call().then((results) => {
	// 	console.log("success");
	// 	payoutStatus.innerHTML = "Paid" ;
	// }), (error) => {
	// 	console.log("fail");
	// 	payoutStatus.innerHTML = "Match not finished or not settled, Try later" ;

	// }
	
	//handle catching erros

	try {
		var status = await games.methods.payout().call();
		payoutStatus.innerHTML = "Paid" ;
	} catch(error) {
		console.log(error);
		payoutStatus.innerHTML = "Match not finished , Try later" ;

	}
	
    console.log(status);
	

}

// const displayPlayerBets = document.getElementById("display-player-bets");
// const displayBets = document.getElementById("display-bets");

// displayBets.onclick = async () => {
// 	var numberOfBets = await games.methods.getPlayerNumberOfBets(ethereum.selectedAddress).call();

// 	for(let i=0; i < numberOfBets; i++) {
// 		var bet = await games.methods.getPlayerBet(ethereum.selectedAddress, i+1).call();
// 		var _betType;
// 		var _selection;
// 		var _odds;
// 		var _status;

// 		if ( bet[1] == 0) {
// 			_betType = "Back";
// 		} else {
// 			_betType = "Lay";

// 		}

// 		if (bet[2]==1) {
// 			_selection = "Home";
// 		} else if (bet[2]==2) {
// 			_selection = "Draw";

// 		} else {
// 			_selection = "Away";
// 		}

// 		_odds = bet[3] / 100;

// 		if (bet[4]==0) {
// 			_status = "Unmatched";
// 		} else if (bet[4]==1) {
// 			_status = "Matched";

// 		} else if(bet[4] ==2) {
// 			_status = "Closed";
// 		} else if(bet[4] ==3) {
// 			_status = "Win";
// 		} else  {
// 			_status = "Lose";
// 		}


// 		if(_betType =="Back") {
// 			displayPlayerBets.innerHTML += "You backed  " + _selection + " with odds: " + _odds +". Your bet is: " + _status +"<br />";

// 		} else {
// 			displayPlayerBets.innerHTML += "You layed  " + _selection + " with odds: " + _odds +". Your bet is: " + _status +"<br />";

// 		}

// 	}
	
	

// }

const thePlayerBets = document.getElementById("display-the-player-bets");
const theBets = document.getElementById("get-the-player-bets");

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

	}
}

function displayThePlayerBet( Bet) {
	// var icon = (area == 1) ? icon1 : (area == 2) ? icon2 : icon0;

	let _betType = (Bet[1]==0) ? "Back" : "Lay";
	let _selection = (Bet[2]==1) ? "Home" : (Bet[2]==2) ? "Draw" : "Away";
	let _odds = Bet[3]/100;
	let _status = (Bet[4]==0) ? "Unmatched" : (Bet[4]==1) ? "Matched" : (Bet[4]==2) ? "Closed" :(Bet[4]==3) ? "Won" : "Lost" ;
	let _betId = parseInt(Bet[5]);

	let _betAction = (Bet[1]==0) ? "Backed" : "Layed";

	let _displayBet =  "Bet Id : " +_betId+ "<br/>" + "You " + _betAction + " " + _selection +" with odds : " + _odds + ", your bet is : " + _status;

	

	


	return _displayBet;
}

const playerNumberOfBets = document.getElementById("display-the-player-number-of-bets");
const numberOfBets = document.getElementById("get-the-player-number-of-bets");

numberOfBets.onclick = async () => {
	let numberOfBets = await games.methods.getPlayerNumberOfBets(ethereum.selectedAddress).call();

	playerNumberOfBets.innerHTML = "Your number of bets is :" + numberOfBets;
}