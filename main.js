const playerFactory  = (name, symbol) => {
    return {name, symbol}
}

const gameBoard = () => {

    const board = ['','','','','','','','','']

    const getBoard = () => {
        return board
    }

    const setCell = (position) => {
        board[position] = symbol
    }

    const reset = () => {
        for(let i = 0; i < board.length; i++) {
            board[i] = ''
        }
    }

    return {getBoard, setCell, reset}

}

const gameController = () => {

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

}

const displayController = () => {

}
