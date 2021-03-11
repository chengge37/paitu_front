<template>
	<div>
		<join-info :taskId="biddingId" :type="type"></join-info>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	import joinInfo from "FrontComponents/joinInfo";
	export default {
		data() {
			return {
				biddingId:'', //投标id
				type:'', //1:详情，2:修改
			};
		},

		components: {
			joinInfo
		},
		
		created() {
			let query=this.$route.query;
			console.warn('detail-----------------',query);
			if(!this.util.isEmpty(query)){
				this.biddingId=query.id;
				this.type=query.type;
			}
			
			console.log('biddingId----',this.biddingId);
		},
		
		computed: {
			...mapGetters(["user_data"])
		},
		
		methods: {
			
		}
	};
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
	
</style>