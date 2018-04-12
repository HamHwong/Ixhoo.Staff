<template lang="html">
  <div id="login_container">
    <div id="login_background"></div>
    <div id="login_logo" :class="loginStatus">
      <figure>
        <img src="@/assets/logo.png">
      </figure>
      <span style="color:'#fff'">{{message}}</span>
    </div>

    <form id="login_form">
      <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
      <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
      <mt-button type="primary" size="large" @click="login" >登陆</mt-button>
    </form>
  </div>
</template>
<script>
import { Field } from "mint-ui";
import axios from "axios";
//MOCK
import login from "@/mock/login.js";
//End MOCK

export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      background_img: "",
      loginStatus: "",
      message: ""
    };
  },
  created: function() {
    this.resotre();
  },
  methods: {
    resotre() {
      this.message = "欢迎登陆Ixhoo";
    },
    login() {
      this.loginStatus = "Logining";
      axios.get("/login").then(res => {
        if ("200" != res.status) {
        }

        setTimeout(() => {
          let response = res.data.Message;
          this.username = response.user.name;
          this.message = this.username + "," + response.message;
          this.loginStatus = "Logined";
          // this.setCookie("token",this.token);
          this.getCookie("token");
          setTimeout(() => {
            this.$router.push("/helloworld");
          }, 1000);
        }, 500);
      });
    }
  }
};
</script>
  
<style scoped>
#login_container {
  display: flex;
  flex-direction: column;
  align-content: center;
}
#login_background {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  background-image: url("../assets/login_background.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100vw;
}
#login_logo {
  height: calc(50vh - 10px);
  width: 80%;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  z-index: 1;

  border-radius: 10px;
  color: #fff;
  align-self: center;
}
#login_form {
  align-self: center;
  width: 80%;
  padding-top: 5vh;
}

#login_logo.beforeLogin {
}
#login_logo.Logining {
  animation: rollOver 0.5s forwards;
}
#login_logo.Logined {
  animation: rollIn 1s forwards;
}
@keyframes rollOver {
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(90deg);
  }
}
@keyframes rollIn {
  from {
    transform: rotateY(-90deg);
  }
  to {
    transform: rotateY(0deg);
  }
}
</style>