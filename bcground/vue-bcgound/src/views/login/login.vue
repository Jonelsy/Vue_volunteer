<template>
  <div id="login" ref='vantaRef' style="width: 100%;height: 100vh">
    <div class="card">
      <h5 class="card-title">用户登录</h5>
      <el-form ref="loginForms" :model="loginForm" :rules="rules" class="demo-ruleForm" label-position="top">
        <el-form-item label="账号" prop="username">
          <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input :prefix-icon="Lock" type="password" v-model="loginForm.password" show-password></el-input>
        </el-form-item>
        <!--        <el-form-item label="身份" prop="resource">-->
        <!--          <el-radio-group v-model="loginForm.type">-->
        <!--            <el-radio label="管理员"></el-radio>-->
        <!--            <el-radio label="用户"></el-radio>-->
        <!--          </el-radio-group>-->
        <!--        </el-form-item>-->
        <el-form-item label="人机验证：" prop="verify">
          <el-button type="success" v-if="loginForm.verify == false" plain style="width: 100%;"
            @click="data.dialogTableVisible = true">点我进行人机验证</el-button>
          <el-button type="success" v-else plain style="width: 100%;" :icon="'Check'" />
        </el-form-item>
        <el-form-item>
          <div class="formButton">
            <el-button :loading="loading" type="primary" @click="loginSub">登录</el-button>
            <el-button @click="$router.push('/signin')">注册</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog v-model="data.dialogTableVisible" title="人机验证" width="450">
      <div style="display: flex;justify-content: center;align-items: center">
        <SliderVerify :imgUrl="data.sliderVConf.imgUrl" :sText="data.sliderVConf.sText" :eText="data.sliderVConf.eText"
          v-model:isShowSelf="data.sliderVConf.isShowSelf" :isBorder="data.sliderVConf.isBorder"
          :isParentNode="data.sliderVConf.isParentNode" :isCloseBtn="data.sliderVConf.isCloseBtn"
          :isReloadBtn="data.sliderVConf.isReloadBtn" :width="data.sliderVConf.width" :height="data.sliderVConf.height"
          @reload="emitChange('reload')" @show="emitChange('show')" @hide="emitChange('hide')"
          @close="emitChange('close')" @success="emitChange('success')" @fail="emitChange('fail')"></SliderVerify>
      </div>
    </el-dialog>
    <div class="footerRecord">
      <el-link href="https://github.com/Jonelsy" :underline="false" target="_blank">Github:jonelsy&&何小雨</el-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { User, Lock } from "@element-plus/icons-vue"
import { reactive, ref } from "vue";
//引入element提示
import { ElMessage } from "element-plus";
//引入自定义时间监视
import { getTime } from "@/views/utils/getTime"
//引入pinia
import useUserStore from "@/store/userStore/userStore"
//引入router
import { useRouter } from "vue-router"
let $router = useRouter()
let userStore = useUserStore()

//收集账号密码
let loginForm = reactive({
  username: 'admin',
  password: 'admin',
  verify: false,
})
const data = reactive({
  dialogTableVisible: false,
  sliderVConf: {
    imgUrl: 'https://img1.baidu.com/it/u=2275056982,1506045372&fm=253&fmt=auto&app=138&f=JPEG?w=510&h=300',
    sText: '验证成功',
    eText: '验证失败，请重试',
    isShowSelf: true,
    isBorder: true,
    isParentNode: true,
    isCloseBtn: false,
    isReloadBtn: true,
    width: 390,
    height: 290,
  }
})
let loginForms = ref()
//滑动验证码表单校验
const validatverify = (rule: any, value: any, callback: any) => {
  if (loginForm.verify === false) {
    callback(new Error('请完成人机验证'))
  } else {
    callback()
  }
}
//表单检验规则
const rules = {
  username: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
  ],
  verify: [
    { required: false, validator: validatverify },
  ],
}
let loading = ref(false)
//登录
const loginSub = async () => {
  loginForms.value.validate().then(() => {
    loading.value = true
    //调用仓库方法
    userStore.loginSub(loginForm).then((res: any) => {
      loading.value = false
      let message = getTime()
      $router.push('/index')
      ElMessage({
        type: 'success',
        message: `Hi，${message}好，欢迎回来`
      })
      loading.value = false
    }).catch((error: any) => {
      ElMessage({
        type: 'error',
        message: error.data.mes
      })
      loading.value = false
    })
  }).catch(() => {
    ElMessage({
      type: 'error',
      message: '表单有误'
    })
    loading.value = false
  })
}
//滑动验证校验
const emitChange = (type: string) => {
  if (type === 'success') {
    data.dialogTableVisible = false
    loginForm.verify = true
    ElMessage.success('验证通过')
  }
}

</script>

<style scoped lang="scss">
body #login {
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
}

#login {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #E5EEFDFF;
  
}

.card {
  width: 50vh;
  height: 550px;
  display: flex;
  flex-direction: column;
  align-items: center;
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  background-color: #ffffff;
  transition: all 0.35s;
  overflow-y: auto;

  .card-title {
    margin: 30px 0px;
  }
}

.card:hover {
  -webkit-box-shadow: 15px 15px 10px 15px rgba(20, 20, 20, 0.15);
  -moz-box-shadow: 15px 15px 10px 15px rgba(20, 20, 20, 0.15);
  box-shadow: 15px 15px 10px 15px rgba(20, 20, 20, 0.15);
}

.card-title {
  font-size: 20px;
  color: #000000;
}

.demo-ruleForm {
  width: 80%;
}

.formButton {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

}

.el-button {
  margin: 10px 0;
  width: 80%;
}
.footerRecord{
  position: absolute;
  bottom: 0;
}
</style>