import XIcon from './l-icon.vue'
// 这里是重点
const xicon = {
    install: function (Vue) {
        Vue.component('XIcon', XIcon)
    }
}

// 导出组件
export default xicon;