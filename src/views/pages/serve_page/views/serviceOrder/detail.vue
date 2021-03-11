<template>
	<div>
		<service-order-detail type="1" :id="orderId"></service-order-detail>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	import serviceOrderDetail from "ServeComponents/serviceOrderDetail";
	export default {
		data() {
			return {
				orderId:'', //订单id
			};
		},

		components: {
			serviceOrderDetail
		},

		
		created() {
			this.orderId=this.$route.query.id;
			console.log('orderId----',this.orderId);
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