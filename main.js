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
    }

    return {getBoard, setCell, reset}

})()

const gameController = (() => {

    const player1 = Player('Player 1','X')
    const player2 = Player('Player 2','O')

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

    if(spot === '') {
        gameBoard.setCell(position, currentSymbol)
        console.log(gameBoard.getBoard())
        checkWin()
        switchTurn()
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

    let winner = null

    const checkWin = () => {

        let array = gameBoard.getBoard()
    
        if(winningCombinations.some((combination) =>
            combination.every((x) => array[x] === 'X' ) )) {
                console.log('Player 1 Wins')
                return winner = player1.name
            } else if (winningCombinations.some((combination) =>
            combination.every((x) => array[x] === 'O' ))) {
                console.log('Player 2 Wins')
                return winner = player2.name
            }
    }

    return {getTurn, getSymbol, switchTurn, playRound, checkWin}

})()

const displayController = (() => {
    const boxes = document.querySelectorAll('.box')
    const container = document.querySelector('.container')
    const announce = document.createElement('p')
    container.appendChild(announce)

    boxes.forEach((box) => {box.addEventListener('click', function play() {
        updateDisplay(box)
        gameController.playRound(box)
        this.removeEventListener('click', play) 
    })})

    const updateDisplay = (box) => {
        box.textContent = gameController.getSymbol()
        announce.textContent = `It is ${gameController.getTurn()}'s turn`
    }





    return {updateDisplay}
})()
