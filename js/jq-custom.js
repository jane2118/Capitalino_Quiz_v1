	/*variables start*/
	
	var x = 0;
			var localStorageUsername = window.localStorage.getItem("username");//for checking if already login
			var localQuizArrayName = "quizGeneric";
	
	/* variables end*/

	/*start*/
	var myRsgTimer = "";
	
	var myTimer= "";  
	
	var m=10;
	
	var rsg =3;
	function start(){
		m = 10;
		
		$("#gameTimer").val(m);
		clearTimeout(myTimer);
		clearInterval(myTimer);
		
		setTimeout(function(){
		myTimer = setInterval(function(){myTimer1()},1000);
		});
	}
	
	function myTimer1(){
		setTimeout(function(){
			$("#gameTimer").val(m);
		});
		m--;
		
		
		
		if(m==0){
		clearTimeout(myTimer);
		clearTimeout(myTimer);
		gameOver();
		}
	}
	
	
	function startRsg(){
		$("#rsgTimer").html("Name the Capital");
		
		
		clearTimeout(myRsgTimer);
		clearInterval(myRsgTimer);
		setTimeout(function(){
		myRsgTimer = setInterval(function(){myRsgTimer1()},700);
		});
	}
	
	function myRsgTimer1(){
		setTimeout(function(){		
		});
		rsg--;
		
		if(rsg==0){

		clearTimeout(myRsgTimer);
		clearTimeout(myRsgTimer);

		$("#rsgTimerModal").hide();
		gameStart();
		}
	}
	/*function end */
	

	$("#stopTime").click(function(){
		start();
	});
	
	
	$("#btn-play").click(function(){
		savePreviousScore();
		location.href = "main.html";
	});
	
	$("#btn-gameover-test").click(function(){
		
	});
	
	$(".btn-main-menu").click(function(){
		location.href = "index.html";
	});
	
	$(".btn-about").click(function(){
		location.href = "about.html";
	});
	
	$("#btn-leaderboard").click(function(){

		setTimeout(function(){
			 $modal.load('leaderboard.html', '', function(){
			 $modal.modal();
			});
		  },10); 
		
	});
	
	$(".btn-login").click(function(){
		localStorageUsername = window.localStorage.getItem("username");
		if(localStorageUsername == "" || localStorageUsername == "null" || localStorageUsername == "undefined" ||localStorageUsername == null ){

			  setTimeout(function(){
				 $modal.load('login.html', '', function(){
				 $modal.modal();
				});
			  },10); 
		}else{
			logout();
		}
		
	});
	
	$("#btn-register").click(function(){
		
		 setTimeout(function(){
				 $modal.load('registration.html', '', function(){
				  $modal.modal();
				});
			  },10); 
	});
	$("#btn-post-score-online").click(function(){
		postScoreOnline();
	});
	
	$("#btn-play-again").click(function(){
		savePreviousScore();
		location.href = "main.html";
	});
	

	
	$(".btn-choice").click(function(){
		
			var answer = $(this).val();
			var correctAnswer = $("#correct").val();
			if(answer == correctAnswer){
				addScore();
				getQuestion();
			}else{
				gameOver();
				gameStart();
			}
		
	
		
	});

	
	
	/*functions start*/
	//index
	function splashScreenIntro(){
		var a = sessionStorage.getItem("splash_start");
		if(a == null || a == "" || a == "null" || a == "undefined"){
			setTimeout(function(){
				$(".splashImg").fadeToggle();
					setTimeout(function(){
						$("#splashScreen").fadeToggle();
						sessionStorage.setItem("splash_start",1);
					});
				
			},3000);
		}else{
			$("#splashScreen").css({"height":"0"});
			$(".splashImg").css({"height":"0"});
			$(".splashImgLogo").css({"height":"0"});
						
		
		}
		
	}

	function checkIfLogin(){
		if(localStorageUsername == "" || localStorageUsername == null){
			$("#btn-login").val("Login");
			$("#btn-register").show();
		}else{
			$("#txt-username").text("Welcome \n"+localStorageUsername);
			$("#btn-login").val("Log Out");
			$("#btn-register").hide();
		}
		
	}
	function logout(){
		if(localStorageUsername == "" || localStorageUsername == null){
			
		}else{

			window.localStorage.setItem("user_id","");
			window.localStorage.setItem("username","");
			
			$("#txt-username").text("");
			$("#btn-login").val("Login");
		}
	}
	

	function getLeaderboard(){
		
		var rank = 0;
		$.ajax({
			url: "quiz_online_files/display_leaderboard.php",
			type: "GET",
			dataType: "json",
			success: function(data){
				$(".leaderboardRow").remove();
				for(var i=0;i<data.length;i++){
					rank++
					
					$('#leaderboardTable').append(
					'<tr class="leaderboardRow"><td>'+ rank + '</td><td>'+data[i].user_username+ '</td><td>'+data[i].score_score+'</td> </tr>'
					
					);
				}
			},
			error: function(){
			}
			
		});
	}
	
	function postScoreOnline(){		
		
		var a = window.localStorage.getItem("user_id");
		var b = window.localStorage.getItem("username");
		var c = window.localStorage.getItem("local-storage-game-over-score");
		
		if(a == null || a == ""){
			$("#game_over_page_msg").html("You need to <a class='btn-login' href='#stack2' data-toggle='modal'>login</a>");
		}else if(a == "no internet connection"){
			$("#game_over_page_msg").html("No internet connection");
		}else {
			//check if have internet
			$.ajax({
				url: "quiz_online_files/post_score_online.php",
				type: "POST",
				data: {"user_id":a,"user_username":b,"score":c},
				success: function(data){
					if(data=="not"){

						$("#game_over_page_msg").html("Failed");
					}else if(data=="success"){
						$("#game_over_page_msg").html("Your Score was posted online");
						
						
					}
					else{
						$("#game_over_page_msg").html("Your Score was posted online");
					}
				}
				
			});
		}
	}
	
	//for index.html onload
	function storeQuizArrayToLocalStorage(){
		var db = window.localStorage.getItem(localQuizArrayName);
		if(db == null || db == ""){
			window.localStorage.setItem(localQuizArrayName,JSON.stringify(quizArray));
			alert(localQuizArrayName + " \n store to db");
		}
		else{
		}
		
		
	}
	
	

	function getQuestionsIndexes(){
		setTimeout(function(){
		
		//test START
		var questionsIndexes = [];	
		
		var quizArray = JSON.parse(window.localStorage.getItem(localQuizArrayName));
			
				for(i=0;i < quizArray.length;i++){
					questionsIndexes.push(i);
				}
				
				
			var	randomizeIndexes = [];
			var	i = questionsIndexes.length;
			var	j = 0;

			while (i--) {
				j = Math.floor(Math.random() * (i+1));
				randomizeIndexes.push(questionsIndexes[j]);
				questionsIndexes.splice(j,1);
			}
			
			questionsArray = randomizeIndexes; 
			$("#testArray").val(questionsArray);
			getQuestion();
		
		},50);
	};
	

	function getQuestion(){
	
		if(questionsArray == ""){
			gameOver();
		}else{
			var quizArray = JSON.parse(window.localStorage.getItem(localQuizArrayName));
			start();

					var get = questionsArray[0];
					var question = quizArray[get].question;
					var choice1 = quizArray[get].choice1;
					var choice2 = quizArray[get].choice2;
					var choice3 = quizArray[get].choice3;
					var correct = quizArray[get].correct;
					
					$("#question").html(question);
					$("#choice1").val(choice1);
					$("#choice2").val(choice2);
					$("#choice3").val(choice3);
					$("#correct").val(correct);
					
					
					var removed = questionsArray.splice(x,1);
					$("#testArray").val(questionsArray);
		}			
	};
	
	//for main.html onload
	function gameStart(){
		reset();
		getQuestionsIndexes();
		
	};
	
	//for main.html onload , activate if answer is correct
	function addScore(){
		var a = parseInt($("#score").val()) + 1;
		$("#score").val(a);
	}
	
	//for main.html onload, activate on gameStart()
	function reset(){
		var score = 0; //player's SCORE
	
		$("#score").val(score);
		
	};
	
	//for main.html activate on Wrong Answer
	function gameOver(){
		
		var gameOverScore = $("#score").val();
		var previousScore = window.localStorage.getItem("local-storage-previous-score");
		
		saveGameOverScoreOnLocalStorage();
		
		/* stop timer*/
		clearTimeout(myTimer);
		clearInterval(myTimer);
		
		clearTimeout(myRsgTimer);
		clearInterval(myRsgTimer);

		/* modal START*/
			var $modal = $('#main_game_modal_container');
			  setTimeout(function(){
				 $modal.load('gameover.html', '', function(){
				  $modal.modal();
				});
			  },1); 
			
			/* modal END*/
		

		var ggScore = window.localStorage.getItem("local-storage-game-over-score");
		$("#txt-game-over-score").val(ggScore);
		$("#txt-previous-score").val(previousScore);
	};
	
	//function for gameover.html onload
	function displayGameOverScoreAndPreviousScore(){
		var localGameOverScore = window.localStorage.getItem("local-storage-game-over-score");
		var localPreviousScore = window.localStorage.getItem("local-storage-previous-score");
		
		if(localPreviousScore == "null" || localPreviousScore == "" || localPreviousScore == "undefined"){
			localPreviousScore = 0;
		}
		$("#txt-game-over-score").val(localGameOverScore);
		$("#txt-previous-score").val(localPreviousScore);
	}
	
	//function for gameover.html onload
	function timerStart(){
	
		
	}
	
	
	function getPreviousScore(){
		var previouScore = window.localStorage.getItem("local-storage-previous-score");
		 
	}
	//function for main.html onload
	function saveGameOverScoreOnLocalStorage(){
		var gameOverScore = $("#score").val();
		window.localStorage.setItem("local-storage-game-over-score", gameOverScore);
	}
	
	//function for main.html onload
	function savePreviousScore(){
		
		var gamePreviousScore = window.localStorage.getItem("local-storage-game-over-score");
		window.localStorage.setItem("local-storage-previous-score", gamePreviousScore);
			
		
	}

	/*functions end*/
		

	
	