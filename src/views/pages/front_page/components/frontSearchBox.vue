<template>
<div>
    <div class="search-box" :class="{'customWidth':customWidth}">
        <div class="search" :style="'width:'+customWidth+'%'" >
            <!--<div class="icon">

<ali-svg-icon icon-class="seach"></ali-svg-icon>

</div>-->
            <input type="text" placeholder="输入您想查询的内容" class="search-input input-focus" @keyup.enter="search" v-model="mySearchTxt">
        </div>
        <!--<div class="search-button" @click="search">搜索</div>-->
        <div class="search-button color-area" @click="search">
            <!--<img class="bg-mirror" alt="" width='24' height='24' />-->
            <ali-svg-icon icon-class="ic_search__white" class="bg-mirror"></ali-svg-icon>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            mySearchTxt: this.searchTxt,
        };
    },
    props: {
    	//类型： 0/影棚  1/设备
		type:{
			type:String,
			default:''
		},
		searchTxt:{
			type:String,
			default:''
		},
		customWidth:{
			type:String,
			default:''
		}
    },
    mounted() {
		console.log('this.customWidth------',this.customWidth);
    },
    computed: {

    },
    methods: {
        search() {
        	console.log('search----------------');
            let params={search:this.mySearchTxt};
            if(this.type=='0'){
            	this.util.toStudioList(params);
            }else if(this.type=='1'){
            	this.util.toEquipList(params);
            }
            this.$emit('search', this.mySearchTxt);
        }
    }
};
</script>

<style lang="scss" scoped>
.search-box {
    display: flex;
    width: 20.5vw;
	&.customWidth{
		width:auto;
	}
    .bg-mirror {
        width: 30px;
        height: 30px;
    }

    .search {
        display: flex;
        width: 20.5vw;

        .search-input {
            border: none;
            outline: medium;
            background-color: #ffffff;
            height: 100%;
            font-size: 14px;
            text-indent: 20px;
            width: 100%;
            border: 1px solid #D9D9D9;
        }
    }

    .search-button {
        width: 80px;
        height: 36px;
        line-height: 36px;
        background-color: #7C6AFF;
        text-align: center;
        color: #fff;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .ali-svg-icon {
        width: 18px;
        height: 19px;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }
}
</style>
