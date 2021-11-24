# Avoiding Common Attacks

## Solidity compiler

The contract code in this project uses a compiler version higher than 0.8.0 that integrate SafeMath.

## Modifiers

The contract makes use of multiple modifiers :
  - Ownable modifier of OpenZeppelin Ownable contract.
  - Modifiers implemented within the contract that checks for :
    * Game status ( Open, Over ).
    * Validity of Odds.
    * User has enough funds to place the bet.
    * BetId is valid.
    
## Reentrancy

User balance is updated before executing the withdrawal transaction in withdraw and withdrawAll functions.

