<template>
<div class="header">
  <div class="images">
    <img src="../../assets/logo.png">
  </div>
  <div class="title">
    <h1>高考志愿填报辅助系统</h1>
  </div>
</div>
  <el-scrollbar class="scrollNav">
    <el-menu
        class="el-menu-vertical-demo"
        background-color="#001529"
        text-color="white"
        router
        :default-active="$route.path"
        :collapse="useStore.font?true:false"
    >
      <el-menu-item index="/index">
        <el-icon><House/></el-icon>
        <template #title><span>首页</span></template>
      </el-menu-item>
      <el-menu-item index="/user">
        <el-icon><User/></el-icon>
        <template #title><span>用户管理</span></template>
      </el-menu-item>
      <el-sub-menu index="1">
        <template #title>
          <el-icon><Avatar/></el-icon>
          <span>学生管理</span>
        </template>
          <el-menu-item index="/student/studentList"><el-icon><Tickets/></el-icon>我的学生</el-menu-item>
          <el-menu-item index="/onebyone"><el-icon><DocumentCopy /></el-icon>一对一方案制定</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="/school">
        <el-icon><School/></el-icon>
        <template #title><span>院校查询</span></template>
      </el-menu-item>
      <el-menu-item index="/mitList">
        <el-icon><DataAnalysis/></el-icon>
        <template #title><span>性格测试</span></template>
      </el-menu-item>
    </el-menu>
  </el-scrollbar>
</template>

<script  lang="ts" setup>
import {useRoute} from "vue-router";
const route = useRoute()
import uselayoutStore from "@/store/tableBar/index"
let useStore = uselayoutStore()
</script>

<style scoped lang="scss">
.header{
  width: $layout_nav_width;
  height: 60px;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .images{
    width: 30px;
    height: 30px;
  }
  .title{
    margin-left: 10px;
    h1{
      font-size:20px;
      font-weight:800
    }
  }
}
img{
  width: 100%;
  height: 100%;
}
.scrollNav{
  height:calc(100vh - 60px) ;
  width: 100%;
  .el-menu{
    border-right: none;
    width: 100%;
  }
}
</style>