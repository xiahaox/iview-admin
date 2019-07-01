import {
  login,
  logout,
  getUserInfo,
  addUser,
  passUser,
  selectUserById,
  modifyUser,
  modifyUserr,
  deleteUser,
  enableUser,
  checkPassword,
  getRoleList
} from '@/api/user';
import { setToken, getToken } from '@/libs/util';
import { getRegionList } from '../../api/user';

export default {
  namespaced: true,

  state: {
    nickName: '',
    userId: '',
    avatorImgPath: '',
    token: getToken(),
    access: '',
    hasGetInfo: false,
    datalist: [],
    loadingData: false
  },

  mutations: {
    setAvator(state, avatorPath) {
      state.avatorImgPath = avatorPath;
    },

    setUserId(state, id) {
      state.userId = id;
      window.localStorage.setItem('userId', id);
    },

    setUserName(state, name) {
      state.nickName = name;
      window.localStorage.setItem('nickName', name);
    },

    setHasGetInfo (state, status) {
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

    setToken(state, token) {
      state.token = token;
      setToken(token);
    },

    saveDataList(state, payload) {
      state.datalist = payload;
    },

    changeLoading(state, payload) {
      state.loadingData = payload;
    }
  },

  actions: {
    // 登录
    handleLogin({ commit }, { userName, password }) {
      // nickName = userName.trim();
      console.log(userName)
      return new Promise((resolve, reject) => {
        login({
          userName,
          password
        })
          .then(res => {
            // const { code, data } = res.data;
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
    getUserInfo ({ state, commit }) {
      return new Promise((resolve, reject) => {
        try {
          getUserInfo(state.token).then(res => {
            const data = res.data
            console.log(data);
        
            commit('setAvator', data.avator)
            commit('setUserName', data.name)
            commit('setUserId', data.user_id)
            commit('setAccess', data.access)
            commit('setHasGetInfo', true)
            resolve(data)
          }).catch(err => {
            reject(err)
          })
        } catch (error) {
          reject(error)
        }
      })
    },

    // 添加用户
    async add({ state, commit }, payload) {
      commit('changeLoading', true);
      const res = await addUser(payload);
      commit('changeLoading', false);

      return res;
    },
    // 设置密码
    async password({ state, commit }, payload) {
      commit('changeLoading', true);
      const res = await passUser(payload);
      commit('changeLoading', false);

      return res;
    },
    // 根据id查询数据
    async getInfo({ state, commit }, payload) {
      commit('changeLoading', true);
      const res = await selectUserById(payload);
      commit('changeLoading', false);

      return res;
    },

    // 修改用户
    async modifyUserInfo({ state, commit }, payload) {
      commit('changeLoading', true);
      const res = await modifyUser(payload);
      commit('changeLoading', false);

      return res;
    },

    // 删除用户
    async delete({ state, commit }, payload) {
      commit('changeLoading', true);
      const res = await deleteUser(payload);
      commit('changeLoading', false);

      return res;
    },
    // 启用/停用用户
    async enable({ state, commit }, payload) {
      commit('changeLoading', true);
      const res = await enableUser(payload);
      commit('changeLoading', false);

      return res;
    },
    // 检查密码
    async checkPass({ state, commit }, payload) {
      const res = await checkPassword(payload);
      return res;
    },

    /* 修改密码 */
    async modifyPass({ state, commit }, payload) {
      const res = await modifyUserr(payload);
      return res;
    },

    // 角色列表
    async getRole({ state, commit }, payload) {
      const res = await getRoleList(payload);
      return res;
    },

    // 区划列表
    async getRegion({ state, commit }, payload) {
      const res = await getRegionList(payload);
      return res;
    }
  }
};
