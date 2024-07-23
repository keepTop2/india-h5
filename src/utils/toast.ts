// import success from '/@/assets/icon/toast_success.png'
/**
 * @author 阿虹
 * @param text 文案
 * @param icon 图标
 * @param time 存在时间
 */

type ICON = "success" | "fail"

const Toast = (text: number | string, icon?: ICON, time = 1.5) => {

    let toastTimeout: ReturnType<typeof setTimeout> | null = null; // 用于存储定时器的引用
    // 销毁定时器
    if (toastTimeout) {
        clearTimeout(toastTimeout);
    }

    // 检查是否存在现有的提示框，如果存在则移除
    const successToast = document.querySelector('.success_toast');
    if (successToast) {
        successToast.remove();
    }

    // 创建容器
    const div: HTMLDivElement = document.createElement('div')
    div.className = "success_toast"
    // 创建二级容器
    const toastContainer: HTMLDivElement = document.createElement('div')
    toastContainer.className = "success_toast_container"
    // 创建img
    // if (icon) {
    //     if (icon == 'success') {
    //         icon = success
    //     } else if (icon == 'fail') {
    //         // icon = success
    //     }
    //     const img = document.createElement('img')
    //     img.src = icon
    //     img.className = 'success_toast_icon'
    //     toastContainer.appendChild(img)
    // }
    //创建文本span
    const span = document.createElement('div')
    span.className = 'success_toast_text'
    span.innerHTML = text as string
    toastContainer.appendChild(span)
    div.appendChild(toastContainer)

    document.body.appendChild(div)
    toastTimeout = setTimeout(() => {
        div.remove()
    }, time * 1000)
}

export default Toast