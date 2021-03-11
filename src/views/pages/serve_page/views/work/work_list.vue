<template>
  <div class="app-container">
    <div class="left">
      <div class="number">
        <span class="todo-num">{{agencyArr.length}} 个代办</span>
      </div>

      <div class="search-time">
        <div class="search">
          <el-input v-model="searchText" placeholder="请输入工作名称"></el-input>
          <span class="search-btn" @click="searchAgency">搜索</span>
        </div>
        <div class="time">
          <span class="time-label">日期：</span>
          <el-date-picker
            @change="getTimeAgency"
            v-model="time"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </div>
      </div>

      <div class="add">
        <span class="btn" @click="openAgency">{{'+ 添加代办'}}</span>
        <el-radio-group v-model="radio" @change="selectOwnAll">
          <el-radio label="1">自己</el-radio>
          <el-radio label="0">全部</el-radio>
        </el-radio-group>
        
        <!-- 新增代办 -->
        <div class="agency-box" v-if="showAgency">
          <el-input class="title-input" v-model="inputTitle" placeholder="请输入标题 ..."></el-input>
          <div class="creator-info">
            <div class="avatar">
              <img :onerror="util.maleAvatar" :src="$qiniuHost+user_data.avatar" alt="">
            </div>
            <span class="name">{{user_data.nick}}</span>
          </div>
          <div class="system-set">
            <div class="first-row">
              <span class="icon"></span>
              <span>优先级</span>
              <el-select :class="{'status-important':addType==2,'status-urgent':addType==3}" v-model="addType" placeholder="请选择">
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="second-row">
              <span class="icon"></span>
              <span>开始时间</span>
              <el-date-picker
                v-model="addStartTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期时间">
              </el-date-picker>
            </div>
            <div class="second-row">
              <span class="icon"></span>
              <span>截止时间</span>
              <el-date-picker
                v-model="addEndTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期时间">
              </el-date-picker>
            </div>
            <div class="third-row">
              <span class="icon"></span>
              <span>状态</span>
              <el-select v-model="addStatus" placeholder="选择">
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="fouth-row">
              <span class="icon"></span>
              <span>执行人</span>
              <div class="select-box" v-if="showSelectBox1">
                <div class="box-title">
                  <span>请选择员工</span>
                  <i class="el-icon-close" @click="closeSelectBox(1)"></i>
                </div>
                <el-cascader
                  :options="menberOptions"
                  @change="selectMenbers"
                  v-model="checkArr"
                  :props="props"
                  clearable>
                </el-cascader>
                <div class="box-bottom">
                  <span @click="confirmSelect(1)">确定</span>
                  <span @click="closeSelectBox(1)">取消</span>
                </div>
              </div>
              <i class="el-icon-circle-plus-outline" @click="openSelectBox(1)"></i>
              <div class="menber-list">
                <span :title="item" class="menber" v-for="(item,index) in checkedNames" :key="index">{{item[0]}}</span>
              </div>
            </div>
          </div>
          <el-input
            class="dec"
            type="textarea"
            resize="none"
            :rows="2"
            placeholder="请输入内容"
            v-model="addDec">
          </el-input>
          <div class="warn-type">
            <p>告警方式</p>
            <div class="type">
              <el-checkbox-group v-model="warnType" @change="selectWarn">
                <el-checkbox label="1" value="1">短信</el-checkbox>
                <el-checkbox label="2" value="2">邮箱</el-checkbox>
                <el-checkbox label="3" value="3">站内信</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div class="bottom-btn">
            <span @click="confirmAdd">确 定</span>
            <span @click="confirmAddContinue">确定并继续新增</span>
            <span @click="closeAgency">取 消</span>
          </div>
        </div>


      </div>
      <div class="todo-list new-scroll">
        <div class="todo-row" :class="{active:currentIndex==index}" v-for="(item,index) in agencyArr" :key="index" @click="selectAgency(item,index)">
          <i class="el-icon-circle-check" :class="{'tick':item.status==3}" @click.stop="fastChangeStatus(item)"></i>
          <div class="title-menber">
            <p class="title">{{item.name}}</p>
            <p class="menber">
              <span v-if="item.employee_array.length==1">{{item.employee_array[0].id==user_data.id?'自己':item.employee_array[0].name}}</span>
              <span v-else>{{item.employee_name_array.split(',')[0]+','+item.employee_name_array.split(',')[1]}}等{{item.employee_array.length}}人参与</span>
              <!-- <span v-if="item.employee_array.length"></span>
              <span v-if="item.employee_array[0].id==user_data.id">自己</span>
              <span>{{item.employee_array[0].name}}</span> -->
            </p>
          </div>
          <div class="status-time">
            <div class="status-row">
              <span class="time-out" v-if="Date.parse(new Date())>Date.parse(new Date(item.end_time))">已逾期，请尽快处理</span>
              <!-- <span class="time-out">{{dealStatus(item.status)}}</span> -->
              <span class="pointer-menber" v-if="item.employee_array.length>1">多人</span>
              <span class="pointer-menber" v-if="item.employee_array.length>1&&item.includeOwn">自己</span>
              <span class="pointer-menber" v-if="item.employee_array.length==1&&item.employee_array[0].id==user_data.id">自己</span>
              <span class="status" :class="{'status-important':item.type==2,'status-urgent':item.type==3}">{{dealType(item.type)}}</span>
              <!-- <span>重要</span>
              <span>一般</span> -->
            </div>
            <div class="create-time">创建于：{{timeFormat(item.create_time)}}</div>
          </div>
        </div>
        <div class="no-data" v-if="showNoData&&agencyArr.length==0">暂无工作</div>
      </div>
    </div>
    <div class="right" v-if="agencyArr.length!=0">
      <div class="input-system">
        <div class="system-head">
          <div class="title-list">
            <span class="main-title">{{detail.name}}</span>
            <span class="move-btn" @click="openMove">动态列表</span>
            <div class="move-list" v-if="showMove">
              <div class="list-title">
                <span>动态列表</span>
                <i class="el-icon-close" @click="closeMove"></i>
              </div>
              <div class="item-row-wrap new-scroll" ref="moveList">
                <div class="item-row" v-for="(item,index) in operationArr" :key="index">
                  <div>{{item.con}}</div>
                  <div class="thing1" v-if="false">
                    <span>庞某</span>
                    <span>把</span>
                    <span>状态</span>
                    <span>标记为</span>
                    <span>结办</span>
                  </div>
                  <div class="thing2" v-if="false">
                    <span>某某</span>
                    <span>把</span>
                    <span>某某</span>
                    <span>加入了</span>
                    <span>团队</span>
                  </div>
                  <div class="thing3" v-if="false">
                    <span>某某</span>
                    <span>把</span>
                    <span>优先级</span>
                    <span>更改为</span>
                    <span>一般</span>
                  </div>
                  <div class="thing-time">{{timeFormat(item.create_time)}}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="who-create">
            <div class="avatar"></div>
            <span>{{detail.c_name}}</span>
            <span> 创建于</span>
            <span>{{timeFormat(detail.create_time)}}</span>
          </div>
        </div>
        <div class="system-set">
          <div class="first-row">
            <span class="icon"></span>
            <span>优先级</span>
            <el-select :disabled="(detail.cid==0?detail.uid:detail.cid)!=user_data.id" :class="{'status-important':editType==2,'status-urgent':editType==3}" v-model="editType" placeholder="请选择">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="second-row">
            <span class="icon"></span>
            <span>开始时间</span>
            <el-date-picker
              :disabled="(detail.cid==0?detail.uid:detail.cid)!=user_data.id"
              v-model="editStartTime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期时间">
            </el-date-picker>
          </div>
          <div class="second-row">
            <span class="icon"></span>
            <span>截止时间</span>
            <el-date-picker
              :disabled="(detail.cid==0?detail.uid:detail.cid)!=user_data.id"
              v-model="editEndTime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期时间">
            </el-date-picker>
          </div>
          <div class="third-row">
            <span class="icon"></span>
            <span>状态</span>
            <el-select v-model="editStatus" placeholder="选择">
              <el-option
                :disabled="canSelectStatus"
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="fouth-row">
            <span class="icon"></span>
            <span>执行人</span>
            <div class="select-box" v-if="showSelectBox2">
              <div class="box-title">
                <span>请选择员工</span>
                <i class="el-icon-close" @click="closeSelectBox(2)"></i>
              </div>
              <el-cascader
                :options="menberOptions"
                :props="props"
                v-model="editCheckArr"
                clearable>
              </el-cascader>
              <div class="box-bottom">
                <span @click="confirmSelect2()">确定</span>
                <span @click="closeSelectBox2()">取消</span>
              </div>
            </div>
            <i class="el-icon-circle-plus-outline" @click="openSelectBox(2,detail.employee_array)"></i>
            <div class="menber-list">
              <span :title="item" class="menber" v-for="(item,index) in editCheckedNames" :key="index">{{item[0]}}</span>
            </div>
          </div>
          <!-- <div class="fifth-row">
            <span>修改</span>
            <span>删除</span>
          </div> -->
        </div>
        <el-input
          :disabled="(detail.cid==0?detail.uid:detail.cid)!=user_data.id"
          class="system-dec new-scroll"
          type="textarea"
          resize="none"
          :rows="2"
          placeholder="请输入内容"
          v-model="editDec">
        </el-input>
        <div class="warn-type">
          <p>告警方式</p>
          <div class="type">
            <el-checkbox-group v-model="editWarnType" :disabled="(detail.cid==0?detail.uid:detail.cid)!=user_data.id">
              <el-checkbox label="1" value="1">短信</el-checkbox>
              <el-checkbox label="2" value="2">邮箱</el-checkbox>
              <el-checkbox label="3" value="3">站内信</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div class="bottom-btn">
          <span @click="editAgency(detail.id,editStartTime,editEndTime,editDec,detail.name,editCheckedMenbers,editStatus,editType,editWarnType)">确 定</span>
          <span @click="cancel">取 消</span>
          <span @click="delAgency(detail.id)">删 除</span>
        </div>
      </div>
      <div class="message">
        <div class="message-head">
          留言
        </div>
        <div class="message-box-wrap new-scroll">         
          <div class="message-box">
            <div class="message-row" v-for="(item,index) in newMsgArr" :key="index">
              <div class="avatar">
                <img :onerror="util.maleAvatar" :src="$qiniuHost+item.op_name.avatar" alt="">
              </div>
              <div class="right-part">
                <div class="main-msg">
                  <p class="name">{{item.op_name.name}}</p>
                  <p class="time">{{timeFormat(item.create_time)}}</p>
                  <p class="content">
                    {{item.con}}
                  </p>
                  <div class="msg-btn">
                    <span @click="handleReply(index)">{{replyIndex===index?'取消':'回复'}}</span>
                    <span @click="delMsg(item.id)">删除</span>
                  </div>
                </div>
                <div class="reply-input" v-if="replyIndex===index">
                  <el-input
                    type="textarea"
                    autosize
                    placeholder="请输入内容"
                    v-model="replyContent">
                  </el-input>
                  <span class="send-btn" @click="replyMsg(item.j_id,item.id,replyContent)">确定</span>
                </div>
                <div class="reply-content" v-if="item.children.length!=0">
                  <div class="first-reply" v-for="(each,j) in item.children" :key="j">
                    <div class="content new-scroll">
                      {{each.con}}
                    </div>
                    <div class="who-time">
                      <span class="a-line">———</span>
                      <span>{{each.op_name.name}}</span>
                      <span>{{timeFormat(each.create_time)}}</span>
                    </div>
                    <div class="reply-btn" @click="handleReply((''+index+j))">{{replyIndex===(''+index+j)?'取消':'回复'}}</div>
                    <div class="reply-input" v-if="replyIndex===(''+index+j)">
                      <el-input
                        type="textarea"
                        autosize
                        placeholder="请输入内容"
                        v-model="replyContent">
                      </el-input>
                      <span class="send-btn" @click="replyMsg(item.j_id,each.id,replyContent)">确定</span>
                    </div>
                    <div class="second-reply" v-for="(every,n) in each.children" :key="n">
                      <div class="content new-scroll">
                        {{every.con}}
                      </div>
                      <div class="who-time">
                        <span class="a-line">———</span>
                        <span>{{every.op_name.name}}</span>
                        <span>回复</span>
                        <span>{{each.op_name.name}}</span>
                        <span>{{timeFormat(every.create_time)}}</span>
                      </div>
                      <div class="reply-btn" @click="handleReply((''+index+j+n))">{{replyIndex===(''+index+j+n)?'取消':'回复'}}</div>
                      <div class="reply-input" v-if="replyIndex===(''+index+j+n)">
                        <el-input
                          type="textarea"
                          autosize
                          placeholder="请输入内容"
                          v-model="replyContent">
                        </el-input>
                        <span class="send-btn" @click="replyMsg(item.j_id,every.id,replyContent)">确定</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="leave-msg">
          <el-input
            resize="none"
            type="textarea"
            :rows="2"
            placeholder="说点什么 ..."
            v-model="inputText">
          </el-input>
        </div>
        <div class="bottom-btn">
          <span @click="replyMsg(detail.id,0,inputText)">确 定</span>
          <span @click="cancelReply">取 消</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {worklist,employee} from '@config/api.js'
