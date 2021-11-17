// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";


/// @title Betting contract for one game
/// @author Baraa Elalami
/// @dev Order matching algorithm is basic allowing users to bet only one of the 4 amounts : 0.001 ETH, 0.01 ETH, 0.1 ETH, 1 ETH
contract Games is Ownable {

    /// @dev Admin who decide the outcome of the game
    address  public admin;
    Game public game;
    /// @notice trcks the amount of bets
    uint public betCount;
    /// @notice array the hold all bets
    Bet[] public allBets;
    /// @notice track addresses of all players
    address[] public players;
    /// @notice track if the game is paid
    bool paid = false;


    /// @notice tracks the id of the players bets
    mapping(address => uint[]) playerBets; 
    /// @notice  tracks amount of back bets available to match : Selection => Odds => => stake amount
    mapping(Selection => mapping( uint => mapping(uint => uint))) public backBetsAvailable; 
    /// @notice  tracks amount of lay bets available to match : Selection => Odds => => stake amount
    mapping(Selection => mapping( uint => mapping(uint => uint))) public layBetsAvailable;
    /// @notice tracks the Bet id of the backBets : Selection => Odds =>  stake => uint [id] | uint backBetId = backBetsId[_selection][_odds][backId][map_stake]
    mapping(Selection => mapping( uint => mapping(uint => uint []))) public backBetsId; 
    /// @notice tracks the Bet id of the layBets : Selection => Odds =>  stake => uint [id]  | uint layBetId = backBetsId[_selection][_odds][backId][map_stake]
    mapping(Selection => mapping( uint => mapping(uint => uint []))) public layBetsId ; 
    /// @notice  track Id of first back bet available in the backBetsId[selection][odds][stake],  Selection => Odds=> stake  => Id   uint backId = firstIndexOfBackBet[_selection][_odds][map_stake];
    mapping(Selection => mapping( uint => mapping(uint => uint))) public firstIndexOfBackBet;
    /// @notice  track Id of first lay bet available in the layBetsId[selection][odds][stake],  Selection => Odds=> stake  => Id   uint layId = firstIndexOfBackBet[_selection][_odds][map_stake];
    mapping(Selection => mapping( uint => mapping(uint => uint))) public firstIndexOfLayBet;
    /// @notice tracks the payout of the player for each outcome
    mapping(address => mapping(Selection => uint)) playerPayout; 
    /// @notice tracks the amount of bets the player placed
    mapping(address => uint) playerNumberOfBets; 
    /// @notice tracks user balance
    mapping(address => uint) balances; 


    enum BetType {Back, Lay}
    enum Selection {Open, Home, Draw, Away}
    enum GameStatus {Open, Over}
    enum BetStatus {Unmatched, Matched, Closed, Win, Lose}
    enum Stake{ OneFinney, TenFinney, HundredFinney, OneEther}
   

    event NewStatus();
    event GameWinner(Selection selection);
    event unmatchedBetCreated(address _player, uint256 _odds, Selection _selection, BetType _betType);
    event BetMatched(address _backer, address _layer, uint odds, Selection _selection);
    event PlayerDeposit(address player, uint amount);
    event PlayerWithdrawal(address player, uint amount);
    event Payout(Game _game);
    event ValueReceived(address user, uint amount);


    /// @dev Game struct
    struct Game {
        address  owner;
        string teams;
        GameStatus status;
        Selection winner;

    }

     /// @dev Bet struct
    struct Bet {
        address  player;
        BetType betType;
        Selection selection;
        Stake stake;
        uint odds;
        BetStatus status;
        uint betId;

       
    }

   
    /// @dev Check if the selection of the bet is correct 
    modifier isValidBet(Selection selection) {
        require(selection != Selection.Open, "not a valid bet");
        _;
    }
    /// @dev check if the game is over
    modifier isOver() {
        require(game.status == GameStatus.Over ,"game is not over");
        _;
    }
    /// @dev check if game is still open
    modifier isOpen() {
        require(game.status == GameStatus.Open, "Game is Over");
        _;
    }
    /// @dev Check if bet is unmatched -- Delete it 
    modifier isUnmatched(Bet memory bet) {
        require(bet.status == BetStatus.Unmatched, "Cant add already matched bet ");
        _;
    }
   /// @dev check of odds are valid : we take _odds >100 then real odds is _odds /100 e.g 350 correspond to 3.5 odds
    modifier isValidOdds(uint _odds) {
        require(_odds>100, "unvalid odds");
        _;
    }
    /// @dev checks if BetId is valid
    modifier isValidId(uint _betId) {
        require(_betId>0 && _betId<=allBets.length, "unvalid Id");
        _;
    }
    /// @dev checks if bet number is valid
    modifier isValidBetNumber(uint _betNumber, address _player) {
        require(playerNumberOfBets[_player]>_betNumber, "unvalid Bet Number");
        _;
    }
    //// @dev checks if user has enough funds to place the bet 
    modifier hasEnoughFunds(BetType _betType, address _player, Stake _stake, uint _odds ) {
        uint256 mul = _stake == Stake.OneFinney ? 1 : _stake == Stake.TenFinney ? 10 : _stake == Stake.HundredFinney ? 100 : 1000;
        
        if (_betType == BetType.Back){
            
             require(balances[_player] >= mul * 10**15, 'Not enough funds' ) ;
        }
        else if (_betType == BetType.Lay) {
            
            uint amount= ( _odds -100) * 10**13;

            require(balances[_player] >= amount*mul, 'Not enough funds') ;

        }
        _;
        
    }
    /// @dev  check if game is already paid   
    modifier isNotPaid() {
        require(!paid, 'game already paid');
        _;
    }

  
    /// @param teams string describing the Game/Bet e.g Real Madrid vs Inter Milan
    constructor(string memory teams)  {
        
        admin = msg.sender;
        game.owner = admin;
        game.teams = teams;
        game.status = GameStatus.Open;
        game.winner = Selection.Open;

    }

    /// GAME SECTION FUNCTIONS
      
    /// @dev function that change game status
    /// @param winner of the game ( 1=HOME, 2=DRAW, 3=AWAY)
    function changeGameStatus( Selection winner) public onlyOwner isOpen()  {
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
        
        adminPayout();
        



    }

    /// @return string of the teams/object of the game
    function getTeams() public view returns(string memory)  {
        return game.teams;
    }
    

    /// BANKING : DEPOSIT & WITHDRAWAL & BALANCE SECTION 

    /// @notice deposit function, adds amount to user balance
    /// @param amount to deposit 
    function deposit(uint amount) public payable {
        require(msg.value==amount, "unvalid amount");
        balances[msg.sender] += msg.value;
        emit PlayerDeposit(msg.sender, msg.value);
        
    }
    
    /// @notice withdraw function, substract amount from user balance and send the amount 
    /// @param amount to withdraw 
    function withdraw(uint amount) public {
        require(balances[msg.sender] >= amount, "not enough funds");
        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
        emit PlayerWithdrawal(msg.sender, amount);
        
        
    }
    
    /// @notice withdraw all function, send remaining balance back to user
    function withdrawAll() public {
        require(balances[msg.sender] > 0, "no funds");
        uint amount = balances[msg.sender];
        balances[msg.sender] =0;
        payable(msg.sender).transfer(amount);
        emit PlayerWithdrawal(msg.sender, amount);
        
        
    }
    
    
    /// @param _player address
    /// @return user balance
    function getBalance(address _player) public view returns(uint) {
        return balances[_player];
    }


    /// BETTING SECTION : FUNCTION FOR PLACING BETS

    /// @dev callable function that places the bets
    /// @param _betType  Back or Lay (Back = 0, Lay = 1)
    /// @param _selection Bet selection (1 = HOME, 2 = DRAW, 3 = AWAY)
    /// @param _stake Amount to bet (0 = 0.001 ETH, 1 = 0.01 ETH, 2 = 0.1 ETH, 3 = 1 ETH)
    /// @param _odds must be > 100 then real odds is _odds /100 e.g 350 correspond to 3.5 odds
    function placeBet(BetType _betType, Selection _selection, Stake _stake, uint _odds )  external payable  hasEnoughFunds( _betType, msg.sender,  _stake,  _odds ) isValidBet(_selection) isOpen() isValidOdds(_odds)   {
        
        betCount++;
        
         if(playerNumberOfBets[msg.sender]==0) { 
            players.push(msg.sender);
           
        }
        
        
        addBet(msg.sender, _betType, _selection, _stake, _odds);
        
        
       
        
        uint mul = _stake == Stake.OneFinney ? 1 : _stake == Stake.TenFinney ? 10 : _stake == Stake.HundredFinney ? 100 : 1000;
        
        if(_betType == BetType.Back){
            
            balances[msg.sender] -= mul*10**15;
            placeBackBet(msg.sender, _selection, _stake, _odds);
            
        } else if (_betType == BetType.Lay) {
            uint amount = mul*(_odds-100)*10**13;
            balances[msg.sender] -= amount;
            placeLayBet(msg.sender, _selection, _stake, _odds);
        }
        
        


    }

    /// @dev internal function used to place back bets by placeBet
    /// @param player  Address placing the bet
    /// @param _selection Bet selection (1 = HOME, 2 = DRAW, 3 = AWAY)
    /// @param _stake Amount to bet (0 = 0.001 ETH, 1 = 0.01 ETH, 2 = 0.1 ETH, 3 = 1 ETH)
    /// @param _odds must be > 100 then real odds is _odds /100 e.g 350 correspond to 3.5 odds
    function placeBackBet( address  player, Selection _selection, Stake _stake, uint _odds) internal {
        uint map_stake = _stake == Stake.OneFinney ? 0 : _stake == Stake.TenFinney ? 1 : _stake == Stake.HundredFinney ? 2 : 3;
       
        backBetsId[_selection][_odds][map_stake].push(betCount);
       
            // Check if possible to match the bet
        if (layBetsAvailable[_selection][_odds][map_stake]>0) {

            uint layId = firstIndexOfLayBet[_selection][_odds][map_stake];
            uint layBetId = layBetsId[_selection][_odds][map_stake][layId]; // get Id of the lay bet
            allBets[betCount-1].status = BetStatus.Matched;
            allBets[layBetId-1].status = BetStatus.Matched;
            firstIndexOfLayBet[_selection][_odds][map_stake] ++; // increment the index
            layBetsAvailable[_selection][_odds][map_stake]-=1; // decrement number of laybet available
            address  layPlayer = allBets[layBetId-1].player;
            incrementPotentialPayout(player, _odds,  _selection, BetType.Back, _stake);
            incrementWithStake(player, _odds, BetType.Back, _stake);
            decrementWithStake(player, _odds, _selection, BetType.Back, _stake);
            decrementWithStake(layPlayer, _odds, _selection, BetType.Lay, _stake);
            incrementPotentialPayout(layPlayer, _odds,  _selection, BetType.Lay, _stake);
            emit BetMatched(player, layPlayer,  _odds,  _selection);
        
        }
           

            else if (layBetsAvailable[_selection][_odds][map_stake] == 0) {
                backBetsAvailable[_selection][_odds][map_stake]+=1;
                // do something for first index
                incrementWithStake(player, _odds,  BetType.Back, _stake);
                emit unmatchedBetCreated(player,  _odds,  _selection,  BetType.Back);
            }
        
    }

    /// @dev internal function used to place lay bets by placeBet
    /// @param player  Address placing the bet
    /// @param _selection Bet selection (1 = HOME, 2 = DRAW, 3 = AWAY)
    /// @param _stake Amount to bet (0 = 0.001 ETH, 1 = 0.01 ETH, 2 = 0.1 ETH, 3 = 1 ETH)
    /// @param _odds must be > 100 then real odds is _odds /100 e.g 350 correspond to 3.5 odds
    function placeLayBet( address  player, Selection _selection, Stake _stake, uint _odds) internal {
        uint map_stake = _stake == Stake.OneFinney ? 0 : _stake == Stake.TenFinney ? 1 : _stake == Stake.HundredFinney ? 2 : 3;
        backBetsId[_selection][_odds][map_stake].push(betCount);


        // Check if possible to match the bet
        if (backBetsAvailable[_selection][_odds][map_stake]>0) {

            uint backId = firstIndexOfBackBet[_selection][_odds][map_stake];
            uint backBetId = backBetsId[_selection][_odds][map_stake][backId]; // get Id of the back bet
            allBets[betCount-1].status = BetStatus.Matched;
            allBets[backBetId-1].status = BetStatus.Matched;
            firstIndexOfBackBet[_selection][_odds][map_stake] ++; // increment the index
            backBetsAvailable[_selection][_odds][map_stake]-=1; // decrement number of laybet available
            address  backPlayer = allBets[backBetId-1].player;

            
            incrementPotentialPayout(player, _odds,  _selection, BetType.Lay, _stake);
            incrementWithStake(player, _odds,  BetType.Lay, _stake);
            decrementWithStake(player, _odds, _selection, BetType.Lay, _stake);
            decrementWithStake(backPlayer, _odds, _selection, BetType.Back, _stake);
            incrementPotentialPayout(backPlayer, _odds,  _selection, BetType.Back, _stake);
            emit BetMatched(backPlayer, player,  _odds,  _selection);
            

        
        }
       

        else if (backBetsAvailable[_selection][_odds][map_stake] == 0) {
            layBetsAvailable[_selection][_odds][map_stake]+=1;
            incrementWithStake(player, _odds,  BetType.Lay, _stake);
            emit unmatchedBetCreated(player,  _odds,  _selection,  BetType.Lay);
        }
        
        
    }

    /// @dev internal function used add the bet to allBets[] array and update different variables
    /// @param player  Address placing the bet
    /// @param _betType  Back or Lay (Back = 0, Lay = 1)
    /// @param _selection Bet selection (1 = HOME, 2 = DRAW, 3 = AWAY)
    /// @param _stake Amount to bet (0 = 0.001 ETH, 1 = 0.01 ETH, 2 = 0.1 ETH, 3 = 1 ETH)
    /// @param _odds must be > 100 then real odds is _odds /100 e.g 350 correspond to 3.5 odds
    function addBet(address  player,BetType _betType, Selection _selection, Stake _stake, uint _odds ) internal {
        Bet memory playerBet = Bet(player, _betType, _selection, _stake, _odds, BetStatus.Unmatched, betCount);
        allBets.push(playerBet);
        playerBets[msg.sender].push(betCount);
        playerNumberOfBets[msg.sender]++;
        
    }  

    /// @param _selection Bet selection (1 = HOME, 2 = DRAW, 3 = AWAY)
    /// @param _stake Amount to bet (0 = 0.001 ETH, 1 = 0.01 ETH, 2 = 0.1 ETH, 3 = 1 ETH)
    /// @param _odds must be > 100 then real odds is _odds /100 e.g 350 correspond to 3.5 odds
    /// @return number of back bets available for particular parameters
    function getBackBetsAvailable(Selection _selection, uint _odds, Stake _stake) public view returns(uint) {
        uint map_stake = _stake == Stake.OneFinney ? 0 : _stake == Stake.TenFinney ? 1 : _stake == Stake.HundredFinney ? 2 : 4;
        uint backbets = backBetsAvailable[_selection][_odds][map_stake];
        return backbets;
    }

    /// @param _selection Bet selection (1 = HOME, 2 = DRAW, 3 = AWAY)
    /// @param _stake Amount to bet (0 = 0.001 ETH, 1 = 0.01 ETH, 2 = 0.1 ETH, 3 = 1 ETH)
    /// @param _odds must be > 100 then real odds is _odds /100 e.g 350 correspond to 3.5 odds
    /// @return number of lay bets available for particular parameters
    function getLayBetsAvailable(Selection _selection, uint _odds, Stake _stake) public view returns(uint) {
        uint map_stake = _stake == Stake.OneFinney ? 0 : _stake == Stake.TenFinney ? 1 : _stake == Stake.HundredFinney ? 2 : 4;
        uint laybets = layBetsAvailable[_selection][_odds][map_stake];
        return laybets;
    }

    /// @param _player  Address placing the bet
    /// @return number of bets placed by _player
    function getPlayerNumberOfBets(address _player) public view returns(uint) {
        return playerNumberOfBets[_player];
    }

    /// @param _betNumber the bet number _betNumber placed by the player
    /// @param _player  Address placing the bet
    /// @return The bet placed by the player
    function getPlayerBet(address _player, uint _betNumber) public view isValidBetNumber(_betNumber, _player) returns(Bet memory) {
        uint _betId = playerBets[_player][_betNumber] -1;
        return allBets[_betId];
        
    }


    /// @param _betId Id of the requested bet
    /// @return The bet with the corresponding Id
     function getBetStatus(uint _betId)  public view isValidId(_betId) returns(BetStatus)  {
        return allBets[_betId-1].status;
    }




    /// PAYOUT SECTION : FUNCTION FOR HANDLING PLAYER POTENTIAL PAYOUT

    /// @dev internal function increments the playerPayout of the player with potential winning ( not counting the stake) for the selection, used when the bet can bet matched
    /// @param _player  Address placing the bet
    /// @param _betType  Back or Lay (Back = 0, Lay = 1)
    /// @param _selection Bet selection (1 = HOME, 2 = DRAW, 3 = AWAY)
    /// @param _stake Amount to bet (0 = 0.001 ETH, 1 = 0.01 ETH, 2 = 0.1 ETH, 3 = 1 ETH)
    /// @param _odds must be > 100 then real odds is _odds /100 e.g 350 correspond to 3.5 odds
    function incrementPotentialPayout(address  _player, uint _odds, Selection _selection, BetType _betType, Stake _stake) internal {
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

    /// @dev internal function increments the playerPayout of the player with his stake, used when the bet can't be matched
    /// @param _betType  Back or Lay (Back = 0, Lay = 1)
    /// @param _stake Amount to bet (0 = 0.001 ETH, 1 = 0.01 ETH, 2 = 0.1 ETH, 3 = 1 ETH)
    /// @param _odds must be > 100 then real odds is _odds /100 e.g 350 correspond to 3.5 odds
    function incrementWithStake(address  _player, uint _odds,  BetType _betType, Stake _stake) internal {
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

    
    /// @dev internal function decrements player payout with his initial stake, used when the bet can be matched
    /// @param _player  Address placing the bet
    /// @param _betType  Back or Lay (Back = 0, Lay = 1)
    /// @param _selection Bet selection (1 = HOME, 2 = DRAW, 3 = AWAY)
    /// @param _stake Amount to bet (0 = 0.001 ETH, 1 = 0.01 ETH, 2 = 0.1 ETH, 3 = 1 ETH)
    /// @param _odds must be > 100 then real odds is _odds /100 e.g 350 correspond to 3.5 odds
    function decrementWithStake(address  _player, uint _odds, Selection _selection, BetType _betType, Stake _stake) internal {
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

    /// @dev internal function that updates players balances when the game is finished, called when admin changes the game status
    function adminPayout() internal {
        
       
        for(uint i=0; i< players.length; i++) {
            balances[players[i]] += playerPayout[players[i]][game.winner];
            
        }
          
        emit Payout(game);

    }
    
    /// @dev returns current player current payout for the selection
    /// @param _player  Address placing the bet
    /// @param _selection Bet selection (1 = HOME, 2 = DRAW, 3 = AWAY)
    function getPayout(address  _player, Selection _selection) public view returns(uint) {
        uint _payout = playerPayout[_player][_selection];
        return _payout;
    }  

    
    /// FALLBACK FUNCTIONS
    receive() external payable {
        
        emit ValueReceived(msg.sender, msg.value);
        
    }
    
    fallback() external payable {
        
        emit ValueReceived(msg.sender, msg.value);
        
    }

  


}  