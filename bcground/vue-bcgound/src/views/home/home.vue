<template>
<div class="layout_contain">
  <div class="layout_nav" :class="{fold:useStore.font?true:false}">
    <sideNav></sideNav>
    <div class="footerRecord" :class="{fold:useStore.font?true:false}">
      <el-link href="https://beian.miit.gov.cn/" :underline="false" target="_blank">备案号:蒙ICP备2023001811号</el-link>
    </div>
  </div>
  <div class="layout_header" :class="{fold:useStore.font?true:false}">
    <tableBar></tableBar>
  </div>
  <div class="layout_main" :class="{fold:useStore.font?true:false}">
    <keep-alive>
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" v-if="flag" />
        </transition>
      </router-view>
    </keep-alive>
  </div>
</div>
</template>

<script lang="ts" setup>
import sideNav from "@/views/layout/sideNav.vue"
import tableBar from "@/views/layout/tableBar.vue"
import uselayoutStore from "@/store/tableBar/index";
import userUserStore from "@/store/userStore/userStore";
import {nextTick, onMounted, ref, watch} from "vue";
let useStore = uselayoutStore()
let useruserstore = userUserStore()
//获取仓库用户信息
let user = useruserstore.users
let flag = ref(true)
//监听仓库刷新是否变化
watch(()=>useStore.refash,()=>{
  flag.value=false
  nextTick(()=>{
    flag.value=true
  })
})

const setupUser = ()=>{
  //定义自动获取用户信息
  useruserstore.userinfos(Number(localStorage.getItem('userId'))).then(res=>{
    useruserstore.users = res.data
    useruserstore.users.header = res.data.header
    localStorage.removeItem('userId')
    localStorage.setItem('userId', res.data.id)
  })
}
setupUser()
</script>

<style scoped lang="scss">
.layout_contain{
  width: 100%;
  height: 100vh;
  .layout_nav{
    width: $layout_nav_width;
    height: 100vh;
    background-color: $layout_nav_color;
    transition: all 0.5s;
    z-index: 9999;
  }
  .fold{
    width: $layout_nav_small;
  }
  .layout_header{
    width: calc(100% - $layout_nav_width);
    height: $layout_header_heigth;
    position: fixed;
    color: black;
    top: 0;
    left: $layout_nav_width;
    background-image: linear-gradient(to right, #d4e9f5, #5c95bd, #b9e7f1);
    transition: all 0.5s;
    &.fold{
      width: calc(100vw - $layout_nav_small);
      left:$layout_nav_small
    }
  }
  .layout_main{
    top: $layout_header_heigth;
    left: $layout_nav_width;
    position: absolute;
    width: calc(100% - $layout_nav_width);
    height: calc(100vh - $layout_header_heigth);
    padding: 20px;
    overflow: auto;
    box-sizing: border-box;
    transition: all 0.5s;
    &.fold{
      width: calc(100vw - $layout_nav_small);
      left:$layout_nav_small
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  opacity: 1;
  transition: 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transition: 0.5s;
  position: absolute;
}
.footerRecord{
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 260px;
  transition: all 0.5s;
  opacity: 1;
  &.fold{
    opacity: 0;
    width: 260px;
    }
}
</style>