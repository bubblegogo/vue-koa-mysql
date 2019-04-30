import request from '@/utils/request'


/*
*  feach role menu 
*/
export function feachlist(){
	return request({
	    url: '/user/get_role_menu',
	    method: 'post'
	})
}


export function feachuserlist(){
	return request({
	    url: '/user/get_user_list',
	    method: 'post'
	})
}

