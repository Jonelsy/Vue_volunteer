//关于layout组件配置的仓库
import {defineStore} from "pinia";
let uselayoutStore = defineStore('layout',{
    state:()=>{
        return{
            font:false,
            //刷新
            refash:false,
        }
    },
    actions:{

    },
     getters:{

     }
})
export default uselayoutStore