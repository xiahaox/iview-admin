import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import store from '@/store';
// import { Spin } from 'iview'
import router from '@/router/index';
const addErrorLog = errorInfo => {
  const {
    statusText,
    status,
    request: { responseURL }
  } = errorInfo;
  let info = {
    type: 'ajax',
    code: status,
    mes: statusText,
    url: responseURL
  };
  if (!responseURL.includes('save_error_logger'))
    store.dispatch('addErrorLog', info);
};

class HttpRequest {
  constructor(baseUrl = baseURL) {
    this.baseUrl = baseUrl;
    this.queue = {};
  }
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        //
      },
      withCredentials: true
    };
    return config;
  }

  destroy(url) {
    delete this.queue[url];
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors(instance, url) {
    // 请求拦截
    instance.interceptors.request.use(
      config => {
        // 添加全局的loading...
        if (!Object.keys(this.queue).length) {
          // Spin.show() // 不建议开启，因为界面不友好
        }
        this.queue[url] = true;
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );
    // 响应拦截
    instance.interceptors.response.use(
      res => {
        this.destroy(url);
        const { data, status } = res;
        // code为301，进入登陆页面
        // console.log(res)
        // if (res.data.code == '301') {
        //   store.dispatch('user/handleLogOut');
        //   window.localStorage.removeItem('tagNaveList');
        //   window.localStorage.removeItem('nickName');
        //   window.localStorage.removeItem('userId');
        //   window.localStorage.removeItem('medicareRegionName');
        //   window.localStorage.removeItem('medicareRegionId');
        //   window.localStorage.removeItem('menuList');
        //   window.localStorage.removeItem('permissions');
        //   router.push({
        //     path: '/login'
        //   });
        // }
        return res;
      },
      error => {
        this.destroy(url);
        let errorInfo = error.response;
        if (!errorInfo) {
          const {
            request: { statusText, status },
            config
          } = JSON.parse(JSON.stringify(error));
          errorInfo = {
            statusText,
            status,
            request: { responseURL: config.url }
          };
        }
        addErrorLog(errorInfo);
        return Promise.reject(error);
      }
    );
  }
  request(options) {
    const instance = axios.create({ withCredentials: true });
    options = Object.assign(
      this.getInsideConfig({ withCredentials: true }),
      options
    );
    this.interceptors(instance, options.url);
    return instance(options);
  }
}
export default HttpRequest;
