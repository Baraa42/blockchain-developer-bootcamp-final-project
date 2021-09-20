// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Betting {
    address public admin;
    

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

    modifier isOver(GameStatus status) {
        require(status == GameStatus.Over,"game is not over");
        _;
    }

    modifier isStarted(Game memory game,uint date) {
        require(date < game.kickOff, "game already started");
        _;
    }

    function betOnGame(Game memory game, BetType betType, Selection selection, uint stake, uint odds) public isStarted(game, block.timestamp) returns(bool) {

    }

    function changeGameStatus(Game memory game, GameStatus status) public isAdmin(msg.sender) {

    }

    function payout(Game memory game, address player) public isOver(game.status) {

    }


}