# Design Pattern Decisions

## Access Control Design Patterns

The Ownable design pattern has been implemented to allow only the contract owner to change the game status.

## Inheritance and Interfaces

The contract inherits from OpenZeppelin Ownable contract:

- **Ownable:** Sets the contract deployer as the owner however this functionality should be dropped in the futur and replaced by setting Chainlink as on oracle.

## Optimizing gas 

The placing bet function avoid using loops, to match players the function doesn't loop on allBets[] array to check if it is possible to match the bet instead the contract use the following mappings :

- 2 mappings : backBetsAvailable and layBetsAvailable to track the amount of back/lay bets available, if it's 0 it means the back/lay bet cant be matched
- 4 mappings : backBetsId, layBetsId, firstIndexOfBackBet, firstIndexOfLayBet to track the betId to be matched which avoids using for loops.

