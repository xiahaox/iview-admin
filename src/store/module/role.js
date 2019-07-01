import * as role from '@/api/role';

export default {
  namespaced: true,

  state: {
    datalist: {},
    loadingData: false
  },

  actions: {
    async getList({ state, commit }, payload) {
      commit('loading', true);
      const res = await role.getList(payload);
      const { code, data } = res.data;
      if (code === 200) {
        commit('saveList', data);
        commit('loading', false);
      }
    },

    async add({ state, commit }, payload) {
      commit('loading', true);
      const res = await role.add(payload);
      const { code } = res.data;
      if (code === 200) {
        commit('loading', false);
      }

      return res;
    },

    async modify({ state, commit }, payload) {
      console.log('payload', payload);
      commit('loading', true);
      const res = await role.modify(payload);
      const { code } = res.data;
      if (code === 200) {
        commit('loading', false);
      }

      return res;
    },

    async del({ state, commit }, payload) {
      commit('loading', true);
      const res = await role.del(payload);
      const { code } = res.data;
      if (code === 200) {
        commit('loading', false);
      }
      return res;
    }
  },

  mutations: {
    saveList(state, payload) {
      state.datalist = payload;
    },
    loading(state, payload) {
      state.loadingData = payload;
    }
  }
};
