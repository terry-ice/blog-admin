/*
 * @Author: terry
 * @Date: 2019-06-19 18:02:46
 * @Last Modified by:   https://github.com/terry-ice
 * @Last Modified time: 2019-06-19 18:02:46
 */

module.exports = {
  client: {
    service: {
      name: 'my-blog',
      // GraphQL API 的 URL
      url: 'http://localhost:4000'
    },
    // 通过扩展名选择需要处理的文件
    includes: ['src/**/*.vue', 'src/**/*.ts']
  }
}
