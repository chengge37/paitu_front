<template>
  <div class="joininfo">
    <div class="price-time">
      <div class="title">报价和周期</div>
      <div class="input-row">
        <div class="input-item">
          <span>我的报价</span>
          <div>
            <input type="text" v-model="form.price" :disabled="!editable">
            <span>元</span>
          </div>
        </div>
        <div class="input-item">
          <span>我的预计周期</span>
          <div>
            <input type="text" v-model="form.time" :disabled="!editable">
            <span>天</span>
          </div>
        </div>
      </div>
    </div>
    <div class="collection">
      <div class="title">您的作品集</div>
      <el-upload
        :disabled="!editable"
        ref="upload"
        action="https://up-z2.qiniup.com/"
        list-type="picture-card"
        show-file-list
        :limit="5"
        :data="picPostData"
        :file-list="fileList"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :before-upload="beforeUpload">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </div>
    <div class="leave-msg">
      <div class="title">留言区</div>
      <tinymce v-if="editable" v-model="form.content" :height="300" />
      <div v-else v-html="form.content"></div>
    </div>
    <div class="bottom-btn">
      <el-button type="primary" v-if="type==2">修改</el-button>
      <el-button type="primary" v-if="type==0">保存</el-button>
      <el-button @click="back">返回</el-button>
    </div>
  </div>
</template>

<script>
import Tinymce from "ServeComponents/Tinymce"
import { checkPic } from "@util/picUtil.js"
import { bidding } from '@config/api.js'
import { mapGetters } from "vuex";

  export default {
    data(){
      return{
        leaveMsg:'',
        dialogImageUrl: '',
        dialogVisible: false,
        listObj: {},
        fileList: [],
        picPostData: {},
        form:{
          bidding_id:'',
          time:'',
          price:'',
          content:'',
          extend:''
        },
        uploadArr:[],
        editable:false
      }
    },
    props:{
    	//竞标id
      taskId:{
        tyep:String,
        default:''
      },
      //type：0:添加,1：详情，2：修改
      type:{
        type:[String,Number],
        default:0
      }
    },
    components:{
      Tinymce
    },
    computed:{
      ...mapGetters(["user_data"])
    },
    created(){
      this.editable=!(this.type==1)
      console.error('joinInfo----created-------',this.editable);
    },
    mounted(){
      // 根据传过来的taskid获取任务所有的信息，填充到表单
      this.getRequest(bidding.getTaskDetail,{to_uid:this.user_data.id,id:this.taskId}).then(res=>{
        console.log(res,'任务详情')
        this.form=res;
        let arr=this.form.extend.split(',')
        console.log(arr)
        arr.forEach(item=>{
          let obj={name:'',url:''}
          obj.name=item
          obj.url='https://pic.paitume.com/'+item
          this.fileList.push(obj)
        })
        console.log(this.fileList,'最终数组')
      }).catch(err=>{
        console.error(err)
      })
    },
    methods:{
    	//返回方法
    	back(){
    		this.util.back(this);
    	},
    	
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      
      handleSuccess(response, file,fileList) {
        console.log('上传成功')
        console.log("file", file);
        console.log("handleSuccess", response);
        this.uploadArr.push(response.key)
        const uid = file.uid;
        const objKeyArr = Object.keys(this.listObj);
        for (let i = 0, len = objKeyArr.length; i < len; i++) {
          if (this.listObj[objKeyArr[i]].uid === uid) {
            this.listObj[objKeyArr[i]].url = this.config.qiniuHost + response.key;
            this.listObj[objKeyArr[i]].hasSuccess = true;
            return;
          }
        }
      },
      
      handleRemove(file) {
        console.log(file,'删除的文件')
        this.uploadArr=this.uploadArr.filter(item=>{
          return item!=file.response.key
        })
        const uid = file.uid;
        const objKeyArr = Object.keys(this.listObj);
        for (let i = 0, len = objKeyArr.length; i < len; i++) {
          if (this.listObj[objKeyArr[i]].uid === uid) {
            delete this.listObj[objKeyArr[i]];
            return;
          }
        }
      },
      
      beforeUpload(file) {
        console.log('上传之前')
        const _self = this;
        const _URL = window.URL || window.webkitURL;
        const fileName = file.uid;
        this.listObj[fileName] = {};
        return new Promise((resolve, reject) => {
          let Sync = async () => {
            try {
              let picKey = await checkPic(file, this.fileList.length, 5);
              if (picKey) {
                let token = await this.getRequest(
                  "/qiniu/userGetQiniuUpToken?key=" + picKey
                );
                console.warn("picKey---", picKey, token);
                this.picPostData = token;
                const img = new Image();
                img.src = _URL.createObjectURL(file);
                img.onload = function() {
                  _self.listObj[fileName] = {
                    hasSuccess: false,
                    uid: file.uid,
                    width: this.width,
                    height: this.height
                  };
                };
                resolve(true);
              } else {
                reject(false);
                this.listObj = {};
              }
            } catch (error) {
              reject(false);
            }
          };
          Sync();
        });
      },
      
      
    }
  }
</script>

<style lang="scss" scoped>
.joininfo{
  .price-time{
    height: 174px;
    background: #fff;
    padding: 17px 20px;
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    .title{
      font-size: 18px;
      font-weight: 600;
      margin-bottom: auto;
    }
    .input-row{
      display: flex;
      .input-item{
        display: flex;
        flex-direction: column;
        margin-right: 240px;
        & > span{
          color: #666;
          margin-bottom: 14px;
        }
        & > div{
          input{
            width: 240px;
            height: 44px;
            border: 1px solid #D0D0D0;
            margin-right: 16px;
            text-indent: 20px;
            &:focus{
              outline: none;
            }
          }
          span{
            font-weight: 600;
          }
        }
      }
    }
  }
  .collection{
    height: 270px;
    background: #fff;
    padding: 29px 20px;
    margin-bottom: 10px;
    .title{
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 29px;
    }
  }
  .leave-msg{
    min-width: 411px;
    background: #fff;
    padding: 26px 20px 14px;
    margin-bottom: 30px;
    .title{
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 22px;
    }
  }
}
</style>