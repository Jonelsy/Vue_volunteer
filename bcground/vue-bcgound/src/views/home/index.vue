<template>
<div style="display: flex;flex-direction: column">
  <el-card class="box-card" shadow="hover">
    <template #header>
      <div class="card-header">
        <img alt="" :src="useStore.users.header" />
        <h1>Hi,{{useStore.users.nickname}}</h1>
      </div>
    </template>
    <div>
      <el-row :gutter="16">
        <el-col :span="8">
          <div class="statistic-card">
            <el-statistic :value="1">
              <template #title>
                <div style="display: inline-flex; align-items: center">
                  今日在线用户
                  <el-tooltip
                      effect="dark"
                      content="今日登录用户统计数量"
                      placement="top"
                  >
                    <el-icon style="margin-left: 4px" :size="12">
                      <Warning />
                    </el-icon>
                  </el-tooltip>
                </div>
              </template>
            </el-statistic>
            <div class="statistic-footer">
              <div class="footer-item">
                <span>相比昨日</span>
                <span class="green">
              4%
              <el-icon>
                <CaretTop />
              </el-icon>
            </span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="statistic-card">
            <el-statistic :value="datas.optionTotal">
              <template #title>
                <div style="display: inline-flex; align-items: center">
                  方案总数
                  <el-tooltip
                      effect="dark"
                      content="您个性化一对一方案数量"
                      placement="top"
                  >
                    <el-icon style="margin-left: 4px" :size="12">
                      <Warning />
                    </el-icon>
                  </el-tooltip>
                </div>
              </template>
            </el-statistic>
            <div class="statistic-footer">
              <div class="footer-item">
                <span>相比昨日</span>
                <span class="red">
              0%
              <el-icon>
                <CaretBottom />
              </el-icon>
            </span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="statistic-card">
            <el-statistic :value="datas.studentTotal" title="我的学生数量">
              <template #title>
                <div style="display: inline-flex; align-items: center">
                  我的学生数量
                </div>
              </template>
            </el-statistic>
            <div class="statistic-footer">
              <div class="footer-item">
                <span>相比昨日</span>
                <span class="green">
              0%
              <el-icon>
                <CaretTop />
              </el-icon>
            </span>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-card>
  <div style="margin-top: 20px;width: 100%;height: 60vh;display: flex;flex-direction: row;">
    <div style="width: 35%;height: 100%">
      <div id="Echars"></div>
    </div>
    <div style="width: 65%;height: 100%">
      <div id="E_Right"></div>
    </div>
  </div>
</div>
</template>

<script lang="ts" setup>
import userUserStore from  '@/store/userStore/userStore'
import * as echarts from 'echarts';
import {onBeforeUnmount, onMounted, reactive, ref} from "vue";
import {getHomeItem} from "@/api/Home";
let useStore = userUserStore()

//获取首页数据
const datas = reactive({
  studentTotal:0,
  optionTotal:0,
})
let optionSchhol=[]
const getIndexItem = ()=>{

    getHomeItem(Number(localStorage.getItem('userId'))).then(res=>{
      datas.studentTotal=res.data.data.StudentsTotal
      datas.optionTotal = res.data.data.OptionsTotal
      optionSchhol = res.data.data.OptionsSchool
      optionSchhol.forEach(item=>{
        item.value = Number(item.value)
      })
      //给图标赋值后挂载
      option.series[0].data = optionSchhol
      initEchars()
      initR_Echars()
    })


}
getIndexItem()
//图饼配置
type EChartsOption = echarts.EChartsOption;
const option:any = reactive({
  optionSchhol:[],
  backgroundColor: '#ffffff',
  title: {
    text: '报考热门学校',
    left: 'center',
    top: 20,
    textStyle: {
      color: '#000000'
    }
  },

  tooltip: {
    trigger: 'item'
  },

  visualMap: {
    show: false,
    min: 0,
    max: 100,
    inRange: {
      colorLightness: [0.5, 1]
    }
  },
  series: [
    {
      name: '报考人数',
      type: 'pie',
      radius: '55%',
      center: ['50%', '50%'],
      data: [].sort(function (a, b) {
        return a.value - b.value;
      }),
      roseType: 'radius',
      label: {
        color: 'rgb(0,0,0)'
      },
      labelLine: {
        lineStyle: {
          color: 'rgb(9,9,9)'
        },
        smooth: 0.2,
        length: 10,
        length2: 20
      },
      itemStyle: {
        color: '#97d1fd',
        shadowBlur: 100,
        shadowColor: 'rgba(38,160,248,0.65)'
      },

      animationType: 'scale',
      animationEasing: 'elasticOut',

      animationDelay: function (idx) {
        return Math.random() * 200;
      }
    }
  ]
})

const initEchars = ()=>{
  let chartDom = echarts.init(document.getElementById('Echars')!);
  option && chartDom.setOption(option);
}
  //右侧柱状图配置
  let dataAxis = ['计算机科学与技术', '机械制造及其自动化', '软件工程', '网络工程', '会计', '汉语言文学', '临床医学', '电子商务', '动物科学', '动物医学', '统计学', '小学教育', '铁路交通', '轨道交通', '给排水', '电气及其自动化', '数学', '物流管理', '酒店管理', '其他'];
  let data = [22420, 12832, 19531, 23344, 29053, 13330, 2310, 6123, 2442, 3221, 903, 1249, 2130, 1122, 1323, 3334, 1928, 1223, 1125, 2203];
  let yMax = 500;
  let dataShadow = [];
  for (let i = 0; i < data.length; i++) {
    dataShadow.push(yMax);
  }
const R_option:any = reactive({
    title: {
      text: '近年份各专业报考热度比例',
      subtext: 'In recent years, the proportion of the popularity of each major'
    },
    xAxis: {
      data: dataAxis,
      axisLabel: {
        inside: true,
        color: '#000000'
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      z: 10
    },
    yAxis: {
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: 'rgba(153,153,153,0.61)'
      }
    },
    dataZoom: [
      {
        type: 'inside'
      }
    ],
    series: [
      {
        type: 'bar',
        showBackground: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#83bff6' },
            { offset: 0.5, color: '#188df0' },
            { offset: 1, color: '#188df0' }
          ])
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#2378f7' },
              { offset: 0.7, color: '#2378f7' },
              { offset: 1, color: '#83bff6' }
            ])
          }
        },
        data: data
      }
    ]
})
const initR_Echars = ()=>{
  let chartRightDom = echarts.init(document.getElementById('E_Right')!);
  R_option && chartRightDom.setOption(R_option);
  const zoomSize = 6;
  chartRightDom.on('click', function (params) {

    chartRightDom.dispatchAction({
      type: 'dataZoom',
      startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
      endValue:
          dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
    });
  });
}
onBeforeUnmount(()=>{
  let chartDom = echarts.init(document.getElementById('Echars')!);
  let chartRightDom = echarts.init(document.getElementById('E_Right')!);
  chartDom.dispose()
  chartRightDom.dispose()
})

</script>




<style scoped lang="scss">
.card-header {
  display: flex;
  align-items: center;
  img{
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  h1{
   font-size: 30px;
  font-weight: bold;
    margin-left: 20px;
  }
}
.text {
  font-size: 14px;
}
.item {
  margin-bottom: 18px;
}
.box-card {
  width: 100%;
}
#Echars{
  width: 500px;
  height: 100%;
}
#E_Right{
  width: 900px;
  height: 100%;
}
</style>