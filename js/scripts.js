let questionsArr = [];
setQuestionsList();

function setQuestionsList(){
    switch(currentLvl){
        case 1:
            questionsArr = questionsLvl1
            break;
    }
}

// const button_play = document.getElementById('button_play');
// const pointsContainer = document.getElementById('points_container');
// document.getElementById('points_max').innerHTML = "/"+questionsArr.length;

// button_play.addEventListener('click', function(){
//     display("hide", this);
//     startGame();
// })
// function display(action, el){
//     (action == "hide")? el.classList.add("hidden") : el.classList.remove("hidden");
// }

function startGame(){
    // const questions = document.getElementById('questions');
    // let questionNumber = 0;
    // let points = 0;
    // pointsContainer.innerHTML = points;
    // display("show", questions);
    // let time = 50;
    // let timeDrop = true;
    // const timeContainer = document.getElementById('time');
    // setQuestion();

    function setQuestion(){
        // if(questionNumber < questionsArr.length){
        //     questions.innerHTML = '';
        //     questionsArr[questionNumber].forEach((el)=>{
        //         let button = document.createElement('button');
        //         button.classList.add('btn', 'answer');
        //         button.innerHTML = el;
        //         button.addEventListener('click', checkAnswer);
        //         let randomPlace = Math.round(Math.random());
        //         if(randomPlace && questions.firstElementChild) questions.insertBefore(button, questions.firstElementChild);
        //         else questions.appendChild(button);
        //     })
        //     time = 50;
        //     timeDrop = true;
        //     timeCounting();
        // }
        // else endGame();
    }

    function checkAnswer(e){
        // timeDrop = false;
        // let answer = e.target.innerHTML;
        // if(answer == questionsArr[questionNumber][0]){
        //     questionNumber++;
        //     points++;
        //     e.target.classList.add('answer_correct');
        //     pointsContainer.innerHTML = points;
        //     window.setTimeout(setQuestion, 1000);
        // }
        // else{
        //     e.target.classList.add('answer_wrong');
        //     window.setTimeout(endGame, 1000);
        // }
        // document.querySelectorAll('.answer').forEach(el=>{
        //     el.removeEventListener('click', checkAnswer);
        // })
    }

    function endGame(){
        // timeDrop = false;
        // if(questionNumber == questionsArr.length){
        //     questions.innerHTML = '<p class="endgame endgame_win">Wygrałeś!</p>';
        // }
        // else{
        //     questions.innerHTML = '<p class="endgame endgame_loose">Przegrałeś! Koniec gry!</p>';
        // }
    }
    function timeCounting(){
        // if(timeDrop && time > 0){
        //     time -= 1;
        //     timeContainer.innerHTML = ((time/10)%1 == 0)?(time/10)+".0" : time/10;
        //     setTimeout(timeCounting, 100);
        // }
        // else if(time <= 0){
        //     endGame();
        // }
    }
}
