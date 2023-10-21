<template>
  <div>
    <el-card class="box-card"  shadow="hover">
      <div class="incard">
        <div style="display: flex;flex-direction: row">
          <el-input v-model="data.formData.name" placeholder="请输入" clearable />
          <el-button style="margin-left: 10px" :icon="'Search'" circle type="primary" @click="getTableData"/>
        </div>
        <el-button type="primary" plain @click="addStudent">新增学生</el-button>
      </div>
    </el-card>
    <div class="main">
      <el-table :data="data.tableData"  style="width: 100%;height:100%;margin-top: 20px" border stripe size="large">
        <el-table-column prop="stu_name" label="姓名" width="100" />
        <el-table-column prop="nation" label="民族" width="100" />
        <el-table-column prop="stu_age" label="年龄" width="100"/>
        <el-table-column label="性别" width="100">
          <template #default="scope">
            <span>{{scope.row.stu_sex==1?'男':'女'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="科目" width="150">
          <template #default="scope">
            <span>{{scope.row.subject==1?'普通理科':'普通文科'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="recore" label="成绩" width="100"/>
        <el-table-column prop="ranking" label="等效排名" width="100"/>
        <el-table-column label="性格测试" width="200">
          <template #default="scope">
            <el-image style="width: 160px; height: 90px"
                      :src="require('../../../../../Api_service/api_service/uploads/'+scope.row.pic_major)"
                      :preview-src-list="[require('../../../../../Api_service/api_service/uploads/'+scope.row.pic_major)]"
                      preview-teleported="true"
            />
          </template>
        </el-table-column>
        <el-table-column label="备注" width="200">
          <template #default="scope">
            <el-text class="w-100px" truncated>{{scope.row.remark}}</el-text>
          </template>
        </el-table-column>
        <el-table-column label="操作" >
          <template #default="scope">
            <el-button size="small" type="primary" @click="admission(scope.row)"
            >一对一填报</el-button>
            <el-button size="small" type="warning" @click="editStudent(scope.row)"
            >编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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
import {ElMessage, ElLoading} from "element-plus";
import {delStudent, getStudent} from "@/api/student";
import {useRouter} from "vue-router"
let $router = useRouter()
const data = reactive({
  drawer:false,
  title:'一对一填报',
  total:0,
  formData:{
    name:'',
    page:1,
    pageSize:10,
    userId:Number(localStorage.getItem('userId')),
  },
  tableData:[],
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
  text: 'Custom Loading',
  background: 'rgba(0, 0, 0, 0.7)',
};
//分页
const handleCurrentChange = (value:number)=>{
  data.formData.page = value;
  getTableData()
}

//查询
const getTableData = ()=>{
  getStudent(data.formData).then(res=>{
    data.tableData=res.data.data
    data.total=res.data.total
  })
}
getTableData()
//跳转志愿列表
const admission = (item:any)=>{
  $router.push({
    name: 'inner',
    query: {
      data:JSON.stringify(item)
    }
  })
}
//跳转添加学生
const addStudent = ()=>{
  $router.push('/student/addstudent');
}
//删除
const handleDelete = async (id:number)=>{
  const loading = startCustomLoading(customOptions);
  await  delStudent(id).then( async (res)=>{
    ElMessage({
      type: 'success',
      message: res.data.mes
    })
    await getTableData()
    stopCustomLoading(loading);
  })
}
//协参跳转编辑
const editStudent = (item:any)=>{
  $router.push({
    name: 'addStudent',
    query: {
      data:JSON.stringify(item)
    }
  })
}
</script>

<style scoped lang="scss">

.box-card {
  width: 100%;
  .incard{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}
.pagination{
  position: relative;
  bottom:0;
  height: 40px;
  width: 90%;
  display: flex;
  justify-content: center;
}
</style>