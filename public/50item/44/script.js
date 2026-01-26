const range = document.getElementById('range')
range.addEventListener('input', (e) => {

    const value = e.target.value;
    // nextElementSibling 返回指定元素之后的下一个兄弟元素
    const label = e.target.nextElementSibling;
    // getComputedStyle 获取指定元素的所有 CSS 样式 
    //getPropertyValue 方法返回指定的 CSS 属性的值

    const range_width = getComputedStyle(e.target).getPropertyValue('width');
    const label_width = getComputedStyle(label).getPropertyValue('width');
    // substring(star,stop) 方法用于提取字符串中介于两个指定下标之间的字符
    //star 必须输入 是一个整数 不能是负数 规定要提取的子串的第一个字符在 stringObject 中的位置
    //  stop 可选。一个非负的整数，比要提取的子串的最后一个字符在 stringObject 中的位置多 1。
    // 如果省略该参数， 那么返回的子串会一直到字符串的结尾。
    // 截取时候不包括后面的下标 例如 截取下标0,3 只截取0,1,2的值
    // += var a+=1 a= a+1 运算    =+ 把字符串的 转化成数值 
    const num_width = +range_width.substring(0, range_width.length - 2);
    const num_label_width = +label_width.substring(0, label_width.length - 2);

    const max = +e.target.max;
    const min = +e.target.min;

    const left = value * (num_width / max) - num_label_width / 2 + scale(value, min, max, 10, -10)
    label.style.left = `${left}px`

    label.innerHTML = value


})

//  number 这个值输入，在 inmin,inmax这里面取数，把outmin outmax 这个里面的值输出


function scale(number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}