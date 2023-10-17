<template>
<div class="container">
  <div class="title">
    <span>欢迎来到MIT性格测试页面</span>
  </div>
  <div style="display: flex;align-items: center">
    <el-checkbox v-model="checked" size="large" />
    <span>我已阅读并知悉<el-link type="primary">《MIT性格测试须知》</el-link><el-link type="primary">《用户隐私保护须知》</el-link></span>
  </div>
</div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
const checked = ref(null)
</script>

<style scoped lang="scss">
.container{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .title{
    font-size: 2rem;
    color: rgba(0, 0, 0, 0.91);
    text-shadow: 0px 6px 2px #89D5FFA6;
    font-weight: bold;
  }
}
</style>