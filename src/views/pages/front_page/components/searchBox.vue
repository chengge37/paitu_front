<template>
	<div>
		<div class="search-box">
			<div class="search">
				<div class="icon">
					<ali-svg-icon icon-class="seach"></ali-svg-icon>
				</div>
				<input type="text" placeholder="输入您想查询的内容" class="search-input" v-model="mySearchTxt">
			</div>
			<div class="search-button" @click="search">搜索</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				mySearchTxt:this.search_text
			};
		},
		props: {
			search_text: {
				type: String,
				default: '',
			},
		},
		watch:{
			"mySearchTxt":function(to,from){
				this.$parent.search_text=this.mySearchTxt;
			}
		},
		mounted() {
			
		},
		computed: {
			
		},
		methods: {
			search(){
				this.$parent.search();
			}
		}
	};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.search-box {
    display: flex;
   	margin-bottom:20px;
    .search {
        display: flex;
        height: 36px;
        align-items: center;
        border: 1px solid #ccc;
        border-radius: 5px 0px 0px 5px;
        background-color: #fff;
        .icon {
            width: 14px;
            height: 14px;
            margin: 12px 5px 12px 5px;
        }
        .search-input {
            border: none;
            outline: medium;
            background-color: #ffffff;
            height: 30px;
            font-size: 14px;
        }
    }
    .search-button {
        width: 60px;
        height: 36px;
        line-height: 36px;
        background-color: #3980FF;
        text-align: center;
        color: #fff;
        border-radius: 0px 5px 5px 0px;
        cursor: pointer;
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