<template>
  <div class="user-avator-dropdown">
    <span style="font-size: 16px; margin-right: 80px">欢迎您 ：  {{nickName}}</span>
    <Dropdown @on-click="handleClick">
      <!-- <Badge>
        <Avatar :src="avatar"/>
      </Badge> -->
      <!-- <Icon :size="18" type="md-arrow-dropdown"></Icon> -->
      <Icon :size="32" type="md-settings" />
      <DropdownMenu slot="list">
        <DropdownItem name="message">
          <router-link to="/personal/password">修改密码</router-link>
        </DropdownItem>
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
    
  </div>
</template>

<script>
import './user.less';
import { mapActions } from 'vuex';
import avatar from '@/assets/images/admin.jpg';
export default {
  name: 'User',
  data() {
    return {
      avatar: avatar,
      nickName: window.localStorage.getItem('nickName') || ''
    };
  },
  props: {
    userAvator: {
      type: String,
      default: ''
    }
  },
  methods: {
    ...mapActions({
      handleLogOut: 'user/handleLogOut'
    }),
    logout() {
      this.handleLogOut().then(res => {
        console.log(res);
        
        const { code } = res.data;
        if (code === 200) {
          this.$router.go(0);
          this.$Message.success('已退出登录');
          window.localStorage.removeItem('nickName');
          window.localStorage.removeItem('userId');
          window.localStorage.removeItem('menuList');
          window.localStorage.removeItem('permissions');
        } else {
          this.$Message.error('退出遇到问题~');
        }
      });
    },
    handleClick(name) {
      switch (name) {
        case 'logout':
          this.logout();
          break;
      }
    }
  }
};
</script>
