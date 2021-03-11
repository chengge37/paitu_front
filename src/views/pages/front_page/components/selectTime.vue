<template>
	<div>
		<span>开始时间：</span>
		<el-date-picker value-format="yyyy-MM-dd" v-model="myDateStart" :picker-options="pickerOptionsStart" type="date" placeholder="yy-mm-dd">
		</el-date-picker>
		<span class="endDom">结束时间:</span>
		<el-date-picker value-format="yyyy-MM-dd" v-model="myDateEnd" :picker-options="pickerOptionsEnd" type="date" placeholder="yy-mm-dd">
		</el-date-picker>
	</div>
</template>

<script>
	export default {
		props: {
			dateStart: {
				type: String,
				default: ''
			},
			dateEnd: {
				type: String,
				default: ''
			}
		},
		watch: {
			"myDateStart": function(to, from) {
				this.$parent.dateStart = this.myDateStart;
				if(this.util.compareDate(this.myDateStart,this.myDateEnd)){
					this.myDateEnd='';
				}
			},
			"myDateEnd": function(to, from) {
				this.$parent.dateEnd = this.myDateEnd;
			}
		},
		data() {
			return {
				pickerOptionsStart: {
					disabledDate: time => {
						return time.getTime() < Date.now() - 24 * 60 * 60 * 1000;
					}
				},
				pickerOptionsEnd: {
					disabledDate: time => {
						if(this.dateStart) {
							return(time.getTime() < new Date(this.dateStart).getTime() - 86400000) || time.getTime() < Date.now() - 24 * 60 * 60 * 1000;
						} else {
							return time.getTime() < Date.now() - 24 * 60 * 60 * 1000
						}
					}
				},
				myDateStart: this.dateStart,
				myDateEnd: this.dateEnd
			}
		},
		methods: {
			
		}

	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
div{
	span{
		color:#999999;
		&:first-child{
			margin-right:6px;
		}
	}
}
</style>