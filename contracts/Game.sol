// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Games {

    address payable public admin;
    Game public game;
    //uint backBetId;
    //uint layBetId;
    uint public betCount;
    // hold all bets
    Bet[] public allBets;

    mapping(address => uint[]) playerBets; // tracks the id of players bets
    mapping(Selection => mapping( uint => mapping(uint => uint))) backBetsAvailable; // tracks amount of back bet availble : Selection => Odds => => stake amount
    mapping(Selection => mapping( uint => mapping(uint => uint))) layBetsAvailable;// tracks amount of lay bet availble :  Selection => Odds => amount
    mapping(Selection => mapping( uint => mapping(uint => uint []))) backBetsId; // tracks the Bet id of the backBets : Selection => Odds =>  stake => uint [id]
    mapping(Selection => mapping( uint => mapping(uint => uint []))) layBetsId ; // tracks the Lay id of the backBets : Selection => Odds => stake => uint [id]
    mapping(Selection => mapping( uint => mapping(uint => uint))) firstIndexOfBackBet; // track Id of first back bet available in the backBetsId[selection][odds][stake],  Selection => Odds=> stake  => Id
    mapping(Selection => mapping( uint => mapping(uint => uint))) firstIndexOfLayBet; // track Id of first back bet available in the backBetsId[selection][odds][stake],  Selection => Odds => stake => Id
    mapping(address => mapping(Selection => uint)) playerPayout; // 
    mapping(address => uint) playerNumberOfBets; // tracks the amount of bets the player placed

    enum BetType {Back, Lay}
    enum Selection {Open, Home, Draw, Away}
    enum GameStatus {Open, Over}
    enum BetStatus {Unmatched, Matched, Closed, Win, Lose}
    enum Stake{ OneFinney, TenFinney, HundredFinney, OneEther}
   
    event NewStatus();
    event GameWinner(Selection selection);
    event unmatchedBetCreated(address _player, uint256 _odds, Selection _selection, BetType _betType);
    event betMatched(address _backer, address _layer, uint odds, Selection _selection);

    struct Game {
        address payable owner;
        string teams;
        GameStatus status;
        Selection winner;

    }

    struct Bet {
        address payable player;
        BetType betType;
        Selection selection;
        Stake stake;
        uint odds;
        BetStatus status;
        uint betId;

       
    }

     // Check if caller is the admin
    modifier isAdmin(address addr) {
        require(addr==admin, "you are not allowed");
        _;

    }
    // Check if the selection of the bet is correct 
    modifier isValidBet(Selection selection) {
        require(selection != Selection.Open, "not a valid bet");
        _;
    }
    // check if the game is over
    modifier isOver() {
        require(game.status == GameStatus.Over ,"game is not over");
        _;
    }
 
    // check if game is still open
    modifier isOpen() {
        require(game.status == GameStatus.Open, "Game is Over");
        _;
    }

    modifier isUnmatched(Bet memory bet) {
        require(bet.status == BetStatus.Unmatched, "Cant add already matched bet ");
        _;
    }

    modifier isValidStake(BetType betType, uint _odds, uint _stake, Stake stake) {
       
        uint256 mul = stake == Stake.OneFinney ? 1 : stake == Stake.TenFinney ? 10 : stake == Stake.HundredFinney ? 100 : 1000;
        if (betType == BetType.Back){
             require(_stake == mul * 0.001 ether, 'Choose a correct stake' ) ;
        }
        else if (betType == BetType.Lay) {
            
            uint amount= ( _odds -100) * 0.001 ether  / 100;

            require(_stake == amount*mul, 'Choose a correct stake') ;

        }
        _;
    }

   // we take _odds >100 then real odds is _odds /100 e.g 350 correspond to 3.5 odds
    modifier isValidOdds(uint _odds) {
        require(_odds>100, "unvalid odds");
        _;
    }
    
      // we take _odds >100 then real odds is _odds /100 e.g 350 correspond to 3.5 odds
    modifier isValidId(uint _betId) {
        require(_betId>0, "unvalid Id");
        _;
    }
    
    modifier isValidBetNumber(uint _betNumber, address _player) {
        require(playerNumberOfBets[_player]>_betNumber, "unvalid Bet Number");
        _;
    }


    constructor(string memory teams)  {
        
        admin = payable(msg.sender);
        game.owner = admin;
        game.teams = teams;
        game.status = GameStatus.Open;
        game.winner = Selection.Open;

    }
      
