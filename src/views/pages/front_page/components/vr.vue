<template>
  <div>
    <!-- 全景图 -->
      <el-card class="panorama-wrap">
      	<i class='el-icon-close close' @clikc="closeVr"></i>
        <!-- 标题 -->
        <Title titleName="全景图"></Title>
        <!-- 全景主体 -->
        <div class="main">
          <div class="pannel" id="pan">
            <!-- <div>全景图展示区</div> -->
            <div class="pannel-controls" v-if="pannelList.length>0">
              <div class="control-show" id="pan-up" v-show="!showList" @click="toggleList">
                <i class="el-icon-arrow-up"></i>
              </div>
              <div class="control-show" id="pan-down" v-show="showList" @click="toggleList">
                <i class="el-icon-arrow-down"></i>
              </div>
              <div class="list-wrap" v-show="showList">
                <div class="left" id="pan-left" @click="pageUp">
                  <i class="el-icon-arrow-left"></i>
                </div>

                <div class="img-list">
                  <div
                    v-for="(item,index) in pannelList.slice((this.pageNo-1)*5,(this.pageNo-1)*5+5)"
                    class="small-img"
                    :class="{choose:item.checked}"
                    :key="index"
                    @click="changePannel(item,index)"
                  >
                    <img :src="item.url" :title="item.title" />
                    <div class="title">
                      <span v-text="item.title"></span>
                    </div>
                  </div>
                </div>

                <div class="right" id="pan-right" @click="pageDown">
                  <i class="el-icon-arrow-right"></i>
                </div>
              </div>
            </div>
            <div class="before-display" v-else>全景图片展示区</div>
          </div>
        </div>
      </el-card>
      <div class="mask"></div>
  </div>
</template>

<script>

  export default {
    data(){
      return{
      	isShow:this.openVr,
        pannelArr: [],
        pannelList: [],
        pageNo: 1,
        afterAdd: true,
        viewer: null,
        showList: true,
        inputID: "",
        editable:true,
      }
    },
//  props:['vrArray','initIndex'],
		props:{
			vrArray:{
				type:Array,
				default:[]
			},
			initIndex:{
				type:Number,
				default:0
			},
		},
    created(){
      this.vrArray.forEach((item,index)=>{
        item.id=item.url+index
        this.$set(item,'checked',false)
        // item.checked=false
      })
      console.log(this.vrArray,this.initIndex,'dsfsdafsdafsdaf88')
      this.pannelList=[...this.vrArray]
      console.log(this.pannelList,'ooooooooooooooooooooo')
    },
    mounted(){
      this.init();
      
      document.addEventListener('mouseup',(e) =>{
        var _con = document.getElementById('pan')
        if(_con) {
          if(!_con.contains(e.target)) {
            this.$emit('update:isShowVr',false);
          }
        }
      })
    },
    methods:{
    	//关闭全景
    	closeVr(){
    		this.$emit('update:isShowVr',false);
    	},
      // 全景图初始化
      init() {
        this.viewer = pannellum.viewer("pan", {
          autoLoad: true, // 一进入页面就自动加载全景图
          default: {
            // 默认总体设置
            firstScene: this.pannelList[0].id, // 设置全景图群的首张全景展示，值为全景图id
            author: "派图租赁科技", // 设置作者
            sceneFadeDuration: 1000 // 全景图切换过渡时间
          },

          scenes: {
            // 所有全景图都放置在这里面
            [this.pannelList[0].id]: {
              // 全景图id
              title: this.pannelList[0].title, // 全景图标题
              hfov: 120, // 数值越小，视野越近，数值越大，视野越远
              pitch: 0, // 数值越大，视野越向上，数值越小视野越向下。0为水平视野
              yaw: 0, // 数值越大，视野越往右
              type: "equirectangular", // 指定了全景类型。可能是equirectangular，cubemap或 multires。默认为equirectangular。
              panorama: this.pannelList[0].url, // 全景图url路径
              autoLoad: true, // 一进入页面就自动加载全景图
              autoRotate: 0 // 全景图自动旋转，数值为正代表逆时针，数值为负代表顺时针。数值代表每秒旋转的角度
              // "preview": '',                   // 设置全景图预览，值为url路径
              // "hotSpots": [                    // 这指定了一个热点阵列，可以链接到其他场景，信息或外部链接
              //     {
              //         "pitch": 0,           // 以全景图中心点为原点，相当于y轴的坐标，数值越大在y轴上的位置越高
              //         "yaw": 57,              //以全景图中心点为原点，相当于x轴的坐标。数值越大在x轴上的位置越往右
              //         "type": "scene",         // 指定热点的类型。可scene用于场景链接或info 信息热点。scene 热点需要巡视配置文件。
              //         "text": "去看公司",       // 鼠标悬停在热点标记上时显示的文本
              //         "sceneId": "house"       // 点击热点切换到另一个全景，根据目标全景图的id跳转
              //     }
              // ]
            }
          }
        });
        this.pannelList.forEach(item => {
          this.viewer.getConfig().scenes[item.id] = {
            title: item.title,
            panorama: item.url
          };
        });
        this.viewer.loadScene(this.pannelList[this.initIndex].id);
        this.$set(this.pannelList[this.initIndex],'checked',true)
      },
      // 切换全景图
      changePannel(item, index) {
        this.pannelList.forEach((each, j) => {
          this.$set(each,"checked",false)
          // each.checked = false;
        });
        let num = (this.pageNo - 1) * 5 + index;
        // this.pannelList[num].checked = true;
        this.$set(this.pannelList[num],'checked',true)
        this.viewer.loadScene(item.id);
      },
      // 点击左右箭头切换全景图预览列表的上下页
      pageUp() {
        if (this.pageNo === 1) {
          return;
        }
        this.pageNo--;
      },
      pageDown() {
        if (this.pageNo === Math.ceil(this.pannelArr.length / 5)) {
          return;
        }
        this.pageNo++;
      },
      // 全景图下方控制条的显示隐藏
      toggleList() {
        this.showList = !this.showList;
      },
    }
  }
