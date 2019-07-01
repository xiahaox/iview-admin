<style lang="less">
@import './login.less';
</style>

<template>
  <div class="login">
    <!-- <div class="topfont">地方门户管理平台</div> -->
    <img class="leftImg" src="../../assets/images/leftImg.png" alt>
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false" style="height:280px">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">输入任意用户名和密码即可</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form';
import { mapActions } from 'vuex';
export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions({
      handleLogin: 'user/handleLogin'
    }),
    ...mapActions({
      getUserInfo: 'user/getUserInfo'
    }),
    handleSubmit ({ userName, password }) {
      this.handleLogin({ userName, password }).then(res => {
        // console.log(11);
        
        this.getUserInfo().then(res => {
          this.$router.push({
            name: this.$config.homeName
          })
        })
      })
    }
  }
};
</script>

<style>
.login {
  padding-top: 40px;
}
.topfont {
  font-size: 30px;
  text-align: center;
  color: white;
  /* margin-top: 20px; */
}
.leftImg {
  height: 280px;
  position: absolute;
  right: 50%;
  top: 50%;
  transform: translateY(-60%);
  margin-right: -3px;
}
.login-con {
  right: 50%;
  margin-right: -300px;
}
</style>
