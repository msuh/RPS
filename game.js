//global variable: id of the purchase_db we are playing for right now
	CURRENT_ID = 1,
	GAME_STARTED = false;

function updateCurrentID(id){
	CURRENT_ID = id;
	console.log(CURRENT_ID);
}

function counterFunc(id, counter){
	console.log('into counterFunc');
    counter--;
    console.log(id,counter);
    $(id).text(counter);
    if (counter == 0) {
        // Display a login box
        clearInterval(interval(id,counter));
        this.display();
    }
}
/**
	Class that plays Rock Paper Scissors.
	Randomly generate numbers of 0, 1, or 2.
	-Could implement changing the probability of RPS but doesn't seem 
	necessary for the purpose of prototype

	0: Rock, 1: Paper, 2: Scissors
*/
var RPC_Game = function(id, start_count, rule, price){
	userWin = 0;
	compWin = 0;
	this.id = id;
	this.counter = start_count;
	this.compHand;
	this.rule = rule;
	userPlay = false;
	this.price = price;
	//number of RPC played so far
	this.playCount = 0;
	round = 1;
	startGame();
	//if gameover=true, shouldn't return to showing round#
	GAME_OVER = false;
	//if countdown=true, shouldn't react to clicking #p_coundown
	COUNTDOWN = false;
	console.log(price);
	/////////////  Public & private methods  ////////////
	
	//generates random hand with equal probability
	this.generate = function(){
		var random = Math.floor(Math.random()*10 + 1);
		this.compHand =  (random % 3); //randome int between [0,2]
	};

	//function for displaying text on screen
	function displayText(t1, t2){
		var counter = 3;
		var interval = setInterval(function() {
		    counter--;
		    if(counter ==2){
		  //   	$('#p_winner').text(text);
				// $('#p_winner').show("fast");
				$('#p_popUp').text(t1);
				$('#p_popUp2').text(t2);
				$('#div_popUp').show("fast");
				$('#div_mainFrameCover').show("fast");
		    }
		    if (counter == 0) {
		        clearInterval(interval);
		        if(GAME_OVER){ //if game is over, don't restart
		        	$('#p_returnToPurch').show();
		        	return;
		        }
		       	// $('#p_winner').hide("slow");
		       	$('#div_popUp').hide();
		       	$('#div_mainFrameCover').hide();

		       	restart();
		    }
		}, 1000);

	}
	//function for displaying the number of wins for each side
	function displayWins(tie){
		$('#p_userWin').text(userWin);
		$('#p_vendorWin').text(compWin);
		if(endWins()){
			var win;
			if(userWin > compWin){
				displayText("You rock!", "You've won "+price);
			} else{
				displayText("You lost!", "Best of luck next time");
			}
			window.setTimeout(delayFunc, 1500);
			GAME_OVER = true;
			return;
		}
		if(tie){
			displayText("Tie!", "");
			return;	
		}
		displayText("Again!", "");
	}
	function delayFunc(){
		$('.div_rollUp2').click();
	}
	//function for restarting the game for more rounds
	function restart(){
		// displayWins();
		$('#p_countdown').css("background-color","#384759");
		$('#p_countdown').css("color","white");
		$(id).text('START');
		$('#p_round').text("ROUND "+round);
		$('#p_round').show("slow");
		GAME_STARTED = false;	
	}
	
	function startGame(){
		$('#p_countdown').on("click", function(){
			if(GAME_STARTED){
				console.log('GAME STARTED IS TRUE');
				return;
			}
			if(COUNTDOWN){
				return;
			}
			$("#img_RPCLeft").animate({"up":"+=15px"}, "slow");
			$("#img_RPCRight").animate({"up":"+=15px"}, "slow");

			$('#p_countdown').css("background-color","inherit");
			$('#p_countdown').css("color","#384759");

			// $('#p_round').hide("fast");
			$('#p_winner').hide();
			$('#img_RPCRight').attr('src',"icons/RPS_rock.png");
			$('#img_RPCLeft').attr('src',"icons/game_lefthand.png");
			$('#p_countdown').text(3);

			GAME_STARTED = true;
			userPlay = false;
			game.countdown();
		});
	}
	
	//if either user or computer reaches the number of wins to win a game,
	//return true
	function endWins(){
		return (userWin == rule[0] || compWin == rule[0]);
	}
	this.setUserPlay = function(restart){
		console.log("UserPlay set to True");
		userPlay = true;
		//restart when user chooses a hand
		//restart();
	}
	this.getUserPlay = function(){
		return userPlay;
	}
	this.popUp = function(){
		displayText("Time out!", "");
	}
	this.increaseUser = function(){
		userWin++;
		round++;
		endWins();
	}

	this.increaseComp = function(){
		compWin++;
		round++;
		endWins();
	}
	this.idIntoImg = function(id){
		var map = {'img_rock':'icons/RPS_rock.png','img_scissors':'icons/RPS_scissors.png','img_paper':'icons/RPS_paper.png'};
		return map[id];
	}
	this.numIntoImg = function(num){
		console.log("computer num:",num);
		var map = {0:'icons/game_lefthand.png',2:'icons/game_leftsci.png',1:'icons/game_leftpaper.png'};
		return map[num];
	}
	//convert user id into number to compare results
	this.userIntoNum = function(id){
		var map = {'img_rock':0,'img_scissors':2,'img_paper':1};
		return map[id];		
	}
	
	//returns 0 = user wins, 1 = comp wins, 2 = tie
	function result(user, comp,increaseComp,increaseUser){
		console.log("entered result");
		var tie = false;
		if(user == 0 && comp == 1){ //user rock, comp paper
			increaseComp();
		}
		else if(user == 0 && comp == 2){ //user Rock , comp sciss
			increaseUser();
		}
		else if(user == 1 && comp == 2){ //user paper, comp sciss
			increaseComp();
		}
		else if(user == 1 && comp == 0){ //user paper, comp rock
			increaseUser();
		}
		else if(user == 2 && comp == 1){ //user scissors, comp paper
			increaseUser();
		}
		else if(user == 2 && comp == 0){ //user scissors, comp rock
			increaseComp();
		}
		else{ //else they all tie
			// displayText("Tie!","");
			tie = true;
		}

		displayWins(tie);

	};

	this.countdown = function(){
		//randomly pick computer's hand
		console.log("entered countdown");
		this.generate();
		animation();
	    rpsSound();


		//set COUNTDOWN to true
		COUNTDOWN = true;
		var id = this.id,
			counter = this.counter,
			timeout = this.timeout,
			// generate = this.generate,
			idIntoImg = this.idIntoImg,
			numIntoImg = this.numIntoImg,
			compHand = this.compHand,
			setUserPlay = this.setUserPlay,
			getUserPlay = this.getUserPlay,
			popUp = this.popUp,
			userIntoNum = this.userIntoNum,
			increaseUser = this.increaseUser;
			increaseComp = this.increaseComp;
		var interval = setInterval(function() {
		    counter--;
		    $(id).text(counter);
		    if (counter == 0) {
		    	$(id).text("");
		        // Display a login box
		        clearInterval(interval);
		        timeout(id, popUp, setUserPlay,getUserPlay,restart);
		        COUNTDOWN = false;
		        $("#ul_RPCChoices").click(function(evt){
		        	if(getUserPlay()){
		        		console.log("returning because userplay is true");
		        		return;
		        	}
		        	if(COUNTDOWN){
		        		return;
		        	}
		        	var img = idIntoImg($(evt['target']).attr('id'));
		        	$('#img_RPCRight').attr('src',img);
		        	img = numIntoImg(compHand);
		        	$('#img_RPCLeft').attr('src',img);
		        	var user = userIntoNum($(evt['target']).attr('id'));
		        	//compare hands and result
		        	result(user, compHand,increaseComp,increaseUser);
		        	setUserPlay(restart);

		        });
		        // //set userPlay to whatever happened from timeout
		        // userPlay = userPlay;
		    }
		}, 650);
	}

	//timeout is called within countdown's setInterval method which
	//doesn't recognize the this.attributes. 
	this.timeout = function(id, popUp, setUserPlay,getUserPlay,restart){
		var counter = 2;
		var interval = setInterval(function() {
		    counter--;
		    if (counter == 0) {
		        clearInterval(interval);
		        if(!getUserPlay()){
		        	console.log("not get userPlay");
		        	popUp();
		       		setUserPlay(restart);
		        }  
		    }

		}, 1000);		
	}



}

