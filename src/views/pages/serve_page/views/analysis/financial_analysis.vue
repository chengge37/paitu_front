<template>
  <div>
    <AnalysisHead :type="3" 
    @selectTab="selectTab" 
    @handleFresh="handleFresh" 
    @selectTime="selectTime"
    @selectTimeRange="selectTimeRange"
    @clickPurpleBtn="clickPurpleBtn"
    @clickSearch="clickSearch"
    @clickAttr="clickAttr">
    </AnalysisHead>
  </div>
</template>

<script>
import AnalysisHead from '../../components/AnalysisHead/index'
  export default {
    data(){
      return{

      }
    },
    methods:{
      // 选择器材或者影棚
      selectTab(){
        console.warn('选择器材数据或者影棚数据')
      },
      // 刷新
      handleFresh(){
        console.warn('刷新')
      },
      // 点击昨日今日上周...
      selectTime(){
        console.warn('点击昨日今日上周')
      },
      // 选择日期范围
      selectTimeRange(){
        console.warn('选择日期范围')
      },
      // 查看列表
      clickPurpleBtn(){
        console.warn('查看列表')
      },
      // 查找
      clickSearch(){
        console.warn('查找')
      },
      // 点击租借次数，成交
      clickAttr(){
        console.warn('点击租借次数，成交')
      }
    },
    components:{
      AnalysisHead
    }
  }
</script>

<style lang="scss" scoped>

</style>