<template>
  <div class="user-avator-dropdown">
    <span style="font-size: 16px; margin-right: 80px">欢迎您 ： {{nickName}}</span>
    <Dropdown @on-click="handleClick">
      <Badge>
        <Avatar :src="userAvator" />
      </Badge>
      <Icon :size="18" type="md-arrow-dropdown"></Icon>
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
import { mapActions, mapState } from 'vuex';
export default {
  name: 'User',
  data() {
    return {};
  },
  props: {
    userAvator: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapState({
      nickName: state => state.user.nickName
    })
  },
  methods: {
    ...mapActions({
      handleLogOut: 'user/handleLogOut'
    }),
    logout() {
      this.handleLogOut().then(res => {
        const { code } = res.data;
        if (code === 200) {
          this.$router.go(0);
          this.$Message.success('已退出登录');
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
