<template>
<div class="newServe" ref="container">
    <!-- 头部 -->
    <header class="header">
       	<el-button type="default" @click="back">返回</el-button>
    </header>

	<!--<div class="packType">
		<p>套餐类型</p>
		<el-radio-group v-model="packFrom.ptm_type">
		    <el-radio :label="1">影棚套餐</el-radio>
		    <el-radio :label="2">设备套餐</el-radio>
		  </el-radio-group>
	</div>-->
	
	<!--选择套餐影棚-->
    <div class="card">
    	<!-- 标题 -->
        <p class="headTitle">套餐类型</p>
    	<!--<el-row :gutter="100" class="num-rent">-->
            <el-radio-group v-model="packFrom.ptm_type">
			    <el-radio :label="1">影棚套餐</el-radio>
			    <el-radio :label="2">设备套餐</el-radio>
			</el-radio-group>
        <!--</el-row>-->
    </div>

    <!-- 全部表单信息 -->
    <el-form ref="packFrom" :model="packFrom" class="device-form">
        <!-- 图片展示 -->
        <div class="card">
			<p class="headTitle">图片展示</p>

            <clipper  :imgList="imgList" @delSuccess="delSuccess" @uploadSuccess="uploadSuccess" :uploadWidth="148" :uploadHeight="148" :uploadNum="uploadNum" :ratio="1"></clipper>

        </div>

        <!-- 基本信息 -->
        <div class="card">
            <!-- 标题 -->
            <p class="headTitle">基本设置</p>
            <!-- 基本信息表单 -->
            <div class="basic-table">
                <el-row :gutter="100" class="num-rent">
                    <el-col :span="8">
                        <el-form-item label="套餐名称：">
                            <el-input placeholder="套餐名称" v-model="packFrom.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="库存：">
                            <el-input v-model="packFrom.stock_num" placeholder="请输入库存"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                
                <el-row :gutter="100">
                    <el-col :span="8">
                        <el-form-item  label="送货上门：" prop="door_to_door">
							<el-radio-group :disabled="packFrom.ptm_type==1" v-model="packFrom.door_to_door">
								<el-radio label="0">否</el-radio>
								<el-radio label="1">是</el-radio>
							</el-radio-group>
						</el-form-item>
                    </el-col>
                    <el-col :span="8">
						<el-form-item label="是否上架：" prop="is_up">
							<el-radio-group v-model="packFrom.is_up">
								<el-radio label="1">上架</el-radio>
								<el-radio label="0">下架</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
                </el-row>
                
                <el-row :gutter="100">
                    <el-col :span="8">
                        <el-form-item label="租赁方式：">
                            <el-select  placeholder="请选择租赁方式" v-model="packFrom.only_rent_day" @change="rentMethod">
                                <el-option v-for="(item,index) in rentArray" :key="index" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" v-if="packFrom.only_rent_day==0">
                        <el-form-item label="起拍小时：">
                            <el-input  placeholder="请输入正整数，默认为1" v-model="packFrom.hour_num"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                
            </div>
        </div>
        
        
        <!--选择套餐影棚-->
        <div class="card" v-if="packFrom.ptm_type==1">
        	<!-- 标题 -->
            <p class="headTitle">选择影棚</p>
        	<el-row :gutter="100" class="num-rent">
                <el-col :span="8">
                    <el-form-item label="选择影棚：">
                    	<el-select v-model="packFrom.studio_id" placeholder="请选择影棚">
						    <el-option v-for="item in studioList" :key="item.id" :label="item.name" :value="item.id">
						    </el-option>
						  </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
        </div>
        
        <!-- 配置套餐模块 -->
       	<div class="card">
       		<div class="topNav">
				<p class="headTitle">添加器材</p>
				<el-button type="primary" @click="toAddEquip">添加器材</el-button>
			</div>
            <!-- 设备列表 -->
		    <div class="device-table">
		        <el-table ref="selectEquipList" :data="selectEquipList" tooltip-effect="dark">
		            <el-table-column label="序号" type="index" width="55"></el-table-column>
	
		            <el-table-column label="类别" align="center" show-overflow-tooltip>
		                <template slot-scope="{row}">{{row.category_name}}</template>
		            </el-table-column>
					<el-table-column label="名称" align="center" show-overflow-tooltip>
		                <template slot-scope="{row}">{{row.name}}</template>
		            </el-table-column>
		            
					<el-table-column label="自定义描述" align="center" show-overflow-tooltip>
		                <template slot-scope="{row}">{{row.custom_desc}}</template>
		            </el-table-column>
		            
		            <el-table-column label="使用中/库存数" align="center" show-overflow-tooltip>
		                <template slot-scope="{row}">{{row.count}}</template>
		            </el-table-column>
		            
		            <el-table-column label="操作" show-overflow-tooltip>
		                <template class="operation-btn" slot-scope="{row}">
		                    <el-button type="text" @click="delEquip">删除</el-button>
		                </template>
		            </el-table-column>
		        </el-table>
		    </div>
        </div>
        

        <!-- 具体收费 -->
        <div class="charge card">
            <!-- 标题 -->
            <p class="headTitle">具体收费</p>

            <!-- 按时收费 -->
            <div class="charge-title" v-if="packFrom.only_rent_day!=1">
                <div>
                    <span class="red-start">*</span>
                    <span>按时收费</span>
                </div>
                <div  class="add-more" @click="addhourRow">继续添加</div>
            </div>
            <div class="charge-table" v-if="packFrom.only_rent_day!=1">
                <div class="table-head">
                    <span>使用时长</span>
                    <div class="center">
                        <span>使用场地</span>
                        <span>工作日工作时间</span>
                        <span>工作日非工作时间</span>
                        <span>周末工作时间</span>
                        <span>周末非工作时间</span>
                        <span>节假日工作时间</span>
                        <span>节假日非工作时间</span>
                        <span>操作</span>
                    </div>
                </div>
                <div class="charge-item" v-for="(item,index) in packFrom.price_table" :key="index">
                    <div class="using-time">
                        <el-select class="selectHour"  placeholder="请选择使用时长" v-model="item.hour" style="width:90px" @change="selectHour">
                            <el-option v-for="(item,index) in hourList" :disabled="item.choose" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </div>
                    <div class="charge-row">
                        <div class="row-item">
                            <div>影棚内</div>
                            <div>
                                <el-input ref="inp" require maxlength="6" v-model="item.price1">
                                    <div slot="suffix">￥</div>
                                </el-input>
                            </div>
                            <div>
                                <el-input maxlength="6" v-model="item.price2">
                                    <div slot="suffix">￥</div>
                                </el-input>
                            </div>
                            <div>
                                <el-input maxlength="6" v-model="item.price3">
                                    <div slot="suffix">￥</div>
                                </el-input>
                            </div>
                            <div>
                                <el-input maxlength="6" v-model="item.price4">
                                    <div slot="suffix">￥</div>
                                </el-input>
                            </div>
                            <div>
                                <el-input maxlength="6" v-model="item.price5">
                                    <div slot="suffix">￥</div>
                                </el-input>
                            </div>
                            <div>
                                <el-input maxlength="6" v-model="item.price6">
                                    <div slot="suffix">￥</div>
                                </el-input>
                            </div>
                        </div>

                    </div>
                    <div class="operation">
                        <el-button class="del-btn" @click="delhourRow(index)">删除</el-button>
                    </div>
                </div>
                <div class="no-item" v-if="!packFrom.price_table.length">暂无数据</div>
            </div>

            <!-- 按天收费 -->
            <div class="charge-title">
                <div>
                    <span class="red-start">*</span>
                    <span>按天收费</span>
                </div>
            </div>
            <div class="charge-table">
                <div class="table-head">
                    <span>使用天数</span>
                    <div class="center">
                        <span>使用场地</span>
                        <span>工作日</span>
                        <span>周末</span>
                        <span>节假日</span>
                    </div>
                </div>
                <div class="charge-item">
                    <div class="using-time">
                        <el-col class="day">1 天</el-col>
                    </div>
                    <div class="charge-row">
                        <div class="row-item" v-if="packFrom.borrow_type==0||packFrom.borrow_type==1">
                            <div>影棚内</div>
                            <div>
                                <el-input class="day-input" v-model="packFrom.price_day_workday"  maxlength="6">
                                    <div slot="suffix">￥</div>
                                </el-input>
                            </div>
                            <div>
                                <el-input class="day-input" v-model="packFrom.price_day_weekend" maxlength="6">
                                    <div slot="suffix">￥</div>
                                </el-input>
                            </div>
                            <div>
                                <el-input class="day-input" v-model="packFrom.price_day_holiday"  maxlength="6">
                                    <div slot="suffix">￥</div>
                                </el-input>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <!-- 视频 -->
        <div class="card video-dec">
			<p class="headTitle">视频</p>

            <!-- 视频及描述 -->
            <div class="video-wrap">
                <!-- 添加视频 -->
                <el-upload  class="avatar-uploader" action="https://up-z2.qiniup.com/" accept=".mp4, .qlv, .qsv, .ogg, .flv, .avi, .wmv, .rmvb" :data="videoData" :show-file-list="false" :before-upload="beforeUploadVideo" :on-success="handleVideoSuccess" :on-change="getFile" :on-progress="uploadVideoProcess">
                    <div class="add-video" v-if="!videoURL">
                        <div class="center">
                            <i class="el-icon-video-play"></i>
                            <span>点击添加视频</span>
                        </div>
                    </div>
                    <video class="show-video" v-if="videoURL" :src="videoURL" width="572" height="327" controls="controls">您的浏览器不支持视频播放</video>
                </el-upload>
                <div v-if="videoURL" class="tip">点击视频框区域可更换上传视频 ! ! !</div>
                <el-button v-if="videoURL" class="del-video" @click="delVideo">删除视频</el-button>

            </div>
        </div>
        
        <!--描述-->
        <div class="card">
        	<p class="headTitle">产品详情</p>
	        <div class="textare">
	            <tinymce v-model="packFrom.info" :height="300" />
	        </div>
        </div>
        
        
        <!--添加素材对话框模块-->
		<el-dialog title="添加器材" :visible.sync="addEquipDialog" @close="resetOption" center>
			<!--选项选择模块-->
			<div class="front_options radio-setting">
				<front-searchbox @search="search" customWidth="100"></front-searchbox>
				<div class="showSelect" :class="{'noSelect':selectEquipList.length==0}">
					<ul class="selected" v-if="selectEquipList.length>0">
						<li v-for="(item,index) in selectEquipList" :key="index">
							{{item.name}}
							<i @click="operageEquip('del',item)" class="el-icon-close page-hover"></i>
						</li>
					</ul>
					<div class="noSelect" v-else>
						<p>请在下方列表中选择器材添加</p>
						<img :src="$qiniuHost+'images/noSelectEquip.png'"/>
						<span>你还没有选择器材</span>
					</div>
				</div>
			</div>
			<el-table :data="equipList" class="equipTable">
				<el-table-column label="自定义名称" prop="custom_desc">
				</el-table-column>
				<el-table-column label="商品名称" show-overflow-tooltip>
					<template slot-scope="{row}">
						<el-button type="text" @click="toEquipDetail(row.id)">{{row.name}}</el-button>
					</template>
				</el-table-column>
				<el-table-column property="brand_name" label="品牌"></el-table-column>
				<el-table-column property="category_name" label="器材类型"></el-table-column>
				<el-table-column property="count" label="库存"></el-table-column>
				<el-table-column property="time_price" label="价格">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="{row}">
						<el-button type="text" @click="operageEquip('add',row)">添加</el-button>
						<el-button type="text" @click="operageEquip('del',row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>

			<!--分页模块-->
			<div class="tableFoot">
				<pagination  v-if="equipListParams.total_count>0" class="equipPage" :total="equipListParams.total_count" @getPageNum="changePage"></pagination>
				<div class="btns">
					<el-button class="confirmBtn" @click="addEquipDialog=false">确认</el-button>
					<el-button class="cancelBtn" @click="cancelEquip">取消</el-button>
				</div>
			</div>
		</el-dialog>

        <!-- 修改按钮 -->
        <div class="bottomBtn">
        	<el-button class="color-area" :loading="saveLoading" type="primary" @click="savePackage">保存</el-button>
            <el-button class="color-area" type="default" @click="cancel">取 消</el-button>
        </div>
    </el-form>

    
