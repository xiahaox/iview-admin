import {
  login,
  logout,
  getUserInfo,
  getUserInfo1
} from '@/api/user';
import { setToken, getToken } from '@/libs/util';

export default {
  namespaced: true,

  state: {
    nickName: '',
    userId: '',
    avatorImgPath: '',
    token: getToken(),
    access: '',
    accessList: [],
    hasGetInfo: false
  },

  mutations: {
    setAvator(state, avatorPath) {
      state.avatorImgPath = avatorPath;
    },

    setUserId(state, id) {
      state.userId = id;
    },

    setUserName(state, name) {
      state.nickName = name;
    },

    setHasGetInfo(state, status) {
      state.hasGetInfo = status
    },

    // setMedicareRegionId(state, id) {
    //   window.localStorage.setItem('medicareRegionId', id);
    // },
    // setPermissions(state, permissions) {
    //   window.localStorage.setItem('permissions', permissions);
    // },
    setAccess(state, access) {
      state.access = access;
    },
    setAccessList(state, accessList) {
      state.accessList = accessList
    },
    setToken(state, token) {
      state.token = token;
      setToken(token);
    }

  },

  actions: {
    // 登录
    handleLogin({ commit }, { userName, password }) {
      // nickName = userName.trim();
      // console.log(userName)
      return new Promise((resolve, reject) => {
        login({
          userName,
          password
        })
          .then(res => {
            const data = res.data
            // console.log(res.data)
            commit('setToken', data.token)
            resolve()
          })
          .catch(err => {
            reject(err);
          });
      })
    },

    // 退出登录
    handleLogOut({ state, commit }) {
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(res => {
            // const { code } = res.data;
            commit('setToken', '');
            commit('setAccess', [])
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },

    // 获取用户相关信息
    getUserInfo({ state, commit }) {
      return new Promise((resolve, reject) => {
        try {
          getUserInfo(state.token).then(res => {
            const data = res.data
            commit('setAvator', data.avator)
            commit('setUserName', data.name)
            commit('setUserId', data.user_id)
            commit('setAccess', data.access)
            commit('setAccessList', data.accessList)
            commit('setHasGetInfo', true)
            resolve(data)
          }).catch(err => {
            reject(err)
          })
        } catch (error) {
          reject(error)
        }
      })
    }
  }
};
