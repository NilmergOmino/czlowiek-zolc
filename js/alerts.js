const alerts = {
    winRound: function(lvl){
        const info = 'Przeszedłeś '+lvl+' poziom!';
        answers.innerHTML = '<p class="endgame endgame_win">'+info+'</p>';
    },
    winGame: function(){
        const info = 'Przeszedłeś wszystkie rundy. Gratulacje!';
        answers.innerHTML = '<p class="endgame endgame_win">'+info+'</p>';
    },
    wrongAnswer: function(){
        const info = 'Zła odpowiedź!';
        answers.innerHTML = '<p class="endgame endgame_loose">'+info+'</p>';
    },
    outOfTime: function(){
        const info = 'Skończył Ci się czas, musisz odpowiadać szybciej!';
        answers.innerHTML = '<p class="endgame endgame_loose">'+info+'</p>';
    },
    outOfLifes: function(){
        const info = 'Skończyły Ci się życia. Musisz zacząć od początku.';
        answers.innerHTML = '<p class="endgame endgame_loose">'+info+'</p>';
    }
}
