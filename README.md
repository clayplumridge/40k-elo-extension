# 40k Elo Extension for Best Coast Pairings

This project creates a FireFox / Chrome Extension that annotates various screens in Best Coast Pairings events with the Elo of players displayed. It works on the Roster, Pairings, and Placings screens. The psychic damage you receive by knowing your opponent's Elo is not yet well understood; this extension is not recommended for the easily tilted or those easily intimidated.

![Screenshot of the Roster tab of Best Coast Pairings with the Elo of each player added to their row.](assets/images/roster.png)

![Screenshot of the Pairings tab of Best Coast Pairings with the Elo of each player added to their cell for each pairing.](assets/images/pairings.png)

![Screenshot of the Placings tab of Best Coast Pairings with the Elo of each player added to their row.](assets/images/placings.png)

## FAQ

### Where do these Elo ratings come from?

This project uses [Stat Check's Global Elo Leaderboard](https://www.stat-check.com/elo); you can find a copy of the sheet in the project at at [data/elo.xlsx](data/elo.xlsx). We can't download it programatically because Microsoft hates making APIs available, so it requires a manual update every time. You can expect updates to come out within a day or so of the actual dashboard unless I'm busy.
