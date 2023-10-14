<template>
  <div style="height: 100%">
    <el-card class="box-cards"  shadow="hover">
      <div class="incard">
        <div style="display: flex;flex-direction: row">
          <el-input v-model="data.formData.name" placeholder="请输入" clearable @keyup.enter="getTableData" />
          <el-button style="margin-left: 10px" :icon="'Search'" circle type="primary" @click.prevent="getTableData"/>
        </div>
      </div>
    </el-card>
    <div class="main">
      <el-empty style="margin: auto" description="哎呦！您还没有学生" v-if="data.tableData.length===0" />
      <el-card class="box-card" shadow="hover" v-for="item in data.tableData" @click.prevent="admission(item)">
        <template #header>
          <div class="card-header">
            <span>{{ item.stu_name }}</span>
            <el-button type="primary" class="button" text >{{item.subject}}-{{item.recore}}分</el-button>
          </div>
        </template>
        <div class="text item">
          <div >{{item.stu_sex}}</div>
          <div style="margin-left: 10px"><el-tag class="ml-2" type="success">{{item.nation}}</el-tag></div>
          <div style="margin-left: 10px">{{item.stu_age}}岁</div>
          <el-text class="mx-1" type="warning" size="small" tag="ins" style="margin-left: 15px">等效排名：{{item.ranking}}</el-text>
        </div>
        <div class="text item">
          <el-text class="w-100px" truncated>{{item.remark}}</el-text>
        </div>
      </el-card>
    </div>
    <div class="pagination">
      <el-pagination
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
import {reactive} from "vue";
import {getStudent} from "@/api/student/index"
import {ElMessage} from "element-plus";
//引入router
import {useRouter} from "vue-router"
let $router = useRouter()
import useuserStore from  "@/store/userStore/userStore"
let user = useuserStore()
// 定义计算属性
const data = reactive({
  total:0,
  formData:{
    name:'',
    page:1,
    pageSize:12,
    userId:0,
  },
  tableData:[] as TableDataItem[],
  form: {
    id:0,
    username:'',
    nickname:'',
    email:'',
    password:'',
  },
  title:'',
})
//分页
const handleCurrentChange = (value:number)=>{
  data.formData.page = value;
  getTableData()
}
//睡眠查询
function sleep(ms:number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
//查询接口定义
interface TableDataItem {
  subject: any;
  stu_sex:any;
  // 其他属性...
}
const getTableData = async ()=>{
  if (user.users.userid===undefined){
    await sleep(1000);
    await getTableData()
  }
  data.formData.userId=user.users.userid
  getStudent(data.formData).then(res=>{
    data.tableData=res.data.data
    data.total=res.data.total
    data.tableData.forEach((item)=>{
      if (item.subject===0){
        item.subject='文科'
      }else {
        item.subject='理科'
      }
      if (item.stu_sex===0){
        item.stu_sex='女'
      }else if(item.stu_sex===1) {
        item.stu_sex='男'
      }
    })
  }).catch(error=>{
    ElMessage({
      type: 'error',
      message: error
    })
  })
}
getTableData()
//跳转志愿列表
const admission = (item:any)=>{
  $router.push({
    name: 'volunteerList',
    query: {
      data:JSON.stringify(item)
    }
  })
}
</script>

<style scoped lang="scss">

.box-cards {
  width: 100%;
  .incard{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}
.box-card{
  width: 24%;
  height: 30%;
  margin-left: 10px;
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