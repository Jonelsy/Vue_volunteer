<template>
  <el-button class="screenshotBtn button" type="text" @click="generateImg()">一键截图</el-button>
<div id="mainEchart">

</div>
</template>

<script lang="ts" setup>
import {useRoute} from "vue-router";
import {getMajor} from "@/api/MIT";
import {onBeforeUnmount, reactive} from "vue";
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
//图表渲染
import * as echarts from 'echarts';
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
          value: [42, 40, 35, 35, 45, 48],
          name: ''
        },
      ]
    }
  ]
})
//销毁
onBeforeUnmount(()=>{
  let chartDom = echarts.init(document.getElementById('mainEchart')!);
  chartDom.dispose()
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
</script>

<style scoped>
#mainEchart{
  width: 100%;
  height: 100%;
}
</style>