</div>
</template>

<script>
import {checkPic} from "@util/picUtil.js";
import {checkVideo} from "@util/videoCheck.js";
import Tinymce from "ServeComponents/Tinymce";
import { mapGetters } from "vuex";
import clipper from 'FrontComponents/photoClipper'
import frontSearchbox from "FrontComponents/frontSearchBox";
import pagination from"FrontComponents/pagination";
export default {
    data() {
        return {
            saveLoading: false,
            // 添加表单信息
            packFrom: {
            	ptm_type:1, //1影棚套餐 2.设备套餐
            	name:'',  //套餐名称
            	pic:'',  //图片
            	info:'', //描述
            	remark:'', //备注
            	video: "",  //视频
            	custom_desc:'', //自定义描述
            	is_up:'1',  //是否上架  0下架  1上架
            	stock_num:'', //库存
            	borrow_type: 0,
            	only_rent_day: 0,
            	door_to_door:'0', //是否送货上门
                equip_category_array_str: "",
                studio_id:'', //影棚id
                price_arr:[],
                price_table: [{
                    hour: 1,
                    price1: 0,
                    price2: 0,
                    price3: 0,
                    price4: 0,
                    price5: 0,
                    price6: 0
                }],
                price_day_workday:0,
                price_day_weekend:0,
                price_day_holiday:0
            },
            pic_update: {
                removeArray: [],
                uploadArray: []
            },
            // 视频相关
            videoURL: "",
            videoFlag: false, //刚开始的时候显示为flase
            videoUploadPercent: "0%", //进度条刚开始的时候为0%
            videoData: {
                //添加其他参数
            },
            borrowArray: [{
                    borrowText: "外借租用",
                    borrowValue: 0
                },
                {
                    borrowText: "仅租用 ",
                    borrowValue: 1
                },
                {
                    borrowText: "仅外借",
                    borrowValue: 2
                }
            ],
            rentArray: [{
                    label: "按天/按小时",
                    value: 0
                },
                {
                    label: "按天",
                    value: 1
                }
            ],
            doorArray: [{
                    label: "是",
                    value: 1
                },
                {
                    label: "否",
                    value: 0
                }
            ],
            hourList: [{
                    label: "1 小时",
                    value: 1,
                    choose: false
                },
                {
                    label: "2 小时",
                    value: 2,
                    choose: false
                },
                {
                    label: "3 小时",
                    value: 3,
                    choose: false
                },
                {
                    label: "4 小时",
                    value: 4,
                    choose: false
                }
            ],

            // 按时收费行
            hourRow: {
                hour: 1,
                price1: 0,
                price2: 0,
                price3: 0,
                price4: 0,
                price5: 0,
                price6: 0,
            },
            imgList: [],
            // 图片预览
            // 视频相关
            videoObj: {},
            uploadNum:8,
            equipList:[], //显示可选择的器材列表
            selectEquipList:[], //选择的器材列表
            addEquipDialog:false,  //选择对话框
            equipListParams: {
				page: 1,
				page_size: 10,
				total_count: 0
			},
			searchTxt: "",  //搜索设备内容
			studioList:[],  //影棚列表
			uploadPicList:[],
			packId:'',  //选择的套餐id
			packInfo:null, //选择的套餐信息
        };
    },

    components: {
        Tinymce,
        clipper,
        frontSearchbox,
        pagination
    },
    created() {
    	//获取影棚列表
	    this.getStudioList();
	    
    	let query=this.$route.query;
    	//type://0:新增，1/修改，2/详情
		this.type=query.type;
		switch(parseInt(this.type)){
			case 0:
				break;
			case 1:
				this.packId=query.id;
				//获取套餐详情
				this.getPackDetail(this.packId);
				break;
			case 2:
				this.canEdit=false;
				this.packId=query.id;
				//获取助理 详情
				this.getPackDetail(this.packId);
				break;
		}
			
    },
    
	computed: {
      ...mapGetters(["user_data"])
    },
    mounted() {
    	this.imgList.push({key:''});
    },

    methods: {
    	//获取套餐详情
    	getPackDetail(id){
    		console.warn('getPackDetail------',id);
    		this.util.packAjaxDetail(id).then(res=>{
    			this.packFrom=res;
    			console.error('packAjaxDetail--------',this.packFrom);
    		})
    	},
    	
    	//转换获取详情的价格字段结构
    	changeForm(){
//  		let form=this.packForm;
//  		let priceArr=[];
//  		for.price_arr.forEach((item,index)=>{
//  			if(item.rent_type==1){
//  				obj.is_overtime='0';
//	        		obj.is_holiday='3';
//  			}
//  		})
    	},
    	
    	//获取影棚列表
    	getStudioList(){
    		let params={
    			page:1,
    			page_size:10000
    		}
    		this.util.getServeStudioList(params).then(res=>{
    			console.log('getStudioList---------',res);
    			this.studioList=res.rows;
    		})
    	},
    	//切换分页方法
    	changePage(val) {
			this.equipListParams.page = val;
			this.getEquipList();
		},
    	
    	//获取设备列表
    	getEquipList(){
    		let params={
    			page:this.equipListParams.page,
    			uid:this.user_data.id,
    			search:this.searchTxt
    		}
    		this.util.getEquipList(params).then(res=>{
    			console.log('getEquipList----------',res);
    			this.equipList=res.rows;
    			this.equipListParams.page=parseInt(res.page);
    			this.equipListParams.page_size=parseInt(res.page_size);
    			this.equipListParams.total_count=parseInt(res.total_count);
    			console.log('this.equipList------------',this.equipList);
    		})
    	},
    	
    	//添加,删除器材方法
    	operageEquip(type,item){
    		console.log('addEquip--------',item);
    		let equipList=this.selectEquipList;
    		if(type=='add'){
    			equipList.push(item);
    		}else{
    			let index=equipList.findIndex((obj,index)=>{
    				return obj.id==item.id;
    			})
    			equipList.splice(index,1);
    		}
    		console.log('this.selectEquipList--------',equipList);
    	},
    	
    	//取消添加的设备器材
		cancelEquip() {
			this.addEquipDialog = false;
			this.numList = [];
		},
			
    	//搜索器材方法
    	search(val){
    		console.log('search------------');	
    		this.searchTxt=val;
    		this.getEquipList();
    	},
    	
    	//跳转到添加器材弹框方法
    	toAddEquip(){
    		console.log('toAddEquip-----------');
    		this.addEquipDialog=true;
    		this.getEquipList();
    	},
    	
    	//关闭添加素材对话框回调方法
    	resetOption(){
    		console.log('resetOption---------');
    	},
    	
    	//删除器材方法
    	delEquip(id){
    		console.log('delEquip---id',id);
    	},
    	
        // 用图片裁剪后上传七牛成功
        uploadSuccess(data){
        	console.log('uploadSuccess---------',data);
        	this.uploadPicList.push(data);
            this.packFrom.pic=this.uploadPicList.join(',');
            console.warn(this.packFrom.pic,'上传的图片数组')
        },
        
        // 用图片裁剪组件删除图片
        delSuccess(data){
            console.warn(data,'oooo')
            this.pic_update.uploadArray=[...data.uploadArray]
            this.pic_update.removeArray=[...data.removeArray]
            console.warn(this.pic_update,'update')
        },
        
        //重置表格
        resetTable(){
        	this.packFrom.price_table = [{
                hour: 1,
                price1: 0,
                price2: 0,
                price3: 0,
                price4: 0,
                price5: 0,
                price6: 0,
            }];
        },
        
        //选择租赁方式方法
        rentMethod() {
            this.resetTable();
        },
        
        //选择使用场地方法
        changeBorrow(val) {
            this.packFrom.borrow_type = parseInt(val);
            this.resetTable();
        },
        
        //视频上传之前判断他的大小
        beforeUploadVideo(file) {
            this.util.checkVideoInfo(this,file,'videoData');
        },
        
        // 获取预览视频信息
        getFile(file, fileList) {
            this.videoFlag = !this.videoFlag;
            this.videoURL = window.URL.createObjectURL(file.raw);
        },
        
        //视频上传的时候获取上传进度传给进度条
        uploadVideoProcess(event, file, fileList) {
            this.videoFlag = true;
            this.videoUploadPercent = parseInt(file.percentage);
        },
        
        //视频上传成功之后返回视频地址
        handleVideoSuccess(res, file) {
            this.videoFlag = true;
            this.videoUploadPercent = 0;
            this.videoURL = window.URL.createObjectURL(file.raw);
            this.packFrom.video = res.key;
        },
        
        // 添加视频后删除视频重选
        delVideo() {
            this.videoFlag = !this.videoFlag;
            this.videoURL = "";
            this.packFrom.video = "";
        },

        // 选择自定义小时
        selectHour() {
            this.packFrom.price_table.forEach(item => {
                this.hourList.forEach((item2, index) => {
                    if (item.hour == item2.value) {
                        item2.choose = true;
                    }
                });
            });
            this.hourList.forEach((item, index) => {
                if (!item.choose) {
                    this.hourRow.hour = this.hourList[index].hour;
                }
            });
        },

        // 添加按时收费行
        addhourRow() {
        	let form = this.packFrom;
			if(form.price_table.length >= this.hourList.length) {
				this.$message.warning('已经不能多设置了！');
				return;
			}
				
            form.price_table.forEach(item => {
                this.hourList.forEach((item2, index) => {
                    if (item.hour == item2.value) {
                        item2.choose = true;
                    }
                });
            });
            let arr = [];
            this.hourList.forEach((item, index) => {
                if (!item.choose) {
                    arr.push(item);
                    this.hourRow.hour = arr[0].value;
                }
            });
            form.price_table.push(this.util.deepcopy(this.hourRow));
            console.log('addhourRow------',form);
        },
        
        // 删除按时收费行
        delhourRow(index) {
        	let form = this.packFrom;
			form.price_table.splice(index, 1);
			this.hourList[index].choose = false;
        },
        
        //保存套餐方法
        savePackage() {
        	let form=this.packFrom;
        	form.equip_category_array_str='';
        	let tempArr=[];
        	form.equip_ids=[];
        	this.selectEquipList.forEach((item,index)=>{
        		tempArr.push(item.id);
        		let obj={
//      			relation_id:item.id,
        			equip:item.id,
        			num:1
        		}
        		form.equip_ids.push(obj);
        	})
        	form.equip_category_array_str=tempArr.join(',');
        	form.equip_ids=JSON.stringify(form.equip_ids);
            
            this.changePrice();
            console.log('savePackage-----------',form);
            //添加套餐
            this.util.addPack(form).then(res=>{
            	console.log("添加套餐------",res);
            	this.$message.success('添加套餐成功！');
            	this.util.back(this);
            })
        },
        
        getObj(type,overTime,num,price,isHoliday,isOut){
        	let obj={
        		rent_type:type,
        		is_overtime:overTime,
        		num:num,
        		price:price,
        		is_holiday:isHoliday,
        		is_out:isOut
        	}
        	return obj;
        },
        
        //价格转换方法
        changePrice(){
        	let form=this.packFrom;
        	form.price_arr=[];
        	let tempPriceArr=[];
        	console.error('changePrice----',form);
        	if(form.price_table.length>0){
        		form.price_table.forEach((item,index)=>{
        			let obj={rent_type:1};
        			for(let i in item){
        				if(i=='hour'){
        					obj.num=item[i];
        				}else{
        					let workType=i.split('price')[1];
	        				if(form.ptm_type==1){
	        					obj.is_out=0;
	        				}else{
	        					obj.is_out=1;
	        				}
	        				obj.price=item[i];
	        				switch(parseInt(workType)){
	        					case 1:
	        						obj.is_overtime='0';
	        						obj.is_holiday='3';
	        						break;
	        					case 2:
	        						obj.is_overtime='1';
	        						obj.is_holiday='3';
	        						break;
	        					case 3:
	        						obj.is_overtime='0';
	        						obj.is_holiday='2';
	        						break;
	        					case 4:
	        						obj.is_overtime='1';
	        						obj.is_holiday='2';
	        						break;
	        					case 5:
	        						obj.is_overtime='0';
	        						obj.is_holiday='1';
	        						break;
	        					case 6:
	        						obj.is_overtime='1';
	        						obj.is_holiday='1';
	        						break;
	        				}
	        				tempPriceArr.push({...obj});
        				}
        				
        			}
        		})
        	}
        	
        	let obj={rent_type:2,is_overtime:0,num:1};
        	if(form.price_day_workday){
        		let obj=this.getObj(2,0,1,form.price_day_workday,3,0)
        		tempPriceArr.push(obj);
        	}
        	
        	if(form.price_day_weekend){
      			let obj=this.getObj(2,0,1,form.price_day_weekend,2,0)
        		tempPriceArr.push(obj);
        	}
        	
        	if(form.price_day_holiday){
        		let obj=this.getObj(2,0,1,form.price_day_holiday,1,0)
        		tempPriceArr.push(obj);
        	}
        	
        	if(form.ptm_type==2){
        		if(form.price_day_workday){
	        		let obj=this.getObj(2,0,1,form.price_day_workday,3,1)
	        		tempPriceArr.push(obj);
	        	}
        		
	        	if(form.price_day_weekend){
	        		let obj=this.getObj(2,0,1,form.price_day_weekend,2,1);
	        		tempPriceArr.push(obj);
	        	}
	        	
	        	if(form.price_day_holiday){
	        		let obj=this.getObj(2,0,1,form.price_day_holiday,1,1);
	        		tempPriceArr.push(obj);
	        	}
	        	
        	}
        	
        	console.warn('tempPriceArr--------------',tempPriceArr);
        	tempPriceArr.forEach((item,index)=>{
        		form.price_arr.push(JSON.stringify(item));
        	})
        },
        
        
        
        // 点击返回
        back() {
            this.util.back(this);
        },
        
        //取消方法
        cancel() {
        	this.back();
        	console.log('cancel-----------');
        },
    }
};
</script>

