const testimonialContainer = document.querySelector('.testimonial-container')
const testimonial = document.querySelector('.testimonial')
const userImage = document.querySelector('.user-image')
const username = document.querySelector('.username')
const role = document.querySelector('.role')

const testimonials = [{
        name: '小行星',
        position: '主播',
        photo: 'https://tupian.qqw21.com/article/UploadPic/2020-6/20206416212275003.jpg',
        text: '我是乔木 这是我的星期几 我不知道 希望大家能够一起学会这个47个项目 欢迎大家加入交流群 交流'

    },
    {
        name: '小行星2',
        position: '主播2',
        photo: 'https://tupian.qqw21.com/article/UploadPic/2020-6/20206416212275003.jpg',
        text: '2我是乔木 这是我的星期几 我不知道 希望大家能够一起学会这个47个项目 欢迎大家加入交流群 交流'

    },
    {
        name: '小行星3',
        position: '主播3',
        photo: 'https://tupian.qqw21.com/article/UploadPic/2020-6/20206416212275003.jpg',
        text: '3我是乔木 这是我的星期几 我不知道 希望大家能够一起学会这个47个项目 欢迎大家加入交流群 交流'

    },
    {
        name: '小行星4',
        position: '主播4',
        photo: 'https://tupian.qqw21.com/article/UploadPic/2020-6/20206416212275003.jpg',
        text: '4我是乔木 这是我的星期几 我不知道 希望大家能够一起学会这个47个项目 欢迎大家加入交流群 交流'

    },
    {
        name: '小行星5',
        position: '主播5',
        photo: 'https://tupian.qqw21.com/article/UploadPic/2020-6/20206416212275003.jpg',
        text: '5我是乔木 这是我的星期几 我不知道 希望大家能够一起学会这个47个项目 欢迎大家加入交流群 交流'

    },
    {
        name: '小行星6',
        position: '主播6',
        photo: 'https://tupian.qqw21.com/article/UploadPic/2020-6/20206416212275003.jpg',
        text: '6我是乔木 这是我的星期几 我不知道 希望大家能够一起学会这个47个项目 欢迎大家加入交流群 交流'

    },
]

let idx = 1

function updateTestimonial() {

    const {
        name,
        position,
        photo,
        text
    } = testimonials[idx]

    testimonial.innerHTML = text
    userImage.src = photo
    username.innerHTML = name
    role.innerHTML = position

    idx++


    if (idx > testimonials.length - 1) {
        idx = 0
    }

}

setInterval(updateTestimonial, 10000);