// admin change game status
   function changeGameStatus( Selection winner) public isAdmin(msg.sender) isOpen() returns(bool) {
        game.status = GameStatus.Over;
        game.winner = winner;
        uint totalBets = allBets.length;
        
        for(uint i=0; i<totalBets; i++) {
            if(allBets[i].status == BetStatus.Unmatched){
                allBets[i].status = BetStatus.Closed;
            } else if (allBets[i].status == BetStatus.Matched) {
                if ((allBets[i].selection == winner && allBets[i].betType== BetType.Back) || (allBets[i].selection!= winner && allBets[i].betType== BetType.Lay)){
                    allBets[i].status = BetStatus.Win;
                } else {
                     allBets[i].status = BetStatus.Lose;
                }
            }
        
        }
        
        emit GameWinner( winner);
        
        return true;



    }

// function for placing the bet
    function placeBet(BetType _betType, Selection _selection, Stake _stake, uint _odds ) public payable isValidStake(_betType, _odds, msg.value, _stake) isValidBet(_selection) isOpen() isValidOdds(_odds)   {
        betCount++;
        Bet memory playerBet = Bet(payable(msg.sender), _betType, _selection, _stake, _odds, BetStatus.Unmatched, betCount);
        allBets.push(playerBet);
        playerBets[payable(msg.sender)].push(betCount);
        playerNumberOfBets[payable(msg.sender)]++;
        uint map_stake = _stake == Stake.OneFinney ? 0 : _stake == Stake.TenFinney ? 1 : _stake == Stake.HundredFinney ? 2 : 4;
         

        if(_betType == BetType.Back){
            backBetsId[_selection][_odds][map_stake].push(betCount);
            // Check if possible to match the bet
            if (layBetsAvailable[_selection][_odds][map_stake]>0) {

                uint layId = firstIndexOfLayBet[_selection][_odds][map_stake];
                uint layBetId = layBetsId[_selection][_odds][layId][map_stake]; // get Id of the lay bet
                allBets[betCount-1].status = BetStatus.Matched;
                allBets[layBetId-1].status = BetStatus.Matched;
                firstIndexOfLayBet[_selection][_odds][map_stake] ++; // increment the index
                layBetsAvailable[_selection][_odds][map_stake]-=1; // decrement number of laybet available
                address payable layPlayer = allBets[layBetId-1].player;
                incrementPotentialPayout(payable(msg.sender), _odds,  _selection, BetType.Back, _stake);
                incrementWithStake(payable(msg.sender), _odds, BetType.Back, _stake);
                decrementWithStake(payable(msg.sender), _odds, _selection, BetType.Back, _stake);
                decrementWithStake(layPlayer, _odds, _selection, BetType.Lay, _stake);
                incrementPotentialPayout(layPlayer, _odds,  _selection, BetType.Lay, _stake);
                emit betMatched(msg.sender, layPlayer,  _odds,  _selection);
            
            }
           

            else if (layBetsAvailable[_selection][_odds][map_stake] == 0) {
                backBetsAvailable[_selection][_odds][map_stake]+=1;
                // do something for first index


                incrementWithStake(payable(msg.sender), _odds,  BetType.Back, _stake);
                emit unmatchedBetCreated(msg.sender,  _odds,  _selection,  _betType);
            }
            

                
            
        }

        else if (_betType == BetType.Lay) {

            backBetsId[_selection][_odds][map_stake].push(betCount);

            // Check if possible to match the bet
            if (backBetsAvailable[_selection][_odds][map_stake]>0) {

                uint backId = firstIndexOfBackBet[_selection][_odds][map_stake];
                uint backBetId = backBetsId[_selection][_odds][backId][map_stake]; // get Id of the back bet
                allBets[betCount-1].status = BetStatus.Matched;
                allBets[backBetId-1].status = BetStatus.Matched;
                firstIndexOfBackBet[_selection][_odds][map_stake] ++; // increment the index
                backBetsAvailable[_selection][_odds][map_stake]-=1; // decrement number of laybet available
                address payable backPlayer = allBets[backBetId-1].player;

                
                incrementPotentialPayout(payable(msg.sender), _odds,  _selection, BetType.Lay, _stake);
                incrementWithStake(payable(msg.sender), _odds,  BetType.Lay, _stake);
                decrementWithStake(payable(msg.sender), _odds, _selection, BetType.Lay, _stake);
                decrementWithStake(backPlayer, _odds, _selection, BetType.Back, _stake);
                incrementPotentialPayout(backPlayer, _odds,  _selection, BetType.Back, _stake);
                emit betMatched(backPlayer, msg.sender,  _odds,  _selection);
                

            
            }
           

            else if (backBetsAvailable[_selection][_odds][map_stake] == 0) {
                layBetsAvailable[_selection][_odds][map_stake]+=1;
                incrementWithStake(payable(msg.sender), _odds,  BetType.Lay, _stake);
                emit unmatchedBetCreated(msg.sender,  _odds,  _selection,  _betType);
            }
            
        }
        
        


    }
    
    



