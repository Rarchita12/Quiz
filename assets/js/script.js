//Global Variables
var i = 0;
//correct or incorrect
var result = " ";
//Number of Correct questions
var answerCount = 0;
//questions and answers for quiz
var taskDataObj = [
  {
    question: "Commonly used data types DO Not Include: ",
    choice1: "1.Strings",
    choice2: "2.Booleans",
    choice3: "3.Alerts",
    choice4: "4.Numbers",
    answer: "3",
  },
  {
    question:
      "The condition in an if/else statement is enclosed with ______.",
    choice1: "1.quotes",
    choice2: "2.curly brackets",
    choice3: "3.parenthesis",
    choice4: "4.square brackets",
    answer: "2",
  },

  {
    question: "Arrays in JavaScript can be used to store ",
    choice1: "1.numbers and strings",
    choice2: "2.other arrays",
    choice3: "3.booleans",
    choice4: "4.all of the above",
    answer: "4",
  },

  {
    question:
      "String values must be enclosed within _____ when being assigned to variables.",
    choice1: "1.commas",
    choice2: "2.curly brackets",
    choice3: "3.quotes",
    choice4: "4.parenthesis",
    answer: "3",
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    choice1: "1.JavaScript",
    choice2: "2.terminal/bash",
    choice3: "3.for loops",
    choice4: "4.console.log",
    answer: "4",
  },
];
var div1 = document.querySelector("#Div1");
var div2 = document.querySelector("#ulDiv2");
var div3 = document.querySelector("#Div3");
var div4 = document.querySelector("#Div4");
var timeleft = 75;
var timerId;


//Start Quiz
function switchVisible() {
  if (document.getElementById("Div1")) {
    if (document.getElementById("Div1").style.display == "none") {
      document.getElementById("Div1").style.display = "block";
      document.getElementById("Div2").style.display = "none";

     
    } else {
      document.getElementById("Div1").style.display = "none";
     
      displayList();
      
      timerId = setInterval(timer, 1000);
    }
  }
}
//Go Back Button to Quiz instruction page
function goBack() {
   location.reload();
}

//Timer to coundown from 75 seconds
function timer() {
   document.getElementById("countdown").innerHTML = "Time: " + timeleft;
  timeleft--;
  if (i === 4 && timeleft <= 0) {
    clearInterval(timerId);
  }
  if (timeleft <= 0) {
    clearInterval(timerId);
     userNameScore();
    
  }
}

//Clear High Scores
function clearHistory() {
  localStorage.clear();
  div4.innerHTML =
    "<h1 > High Scores</h1><br/>" +
    "<button onclick='goBack()'>Go Back</button> <button onclick='clearHistory()'> Clear High Scores </button>";
}

//Display High Scores
function highScores() {
  document.getElementById("Div3").style.display = "none";
  document.getElementById("Div4").style.display = "block";
  var highScores = document.createElement("div");
  highScores.innerHTML = "<h1 > High Scores</h1>";
  var listHighScores = document.createElement("p");
  var buttonsHighScores = document.createElement("div");

  for (var y = 0; y < localStorage.length; y++) {
    
    listHighScores.innerHTML +=
      "<p>" +
      (y + 1) +
      ". " +
      localStorage.key(y) +
      " - " +
      +localStorage.getItem(localStorage.key(y)) +
      " </p><br/>";
  }
  
  buttonsHighScores.innerHTML =
    "<button onclick='goBack()'>Go Back</button> <button onclick='clearHistory()'> Clear High Scores </button>";

  highScores.appendChild(listHighScores);
  highScores.appendChild(buttonsHighScores);

  div4.appendChild(highScores);
}


//Set Score for a Specifc User 
function setScore() {
  var initials = document.getElementById("initials").value;
  localStorage.setItem(initials, answerCount);
  highScores();
}

//All Done and Initials Page
function userNameScore() {
  clearInterval(timerId);
  document.getElementById("Div2").style.display = "none";
  document.getElementById("Div3").style.display = "block";
  document.getElementById("Div3").className = "mystyle";
  var userInit = document.createElement("div");
  userInit.className = "userNameScore";
  userInit.innerHTML =
    "<button id='highScores1' onclick='highScores()'>  View High Scores</button><br/>" +
    "<h1 > All Done!" +
    "</h1><br/><h2> Your final score is " +
    answerCount +
    "</h2> <br/>" +
    "<br/><label for='initials'>Enter initials: </label><input type = 'text' id='initials' name='initials'><input type='submit' value='Submit' onclick='setScore()'><br/> <br/><p>" +
    result +
    "</p>";

  div3.appendChild(userInit);
}

//Display Questions 
function displayList() {
  
  document.getElementById("Div2").style.display = "block";
  document.getElementById("Div2").className = "mystyle";
  var listItemEl = document.createElement("li");
  listItemEl.className = "question";
  listItemEl.setAttribute = ("id", "li1");

  var inside1 = document.createElement("div");
  inside1.className = "inside1";
  
  
  inside1.innerHTML =
    "<h1 >" +
    taskDataObj[i].question +
    "</h1><button><li id=1>" +
    taskDataObj[i].choice1 +
    "</li> </button><br/>" +
    "<br/><button ><li id=2>" +
    taskDataObj[i].choice2 +
    "<br/></li> </button> <br/>" +
    "<br/><button><li id=3>" +
    taskDataObj[i].choice3 +
    "<br/></li> </button><br/>" +
    "<br/><button><li id=4>" +
    taskDataObj[i].choice4 +
    "<br/></li> </button><br/><p>" +
    result +
    "</p>";

  listItemEl.appendChild(inside1);
  div2.appendChild(listItemEl);
  result = " ";
  
}




//Start Quiz Event Listener 
div2.addEventListener("click", function (e) {
  
  
  if (
    (e.target && e.target.nodeName == "LI") ||
    (e.target && e.target.nodeName == "BUTTON" && i < taskDataObj.length)
  ) {
    
    var userSelected = e.target.id;
    
    
    if (userSelected === taskDataObj[i].answer) {
      ++answerCount;
      
      result = "Correct!";
    } else {
      result = "Incorrect!";
      timeleft -= 10;
    }

    if (i < taskDataObj.length - 1) {
      i++;
    
      div2.innerHTML = "";
      displayList();
    } else {
      userNameScore();
    }

    
  }

  
});