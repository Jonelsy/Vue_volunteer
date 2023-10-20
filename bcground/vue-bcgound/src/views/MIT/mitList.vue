<template>
<div class="container" v-if="show">
  <div class="title">
    <span>欢迎来到MIT性格测试页面</span>
  </div>
  <div style="display: flex;align-items: center;margin-top: 120px">
    <el-checkbox v-model="checked" size="large" />
    <span>我已阅读并知悉<el-link type="primary" @click="open1()">《MIT性格测试须知》</el-link><el-link type="primary" @click="open2()">《用户隐私保护须知》</el-link></span>
  </div>
  <div>
    <el-button size="large" type="primary" style="width: 15vw" :disabled="!checked" @click="begin()">开始测试</el-button>
  </div>
</div>
  <div class="bodys" v-else>
    <div><p>{{mitList[indexs].title}}</p></div>
    <el-form
        ref="ruleForms"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        size="default"
        status-icon
    >
      <el-form-item :label="mitList[indexs].question" prop="resource1" label-width="300">
        <el-radio-group v-model="ruleForm.resource1">
          <el-radio label=5>非常符合</el-radio>
          <el-radio label=4>比较符合</el-radio>
          <el-radio label=3>一般符合</el-radio>
          <el-radio label=2>比较不符合</el-radio>
          <el-radio label=1>非常不符合</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="mitList[indexs+1].question" prop="resource2" label-width="300">
        <el-radio-group v-model="ruleForm.resource2">
          <el-radio label=5>非常符合</el-radio>
          <el-radio label=4>比较符合</el-radio>
          <el-radio label=3>一般符合</el-radio>
          <el-radio label=2>比较不符合</el-radio>
          <el-radio label=1>非常不符合</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div class="footerbtn">
      <el-button type="primary" size="large" @click="nextQues(ruleForms)" v-if="indexs!==mitList.length-2">下一题</el-button>
      <el-button type="primary" size="large" @click="nextQues(ruleForms)" v-else>查看结果</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from 'vue'
import {ElLoading, ElMessageBox} from "element-plus";
import {AnswerMit, getGard, getMitList} from "@/api/MIT";
import {useRouter} from "vue-router";
let $router = useRouter()
const checked = ref(null)
const open1 = () => {
  ElMessageBox.alert('注意事项：\n' +
      '1．请在心态平和及时间充足的情况下才开始答题。\n' +
      '2．每道题目均有两个答案：A和B。请仔细阅读题目，按照与你性格相符的程度分别给A和B赋予一个分数，并使一组中的两个分数之和为5。最后，请在问卷后的答题纸上相应的方格内填上相应的分数。\n' +
      '3．请注意，题目的答案无对错之分，你不需要考虑哪个答案“应该”更好，而且不要在任何问题上思考太久，而是应该凭你心里的第一反应做出选择。\n' +
      '4．如果你觉得在不同的情境里，两个答案或许都能反映你的倾向，请选择一个对于你的行为方式来说最自然、最顺畅和最从容的答案。', '须知', {
    confirmButtonText: '我已知悉',
  })
}
const open2 = ()=>{
  ElMessageBox.alert('用户隐私须知：\n' +
      '\n' +
      '信息收集：我们可能会收集您的个人信息，包括但不限于姓名、联系方式、电子邮件地址等。这些信息是为了更好地向您提供服务或回答您的提问。\n' +
      '\n' +
      '信息使用：我们仅会将您的个人信息用于向您提供相关的服务，并根据您的同意和授权处理您的个人信息。我们不会将您的个人信息用于其他商业目的，或未经您的许可向第三方披露。\n' +
      '\n' +
      '信息安全：我们会采取安全措施，保护您的个人信息的安全性。我们将采用合理的技术手段，防止您的个人信息的丢失、误用、未经授权访问、披露、修改或损坏。\n' +
      '\n' +
      'Cookie 和类似技术：为了改善用户体验和分析网站流量，我们可能会使用Cookie和类似技术来收集和存储您访问我们网站的信息。您可以根据自己的偏好选择是否接受Cookie，并可以随时删除已存储的Cookie。\n' +
      '\n' +
      '第三方链接：我们的网站可能包含其他第三方的链接，这些链接是为了方便您获取更多信息或服务。请注意，这些第三方网站的隐私惯例可能与我们不同，我们对第三方网站的隐私保护措施不负任何责任。\n' +
      '\n' +
      '法律要求：我们有义务遵守适用的法律法规，并可能在法律要求的情况下披露您的个人信息。\n' +
      '\n' +
      '我们将不断修改和完善我们的隐私政策和措施，以适应法律法规和技术的变化。如果您对我们的隐私政策有任何疑问或意见，请随时联系我们。感谢您的信任和支持！',{
    confirmButtonText: '我已知悉',
  })
}
//点击开始测试
const begin = ()=>{
  //请求题库
  getMitList().then(res=>{
    mitList.value=res.data
    show.value = false
  })
}
const show = ref(true)
//表单
const ruleForm = reactive({
  resource1:null,
  resource2:null,
})
//表单校验
//表单检验规则
const rules = {
  resource1: [
    {
      required: true,
      message: '请选择',
      trigger: 'change',
    },
  ],
  resource2: [
    {
      required: true,
      message: '请选择',
      trigger: 'change',
    },
  ],
}
//题库
interface mitLists {
  id:number,
  title_id:number,
  title:string,
  question:string,
  type:string,
  grade:number
}
const mitList = ref<mitLists[]>([])

//题目顺序
const indexs = ref(0)
//下一题
let ruleForms = ref()
const nextQues = (formEl: any | undefined)=>{
  ruleForms.value.validate().then(async()=>{
    let data1 = {
      id:0,
      title_id:mitList.value[indexs.value].title_id,
      title:mitList.value[indexs.value].title,
      question:mitList.value[indexs.value].question,
      type:mitList.value[indexs.value].type,
      grade:ruleForm.resource1
    }
    let data2 = {
      id:0,
      title_id:mitList.value[indexs.value+1].title_id,
      title:mitList.value[indexs.value+1].title,
      question:mitList.value[indexs.value+1].question,
      type:mitList.value[indexs.value+1].type,
      grade:ruleForm.resource2
    }
    const loading = startCustomLoading(customOptions)
    await AnswerMit(data1)
    await AnswerMit(data2)
    if(indexs.value===mitList.value.length-2){
      //查看结果
      let res = await getGard()
      //跳转页面
      $router.push({
        path:'/mitAnswer',
        query: {
          data:res.data
        }
      })
    }else{
      indexs.value=indexs.value+2
    }
    resetForm(formEl)
    stopCustomLoading(loading)
  })
}
//清除表单校验
const resetForm = (formEl: any | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
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
  text: 'Custom Loading',
  background: 'rgba(0, 0, 0, 0.7)',
};
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
.bodys{
  width: 100%;
  height:100%;
  justify-content: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  p{
    font-weight: bolder;
    font-size: 2rem;
  }
  .demo-ruleForm{
    margin-top: 50px;
  }
}
</style>