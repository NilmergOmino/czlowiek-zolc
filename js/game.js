const button_play = document.getElementById('button_play');
const pointsContainer = document.getElementById('points_container');
const answers = document.getElementById('answers');
const timeContainer = document.getElementById('time');
const lvlsContainer = document.getElementById('lvls-container');

window.onload = function(){
    Game.init();
    button_play.addEventListener('click', function(){
        Game.display("hide", this);
        Game.display("show", answers);
        Game.setQuestion();
    })
};

const Game = {
    init: function(){
        Game.lvl = 1;
        Game.questionNumber = 0;
        Game.points = 0;
        Game.time = 50;
        Game.timeDrop = true;
        pointsContainer.innerHTML = Game.points;
        Game.questionsArr = Questions["lvl"+Game.lvl];
        Game.lvlsFinished();
    },
    nextLevel: function(){
        Game.questionNumber = 0;
        Game.points = 0;
        Game.timeDrop = true;
        pointsContainer.innerHTML = Game.points;
        Game.questionsArr = Questions["lvl"+Game.lvl];
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
            Game.timeCounting();
        }
        else Game.endGame();
    },
    checkAnswer: function(e){
        Game.timeDrop = false;
        let answer = e.target.innerHTML;
        if(answer == Game.questionsArr[Game.questionNumber][0]){
            Game.questionNumber++;
            Game.points++;
            e.target.classList.add('answer_correct');
            pointsContainer.innerHTML = Game.points;
            window.setTimeout(Game.setQuestion, 1000);
        }
        else{
            e.target.classList.add('answer_wrong');
            window.setTimeout(Game.endGame, 1000);
        }
        document.querySelectorAll('.answer').forEach(el=>{
            el.removeEventListener('click', Game.checkAnswer);
        })
    },
    endGame: function(){
        Game.timeDrop = false;
        if(Game.questionNumber == Game.questionsArr.length){
            if(Game.lvl == Questions.lvls){
                answers.innerHTML = '<p class="endgame endgame_win">Przeszedłeś wszystkie rundy. Gratulacje!</p>';
            }
            else{
                answers.innerHTML = '<p class="endgame endgame_win">Przeszedłeś '+Game.lvl+' poziom!</p>';
                let buttonNextRound = document.createElement('button');
                buttonNextRound.classList.add('btn');
                buttonNextRound.innerHTML = 'Poziom '+(Game.lvl+1);
                answers.appendChild(buttonNextRound);
                buttonNextRound.addEventListener('click', Game.nextLevel);
            }
            Game.lvl++;
            Game.lvlsFinished();
        }
        else{
            if(Game.time == 0){
                answers.innerHTML = '<p class="endgame endgame_loose">Skończył Ci się czas, musisz odpowiadać szybciej!</p>';
            }
            else{
                answers.innerHTML = '<p class="endgame endgame_loose">Zła odpowiedź!</p>';
            }
            let buttonNextRound = document.createElement('button');
            buttonNextRound.classList.add('btn');
            buttonNextRound.innerHTML = 'powtórz poziom '+Game.lvl;
            answers.appendChild(buttonNextRound);
            buttonNextRound.addEventListener('click', Game.nextLevel);
        }
    },
    lvlsFinished: function(){
        let fragment = document.createDocumentFragment();
        for(let i = 1; i<= Questions.lvls; i++){
            let span = document.createElement('span');
            span.innerHTML = "poziom "+i;
            (Game.lvl > i)? span.classList.add('lvl', 'lvl_finished') : span.classList.add('lvl');
            fragment.appendChild(span);
        }
        lvlsContainer.innerHTML = '';
        lvlsContainer.appendChild(fragment);
    },
    timeCounting: function(){
        if(Game.timeDrop && Game.time > 0){
            Game.time -= 1;
            timeContainer.innerHTML = ((Game.time/10)%1 == 0)?(Game.time/10)+".0" : Game.time/10;
            setTimeout(Game.timeCounting, 100);
        }
        else if(Game.time <= 0){
            Game.endGame();
        }
    }
}
