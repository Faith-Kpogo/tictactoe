window.addEventListener('DOMContentLoaded', ()=>{
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const displayPlayer = document.querySelector('.displayplayer');
    const resetBtn = document.querySelector('#reset');
    const winner = document.querySelector('.displaywinner');


    let board = ['', '', '', '', '', '', '', '', '',];
    let currentPlayer = 'X';
    let isGameActive = true;

    const playerX_won = 'playerX_won';
    const playerO_won = 'playerO_won';
    const tie = 'tie';

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];


    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++){
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === ''|| b==='' || c === ''){
                continue;
            }
            if( a === b && b == c){
                roundWon =true;
                break;
            }
        }

        if(roundWon){
            annouce(currentPlayer === 'X' ? playerX_won : playerO_won);
            isGameActive = false;
            return;
        }
        if(!board.includes(''))
        annouce(tie);
    }

    const annouce = (type) =>{
        switch(type){
            case playerO_won:
                winner.innerHTML = 'Player <span class="playerO">O</span> Won';
                    break;
            case playerX_won:
                winner.innerHTML = 'Player <span class="playerX">X</span> Won';
                    break;
            case tie:
                winner.innerHTML = 'Tie';
                    break;
        }
        winner.classList.remove('hide');
    };

    const isValidAction = (tile) =>{
        if(tile.innerText === 'X' || tile.innerText ==='O'){
            return false;
        }
        return true;
    };

    const updateBoard = (index) => {
        board[index] = currentPlayer;
    }

   const changePlayer = () => {
    displayPlayer.classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Changed '0' to 'O'
    displayPlayer.innerText = currentPlayer;
    displayPlayer.classList.add(`player${currentPlayer}`);
}



    const userAction = (tile, index) =>{
        if(isValidAction(tile) && isGameActive){
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }

    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', '', ];
        isGameActive = true;
        winner.classList.add('hide');

        if(currentPlayer === 'O') {
            changePlayer();
        }
        tiles.forEach(tile =>{
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }

    tiles.forEach( (tile, index) =>{
        tile.addEventListener('click',() => userAction(tile, index));
    });

    resetBtn.addEventListener('click', resetBoard);

}
)
