<template>
  <el-button class="screenshotBtn button" type="text" @click="generateImg()">一键截图</el-button>
  <el-button class="screenshotBtn button" type="text" @click="bandStu()">绑定学生</el-button>
<div id="mainEchart">

</div>
  <!--      侧拉框-->
  <el-drawer v-model="drawer" title="选择绑定的学生" :with-header="false">
    <div>
      <el-card class="box-card"  shadow="hover">
        <div class="incard">
          <div style="display: flex;flex-direction: row">
            <el-input v-model="data.formData.name" placeholder="请输入" clearable />
            <el-button style="margin-left: 10px" :icon="'Search'" circle type="primary" @click="getTableData"/>
          </div>
        </div>
      </el-card>
      <div class="main">
        <el-table :data="data.tableData"  style="width: 100%;height:100%;margin-top: 20px" border stripe size="large">
          <el-table-column prop="stu_name" label="姓名" width="100" />
          <el-table-column label="性别" width="100">
            <template #default="scope">
              <span>{{scope.row.stu_sex==1?'男':'女'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="科目" width="100">
            <template #default="scope">
              <span>{{scope.row.subject==1?'普通理科':'普通文科'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" >
            <template #default="scope">
              <el-upload
                  ref="upload"
                  class="upload-demo"
                  action="#"
                  :auto-upload="false"
                  :on-change="bandImage"
              >
<!--                跳出选择文件-->
              <el-button size="small" type="primary" @click="getStuMes(scope.row)">绑定学生</el-button>
              </el-upload>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div>
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
  </el-drawer>
</template>

<script lang="ts" setup>
import {useRoute} from "vue-router";
import {clearMit, getMajor} from "@/api/MIT";
import {onBeforeUnmount, reactive, ref} from "vue";
import type { UploadInstance } from 'element-plus'
//图表渲染
import * as echarts from 'echarts';
import {getStudent, updataStudent} from "@/api/student";
import {uploadFile} from "@/api/file/file";
import {ElMessage} from "element-plus";
//引入截图相关组件
import html2canvas from "html2canvas"
let $route = useRoute()
let dataCode = $route.query.data
const getData = () => {
  getMajor(String(dataCode)).then((res) =>{
    Answer = res.data
    onChange()
  })
}
getData()
let Answer:any = []

type EChartsOption = echarts.EChartsOption;

const onChange = ()=>{
  //数据处理并绑定
  option.title.text=Answer[0].major_change
  option.series[0].data[0].name = Answer[0].mit_name
  let arr:any = []
  let str = Answer[0].mit_text
  arr = str.split('\n')
  //动态渲染雷达图
  for(let i =0;i<arr.length;i++){
    let obj = {name:'',max:50}
    obj.name = arr[i]
    option.radar.indicator.push(obj)
  }
  var chartDom = document.getElementById('mainEchart')!;
  var myChart = echarts.init(chartDom,'dark');
  option && myChart.setOption(option);
}

let option = reactive({
  title: {
    text: ''
  },
  legend: {

  },
  radar: {
    indicator: [
    ]
  },
  series: [
    {
      type: 'radar',
      data: [
        {
          value: [42, 40, 35, 35, 45, 48,49],
          name: ''
        },
      ]
    }
  ]
})
//销毁
onBeforeUnmount(async ()=>{
  let chartDom = echarts.init(document.getElementById('mainEchart')!);
  chartDom.dispose()
  //执行清空后台数据接口
  await clearMit()
})
//截图相关组件
const generateImg = ()=>{
  let el:any = document.getElementById("mainEchart");
  let options = {
    width: el.offsetWidth,
    height: el.offsetHeight,
    useCORS: true, // 是否尝试使用 CORS 从服务器加载图像
    allowTaint: false, // 是否允许跨源图像污染画布
  }

  html2canvas(el).then((canvas) => {
    let imgData = canvas.toDataURL("image/jpeg"); // 转base64
    fileDownload(imgData);
  });

  //下载后选择绑定的学生
  drawer.value=true
  getTableData()
};
// 下载图片方法
const fileDownload = (downloadUrl:string) => {
  let aLink = document.createElement("a");
  aLink.style.display = "none";
  // 以防base64过长导致下载失败，所以将base64转成blob格式
  aLink.href = URL.createObjectURL(dataURIToBlob(downloadUrl));
  aLink.download = "性格测试.png";
  document.body.appendChild(aLink);
  aLink.click();
  document.body.removeChild(aLink);
};
// base64转blob方法
const dataURIToBlob = (dataURI:string) => {
  let binStr = atob(dataURI.split(",")[1]),
      len = binStr.length,
      arr = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
    arr[i] = binStr.charCodeAt(i);
  }
  return new Blob([arr]);
};

//侧拉
let drawer = ref(false)
const data = reactive({
  drawer:false,
  total:0,
  formData:{
    name:'',
    page:1,
    pageSize:10,
    userId:Number(localStorage.getItem('userId')),
  },
  tableData:[],
})
//查询
const getTableData = ()=>{
  getStudent(data.formData).then(res=>{
    data.tableData=res.data.data
    data.total=res.data.total
  })
}
//分页
const handleCurrentChange = (value:number)=>{
  data.formData.page = value;
  getTableData()
}
//绑定图片
const uploadRef = ref<UploadInstance>()
const bandImage = async(res,file)=>{
  //判断文件是否是png格式，图片大小不得超过2mb
  console.log(file)
  if(file[0].raw.type!=='image/png'){
    ElMessage.error('图片格式错误，请确认是png格式')
  }else if(file[0].raw.size>1000000){
    ElMessage.error('图片大小应小于10Mb')
  }else{
    const files = file[0].raw;
    const formData = new FormData();
    formData.append('pic', files);
    let strCode = ''
    //上传文件
    uploadFile(formData).then(res=>{
      //接受file然后调用接口
      StuMess.value.pic_major=res.data.data
      //更新学生
      updataStudent(StuMess.value).then(res=>{
        ElMessage.success('绑定成功')
        drawer.value=false
      })
    })
  }
}
const submit = ()=>{
  uploadRef.value!.submit()
}
//上方绑定学生按钮
const bandStu = ()=>{
  getTableData()
  drawer.value = true
}
//绑定学生点击后获取当前学生信息存储
let StuMess = ref({})
const getStuMes = (row)=>{
  StuMess.value = row
}
</script>

<style scoped>
#mainEchart{
  width: 100%;
  height: 100%;
}
</style>