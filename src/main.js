var arr = [];
for(var i=1; i<=5; i++) arr[i]= 'q'+i;
for(var i=1; i<=5; i++) document.getElementById(arr[i]).style.display="none";
var res = document.getElementById("res");
var introduction = document.getElementById("introduction");
var showproblems = document.getElementById('showproblems');
var befres = document.getElementById('befres');
var countdown = document.getElementById('countdown');


res.style.display="none";
introduction.style.display="none";
showproblems.style.display = "none";
befres.style.display = "none";
countdown.style.display = "none";


var attempt=[0,0,0,0,0];
var attemp=[0,0,0,0,0];
var score=[0,0,0,0,0];
var scoreAc=[0,0,0,0,0];


function addScore(a,b){
        score[a]=b;
        attemp[a]=1;
}
function showPrev(a,b){
        document.getElementById(a).style.display="none";
        document.getElementById(b).style.display="block";
}
function showQue(a,b){
        if(b=='introduction') document.getElementById("callByName").style.display="none";
        else document.getElementById("callByName").style.display="";
        if(a=="q1")
                if(attemp[0]==1){
                        document.getElementById(a+'1').style.border="2px solid #0000FF";
                        attempt[0]=1;
                        scoreAc[0]=score[0];
                }

        if(a=="q2")
                if(attemp[1]==1){
                        document.getElementById(a+'1').style.border="2px solid #0000FF";
                        attempt[1]=1;
                        scoreAc[1]=score[1];
                }
        if(a=="q3")
                if(attemp[2]==1){
                        document.getElementById(a+'1').style.border="2px solid #0000FF";
                        attempt[2]=1;
                        scoreAc[2]=score[2];
                }
        if(a=="q4")
                if(attemp[3]==1){
                        document.getElementById(a+'1').style.border="2px solid #0000FF";
                        attempt[3]=1;
                        scoreAc[3]=score[3];
                }
        if(a=="q5")
                if(attemp[4]==1){
                        document.getElementById(a+'1').style.border="2px solid #0000FF";  
                        attempt[4]=1;
                        scoreAc[4]=score[4];
                }
        if(b == "q1"){
                document.getElementById("body").style.width = "75%";
                document.getElementById('showproblems').style.display = "block";
        }
        if(a=='befres' && b=='res'){
                if(document.getElementById('check').checked){
                        document.getElementById(a).style.display="none";
                        document.getElementById(b).style.display="block";
                        time = Infinity;
                        countdown.style.display = "none";
                }
                else{
                        alert('Kindly check the checkbox before clicking the submit button');
                }
        }
        else{
                document.getElementById(a).style.display="none";
                document.getElementById(b).style.display="block";
        }
}

var res=0;
var attempted=0;

function reload(){
        window.location.reload();
}
function checkinitial(a,b){
        if(document.getElementById("username").value == "") 
                alert("Please enter your name");
        else{
                
                var s = document.getElementById("username").value;
                console.log(s);
                                document.getElementById("callByName").innerHTML = s;
                // document.getElementById("callByName").style.display = "block";    /*--------------------*/
                showQue(a,b); 
        }
}
function showorHide(){
        var introname = document.getElementById("callByName");
        if(document.getElementById("username").value == "") 
                introname.style.dispaly="none";
        else{
                introname.style;length.display="block";
        }
}
function showques(a){
        for(var i=1; i<=5; i++) 
                document.getElementById(arr[i]).style.display="none";
        document.getElementById(a).style.display = "block";
        document.getElementById("befres").style.display = "none";
}


const startingMinutes = 1;
let time = startingMinutes * 60;

function startTimer(){
        setInterval(updateCountdown,1000);
        document.getElementById('countdown').style.display = "block";
}
var min,sec;
function updateCountdown(){
        const minutes = Math.floor(time/60);
        let seconds = time % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        countdown.innerHTML = `${minutes}:${seconds}`;
        time--;
        if(minutes==0 && seconds== 0) {
                alert("Time Up");
                for(var i=1; i<=5; i++) document.getElementById(arr[i]).style.display="none";
                document.getElementById("res").style.display="block";
                introduction.style.display="none";
                showproblems.style.display = "none";
                befres.style.display = "none";
                countdown.style.display = "none";

                min = minutes; sec = seconds;
                showScore();
        }        
}

function showScore(){
        if(document.getElementById('check').checked || (min<=0 && sec<= 0)){
                const container = document.getElementById("board");
                const fireworks = new Fireworks.default(container);
                
                for(var i=0; i<5; i++) res+=scoreAc[i];
                for(var i=0; i<5; i++) attempted+=attempt[i];
                document.getElementById("totalQ").innerHTML = 5;
                document.getElementById("totalS").innerHTML = 5*res-attempted;
                document.getElementById("attemtQ").innerHTML = attempted;
                document.getElementById("corrQ").innerHTML = res;
                document.getElementById("wrongQ").innerHTML = attempted-res;
                document.getElementById("body").style.width = "100%";
                if(res >= 3) {
                        fireworks.start();
                }
                showproblems.style.display = "none";
                console.log(min);
                console.log(sec);
        }
}
