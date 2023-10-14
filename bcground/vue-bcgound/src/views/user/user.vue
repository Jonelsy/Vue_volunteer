<template>
  <div>
    <el-card class="box-card"  shadow="hover">
      <div class="incard">
        <div style="display: flex;flex-direction: row">
          <el-input v-model="data.formData.name" placeholder="请输入" clearable />
          <el-button style="margin-left: 10px" :icon="'Search'" circle type="primary" @click="getTableData"/>
        </div>
        <el-button type="primary" plain @click="openDig">新增用户</el-button>
      </div>
    </el-card>
    <div class="main">
      <el-table :data="data.tableData"  style="width: 100%;height:100%;margin-top: 20px" border stripe size="large">
        <el-table-column prop="username" label="用户名" style="width: 20%;" />
        <el-table-column prop="nickname" label="昵称" style="width: 20%;" />
        <el-table-column prop="email" label="邮箱" style="width: 20%;"/>
        <el-table-column label="操作" style="width: 20%;">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)"
            >编辑</el-button
            >
            <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.row)"
            >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
<!--      弹框-->
      <el-dialog v-model="data.dialogFormVisible" :title="data.title" width="35%" @close="closeDig">
        <el-form :model="data.form" style="width: 80%;" :rules="rules" ref="forms">
          <el-form-item label="用户名" :label-width="150" prop="username">
            <el-input v-model="data.form.username" autocomplete="off" />
          </el-form-item>
          <el-form-item label="昵称" :label-width="150" prop="nickname">
            <el-input v-model="data.form.nickname" autocomplete="off" />
          </el-form-item>
          <el-form-item label="邮箱" :label-width="150" prop="email">
            <el-input v-model="data.form.email" autocomplete="off"  />
          </el-form-item>
          <el-form-item label="密码" :label-width="150" prop="password"  v-if="data.title==='新增'">
            <el-input v-model="data.form.password" autocomplete="off"/>
          </el-form-item>
        </el-form>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDig">取消</el-button>
        <el-button type="primary" @click="insertData" v-show="data.title==='新增'">新增</el-button>
        <el-button type="primary" @click="upData" v-show="data.title==='编辑'">编辑</el-button>
      </span>
        </template>
      </el-dialog>
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
import {reactive, ref} from "vue";
import {deleteUser, getUser, insertUser, updateUser} from "@/api/user/index"
import {ElMessage, ElLoading} from "element-plus";
const data = reactive({
  total:0,
  formData:{
    name:'',
    page:1,
    pageSize:10
  },
  tableData:[],
  dialogFormVisible:false,
  form: {
    id:0,
    username:'',
    nickname:'',
    email:'',
    password:'',
  },
  title:'',
})
let forms = ref()
//表单检验规则
const validatEamil = (rule: any, value: any, callback: any)=>{
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if(value===''){
    callback(new Error('请输入邮箱'))
  }
  if (emailRegex.test(value)){
    callback()
  }else{
    callback(new Error('邮箱不合法'))
  }
}
const rules = {
  username: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
    { min: 2, max: 10, message: '长度不合法', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 2, message: '长度不合法', trigger: 'blur' },
  ],
  nickname: [
    { required: true, message: '昵称不能为空', trigger: 'blur' },
  ],
  email:[
    {trigger:'blur' ,validator:validatEamil }
  ],
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
//分页
const handleCurrentChange = (value:number)=>{
  data.formData.page = value;
  getTableData()
}
//删除
const handleDelete = async (row:any)=>{
  const loading = startCustomLoading(customOptions);
  let id = row.id
  await  deleteUser(id).then( async (res)=>{
    ElMessage({
      type: 'success',
      message: res.data.mes
    })
    await getTableData()
    stopCustomLoading(loading);
  })
}
//查询
const getTableData = ()=>{
    getUser(data.formData).then(res=>{
      data.tableData=res.data.data
      data.total=res.data.total
    })
}
//新增开弹框
const openDig = ()=>{
  data.dialogFormVisible=true
  data.title = '新增'
}
//编辑弹框
const handleEdit = (row:any)=>{
  data.dialogFormVisible=true
  data.title='编辑'
  data.form.id = row.id
  data.form.username=row.username
  data.form.nickname=row.nickname
  data.form.email=row.email
}
//关闭弹框
const closeDig = ()=>{
  forms.value.resetFields()
  data.dialogFormVisible=false
}
//新增
const insertData = async()=>{
  await forms.value.validate().then( async ()=>{
    const loading = startCustomLoading(customOptions);
    await insertUser(data.form).then(async res=>{
      ElMessage({
        type: 'success',
        message: res.data.mes
      })
      getTableData()
      stopCustomLoading(loading);
      data.dialogFormVisible  = false
      forms.value.resetFields();
    })
  }).catch(()=>{
    ElMessage({
      type: 'error',
      message: '表单有误'
    })
  })
}
//修改
const upData = ()=>{
   forms.value.validate().then(()=>{
    const loading = startCustomLoading(customOptions);
    updateUser(data.form).then(res=>{
      getTableData()
      stopCustomLoading(loading);
      ElMessage({
        type: 'success',
        message: res.data.mes
      })
      data.dialogFormVisible = false
      forms.value.resetFields();
    })
}).catch(()=>{
     ElMessage({
       type: 'error',
       message: '表单有误'
     })
})
}
getTableData()
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
  position: absolute;
  bottom:0;
  height: 40px;
  width: 90%;
  display: flex;
  justify-content: center;
}
</style>