pragma solidity >=0.8.0 <0.9.0;

contract TheGame {
    uint public betCount;

    enum BetType {Back, Lay}
    enum Selection {Open, Home, Draw, Away}
    enum GameStatus {Open, Over}
    enum BetStatus {Unmachted, Matched, Closed, Win, Lose}

    struct Game {
        address owner;
        uint kickOff;
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

    // holds game data
    Game game; 

    // holds all unmatched bets
    mapping(BetType => mapping(Selection => uint256[])) unmatchedBets;
    // hold all back bets by matched index
    mapping(uint => uint256[]) backBets;
    // hold all lay bets by matched index
    mapping(uint => uint256[]) layBets;
    // match index to connect lay and back bets
    uint matchIndex;

    Bet[] allBets;

    constructor(string memory _teams, uint256 _kickoff) {
        game.owner = msg.sender;
        game.kickOff = _kickoff;
        game.teams = _teams;
        game.status = GameStatus.Open;
        game.winner = Selection.Open;
        matchIndex = 0;
        
        betCount = 0;
    }

    
    







}