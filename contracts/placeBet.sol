pragma solidity >=0.8.0 <0.9.0;

contract PlaceBet {

    address  public admin;
    uint gameId;
    Game game;
    //uint backBetId;
    //uint layBetId;
    // bet counts
    uint public betCount;
    // hold all bets
    Bet[] allBets;

    mapping(address => uint[]) playerBets; // tracks the id of players bets
    mapping(Selection => mapping(uint => uint)) backBetsAvailable; // tracks amount of back bet availble : Selection => Odds => amount
    mapping(Selection => mapping(uint => uint)) layBetsAvailable;// tracks amount of lay bet availble :  Selection => Odds => amount
    mapping(Selection => mapping(uint => uint[])) backBetsId; // tracks the Bet id of the backBets : Selection => Odds => uint => Id
    mapping(Selection => mapping(uint => uint[])) layBetsId; // tracks the Lay id of the backBets : Selection => Odds => uint => Id
    mapping(Selection => mapping(uint => uint)) firstIndexOfBackBet; // track Id of first back bet available in the backBetsId[selection][odds],  Selection => Odds => Id
    mapping(Selection => mapping(uint => uint)) firstIndexOfLayBet; // track Id of first back bet available in the backBetsId[selection][odds],  Selection => Odds => Id
    mapping(address => mapping(Selection => uint)) playerPayout; // 
    mapping(address => uint) playerNumberOfBets; // tracks the amount of bets the player placed
    //mapping(uint => bool) isBetMatched; // tracks if Bet with BetId is matched or not

    enum BetType {Back, Lay}
    enum Selection {Open, Home, Draw, Away}
    enum GameStatus {Open, Over}
    enum BetStatus {Unmachted, Matched, Closed, Win, Lose}

     struct Game {
        address owner;
        string teams;
        GameStatus status;
        Selection winner;

    }

    struct Bet {
        address payable player;
        BetType betType;
        Selection selection;
        //uint stake; gonna assume only 0.001 ether bet allowed
        uint odds;
        BetStatus status;
        uint betId;
       
    }

    constructor( string memory teams)  {
        
        admin = msg.sender;
        game.owner = admin;
        game.teams = teams;
        game.status = GameStatus.Open;
        game.winner = Selection.Open;
        betCount = 0;
        


    }

    function placeBet(BetType _betType, Selection _selection, uint _odds) public payable   {
        betCount++;
        Bet memory playerBet = Bet(payable(msg.sender), _betType, _selection, _odds, BetStatus.Unmachted, betCount);
        allBets[betCount] = playerBet;
        playerBets[payable(msg.sender)].push(betCount);
        playerNumberOfBets[payable(msg.sender)]++;

         

        if(_betType == BetType.Back){
            backBetsId[_selection][_odds].push(betCount);
            // Check if possible to match the bet
            if (layBetsAvailable[_selection][_odds]>0) {

                uint layId = firstIndexOfLayBet[_selection][_odds];
                uint layBetId = layBetsId[_selection][_odds][layId]; // get Id of the lay bet
                allBets[betCount].status = BetStatus.Matched;
                allBets[layBetId].status = BetStatus.Matched;
                firstIndexOfLayBet[_selection][_odds] ++; // increment the index
                layBetsAvailable[_selection][_odds]-=1; // decrement number of laybet available
                address payable layPlayer = allBets[layBetId].player;
                //incrementPotentialPayout(payable(msg.sender), _odds,  _selection, BetType.Back);
                //incrementWithStake(payable(msg.sender), _odds, BetType.Back);
                //decrementWithStake(payable(msg.sender), _odds, _selection, BetType.Back);
                //decrementWithStake(layPlayer, _odds, _selection, BetType.Lay);
                //incrementPotentialPayout(layPlayer, _odds,  _selection, BetType.Lay);
            
            }
           

            else if (layBetsAvailable[_selection][_odds] == 0) {
                backBetsAvailable[_selection][_odds]+=1;


                //incrementWithStake(payable(msg.sender), _odds,  BetType.Back);
            }
            

                
            
        }

        else if (_betType == BetType.Lay) {

            backBetsId[_selection][_odds].push(betCount);

            // Check if possible to match the bet
            if (backBetsAvailable[_selection][_odds]>0) {

                uint backId = firstIndexOfBackBet[_selection][_odds];
                uint backBetId = backBetsId[_selection][_odds][backId]; // get Id of the back bet
                allBets[betCount].status = BetStatus.Matched;
                allBets[backBetId].status = BetStatus.Matched;
                firstIndexOfBackBet[_selection][_odds] ++; // increment the index
                backBetsAvailable[_selection][_odds]-=1; // decrement number of laybet available
                address payable backPlayer = allBets[backBetId].player;

                
                //incrementPotentialPayout(payable(msg.sender), _odds,  _selection, BetType.Lay);
                //incrementWithStake(payable(msg.sender), _odds,  BetType.Lay);
                //decrementWithStake(payable(msg.sender), _odds, _selection, BetType.Lay);
                //decrementWithStake(backPlayer, _odds, _selection, BetType.Back);
                //incrementPotentialPayout(backPlayer, _odds,  _selection, BetType.Back);
                

            
            }
           

            else if (backBetsAvailable[_selection][_odds] == 0) {
                layBetsAvailable[_selection][_odds]+=1;
            }
            
        }
        
        


    }



}