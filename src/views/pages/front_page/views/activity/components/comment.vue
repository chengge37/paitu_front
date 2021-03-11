<!--  -->
<template>
  <div>
    <div class="comment-content-box">
      <div class="no-commt" v-show="mainQuestionList.length == 0">该活动还没有人讨论哦，快来发起讨论！</div>

      <div class="main-content" v-for="(item,index) in mainQuestionList" :key="index">
        <div class="avatar-box">
          <el-image class="content-image" :src="$qiniuHost+item.uid_avatar" v-if="item.uid_avatar"></el-image>
          <el-image class="content-image" v-else :src="defaultImg"></el-image>
          <div>{{item.uid_nick}}</div>
        </div>

        <div class="content">
          <div>{{item.content}}</div>
          <div class="content-button">
            <span class="time">{{item.create_time|format_time}}</span>
            <span class="reply" @click="openReplyCommit(index,item)" v-if="user_data !== null">回复</span>
          </div>
          <div v-if="item.children.length > 0">
            <div class="children" v-for="(children,index) in item.children" :key="index">
              <div class="children-name">{{children.user.nick}}</div>
              <div class="children-content">
                <div>
                  <span>回复{{children.to_user.nick}}：</span>
                  <span>{{children.content}}</span>
                </div>
                <div class="content-button">
                  <span class="time">{{children.create_time|format_time}}</span>
                  <!-- <span class="reply" @click="openChildrenCommit(index,children)">回复</span> -->
                </div>
              </div>
            </div>
          </div>
          <div class="commt" v-if="showcommt == index">
            <el-input
              type="textarea"
              :placeholder="placeholderText"
              v-model="commt"
              show-word-limit
              maxlength="1024"
              minlength="2"
              :autosize="{ minRows: 3}"
            ></el-input>
            <el-button type="primary" @click="submit">提交</el-button>
          </div>
        </div>
      </div>
      <div class="commt" v-if="!showcommt&&user_data !== null">
        <el-input
          type="textarea"
          :placeholder="NewplaceholderText"
          v-model="Addcommt"
          show-word-limit
          maxlength="1024"
          minlength="2"
          :autosize="{ minRows: 3}"
        ></el-input>
        <el-button type="primary" @click="addNewCommt">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { question } from "@/config/api";
import { format } from "date-fns";
import { mapGetters } from "vuex";
export default {
  props: {
    data: {
      type: Object
    }
  },
  data(){
  	return {
  		 defaultImg: this.config.male_pic,
	    //   评论列表
	    mainQuestionList: [],
	    // 开启主评论对话框
	    showcommt: null,
	    // 开启子评论对话框
	    showcommtchildren: null,
	    // 主评论对话框内容
	    commt: "",
	    // 添加评论
	    Addcommt: "",
	    // 主对话框中提示
	    placeholderText: "请输入回复内容",
	    // 子对话框中的提示
	    NewplaceholderText: "请输入回复内容",
	    // 初始化时接受的值
	    getQdata: {
	      page: 1,
	      page_size: 10,
	      type: null,
	      relation_id: null
	    },
	    submit_data: {
	      qid: null,
	      rid: null,
	      content: ""
	    },
	    submit_childer_data: {
	      qid: null,
	      rid: null,
	      content: ""
	    }
  	}
   
  },

  components: {},
  computed: {
    ...mapGetters(["user_data"])
  },
  created() {
    console.log("comment-----------data", this.data);
    this.getQdata.type = this.data.type;
    this.getQdata.relation_id = this.data.id;
  },
  mounted() {
    console.log(this.getQdata);
    this.getCommt();
  },

  methods: {
    getCommt() {
      this.getRequest(question.ajaxGetall, this.getQdata).then(res => {
        console.log(res);
        this.mainQuestionList = res.rows;
      });
    },
    openReplyCommit(id, data) {
      if (data.children.length <= 10) {
        if (this.showcommt === id) {
          this.showcommt = null;
          this.placeholderText = "请输入回复内容";
        } else {
          this.showcommt = id;
          this.placeholderText = "@" + data.uid_nick + "：";
          console.log(data);
          this.submit_data.qid = data.id;
          this.submit_data.rid = 0;
        }
      } else {
        this.$message({
          type: "error",
          message: "错误！该评论已达可被评论上限"
        });
      }
    },
    // openChildrenCommit(id, data) {
    //   if (this.showcommtchildren === id) {
    //     this.showcommtchildren = null;
    //     this.childrenplaceholderText = "请输入回复内容";
    //   } else {
    //     this.showcommtchildren = id;
    //     this.childrenplaceholderText = "@" + data.user.nick + "：";
    //     this.submit_childer_data.qid = data.qid;
    //     this.submit_childer_data.rid = data.id;
    //     console.log(data);
    //   }
    // },
    submit() {
      this.submit_data.content = this.commt;
      this.postRequest(question.ajaxUserReply, this.submit_data).then(res => {
        console.log(res);
        if (res.id !== undefined) {
          this.$alert("您的回复已成功发送，审核通过之后方可显示", "提示", {
            confirmButtonText: "确定",
            callback: action => {
              this.commt = "";
              this.showcommt = null;
              this.placeholderText = "请输入回复内容";
            }
          });
        }
      });
    },
    addNewCommt() {
      let data = {
        to_uid: this.data.to_uid,
        content: this.Addcommt,
        type: this.data.type,
        relation_id: this.data.id
      };
      console.log(data);
      this.postRequest(question.ajaxUserAdd, data).then(res => {
        console.log(res);
        if (res !== undefined) {
          this.$alert("您的回复已成功发送，审核通过之后方可显示", "提示", {
            confirmButtonText: "确定",
            callback: action => {
              this.Addcommt = "";
            }
          });
        }
      });
    }
    // children_submit() {
    //   this.submit_childer_data.content = this.commtchildren;
    //   this.postRequest(question.ajaxUserReply, this.submit_childer_data).then(res => {
    //       console.log(res);
    //       if (res.id !== undefined) {
    //         this.$alert(
    //           "您的回复已成功发送，审核通过之后方可被对方查看",
    //           "提示",
    //           {
    //             confirmButtonText: "确定",
    //             callback: action => {
    //               this.commtchildren = "";
    //               this.showcommtchildren = null;
    //               this.childrenplaceholderText = "请输入回复内容";
    //             }
    //           }
    //         );
    //       }
    //     }
    //   );
    // }
  },
  watch: {
    data(e) {
      console.log(e);
    }
  },
  filters: {
    format_time(data) {
      return format(data * 1000, "YYYY-MM-DD HH-mm");
    }
  }
};
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
.comment-content-box {
  .no-commt {
    text-align: center;
  }
  .avatar-box {
    text-align: center;
    line-height: 20px;
  }
  .main-content {
    display: flex;
    margin-top: 20px;
    .content-image {
      width: 80px;
      height: 80px;
      flex: 1;
    }
    .content {
      margin-left: 30px;
      flex: 8.5;
      color: #333333;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      .children {
        margin-top: 30px;
        display: flex;
        margin-bottom: 30px;
        .children-name {
          margin-right: 21px;
        }
        .children-content {
          flex: 8.5;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
      }
      .content-button {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;

        .time {
          color: #999999;
        }
      }

      .reply {
        cursor: pointer;
      }
    }
  }
  .commt {
    background-color: #fafafa;
    padding: 10px;
    text-align: right;
    margin-top: 10px;
    /deep/ .el-button--primary {
      background-color: #54ad17;
      border-radius: 0px;
      padding: 9px 26px;
      margin-top: 10px;
    }
  }
}
</style>