<style lang="scss" scoped>
.red-start{
    color: red;
}
// 头部
.header {
	display:flex;
	justify-content: flex-end;
 	button{
 		margin:10px 0px;
 	}   
}

// 表单
.device-form {

    // 图片展示
    .picture-show {
        background-color: #fff;
        display: flex;
        flex-direction: column;
        margin-bottom: 31px;
        padding-bottom: 10px;

        .pictures {
            flex: 1;
            padding-top: 18px;
            padding-left: 20px;
            box-sizing: border-box;

            // 不可编辑时的图片展示区
            .display-img {
                width: 120px;
                height: 107px;
                margin-right: 10px;
                border-radius: 2px;
            }
        }

        // 可编辑时的图片添加区域
        .pictures /deep/ .el-upload--picture-card {
            border: 1px solid #ccc;
            background-color: #eee;
        }
    }


    // 具体收费
    .charge {
        margin-bottom: 31px;

        .title {
            margin-bottom: 18px;
        }


        .charge-title {
            display: flex;
            justify-content: space-between;
            padding: 0 20px;
            margin-bottom: 10px;

            .add-more {
                color: #7C6AFF;
                cursor: pointer;
            }
            .add-more:active {
                background-color: #7C6AFF;
                border-color: #7C6AFF;
                color: #fff;
            }
        }

        .charge-table {
            margin: 0 20px;
            margin-bottom: 30px;
            border: 1px solid rgb(204, 204, 204);
            border-radius: 2px;
            color: #333;

            .table-head {
                height: 38px;
                background: rgb(245, 248, 254);
                display: flex;
                align-items: center;

                .center {
                    flex: 7;
                    display: flex;

                    span {
                        flex: 1;
                        text-align: center;
                    }
                }

                span:first-child,
                span:last-child {
                    text-align: center;
                    // width: 160px;
                    flex: 1;
                }
            }

            .charge-item {
                // height: 118px;
                display: flex;
                align-items: center;
                border-bottom: 1px solid #eee;

                .using-time {
                    // width: 160px;
                    flex: 1;
                    text-align: center;
                    display: flex;
                    justify-content: center;

                    .day {
                        width: 90px;
                        height: 40px;
                        line-height: 40px;
                        border: 1px solid #eee;
                        border-radius: 4px;
                    }
                }

                .charge-row {
                    height: 100%;
                    flex: 7;
                    text-align: center;

                    .row-item {
                        height: 50%;
                        display: flex;
                        align-items: center;
                        border-bottom: 1px solid #eee;

                        div {
                            flex: 1;
                            padding: 5px 10px;
                            box-sizing: border-box;

                            .el-input {
                                width: 100%;
                                // background: pink;
                                height: 100%;
                                line-height: 50px;

                                div {
                                    // margin-right:10px;
                                }
                            }

                            .day-input {
                                // background: gold;
                                width: 50%;
                                height: 50%;
                            }
                        }
                    }

                    .row-item:last-child {
                        border-bottom: none;
                    }
                }

                .operation {
                    // width: 160px;
                    flex: 1;
                    text-align: center;

                    .del-btn {
                        background: #7C6AFF;
                        color: #fff;
                        cursor: pointer;
                    }
                }
            }

            .charge-item:last-child {
                border-bottom: none;
            }

            .no-item {
                height: 60px;
                color: #909399;
                text-align: center;
                line-height: 60px;
            }
        }
    }

    // 视频及描述
    .video-dec {
        margin-bottom: 21px;
        // 标题

        // 视频及描述外层
        .video-wrap {
            margin-top: 18px;
            padding-left: 20px;

            // 视频
            .video {
                margin-bottom: 20px;
                border-radius: 2px;
            }

            // 添加视频
            .add-video {
                margin-bottom: 20px;
                width: 604px;
                height: 302px;
                background: rgb(238, 238, 238);
                border: 1px solid rgb(204, 204, 204);
                border-radius: 2px;
                color: #666;
                cursor: pointer;

                .center {
                    width: 90px;
                    margin: 0 auto;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    text-align: center;
                    justify-content: center;

                    .el-icon-video-play {
                        font-size: 68px;
                        margin-bottom: 22px;
                    }
                }
            }

            // 添加视频成功后
            .show-video {
                margin-bottom: 20px;
                outline: none;
            }

            // 提示
            .tip {
                margin-bottom: 20px;
                color: #7C6AFF;
            }

            // 删除视频按钮
            .del-video {
                margin-bottom: 20px;
                background: #7C6AFF;
                border-radius: 4px;
                color: #fff;
                border: none;
            }

            .del-video:active {
                background-color: #255368;
                border-color: #255368;
            }

            // 显示描述
            .text-show {
                padding-left: 20px;
                padding-top: 10px;
                background: rgb(238, 238, 238);
                border-radius: 2px;
                min-height: 120px;
            }
        }
    }
}
.selected {
		display: flex;
		margin-left: 10px;
		li {
			position: relative;
			margin-right: 60px;
			margin-bottom: 8px;
			height:25px;
			i{
				width: 20px;
			    height: 20px;
			    line-height: 17px;
			    text-align: center;
			    border: 1px solid #D9D9D9;
			    background: #fff;
			    color: #999999;
			    position: absolute;
			    right: -29px;
			    top: -1px;
			    cursor: pointer;
			}
		}
	}
