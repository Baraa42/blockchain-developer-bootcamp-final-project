// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Betting {
    address public admin;
    uint gameId;

    mapping(uint => Game) public Games;
    

    enum BetType {Back, Lay}
    enum Selection {Open, Home, Draw, Away}
    enum GameStatus {Open, Over}
    enum BetStatus {Unmachted, PartiallyMatched, Matched, Closed, Win, Lose}

    struct Game {
        address owner;
        uint kickOff;
        string teams;
        GameStatus status;
        Selection winner;

    }

    struct Bet {
        address player;
        Game game;
        BetType betType;
        uint stake;
        uint odds;
        BetStatus status;
    }



    modifier isAdmin(address addr) {
        require(addr==admin, "you are not allowed");
        _;

    }

    modifier isValidBet(Selection selection) {
        require(selection != Selection.Open, "not a valid bet");
        _;
    }

    modifier isOver(GameStatus status) {
        require(status == GameStatus.Over,"game is not over");
        _;
    }

    modifier isStarted(Game memory game,uint date) {
        require(date < game.kickOff, "game already started");
        _;
    }


    function createGame(uint kickoff, string memory teams ) public isAdmin(msg.sender) returns(bool) {

    }


    function betOnGame(Game memory game, BetType betType, Selection selection, uint stake, uint odds) public isStarted(game, block.timestamp) isValidBet(selection) returns(bool) {

    }

    function changeGameStatus(Game memory game, GameStatus status) public isAdmin(msg.sender) {

    }

    function payout(Game memory game, address player) public isOver(game.status) {

    }


}