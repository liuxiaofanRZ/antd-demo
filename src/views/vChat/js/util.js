import faceArray from './faceArray'
export const facesMap = {}
faceArray.forEach(function (item, index) {
  facesMap[item] = process.env.BASE_URL + 'face/' + index + '.gif'
})
//转换内容
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
      return '<img class="vchat-img" src="' + img + '">'
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
      if(href.indexOf('http') != 0) {
        href = "https://" +href
      }
      return '<a class="vchat-link" href="' + href + '" target="_blank">' + (text || href) + '</a>'
    })

    .replace(/\n/g, '<br>') //转义换行
  return content
}
