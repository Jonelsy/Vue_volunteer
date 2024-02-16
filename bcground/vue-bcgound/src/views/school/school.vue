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
                <el-input v-model="data.ruleForm.name" placeholder="请输入" clearable @keyup.enter="getSchool" />
                <el-button style="margin-left: 10px" :icon="'Search'" circle type="primary" @click="getSchool"/>
              </div>
            </div>
            <div style="display: flex;flex-direction: column;margin-top: 15px">
              <el-radio-group v-model="data.ruleForm.subject" @change="getSchool">
                <el-radio label="0" size="large" border>普通文科</el-radio>
                <el-radio label="1" size="large" border>普通理科</el-radio>
              </el-radio-group>
              <el-radio-group v-model="data.ruleForm.level" style="margin-top: 15px" @change="getSchool">
                <el-radio label="1" size="large" border>一本</el-radio>
                <el-radio label="2" size="large" border>二本</el-radio>
              </el-radio-group>
              <div style="margin-top: 10px;">
                <el-check-tag style="margin-right: 5px;margin-top: 5px" :key="index" v-for="(item,index) in data.CollegeProvince" :checked="item.checked"   @change="ChangeCollegePrv(item)">
                  {{ item.name }}
                </el-check-tag>
              </div>
              <div style="margin-top: 10px;">
                <el-check-tag style="margin-right: 5px;margin-top: 5px" :key="index" v-for="(item,index) in data.CollegeLevel" :checked="item.checked"  @change="ChangeCollegePrv(item)">
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
          <el-table-column prop="LowestAdmissionScore" label="投档最低分" width="120" align="center"/>
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
      </el-table-column>
    </el-table>
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
import {reactive} from "vue";
import {getItems} from "@/api/school";

const tableData=[]
let data = reactive({
  tableData:[] as any,
  ruleForm:{
    page:1,
    pageSize:10,
    name:'',
    level:'1',
    subject:'0',
  },
  total:0,
  CollegeProvince : [
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
      checked:false,
      name:'211'
    },
    {
      checked:false,
      name:'985'
    }
  ]
})
//获取学校
const getSchool = ()=>{
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
}
getSchool()
//分页
const handleCurrentChange = (value:number)=>{
  data.ruleForm.page = value;
  getSchool()
}
//点击省份标签
const ChangeCollegePrv = (item:any)=>{
  item.checked = !item.checked
}

</script>

<style scoped lang="scss">
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
</style>