// <img id="img_gameItem" src="" />
// 	<div id="div_gameItemInfo">
// 		<p id="p_nameItem"></p>
// 		<p id="p_valLabel">Valu</p><p id="p_valueItem"></p>
// 		<p id="p_ruleLabel">Rule</p><p id="p_ruleItem"></p>
// 	</div>

// <div id="div_gamePlay">
// 	<img id="img_RPCTop" src="icons/white.jpeg"/>
// 	<p id="p_countdown"> START </p>
// 	<img id="img_RPCBottom" src="icons/white.jpeg"/>
// </div>

$(document).ready(function(){
	//initial display for all the fields
	var i = ITEMS[localStorage.CURRENT_ID];
	$('#img_gameItem').attr('src',i['img']);
	$('#p_playingFor').text(i['name']);
	$('#p_gameVal').text(i['price']);
	$('#p_gameWin').text(ruleListIntoStr(i['rule']));
	$('#p_vendor').text(i['vendor']);
	$('#p_gameChance').text(i['chance']);

	//initialize new RPC game
	game = new RPC_Game('#p_countdown',3,i['rule'],i['price']);
	// //starts game
	// $('#p_countdown').on("click", function(){
	// 	startGame(game);
	// 	$('#p_round').hide("slow");
	// });
	// $(document).on('click','#p_countdown', startGame(game));
	
	$('.div_rollUp2').click(function(){
		var bot = $('.div_rollUp1').css("bottom"),
				val, dur, h,
				dist = "63px";
			
			console.log("bot:",bot);
			if(bot == "0px"){
				val = "-="+dist;
				dur = 3000;
				h = dist;

			} else{
				val = "+="+dist;
				dur = 1500;
				h = "0px";
			}
			$('.div_rollUp1').animate({
				bottom: val,
				duration: dur
			});
			$('.table_nav').animate({
				height:h
			});
	});
	
});