</script>

<style lang="scss" scoped>
	
// 全景图
  .panorama-wrap {
    z-index: 999;
    position:absolute;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
   	width:1200px;

    .close{
    	position:absolute;
    	top:10px;
    	right:10px;
    	display:block;
    	border:1px solid #000;
    	width:25px;
    	height:25px;
    	border-radius:15px;
    	text-align:center;
    	line-height:25px;
    	cursor:pointer;
    }
    // 主体
    .main {
      padding-left: 20px;
      margin-top: 18px;
      height: 600px;
      display: flex;
      margin-bottom: 30px;
      .pannel {
        width: 100%;
        background: rgb(238, 238, 238);
        border: 1px solid rgb(204, 204, 204);
        border-radius: 2px;
        text-align: center;
        margin-right: 30px;
        .before-display {
          text-align: center;
          font-size: 50px;
          line-height: 600px;
        }
        .pannel-controls {
          background:rgba(0,0,0,.5);
          position: absolute;
          bottom: 0;
          z-index: 2;
          width: 100%;
          display: flex;
          flex-direction: column;
          .control-show {
            height: 30px;
            line-height: 30px;
            cursor: pointer;
            font-size: 20px;
            color: #fff;
          }
          .list-wrap {
            flex: 1;
            display: flex;
            .left,
            .right {
              width: 40px;
              height: 120px;
              line-height: 120px;
              cursor: pointer;
              z-index: 9999;
              font-size: 20px;
              color: #fff;
            }
            .left:hover,
            .right:hover{
              transform: scale(1.5)
            }
            .img-list {
              flex: 1;
              overflow: hidden;
              display: flex;
              height: 120px;
              align-items: flex-end;
              .small-img {
                // margin-right: 20px;
                // width: 180px;
                width: 19%;
                margin-right: 1.25%;
                height: 100px;
                cursor: pointer;
                position: relative;
                z-index: 9999;
                opacity: 0.6;
                .title {
                  width: 100%;
                  padding-left: 10px;
                  box-sizing: border-box;
                  position: absolute;
                  bottom: 0;
                  background:rgba(0,0,0,.5);
                  color: #fff;
                  height: 38px;
                  font-size: 14px;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  span:last-child {
                    cursor: pointer;
                  }
                  div{
                    width:41px;
                    height: 100%;
                    background:rgb(0,0,0);
                    display: flex;
                    .el-icon-delete {
                      margin: auto;
                    }
                  }
                }
                img {
                  width: 100%;
                  height: 100%;
                }
              }
              .small-img:nth-child(5n){
                margin-right: 0;
              }
              .small-img:hover {
                // width: 190px;
                height: 120px;
                opacity: 1;
              }
              .choose {
                // width: 190px;
                height: 120px;
                opacity: 1;
              }
            }
          }
        }
      }
      .pannel /deep/ .pnlm-panorama-info {
        top: 5px;
        left: 0;
        height:60px;
        background:rgba(0,0,0,.2);
        padding: 5px;
        box-sizing: border-box;
        text-align: center;
        .pnlm-title-box{
          padding-left: 0;
          font-size: 18px;
          position: static;
          display: block;
        }
        .pnlm-author-box{
          padding-left: 0;
          position: static;
          display: block;
        }
      }
      .pannel /deep/ .pnlm-controls-container {
        left: initial;
        right: 13px;
        top: 13px;
      }
    }
  }
  .mask{
  	    position: fixed;
	    left: 0;
	    top: 0;
	    width: 100%;
	    height: 100%;
	    opacity: .5;
	    background: #000;
	    z-index:100;
  }
</style>
