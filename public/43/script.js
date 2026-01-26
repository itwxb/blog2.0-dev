const ratings = document.querySelectorAll('.rating');
const ratingsContainer = document.querySelector('.ratings-container');
const sendBtn = document.querySelector('#send');
const panel = document.querySelector('#panel');

let selectedRanting = '开心';


ratingsContainer.addEventListener('click', (e) => {
    // parentNode 获取元素父节点
    // console.log(e.target);
    // console.log(e.target.parentNode.classList.contains('rating'));

    //nextElementSibling 属性只返回元素节点之后的兄弟元素节点
    //  console.log(e.target.nextElementSibling);

    // previousSibling 属性返回元素节点之前的兄弟节点（包括文本节点、注释节点）；
    // previousElementSibling 属性只返回元素节点之前的兄弟元素节点（不包括文本节点、注释节点）
    if (e.target.parentNode.classList.contains('rating') && e.target.nextElementSibling) {

        removeActive();
        e.target.parentNode.classList.add('active')
        selectedRanting = e.target.nextElementSibling.innerHTML

    } else if (
        e.target.parentNode.classList.contains('rating') &&
        e.target.previousSibling &&
        e.target.previousElementSibling.nodeName === 'IMG'
    ) {

        console.log(e.target.previousElementSibling.nodeName);

        removeActive()
        e.target.parentNode.classList.add('active');
        selectedRanting = e.target.innerHtml

    }

})


sendBtn.addEventListener('click', (e) => {
    panel.innerHTML = `
    
    <i class="fas fa-heart"></i>
    <strong>谢谢反馈！</strong>
    <br>
    <strong>你的心情:${selectedRanting}</strong>
    <p>我们感谢你的反馈</p>
    `
})

function removeActive() {

    for (let i = 0; i < ratings.length; i++) {

        ratings[i].classList.remove('active')

    }
}