//function that changes the game field to a countdown once the
//user presses start button
function startGame(game){
	console.log('game started');
	// if(GAME_STARTED){ //only respond when game has not started
	// 	console.log('game has already started');
	// 	return;
	// }
	//change the start sign to countdown
	$('#p_countdown').css("background-color","inherit");
	$('#p_countdown').css("color","#384759");
	$('#p_countdown').text(3);

	GAME_STARTED = true;

	game.countdown();
};

//parses the rule list into readable string to display for users
function ruleListIntoStr(list){
	return list[0]+" out of "+list[1];
}


// function animation() {
// 	console.log("into animation");
//     document.getElementById("img_RPCLeft").style.WebkitAnimation = "mynewmove 3s 3"; // Code for Chrome and Safari
//     document.getElementById("img_RPCRight").style.WebkitAnimation = "mynewmove 3s 3"; // Code for Chrome and Safari
// }

function animation(){
     var count = 3, dur = 270;
     var interval = setInterval(function() {
		    count--;
		     $('#img_RPCLeft').animate({
		     	marginLeft:"+=8px",
		     	marginTop:"+=8px"
		     },{
		     	duration: dur
		     });
		     $('#img_RPCLeft').animate({
		     	marginLeft:"-=8px",
		     	marginTop:"-=8px"
		     },{
		     	duration: dur
		     });
		     $('#img_RPCRight').animate({
		     	marginLeft:"+=8px",
		     	marginTop:"+=8px"
		     },{
		     	duration: dur
		     });
		     $('#img_RPCRight').animate({
		     	marginLeft:"-=8px",
		     	marginTop:"-=8px"
		     },{
		     	duration: dur
		     });
		    if (count <= 0) {
		        clearInterval(interval);
		    }

		}, 500);
}


function rpsSound(){
	$("body").append('<audio src="sound/RockPaperScissorsShoot_02.wav" autoplay ></audio>');
}









