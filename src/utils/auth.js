import Cookies from 'js-cookie'
const TokenKey = 'Admin-Token'

const os = require('os');



export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getIP(){
  let localhost = ''
  try {
    let network = os.networkInterfaces()
    localhost = network[Object.keys(network)[0]][1].address
  } catch (e) {
    localhost = 'localhost'
  }
  return localhost
}
