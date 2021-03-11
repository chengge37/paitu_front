<template>
  <div class="wrap">
    <audio class="music" controls autoplay loop>
      <source src="https://pic.paitume.com/audio/A_Bond_Forever_Strong.mp3" type="audio/mpeg">
      <source src="https://pic.paitume.com/audio/A_Bond_Forever_Strong.mp3" type="audio/ogg">
      您的浏览器不支持 audio 元素。
    </audio>
    <div class="center">
      <img v-for="(item,index) in arr" :src="item.url" alt="" :key="index">
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        arr:[
          {
            url:'https://pic.paitume.com/images/report1.png'
          },
          {
            url:'https://pic.paitume.com/images/report2.png'
          },
          {
            url:'https://pic.paitume.com/images/report3.png'
          },
          {
            url:'https://pic.paitume.com/images/report4.png'
          },
          {
            url:'https://pic.paitume.com/images/report5.png'
          },
          {
            url:'https://pic.paitume.com/images/report6.png'
          },
          {
            url:'https://pic.paitume.com/images/report7.png'
          },
          {
            url:'https://pic.paitume.com/images/report8.png'
          },
          {
            url:'https://pic.paitume.com/images/report9.png'
          },
          {
            url:'https://pic.paitume.com/images/report10.png'
          },
          {
            url:'https://pic.paitume.com/images/report11.png'
          },
        ],
        // musicUrl:require('./report_bgm.mp3').default
      }
    }
  }
</script>

<style lang="scss" scoped>
.wrap{
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .music{
    margin-bottom: 20px;
  }
  .center{
    width: 750px;
    display: flex;
    flex-direction: column;
  }
}
</style>