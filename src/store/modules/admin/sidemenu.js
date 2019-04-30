
import {feachlist} from '@/api/admin'


const sidemenu = {
  tree_params:[],
  state: {
    menulist:[],
    rolelist:[],
  },
  mutations: {

      SET_MENU_LIST: (state, menulist) => {
          state.menulist = menulist
      },
      SET_ROLE_LIST: (state, rolelist) => {
          state.rolelist = rolelist
      }
  },
  actions: {

    //树状结构迭代
    DataFormatTree({commit,state,dispatch},params){
        try{
            params.forEach((k,v)=>{
              if(sidemenu.tree_params.length == 0){
                  sidemenu.tree_params.push(k);
                  params.shift();
                  throw "first val to treeroot";
              }else{
                
                  console.log(sidemenu.tree_params,"8888888888888888888")

              } 

            })
        }catch(e){
            console.log(e);
            dispatch('DataFormatTree',params)
        }

    },

    FeachList({ commit,state,dispatch }) {

      return new Promise((resolve, reject) => {

          feachlist().then( (reponse)=>{ 

            //reponse.data.menulist //树状结构迭代

              dispatch('DataFormatTree',reponse.data.menulist)

              //commit('SET_MENU_LIST',reponse.data.menulist);

              //commit('SET_ROLE_LIST',reponse.data.rolelist);
              resolve()
          })
          .catch(error => {
              reject(error)
          }) 
      }) 
    },





  }


}

export default sidemenu
