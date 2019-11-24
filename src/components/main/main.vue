<template>
  <Layout style="height: 100%" class="main">
    <Sider
      hide-trigger
      collapsible
      :width="256"
      :collapsed-width="64"
      v-model="collapsed"
      class="left-sider"
      :style="{overflow: 'hidden'}"
    >
      <side-menu
        accordion
        ref="sideMenu"
        :active-name="$route.name"
        :collapsed="collapsed"
        @on-select="turnToPage"
        :menu-list="menuList"
      >
        <!-- 需要放在菜单上面的内容，如Logo，写在side-menu标签内部，如下 -->
        <div class="logo-con">
          <!-- <img v-show="!collapsed" :src="minLogo" key="min-logo" /> -->
          <!-- <img v-show="collapsed" :src="minLogo" key="min-logo" /> -->
          <img v-show="collapsed" :src="minLogo" key="min-logo" />
          <div v-show="!collapsed">
            <img :src="logo" key="min-logo" />
          </div>
        </div>
      </side-menu>
    </Sider>

    <Layout>
      <Header class="header-con">
        <header-bar :collapsed="collapsed" @on-coll-change="handleCollapsedChange">
          <user :message-unread-count="unreadCount" :user-avator="userAvator" />

          <!-- <error-store
            v-if="$config.plugin['error-store'] && $config.plugin['error-store'].showInHeader"
            :has-read="hasReadErrorPage"
            :count="errorCount"
          ></error-store>-->
          <!-- <fullscreen v-model="isFullscreen" style="margin-right: 10px;"/> -->
        </header-bar>
      </Header>
      <Content class="main-content-con">
        <Layout class="main-layout-con">
          <div class="tag-nav-wrapper"></div>
          <Content class="content-wrapper">
            <keep-alive>
              <router-view />
            </keep-alive>
          </Content>
        </Layout>
      </Content>
    </Layout>
  </Layout>
</template>
<script>
import SideMenu from './components/side-menu';
import HeaderBar from './components/header-bar';
import User from './components/user';
import minLogo from '@/assets/images/logo-min.jpg';
import logo from '@/assets/images/logo.jpg';
import { mapMutations, mapActions, mapGetters } from 'vuex';
import { getNewTagList, routeEqual } from '@/libs/util';
import routers from '@/router/routers';
import './main.less';
export default {
  name: 'Main',
  components: {
    SideMenu,
    HeaderBar,
    User
  },
  data() {
    return {
      collapsed: false,
      theme: 'dark',
      minLogo,
      logo,
      isFullscreen: false
    };
  },
  computed: {
    menuList() {
      return this.$store.getters.menuList;
    },

    unreadCount() {
      return this.$store.state.user.unreadCount;
    },
    userAvator() {
      return this.$store.state.user.avatorImgPath;
    }
  },
  methods: {
    handleCollapsedChange(state) {
      this.collapsed = state;
    },
    turnToPage(route) {
      let { name, params, query } = {};
      if (typeof route === 'string') name = route;
      else {
        name = route.name;
        params = route.params;
        query = route.query;
      }
      if (name.indexOf('isTurnByHref_') > -1) {
        window.open(name.split('_')[1]);
        return;
      }
      this.$router.push({
        name,
        params,
        query
      });
    }
  },
  watch: {},
  mounted() {
    console.log(this.$store.getters.menuList);

    /**
     * @description 初始化设置面包屑导航和标签导航
     */
  }
};
</script>
<style>
.ivu-menu-item {
  background: #010813 !important;
}
.ivu-menu-submenu-title {
  background: #06152a !important;
}
</style>
