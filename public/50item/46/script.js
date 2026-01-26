const quizData = [{
        question: '你喜欢小明还是小红 ?',
        a: "小红",
        b: "小明",
        c: "乔木",
        d: '不喜欢',
        correct: 'a'
    }, {
        question: '2你喜欢小明还是小红 ?',
        a: "小红",
        b: "小明",
        c: "乔木",
        d: '不喜欢',
        correct: 'b'
    },
    {
        question: '3你喜欢小明还是小红 ?',
        a: "小红",
        b: "小明",
        c: "乔木",
        d: '不喜欢',
        correct: 'c'
    },

    {
        question: '4你喜欢小明还是小红 ?',
        a: "小红",
        b: "小明",
        c: "乔木",
        d: '不喜欢',
        correct: 'd'
    },
];

const quiz = document.getElementById('quiz');
const answerEls = document.querySelectorAll('.answer')
const questionEL = document.getElementById('question')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
const submitBtn = document.getElementById('submit')

let currentQuiz = 0
let score = 0

loadQuiz()

function loadQuiz() {

    deselectAnswers()
    const currentQuizData = quizData[currentQuiz]

    questionEL.innerText = currentQuizData.question
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d


}

function deselectAnswers() {
    answerEls.forEach(answerEl => {

        answerEl.checked = false

    })
}

function getSelected() {
    let answer;

    answerEls.forEach(answerEl => {

        if (answerEl.checked) {

            answer = answerEl.id

        }

    })

    return answer;
}

submitBtn.addEventListener('click', () => {
    const answer = getSelected()

    if (answer) {
        if (answer === quizData[currentQuiz].correct) {
            score++
        }
        currentQuiz++
        console.log(currentQuiz);

        if (currentQuiz < quizData.length) {
            loadQuiz()
        } else {
            quiz.innerHTML = `
            <h2>你答对了${score}/${quizData.length}个问题</h2>
            
        <button onclick="location.reload()">重新加载</button>
            `
        }
    }
})