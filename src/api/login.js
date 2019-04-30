import request from '@/utils/request'

export function login(username, password) {
	  return request({
	    url: '/login',
	    method: 'post',
	    data: {
	      username,
	      password
	    }
	})
}

export function getInfo(token) {
  return request({
    url: '/user/get_info',
    method: 'post',
    data:{
    	token
    }
  })
}

export function getRoleMenu(role){
	return request({
	    url: '/user/get_role_menu',
	    method: 'post',
	    data:{
	    	role
	    }
	})
}

export function logout(token) {
  return request({
    url: '/user/logout',
    method: 'post',
    data:{
    	token
    }
  })
}