import { mapGetters } from "vuex";

  export default {
    data(){
      return{
        agencyArr:[],
        agencyArrCopy:[],
        time:'',
        options1: [
          {
            value: '1',
            label: '一般'
          }, 
          {
            value: '2',
            label: '重要'
          }, 
          {
            value: '3',
            label: '紧急'
          }
        ],
        options2: [
          // {
          //   value: '0',
          //   label: '未开始'
          // }, 
          {
            value: '1',
            label: '待办'
          },
          // {
          //   value: '2',
          //   label: '处理'
          // }, 
          {
            value: '3',
            label: '结办'
          }
        ],
        props: { multiple: true },
        menberOptions: [],
        showSelectBox1:false,
        showSelectBox2:false,
        warnList:[],
        inputText:'',
        reply:[],
        showMove:false,
        radio:'0',
        inputTitle:'',
        dec:'',
        showAgency:false,
        addType:'',
        addStartTime:'',
        addEndTime:'',
        addStatus:'',
        checkedMenbers:[],
        checkArr:[],
        checkArr2:[],
        addDec:'',
        warnType:[],
        checkedNames:[],
        currentIndex:0,
        detail:{
          cid: "",
          create_time: "",
          edit_time: null,
          employee_array: [],
          employee_name_array: "",
          end_time: "",
          id: "",
          name: "",
          notice_way: "",
          remark: "",
          start_time: "",
          status: "",
          type: ""
        },
        editType:'',
        editStartTime:'',
        editEndTime:'',
        editStatus:'',
        editDec:'',
        editWarnType:[],
        editCheckedMenbers:[],
        editCheckArr:[],
        editCheckArr2:[],
        editCheckedNames:[],
        isAll:'0',
        st:'',
        et:'',
        canSelectStatus:true,
        operationArr:[],
        msgArr:[],
        replyIndex:-1,
        replyContent:'',
        newMsgArr:[],
        loopNum:0,
        cArr:[],
        movePage:1,
        searchText:'',
        showNoData:false
      }
    },
    created(){
      this.getAgency(1,999,undefined,undefined,0,undefined,0)
      this.getStaffGroup()
    },
    mounted(){
      // this.$refs.moveList.addEventListener('scroll', this.listBottom)
    },
    computed: {
      ...mapGetters(["user_data"])
    },
    methods:{
      // 查找代办
      searchAgency(){
        // if(!this.searchText){
        //   this.$message.warning('请输入需要搜索的内容')
        //   return
        // }
        this.getAgency(1,999,undefined,undefined,0,this.searchText,0)
      },
      // 动态list滚动到底部，加载更多
      listBottom(){
        if(this.$refs.moveList.scrollTop + this.$refs.moveList.offsetHeight == this.$refs.moveList.scrollHeight ){
          this.movePage++
          this.getOperation(this.movePage,8,this.detail.id)
        }
      },
      // 打开选择员工的弹框
      openSelectBox(val,arr){
        if(val==2){
          let newArr=arr.indexOf(',')==-1?[arr]:arr.split(',')
          newArr.forEach((agency,i)=>{
            this.menberOptions.forEach((option,j)=>{
              option.children.forEach((child,k)=>{
                if(child.value==agency){
                  this.editCheckArr.push([option.value,child.value])
                }
              })
            })
          })
        }
        this['showSelectBox'+val]=true       
      },

      // 选择员工
      selectMenbers(val){
        // this.checkedMenbers=[]
        // val.forEach(item=>{
        //   this.checkedMenbers.push(item[1])
        // })
      },
      // 确定选择的员工
      confirmSelect(i){
        this['showSelectBox'+i]=false
        this.checkedMenbers=[]
        this.checkedNames=[]
        this.checkArr2=[...this.checkArr]
        this.checkArr2.forEach(item=>{
          this.checkedMenbers.push(item[1])
          this.menberOptions.forEach(each=>{
            if(each.value==item[0]){
              each.children.forEach(every=>{
                if(every.value==item[1]){
                  this.checkedNames.push(every.label)
                }
              })
            }
          })
        })
      },
      // 右边编辑部分确定选择的员工
      confirmSelect2(){
        this.showSelectBox2=false
        this.editCheckedMenbers=[]
        this.editCheckedNames=[]
        this.editCheckArr2=[...this.editCheckArr]
        this.editCheckArr2.forEach(item=>{
          this.editCheckedMenbers.push(item[1])
          this.menberOptions.forEach(each=>{
            if(each.value==item[0]){
              each.children.forEach(every=>{
                if(every.value==item[1]){
                  this.editCheckedNames.push(every.label)
                }
              })
            }
          })
        })
      },
      // 关闭选择员工的弹框
      closeSelectBox(val){
        this['showSelectBox'+val]=false
        if(this.checkedMenbers.length==0){
          this.checkArr=[]
        }else{
          this.checkArr=[...this.checkArr2]
        }
      },
      // 右侧关闭选择员工的弹框
      closeSelectBox2(val){
        this.showSelectBox2=false
        if(this.editCheckedMenbers.length==0){
          this.editCheckArr=[]
        }else{
          this.editCheckArr=[...this.editCheckArr2]
        }
      },
      // 打开动态操作弹框
      openMove(){
        this.showMove=true
        this.$nextTick(()=>{
          this.$refs.moveList.addEventListener('scroll', this.listBottom)
        })
        this.getOperation(1,8,this.detail.id)
      },
      // 关闭动态操作弹框
      closeMove(){
        this.showMove=false
      },
      // 获取所有代办
      getAgency(page,page_size,start_time,end_time,is_all,search,i){
        this.agencyArr=[]
        this.agencyArrCopy=[]
        this.getRequest(worklist.agency,{
          page,
          page_size,
          start_time,
          end_time,
          is_all,
          search
        }).then(res=>{
          this.agencyArr.push(...res.rows)
          this.showNoData=true
          // 判断指派超过一人的工作里面的指派人员是否包含自己
          this.agencyArr.forEach(item=>{
            item.includeOwn=item.employee_array.some(each=>{
              return each.id==this.user_data.id
            })
          })
          // this.includeOwn=this.agencyArr.employee_array.some(item=>{
          //   return item.id==this.user_data.id
          // })
          this.agencyArrCopy=[...this.agencyArr]
          this.selectAgency(this.agencyArr[i],i)
        }).catch(err=>{
          console.error(err)
        })
      },
      // 选择自己或全部
      selectOwnAll(val){
        this.isAll=val
        this.getAgency(1,999,this.st,this.et,this.isAll,this.searchText,0)
      },
      // 根据日期筛选代办
      getTimeAgency(val){
        // if(!val){
        //   this.agencyArr=[...this.agencyArrCopy]
        //   return
        // }
        // this.agencyArr=[]
        // this.agencyArrCopy.forEach((item,index)=>{
        //   if(this.timeFormat(item.create_time).split(' ')[0]==val){
        //     this.agencyArr.push(item)
        //   }
        // })
        if(val){
          this.st=val+' 00:00:00'
          this.et=val+' 23:59:59'
        }else{
          this.st=''
          this.et=''
        }
        this.getAgency(1,999,this.st,this.et,this.isAll,this.searchText,0)
      },
      // 选择某一个代办事项
      selectAgency(item,index){
        this.currentIndex=index
        this.getDetail(item.id)
        this.getMsg(item.id)
      },
      // 根据代办事项id获取相应的工作详情
      getDetail(id){
        this.getRequest(worklist.getDetail,{
          id
        }).then(res=>{
          this.detail=res
          this.editType=this.detail.type
          this.editStartTime=this.detail.start_time
          this.editEndTime=this.detail.end_time
          this.editStatus=this.detail.status
          this.editDec=this.detail.remark
          this.editWarnType=this.detail.notice_way.indexOf(',')!=-1?this.detail.notice_way.split(','):[this.detail.notice_way]
          this.editCheckArr=[]
          let arr=this.detail.employee_array.indexOf(',')!=-1?this.detail.employee_array.split(','):[this.detail.employee_array]

          this.editCheckedNames=res.employee_name_array.indexOf(',')==-1?[res.employee_name_array]:res.employee_name_array.split(',')


          // arr.forEach((agency,i)=>{
          //   console.warn(agency,i,'第一层')
          //   this.menberOptions.forEach((option,j)=>{
          //     console.warn(option,i,'第二层')
          //     option.children.forEach((child,k)=>{
          //       console.warn(child,'第三层')
          //       if(child.value==agency){
          //         this.editCheckArr.push([option.value,child.value])
          //         console.warn(this.editCheckArr,i,'每个循环')
          //       }
          //     })
          //   })
          // })
          // console.warn(this.editCheckArr,'选中的员工')
          // this.confirmSelect2()
          //判断是否有权限可以操作状态待办结办的改变 ,只有创建者和执行者有权限
          let inArray=arr.some(item=>{
            return item==this.user_data.id
          })
          this.canSelectStatus=!((this.detail.cid==0?this.detail.uid:this.detail.cid)==this.user_data.id||inArray)
        }).catch(err=>{
          console.error(err)
        })
      },
      // 打开代办
      openAgency(){
        this.showAgency=true
      },
      // 关闭代办
      closeAgency(){
        this.showAgency=false
      },
      // 把时间戳转化为标准时间
      timeFormat(timestamp){
				var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
				var Y = date.getFullYear() + '-';
				var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
				var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
				var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
				var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
				var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
				return Y+M+D+h+m+s;
      },
      // 获取员工分组
      getStaffGroup(){
        this.menberOptions=[]
        this.getRequest(employee.getGroup).then(res=>{
          res.forEach((item,index)=>{
            let obj={
              value:item.group_id,
              label:item.group_name,
              children:[]
            }
            this.menberOptions.push(obj)
            this.getStaff(item.group_id,index)
          })
        }).catch(err=>{
          console.error(err)
        })
      },
      // 根据员工分组获取员工
      getStaff(groupId,i){
        this.getRequest(employee.getAll,{
          page:1,
          page_size:9999,
          group_id:groupId
        }).then(res=>{
          res.rows.forEach((item,index)=>{
            let obj={
              value:item.id,
              label:item.name
            }
            this.menberOptions[i].children.push(obj)
          })
        }).catch(err=>{
          console.error(err)
        })
      },
      // 选择告警方式
      selectWarn(val){
      },
      // 新增代办点击确定按钮
      confirmAdd(){
        this.addAgency(this.addStartTime,this.addEndTime,this.addDec,this.inputTitle,this.checkedMenbers,this.addStatus,this.addType,this.warnType,0)
      },
      // 新增代办点击确定并继续添加按钮
      confirmAddContinue(){
        this.addAgency(this.addStartTime,this.addEndTime,this.addDec,this.inputTitle,this.checkedMenbers,this.addStatus,this.addType,this.warnType,1)
      },
      // 新增代办
      addAgency(start_time,end_time,remark,name,employee_id_array_str,status,type,notice_way,isContinue){
        this.postRequest(worklist.add,{
          start_time,
          end_time,
          remark,
          name,
          employee_id_array_str:employee_id_array_str.join(),
          status,
          type,
          notice_way:notice_way.join()
        }).then(res=>{
          this.addStartTime=''
          this.addEndTime=''
          this.addDec=''
          this.inputTitle=''
          this.checkedMenbers=[]
          this.addStatus=''
          this.addType=''
          this.warnType=[]
          this.checkArr=[]
          this.checkedNames=[]
          if(isContinue==0){
            this.closeAgency()            
          }
          this.getAgency(1,999,undefined,undefined,0,undefined,0)
        }).catch(err=>{
          console.error(err)
        })
      },
      // 对优先级的处理
      dealType(val){
        switch(val){
          case '1':
            return '一般'
            break
          case '2':
            return '重要' 
            break
          case '3':
            return '紧急'
            break
        }
      },
      // 对代办事项状态的处理
      dealStatus(val){
        switch(val){
          // case '0':
          //   return '未开始'
          //   break
          case '1':
            return '待办'
            break
          // case '2':
          //   return '处理' 
          //   break
          case '3':
            return '结办'
            break
        }
      },
      //快速更改代办结办状态
      fastChangeStatus(item){
        let way=item.notice_way.indexOf(',')==-1?[item.notice_way]:item.notice_way.split(',')
        let arr=[]
        item.employee_array.forEach((item,index)=>{
          arr.push(item.id)
        })
        if(item.status==1){
          this.editAgency(item.id,item.start_time,item.end_time,item.remark,item.c_name,arr,3,item.type,way)
        }else if(item.status==3){
          this.editAgency(item.id,item.start_time,item.end_time,item.remark,item.c_name,arr,1,item.type,way)
        }
      },
      // 编辑代办
      editAgency(id,start_time,end_time,remark,name,employee_id_array_str,status,type,notice_way){
        this.postRequest(worklist.editDetail,{
          id,
          start_time,
          end_time,
          remark,
          name,
          // employee_id_array_str:(employee_id_array_str.length==1?employee_id_array_str[0]:employee_id_array_str.join()),
          employee_id_array_str:employee_id_array_str.join(),
          status,
          type,
          notice_way:(notice_way.length==1?notice_way[0]:notice_way.join())
        }).then(res=>{
          this.$message.success('修改成功')
          this.getAgency(1,999,this.st,this.et,this.isAll,undefined,this.currentIndex)
        }).catch(err=>{
          console.error(err)
        })
      },
      // 取消修改
      cancel(){
        this.editType=this.detail.type
        this.editStartTime=this.detail.start_time
        this.editEndTime=this.detail.end_time
        this.editStatus=this.detail.status
        this.editDec=this.detail.remark
        this.editWarnType=this.detail.notice_way.indexOf(',')!=-1?this.detail.notice_way.split(','):[this.detail.notice_way]
        this.editCheckArr=[]
        let arr=this.detail.employee_array.indexOf(',')!=-1?this.detail.employee_array.split(','):[this.detail.employee_array]
        arr.forEach((agency,i)=>{
          this.menberOptions.forEach((option,j)=>{
            option.children.forEach((child,k)=>{
              if(child.value==agency){
                this.editCheckArr.push([option.value,child.value])
              }
            })
          })
        })
        this.confirmSelect2()
      },
      // 删除代办
      delAgency(id){
        this.$confirm("确定要删除该工作吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() =>{
          this.postRequest(worklist.del,{
            id
          }).then(res=>{
            this.$message.success('删除成功')
            this.getAgency(1,999,this.st,this.et,this.isAll,undefined,0)
          }).catch(err=>{
            console.error(err)
          })
        }).catch(err=>{
          console.error(err)
        })       
      },
      // 获取动态列表
      getOperation(page,page_size,j_id){
        this.getRequest(worklist.getOperation,{
          page,
          page_size,
          j_id
        }).then(res=>{
          res.rows.forEach(item=>{
            this.operationArr.push(item)
          })
        }).catch(err=>{
          console.error(err)
        })
      },
      // 获取工作的所有留言
      getMsg(j_id){
        this.getRequest(worklist.getMsg,{
          j_id
        }).then(res=>{
          this.msgArr=[]
          this.newMsgArr=[]
          this.cArr=[]
          this.loopNum=0
          for(var key in res){
            this.msgArr.push(res[key])
          }
          this.findChildren(this.msgArr,this.newMsgArr)  
        }).catch(err=>{
          console.error(err)
        })
      },
      // 递归遍历留言的所有children
      findChildren(arr1,arr2){
        this.loopNum++
        arr1.forEach((item,index)=>{
          let itemCopy={...item}
          // delete itemCopy.children
          itemCopy.children=[]
          arr2.push(itemCopy)
          if(!item.children){
            return
          }
          if(this.loopNum==2){
            // 回复到c级停止，之后把c级的那条进行第二次递归
            this.cToArr(item.children)
            arr2[index].children=[...this.cArr]
            return
          }
          this.findChildren(item.children,arr2[index].children)
        })
      },
      // 把c级回复递归成平级数组
      cToArr(arr1){
        arr1.forEach((item,index)=>{
          this.cArr.push(item)
          if(!item.children){
            return
          }
          this.cToArr(item.children)
        })
      },
      // 添加或者回复留言
      replyMsg(j_id,pid,con){
        if(!con){
          this.$message.warning('内容不能为空')
          return
        }
        this.postRequest(worklist.addMsg,{
          j_id,
          pid,
          con
        }).then(res=>{
          this.$message.success('添加留言成功')
          if(pid==0){
            this.inputText=''
          }else{
            this.replyContent=''
          }
          this.getMsg(j_id)
        }).catch(err=>{
          console.error(err)
        })
      },
      // 点击回复出现回复框
      handleReply(i){
        this.replyContent=''
        console.log(i,'坐标')
        if(this.replyIndex==i){
          this.replyIndex=-1
          return
        }
        this.replyIndex=i
      },
      cancelReply(){
        this.inputText=''
      },
      // 删除留言
      delMsg(id){
        this.$confirm("确定要删除该留言吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() =>{
          this.getRequest(worklist.delMsg,{
            id
          }).then(res=>{
            this.$message.success('删除成功')
            this.getMsg(this.detail.id)
          }).catch(err=>{
            console.error(err)
          })
        }).catch(err=>{
          console.error(err)
        })
      }
    },
    filters:{
    }
  }
