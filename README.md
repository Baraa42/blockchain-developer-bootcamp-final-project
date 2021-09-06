# blockchain-developer-bootcamp-final-project
P2P Betting Dapp
The idea of the project would be to create a sports betting Dapp between players (similar to how Betfair exchange works).

Say we have a football event : France vs Portugal and we want to create a market for betting on the outcome of the game 1 = France win, X = Draw, 2 = Portugal win.

Any player can come and make offers. For example player A want to bet 100$ on France to win at odds 2. The offer will then be displayed on the Dapp and players can freely accept to match player A bet. For example a player B wants to bet 50$ on France NOT to win, he can match out 50$ out of 100$ offer made by player A. In case of no other bets made the results would be as follow : 
- If France win player A win 50$ and his total balance is now 150$, player B balance is 0$
- If France does not win, Player A balance become 50$, and Player's B 100$.


