import faceArray from './faceArray'
import Vue from 'vue'
export const facesMap = {}
faceArray.forEach(function (item, index) {
  facesMap[item] = process.env.BASE_URL + 'face/' + index + '.gif'
})
// 转换内容
export function transferMessage(content) {
  content = (content || '')
    .replace(/&(?!#?[a-zA-Z0-9]+;)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, '&#39;')
    .replace(/"/g, '&quot;') //XSS
    .replace(/@(\S+)(\s+?|$)/g, '@<a href="javascript:;">$1</a>$2') //转义@

    .replace(/face\[([^\s[\]]+?)\]/g, function (face) {
      //转义表情
      var alt = face.replace(/^face/g, '')
      return (
        '<img alt="' +
        alt +
        '" title="' +
        alt +
        '" src="' +
        facesMap[alt] +
        '">'
      )
    })
    .replace(/img\[([^\s]+?)\]/g, function (img) {
      //转义图片
      img = img.replace(/(^img\[)|(\]$)/g, '')
      return '<img crossorigin="*" class="vchat-img" src="' + img + '">'
    })
    .replace(/file\([\s\S]+?\)\[[\s\S]*?\]/g, function (str) {
      //转义文件
      var href = (str.match(/file\(([\s\S]+?)\)\[/) || [])[1]
      var text = (str.match(/\)\[([\s\S]*?)\]/) || [])[1]
      if (!href) return str
      return (
        '<a class="vchat-img" href="' +
        href +
        '" download target="_blank"><cite>' +
        (text || href) +
        '</cite></a>'
      )
    })

    .replace(/a\([\s\S]+?\)\[[\s\S]*?\]/g, function (str) {
      //转义链接
      var href = (str.match(/a\(([\s\S]+?)\)\[/) || [])[1]
      var text = (str.match(/\)\[([\s\S]*?)\]/) || [])[1]
      if (!href) return str
      if (href.indexOf('http') != 0) {
        href = 'https://' + href
      }
      return (
        '<a class="vchat-link" href="' +
        href +
        '" target="_blank">' +
        (text || href) +
        '</a>'
      )
    })

    .replace(/\n/g, '<br>') //转义换行
  return content
}

/******************************** 指令 ********************************/
// vcScrollBottom：会话窗口，自动滚动到底部指令
// 异步将内容滚动到底部
const toBottom = (el) =>
  Vue.nextTick(() => {
    el.scrollTop = el.scrollHeight
  })
// 监听图片加载成功
const onImgLoad = (el) => (e) =>
  e.path[0].className.indexOf('vchat-img') >= 0 && toBottom(el)
// 指令对象
export const vcScrollBottom = {
  bind(el) {
    el.addEventListener('load', onImgLoad(el), true)
  },
  update: toBottom,
}
