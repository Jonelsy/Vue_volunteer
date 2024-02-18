<template>
  <div>
    <div class="demo-collapse">
      <el-collapse>
        <el-collapse-item name="1">
          <template #title>
          <span style="font-size: 15px;display:flex;align-items: center">筛选条件<el-icon class="header-icon">
          <Operation />
        </el-icon></span>
          </template>
          <div>
            <el-card class="box-card"  shadow="hover">
              <div class="incard">
                <div style="display: flex;flex-direction: row">
                  <el-input v-model="data.ruleForm.name" placeholder="请输入院校" clearable @keyup.enter="getSchool" />
                  <el-button style="margin-left: 10px" :icon="'Search'" circle type="primary" @click="getSchool"/>
                </div>
                <div>
                  <el-text size="large">姓名：{{ data.userData.stu_name }}，
                    民族：{{data.userData.nation}}，
                    年龄：{{data.userData.stu_sex}}，
                    性别：{{data.userData.stu_age}}，
                    分数：{{data.userData.recore}}，
                    普通{{data.userData.subject==0?'文科':'理科'}}，
                    等效排名：{{data.userData.ranking}}</el-text>
                </div>
                <div>
                  <el-switch
                      v-model="switchValue"
                      class="mb-2"
                      style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                      active-text="启用个性化推荐"
                      inactive-text="关闭推荐"
                      :loading="switchLoading"
                      @change="beforeChange1"
                  />
                </div>
              </div>
              <div style="display: flex;flex-direction: column;margin-top: 15px">
                <el-radio-group v-model="data.ruleForm.subject" @change="changegetSchool" disabled>
                  <el-radio label="0" size="large" border>普通文科</el-radio>
                  <el-radio label="1" size="large" border>普通理科</el-radio>
                </el-radio-group>
                <el-radio-group v-model="data.ruleForm.level" style="margin-top: 15px" @change="changegetSchool">
                  <el-radio label="1" size="large" border>一本</el-radio>
                  <el-radio label="2" size="large" border>二本</el-radio>
                </el-radio-group>
                <div style="margin-top: 10px;">
                  <el-check-tag style="margin-right: 5px;margin-top: 5px" :key="index" v-for="(item,index) in data.CollegeProvince" :checked="item.checked"   @change="ChangeCollegePrv(item)">
                    {{ item.name }}
                  </el-check-tag>
                </div>
                <div style="margin-top: 10px;">
                  <el-check-tag style="margin-right: 5px;margin-top: 5px" :key="index" v-for="(item,index) in data.CollegeLevel" :checked="item.checked" type="success"  @change="ChangeCollegeLev(item)">
                    {{ item.name }}
                  </el-check-tag>
                </div>
              </div>
            </el-card>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <el-table :data="data.tableData"
              ref="singleTableRef"
              :row-class-name="rowClassName"
              style="width: 100%;margin-top: 15px"
              row-key="id"
              :tree-props="data.treeProps"
              :row-style="{
                height:'60px'
              }"
              :header-cell-style="{
                'background':'#ecf7fd !important',
                'color':'#506c7a !important',
              }"
              empty-text="此学生分数段内无推荐院校，请关闭个性化推荐或更换层次"
    >
      <el-table-column  label="名称" >
        <el-table-column prop="CollegeName" label="院校名称" width="150" align="center">
          <template #default="scope">
            <span v-show="scope.row.CollegeName!=null" type="success">{{ scope.row.CollegeName }}</span>
            <p c-else>{{scope.row.LocationOfSchool}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="MajorName" label="专业名称" width="130" align="center"/>
      </el-table-column>
      <el-table-column label="院校信息">
        <el-table-column label="代码">
          <el-table-column prop="CollegeCode" label="院校代码" width="90" align="center" />
          <el-table-column prop="MajorCode" label="专业代码" width="90" align="center" />
        </el-table-column>
        <el-table-column label="招生信息">
          <el-table-column prop="AdmissionPlanCount" label="招生计划数量" width="110" align="center" />
          <el-table-column label="投档比例" width="100" align="center">
            <template #default="scope">
              <el-tag v-show="scope.row.AdmissionRatio!=null" type="success">{{ scope.row.AdmissionRatio }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="投档最低分" width="120" align="center">
            <template #default="scope">
              <div v-if="scope.row.LowestAdmissionScore==null&&scope.row.ranking<data.userData.ranking&&scope.row.ranking<data.userData.ranking+1000" style="display: flex;align-items: flex-end">
                <el-tag type="danger">冲</el-tag>
              </div>
              <div v-else-if="scope.row.LowestAdmissionScore==null&&scope.row.ranking>=data.userData.ranking+1000&&scope.row.ranking<data.userData.ranking+5000" style="display: flex;align-items: flex-end">
                <el-tag>稳</el-tag>
              </div>
              <div v-else-if="scope.row.LowestAdmissionScore==null&&scope.row.ranking>=data.userData.ranking+5000&&scope.row.ranking<=data.userData.ranking+8000" style="display: flex;align-items: flex-end">
                <el-tag type="success">保</el-tag>
              </div>
              <div v-else>
                {{scope.row.LowestAdmissionScore}}
              </div>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="报名信息">
          <el-table-column prop="PlannedEnrollmentCount" label="专业计划人数" width="80" align="center" />
          <el-table-column label="比例录取最低分" width="200" align="center">
            <template #default="scope">
              <div v-if="scope.row.MajorLowestAdmissionScore!=null" style="display: flex;align-items: flex-end">
                <el-tag>{{ scope.row.MajorLowestAdmissionScore }}分</el-tag><span>比例排名：{{scope.row.ranking}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="填报批次信息" width="140" align="center" >
            <template #default="scope">
              <p :href="scope.row.PreferenceOrder" v-if="scope.row.PreferenceOrder!=null">{{ scope.row.PreferenceOrder }}</p>
              <p v-else>学费：{{ scope.row.TuitionFee }}每年</p>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="院校信息">
          <el-table-column label="院校层次" width="80" align="center" >
            <template #default="scope">
<!--              TUDO既是985又是211情况显示BUG-->
              <p v-if="scope.row.CollegeLevel">{{scope.row.CollegeLevel[0]}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="CollegeProvince" label="院校所在省份" width="80" align="center" />
          <el-table-column prop="CollegeCity" label="院校所在市区" width="80" align="center" />
          <el-table-column label="院校章程" align="center" >
            <template #default="scope">
              <el-link type="primary" v-if="scope.row.AdmissionRegulationsURL!=null">点击查看</el-link>
              <p v-else>{{ scope.row.MajorNotes }}</p>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="操作" align="center" >
          <template #default="scope">
            <el-link v-if="scope.row.children" @click="handleSchoolClick(scope.row)">填入</el-link>
            <el-link v-else @click="handleSubClick(scope.row)">填入</el-link>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
    <el-affix position="bottom" :offset="20">
      <el-badge :value="state.selectedRow.length" class="item">
        <el-button @click="insertOptions" class="share-button" :icon="'Orange'" type="danger" />
      </el-badge>
    </el-affix>
    <div class="pagination">
      <el-pagination
          background layout="prev, pager, next"
          :total="data.total"
          v-model:current-page="data.ruleForm.page"
          v-model:page-size="data.ruleForm.pageSize"
          @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {onBeforeUnmount, reactive, ref} from "vue";
import {getItems} from "@/api/school";
import { ElMessage, ElMessageBox, ElTable} from "element-plus";
import {delOwnerOptions, getOwnerOptions, insertOptionSchool, insertOptionSubject} from "@/api/options";
import {useRoute} from "vue-router";
let $route = useRoute()
interface TableDataItem {
  id: number;
  CollegeCode: number;
  CollegeLevel:string;
}
interface TableData  {
  tableData: any[];
  userData:any;
  ruleForm: {
    page: number;
    pageSize: number;
    name: string;
    level: string;
    subject: string;
    ranking?:number|null,
    CollegeProvince?:string|null,
    CollegeLevel?:string|null,
  };
  total: number;
  CollegeProvince:any,
  CollegeLevel:any
}
let data:TableData = reactive({
  tableData:[],
  userData:{},
  ruleForm:{
    page:1,
    pageSize:10,
    name:'',
    level:'1',
    subject:'0',
    ranking:null,
    CollegeProvince:'',
    CollegeLevel:'',
  },
  total:0,
  CollegeProvince : [
    {
      "checked": true,
      "name": "全部"
    },
    {
      "checked": false,
      "name": "北京市"
    },
    {
      "checked": false,
      "name": "天津市"
    },
    {
      "checked": false,
      "name": "河北省"
    },
    {
      "checked": false,
      "name": "山西省"
    },
    {
      "checked": false,
      "name": "内蒙古自治区"
    },
    {
      "checked": false,
      "name": "辽宁省"
    },
    {
      "checked": false,
      "name": "吉林省"
    },
    {
      "checked": false,
      "name": "黑龙江省"
    },
    {
      "checked": false,
      "name": "上海市"
    },
    {
      "checked": false,
      "name": "江苏省"
    },
    {
      "checked": false,
      "name": "浙江省"
    },
    {
      "checked": false,
      "name": "安徽省"
    },
    {
      "checked": false,
      "name": "福建省"
    },
    {
      "checked": false,
      "name": "江西省"
    },
    {
      "checked": false,
      "name": "山东省"
    },
    {
      "checked": false,
      "name": "河南省"
    },
    {
      "checked": false,
      "name": "湖北省"
    },
    {
      "checked": false,
      "name": "湖南省"
    },
    {
      "checked": false,
      "name": "广东省"
    },
    {
      "checked": false,
      "name": "广西壮族自治区"
    },
    {
      "checked": false,
      "name": "海南省"
    },
    {
      "checked": false,
      "name": "重庆市"
    },
    {
      "checked": false,
      "name": "四川省"
    },
    {
      "checked": false,
      "name": "贵州省"
    },
    {
      "checked": false,
      "name": "云南省"
    },
    {
      "checked": false,
      "name": "西藏自治区"
    },
    {
      "checked": false,
      "name": "陕西省"
    },
    {
      "checked": false,
      "name": "甘肃省"
    },
    {
      "checked": false,
      "name": "青海省"
    },
    {
      "checked": false,
      "name": "宁夏回族自治区"
    },
    {
      "checked": false,
      "name": "新疆维吾尔自治区"
    },
    {
      "checked": false,
      "name": "台湾省"
    },
    {
      "checked": false,
      "name": "香港特别行政区"
    },
    {
      "checked": false,
      "name": "澳门特别行政区"
    }
  ],
  CollegeLevel:[
    {
      checked: true,
      name: "全部"
    },
    {
      checked:false,
      name:'211'
    },
    {
      checked:false,
      name:'985'
    }
  ],
})
//存储院校及其专业数据
const state = reactive<{selectedRow:any[]}>({
  selectedRow:[]
});
//定义部分属性类型
interface childrens {
  id:number
}
interface MyObject {
  id:number,
  CollegeCode:number,
  children: childrens[];
  // 其他属性...
}
//学校点击填入
const handleSchoolClick = (row:MyObject) => {
  //查找学校列是否存在
  const index = state.selectedRow.findIndex((item)=>{
    return item.id === row.id;
  });
  console.log(index);
  
  //为-1不存在，添加进数组
  if (index === -1) {
    state.selectedRow.push(row);
    //学校和专业，添加进去
    if(row.children){
        row.children.forEach(item=>{
          state.selectedRow.push(item);
        })
    }
    //如果学校存在数组中，则进行清除
  } else {
    state.selectedRow.splice(index, 1);
    //如果清除的当前列包含子数组，也清除子数组所有
    if(row.children){
      row.children.forEach(item=>{
        const indexs = state.selectedRow.findIndex((selectedItem)=>{
          return selectedItem.id === item.id;
        });
        if(indexs===-1){
          return
        }else{
          state.selectedRow.splice(indexs, 1);
        }
      })
    }
  }
};
//专业点击填入
const handleSubClick = (row:MyObject) => {
  //查找专业是否存在
  const index = state.selectedRow.findIndex((item)=>{
    return item.id === row.id;
  });
  //为-1不存在，添加进数组，同时需要把学校添加进去
  if (index === -1) {
    state.selectedRow.push(row);
    data.tableData.forEach(item=>{
      if (item.CollegeCode===row.CollegeCode){
        //添加学校,先判断学校原本是否存在
        const index = state.selectedRow.findIndex((selectedItem )=>{
          return selectedItem.id === item.id;
        });
        if(index !== -1){
          return;
        }else{
          state.selectedRow.push(item);
        }
      }
    })
    //如果专业存在数组中，判断是否时这个学校最后一个专业，进行清除
  } else {
    //先判断是否是本学校最后一个专业
    let num = 0
    state.selectedRow.forEach(item=>{
      if(item.CollegeCode===row.CollegeCode){
        num++//为2则只有学校+专业
      }
    })
    if(num===2){
      //消除专业
      state.selectedRow.splice(index, 1);
      //消除学校
      data.tableData.forEach(item=>{
        if (item.CollegeCode===row.CollegeCode){
          //消除学校
          const indexs = state.selectedRow.findIndex((row)=>{
            return row.id === item.id;
          });
          state.selectedRow.splice(indexs, 1);
        }
      })
    }
    state.selectedRow.splice(index, 1);
  }
};
const rowClassName = (item:any) => {
  let result = state.selectedRow.findIndex(items=>{
    return items.id === item.row.id
  })
  return result !== -1?'hightline':''
};
//更改条件删除原本存在数据
const changegetSchool = () => {
  ElMessageBox.alert('切换条件会清除本地以及云端数据，请确认', '警告', {
    confirmButtonText: 'OK',
    callback: () => {
      //清除云端数据
      delOwnerOptions(Number($route.query.option_id)).then(()=>{
        getSchool()
        state.selectedRow = []
        ElMessage({
          type: 'success',
          message: `切换成功`,
        })
      })
    },
  })
}
//同步院校数据
const insertOptions=()=>{
  let schools:any = []
  let subjects:any = []
  //如果返回为空，则直接返回option_id让后端清除数据
  if(state.selectedRow.length===0){
    delOwnerOptions(Number($route.query.option_id)).then((res)=>{
      getSchool()
      state.selectedRow = []
      ElMessage({
        type: 'success',
        message: res.data.mes,
      })
    })
  }else{
    //根据是否存在children字段判断是否为学校，遍历
    state.selectedRow.forEach(item=>{
      item.option_id = $route.query.option_id
      if(item.children){
        schools.push(item)
      }else{
        subjects.push(item)
      }
    })
    insertOptionSchool(schools).then(res=>{
      ElMessage({
        type: 'success',
        message: res.data.mes,
      })
      insertOptionSubject(subjects).then(req=>{
        ElMessage({
          type: 'success',
          message: req.data.mes,
        })
      })
    })
  }
}
//获取学校同时获取已选择院校
data.userData = JSON.parse(String($route.query.datas))
const getSchool = ()=>{
  //固定文科理科
  data.ruleForm.ranking = data.userData.ranking
  data.ruleForm.subject = String(data.userData.subject)
  getItems(data.ruleForm).then(res=>{
    data.tableData=res.data.schools
    data.total=res.data.total
    //处理学校层次字符串转为数组
    data.tableData.forEach(item=>{
      if(item.CollegeLevel){
        item.CollegeLevel = item.CollegeLevel.slice(2, -2).split("', '")
      }
    })
  })
  getOwnerOptions(Number($route.query.option_id)).then(res=>{
    state.selectedRow=res.data
  })
}
getSchool()
//页面消除清空未保存数据
const handleBeforeUnload = (event:any) => {
  event.preventDefault(); // 阻止默认的离开页面行为
  event.returnValue = ''; // Chrome 需要设置一个空字符串

  // 弹出确认提示框
  const confirmationMessage = '有未保存的内容，确定要离开吗？';
  event.returnValue = confirmationMessage; // 兼容旧版本浏览器

  return confirmationMessage; // 兼容最新版本浏览器
};

// 添加 beforeunload 事件监听
window.addEventListener('beforeunload', handleBeforeUnload);

// 组件销毁时移除 beforeunload 事件监听
onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload);
});
//分页
const handleCurrentChange = (value:number)=>{
  data.ruleForm.page = value;
  getSchool()
}
//开关个性化推荐
const switchValue = ref(true)
const switchLoading = ref(false)
const beforeChange1 = async () => {
  switchLoading.value = true
  if(switchValue.value===false){
    data.userData.ranking=null
    await getSchool()
    switchLoading.value = false
  }else{
    data.userData.ranking = JSON.parse(String($route.query.datas)).ranking
    await getSchool()
    switchLoading.value = false
  }
}

//点击省份标签
interface ChangeCollegePrvType{
  checked:boolean,
  name:string
}
const ChangeCollegePrv = (item:ChangeCollegePrvType)=>{
  data.CollegeProvince.forEach((item:any)=>{
    item.checked = false
  })
  item.checked = true
  data.ruleForm.CollegeProvince = item.name
  if(item.name=='全部'){
    data.ruleForm.CollegeProvince = ''
  }
  getSchool()
}
//点击211.985标签
const ChangeCollegeLev = (item:ChangeCollegePrvType)=>{
  data.CollegeLevel.forEach((item:any)=>{
    item.checked = false
  })
  item.checked = true
  data.ruleForm.CollegeLevel = item.name
  if(item.name=='全部'){
    data.ruleForm.CollegeLevel = ''
  }
  getSchool()
}
</script>

<style  lang="scss">
.pagination{
  margin-top: 15px;
  bottom:0;
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: center;
}
.box-card {
  width: 100%;
  .incard{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}
.hightline{
  background-color: #7abef5 !important;
}
.el-affix{
  margin-top: 15px;
}
.el-table tbody tr:hover>td {
  background-color: #cfe1f6 !important
}
</style>