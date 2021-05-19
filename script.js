const gameBoard = (()=>{

const board=["","","","","","","","",""]
let round=0;

    function getItem(index)
    {
        return board[index]
    }

    function setItem(index,val)
    {
        board[index]=val
    }

    function setRound(val)
    {
        round=val
    }

    function getRound()
    {
        return round
    }

    function reset()
    {
        board.forEach((item,index)=>{
            board[index]="";
        })
        displayController.displayGrid();
        displayController.result.innerHTML = "";
        displayController.gridBoard.style.pointerEvents = "auto";
    }

    return {getItem,setItem,setRound,getRound,reset}

})()

const Player = (sign)=>{
    return {sign}
}

const displayController = (()=>{
    
    const grid = document.querySelectorAll(".grid-item")
    const btn = document.querySelector(".btn")
    const result = document.querySelector(".result")
    const gridBoard = document.querySelector(".grid");
    const displayGrid = ()=>{ 
        grid.forEach((item,index)=>{
            item.innerHTML = gameBoard.getItem(index);
        })
    }
    
    btn.addEventListener("click",()=>{
        gameBoard.reset();
    })
    grid.forEach((item,index)=>{
        item.addEventListener("click",()=>{
            let boardValue = gameBoard.getItem(index)
            let val = gameController.getSign()
            if(boardValue=="")
            gameController.changeSign();
            else
            val=boardValue;
            
                gameBoard.setItem(index,val)
                item.innerHTML = val;
                
                if(gameController.isWinning(val))
                {
                    result.innerHTML = `${val} is Winner`
                    gridBoard.style.pointerEvents = "none";
                }
                else if(gameController.isFull())
                
                result.innerHTML = `Draw`
                
                displayGrid();
            })
        })

        return {displayGrid,gridBoard,result};
})()


const gameController = (()=>{

    const Player1 = Player("O");
    const Player2 = Player("X");

    const getSign = ()=>{
        let round=gameBoard.getRound();
        return (round==0)?Player1.sign:Player2.sign
    }

    const changeSign = ()=>{
        let round=gameBoard.getRound();
        gameBoard.setRound(1-round);
    }
    
    const isWinning = (symbol)=>{
        const one=gameBoard.getItem(0)
        const two=gameBoard.getItem(1)
        const third=gameBoard.getItem(2)
        const four=gameBoard.getItem(3)
        const five=gameBoard.getItem(4)
        const six=gameBoard.getItem(5)
        const seven=gameBoard.getItem(6)
        const eight=gameBoard.getItem(7)
        const nine=gameBoard.getItem(8)


        if(one==symbol && two==symbol && third==symbol)
            return true;
        if(four==symbol && five==symbol && six==symbol)
            return true;
        if(seven==symbol && eight==symbol && nine==symbol)
            return true;
        if(one==symbol && five==symbol && nine==symbol)
            return true;
        if(two==symbol && five==symbol && eight==symbol)
            return true;
        if(third==symbol && five==symbol && seven==symbol)
            return true;
        if(one==symbol && four==symbol && seven==symbol)
            return true;
        if(third==symbol && five==symbol && nine==symbol)
            return true
        if(third==symbol && six==symbol && nine==symbol)
            return true
        if(one==symbol && four==symbol && seven==symbol)
            return true
        return false
    }

    const isFull = ()=>{
        for(let i=0;i<10;i++)
        {
            if(gameBoard.getItem(i)=="")
                return false
        }
        return true
    }
    return {getSign,isFull,isWinning,changeSign}
    
})()