<template>
  <router-view/>
</template>
<script>
//解决elementplus自适应刷新BUG
const debounce = (fn,delay)=>{
  let timer = null
  return function(){
    let context = this;
    let args = arguments
    clearTimeout(timer)
    timer = setTimeout(function (){
      fn.apply(context, args)
    },delay)
  }
}
const _ResizeObserver = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ResizeObserver{
  constructor(callback) {
    callback=debounce(callback,16)
    super(callback);
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
