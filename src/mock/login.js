//引入mockjs
import Mock from 'mockjs';
const data = Mock.mock("/login", {
  Message: {
    "status": "success",
    "user":{name:"Admin"},
    "message": "登陆成功",
    "token":"aaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  }
})
export default data
