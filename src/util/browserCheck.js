// 判断是否移动端，移动端就直接跳转h5
// 将移动设备名称(小写或者都大写)定义一个数组
var mobileAgent = new Array("iphone", "ipod", "ipad", "android", "mobile", "blackberry", "webos", "incognito", "webmate", "bada", "nokia", "lg", "ucweb", "skyfire");
// 将浏览器navigator对象的userAgent转换成小写字母或者大写字母
var browser = navigator.userAgent.toLowerCase();
// 定义一个判断是否是移动设备的flag
var isMobile = false;

String.prototype.find=function(str){
	if(this.indexOf(str)>=0){
		return true;
	}else{
		return false;
	}
}
for (var i = 0; i < mobileAgent.length; i++) {
// 如果浏览器navigator对象的userAgent中包含已经定义的移动设备的名称,说明是移动设备登录;
    if (browser.indexOf(mobileAgent[i]) != -1) {
    	//获取当前地址
		var url = window.location.href;
		console.log('browserCheck---------------',url);
		let id='';
		let type=0;  //0:影棚详情，1:设备详情,2:店铺,3:模特,4:服务,5:拼拍,6各公司主页
		let shopType=0; //0:个人主页，，1:公司主页
		let personType=1;  //1/个人摄影师  2/个人模特
		let list=['studio/index','equip/index','model/index','service/index'];
		let listType=-1; //0:影棚类表，1：设备列表，2：模特列表，3：服务列表
		let detailList=['studio/detail?id=','equip/detail?id=','shop/index?uid=','model/detail?id=','service/detail?id=','team/detail?id='];
		let storeList=['roleHome/modelHome?id=','roleHome/photographerHome?id=','roleHome/companyHome?id='];

		//判断是否为列表
		list.forEach((item,index)=>{
			if(url.find(item)){
				listType=index;
			}
		})
		
		//判断是否为详情
		detailList.forEach((item,index)=>{
			if(url.find(item)){
				id=url.split(item)[1];
				type=index;
			}
		})
		
		
		if(url.find(storeList[0])){
			id=url.split(storeList[0])[1];
			type=6;
			shopType=0;
			personType=2;
		}else if(url.find(storeList[1])){
			id=url.split(storeList[1])[1];
			type=6;
			shopType=0;
			personType=1;
		}else if(url.find(storeList[2])){
			let flag=url.indexOf(storeList[2]);
			id=url.substr(flag+storeList[2].length, 1);
			type=6;
			shopType=1;
		}
		
		let baseUrl='https://h5.paitume.com/';
		
    	if(listType>=0){
    		switch(parseInt(listType)){
    			case 0:
    				break;
    			case 1:
    				break;
    			case 2:
    				location.href =baseUrl+'pages/home/category/model';
    				break;
    			case 3:
    				location.href =baseUrl+'pages/home/category/service';
    				break;
    		}
    	}else{
    		if(id && id>=0){
				switch(parseInt(type)){
					case 0:
						location.href =baseUrl+'pages/home/category/studioDetail/studioDetail?studio_id='+id;
						break;
					case 1:
						location.href =baseUrl+'pages/home/category/equipmentDetail/equipmentDetail?equip_id='+id;
						break;
					case 2:
						location.href =baseUrl+'pages/merchant/shop/shop?id='+id;
						break;
					case 3:
						location.href =baseUrl+'pages/home/category/modelDetail/index?id='+id;
						break;
					case 4:
						location.href =baseUrl+'pages/home/category/serviceDetail/index?id='+id;
						break;
					case 5:
						location.href =baseUrl+'pages/home/category/groupBooking/detail?id='+id;
						break;
					case 6:
						if(shopType==0){
							location.href =baseUrl+'pages/merchant/personal/index?id='+id+'&type='+personType;
						}else if(shopType==1){
							location.href =baseUrl+'pages/merchant/company/index?id='+id;
						}
				}
	        }else{
	        	// 跳转移动端页面
	        	location.href = 'https://h5.paitume.com/';
	        }
    	}
    	
        
        
        // 打断循环,优化性能
        break;
    }
}