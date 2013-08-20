// Vito Cairone and Gabrielle Bellamy, Aug 20 2013

function clock() {
	var now = new Date;
	var hours = now.getHours();
	var minutes = now.getMinutes();
	var seconds = now.getSeconds();

	function update() {
		if (seconds >= 60) {
			seconds -= 60;
			minutes += 1;
		}
		if (minutes >= 60) {
			minutes -= 60;
			hours += 1;
		}
		if (hours >= 24) {
			hours -= 24;
		}
		console.log("The time is: " + hours + ":" + minutes + ":" + seconds);
		seconds += 5;
	}

	setInterval(update, 5000);
}
//clock();

//*********************************************************

function crazyBubbleSort(arr, callback) {
	var i = 0;
	var swapped = false;
	var readline = require('readline');
	var reader = readline.createInterface({
	  input: process.stdin,
	  output: process.stdout
	});

	function performStep(callback) {
		if(arr.length === i + 1) {
			if(swapped) {
				i = 0;
				swapped = false;
				performStep(callback);
			}
			else {
				reader.close();
				callback();
			}
		}
		else {
			var el1 = arr[i];
			var el2 = arr[i + 1];
			function asker(callback) {
				var qstr = "What is " + el1 + " compared to " + el2 + "?  ";
				reader.question(qstr, function(answer) {
					callback(answer);
				});
			}
			console.log(arr);
			asker(function(answer) {
				if(answer === ">") {
					var swap = el1;
					arr[i] = el2;
					arr[i+1] = swap;
					swapped = true;
				}
				i += 1;
				performStep(callback);
			});
		}
	}
	performStep(callback);
}

// crazyBubbleSort([4,2,3, 1, 7], function() { console.log("It is sorted!")});

//*********************************************************

Cat = {
	name: "caaaaat",
	species: "feline"
}

function declare(str) {
	console.log(str + this.name);
}

function meow() {
	console.log(this.species + " says meow");
}

console.log("Normal");
declare.bind(Cat)("Imma ");

console.log("Apply");
declare.apply(Cat, ["Imma "]);

Function.prototype.myBind = function(context, args) {
 	this.apply(context, args);
}

console.log("MyBind");
declare.myBind(Cat, ["Foo "]);
meow.myBind(Cat);