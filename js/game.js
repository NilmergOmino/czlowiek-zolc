window.addEventListener("DOMContentLoaded", function(){
    const startInfo = document.getElementById('start-info');
    const buttonPlay = document.getElementById('button_play');
    const pointsContainer = document.getElementById('points_container');
    const answers = document.getElementById('answers');
    const timeContainer = document.getElementById('time');
    const lvlsContainer = document.getElementById('lvls-container');
    const buttonRestart = document.getElementById('button_restart');
    const lifesContainer = document.getElementById('lifes-container');

    const Game = {
        init: function(){
            Game.lifes = 3;
            Game.lvl = 1;
            Game.questionNumber = 0;
            Game.points = 0;
            Game.time = 50;
            Game.timeDrop = false;
            pointsContainer.textContent = Game.points;
            Game.questionsArr = Game.questions["lvl"+Game.lvl];
            Game.lvlsFinished();
            Game.lifesLeft();
        },
        loadQuestions: function(){
            let questionsSource = "js/questions.json";
            let ajax = new XMLHttpRequest();
            ajax.open("GET", questionsSource, true);
            ajax.addEventListener('load', function(){
                if(this.status === 200){
                    Game.questions = JSON.parse(ajax.responseText);
                    Game.init();
                }
                else alert('Błąd połączenia! Prosimy spróbować później.');
            })
            ajax.send();
        },
        nextLevel: function(){
            Game.questionNumber = 0;
            Game.points = 0;
            pointsContainer.textContent = Game.points;
            Game.questionsArr = Game.questions["lvl"+Game.lvl];
            Game.setQuestion();
        },
        display: function(action, el){
            (action == "hide")? el.classList.add("hidden") : el.classList.remove("hidden");
        },
        setQuestion: function(){
            if(Game.questionNumber < Game.questionsArr.length){
                answers.innerHTML = '';
                Game.questionsArr[Game.questionNumber].forEach((el)=>{
                    let button = document.createElement('button');
                    button.classList.add('btn', 'answer');
                    button.innerHTML = el;
                    button.addEventListener('click', Game.checkAnswer);
                    let randomPlace = Math.round(Math.random());
                    if(randomPlace && answers.firstElementChild) answers.insertBefore(button, answers.firstElementChild);
                    else answers.appendChild(button);
                })
                Game.time = 50;
                Game.timeDrop = true;
                if(Game.active) Game.timeCounting();
            }
            else Game.endGame();
        },
        checkAnswer: function(e){
            Game.timeDrop = false;
            let answer = e.target.textContent;
            if(answer == Game.questionsArr[Game.questionNumber][0]){
                Game.questionNumber++;
                Game.points++;
                e.target.classList.add('answer_correct');
                pointsContainer.textContent = Game.points;
                window.setTimeout(Game.setQuestion, 1000);
            }
            else{
                e.target.classList.add('answer_wrong');
                window.setTimeout(Game.endGame, 1000);
            }
            document.querySelectorAll('.answer').forEach(el => el.removeEventListener('click', Game.checkAnswer));
        },
        endGame: function(){
            Game.timeDrop = false;
            if(Game.questionNumber == Game.questionsArr.length){
                if(Game.lvl == Game.questions.lvls) alerts.winGame();
                else{
                    alerts.winRound(Game.lvl);
                    let buttonNextRound = document.createElement('button');
                    buttonNextRound.classList.add('btn');
                    buttonNextRound.textContent = 'Poziom '+(Game.lvl+1);
                    answers.appendChild(buttonNextRound);
                    buttonNextRound.addEventListener('click', Game.nextLevel);
                }
                Game.lvl++;
                Game.lvlsFinished();
            }
            else{
                Game.lifes--;
                Game.lifesLeft();
                if(Game.lifes > 0){
                    (Game.time <= 0)? alerts.outOfTime() : alerts.wrongAnswer();
                    let buttonNextRound = document.createElement('button');
                    buttonNextRound.classList.add('btn');
                    buttonNextRound.textContent = 'powtórz poziom '+Game.lvl;
                    answers.appendChild(buttonNextRound);
                    buttonNextRound.addEventListener('click', Game.nextLevel);
                }
                else alerts.outOfLifes();
            }
        },
        lifesLeft: function(){
            let fragment = document.createDocumentFragment();
            for(let i = 1; i<=3;i++){
                let span = document.createElement('span');
                (Game.lifes < i)? span.classList.add('life', 'life_used') : span.classList.add('life');
                fragment.appendChild(span);
            }
            lifesContainer.innerHTML = '';
            lifesContainer.appendChild(fragment);
        },
        lvlsFinished: function(){
            let fragment = document.createDocumentFragment();
            for(let i = 1; i<= Game.questions.lvls; i++){
                let span = document.createElement('span');
                span.textContent = "poziom "+i;
                (Game.lvl > i)? span.classList.add('lvl', 'lvl_finished') : span.classList.add('lvl');
                fragment.appendChild(span);
            }
            lvlsContainer.innerHTML = '';
            lvlsContainer.appendChild(fragment);
        },
        timeCounting: function(){
            if(Game.timeDrop && Game.time > 0){
                Game.time -= 1;
                timeContainer.textContent = ((Game.time/10)%1 == 0)?(Game.time/10)+".0" : Game.time/10;
                setTimeout(Game.timeCounting, 100);
            }
            else if(Game.time <= 0) Game.endGame();
        }
    }

    Game.loadQuestions();
    buttonPlay.addEventListener('click', function(){
        Game.active = true;
        Game.display("hide", startInfo);
        Game.display("show", answers);
        Game.setQuestion();
    })
    buttonRestart.addEventListener('click', function(){
        Game.active = false;
        Game.init();
        timeContainer.textContent = "5.0";
        Game.display("show", startInfo);
        Game.display("hide", answers);
    })
});