</script>

<style lang="scss" scoped>
.app-container{
  font-family:PingFangSC-Regular,PingFang SC; 
  padding: 0 0 20px;
  display: flex;
  height: 976px;
  .left{
    // width: 37%;
    flex: 1;
    margin-right: 10px;
    background: #fff;
    // padding: 0 20px;
    .number{
      height: 50px;
      display: flex;
      align-items: center;
      color: #333;
      padding: 0 20px;
      .todo-num{
        font-weight: 600;
        margin-right: auto;
      }
    }
    .search-time{
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      .search{
        width: 180px;
        display: flex;
        .search-btn{
          width: 60px;
          height: 100%;
          background: #7C6AFF;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
          cursor: pointer;
        }
        .el-input{
          /deep/{
            .el-input__inner{
              border-radius: 0;
              border-right: none;
            }
          }
        }
      }
      .time{
        .el-date-editor{
          width: 140px;
        }
      }
    }
    .add{
      display: flex;
      align-items: center;
      border-bottom: 1px solid #F0F0F0;
      padding: 0 20px 20px;
      .btn{
        width: 95px;
        height: 34px;
        background: #7C6AFF;
        box-shadow:0px 2px 8px 0px rgba(124,106,255,0.32);
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        margin-right: auto;
        cursor: pointer;
      }
      .agency-box{
        position: fixed;
        top: 10%;
        width: 1008px;
        height: 80%;
        background: #fff;
        box-shadow: 0 0 10px 5px #aaa;
        z-index: 999;
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .title-input{
          margin-bottom: 10px;
          /deep/{
            .el-input__inner{
              border: none;
              padding: 0;
              color: #333;
              font-size: 18px;
              font-weight: 600;
              &::-webkit-input-placeholder { 
                  color: #333;
                  font-size: 18px;
                  font-weight: 600;
              }
            }
          }
        }
        .creator-info{
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          .avatar{
            width: 20px;
            height: 20px;
            border-radius: 20px;
            margin-right: 10px;
            img{
              width: 20px;
              height: 20px;
              border-radius: 20px;
            }
          }
          .name{
            font-size: 12px;
            color: #999;
          }
        }
        .system-set{
          padding: 20px 0 10px;
          border: 1px solid #F0F0F0;
          border-left: none;
          border-right: none;
          color: #999;
          margin-bottom: 20px;
          .first-row,.second-row,.third-row,.fouth-row{
            display: flex;
            align-items: center;
            .icon{
              width: 20px;
              height: 20px;
              margin-right: 10px;
              background: #E3E3E3;
            }
            .icon+span{
              width: 60px;
              margin-right: 50px;
            }
          }
          .first-row{
            margin-bottom: 10px;
            .el-select{
              /deep/ {
                .el-input__suffix{
                  display: none;
                }
                .el-input__inner{
                  padding: 0;
                  text-align: center;
                  font-size: 11px;
                  width: 42px;
                  height: 22px;
                  line-height: 18px;
                  color: #fff;
                  background: #17CE66;
                  border: none;
                  border-radius: 2px;
                  &::-webkit-input-placeholder{
                    color: #fff;
                  }
                }
              }
            }
            .status-important{
              /deep/{
                .el-input__inner{
                  background: #FFBA02;
                }
              }
            }
            .status-urgent{
              /deep/{
                .el-input__inner{
                  background: #FF6A6E;
                }
              }
            }
          }
          .second-row{
            margin-bottom: 10px;
            .el-date-editor{
              width: 170px;
              /deep/{
                .el-input__prefix{
                  display: none;
                }
                .el-input__inner{
                  padding-left: 0;
                  width: 170px;
                  border: none;
                  color: #666;
                }
              }
            }
          }
          .third-row{
            margin-bottom: 10px;
            .el-select{
              // width: 80px;
              /deep/ {
                .el-input__inner{
                  width: 65px;
                  padding-left: 0;
                  border: none;
                }
                .el-icon-arrow-up,.el-icon-arrow-down{
                  position: relative;
                  top: 2px;
                }
              }
            }
          }
          .fouth-row{
            margin-bottom: 17px;
            .select-box{
              position: fixed;
              width: 500px;
              height: 500px;
              background: #fff;
              box-shadow: 0 0 10px 5px #aaa;
              display: flex;
              flex-direction: column;
              padding: 20px;
              padding-top: 0;
              color: #333;
              z-index: 1000;
              .box-title{
                width: 100%;
                height: 50px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: 18px;
                margin-bottom: 30px;
                .el-icon-close{
                  cursor: pointer;
                }
              }
              .box-bottom{
                text-align: right;
                margin-top: auto;
                span{
                  padding: 5px 20px;
                  background: #7C6AFF;
                  color: #fff;
                  border-radius: 2px;
                  cursor: pointer;
                }
                span:first-child{
                  margin-right: 10px;
                }
              }
            }
            .el-icon-circle-plus-outline{
              font-size: 30px;
              cursor: pointer;
              margin-right: 10px;
            }
            .menber-list{
              display: flex;
              flex-wrap: wrap;
              .menber{
                width: 30px;
                height: 30px;
                border-radius: 50%;
                background: #7C6AFF;
                color: #fff;
                display: flex;
                justify-content: center;
                align-items: center;
              }
              .menber+.menber{
                margin-left: 5px;
              }
            }
          }
          .fifth-row{
            font-size: 12px;
            text-align: right;
            span{
              cursor: pointer;
            }
            span:first-child{
              margin-right: 20px;
            }
          }
        }
        .dec{
          flex: 1;
          margin-bottom: 20px;
          /deep/{
            .el-textarea__inner{
              height: 100%;
              border: none;
            }
          }
        }
        .warn-type{
          color: #999;
          padding-bottom: 10px;
          border-bottom: 1px solid #EBEBEB;
          margin-bottom: 9px;
          &>p{
            margin-bottom: 15px;
          }
          .el-checkbox{
            /deep/{
              .el-checkbox__inner{
                border-color: #00A4FF;
              }
              .el-checkbox__label{
                color: #999;
              }
            }
          }
        }
        .bottom-btn{
          display: flex;
          span{
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          span:first-child,span:nth-child(2){
            width: 97px;
            height: 36px;
            background: #17CE66;
            color: #fff;
            font-weight: 500;
            margin-right: 10px;
          }
          span:nth-child(2){
            width: 165px;
          }
          span:last-child{
            width: 60px;
            height: 36px;
            border: 1px solid #D9D9D9;
            color: #666;
          }
        }
      }
    }
    .todo-list{
      overflow-y: auto;
      height: calc(100% - 163px);
      padding: 0 14px 0 20px;
      .todo-row{
        height: 70px;
        display: flex;
        // align-items: center;
        border-bottom: 1px solid #F0F0F0;
        padding: 10px 0;
        cursor: pointer;
        .el-icon-circle-check{
          font-size: 28px;
          color: #EBEBEB;
          margin-right: 10px;
        }
        .tick{
          color: #00A4FF;
        }
        .title-menber{
          display: flex;
          flex: 1;
          flex-direction: column;
          justify-content: space-between;
          // margin-right: auto;
          .title{
            font-size: 18px;
            color: #333;
          }
          .menber{
            flex: 1;
            padding-right: 5px;
            box-sizing: border-box;
            span{
              font-size: 12px;
              color: #999;
              display: inline-block;
              // width: 150px;
              // overflow: hidden;
              // white-space: nowrap;
              // text-overflow: ellipsis;
            }
          }
        }
        .status-time{
          display: flex;
          // width: 167px;
          flex-direction: column;
          justify-content: space-between;
          .status-row{
            text-align: right;
            .time-out{
              color: #FF6A6E;
              border: 1px solid #FF6A6E;
              padding: 2px 8px;
              font-size: 10px;
              border-radius: 2px;
              margin-right: 4px;
            }
            .pointer-menber{
              padding: 1px 7px;
              color: #7C6AFF;
              border: 1px solid #7C6AFF;
              font-size: 11px;
              border-radius: 2px;
              margin-right: 4px;
            }
            .status{
              padding: 1px 7px;
              color: #fff;
              font-size: 11px;
              background: #17CE66;
              border-radius: 2px;
            }
            .status-important{
              background: #FFBA02;
            }
            .status-urgent{
              background: #FF6A6E;
            }
          }
          .create-time{
            font-size: 12px;
            color: #999;
            align-self: flex-end;
          }
        }
      }
      .active{
        background: #F0FAFF;
      }
      .no-data{
        margin-top: 200px;
        font-size: 30px;
        font-weight: bold;
        color: #999;
        text-align: center;
      }
    }
  }
  .right{
    // flex: 1;
    width: 63%;
    background: #fff;
    display: flex;
    .bottom-btn{
      display: flex;
      span{
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      span:first-child{
        width: 97px;
        height: 36px;
        background: #17CE66;
        color: #fff;
        font-weight: 500;
        margin-right: 10px;
      }
      span:nth-child(2),span:nth-child(3){
        width: 60px;
        height: 36px;
        border: 1px solid #D9D9D9;
        color: #666;
      }
      span:nth-child(2){
        margin-right: auto;
      }
    }
    .input-system{
      width: 59.3%;
      height: 100%;
      border-right: 1px solid #EBEBEB;
      padding: 0 20px 42px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .system-head{
        height: 95px;
        border-bottom: 1px solid #F0F0F0;
        padding: 20px 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .title-list{
          display: flex;
          justify-content: space-between;
          align-items: center;
          .main-title{
            font-size: 18px;
            color: #333;
            font-weight: 600;
          }
          .move-btn{
            background: #7C6AFF;
            color: #fff;
            padding: 2px 7px;
            border-radius: 2px;
            cursor: pointer;
          }
          .move-list{
            width: 642px;
            height: 559px;
            background: #fff;
            position: fixed;
            top: 20%;
            padding: 20px 0;
            z-index: 999;
            box-shadow: 0 0 10px 5px #aaa;
            display: flex;
            flex-direction: column;
            .list-title{
              height: 30px;
              font-size: 18px;
              color: #333;
              font-weight: 600;
              margin-bottom: 20px;
              display: flex;
              justify-content: space-between;
              padding: 0 20px;
              i{
                cursor: pointer;
              }
            }
            .item-row-wrap{
              flex: 1;
              overflow-y: auto;
              width: calc(100% - 6px);
              padding: 0 14px 0 20px;
              .item-row{
                padding-bottom: 10px;
                border-bottom: 1px solid #F0F0F0;
                .thing1{
                  margin-bottom: 10px;
                }
                .thing-time{
                  font-size: 10px;
                }
              }
              .item-row+.item-row{
                margin-top: 20px;
              }
            }
          }
        }
        .who-create{
          font-size: 12px;
          color: #999;
        }
      }
      .system-set{
        padding: 20px 0 10px;
        border-bottom: 1px solid #F0F0F0;
        color: #999;
        .first-row,.second-row,.third-row,.fouth-row{
          display: flex;
          align-items: center;
          .icon{
            width: 20px;
            height: 20px;
            margin-right: 10px;
            background: #E3E3E3;
          }
          .icon+span{
            width: 60px;
            margin-right: 50px;
          }
        }
        .first-row{
          margin-bottom: 10px;
          .el-select{
            /deep/ {
              .el-input__suffix{
                display: none;
              }
              .el-input__inner{
                padding: 0;
                text-align: center;
                font-size: 11px;
                width: 42px;
                height: 22px;
                line-height: 18px;
                color: #fff;
                background: #17CE66;
                border: none;
                border-radius: 2px;
                &::-webkit-input-placeholder{
                  color: #fff;
                }
              }
            }
          }
          .status-important{
            /deep/{
              .el-input__inner{
                background: #FFBA02;
              }
            }
          }
          .status-urgent{
            /deep/{
              .el-input__inner{
                background: #FF6A6E;
              }
            }
          }
        }
        .second-row{
          margin-bottom: 10px;
          .el-date-editor{
            width: 170px;
            /deep/{
              .el-input__prefix{
                display: none;
              }
              .el-input__inner{
                padding-left: 0;
                width: 170px;
                border: none;
                color: #666;
              }
            }
          }
        }
        .third-row{
          margin-bottom: 10px;
          .el-select{
            // width: 80px;
            /deep/ {
              .el-input__inner{
                width: 75px;
                padding-left: 0;
                border: none;
              }
              .el-icon-arrow-up,.el-icon-arrow-down{
                position: relative;
                top: 2px;
              }
            }
          }
        }
        .fouth-row{
          margin-bottom: 17px;
          .select-box{
            position: fixed;
            width: 500px;
            height: 500px;
            background: #fff;
            box-shadow: 0 0 10px 5px #aaa;
            display: flex;
            flex-direction: column;
            padding: 20px;
            padding-top: 0;
            color: #333;
            z-index: 1000;
            .box-title{
              width: 100%;
              height: 50px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              font-size: 18px;
              margin-bottom: 30px;
              .el-icon-close{
                cursor: pointer;
              }
            }
            .box-bottom{
              text-align: right;
              margin-top: auto;
              span{
                padding: 5px 20px;
                background: #7C6AFF;
                color: #fff;
                border-radius: 2px;
                cursor: pointer;
              }
              span:first-child{
                margin-right: 10px;
              }
            }
          }
          .el-icon-circle-plus-outline{
            font-size: 30px;
            cursor: pointer;
            margin-right: 10px;
          }
          .menber-list{
            display: flex;
            flex-wrap: wrap;
            .menber{
              width: 30px;
              height: 30px;
              border-radius: 50%;
              background: #7C6AFF;
              color: #fff;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .menber+.menber{
              margin-left: 5px;
            }
          }
        }
        .fifth-row{
          font-size: 12px;
          text-align: right;
          span{
            cursor: pointer;
          }
          span:first-child{
            margin-right: 20px;
          }
        }
      }
      .system-dec{
        color: #666;
        padding: 20px 0;
        overflow-y: auto;
        margin-bottom: 20px;
        line-height: 26px;
        flex: 1;
        /deep/{
          .el-textarea__inner{
            border: none;
          }
        }
      }
      .warn-type{
        color: #999;
        padding-bottom: 10px;
        border-bottom: 1px solid #EBEBEB;
        margin-bottom: 9px;
        &>p{
          margin-bottom: 15px;
        }
        .el-checkbox{
          /deep/{
            .el-checkbox__inner{
              border-color: #00A4FF;
            }
            .el-checkbox__label{
              color: #999;
            }
          }
        }
      }

    }
    .message{
      flex: 1;
      height: 100%;
      padding:0 0 42px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .message-head{
        width: 100%;
        height: 95px;
        border-bottom: 1px solid #F0F0F0;
        font-size: 18px;
        color: #333;
        font-weight: 600;
        padding-top: 20px;
        width: calc(100% - 40px);
        align-self: center;
      }
      .message-box-wrap{
        width: calc(100% - 6px);
        flex: 1;
        overflow-y: auto;
        padding: 0 8px 0 20px;
        .message-box{
          padding: 20px 0;
          .message-row{
            display: flex;
            .avatar{
              width: 50px;
              height: 50px;
              border-radius: 50%;
              background: tomato;
              margin-right: 20px;
              img{
                width: 50px;
                height: 50px;
                border-radius: 50%;
              }
            }
            .right-part{
              flex: 1;
              width: 100%;
              padding-top: 4px;
              .main-msg{
                padding-bottom: 11px;
                border-bottom: 1px solid #F0F0F0;
                .name{
                  color: #333;
                  font-weight: 600;
                  margin-bottom: 2px;
                }
                .time{
                  color: #999;
                  margin-bottom: 14px;
                }
                .content{
                  margin-bottom: 12px;
                  font-size: 13px;
                  color: #666;
                  line-height: 22px;
                }
                .msg-btn{
                  color: #999;
                  font-size: 12px;
                  span{
                    cursor: pointer;
                  }
                  span:first-child{
                    margin-right: 10px;
                  }
                }
              }
              .reply-input{
                display: flex;
                justify-content: space-between;
                margin-top: 10px;
                margin-bottom: 10px;
                .el-textarea{
                  margin-right: 10px;
                }
                .send-btn{
                  width: 86px;
                  height: 33px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  border: 1px solid #F0F0F0;
                  color: #999;
                  cursor: pointer;
                }
              }
              .reply-content{
                color: #666;
                background: #F7FBFC;
                padding: 20px;
                .first-reply{
                  .content{
                    line-height: 20px;
                    margin-bottom: 10px;
                    max-height: 150px;
                    overflow-y: auto;
                  }
                  .who-time{
                    margin-bottom: 10px;
                    .a-line{
                      color: #999;
                    }
                    span:nth-child(2),span:nth-child(4){
                      color: #333;
                      font-weight: 600;
                      margin-right: 5px;
                    }
                    span:last-child{
                      color: #999;
                    }
                  }
                  .reply-btn{
                    font-size: 12px;
                    color: #999;
                    cursor: pointer;
                    margin-bottom: 10px;
                  }
                  .reply-input{
                    .send-btn{
                      background: #fff;
                    }
                  }
                  .second-reply{
                    padding: 20px;
                    border-left: 1px solid #ddd;
                    border-right: 1px solid #ddd;
                    .content{
                      line-height: 20px;
                      margin-bottom: 10px;
                      max-height: 150px;
                      overflow-y: auto;
                    }
                    .who-time{
                      margin-bottom: 10px;
                      .a-line{
                        color: #999;
                      }
                      span:nth-child(2){
                        color: #333;
                        font-weight: 600;
                        margin-right: 5px;
                      }
                      span:last-child{
                        color: #999;
                      }
                    }
                    .reply-btn{
                      font-size: 12px;
                      color: #999;
                      cursor: pointer;
                    }
                    .reply-input{
                      .send-btn{
                        background: #fff;
                      }
                    }
                  }
                  .second-reply:last-child{
                    border-bottom: 1px solid #ddd;
                  }
                }
                .first-reply + .first-reply{
                  margin-top: 20px;
                }
              }
            }
          }
          .message-row+.message-row{
            margin-top: 20px;
          }
        }
      }
      .leave-msg{
        width: calc(100% - 40px);
        align-self: center;
        height: 168px;
        padding-top: 20px;
        border-top: 1px solid #F0F0F0;
        margin-bottom: 10px;
        .el-textarea{
          /deep/{
            .el-textarea__inner{
              height: 148px;
              border-color: #F0F0F0;
              &:focus{
                border-color: #F0F0F0;
              }
            }
          }
        }
      }
      .bottom-btn{
        padding: 0 20px;
      }
    }
  }
}
</style>
