/**
 * 
 * @param {*} style 
 * @param  {...any} elements 
 */
function setStyleDisplay(style, ...elements) {
        elements.forEach(element => {
                element.style.display = style;
        });
}

var arr = [];
for (var i = 1; i <= 5; i++) arr[i] = 'q' + i;
for (var i = 1; i <= 5; i++) setStyleDisplay("none", document.getElementById(arr[i]));
var res = document.getElementById("res");
var introduction = document.getElementById("introduction");
var showproblems = document.getElementById('showproblems');
var befres = document.getElementById('befres');
var countdown = document.getElementById('countdown');
var questionArr = [];
var correctAnsArr = [];
var incorrectAnsArr = [];

setStyleDisplay("none", res, introduction, showproblems, befres, countdown);


var attempt = [0, 0, 0, 0, 0];
var attemp = [0, 0, 0, 0, 0];
var score = [0, 0, 0, 0, 0];
var scoreAc = [0, 0, 0, 0, 0];

/**
 * 
 * @param {*} a 
 * @param {*} b 
 */
function addScore(a, b) {
        score[a] = b;
        attemp[a] = 1;
}

/**
 * 
 * @param {*} a 
 * @param {*} b 
 */
function showPrev(a, b) {
        setStyleDisplay("none", document.getElementById(a));
        setStyleDisplay("block", document.getElementById(b));
}

/**
 * 
 * @param {*} a 
 * @param {*} b 
 */
function showQue(a, b) {
        const callByNameElement = document.getElementById("callByName");
      
        if (b === 'introduction') {
          setStyleDisplay("none", callByNameElement);
        } else {
          setStyleDisplay("", callByNameElement);
        }
      
        const questionIndexes = ["q1", "q2", "q3", "q4", "q5"];
        const currentIndex = questionIndexes.indexOf(a);
      
        if (currentIndex !== -1 && attemp[currentIndex] === 1) {
          document.getElementById(a + '1').style.border = "2px solid #0000FF";
          attempt[currentIndex] = 1;
          scoreAc[currentIndex] = score[currentIndex];
        }
      
        if (b === "q1") {
          document.getElementById("body").style.width = "75%";
          setStyleDisplay("block", document.getElementById('showproblems'));
        }
      
        if (a === 'befres' && b === 'res') {
          if (document.getElementById('check').checked) {
            setStyleDisplay("none", document.getElementById(a));
            setStyleDisplay("block", document.getElementById(b));
            time = Infinity;
            setStyleDisplay("none", countdown);
          } else {
            alert('Kindly check the checkbox before clicking the submit button');
          }
        } else {
          setStyleDisplay("none", document.getElementById(a));
          setStyleDisplay("block", document.getElementById(b));
        }
      }
      

var res = 0;
var attempted = 0;


function reload() {
        window.location.reload();
}

/**
 * 
 * @param {*} a 
 * @param {*} b 
 */
async function checkinitial(a, b) {
        if (document.getElementById("username").value == "")
                alert("Please enter your name");
        else {

                var s = document.getElementById("username").value;
                document.getElementById("callByName").innerHTML = s;
                // document.getElementById("callByName").style.display = "block";    /*--------------------*/
				
				await getQuesFromApi();
                
				showQue(a, b);
        }
}

function showorHide() {
        var introname = document.getElementById("callByName");
        if (document.getElementById("username").value == "")
                setStyleDisplay("none", introname);
        else {
                setStyleDisplay("block", introname)
        }
}

/**
 * 
 * @param {*} a 
 */
function showques(a) {
        for (var i = 1; i <= 5; i++)
                setStyleDisplay("none", document.getElementById(arr[i]));
        setStyleDisplay("block", document.getElementById(a));
        setStyleDisplay("none", document.getElementById("befres"));
}


const startingMinutes = 1;
let time = startingMinutes * 60;

function startTimer() {
        setInterval(updateCountdown, 1000);
        setStyleDisplay("block", document.getElementById('countdown'));
}

var min, sec;

function updateCountdown() {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        countdown.innerHTML = `${minutes}:${seconds}`;
        time--;
        if (minutes == 0 && seconds == 0) {
                alert("Time Up");

                for (let i = 1; i <= 5; i++) {
                        document.getElementById(arr[i]).style.display = "none";
                }

                setStyleDisplay("block", document.getElementById("res"));
                setStyleDisplay("none", introduction, showproblems, befres, countdown);

                min = minutes;
                sec = seconds;
                showScore();
        }
}



function showScore() {
        const checkElement = document.getElementById('check');
        const container = document.getElementById("board");

        if (checkElement.checked || (min <= 0 && sec <= 0)) {
                const fireworks = new Fireworks.default(container);

                let res = 0;
                let attempted = 0;
                const numQuestions = 5;

                for (let i = 0; i < numQuestions; i++) {
                        res += scoreAc[i];
                }

                for (let i = 0; i < numQuestions; i++) {
                        attempted += attempt[i];
                }

                document.getElementById("totalQ").innerHTML = numQuestions;
                document.getElementById("totalS").innerHTML = numQuestions * res - attempted;
                document.getElementById("attemtQ").innerHTML = attempted;
                document.getElementById("corrQ").innerHTML = res;
                document.getElementById("wrongQ").innerHTML = attempted - res;
                document.getElementById("body").style.width = "100%";

                if (res >= 3) {
                        fireworks.start();
                }

                setStyleDisplay("none", showproblems);

                console.log(min);
                console.log(sec);
        }
}

async function getQuesFromApi(){
        const result = await fetch("https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple");
        const data = await result.json();
        
		
        data.results.forEach((loadedQuestion) => {
			console.log(loadedQuestion);
			questionArr.push(loadedQuestion.question);
			correctAnsArr.push(loadedQuestion.correct_answer);
			incorrectAnsArr.push(loadedQuestion.incorrect_answers);
        });

        generateQuestions(questionArr,correctAnsArr,incorrectAnsArr);
}

function generateQuestions(questionArr,correctAnsArr,incorrectAnsArr){

        for(let i = 0;i < questionArr.length;i++){
			const questionSpan = document.getElementById(`question-content${i+1}`);
			var temporaryTag = document.createElement("p");
			temporaryTag.innerHTML = questionArr[i];
			questionSpan.textContent = temporaryTag.innerHTML;
			const randomCorrectOptionNum = Math.floor(Math.random() * 4);
			let incorrectAnsIdx = 0;
			
			for(let j = 0;j<4;j++){
				const inputElement = document.getElementById(`opt${i+1}${j+1}`);
				const labelElement = document.querySelector(`label[for="${inputElement.id}"]`);
		
				const ifCorrectOption = (j === randomCorrectOptionNum) ? 1 : 0;
				inputElement.onclick = function() {
					addScore(i, ifCorrectOption);
				};

				if(j === randomCorrectOptionNum){
					labelElement.textContent = correctAnsArr[i];
				}
				else{
					labelElement.textContent = incorrectAnsArr[i][incorrectAnsIdx++];
				}
			}
        }

}