const Player  = (name, symbol) => {
    return {name, symbol}
}

const gameBoard = (() => {

    const board = ['','','','','','','','','']

    const getBoard = () => {
        return board
    }

    const setCell = (position, symbol) => {
        board[position] = symbol
    }

    const reset = () => {
        for(let i = 0; i < board.length; i++) {
            board[i] = ''
        }
        
        console.log(getBoard())
    }

    return {getBoard, setCell, reset}

})()

const gameController = (() => {

    const player1 = Player('Player 1','X')
    const player2 = Player('Player 2','O')
    
    let winner = null

    let currentTurn = player1.name
    let currentSymbol = player1.symbol

    const getTurn = () => {
        return currentTurn
    } 

    const getSymbol = () => {
        return currentSymbol
    }

    const switchTurn = () => {
        if(currentTurn === player1.name) {
            currentTurn = player2.name
            currentSymbol = player2.symbol
        } else {
            currentTurn = player1.name
            currentSymbol = player1.symbol
        }
    }

    const playRound = (x) => {
        
        let position = (Number(x.getAttribute('id').split('').pop()))
        let spot = gameBoard.getBoard()[position]

    if(spot === '' && winner === null) {
        gameBoard.setCell(position, currentSymbol)
        switchTurn()
        displayController.turnDisplay()
        console.log(gameBoard.getBoard())
        checkWin()
        }
    }

    const winningCombinations = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    const getWinner = () => {
        return winner
    }

    const checkWin = () => {

        let array = gameBoard.getBoard()

        if(winningCombinations.some((combination) =>
            combination.every((x) => array[x] === 'X' ) )) {
                console.log('Player 1 Wins')
                winner = player1.name
            } else if (winningCombinations.some((combination) =>
            combination.every((x) => array[x] === 'O' ))) {
                console.log('Player 2 Wins')
                winner = player2.name
            } else if (winner === null && array.filter((x) => x === '').length === 0) {
                winner = 'Tie'
            }
    }

    const resetGame = () => {
        winner = null
        currentTurn = player1.name
        currentSymbol = player1.symbol

    }

    return {getTurn, getSymbol, getWinner, switchTurn, playRound, checkWin, resetGame}

})()

const displayController = (() => {
    const boxes = document.querySelectorAll('.box')
    const container = document.querySelector('.container')
    const announce = document.createElement('p')
    container.appendChild(announce)


    const start = () => {

    boxes.forEach((box) => {box.addEventListener('click', function play() {
        symbolDisplay(box)
        gameController.playRound(box)
        winDisplay(box)
        this.removeEventListener('click', play) 
    })})}

    const symbolDisplay = (box) => {

        
        if(box.textContent === '' && gameController.getWinner() === null) {
        box.textContent = gameController.getSymbol()
    }}

    const turnDisplay = () => {

        announce.textContent = `It is ${gameController.getTurn()}'s turn`
    }

     const winDisplay = (box) => {


        if(gameController.getWinner() === 'Tie' && box.textContent !== '') {
            announce.textContent = `It is a ${gameController.getWinner()}.
            Would you like to play again?`

            const restart = document.createElement('button')
            restart.textContent = 'Restart'
            restart.classList.add = ('.restart')
            container.appendChild(restart)
            restart.addEventListener('click', () => {
                restart.remove()
                gameBoard.reset()
                gameController.resetGame()
                boxes.forEach((box) => {box.textContent = ''})
                start()
                turnDisplay()
                
                
            })
        } else if(gameController.getWinner() !== null && box.textContent !== '') {
            announce.textContent = `${gameController.getWinner()} has won!
            Would you like to play again?`
            
            const restart = document.createElement('button')
            restart.textContent = 'Restart'
            restart.classList.add = ('.restart')
            container.appendChild(restart)
            restart.addEventListener('click', () => {
                restart.remove()
                gameBoard.reset()
                gameController.resetGame()
                boxes.forEach((box) => {box.textContent = ''})
                start()
                turnDisplay()
            })
        }
    }

    start()
    turnDisplay()



    return {symbolDisplay, turnDisplay, winDisplay}
})()
