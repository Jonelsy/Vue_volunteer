<template>
  <div id="UserGroup">
    <el-row :gutter="20">
      <el-col :span="8" :offset="1">
        <div class="grid-content1 bg-purple">
          <el-upload
              class="avatar-uploader"
              action="#"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload">
            <div class="demo-type">
              <el-image style="width: 200px; height: 200px"
                        :src="imgUrl"
              />
            </div>
          </el-upload>
          <div style="margin-top: 10px;margin-bottom: 10px">
            {{ useUser.users.nickname }}
          </div>
          <el-tag type="success">点击头像更换新头像</el-tag>
          <div class="cards">
            <div style="margin-left: auto;margin-right: auto;background: #f4f4f5;padding: 15px;margin-top: -25px">
              信息绑定
            </div>
            <div style="margin-top: 10px;margin-bottom: 10px">
              邮箱：{{ useUser.users.email }}
            </div>
            <div style="margin-top: 30px;margin-bottom: 20px">

            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="14"><div class="grid-content bg-purple">
        <el-form :model="data.ruleForm" :rules="rules" ref="ruleForm"  class="demo-ruleForm">
          <el-form-item label="昵称" prop="name">
            <el-input v-model="data.ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="用户名" prop="username">
            <el-input v-model="data.ruleForm.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="data.ruleForm.email"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="submitForm()">立即更改</el-button>
      </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import {watch, reactive, ref} from "vue";
import userUserStore from '@/store/userStore/userStore'
import {uploadFile} from "@/api/file/file";
import {ElMessage} from "element-plus";
import {updataStudent} from "@/api/student";
import {updateUser} from "@/api/user";

let useUser = userUserStore()
const data = reactive<dataType>({
  ruleForm:{
    name:'',
    email:'',
    header:'',
    username:'',
    id:null,
  },
})
interface dataType{
  ruleForm: {
    name?: string,
    email?: string,
    header?: string,
    username?: string,
    id?: null | number,
  }
}
//表单检验规则
const rules = {
  name: [
    { required: true, message: '昵称不能为空', trigger: 'blur' },
  ],
  email: [
    { required: true, message: '邮箱不能为空', trigger: 'blur' },
  ],
}
let imgUrl = ref('')
//获取个人头像
const getusers = async()=>{
  let res = await import ('../../../../../Api_service/api_service/uploads/'+useUser.users.header)
  imgUrl.value = res.default
  data.ruleForm.name = useUser.users.nickname
  data.ruleForm.email = useUser.users.email
  data.ruleForm.username = useUser.users.username
  data.ruleForm.header = useUser.users.header
  data.ruleForm.id = useUser.users.id
}
getusers()
watch(()=>useUser.users.header,()=>{
  getusers()
})
//修改用户信息
let ruleForm = ref()
const submitForm = ()=>{
  ruleForm.value.validate().then(()=>{
    //更新用户
    let params:any = {
      nickname:data.ruleForm.name,
      email:data.ruleForm.email,
      id:data.ruleForm.id,
      header:data.ruleForm.header
    }
    updateUser(params).then(res=>{
      ElMessage.success(res.data.mes)
      //调用仓库获取个人信息
      useUser.userinfos(Number(data.ruleForm.id)).then((res)=>{
        useUser.users = res.data
        getusers()
      })

    })
  })
}
//上传头像
const beforeAvatarUpload = (file:any)=>{
  const formData = new FormData();
  formData.append('pic', file);
  //上传文件
  uploadFile(formData).then(res=>{
    //接受file然后调用接口
    let headerUrl = res.data.data
    //更新用户
    let params:any = {
      nickname:data.ruleForm.name,
      email:data.ruleForm.email,
      id:data.ruleForm.id,
      header:headerUrl
    }
    updateUser(params).then(res=>{
      ElMessage.success(res.data.mes)
      useUser.users.header = headerUrl
      getusers()
    })
  })
}
</script>
<style>
.bg-purple {
  background: #f4f4f5;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 600px;
  transition-duration: 0.5s
}
.grid-content1 {
  border-radius: 4px;
  min-height: 36px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 600px;
  transition-duration: 0.5s
}
.grid-content:hover{
  -webkit-box-shadow: #ccc 10px 0px 10px;
  -moz-box-shadow: #ccc 10px 0px 10px;
  box-shadow: #ccc 10px 10px 10px;
}
.cards{
  width: 95%;
  height: 200px;
  margin-top: 30px;
  border-top: 2px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.demo-type{
  transition-duration: 0.5s
}
.demo-type:hover{
  -webkit-box-shadow: #ccc 10px 10px 10px;
  -moz-box-shadow: #ccc 10px 10px 10px;
  box-shadow: #ccc 10px 10px 10px;
}
</style>