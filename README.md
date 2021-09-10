# blockchain-developer-bootcamp-final-project
## P2P Betting Dapp

The idea of the project would be to create a sports exchange betting Dapp between players (similar to how Betfair exchange works).

### Why Decentralized betting market ?

Currently there is 2 types of betting websites :

- Classic bookmakers, the bookmakers make the odds and take relatively high commissions ( between 5-15% or more depending on the betting market ). Classical bookmakers are known for limiting winners, and chasing them out while keeping players who lose money.

- Exchanges ( Betdaq, Betfair ..), they also charge high commission (2-6% depending on players residence country).

Services are permissioned and restricted in a lot of countries. 


### How it works ?

Say we have a football event : France vs Portugal and we want to create a market for betting on the outcome of the game 1 = France win, X = Draw, 2 = Portugal win.

Any player can come and make offers. For example player A want to bet 100$ on France to win at odds 2. The offer will then be displayed on the Dapp and players can freely accept to match player A bet. For example a player B wants to bet 50$ on France NOT to win, he can match out 50$ out of 100$ offer made by player A. In case of no other bets made the results would be as follow : 
- If France win player A win 50$ and his total balance is now 150$, player B balance is 0$
- If France does not win, Player A balance become 50$, and Player's B 100$.

### Projet task :
 - Create simple markets for one mainstream competition. For example, allowing users to bet on the simple result ( Win/Draw/Lose ) for Premier league games. 
 - Allow Users to make bids and asks for the game and choose odds they wish to bet on, hence no need for the protocol to set the odds and only settle the bet result.
- When the game ends, bets will be paid off by the smart contract who should receive the game result from some oracle.
- Charge low commission that goes to some treasury DAO?


### Advanced/Long term vision : 
- Make more markets available.
- Fetch odds from bookmakers and make odds suggestions for players.
- Lunch the exchange for live betting
- Lunch a decentralized betting platform (maybe inspired from Synthetix model) where users bet against the protocol : 
                <br/> -  The protocol fetches odds from different bookmakers and then make its odds for the game.
                <br/> - Players can bet against the protocol odds ( obviously will have to take some low commission on bets)
               <br/> -  Players can also stake their BET token and earn a share of protocol revenue.



