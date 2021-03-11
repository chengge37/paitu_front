<template>
  <div :style="`width: ${w};height:${h};`" :id="id" :class="className">

  </div>
</template>

<script>
  import * as echarts from 'echarts';
  export default {
    props: ['options','id','className','w','h'],
    data () {
      return {
        myChart:null
      }
    },
    created(){
      console.warn(this.options,this.id,this.calss,'8888')
    },
    mounted(){
      this.myChart = echarts.init(document.getElementById(this.id));
      this.myChart.setOption(this.options);
      //根据窗口的大小变动图表 --- 重点
      window.addEventListener("resize",()=>{
          this.myChart.resize();
      })
      // window.onresize = function(){
      //     myChart.resize();
      // }
    },
    watch:{
      options:{
        deep: true,
        handler: function (newVal,oldVal){
          console.warn('newValue', newVal);
          console.warn('oldValue', oldVal.name);
          this.myChart.setOption(newVal);
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" scoped>

</style>
