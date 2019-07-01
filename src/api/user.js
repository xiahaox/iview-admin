import axios from '@/libs/api.request';

export const login = ({ userName, password }) => {
  const data = {
    userName,
    password
  };
  return axios.request({
    url: 'login',
    data,
    method: 'post'
  });
};

export const logout = (token) => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}

export const getUserInfo = token => {
  return axios.request({
    url: 'get_info',
    params: {
      token
    },
    method: 'get'
  });
};

// 用户管理修改密码
export const modifyUser = data => {
  console.log(data, 'data');
  return axios.request({
    url: 'u/update',
    data,
    method: 'post',
    'Content-Type': 'application/json'
  });
};

/* 获取角色列表 */
export const getRoleList = data => {
  return axios.request({
    url: 'role/listNameAndId',
    params: {
      ...data
    },
    method: 'get'
  });
};