.showSelect {
		display: flex;
		margin: 20px 0px;
		background: #FAFAFA;
		padding: 15px;
		&>span {
			color: #7C6AFF;
		}
		&.noSelect{
			justify-content:space-around;
		}
		.selected {
			li {
				padding: 0px;
				position: relative;
				background:#7C6AFF;
				padding:3px 5px;
				color:#fff;
				span {
					margin-right: 0px !important;
					top: -5px;
				}
			}
		}
		.noSelect{
			display:flex;
			flex-direction:column;
			align-items:center;
			img{
				width:101px;
				height:81px;
				margin-top:40px;
				margin-bottom:20px;
			}
		}
	}
	
	.tableFoot {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.confirmBtn {
		background-color: #7C6AFF;
		border-radius: 0px;
		color: #fff;
	}
	
	.cancelBtn {
		background-color: transparent;
		border-radius: 0px;
		border: 1px solid #d9d9d9;
	}
	
	/deep/{
		.el-pagination__editor.el-input{
			width:50px!important;
			.el-input__inner{
				height:28!important;
			}
		}
	}


@media screen and (max-width: 1615px) {
    /deep/ .el-card__body {

        .charge-item {
            .using-time {
                flex: 0.5;
            }

            .charge-row {
                .row-item {
                    div {
                        padding: 5px 5px !important;

                        /deep/ {
                            .el-input__inner {
                                padding-left: 5px;
                            }
                        }
                    }
                }
            }

            .operation {
                flex: 0.5;
            }
        }
    }
}
.card{
	padding:20px 30px;
	background:#fff;
	margin-bottom:20px;
	.headTitle{
		font-size:20px;
		color:#333;
		padding-bottom:20px;
		border-bottom:1px solid #F0F0F0;
        margin-bottom: 35px;
	}
	.topNav{
		display:flex;
		align-items:center;
		justify-content: space-between;
		border-bottom:1px solid #F0F0F0;
		padding-bottom:20px;
		.headTitle{
			border-bottom:none;
			padding-bottom:0px;
			margin-bottom:0px;
		}
	}
}
.sn-input{
	display:flex;
	flex-direction:column;
}
/deep/{
	 .selectHour{
	 	.el-input{
	 		width:90px!important;
	 	}
	 }
}
</style>
