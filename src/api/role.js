import axios from '@/libs/api.request';

/* 获取列表 */
export const getList = data => {
  return axios.request({
    url: 'role/list',
    params: {
      ...data
    },
    method: 'get'
  });
};

/* 新增 */
export const add = data => {
  return axios.request({
    url: 'role/addRole',
    data,
    method: 'post'
  });
};

/* 修改 */
export const modify = data => {
  return axios.request({
    url: 'role/update',
    data,
    method: 'post'
  });
};

/* 删除 */
export const del = data => {
  return axios.request({
    url: 'role/deleteRole',
    data,
    method: 'post'
  });
};
// 列举系统所有的权限项
export const powerList = () => {
  return axios.request({
    url: '/role/permission/list',
    params: {},
    method: 'get'
  });
};
