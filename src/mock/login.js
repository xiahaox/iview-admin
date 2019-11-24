import { getParams } from '@/libs/util'
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
  console.log(req)
  const params = getParams(req.url)
  console.log(params);
  
  return USER_MAP[params.token]
}

export const logout = req => {
  return { code: 200 }
}