// increments the playerPayout of the player with potential winning 
    function incrementPotentialPayout(address payable _player, uint _odds, Selection _selection, BetType _betType, Stake _stake) internal {
        uint256 mul = _stake == Stake.OneFinney ? 1 : _stake == Stake.TenFinney ? 10 : _stake == Stake.HundredFinney ? 100 : 1000;

        if (_betType == BetType.Back) {
            playerPayout[_player][_selection] += mul*(_odds - 100)* 0.001 ether/100;
        }

        else if (_betType == BetType.Lay) {
            if(_selection == Selection.Home) {
                playerPayout[_player][Selection.Draw] += mul*0.001 ether;
                playerPayout[_player][Selection.Away] += mul*0.001 ether;
            }
            else if(_selection == Selection.Draw) {
                playerPayout[_player][Selection.Home] += mul*0.001 ether;
                playerPayout[_player][Selection.Away] += mul*0.001 ether;
            }
            else if(_selection == Selection.Away) {
                playerPayout[_player][Selection.Home] += mul*0.001 ether;
                playerPayout[_player][Selection.Draw] += mul*0.001 ether;
            }
        }
    }

// increment playerPayout with his stake
    function incrementWithStake(address payable _player, uint _odds,  BetType _betType, Stake _stake) internal {
        uint256 mul = _stake == Stake.OneFinney ? 1 : _stake == Stake.TenFinney ? 10 : _stake == Stake.HundredFinney ? 100 : 1000;
        if (_betType == BetType.Back) {
            playerPayout[_player][Selection.Draw] += mul*0.001 ether;
            playerPayout[_player][Selection.Away] += mul*0.001 ether;
            playerPayout[_player][Selection.Home] += mul*0.001 ether;
        }

        else if (_betType == BetType.Lay) {
            playerPayout[_player][Selection.Away] += mul*(_odds -100) * 0.001 ether / 100;
            playerPayout[_player][Selection.Home] += mul*(_odds -100) * 0.001 ether / 100;
            playerPayout[_player][Selection.Draw] += mul*(_odds -100) * 0.001 ether / 100;

        }
    }
