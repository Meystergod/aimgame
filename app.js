const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timer = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['white', 'burlywood', 'pink', 'lightcoral', 'coral', 'chocolate']
let time = 0
let score = 0

startBtn.addEventListener('click', (event) => 
{
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', (event) => 
{
    if (event.target.classList.contains('time-btn')) 
    {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', (event) => 
{
    if (event.target.classList.contains('circle'))
    {
        board.style.border = `none`
        score++
        event.target.remove()
        createCircle()
    }
    else
    {
        if (time > 0)
        {
            board.style.border = `2px solid red`
            setTimeout(() => board.style.border = '', 300)
            if (score > 0) score--
            else score = 0
        }
    }
})

function startGame() 
{
    setInterval(decreaseTime, 1000)
    createCircle()
    if (time === 60)
    {
        timer.innerHTML = `01:00`
    }
    else setTime(time)
}

function decreaseTime() 
{
    if (time === 0)
    {
        finishGame()
    } else 
    {
        let currentTime = --time
        if (currentTime < 10) 
        {
            currentTime = `0${currentTime}`
        }
        setTime(currentTime)
    }
}

function setTime(value) 
{
    timer.innerHTML = `00:${value}`
}

function finishGame()
{
    timer.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Счёт: <span class="primary">${score}</span></h1>`
}

function createCircle()
{
    const circle = document.createElement('div')
    const size = getNumber(5, 50)
    const boardSize = board.getBoundingClientRect()
    const x = getNumber(0, boardSize.width - size)
    const y = getNumber(0, boardSize.height - size)

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    circle.style.background = setColor()

    board.append(circle)
}

function getNumber(min, max)
{
    return Math.round(Math.random() * (max-min) + min)
}

function setColor()
{
    return colors[Math.floor(Math.random() * colors.length)]
}