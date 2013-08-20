// Vito Cairone and Gabrielle Bellamy, Aug 20 2013

function towers() {
	var tower1 = [4,3,2,1,0];
	var tower2 = [];
	var tower3 = [];
	SIZE = tower1.length;

	var ourTowers = [tower1, tower2, tower3];

  function display() {
	  console.log("0:" + tower1);
	  console.log("1:" + tower2);
	  console.log("2:" + tower3);
	}

	//Setup i/ø
	var readline = require('readline');
	var reader = readline.createInterface({
	  input: process.stdin,
	  output: process.stdout
	});

	function playRound() {
		display();
		var qstr = "Which tower do you want to take from? (0-2)";
	 	reader.question(qstr, function (answer) {

			//Get the Tower to Move From
			var towerID = parseInt(answer);
			if (ourTowers[towerID].length === 0) {
				console.log("Can't take from an empty tower");
				playRound();
			} else {
				//Take the Ring
				var ring = ourTowers[towerID].pop();

				//Get The Tower to Move To and Make Move
				var qstr2 = "Which tower do you want to add to?";
				reader.question(qstr2, function (answer2) {
					var towerID2 = parseInt(answer2);
					if (ourTowers[towerID2].length == 0 ||
							ring < ourTowers[towerID2].slice(-1)[0]) {
						ourTowers[towerID2].push(ring);
					} else {
						ourTowers[towerID].push(ring);
						console.log("That was an invalid move.");
					}

					//Check for Win Condition or Play Another Round
					if (tower2.length === SIZE || tower3.length === SIZE) {
						console.log("You won!");
						//Close i/ø
						reader.close();
					} else {
						playRound();
					}
				}); //end 2nd question
			} //close if from tower not-empty
		}); //end question
	}
	playRound();
}

towers();