// decrements playerPayout to take into account the bet is matched
    function decrementWithStake(address payable _player, uint _odds, Selection _selection, BetType _betType, Stake _stake) internal {
        uint256 mul = _stake == Stake.OneFinney ? 1 : _stake == Stake.TenFinney ? 10 : _stake == Stake.HundredFinney ? 100 : 1000;

        if (_betType == BetType.Back) {
            if(_selection == Selection.Home) {
                playerPayout[_player][Selection.Draw] -= mul*0.001 ether;
                playerPayout[_player][Selection.Away] -= mul*0.001 ether;
            }
            else if(_selection == Selection.Draw) {
                playerPayout[_player][Selection.Home] -= mul*0.001 ether;
                playerPayout[_player][Selection.Away] -= mul*0.001 ether;
            }
            else if(_selection == Selection.Away) {
                playerPayout[_player][Selection.Home] -= mul*0.001 ether;
                playerPayout[_player][Selection.Draw] -= mul*0.001 ether;
            }
        }
            
        

        else if (_betType == BetType.Lay) {
            playerPayout[_player][_selection] -= mul*(_odds -100) * 0.001 ether / 100;
            

        }


    }



//   returns current player current payout
    function getPayout(address payable _player, Selection _selection) public view returns(uint) {
        uint _payout = playerPayout[_player][_selection];
        return _payout;
    }  

    function getBackBetsAvailable(Selection _selection, uint _odds, Stake _stake) public view returns(uint) {
        uint map_stake = _stake == Stake.OneFinney ? 0 : _stake == Stake.TenFinney ? 1 : _stake == Stake.HundredFinney ? 2 : 4;
        uint backbets = backBetsAvailable[_selection][_odds][map_stake];
        return backbets;
    }

    function getLayBetsAvailable(Selection _selection, uint _odds, Stake _stake) public view returns(uint) {
        uint map_stake = _stake == Stake.OneFinney ? 0 : _stake == Stake.TenFinney ? 1 : _stake == Stake.HundredFinney ? 2 : 4;
        uint laybets = layBetsAvailable[_selection][_odds][map_stake];
        return laybets;
    }

    function getPlayerNumberOfBets(address _player) public view returns(uint) {
        return playerNumberOfBets[_player];
    }

    //function getPlayerBet(address _player, uint _betId) public view returns(Bet memory) {
       // return 0;
  // }
    function getBet(uint _betId) 
        public
        view 
        isValidId(_betId) returns( 
            address payable ,
            BetType ,
            Selection ,
            Stake,
            uint,
            BetStatus,
            uint
        ) 
    {
        require(_betId <= betCount, "Not such Bet with this Bet Id");
        return (allBets[_betId-1].player, allBets[_betId-1].betType, allBets[_betId-1].selection, allBets[_betId-1].stake, allBets[_betId-1].odds, allBets[_betId-1].status, allBets[_betId-1].betId);      
    }
    
    function getPlayerBet(address _player, uint _betNumber) public view isValidBetNumber(_betNumber, _player) returns(Bet memory) {
        uint _betId = playerBets[_player][_betNumber] -1;
        return allBets[_betId];
        
    }
    
    function getTeams() public view returns(string memory)  {
        return game.teams;
    }
    
    function getBetStatus(uint _betId)  public view isValidId(_betId) returns(BetStatus)  {
        return allBets[_betId-1].status;
    }



    // player call payout to get paid
    function payout() public isOver() returns(bool) {
        address payable _player = payable(msg.sender);
        uint _payoutAmount;
        if (game.winner == Selection.Home){
            _payoutAmount = playerPayout[_player][Selection.Home];
            playerPayout[_player][Selection.Home] = 0;
            _player.transfer(_payoutAmount);
            return true;


        }

        else if (game.winner == Selection.Draw){
            _payoutAmount = playerPayout[_player][Selection.Draw];
            playerPayout[_player][Selection.Draw] = 0;
            _player.transfer(_payoutAmount);
            return true;


        }

        else if (game.winner == Selection.Away){
            _payoutAmount = playerPayout[_player][Selection.Away];
            playerPayout[_player][Selection.Away] = 0;
            _player.transfer(_payoutAmount);
            return true;


        }
        return false;

    }


  


}