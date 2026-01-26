const screens = document.querySelectorAll('.screen')
const choose_insect_btns = document.querySelectorAll('.choose-insect-btn');
const start_btn = document.getElementById('start-btn')
const game_container = document.getElementById('game-container')
const timeEl = document.getElementById('time')
const scoreEl = document.getElementById('score')
const message = document.getElementById('message')
const body = document.getElementById('body')


let seconds = 0
let score = 0
let seleted_insect = {}
body.addEventListener('click', () => {
    // 双击禁止选定文字
    window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
    // 一般做双击修改事件的时候禁止
})
start_btn.addEventListener('click', () => {
    console.log(1);
    screens[0].classList.add('up')
})

choose_insect_btns.forEach(btn => {

    btn.addEventListener('click', () => {
        const img = btn.querySelector('img')
        // getAttribute 获取指定属性的值
        const src = img.getAttribute('src')
        const alt = img.getAttribute('alt')

        seleted_insect = {
            src,
            alt
        }
        screens[1].classList.add('up')
        setTimeout(createInset, 1000)
        starGame()
    })


})

function starGame() {
    setInterval(increaseTime, 1000)
}

function increaseTime() {

    //  Math.floor(x) 向下取整  5.9=5 5.2=5
    // 小于等于 x 的最大整数 
    let m = Math.floor(seconds / 60)

    // % 取余 / 除号
    let s = seconds % 60

    // javascript中的三目运算符用作判断时，基本语法为: expression 表达式  ? sentence1 : sentence2当expression的值为真时执行sentence1， 否则执行 sentence2，
    m = m < 10 ? `0${m}` : m
    s = s < 10 ? `0${s}` : s
    timeEl.innerHTML = `Time:${m}:${s}`
    seconds++
}

function createInset() {
    const insect = document.createElement('div')
    insect.classList.add('insect')
    const {
        x,
        y
    } = getRandomLocation()

    insect.style.top = `${y}px`
    insect.style.left = `${x}px`

    insect.innerHTML = `
    <img src='${seleted_insect.src}' alt='${seleted_insect.alt}' style='tranform:rotate(${Math.random()*360}deg)'>
    `

    insect.addEventListener('click', catchInsect)

    game_container.appendChild(insect)

}


function getRandomLocation() {

    const width = window.innerWidth
    const height = window.innerHeight

    const x = Math.random() * (width - 200) + 100
    const y = Math.random() * (height - 200) + 100
    console.log(x, y);

    return {
        x,
        y
    }

}


function catchInsect() {

    insceaseScore()
    this.classList.add('caught')
    setTimeout(() => {

        this.remove()
    }, 2000)
    addInsects()

}

function addInsects() {
    setTimeout(createInset, 1000)
    setTimeout(createInset, 1500)

}


function insceaseScore() {
    score++
    if (score > 19) {
        message.classList.add('visible')

    }
    if (score > 30) {

        message.classList.remove('visible')
    }


    scoreEl.innerHTML = `Score:${score}`

}1234567890