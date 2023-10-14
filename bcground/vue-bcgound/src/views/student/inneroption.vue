<template>
  <div style="height: 100%">
    <el-page-header :icon="'ArrowLeft'" @click="$router.go(-1)" />
    <el-card class="box-cards"  shadow="hover">
      <div class="incard">
        <div style="display: flex;flex-direction: row">
          <el-input v-model="data.formData.name" placeholder="请输入" clearable @keyup.enter="getTableData" />
          <el-button style="margin-left: 10px" :icon="'Search'" circle type="primary" @click="getTableData"/>
        </div>
        <el-button type="primary" plain @click="addStudent">新增方案</el-button>
      </div>
    </el-card>
    <div class="main">
      <!--      空状态-->
      <el-empty style="margin: auto" description="哎呦！这个人还没有方案" v-if="data.tableData.length===0" />
      <el-table :data="data.tableData"  style="width: 100%;height:100%;margin-top: 20px" border stripe size="large" v-else>
        <el-table-column prop="option_name" label="方案名称" style="width: 20%;" />
        <el-table-column prop="creatTime" label="创建时间" style="width: 20%;" />
        <el-table-column label="操作" style="width: 20%;">
          <template #default="scope">
            <el-button size="small" type="primary" @click="selectSchool(scope.row)"
            >院校选择</el-button>
            <el-button size="small" @click="editStudent(scope.row)"
            >编辑名称</el-button>
            <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--      修改与新增-->
      <el-drawer v-model="drawer" :title="data.title" :with-header="true">
        <el-form  ref="form" :model="data.form" :rules="rules" class="demo-ruleForm" label-position="top">
          <el-form-item label="方案名称" prop="option_name">
            <el-input v-model="data.form.option_name"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="formButton">
              <el-button type="primary" @click="handleInsert">提交</el-button>
            </div>
          </el-form-item>
        </el-form>
      </el-drawer>
    </div>
    <div class="pagination">
      <el-pagination
          v-show="data.tableData.length!==0"
          background layout="prev, pager, next"
          :total="data.total"
          v-model:current-page="data.formData.page"
          v-model:page-size="data.formData.pageSize"
          @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import {ElMessage, ElLoading} from "element-plus";
//引入router
import {useRouter,useRoute} from "vue-router"
let $router = useRouter()
let $route = useRoute()
import useuserStore from  "@/store/userStore/userStore"
import {delOption, getOption, insertOption, updataOption} from "@/api/options";
let user = useuserStore()
//定义侧边开关
const drawer = ref(false)
// 定义计算属性
const data = reactive({
  total:0,
  formData:{
    name:'',
    page:1,
    pageSize:12,
    stuId:0,
  },
  tableData:[] as TableDataItem[],
  form: {
    id:0,
    option_name:'',
    creatTime:'',
    stu_id:0,
  },
  title:'',
})
//表单检验规则
const rules = {
  option_name: [
    { required: true, message: '名称不能为空', trigger: 'blur' },
  ],
}
let forms = ref()
//获取本人id
let stuid = JSON.parse(String($route.query.data))
data.formData.stuId=stuid.id
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
const addStudent = ()=>{
  data.title = '新增方案'
  drawer.value = true
}
const editStudent = (item:any)=>{
  data.title = '修改方案'
  drawer.value = true
  data.form.id=item.id
  data.form.option_name=item.option_name
  data.form.creatTime=item.creatTime
  data.form.stu_id=item.stu_id
}
//分页
const handleCurrentChange = (value:number)=>{
  data.formData.page = value;
  getTableData()
}
//删除
const handleDelete = async (id:number)=>{
  const loading = startCustomLoading(customOptions);
  await  delOption(id).then( async (res)=>{
    ElMessage({
      type: 'success',
      message: res.data.mes
    })
    await getTableData()
    stopCustomLoading(loading);
  })
}
//新增
let form=ref()
const handleInsert = async ()=>{
  form.value.validate().then(()=>{
    if(data.form.id==0){
      try{
        const loading = startCustomLoading(customOptions);
        data.form.stu_id=stuid.id
        insertOption(data.form).then( async (res)=>{
          ElMessage({
            type: 'success',
            message: res.data.mes
          })
          await getTableData()
          data.form.option_name=''
          drawer.value = false
          stopCustomLoading(loading);
        })
      }catch (error:any)
      {
        ElMessage({
          type: 'error',
          message: error
        })
      }
    }else{
      const loading = startCustomLoading(customOptions);
      updataOption(data.form).then(async res=>{
        ElMessage({
          type: 'success',
          message: res.data.mes
        })
        await getTableData()
        data.form.option_name=''
        data.form.id=0
        data.form.creatTime=''
        drawer.value = false
        stopCustomLoading(loading);
      })
    }
  }).catch(()=>{
    ElMessage({
      type: 'error',
      message: '表单错误'
    })
  })

}
//查询接口定义
interface TableDataItem {
  id: number;
  creatTime:string;
  option_name:string
  stu_id:number
  // 其他属性...
}
const getTableData = async ()=>{
  getOption(data.formData).then(res=>{
    data.tableData=res.data.data
    data.total=res.data.total
    data.tableData.forEach(item=>{
      const date = new Date(item.creatTime);
      item.creatTime=date.toLocaleString();
    })
  })
}
getTableData()
//跳转志愿列表
const selectSchool=(row:any)=>{
  let id= row.id;
  let data = $route.query.data
  $router.push({
    name:'optionSelect',
    query:{
      option_id:id,
      datas:data
    }
  })
}
</script>

<style scoped lang="scss">

.box-cards {
  width: 100%;
  margin-top: 15px;
  .incard{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}
.box-card{
  width: 23%;
  height: 30%;
  margin-left: 20px;
  margin-top: 10px;
  cursor: pointer;
}
.main{
  width: 100%;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start
}
.pagination{
  position: absolute;
  bottom:0;
  height: 40px;
  width: 90%;
  display: flex;
  justify-content: center;
}
.item{
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  align-items: center
}
</style>