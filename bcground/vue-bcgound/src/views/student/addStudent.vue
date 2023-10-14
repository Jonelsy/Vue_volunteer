<template>
  <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      :size="formSize"
      status-icon
  >
    <el-form-item label="学生姓名" prop="stu_name">
      <el-input v-model="ruleForm.stu_name" style="width: 20%;" />
    </el-form-item>
    <el-form-item label="学生分数" prop="recore">
      <el-input v-model="ruleForm.recore" style="width: 20%;" type="number"/>
    </el-form-item>
    <el-form-item label="学生年龄" prop="stu_age">
      <el-input v-model="ruleForm.stu_age" type="number" style="width: 20%;" />
    </el-form-item>
    <el-form-item label="民族" prop="nation">
      <el-select v-model="ruleForm.nation" filterable placeholder="请选择">
        <el-option
            v-for="item in option"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="性别" prop="stu_sex">
      <el-radio-group v-model="ruleForm.stu_sex">
        <el-radio label="1">男</el-radio>
        <el-radio label="0">女</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="科目" prop="subject">
      <el-radio-group v-model="ruleForm.subject">
        <el-radio label="0">普通文科</el-radio>
        <el-radio label="1">普通理科</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input v-model="ruleForm.remark" type="textarea" style="width: 50%;"  />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        提交
      </el-button>
      <el-button @click="resetForm(ruleFormRef)">返回</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import {insertStudent, updataStudent} from '@/api/student/index'
import {useRouter,useRoute } from 'vue-router'
import {ElLoading, ElMessage} from "element-plus";
let $router = useRouter()
let $route = useRoute()
interface RuleForm {
  id:number
  stu_name: string
  recore: number|undefined
  stu_age:number|undefined
  nation: string
  stu_sex: string
  subject:string
  remark: string
  user_id:number
}

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
let ruleForm = reactive<RuleForm>({
  id:0,
  stu_name: '',
  recore:undefined,
  stu_age:undefined,
  nation: '',
  stu_sex:'0',
  subject:'0',
  remark: '',
  user_id:Number(localStorage.getItem('userId')),
})

const rules = reactive<FormRules<RuleForm>>({
  stu_name: [
    { required: true, message: '请输入学生姓名', trigger: 'blur' },
    { min: 2, max: 5, message: '姓名长度不合法', trigger: 'blur' },
  ],
  recore: [
    { required: true, message: '请输入学生分数', trigger: 'blur' },
  ],
  stu_age: [
    { required: true, message: '请输入年龄', trigger: 'blur' },
  ],
  nation: [
    {
      required: true,
      message: '请选择民族',
      trigger: 'change',
    },
  ],
  stu_sex: [
    {
      required: true,
      message: '请选择性别',
      trigger: 'change',
    },
  ],
  subject: [
    {
      required: true,
      message: '请选择科目',
      trigger: 'change',
    },
  ],
  remark: [
    { required: true, message: '请输入备注', trigger: 'blur' },
  ],
})
//loading
// 自定义启动方法
const startCustomLoading = (options:any) => {
  const loading = ElLoading.service(options);
  return loading;
};
// 自定义关闭方法
const stopCustomLoading = (loading:any) => {
  if (loading) {
    loading.close();
  }
};
const customOptions = {
  lock: true,
  text: '加载中，请稍后',
  background: 'rgba(0, 0, 0, 0.7)',
};
//提交
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  const loading = startCustomLoading(customOptions);
  await formEl.validate((valid, fields) => {
    if (valid) {
      //id为0是新增
      if(ruleForm.id===0){
        insertStudent(ruleForm).then(res=>{
          ElMessage({
            type: 'success',
            message: res.data.mes
          })
          stopCustomLoading(loading);
        }).catch(res=>{
          ElMessage({
            type: 'error',
            message: res.data.mes
          })
          stopCustomLoading(loading);
        })
      }else{
        //修改
        updataStudent(ruleForm).then(res=>{
          ElMessage({
            type: 'success',
            message: res.data.mes
          })
          stopCustomLoading(loading);
        }).catch(res=>{
          ElMessage({
            type: 'error',
            message: res.data.mes
          })
          stopCustomLoading(loading);
        })
      }

    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  $router.go(-1)
}
const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}))

//判断是否为编辑
if($route.query.data===null||$route.query.data===undefined){
  resetForm(ruleFormRef.value)
}else if(typeof $route.query.data === 'string'){
  let data = JSON.parse($route.query.data)
  ruleForm.id=data.id
  ruleForm.stu_name=data.stu_name
  ruleForm.nation =data.nation
  ruleForm.recore = data.recore
  ruleForm.remark=data.remark
  ruleForm.stu_age=data.stu_age
  ruleForm.stu_sex=String(data.stu_sex)
  ruleForm.subject=String(data.subject)
  ruleForm.user_id=data.user_id
}




const option = [
  { value: '汉族', label: '汉族' },
  { value: '蒙古族', label: '蒙古族' },
  { value: '回族', label: '回族' },
  { value: '藏族', label: '藏族' },
  { value: '维吾尔族', label: '维吾尔族' },
  { value: '苗族', label: '苗族' },
  { value: '彝族', label: '彝族' },
  { value: '壮族', label: '壮族' },
  { value: '布依族', label: '布依族' },
  { value: '朝鲜族', label: '朝鲜族' },
  { value: '满族', label: '满族' },
  { value: '侗族', label: '侗族' },
  { value: '瑶族', label: '瑶族' },
  { value: '白族', label: '白族' },
  { value: '土家族', label: '土家族' },
  { value: '哈尼族', label: '哈尼族' },
  { value: '哈萨克族', label: '哈萨克族' },
  { value: '傣族', label: '傣族' },
  { value: '黎族', label: '黎族' },
  { value: '傈僳族', label: '傈僳族' },
  { value: '佤族', label: '佤族' },
  { value: '畲族', label: '畲族' },
  { value: '高山族', label: '高山族' },
  { value: '拉祜族', label: '拉祜族' },
  { value: '水族', label: '水族' },
  { value: '东乡族', label: '东乡族' },
  { value: '纳西族', label: '纳西族' },
  { value: '景颇族', label: '景颇族' },
  { value: '柯尔克孜族', label: '柯尔克孜族' },
  { value: '土族', label: '土族' },
  { value: '达斡尔族', label: '达斡尔族' },
  { value: '仫佬族', label: '仫佬族' },
  { value: '羌族', label: '羌族' },
  { value: '布朗族', label: '布朗族' },
  { value: '撒拉族', label: '撒拉族' },
  { value: '毛南族', label: '毛南族' },
  { value: '仡佬族', label: '仡佬族' },
  { value: '锡伯族', label: '锡伯族' },
  { value: '阿昌族', label: '阿昌族' },
  { value: '普米族', label: '普米族' },
  { value: '塔吉克族', label: '塔吉克族' },
  { value: '怒族', label: '怒族' },
  { value: '乌孜别克族', label: '乌孜别克族' },
  { value: '俄罗斯族', label: '俄罗斯族' },
  { value: '鄂温克族', label: '鄂温克族' },
  { value: '德昂族', label: '德昂族' },
  { value: '保安族', label: '保安族' },
  { value: '裕固族', label: '裕固族' },
  { value: '京族', label: '京族' },
  { value: '塔塔尔族', label: '塔塔尔族' },
  { value: '独龙族', label: '独龙族' },
  { value: '鄂伦春族', label: '鄂伦春族' },
  { value: '赫哲族', label: '赫哲族' },
  { value: '门巴族', label: '门巴族' },
  { value: '珞巴族', label: '珞巴族' }
]
</script>

<style scoped>

</style>