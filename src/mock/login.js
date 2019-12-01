import { getParams } from '@/libs/util'
const ACCESS_LIST = ['components', 'count_to_page', 'drag_list_page', 'drag_drawer_page', 'tables_page', 'editor_page', 'excel', 'upload-excel', 'export-excel', 'directive', 'directive_page', 'multilevel', 'level_2_1', 'level_2_2', 'level_2_2_1', 'level_2_2_2', 'level_2_3']

const USER_MAP = {
  super_admin: {
    name: 'super_admin',
    user_id: '1',
    access: ['super_admin'],
    token: 'super_admin',
    avator: 'https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png'
  },
  admin: {
    name: 'admin',
    user_id: '2',
    access: ['admin'],
    token: 'admin',
    avator: 'https://avatars0.githubusercontent.com/u/20942571?s=460&v=4'
  }
}

export const login = req => {
  req = JSON.parse(req.body)
  // console.log(req)
  return { token: USER_MAP[req.userName].token, code: 200 }
}

export const getUserInfo = req => {
  const params = getParams(req.url)
  return USER_MAP[params.token]
}

export const getUserInfo1 = req => {
  const params = getParams(req.url)
  // console.log(getParams(req.url));

  USER_MAP[params.token]['accessList'] = params.token === 'super_admin' ? ACCESS_LIST : ACCESS_LIST.splice(0, 11)
  USER_MAP[params.token]['access'] = []
  return USER_MAP[params.token]
}
export const logout = req => {
  return { code: 200 }
}
