/**
 *
 * @param {*} style
 * @param  {...any} elements
 */
function setStyleDisplay(style, ...elements) {
  elements.forEach((element) => {
    element.style.display = style
  })
}


var res = document.getElementById("res")
var introduction = document.getElementById("introduction")
var showproblems = document.getElementById("showproblems")
var befres = document.getElementById("befres")
var countdown = document.getElementById("countdown")
var questionsHtml = document.getElementById("questions")
var quizCategory = document.getElementById("quiz-category")
var quizDifficulty = document.getElementById("quiz-difficulty")

setStyleDisplay("none", res, introduction, showproblems, befres, countdown)

var attempt = [0, 0, 0, 0, 0]
var attemp = [0, 0, 0, 0, 0]
var score = [0, 0, 0, 0, 0]
var scoreAc = [0, 0, 0, 0, 0]
var quizQuestions = []
var questionArr = []
var correctAnsArr = []
var incorrectAnsArr = []

function generateQuestionUI(){
  quizQuestions.forEach((item) => {
    questionsHtml.innerHTML += `<form id="q${item.id}" onsubmit="showQue('q${
      item.id
    }','${item.id == quizQuestions.length ? "befres" : "q" + (item.id + 1)}',event)">
            <span class="title">${item.id}</span>
            <span>${item.title}</span>
            <div>
              <input
                type="radio"
                name="opt${item.id}"
                id="opt${item.id}1"
                onclick="addScore(${item.id - 1},${
      item.correct === 1 ? 1 : 0
    });"
              />
              <label for="opt${item.id}1"> ${item.op1}</label>
            </div>
            <div>
              <input
                type="radio"
                name="opt${item.id}"
                id="opt${item.id}2"
                onclick="addScore(${item.id - 1},${
      item.correct === 2 ? 1 : 0
    });"
              />
              <label for="opt${item.id}2">  ${item.op2}</label>
            </div>
            <div>
              <input
                type="radio"
                name="opt${item.id}"
                id="opt${item.id}3"
                onclick="addScore(${item.id - 1},${
      item.correct === 3 ? 1 : 0
    });"
              />
              <label for="opt${item.id}3">  ${item.op3}</label>
            </div>
            <div>
              <input
                type="radio"
                name="opt${item.id}"
                id="opt${item.id}4"
                onclick="addScore(${item.id - 1},${
      item.correct === 4 ? 1 : 0
    });"/>
           <label for="opt${item.id}4"> ${item.op4}</label>
            </div>
                <div class="buttondiv">${
                  item.id > 1
                    ? `<button type="button" class="button" onclick="showPrev('q${item.id}','q${
                        item.id - 1
                      }')">Prev</button>`
                    : ``
                }
                <button id="button" type="submit">
                Save & Next
                </button>
                </div>
          </form>`
})

  for (var i = 0; i < questionArr.length; i++) setStyleDisplay("none", document.getElementById(`q${i+1}`));
}

/**
 *
 * @param {*} a
 * @param {*} b
 */
function addScore(a, b) {
  score[a] = b
  attemp[a] = 1
}

/**
 *
 * @param {*} a
 * @param {*} b
 */
function showPrev(a, b) {
  setStyleDisplay("none", document.getElementById(a))
  setStyleDisplay("block", document.getElementById(b))
}

/**
 *
 * @param {*} a
 * @param {*} b
 * @param {event} event
 */
function showQue(a, b, event = {}) {
  event.preventDefault && event.preventDefault()
  const callByNameElement = document.getElementById("callByName")

  if (b === "introduction") {
    setStyleDisplay("none", callByNameElement)
  } else {
    setStyleDisplay("", callByNameElement)
  }

  const questionIndexes = ["q1", "q2", "q3", "q4", "q5"]
  const currentIndex = questionIndexes.indexOf(a)

  if (currentIndex !== -1 && attemp[currentIndex] === 1) {
    document.getElementById(a + "1").style.border = "2px solid #0000FF"
    attempt[currentIndex] = 1
    scoreAc[currentIndex] = score[currentIndex]
  }

  if (b === "q1") {
    document.getElementById("body").style.width = "75%"
    setStyleDisplay("block", document.getElementById("showproblems"))
  }

  if (a === "befres" && b === "res") {
    if (document.getElementById("check").checked) {
      setStyleDisplay("none", document.getElementById(a))
      setStyleDisplay("block", document.getElementById(b))
      time = Infinity
      setStyleDisplay("none", countdown)
    } else {
      alert("Kindly check the checkbox before clicking the submit button")
    }
  } else {
    setStyleDisplay("none", document.getElementById(a))
    setStyleDisplay("block", document.getElementById(b))
  }
}

var res = 0
var attempted = 0

function reload() {
  window.location.reload()
}

/**
 *
 * @param {event} event
 * @param {*} a
 * @param {*} b
 */
async function checkinitial(event, a, b) {
  event.preventDefault && event.preventDefault()
  const errorElement = document.getElementById("errormsg")
  if (document.getElementById("username").value == "") {
    errorElement.classList.add("show")
    errorElement.innerHTML = `<span class="material-symbols-outlined">error</span> Please Enter your name`
    setTimeout(() => {
      // this is for removing error msg for better UI
      errorElement.classList.remove("show")
    }, 2000)
  } else {
    var s = document.getElementById("username").value
    document.getElementById("callByName").innerHTML = s
    // document.getElementById("callByName").style.display = "block";    /*--------------------*/
    await getQuesFromApi()
    showQue(a, b)
  }
}

function showorHide() {
  var introname = document.getElementById("callByName")
  if (document.getElementById("username").value == "") setStyleDisplay("none", introname)
  else {
    setStyleDisplay("block", introname)
  }
}

/**
 *
 * @param {*} a
 */
function showques(a) {
  for (var i = 1; i <= 5; i++) setStyleDisplay("none", document.getElementById(`q${i}`))
  setStyleDisplay("block", document.getElementById(a))
  setStyleDisplay("none", document.getElementById("befres"))
}

const startingMinutes = 1
let time = startingMinutes * 60

function startTimer() {
  setInterval(updateCountdown, 1000)
  setStyleDisplay("block", document.getElementById("countdown"))
}

var min, sec

function updateCountdown() {
  const minutes = Math.floor(time / 60)
  let seconds = time % 60
  seconds = seconds < 10 ? "0" + seconds : seconds

  countdown.innerHTML = `${minutes}:${seconds}`
  time--
  if (minutes == 0 && seconds == 0) {
    alert("Time Up")

    for (let i = 1; i <= 5; i++) {
      document.getElementById(arr[i]).style.display = "none"
    }

    setStyleDisplay("block", document.getElementById("res"))
    setStyleDisplay("none", introduction, showproblems, befres, countdown)

    min = minutes
    sec = seconds
    showScore()
  }
}

function showScore() {
  const checkElement = document.getElementById("check")
  const container = document.getElementById("board")

  if (checkElement.checked || (min <= 0 && sec <= 0)) {
    const fireworks = new Fireworks.default(container)

    let res = 0
    let attempted = 0
    const numQuestions = 5

    for (let i = 0; i < numQuestions; i++) {
      res += scoreAc[i]
    }

    for (let i = 0; i < numQuestions; i++) {
      attempted += attempt[i]
    }

    document.getElementById("totalQ").innerHTML = numQuestions
    document.getElementById("totalS").innerHTML = numQuestions * res - attempted
    document.getElementById("attemtQ").innerHTML = attempted
    document.getElementById("corrQ").innerHTML = res
    document.getElementById("wrongQ").innerHTML = attempted - res
    document.getElementById("body").style.width = "100%"

    if (res >= 3) {
      fireworks.start()
    }

    setStyleDisplay("none", showproblems)

    console.log(min)
    console.log(sec)
  }
}

function onSubmitIntroduction(event) {
  event.preventDefault()
  showQue("introduction", "q1")
  startTimer()
}

function onSubmitBefres(event) {
  event.preventDefault()
  showQue("befres", "res")
  showScore()
}

async function getQuesFromApi() {
  const quizCategoryOption = quizCategory.options[quizCategory.selectedIndex];
  const quizDifficultyOption = quizDifficulty.options[quizDifficulty.selectedIndex];
  const baseUrl = 'https://opentdb.com/api.php';
  const queryParams = {
    "amount":5,
    "type":"multiple"
  }

  if(quizDifficultyOption.value !== "any"){
    queryParams["difficulty"] = quizDifficultyOption.value;
  }

  if(quizCategoryOption.value !== "any"){
    queryParams["category"] = quizCategoryOption.value;
  }

  const url = new URL(baseUrl);
  
  Object.keys(queryParams).forEach((key) => {
    url.searchParams.append(key,queryParams[key]);
  });
 
  const result = await fetch(url)
  const data = await result.json()

  data.results.forEach((loadedQuestion) => {
    questionArr.push(loadedQuestion.question)
    correctAnsArr.push(loadedQuestion.correct_answer)
    incorrectAnsArr.push(loadedQuestion.incorrect_answers)
  })


  generateQuestionsList(questionArr, correctAnsArr, incorrectAnsArr)
}


function generateQuestionsList(questionArr, correctAnsArr, incorrectAnsArr) {
  
  for(let i = 0;i < questionArr.length;i++){
    var temporaryTag = document.createElement("p")
    temporaryTag.innerHTML = questionArr[i]
    const randomCorrectOptionNum = Math.floor(Math.random() * 4) + 1
    let incorrectAnsIdx = 0
    const questionObj = {
      id : i+1,
      title : temporaryTag.innerHTML,
      op1 : undefined,
      op2 : undefined,
      op3 : undefined,
      op4 : undefined,
      correct : randomCorrectOptionNum
    };
    
    for(let j = 1;j <= 4;j++){
      if(j == randomCorrectOptionNum){
        temporaryTag = document.createElement("p");
        temporaryTag.innerHTML = correctAnsArr[i];
        questionObj[`op${j}`] = temporaryTag.innerHTML;
      }
      else{
        temporaryTag = document.createElement("p");
        temporaryTag.innerHTML = incorrectAnsArr[i][incorrectAnsIdx++];
        questionObj[`op${j}`] = temporaryTag.innerHTML;
      }
    }

    quizQuestions.push(questionObj);
  }

  generateQuestionUI()

}
