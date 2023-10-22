<template>
<div class="tableBar">
  <div class="left">
<!--    左侧-->
    <el-icon @click="changeicon" class="icon">
<!--      compoent动态渲染组件-->
      <component :is="useStore.font?'Fold':'Expand'"></component>
    </el-icon>
    <el-breadcrumb :separator-icon="'ArrowRight'" class="brade">
      <el-breadcrumb-item v-for="item in $router.matched" :key="item.index" v-show="item.meta.title!='layout'">{{item.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div class="right">
    <el-button :icon="'Refresh'" circle @click="updataReflsh" />
    <el-button :icon="'FullScreen'" circle @click="fullScorll"/>
    <el-button :icon="'Setting'" circle />
    <img style="border-radius: 50%" :src="imgUrl">
    <el-dropdown trigger="click" style="cursor: pointer;">
    <span class="el-dropdown-link">
      {{ userStore.users.nickname }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="$route.push('/person')">个人中心</el-dropdown-item>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</div>
</template>

<script lang="ts" setup>
//定义是否折叠
import {onMounted, reactive, ref, watch} from "vue";
import uselayoutStore from "@/store/tableBar/index"
import {useRoute,useRouter} from "vue-router"
import userUserStore from "@/store/userStore/userStore";

let useStore = uselayoutStore()
let userStore = userUserStore()
let $router = useRoute()
let $route = useRouter()
let imgUrl = ref('')
//获取个人头像
const getusers = async()=>{
  let res = await import ('../../../../../Api_service/api_service/uploads/'+userStore.users.header)
  imgUrl.value = res.default
}
getusers()
watch(()=>userStore.users.header,()=>{
  getusers()
})
const changeicon = ()=>{
  useStore.font = !useStore.font
}

const updataReflsh = ()=>{
  useStore.refash = !useStore.refash
}

const logout=()=>{
  localStorage.removeItem('token')
  $route.push('/')
}
//全屏,js自带
const fullScorll = ()=>{
  let full = document.fullscreenElement
  if (!full) {
    document.documentElement.requestFullscreen()
  }else{
    document.exitFullscreen()
  }
}
</script>

<style scoped lang="scss">
.tableBar{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left{
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 20px;
    .brade{
      margin-left: 20px;
    }
    .icon{
      cursor: pointer;
    }
  }
  .right{
    display: flex;
    align-items: center;
    img{
      width: 30px;
      height: 30px;
      margin: 0 10px;
    }
  }
}
</style>