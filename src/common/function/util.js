import Vue from 'vue'
import {
	format
} from "date-fns";
import $Vm from '../../main'
import {
	jrDate,
	qiniuHost,
	male_pic,
	error_pic
} from '../../config/config.js'
import {
	submit,
	bidding,
	assistant,
	serveInfo,
	other,
	team,
	service,
	model,
	pack,
	cart,
	question,
	equip,
	adv,
	frontPersonal,
	studioApi,
	employee,
	customer,
	customer_group,
	refund,
	feedback,
	frontShop,
	shopTemplate,
	order,
	product,
	activity,
	frontEquip,
	frontStudio,
	frontOrder,
	frontAddress,
	safe,
	setting,
	frontComment,
	sms,
	finance,
	faq,
	coupon,
	store
} from "@config/api.js"

import { checkVideo } from "@util/videoCheck.js";

//判断数据是否为空
export const isEmpty = (res) => {
	if(res == null || res == '' || res == undefined || JSON.stringify(res) == '[]' || JSON.stringify(res) == '{}') {
		return true;
	} else {
		return false;
	}
}

//跳转到不存在的页面
export const notFound = (o, title) => {
	o.$router.push({
		path: "*",
		query: {
			title: title
		}
	});
}

//判断当前系统是否是window系统
export const download = () => {
	var agent = navigator.userAgent.toLowerCase();
	var isMac = /macintosh|mac os x/i.test(navigator.userAgent);
	let flag = "";
	let format = '.exe';
	if(agent.indexOf("win32") >= 0 || agent.indexOf("wow32") >= 0) {
		flag = 'win32';
		//		return 'win32';
	}
	if(agent.indexOf("win64") >= 0 || agent.indexOf("wow64") >= 0) {
		flag = 'win64';
		//		return 'win64';
	}
	if(isMac) {
		flag = 'mac'
		format = '.dmg';
		//		return 'mac';
	}
	//获取单机版版本号
	let version;
	$Vm.getRequest(product.getProductList).then(res => {
		console.log('download-------', res);
		console.log('qiniuHost-------', qiniuHost);
		res.rows.forEach((item, index) => {
			if(item.id == 11) {
				version = item.version;
			}
		})
		console.log(qiniuHost + 'paitume_' + version + '_' + flag + format + '?' + getUUID());
		let path = qiniuHost + 'paitume_' + version + '_' + flag + format + '?' + getUUID();
		window.open(path, '_self');
	}).catch(err => {});

}

//联系客服调用的方法
export const contact = () => {
	let chatToObj = {
		id: '3',
		name: '客服',
		avatar: male_pic
	}
	$Vm.$children[0].$refs.chat.chatTo(chatToObj)
};

//localStorage 设置方法
export const setStorage = (key, val) => {
	localStorage.setItem(key, JSON.stringify(val));
};

//localStorage 获取方法
export const getStroage = (key) => {
	return JSON.parse((localStorage.getItem(key)));
};

//根据路由列表,获取子账号第一个有权先的路由路径
// export const getFirstPermissPath = (roleList) => {
// 	//跳转到第一个有权限的菜单
// 	let path = roleList.find(v => v.meta.permission == true);
// 	let url = path.path + '/' + path.children[0].path;
// 	console.log('getFirstPermissPath-------', roleList, url);
// 	return url;
// };

//获取路由表上的后台菜单
export const getServeMenu = (o) => {
	let routeList = o.$router.options.routes.filter(item => {
		if(item.meta && item.children) {
			return item.meta.roles == "serve";
		}
	});
	return routeList;
};

//获取路由表上的所有菜单
export const getAllMenu = (o) => {
	let routeList = o.$router.options.routes;
	return routeList;
};

//根据角色获取后台菜单
export const getMenuByRole = (o, role) => {
	let allList = o.$router.options.routes;
	let menuList = [];
	allList = allList.filter(item => {
		if(item.meta && item.children) {
			return item.meta.roles == "serve";
		}
	});
	allList.forEach(item => {
		if(item.children) {
			console.log(1);
			item.children = item.children.filter(item => {
				return item.meta.userRole.split(',').some(item => role & Number(item))
			})
			if(item.children.length !== 0) {

				menuList.push(item)
			}
		}
	})
	return menuList;
};

// export const getAccountRole = (o, role) => {
// 	let roleList = [];
// 	let str = parseInt(role).toString(2);
// 	//反转数组并遍历
// 	str.split('').reverse().forEach((item, index) => {
// 		if (item > 0) {
// 			roleList.push(Math.pow(2, index));
// 		}
// 	})
// 	return roleList;
// };
//获取后台菜单列表
export const getServeMenuList = (o) => {
	//获取后台菜单列表
	let menuList = [];
	o.$router.options.routes.forEach((item, index) => {
		if(item.meta && item.meta.roles == "serve" && item.children) {
			let obj = {
				menuRole: item.meta.menuRole,
				name: item.children[0].meta.title,
				status: '0'
			}
			menuList.push(obj);
		}
	})
	menuList.forEach((item, index) => {
		item.id = index;
	})
	return menuList;
};

//获取七牛qiniuHost信息
export const qiniuAddress = (function() {
	return qiniuHost;
})();

//返回错误图片地址
export const errorPic = (function() {
	let errorPic = error_pic;
	return `this.src="${errorPic}"`;
})();

//返回默认加载失败地址
export const errorAvatar = (function() {
	let errorAvatar = error_pic;
	return errorAvatar;
})();

//返回默认头像地址
export const maleAvatar = (function() {
	let malePic = male_pic;
	return `this.src="${malePic}"`;
})();

//返回默认头像，如果加载失败或者空
export const malePic = (function() {
	let malePic = male_pic;
	return `this.src="${malePic}"`;
})();

//返回默认头像地址
export const defaultAvatar = (function() {
	let defaultAvatar = male_pic;
	return defaultAvatar;
})();

//获得某月的最后一天  ,并返回日期
export const getLastDay = function(year, month) {
	var new_year = year; //取当前的年份          
	var new_month = month; //取下一个月的第一天，方便计算（最后一天不固定）          
	if(month > 12) {
		new_month -= 12; //月份减          
		new_year++; //年份增          
	}
	var new_date = new Date(new_year, new_month, 1); //取当年当月中的第一天          
	return year + "-" + toDouble(new_month) + "-" + toDouble((new Date(new_date.getTime() - 1000 * 60 * 60 * 24)).getDate()); //获取当月最后一天日期          
}

//根据相同字段拆分成数组形式方法
export const changeArr = function(arr) {
	var map = {},
		dest = [];
	for(var i = 0; i < arr.length; i++) {
		var ai = arr[i];
		if(!map[ai.relation_id]) {
			dest.push({
				id: ai.relation_id,
				name: ai.name,
				type: ai.type,
				imgInfo: [ai]
			});
			map[ai.relation_id] = ai;
		} else {
			for(var j = 0; j < dest.length; j++) {
				var dj = dest[j];
				if(dj.id == ai.relation_id) {
					dj.imgInfo.push(ai);
					break;
				}
			}
		}
	}
	return dest;
}

//去掉数组中为空的元素
export const trimSpace = function(arr) {
	for(var i = 0; i < arr.length; i++) {
		if(arr[i] == "" || arr[i] == null || typeof(arr[i]) == "undefined") {
			arr.splice(i, 1);
			i = i - 1;
		}
	}
	return arr;

}

//对象数组根据属性排序,默认降序，desc:true升序 ，，false 降序
export const compare = function(property, desc = false) {
	return function(a, b) {
		var value1 = a[property];
		var value2 = b[property];
		if(desc == true) {
			// 升序排列
			return value1 - value2;
		} else {
			// 降序排列
			return value2 - value1;
		}
	}
}

//获取设备可选类别
export const getEquipArray = function() {
	let list = [];
	let item = {
		id: '0',
		name: '不限'
	};
	list.push(item);
	$Vm.$staticCategoryTree.forEach((item, index) => {
		item.children.forEach((subItem, index2) => {
			if(subItem.children) {
				subItem.children.forEach((subItem2, index3) => {
					list.push(subItem2);
				})
			} else {
				list.push(subItem);
			}
		})
	})
	return list;
};

//获取全部城市信息，包含（不限城市）
export const staticAllCity = function() {
	let list = [];
	let obj = {
		"id": "0",
		"city": "不限",
		"code": "0"
	};
	list.push(obj);
	list.push(...$Vm.$staticCityArray);
	return list;
};

//根据城市名称获取城市区号，如"珠海市",返回"0756"
export const getCodeByCity = function(str) {
	console.log('str---', str);
	let allCityCode = $Vm.config.allCity;
	for(let item in allCityCode) {
		if(str == allCityCode[item]) {
			console.log('获取城市--------------', item);
			return item;
		}
	}
};

//保留2位小数
export const toFixed2 = function(num) {
	let str = parseFloat(num).toFixed(2);
	return str;
}

//检测密码强度  ['','低',’中','高']， 返回对应的0,1,2,3
export const checkPswStrong = function(str) {
	let s = 0;
	if(str.length < 6) {
		return s;
	};
	if(/[a-zA-Z]/.test(str)) {
		s++;
	};
	if(/[0-9]/.test(str)) {
		s++;
	};
	if(/[^0-9a-zA-Z]/.test(str)) {
		s++;
	};
	return s;
};

//时间选择,obj(this),dateStart开始时间，dateEnd结束时间，fun/触发方法，filed（字段）
export const setTimeStart = function(obj, dateStart, dateEnd, fun, filed) {
	return new Promise((resolve, reject) => {
		if(obj[dateStart]) {
			if(obj[dateEnd]) {
				if(compareDate(obj[dateStart], obj[dateEnd])) {
					resolve(false);
				}
				obj[fun](filed, obj[dateStart] + "—" + obj[dateEnd]);
			} else {
				obj[fun](filed, obj[dateStart] + "—");
			}
		}
		resolve(true);
	})
}

//时间选择,obj(this),dateStart开始时间，dateEnd结束时间，fun/触发方法，filed（字段）
export const setTimeEnd = function(obj, dateStart, dateEnd, fun, filed) {
	if(obj[dateEnd]) {
		if(obj[dateStart]) {
			obj[fun]("time", obj[dateStart] + "—" + obj[dateEnd]);
		} else {
			obj[fun]("time", "—" + obj[dateEnd]);
		}
	} else {
		if(obj[dateStart]) {
			obj[fun]("time", obj[dateStart] + "—");
		}
	}
}

//生成随机数
export const getUUID = function(len) {
	len = len || 6;
	len = parseInt(len, 10);
	len = isNaN(len) ? 6 : len;
	var seed = "0123456789abcdefghijklmnopqrstubwxyzABCEDFGHIJKLMNOPQRSTUVWXYZ";
	var seedLen = seed.length - 1;
	var uuid = "";
	while(len--) {
		uuid += seed[Math.round(Math.random() * seedLen)];
	}
	return uuid;
};

//生成随机数(纯数字) 默认8位
export const getRandomNum = function(len) {
	len = len || 8;
	len = parseInt(len, 10);
	len = isNaN(len) ? 8 : len;
	var seed = "0123456789";
	var seedLen = seed.length - 1;
	var uuid = "";
	while(len--) {
		uuid += seed[Math.round(Math.random() * seedLen)];
	}
	return uuid;
};

//深拷贝
export const deepcopy = function(source) {
	if(!source) {
		return source;
	}
	let sourceCopy = source instanceof Array ? [] : {};
	for(let item in source) {
		sourceCopy[item] = typeof source[item] === 'object' ? deepcopy(source[item]) : source[item];
	}
	return sourceCopy;
};

//ajax错误处理
export const catchError = function(error) {
	if(error.response) {
		switch(error.response.status) {
			case 400:
				Vue.prototype.$message({
					message: error.response.data.message || '请求参数异常',
					type: 'error'
				});
				break;
			case 403:
				Vue.prototype.$message({
					message: error.response.data.message || '无访问权限，请联系企业管理员',
					type: 'warning'
				});
				break;
			default:
				Vue.prototype.$message({
					message: error.response.data.message || '服务端异常，请联系技术支持',
					type: 'error'
				});
		}
	}
	return Promise.reject(error);
}

export const showWarn=function(tip){
	$Vm.$message.warning(tip);
}

export const showSuccess=function(tip){
	$Vm.$message.success(tip);
}

//删除再次确认方法
export const confirm = function(obj, title = '此操作将永久删除信息, 是否继续?') {
	return obj.$confirm(title, '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
		center: true
	});
}

//拒单输入拒绝内容弹窗方法
export const prompt = function(obj, title = '确定要拒绝订单吗?', tips = '提示') {
	console.log('prompt----------');
	return obj.$prompt(title, tips, {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
	});
}

//检测表格方法
export const checkForm = function(obj, formName = 'form', tips = '请填写必填信息!') {
	let o = obj.$refs[formName] || obj.$refs['ruleForm'];
	return new Promise((resolve, reject) => {
		o.validate((valid) => {
			if(valid) {
				resolve(true);
			} else {
				$Vm.$message.warning(tips);
				reject(false);
			}
		});
	})
}

//个位数字前面补0
export const toDouble = function(str) {
	let num = parseInt(str);
	return num > 9 ? num : '0' + num;
}

//格式化时间，年月日  默认格式为：2019-09-26
export const getTime = function(date, type = "yyyy-MM-dd") {
	var o = {
		"M+": date.getMonth() + 1, //月份
		"d+": date.getDate(), //日
		"h+": date.getHours(), //小时
		"m+": date.getMinutes(), //分
		"s+": date.getSeconds(), //秒
		"q+": Math.floor((date.getMonth() + 3) / 3), //季度
		"S": date.getMilliseconds() //毫秒
	};
	if(/(y+)/.test(type)) type = type.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	for(var k in o)
		if(new RegExp("(" + k + ")").test(type)) type = type.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return type;
}

//获取多长时间后的日期，返回数组 如['2019-09-26','2019-10-26']
//type  0/月 1/年
export const getTimePeriod = function(type) {
	let tempArr = [];
	let date = getTime(new Date());
	tempArr.push(date);
	if(type == 0) {
		let arr = date.split('-');
		let year = arr[0]; //获取当前日期的年份 
		let month = arr[1]; //获取当前日期的月份 
		let day = arr[2]; //获取当前日期的日 
		let days = new Date(year, month, 0);
		days = days.getDate(); //获取当前日期中的月的天数 
		let year2 = year;
		let month2 = parseInt(month) + 1;
		if(month2 == 13) {
			year2 = parseInt(year2) + 1;
			month2 = 1;
		}
		let day2 = day;
		let days2 = new Date(year2, month2, 0);
		days2 = days2.getDate();
		if(day2 > days2) {
			day2 = days2;
		}
		if(month2 < 10) {
			month2 = '0' + month2;
		}

		let t2 = year2 + '-' + month2 + '-' + day2;
		tempArr.push(t2);
		console.log('tempArr------', tempArr);
	} else if(type == 1) {
		var d1 = new Date(date);
		var d2 = new Date(d1);
		d2.setFullYear(d2.getFullYear() + 1);
		tempArr.push(getTime(d2));
	}
	return tempArr;

}

//将unix时间戳转换为年月日
export const time2Date = function(value, formatStr = 'YYYY-MM-DD') {
	//	console.log('time2Date---------',value);
	return format(new Date(value * 1000), formatStr);
}

// 通过时间戳获取正常的时间显示  //type: Y:年月日 H:时分秒  其他：年月日时分秒
export const unix2Time = function(data, type) {
	var _data = data;
	//如果是13位正常，如果是10位则需要转化为毫秒
	if(String(data).length == 13) {
		_data = data
	} else {
		_data = data * 1000
	}
	const time = new Date(_data);
	const Y = time.getFullYear();
	const Mon = toDouble(time.getMonth() + 1);
	const Day = toDouble(time.getDate());
	const H = toDouble(time.getHours());
	const Min = toDouble(time.getMinutes());
	const S = toDouble(time.getSeconds());
	//自定义选择想要返回的类型
	if(type == "Y") {
		return `${Y}-${Mon}-${Day}`
	} else if(type == "H") {
		return `${H}:${Min}:${S}`
	} else {
		return `${Y}-${Mon}-${Day} ${H}:${Min}:${S}`
	}
}

//比较两个时间大小,time1,time2 格式为'2019-09-30 00:00:00'
export const compareTime = function(time1, time2) {
	if(time1 > time2) {
		return true;
	} else {
		return false;
	}
}

//计算两个时间的相差天数,sDate1和sDate2是2006-12-18  或者2006-12-18 00:00:00
export const datedif = function(sDate1, sDate2) {
	console.log('datedif---------', sDate1, sDate2);
	var dateSpan,
		tempDate,
		iDays;
	sDate1 = Date.parse(sDate1.replace(/-/g, "/"));
	sDate2 = Date.parse(sDate2.replace(/-/g, "/"));
	dateSpan = sDate2 - sDate1;
	dateSpan = Math.abs(dateSpan);
	iDays = Math.ceil(dateSpan / (24 * 3600 * 1000));
	console.log('iDays-------------', iDays);
	return iDays
};

//获取指定日期，添加一个月或者一年后的日期 'month','year'
export const getAfterDate = function(date, type) {
	var now;
	if(date.toString().indexOf('-') >= 0) {
		now = new Date(date.replace(/-/g, "/"));
	} else {
		now = new Date(date);
	}

	if(type == 'year') {
		now.setFullYear(now.getFullYear() + 1);
	} else if(type == 'month') {
		now.setMonth(now.getMonth() + 1);
	}

	var datetime = now.getFullYear() + '-' + toDouble(now.getMonth() + 1) + '-' + toDouble(now.getDate());
	return datetime;
}

//计算当前日期下个月有几天
export const getNextMonthDay = function() {
	let date = new Date();
	let nowYear = date.getFullYear();
	let nowMonth = date.getMonth() + 1;
	let nowDay = date.getDate();
	let date1 = nowYear + '-' + toDouble(nowMonth) + '-' + toDouble(nowDay);

	let arr = date1.split('-');
	let year = arr[0]; //获取当前日期的年份
	let month = arr[1]; //获取当前日期的月份
	let day = arr[2]; //获取当前日期的日
	let days = new Date(year, month, 0);
	days = days.getDate(); //获取当前日期中的月的天数
	let year2 = year;
	let month2 = parseInt(month) + 1;
	if(month2 == 13) {
		year2 = parseInt(year2) + 1;
		month2 = 1;
	}
	let day2 = day;
	let days2 = new Date(year2, month2, 0);
	days2 = days2.getDate();
	if(day2 > days2) {
		day2 = days2;
	}
	if(month2 < 10) {
		month2 = '0' + month2;
	}

	let date2 = year2 + '-' + month2 + '-' + day2;

	let dateSpan,
		tempDate,
		iDays;
	sDate1 = Date.parse(date1.replace(/-/g, "/"));
	sDate2 = Date.parse(date2.replace(/-/g, "/"));
	dateSpan = sDate2 - sDate1;
	dateSpan = Math.abs(dateSpan);
	iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
	return iDays
}

// 图片explode
//export const picExplode =function (arrayStr,defaultPic,size=400){
//	if(arrayStr === null || arrayStr === undefined || arrayStr ==='' ||       Object.prototype.toString.call(arrayStr) !== '[object String]'){
//		return defaultPic;
//	}
//	let array = arrayStr.split(',');
//	let newArray = [];
//	array.forEach(item=>{
//		if(item.length>0){
//			newArray.push(item);
//		}
//	})
//	if(newArray.length>0){
//		return newArray[0] + '?imageMogr2/auto-orient/thumbnail/'+size+'x'+size+'>/blur/1x0/quality/75|imageslim';
//	} else {
//		return defaultPic;
//	}
//}

export const picExplode = function(arrayStr, defaultPic, size = 400) {
	if(arrayStr === null || arrayStr === undefined || arrayStr === '' || Object.prototype.toString.call(arrayStr) !== '[object String]') {
		return defaultPic;
	}
	let newArray = arrayStr.split(',').filter(item => {
		return item
	});
	// console.log('newArray-------',newArray,qiniuHost);
	if(newArray.length > 0) {
		let test = qiniuHost + newArray[0] + '?imageMogr2/auto-orient/thumbnail/' + size + 'x' + size + '>/blur/1x0/quality/75|imageslim';
		// console.log('test-----------',test);
		return qiniuHost + newArray[0] + '?imageMogr2/auto-orient/thumbnail/' + size + 'x' + size + '>/blur/1x0/quality/75|imageslim';
	} else {
		return defaultPic;
	}

}

//比较两个对象数组差异，返回数组（暂时比较group_id,和group_name两个字段） array1/新修改的数组，array/旧的数组
//（暂时用在客户分组，和员工部门修改）
export const getDiff = function(array1, array2) {
	var result = [];
	for(var i = 0; i < array1.length; i++) {
		var obj = array1[i];
		var id = obj.group_id;
		var name = obj.group_name
		var isExist = false;
		for(var j = 0; j < array2.length; j++) {
			var obj2 = array2[j];
			var id2 = obj2.group_id;
			var name2 = obj2.group_name
			if(id == id2 && name == name2) {
				isExist = true;
				break;
			}
		}
		if(!isExist) {
			result.push(obj);
		}
	}
	return result;
}

//找出两个数组不同的元素,并返回数组
export const getArrDifference = function(arr1, arr2) {
	return arr1.concat(arr2).filter(function(v, i, arr) {
		return arr.indexOf(v) === arr.lastIndexOf(v);
	});
}

//验证手机号码是否合法
export const checkPhone = function(str) {
	let reg = /^1[3456789]\d{9}$/;
	if(reg.test(str)) {
		return true;
	} else {
		$Vm.$message.warning('手机号码不合法！');
		return false;
	}
}

//验证邮箱是否合法
export const checkEmail = function(str) {
	let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
	if(reg.test(str)) {
		return true;
	} else {
		$Vm.$message.warning('邮箱格式不合法！');
		return false;
	}
}

//根据年月日计算年龄，birthDay 为字符串 如、'2011-02-01'
export const getAge = function(strBirthday) {
	var returnAge;
	var strBirthdayArr = strBirthday.split("-");
	var birthYear = strBirthdayArr[0];
	var birthMonth = strBirthdayArr[1];
	var birthDay = strBirthdayArr[2];

	var d = new Date();
	var nowYear = d.getFullYear();
	var nowMonth = d.getMonth() + 1;
	var nowDay = d.getDate();

	if(nowYear == birthYear) {
		returnAge = 0; //同年 则为0岁
	} else {
		var ageDiff = nowYear - birthYear; //年之差
		if(ageDiff > 0) {
			if(nowMonth == birthMonth) {
				var dayDiff = nowDay - birthDay; //日之差
				if(dayDiff < 0) {
					returnAge = ageDiff - 1;
				} else {
					returnAge = ageDiff;
				}
			} else {
				var monthDiff = nowMonth - birthMonth; //月之差
				if(monthDiff < 0) {
					returnAge = ageDiff - 1;
				} else {
					returnAge = ageDiff;
				}
			}
		} else {
			returnAge = 0; //返回-1 表示出生日期输入错误 晚于今天
		}
	}
	return returnAge; //返回周岁年龄
}

//限制开始时间，选择开始时间必须是今天之后（用于时间选择，el-date-picker
export const checkDateStart = function(obj, startTime, endTime) {
	return {
		disabledDate: time => {
			if(compareDate(obj[startTime], obj[endTime])) {
				obj[endTime] = '';
			}
			return time.getTime() < Date.now() - 24 * 60 * 60 * 1000;
		}
	}
}

//限制结束时间，选择结束时间大于开始时间（用于时间选择，el-date-picker
export const checkDateEnd = function(obj, startTime) {
	return {
		disabledDate: time => {
			if(obj[startTime]) {
				return(
					time.getTime() < new Date(obj[startTime]).getTime() - 86400000 ||
					time.getTime() < Date.now() - 24 * 60 * 60 * 1000
				);
			} else {
				return time.getTime() < Date.now() - 24 * 60 * 60 * 1000;
			}
		}
	}
}

//比较两个日期的大小，如果开始时间大于结束时间，则返回true
export const compareDate = function(dateStart, dateEnd) {
	var oDate1, oDate2;
	if(!dateStart || !dateEnd) return;
	if(dateStart.toString().indexOf('-') >= 0) {
		oDate1 = new Date(dateStart.replace(/-/g, "/"));
	} else {
		oDate1 = new Date(dateStart);
	}

	if(dateEnd.toString().indexOf('-') >= 0) {
		oDate2 = new Date(dateEnd.replace(/-/g, "/"));
	} else {
		oDate2 = new Date(dateEnd);
	}
	if(oDate1.getTime() > oDate2.getTime()) {
		return true;
	} else {
		return false;
	}
}

//返回方法
export const back = function(obj) {
	obj.$router.go(-1);
}

//页面跳转方法
export const openPage = function(obj, path, Qdata) {
	obj.$store.dispatch("ActiveOpenNext", Qdata).then(() => {
		obj.$router.push({
			path: path
		});
	});
}

//获取当前年份
export const getCurYear = function() {
	let date = new Date();
	return date.getFullYear();
}

//获取当前月份
export const getCurMonth = function() {
	let date = new Date();
	return date.getMonth() + 1;
}

//获取当前日期 如2019-07-20
export const getCurDay = function() {
	let date = new Date();
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();
	return year + '-' + toDouble(month) + '-' + toDouble(day);
}

//计算两个时间的时长  时间格式2019-07-20 14:25:20
export const calHours = function(startTime, endTime) {
	let hour =
		(new Date(endTime).getTime() -
			new Date(startTime).getTime()) /
		3600000;
	return Math.ceil(hour);
}

//获取两个日期时间段的信息，包括，是否为工作日，
export const getAllDate = function(startTime, endTime) {
	//2019法定节假日
	var jrdate = jrDate;

	function getDate(datestr) {
		var temp = datestr.split("-");
		var date = new Date(temp[0], temp[1] - 1, temp[2]);
		return date;
	}
	var startTime = getDate(startTime);
	var endTime = getDate(endTime);
	let list = [];
	while((endTime.getTime() - startTime.getTime()) >= 0) {
		var year = startTime.getFullYear();
		var month = (startTime.getMonth() + 1).toString().length == 1 ? "0" + (startTime.getMonth() + 1).toString() : (startTime.getMonth() + 1);
		var day = startTime.getDate().toString().length == 1 ? "0" + startTime.getDate() : startTime.getDate();
		var week = startTime.getDay();
		let type = 0;
		let time = year + "-" + month + "-" + day;
		if(jrdate.indexOf(time) >= 0) {
			type = 2;
		} else {
			if(week == 0 || week == 6) {
				type = 1;
			}
		}

		let item = {};
		item.date = time;
		item.type = type;
		list.push(item);

		startTime.setDate(startTime.getDate() + 1);
	}
	return list;
}

//检查视频大小
export const checkVideoInfo = (o, file, videoData) => {
	const _URL = window.URL || window.webkitURL;
	return new Promise((resolve, reject) => {
		let Sync = async() => {
			try {
				let videoKey = await checkVideo(file);
				if(videoKey) {
					let token = await o.getRequest(
						"/qiniu/userGetQiniuUpToken?key=" + videoKey
					);
					o[videoData] = token;
					resolve(true);
				} else {
					reject(false);
				}
			} catch(error) {
				reject(false);
			}
		};
		Sync();
	});
}

//城市列表，根据省份分组
export const cityGroup = (arr) => {
	var map = {},
		dest = [];
	for(var i = 0; i < arr.length; i++) {
		var ai = arr[i];
		if(!map[ai.province]) {
			let obj = {
				value: ai.code,
				label: ai.city,
			}
			dest.push({
				value: ai.province_code,
				label: ai.province,
				children: [obj]
			});
			map[ai.province] = ai;
		} else {
			for(var j = 0; j < dest.length; j++) {
				var dj = dest[j];
				if(dj.label == ai.province) {
					let o = {
						value: ai.code,
						label: ai.city,
					}
					dj.children.push(o);
					break;
				}
			}
		}
	}
	return dest;
}

//跳转到登录页面(当前页面打开)
export const toLogin = function() {
	let path = "/login";
	$Vm.$router.push({
		path: path
	});
}

//跳到到指定页面（当前页面打开）
export const toRoute = function(path, params) {
	$Vm.$router.push({
		path: path,
		query: params
	});
}

//页面跳转（打开新页面）
export const openNewPage = function(url, params) {
	let page = $Vm.$router.resolve({
		path: url,
		query: params
	});
	window.open(page.href, "_blank");
}

//跳转到店铺页面（打开新页面）（前台页面）//默认打开新页面true，如果传false，为当前页面打开
export const toShopPage = function(id, type = true) {
	let url = "/shop/index";
	if(!type) {
		$Vm.$router.push({
			path: url,
			query: {
				uid: id
			}
		});
	} else {
		let page = $Vm.$router.resolve({
			path: url,
			query: {
				uid: id
			}
		});
		window.open(page.href, "_blank");
	}

}

//获取服务器时间
export const getServerTime = () => {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(other.getServerTime).then(res => {
			resolve(res);
		}).catch(err => {});
	})
}

//------------------活动模块---------------

//获取活动列表信息
export const getActivityList = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(activity.get_activity_list, params).then(res => {
			resolve(res);
		}).catch(err => {});
	})
}

//跳转到活动列表页面,打开新页面
export const toActivityList = function(params) {
	let page = $Vm.$router.resolve({
		path: '/activity/index',
		query: params
	});
	window.open(page.href, "_blank");
}

//跳转到活动详情页面（打开新页面）（前台页面）
export const toActivityPage = function(id) {
	let page = $Vm.$router.resolve({
		path: '/activity/active_details',
		query: {
			id: id
		}
	});
	window.open(page.href, "_blank");
}

//判断用户是否已经登录,如果有登录，返回true，否则返回false
export const userIsLogin = function() {
	console.log('$Vm.$store.getters---', $Vm.$store.getters);
	if($Vm.$store.getters.user_data) {
		return true;
	}
	return false;
}

//获取用户信息
export const getUserInfo = () => {
	return $Vm.$store.getters.user_data;
};

//--------------------影棚模块---------------------

//获取影棚列表
export const getStudioList = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(frontStudio.getStudioList, params).then(res => {
			resolve(res);
		}).catch(err => {});
	})
}

//跳转到影棚详情（打开新页面)(前台页面)
export const toStudioDetail = function(id) {
	let page = $Vm.$router.resolve({
		path: '/studio/detail',
		query: {
			id: id
		}
	});
	window.open(page.href, "_blank");
}

//跳转到影棚列表页面,打开新页面
export const toStudioList = function(params) {
	let page = $Vm.$router.resolve({
		path: '/studio/index',
		query: params
	});
	window.open(page.href, "_blank");
}

//跳转到影棚列表页面，在当前页面打开
export const toStudioPage = function() {
	$Vm.$router.push({
		path: '/studio/index'
	});
}

//--------------------器材模块--------------------

//获取设备器材列表
export const getEquipList = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(frontEquip.getEquipList, params).then(res => {
			resolve(res);
		}).catch(err => {});
	})
}

//根据id获取设备详情
export const getEquipById = (id) => {
	let params = {
		equip_id: id
	};
	return new Promise((resolve, reject) => {
		$Vm.getRequest(frontEquip.getEquipById, params).then(res => {
			resolve(res);
		}).catch(err => {});
	})
}

//获取设备器材列表(new)
export const getEquip = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(equip.get, params).then(res => {
			resolve(res);
		}).catch(err => {});
	})
}

//设备批量上下架
export const equipIsUp = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.postRequest(equip.equipIsUp, params).then(res => {
			resolve(res);
		}).catch(err => {});
	})
}

//列表-打印二维码用
export const getEquipCodeList = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(equip.getEquipCodeList, params).then(res => {
			resolve(res);
		}).catch(err => {});
	})
}

//跳转到器材列表页面（打开新页面)(前台页面)
export const toEquipList = function(params) {
	let page = $Vm.$router.resolve({
		path: '/equip/index',
		query: params
	});
	window.open(page.href, "_blank");
}

//跳转到影棚列表页面，在当前页面打开
export const toEquipPage = function() {
	$Vm.$router.push({
		path: '/equip/index'
	});
}

//跳转到器材详情（打开新页面)(前台页面)
export const toEquipDetail = function(id) {
	let page = $Vm.$router.resolve({
		path: '/equip/detail',
		query: {
			id: id
		}
	});
	window.open(page.href, "_blank");
}

//--------------购物车模块--------------
//跳转到购物车页面 ,默认是打开新页面，如果传0,即当前页面打开
export const toCartPage = function(type) {
	let url = '/cart/index';
	if(type == 0) {
		$Vm.$router.push({
			path: url
		});
	} else {
		let page = $Vm.$router.resolve({
			path: url,
		});
		window.open(page.href, "_blank");
	}

}

//获取购物车信息
export const getOrderCart = () => {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(frontOrder.getOrderCart).then(res => {
			resolve(res);
		}).catch(err => {});
	})
}

//获取用户购物车数量（未支付订单）
export const getOrderCartNum = () => {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(frontOrder.getOrderCart).then(res => {
			console.log('getOrderCartNum---------', res);
			resolve(res.count)
		}).catch(err => {
			reject(false);
		});
	})
}

//-----------------订单模块(后台)--------------
//商家添加核验单模板
export const serveAddCheckTpl = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.postRequest(order.serveAddCheckTpl, params).then(res => {
			resolve(res);
		}).catch(err => {});
	})
}

//商家修改核验单模板
export const serveEditCheckTpl = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.postRequest(order.serveEditCheckTpl, params).then(res => {
			resolve(res);
		}).catch(err => {});
	})
}

//商家删除核验单模板
export const serveDelCheckTpl = (id) => {
	let params = {
		tpl_id: id
	};
	return new Promise((resolve, reject) => {
		$Vm.postRequest(order.serveDelCheckTpl, params).then(res => {
			resolve(res);
		}).catch(err => {});
	})
}

//商家查询核验单模板（单个）
export const serveGetCheckTpl = (id) => {
	let params = {
		tpl_id: id
	};
	return new Promise((resolve, reject) => {
		$Vm.getRequest(order.serveGetCheckTpl, params).then(res => {
			resolve(res);
		}).catch(err => {});
	})
}

//商家查询核验单模板（列表）
export const serveGetCheckTplList = () => {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(order.serveGetCheckTplList).then(res => {
			resolve(res);
		}).catch(err => {});
	})
}

//商家修改核验单
export const serveEditCheck = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.postRequest(order.serve_edit_check, params).then(res => {
			resolve(res);
		}).catch(err => {});
	})
}

//商家添加核验单
export const serveAddCheck = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.postRequest(order.serve_add_check, params).then(res => {
			resolve(res);
		}).catch(err => {});
	})
}

//商家查询核验单
export const serveGetCheck = (orderId) => {
	let params = {
		order_id: orderId
	}
	return new Promise((resolve, reject) => {
		$Vm.getRequest(order.serve_get_check, params).then(res => {
			resolve(res);
		}).catch(err => {});
	})
}

//获取订单详情
export const getOrderDetail = (orderId) => {
	let params = {
		id: orderId
	}
	return new Promise((resolve, reject) => {
		$Vm.getRequest(frontOrder.getOrderDetail, params).then(res => {
			resolve(res);
		}).catch(err => {});
	})
}

//新后台获取订单接口
export const newServeOrderGet = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(order.newServeOrderGet, params).then(res => {
			resolve(res);
		}).catch(err => {});
	})
}

//-----------------订单模块(前台)--------------
//用户查询核验单
export const userGetCheck = (orderId) => {
	let params = {
		order_id: orderId
	}
	return new Promise((resolve, reject) => {
		$Vm.getRequest(frontOrder.userGetCheck, params).then(res => {
			resolve(res);
		}).catch(err => {});
	})
}

//用户更改核验单状态
export const userOptCheck = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.postRequest(frontOrder.userOptCheck, params).then(res => {
			resolve(res);
		}).catch(err => {});
	})
}

//获取订单支付状态
export const getPayStatus = (orderId) => {
	let params = {
		id: orderId
	};
	return new Promise((resolve, reject) => {
		$Vm.getRequest(frontOrder.getPayStatus, params).then(res => {
			resolve(res);
		}).catch(err => {});
	})
}

//修改预约订单外送类型
export const updateOrderOut = function(orderId, doorTodoor) {
	let params = {
		order_id: orderId,
		door_to_door: doorTodoor
	}
	return new Promise((resolve, reject) => {
		$Vm.getRequest(frontOrder.updateOrderOut, params).then(res => {
			resolve(res);
		}).catch(err => {});

	})
}

//创建预约订单
export const rentOrder = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.postRequest(frontOrder.rentOrder, params).then(res => {
			resolve(res);
		}).catch(err => {});

	})
}

//修改预约订单
export const editRentOrder = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.postRequest(frontOrder.editRentOrder, params).then(res => {
			resolve(res);
		}).catch(err => {});

	})
}

//修改订单地址
export const updateOrderAddress = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.postRequest(frontOrder.editRentOrder, params).then(res => {
			resolve(res);
		}).catch(err => {});

	})
}

//删除订单
export const delUserOrder = (id) => {
	return new Promise((resolve, reject) => {
		let params = {
			id: id
		};
		$Vm.postRequest(frontOrder.delUserOrder, params).then(res => {
			resolve(res);
		}).catch(err => {});

	})
}

//商家获取订单列表
export const serverOrderGet = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(order.serve_get_orderlist, params).then(res => {
			resolve(res);
		}).catch(err => {});

	})
}

//删除不能外送的设备
export const delOrderNoOut = function(orderId) {
	let params = {
		order_id: orderId,
	}
	return new Promise((resolve, reject) => {
		$Vm.getRequest(frontOrder.delOrderNoOut, params).then(res => {
			resolve(res);
		}).catch(err => {});
	})
}

//-------------------地址模块----------------
//获取地址列表
export const getAddressList = () => {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(frontAddress.getAddressList).then(res => {
			console.log('getAddressList---------', res);
			resolve(res)
		}).catch(err => {
			reject(false);
		});
	})
}

//新增地址
export const addNewAddress = (form) => {
	return new Promise((resolve, reject) => {
		$Vm.postRequest(frontAddress.addNewAddress, form).then(res => {
			console.log('addNewAddress---------', res);
			resolve(res)
		}).catch(err => {});
	})
}

//设置默认地址
export const setDefaultAddress = (id) => {
	let params = {
		id: id
	};
	return new Promise((resolve, reject) => {
		$Vm.getRequest(frontAddress.setDefaultAddress, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//获取默认地址
export const getDefaultAddress = (id) => {
	let params;
	if(!id) {
		params = {
			is_default: 1
		};
	} else {
		params = {
			id: id
		};
	}

	return new Promise((resolve, reject) => {
		$Vm.getRequest(frontAddress.getDefaultAddress, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//--------------租赁商模块(前台)------------
//跳转到租赁商页面
export const toHirePage = () => {
	let url = '/hire/index';

	let page = $Vm.$router.resolve({
		path: url,
	});
	window.open(page.href, "_blank");

	//	({ path: '/login', query: { to: "hire" } });
}

//--------------------安全设置模块-----------
//修改手机，发送验证码
export const sendCode = (mobile) => {
	let params = {
		mobile: mobile
	};
	return new Promise((resolve, reject) => {
		$Vm.getRequest(safe.sendCode, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//修改手机，验证短信码
export const checkCode = (pwd) => {
	let params = {
		pwd: pwd
	};
	return new Promise((resolve, reject) => {
		$Vm.postRequest(safe.checkCode, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//修改手机，提交完成
export const updatePhone = (mobile, code) => {
	let params = {
		mobile: mobile,
		code: code
	}
	return new Promise((resolve, reject) => {
		$Vm.postRequest(safe.updatePhone, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//修改密码，验证手机验证码
export const checkValidCode = (code) => {
	let params = {
		code: code
	};
	return new Promise((resolve, reject) => {
		$Vm.getRequest(safe.checkValidCode, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//----------------------基本设置模块---------------
//获取用户信息
export const getUserMsg = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(serveInfo.GetUniversalInfo, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//获取用户信息（新）
export const getShopInfo = (uid) => {
	let params = {
		uid: uid
	};
	return new Promise((resolve, reject) => {
		$Vm.getRequest(setting.get, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//修改密码，修改用户密码
export const updatePsw = (pwd, new_pwd) => {
	let params = {
		pwd: pwd,
		new_pwd: new_pwd
	};
	return new Promise((resolve, reject) => {
		$Vm.postRequest(setting.updatePsw, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//获取用户是否实名认证
export const isUserTrue = () => {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(setting.isUserTrue).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//修改基本设置
export const updateSetting = (form) => {
	return new Promise((resolve, reject) => {
		$Vm.postRequest(setting.update, form).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//获取手机验证码
export const getMobilCode = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(setting.getMobilCode, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//获取极验
export const getGeetGt = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(setting.getGeetGt, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//找回密码方法
export const forGot = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.postRequest(setting.forGot, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//获取最新用户信息，验证登录
export const newUserInfo = () => {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(frontPersonal.getUserInfo).then(res => {
			console.log('frontPersonal---更新用户信息成功----', res);
			$Vm.$store.commit('update_user_data', res);
			resolve(res);
		}).catch(err => {});
	});
}

//------------------------------评论模块-------------------
//获取评论列表
export const getCommentList = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(frontComment.getCommentList, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//评论模块 （个人中心)
export const addComment = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.postRequest(frontComment.addComment, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//--------------------------商家中心（后台管理）模块--------------------------------------------

//---------------------短信模块-------------
//商家获取短信余额
export const getBalance = () => {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(sms.getBalance).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//01商家获取短信条数
export const getSmsNum = () => {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(sms.getSmsNum).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//02获取短信价格
export const getSmsPrice = () => {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(sms.getSmsPrice).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//03短信购买
export const smsPay = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.postRequest(sms.smsPay, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//----------------------财务模块------------------
//获取可提现余额方法
export const getReflectMoney = () => {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(finance.getReflectMoney).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//商家提现方法
export const outBalance = (money) => {
	let params = {
		money: money
	}
	return new Promise((resolve, reject) => {
		$Vm.postRequest(finance.outBalance, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//获取收入/支出类型
export const getFinanceType = () => {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(finance.getType).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//商家获取收入支出列表
export const getFinanceList = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(finance.getAll, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//商家删除收入/支出
export const delFinance = (id) => {
	let params = {
		id: id
	};
	return new Promise((resolve, reject) => {
		$Vm.postRequest(finance.del, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//获取财务详情
export const getFinanceDetail = (id) => {
	let params = {
		id: id
	};
	return new Promise((resolve, reject) => {
		$Vm.getRequest(finance.getDetail, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//跳转到财务详情页面
export const financeDetail = (id) => {
	$Vm.$router.push({
		path: '/serve/finance_set/detail',
		query: {
			id: id
		}
	});
}

//商家获取收入支出列表（主站后台新）
export const getAllFinance = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(finance.getAllFinance, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//---------------------------------------商家中心模块----------------------
//跳转到后台订单详情
export const toServerOrderDetail = (id) => {
	$Vm.$router.push({
		path: "/serve/order/details",
		query: {
			id: id
		}
	});
}
//跳转到后台活动订单详情
export const toServerActivityDetail = (id) => {
	$Vm.$router.push({
		path: "/serve/active_set/details",
		query: {
			id: id
		}
	});
}

//---------------------------------------常见问题模块------------------------
//获取常见问题FAQ列表数据
export const getFAQlist = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(faq.getList, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}
//添加常见问题Q&A
export const addFAQ = (content, reply) => {
	let params = {
		sort: '1',
		content: content,
		relpy: reply
	};
	return new Promise((resolve, reject) => {
		$Vm.postRequest(faq.add, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//修改常见问题Q&A
export const updateFAQ = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.postRequest(faq.update, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//获取前台Q&A列表
export const getAllQuestion = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(question.ajaxGetall, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//用户添加问题
export const userAskQA = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.postRequest(question.ajaxUserAdd, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//删除常见问题FAQ
export const delFAQ = (id) => {
	let params = {
		qid: id
	};
	return new Promise((resolve, reject) => {
		$Vm.getRequest(faq.del, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//用户删除自己发布的问题
export const userDelQuestion = (id) => {
	let params = {
		id: id
	};
	return new Promise((resolve, reject) => {
		$Vm.postRequest(question.userDel, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//商家产品问答增改删(设置关联问题)
export const operateFAQ = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.postRequest(faq.operate, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//商家用户根据影棚设备id获取关联的问题,type:1/影棚，2/设备
export const getFAQById = (type, id) => {
	let params = {
		type: type,
		obj_id: id
	}
	return new Promise((resolve, reject) => {
		$Vm.getRequest(faq.getListById, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//----------------------------优惠券模块---------------------
//商家添加优惠券
export const addCoupon = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.postRequest(coupon.add, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//商家修改优惠券
export const updateCoupon = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.postRequest(coupon.update, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//商家删除优惠券
export const delCoupon = (id) => {
	let params = {
		id: id
	};
	return new Promise((resolve, reject) => {
		$Vm.getRequest(coupon.del, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//商家获取优惠券列表
export const getCouponList = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(coupon.getList, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//不用登录获取优惠券列表
export const ajaxGetCouponList = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(coupon.ajaxGet, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//商家根据id获取优惠券
export const getCouponById = (id) => {
	let params = {
		id: id
	};
	return new Promise((resolve, reject) => {
		$Vm.getRequest(coupon.getById, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//用户使用优惠券
export const couponUse = (orderId, id) => {
	let params = {
		id: id,
		order_id: orderId
	};
	return new Promise((resolve, reject) => {
		$Vm.getRequest(coupon.couponUse, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//用户取消使用优惠券
export const couponCancel = (orderId, id) => {
	let params = {
		id: id,
		order_id: orderId
	};
	return new Promise((resolve, reject) => {
		$Vm.getRequest(coupon.couponCancel, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//用户领取优惠券
export const userAddCoupon = (id) => {
	let params = {
		id: id
	};
	return new Promise((resolve, reject) => {
		$Vm.getRequest(coupon.userAdd, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//订单使用过的优惠券
export const couponOrder = (id) => {
	let params = {
		order_id: id
	};
	return new Promise((resolve, reject) => {
		$Vm.getRequest(coupon.couponOrder, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//用户获取自己的优惠券
export const userGetCoupon = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(coupon.userGet, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//跳转到我的优惠券页面,默认是打开新页面，如果传0,即当前页面打开
export const toMyCouponPage = function(type) {
	let url = '/personal/coupon/index';
	if(type == 0) {
		$Vm.$router.push({
			path: url
		});
	} else {
		let page = $Vm.$router.resolve({
			path: url,
		});
		window.open(page.href, "_blank");
	}
}

//跳转到我的优惠券页面,默认是打开新页面，如果传0,即当前页面打开
export const toCouponPage = function(type) {
	let url = '/coupon/index';
	if(type == 0) {
		$Vm.$router.push({
			path: url
		});
	} else {
		let page = $Vm.$router.resolve({
			path: url,
		});
		window.open(page.href, "_blank");
	}
}

//-----------------------商家店铺模板模块----------------------------
//商家获取所有店铺模板
export const getAllShopTpl = () => {
	let params = {
		page: 1,
		page_size: 10000
	}
	return new Promise((resolve, reject) => {
		$Vm.getRequest(shopTemplate.getAllShopTpl, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//商家设置店铺模板
export const setShopTpl = (id) => {
	let params = {
		tpl_id: id
	}
	return new Promise((resolve, reject) => {
		$Vm.postRequest(shopTemplate.setShopTpl, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//-----------------------产品（商家）模块----------------------------
//根据id获取商家基本信息方法
export const getShopById = (id) => {
	let params = {
		uid: id
	}
	return new Promise((resolve, reject) => {
		$Vm.getRequest(frontShop.getShopById, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//获取商家对应功能()
export const getStoreLimit = (type = 1) => {
	let params = {
		type: type
	}
	return new Promise((resolve, reject) => {
		$Vm.getRequest(store.getStoreLimit, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//商家获取子账号列表
export const storeAccountList = () => {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(store.getStoreAccount).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//商家根据id获取子账号详情
export const storeAccountById = (id) => {
	let params = {
		id: id
	}
	return new Promise((resolve, reject) => {
		$Vm.getRequest(store.getOneAccount, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//商家添加子账号
export const storeAddAccount = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.postRequest(store.addAccount, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//商家删除子账号
export const storeDelAccount = (id) => {
	let params = {
		id: id
	}
	return new Promise((resolve, reject) => {
		$Vm.postRequest(store.delAccount, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//商家修改账号
export const updateAccountDetail = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.postRequest(store.updateAccount, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//商家子账号登录
export const accountLogin = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.postRequest(store.accountLogin, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//------------------用户产品模块--------------
//获取产品列表方法
export const getProductList = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(product.getProductList, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//用户下单方法
export const addProduct = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(product.addProduct, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//产品支付方法
export const productPay = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.postRequest(product.productPay, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//获取产品订单信息
export const getProductInfo = (orderId) => {
	let params = {
		order_id: orderId
	};
	return new Promise((resolve, reject) => {
		$Vm.getRequest(product.getProductInfo, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//获取商家开通的功能列表
export const getUserProduct = () => {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(product.getUserProduct).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//获取产品订单详情（状态）
export const getProductStatus = (id) => {
	let params = {
		id:id
	};
	return new Promise((resolve, reject) => {
		$Vm.getRequest(product.getProductStatus, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//用户支付方法
export const ajaxUserPay = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(product.ajaxUserPay, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//跳转到支付页面  //0：打开新页面，1/在当前页打开
export const toPayPage = (orderId, type = 0) => {
	let params = {
		order_id: orderId
	};
	let url = '/pay';
	if(type == 1) {
		$Vm.$router.push({
			path: url,
			query: params
		});
	} else {
		let page = $Vm.$router.resolve({
			path: url,
			query: params
		});
		window.open(page.href, "_blank");
	}
}

//获取购买产品列表
export const getAllProductOrder = () => {
	let params = {
		page: 1,
		page_size: 10000,
		is_pay: 1
	};
	return new Promise((resolve, reject) => {
		$Vm.getRequest(product.getAllProductOrder, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//用户反馈问题
export const addFeedback = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.postRequest(feedback.addFeedback, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//模拟支付方法（测试用，后面可以删除)
export const testOrder = (orderId) => {
	let params = {
		orderId: orderId
	};
	return new Promise((resolve, reject) => {
		$Vm.getRequest(product.testOrder, params).then(res => {
			$Vm.$message.success('购买产品成功！');
			//			resolve(res);
		}).catch(err => {});
	});
}

//获取对应产品的名称和功能
//export const productName=[
//	{
//		id:0,
//		name:'免费版本',
//		funs:['小程序','5账号','单机']
//	},{
//		id:1,
//		name:'5账号',
//		funs:['5账号']
//	},{
//		id:2,
//		name:'小程序',
//		funs:['小程序']
//	},{
//		id:11,
//		name:'单机基础版',
//		funs:['小程序','5账号','单机']
//	},{
//		id:12,
//		name:'单机旗舰版',
//		funs:['小程序','多账号(大于5个)','单机']
//	},{
//		id:21,
//		name:'平台普通版',
//		funs:['小程序','5账号']
//	},{
//		id:22,
//		name:'平台商业版',
//		funs:['小程序','多账号(大于5个)']
//	},{
//		id:23,
//		name:'自定义账号',
//		funs:['多账号(大于5个)']
//	}]

export const productName = [{
	id: 0,
	name: '免费版本',
	funs: ['订单管理', '日程管理', '数据分析', '管理账号', '客服系统', '独立后台', '客户管理', '优惠券', '短信营销', '商家独立小程序']
}, {
	id: 1,
	name: '5账号',
	funs: ['5账号']
}, {
	id: 2,
	name: '小程序',
	funs: ['小程序']
}, {
	id: 11,
	name: '单机专业版',
	funs: ['订单管理', '日程管理', '数据分析', '管理账号', '客服系统', '独立后台', '客户管理', '优惠券', '短信营销', '商家独立小程序', '扫码出入库', '数据保密', '账号(1个)']
}, {
	id: 12,
	name: '单机旗舰版',
	funs: ['订单管理', '日程管理', '数据分析', '管理账号', '客服系统', '独立后台', '客户管理', '优惠券', '短信营销', '商家独立小程序', '扫码出入库', '数据保密', '账号(5个)']
}, {
	id: 13,
	name: '单机多账号版',
	funs: ['订单管理', '日程管理', '数据分析', '管理账号', '客服系统', '独立后台', '客户管理', '优惠券', '短信营销', '商家独立小程序', '扫码出入库', '数据保密', '账号(大于5个)']
}, {
	id: 21,
	name: '平台普通版',
	funs: ['小程序', '5账号']
}, {
	id: 22,
	name: '平台商业版',
	funs: ['小程序', '多账号(大于5个)']
}, {
	id: 23,
	name: '自定义账号',
	funs: ['多账号(大于5个)']
}, {
	id: 33,
	name: '单机旗舰版(永久)',
	funs: ['订单管理', '日程管理', '数据分析', '管理账号', '客服系统', '独立后台', '客户管理', '优惠券', '短信营销', '商家独立小程序', '扫码出入库', '数据保密', '账号(5个)']
}]

//计算产品价格,obj,id,数量，timeType:0:月/1:年
export const calProductPrice = function(obj, id, num, timeType) {
	let priceType = '';
	let price = 0;
	if(timeType == 0) {
		priceType = 'price';
	} else if(timeType == 1) {
		priceType = 'price_year';
	}
	switch(parseInt(id)) {
		case 1:
		case 2:
		case 11:
		case 21:
			price = obj[priceType];
			break;
		case 12:
			price = (238 + 18 * num) * (timeType == 0 ? 1 : 12);
			break;
		case 22:
			price = (198 + 18 * num) * (timeType == 0 ? 1 : 12);
			break;
		case 23:
			price = 18 * num * (timeType == 0 ? 1 : 12);
			break;
	}
	return price;
}

//获取已购买产品信息
export const userProduct = () => {
	let productObj = null;
	return new Promise((resolve, reject) => {
		getUserProduct().then(res => {
			console.log('userProduct---------', res);
			if(res.length > 0) {
				let userProduct = res[0];
				let type = [],
					num = 1;
				res.forEach((item, index) => {
					if(item.is_temp == 2) {
						type.push(item.type);
						if(item.type == 1) {
							num = item.num;
						}
					}

				})
				if(type.length > 0) {
					type = type.sort().join(',');
					productObj = getEditionFuns(type, num, res[0].is_forever);
					productObj.startTime = userProduct.st_time;
					productObj.time = userProduct.time;
					productObj.endTime = userProduct.end_time;
					productObj.remindDay = datedif(unix2Time(productObj.time), productObj.endTime);
					productObj.is_temp = userProduct.is_temp;
					productObj.is_forever = res[0].is_forever;
					if(unix2Time(productObj.time) > productObj.endTime) {
						productObj.isOverTime = true;
					} else {
						productObj.isOverTime = false;
					}
					let timeType = '';
					if(productObj.remindDay >= 30) {
						productObj.timeType = 1;
						timeType = "year";
					} else {
						productObj.timeType = 0;
						timeType = "month";
					}
					console.log('timeType---------', timeType);
					productObj.lastTime = getAfterDate(time2Date(userProduct.time), timeType)
				}

			}
			console.log('userProduct---------', productObj);
			resolve(productObj);
		})
	});
}

//获取用户免费（试用）版本
export const userFreeProduct = () => {
	let productObj = null;
	let freeProduct = null;
	return new Promise((resolve, reject) => {
		getUserProduct().then(res => {
			console.log('userFreeProduct---------', res);
			if(res.length > 0) {
				let userProduct;
				let flag = -1,
					num = 1,
					type = '';
				flag = res.findIndex((item, index) => {
					return(item.is_temp == 0 && item.type != 5);
				})
				if(flag >= 0) {
					userProduct = res[flag];
					num = 5;
					type = '1,2,3';
					productObj = getEditionFuns(type, num);
					productObj.startTime = userProduct.st_time;
					productObj.time = userProduct.time;
					productObj.endTime = userProduct.end_time;
					productObj.remindDay = datedif(unix2Time(productObj.time), productObj.endTime);
					productObj.is_temp = '0';
					if(unix2Time(productObj.time) > productObj.endTime) {
						productObj.isOverTime = true;
					} else {
						productObj.isOverTime = false;
					}
					let timeType = '';
					if(productObj.remindDay >= 30) {
						productObj.timeType = 1;
						timeType = "year";
					} else {
						productObj.timeType = 0;
						timeType = "month";
					}
					console.log('timeType---------', timeType);
					productObj.lastTime = getAfterDate(time2Date(userProduct.time), timeType)
				}

			}
			console.log('userFreeProduct---------', productObj);
			freeProduct = productObj;
			resolve(freeProduct);
		})
	});
}

//根据产品功能和数量，获取已经购买产品的信息 
export const getEditionFuns = (fun, num, type) => {
	let productType = fun;
	let productObj = {};
	let editionType = '';
	let funs = [];
	let editionName = '';
	if(productType.includes('1,2,3')) {
		if(num > 5) {
			editionType = 13; //单机多账号版
		} else {
			editionType = 12; //单机旗舰版
		}
	} else if(productType.includes('1,2')) {
		if(num > 5) {
			editionType = 22; //平台商业版
		} else {
			editionType = 21; //平台普通版
		}
	} else if(productType.includes('1')) {
		if(num > 5) {
			editionType = 23; //多账号
		} else {
			editionType = 1; //5账号
		}
	} else if(productType.includes('2')) {
		editionType = 2; //小程序
	} else if(productType.includes('2,3')) {
		editionType = 11; //单机专业版
	}
	if(type) {
		editionType = 33; //旗舰版（永久）
	}
	funs = getEditionById(editionType, num);
	editionName = getEditionNameById(editionType);
	productObj = {
		editionName: editionName,
		funs: funs,
		id: editionType,
		num: num,
		productType: productType
	}
	return productObj;
}

//根据id转化为对应的版本功能
export const getEditionById = (id, num) => {
	let funs = [];
	let flag = 0;
	productName.forEach((item, index) => {
		if(item.id == id) {
			funs = item.funs;
		}
	})
	if(num > 5) {
		funs.forEach((item, index) => {
			if(item.includes('多账号')) {
				flag = index;
			}
		})
		funs[flag] = `多账号(${num}个)`;
	}
	console.log('getEditionById-----funs----------', funs);
	return funs;
}

//根据版本id获取对应版本名称
export const getEditionNameById = (id) => {
	let name;
	productName.forEach((item, index) => {
		if(item.id == id) {
			name = item.name;
		}
	})
	return name;
}

//根据已购项目版本显示可以升级的产品id  //return Array
//export const showProductById=(id)=>{
//	let canShowList=[];
//	switch(parseInt(id)){
//		case 1:
//			canShowList.push(11,12,21,22,23);
//			break;
//		case 2:
//			canShowList.push(11,12,21,22,23);
//			break;
//		case 11:
//			canShowList.push(12);
//			break;
//		case 12:
//			canShowList=[];
//			break;
//		case 21:
//			canShowList.push(11,12,22);
//			break;
//		case 22:
//			canShowList.push(12);
//			break;
//		case 23:
//			canShowList.push(12,22);
//			break;
//	}
//	return canShowList;
//	console.log('canshowList---------',canShowList);
//}

export const showProductById = (id) => {
	let canShowList = [];
	switch(parseInt(id)) {
		case 1:
			canShowList.push(11, 12, 13, 21, 22, 23, 33);
			break;
		case 2:
			canShowList.push(11, 12, 13, 21, 22, 23, 33);
			break;
		case 11:
			canShowList.push(12, 13, 33);
			break;
		case 12:
			canShowList.push(13, 33);
			//			canShowList=[];
			break;
		case 13:
			canShowList.push(33);
			break;
		case 21:
			canShowList.push(12, 13, 22, 33);
			break;
		case 22:
			canShowList.push(13, 33);
			break;
		case 33:
			//			canShowList.push(12,22,33);
			canShowList = [];
			break;
	}
	return canShowList;
	console.log('canshowList---------', canShowList);
}

//根据数组中id转化为对应的版本名称和功能
export const changeEditionName = (list) => {
	list.forEach((item, index) => {
		productName.forEach((item2, index2) => {
			if(item.id == item2.id) {
				item.edition = item2.name;
				item.funs = item2.funs;
			}
		})
	})
	return list;
}

//购买产品，根据产品id获取需要传的数量方法
export const getNumByProductId = (id) => {
	id = parseInt(id);
	let num = 1;
	if([1, 12, 21, 33].includes(id)) {
		num = 5;
	}
	if([13, 22, 23].includes(id)) {
		num = 6;
	}
	return num;
}


//--------------------退款模块----------------------
//用户发起退款
export const userRefundPay = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.postRequest(refund.userRefundPay, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//退款查询(用户/商家)
export const ajaxUserRefundOrderDetail = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(refund.ajaxUserRefundOrderDetail, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//退款申诉(用户)
export const userRefundAppeal = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(refund.userRefundAppeal, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//退款审核(商家)
export const serveRefundAnswer = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.postRequest(refund.serveRefundAnswer, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

export const contactShop = (o, params) => {
	o.$parent.$parent.$refs.chat.chatTo(params);
}

//--------客户-分组管理模块--------------
//商家获取分组管理
export const getCustomerGroupList = () => {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(customer_group.getAll).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//商家获取客户列表
export const getCustomerList = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(customer.getAll, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//--------获取员工模块--------------
//商家获取员工分组
export const getEmployeeGroup = () => {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(employee.getGroup).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//商家获取所有员工列表
export const getEmployeeList = (params) => {
	params = {
		page: 1,
		page_size: 10000,
	}
	return new Promise((resolve, reject) => {
		$Vm.getRequest(employee.getAll, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//商家编辑员工
export const updateEmployee = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.postRequest(employee.update, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//------------------后台影棚模块-------------------
export const studioShelfIsUp = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.postRequest(studioApi.studioShelfIsUp, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//获取影棚列表
export const getServeStudioList = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(studioApi.studioServeGet, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//-------------------------广告（前台）--------------------
//获取广告方法
export const ajaxGetAdv = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(adv.ajaxGetAdv, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//用户点击广告
export const userClickAdv = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(adv.userClickAdv, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//删除订单
export const delOrder = (id) => {
	let params = {
		id: id
	}
	return new Promise((resolve, reject) => {
		$Vm.postRequest(frontOrder.delUserOrder, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//删除订单，包括使用过得优惠券
export const delOrderAndCoupon = () => {
	let couponList;
	//获取购物车信息
	return new Promise((resolve, reject) => {
		let promiseArr = [];
		let orderId = '';
		getOrderCart().then(res => {
			console.log('getOrderCart--------', res);
			orderId = res.id;
			couponList = res.price.coupon_array;
			//循环取消所有用过的优惠券
			couponList.forEach((item, index) => {
				promiseArr.push(couponCancel(item.order_id, item.id))
			})
			Promise.all(promiseArr).then(resAll => {
				//删除订单
				delOrder(orderId).then(res3 => {
					resolve(true);
				})
			})
		})
	})
}

//-------------------------购物车--------------------
//计算价格
export const cartAjaxGetGoodsPrice = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.postRequest(cart.ajaxGetGoodsPrice, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//添加购物车
export const cartUserAdd = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.postRequest(cart.userAdd, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//购物车列表
export const cartUserGet = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.postRequest(cart.userGet, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//购物车修改
export const cartUserEdit = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.postRequest(cart.userEdit, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//购物车删除
export const cartUserDel = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.postRequest(cart.userDel, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//清空购物车
export const cartUserCancel = () => {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(cart.userCancel).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//-------------套餐模块-----------------------
//商家添加套餐
export const addPack = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.postRequest(pack.addPack, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//商家修改套餐
export const editPack = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.postRequest(pack.editPack, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//商家套餐上下架（后台）
export const packIsUp = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.postRequest(pack.packIsUp, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//获取套餐列表(包括设备)|用户(前台)
export const packAjaxGet = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(pack.packAjaxGet, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//商家获取套餐
export const serveGetPack = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(pack.serveGetPack, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//获取套餐详情
export const packAjaxDetail = (id) => {
	let params = {
		id: id,
		isAutoMsg: 1
	};
	return new Promise((resolve, reject) => {
		$Vm.getRequest(pack.packAjaxDetail, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//套餐下单（用户）
export const userAddPack = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.postRequest(pack.userAddPack, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//套餐订单支付（用户）
export const payPackOrder = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.postRequest(pack.payPackOrder, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//获取套餐订单列表（含单个）（商家后台）
export const getPackOrder = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(pack.getPackOrder, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//修改套餐订单价格（商家后台）
export const editPackPrice = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.postRequest(pack.editPackPrice, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//修改套餐订单状态（商家后台）
export const editPackOrderStatus = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.postRequest(pack.editPackOrderStatus, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//根据（影棚或者设备）获取相关套餐
export const getPackByProduct = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(pack.getPackByProduct, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//计算套餐价格(前台页面)
export const getPackPrice = function(params) {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(pack.getPackPrice, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//跳转到套餐详情（打开新页面)(前台页面)
export const toPackDetail = function(id) {
	let page = $Vm.$router.resolve({
		path: '/pack/detail',
		query: {
			id: id
		}
	});
	window.open(page.href, "_blank");
}

//-------------------模特，摄影服务，红人（前台）---------------------
//获取模特列表（单个）
export const getModelList = function(params) {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(model.getModelList, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//跳转到模特搜索历史页面
export const modelSearchHistory = function() {
	let url="/model/searchHistory";
	let page = $Vm.$router.resolve({
		path: url,
	});
	window.open(page.href, "_blank");
}

//跳转模特详情页面（打开新页面)(前台页面)
export const toModelDetail = function(id) {
	let page = $Vm.$router.resolve({
		path: '/model/detail',
		query: {
			id: id
		}
	});
	window.open(page.href, "_blank");
}

////用户添加模特订单
export const addModelOrder = function(params) {
	return new Promise((resolve, reject) => {
		$Vm.postRequest(model.addModelOrder, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//用户获取模特订单(前端)
export const getModelOrder = function(params) {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(model.getModelOrder, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//跳转到购买模特订单（服务订单）页面
export const toBuyOrder = function(type = 0, orderId) {
	let page = $Vm.$router.resolve({
		path: '/serviceOrder/buyOrder',
		query: {
			type: type, //type,0/模特订单，1/服务订单  2/团购订单
			orderId: orderId
		}
	});
	window.open(page.href, "_blank");
}

//支付模特订单
export const payModelOrder = function(params) {
	return new Promise((resolve, reject) => {
		$Vm.postRequest(model.userPayModelOrder, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//后台-模特订单接单/拒单
export const editModelOrder = function(params) {
	return new Promise((resolve, reject) => {
		$Vm.postRequest(model.editModelOrder, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//后台-修改模特订单价格
export const editModelOrderPrice = function(params) {
	return new Promise((resolve, reject) => {
		$Vm.postRequest(model.editModelOrderPrice, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//获取模特档期（日程）
export const getModelDays = function(params) {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(model.getModelDays, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//模特以图搜图方法
export const getModelByPic = function(params) {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(model.getModelByPic, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//获取搜索模特历史记录列表
export const ModelSearchHistory = function(params) {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(model.ModelSearchHistory, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}


//-------------------模特，摄影服务，红人（后台管理）---------------------
export const ModelIsUp = (params) => {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(model.ModelUp, params).then(res => {
			resolve(res)
		}).catch(err => {})
	})
}

//--------------------------服务---------------------
//获取服务分类ajaxGetServeCategory
export const getServiceCategory = function() {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(service.getServiceCategory).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//获取服务列表ajaxGet
export const getServiceList = function(params) {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(service.getServiceList, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//跳转摄影服务详情页面（打开新页面)(前台页面)
export const toServiceDetail = function(id) {
	let page = $Vm.$router.resolve({
		path: '/service/detail',
		query: {
			id: id
		}
	});
	window.open(page.href, "_blank");
}

//根据id获取服务详情内容
export const getServiceDetail = function(id) {
	let params = {
		id: id,
		isAutoMsg: 1
	};
	return new Promise((resolve, reject) => {
		$Vm.getRequest(service.getServiceDetail, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//根据id获取服务订单
export const getServiceOrder = function(params) {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(service.getServiceOrder, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//用户下单服务订单
export const addServiceOrder = function(params) {
	return new Promise((resolve, reject) => {
		$Vm.postRequest(service.addServiceOrder, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//用户支付服务订单
export const payServiceOrder = function(params) {
	return new Promise((resolve, reject) => {
		$Vm.postRequest(service.payServiceOrder, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//商家（服务者）获取订单列表
export const serviceOrderList = function(params) {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(service.serviceOrderList, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//商家（服务者）获取订单详情
export const getServiceOrderDetail = function(params) {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(service.getServiceOrderDetail, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//商家（服务者）接单
export const acceptServiceOrder = function(params) {
	return new Promise((resolve, reject) => {
		$Vm.postRequest(service.acceptServiceOrder, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//商家（服务者）拒单
export const rejectServiceOrder = function(params) {
	return new Promise((resolve, reject) => {
		$Vm.postRequest(service.rejectServiceOrder, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//商家修改服务订单价格
export const editServiceOrderPrice = function(params) {
	return new Promise((resolve, reject) => {
		$Vm.postRequest(service.editServiceOrderPrice, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//商家（服务者）跳转到服务订单详情
export const toServiceOrderDetail = function(orderId) {
	$Vm.$router.push({
		path: '/serviceOrder/serviceOrderDetail',
		query: {
			id: orderId
		}
	});
}

//商家（服务者）跳转到模特订单详情
export const toModelOrderDetail = function(orderId) {
	$Vm.$router.push({
		path: '/modelOrder/modelOrderDetail',
		query: {
			id: orderId
		}
	});
}

//跳转团购拼拍服务详情页面（打开新页面)(前台页面)
export const toTeamDetail = function(id) {
	let page = $Vm.$router.resolve({
		path: '/team/detail',
		query: {
			id: id
		}
	});
	window.open(page.href, "_blank");
}

//跳转团购拼拍服务详情页面（打开新页面)(前台页面)
export const toRedManDetail = function(id) {
	let page = $Vm.$router.resolve({
		path: '/redMan/detail',
		query: {
			id: id
		}
	});
	window.open(page.href, "_blank");
}

//跳转到助理详情页面（打开新页面）（前台页面）
export const toAssistantDetail = function(id) {
	let page = $Vm.$router.resolve({
		path: '/assistant/detail',
		query: {
			id: id
		}
	});
	window.open(page.href, "_blank");
}

//跳转（模特）服务订单（打开新页面)(前台页面)
export const toModelOrder = function(id, startTime, endTime) {
	let page = $Vm.$router.resolve({
		path: '/serviceOrder/index',
		query: {
			id: id,
			startTime: startTime,
			endTime: endTime
		}
	});
	window.open(page.href, "_blank");
}

//跳转（摄影服务）服务订单（打开新页面)(前台页面)
export const toServiceOrder = function(serviceId, productId, num) {
	let page = $Vm.$router.resolve({
		path: '/serviceOrder/index',
		query: {
			serviceId: serviceId,
			productId: productId,
			num: num
		}
	});
	window.open(page.href, "_blank");
}

//跳转（团购拼拍）订单（打开新页面)(前台页面)
export const toTeamOrder = function(teamId, num) {
	let page = $Vm.$router.resolve({
		path: '/serviceOrder/index',
		query: {
			teamId: teamId,
			num: num
		}
	});
	window.open(page.href, "_blank");
}

//跳转（助理）订单（打开新页面)(前台页面),type:1/按小时  2/按天 //默认按天
export const toAssistantOrder = function(id, startTime, endTime, type = 2) {
	let page = $Vm.$router.resolve({
		path: '/serviceOrder/index',
		query: {
			assistantId: id,
			startTime: startTime,
			endTime: endTime,
			type: type
		}
	});
	window.open(page.href, "_blank");
}

//跳转（套餐）订单（打开新页面)(前台页面),type:1/按小时  2/按天 //默认按天,door_to_door  是否送货上门，默认自取
export const toPackOrder = function(id, startTime, endTime, type = 2, door_to_door = 0) {
	let page = $Vm.$router.resolve({
		path: '/serviceOrder/index',
		query: {
			packId: id,
			startTime: startTime,
			endTime: endTime,
			type: type,
			door_to_door: door_to_door
		}
	});
	window.open(page.href, "_blank");
}

//-----------------拼拍--------------
//拼拍商品列表
export const getTeamList = function(params) {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(team.getTeamList, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//拼拍下单
export const addTeamOrder = function(params) {
	return new Promise((resolve, reject) => {
		$Vm.postRequest(team.addTeamOrder, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//-----------------拼拍(商家后台）----------------------
//商家获取拼拍订单列表
export const teamOrderList = function(params) {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(team.teamOrderList, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//拼拍分享订单
export const shareTeamOrder = function(params) {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(team.shareTeamOrder, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//拼拍订单支付
export const payTeamOrder = function(params) {
	return new Promise((resolve, reject) => {
		$Vm.postRequest(team.payTeamOrder, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//----------------跳转到（模特，拍摄（平面，视频，后期，拼拍）列表页面---------------
//跳转到模特列表
export const toModelList = function(type) {
	let page = $Vm.$router.resolve({
		path: '/model/index',
		query: {
			type: type
		}
	});
	window.open(page.href, "_blank");
}

//跳转到拍摄列表 classifyId:0/拼拍，1/平面，2/视频，3/后期
export const toServiceList = function(classifyId, type) {
	let page = $Vm.$router.resolve({
		path: '/service/index',
		query: {
			classifyId: classifyId,
			type: type
		}
	});
	window.open(page.href, "_blank");
}

//链接socket
// export const initSocket = (token) => {
// 	return new WebSocket(
// 		$Vm.$socketUrl,
// 		token
// 	);
// }

//-----------------------跳转到（个人，公司主页）-----------------
//跳转到公司主页
export const toCompanyHome = function(id, companyType) {
	let page = $Vm.$router.resolve({
		path: '/roleHome/companyHome',
		query: {
			id: id,
			companyType: companyType
		}
	});
	window.open(page.href, "_blank");
}

//跳转到个人模特主页
export const toModelHome = function(id) {
	let page = $Vm.$router.resolve({
		path: '/roleHome/modelHome',
		query: {
			id: id
		}
	});
	window.open(page.href, "_blank");
}

//跳转到摄影师主页
export const toPhotoerHome = function(id) {
	let page = $Vm.$router.resolve({
		path: '/roleHome/photographerHome',
		query: {
			id: id
		}
	});
	window.open(page.href, "_blank");
}

// 节流函数，用于处理按钮点击之类的频繁操作，减少请求数量
// method是需要节流的函数对象，timeDelay是延时的毫秒数

// export const throttle=function (method,timeDelay) {
// 	console.warn(method,timeDelay,'888888888',arguments)
// 	let timer,args=arguments,start
// 	return function loop () {
// 		let self=this
// 		let now=Date.now()
// 		if(!start){
// 			start=now
// 		}
// 		if(timer){
// 			clearTimeout(timer)
// 		}
// 		if(now-start>=timeDelay){
// 			method.apply(self,args)
// 			start=now
// 		}else{
// 			timer=setTimeout(function(){
// 				loop.apply(self,args)
// 			},50)
// 		}
// 	}
// }

export const throttle2 = (method, timeDelay) => {
	let last;
	let timer;
	let interval = timeDelay || 500;
	return function() {
		let args = arguments;
		let now = +new Date();
		if(last && now - last < interval) {
			clearTimeout(timer);
			timer = setTimeout(() => {
				last = now;
				method.apply(this, args);
			}, interval);
		} else {
			last = now;
			method.apply(this, args);
		}
	}
}

//节流  使用方式 this.func= this.util.throttle(this.func,1000)加在生命周期里 可保证第一次立即触发，延时前的点击无效
export const throttle = (func, delay = 500) => {
	var prev = Date.now();
	return function() {
		var context = this;
		var args = arguments;
		var now = Date.now();
		if(now - prev >= delay) {
			func.apply(context, args);
			prev = Date.now();
		}
	}
}
export const throttle1 = (method, timeDelay) => {
	return _.debounce(method, timeDelay)
}

//跳转到后台服务管理页面
export const toAddService = function() {
	let url = '/serve/manage/serviceIndex';
	$Vm.$router.push({
		path: url
	});
}

//跳转到后台服务管理页面
export const toAddModel = function() {
	let url = '/serve/manage/modelIndex';
	$Vm.$router.push({
		path: url
	});
}

//跳转到后台服务管理页面
export const toServe = function() {
	let url = '/serve/index';
	$Vm.$router.push({
		path: url
	});
}

//-----------------助理模块-------------------
//新增助理
export const addAssistant = function(params) {
	return new Promise((resolve, reject) => {
		$Vm.postRequest(assistant.addAssistant, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//修改助理
export const editAssistant = function(params) {
	return new Promise((resolve, reject) => {
		$Vm.postRequest(assistant.editAssistant, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//获取助理列表
export const getAssistantList = function(params) {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(assistant.getAssistantList, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//商家操作助理（上下架，删除）
export const operateAssistant = function(params) {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(assistant.operateAssistant, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//商家修改助理订单状态（接单，拒单，取消订单）
export const editAssistantStatus = function(params) {
	return new Promise((resolve, reject) => {
		$Vm.postRequest(assistant.editAssistantStatus, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//用户下单助理订单
export const userAddAssistant = function(params) {
	return new Promise((resolve, reject) => {
		$Vm.postRequest(assistant.userAddAssistant, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//用户删除助理订单
export const delAssistantOrder = function(id) {
	let params = {
		order_id: id
	};
	return new Promise((resolve, reject) => {
		$Vm.getRequest(assistant.delAssistantOrder, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//用户支付助理订单
export const payAssistantOrder = function(params) {
	return new Promise((resolve, reject) => {
		$Vm.postRequest(assistant.userPayAssistant, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//用户支付助理订单（模拟支付）（测试使用）
export const payTestAssistant = function(params) {
	return new Promise((resolve, reject) => {
		$Vm.postRequest(assistant.payTestAssistant, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//获取助理订单（含单个）
export const getAssistantOrder = function(params) {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(assistant.getAssistantOrder, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//商家用户修改助理订单价格
export const editAssistantPrice = function(params) {
	return new Promise((resolve, reject) => {
		$Vm.postRequest(assistant.editAssistantPrice, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//商家助理日程添加
export const addAssistangCal = function(params) {
	return new Promise((resolve, reject) => {
		$Vm.postRequest(assistant.addAssistangCal, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//商家助理日程获取
export const getAssistantCal = function(params) {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(assistant.getAssistantCal, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//计算助理价格
export const getAssistantPrice = function(params) {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(assistant.getAssistantPrice, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}


//------------------竞拍需求模块----------------
//跳转到发布需求页面（打开新页面)(前台页面)
export const toAddDemand = function(type=0,id) {
	let page = $Vm.$router.resolve({
		path: '/need/sendNeed',
		query: {
			snType:type,  //type,  0/新增 ，1/详情,2/修改
			snId: id
		}
	});
	window.open(page.href, "_blank");
}
//跳转到成功页面type:0,添加需求成功,1.修改需求成功，2.投标成功，3.修改投标成功， flag:（0:在原页面打开，1：打开新页面，默认在原页面打开)(前台页面)
export const demandSuccess = function(type,flag=0) {
	let url='/demand/success';
	let query={type:type};
	if(flag == 0) {
		$Vm.$router.push({
			path: url,
			query
		});
	} else {
		let page = $Vm.$router.resolve({
			path: url,
			query
		});
		window.open(page.href, "_blank");
	}
}

//跳转到托管押金页面
export const toDeposit = function(id) {
	let url='/need/deposit';
	let query={id:id};
	$Vm.$router.push({
		path: url,
		query
	});
}

//跳转到需求详情（打开新页面)(前台页面)
export const toDemandDetail = function(id) {
	let page = $Vm.$router.resolve({
		path: '/demand/detail',
		query: {
			id: id
		}
	});
	window.open(page.href, "_blank");
}

//跳转到投标（需求详情）详情（打开新页面)(前台页面)
export const toCompetitive = function(id) {
	let page = $Vm.$router.resolve({
		path: '/need/competitive',
		query: {
			id: id
		}
	});
	window.open(page.href, "_blank");
}

//获取竞拍配置（单个）
export const getBiddingConfig = function(params) {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(bidding.getConfig, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//获取竞拍任务列表
export const getBiddingList = function(params) {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(bidding.getList, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//添加竞拍任务需求方法
export const addBidding = function(params) {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(bidding.add, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//修改竞拍任务需求方法
export const updateBidding = function(params) {
	return new Promise((resolve, reject) => {
		$Vm.postRequest(bidding.update, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}


//用户（发布者）选标
export const selectBidding = function(params) {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(bidding.selectBidding, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//摄影师（服务商）完成任务
export const finishBidding = function(id) {
	let params={id:id};
	return new Promise((resolve, reject) => {
		$Vm.getRequest(bidding.finishBidding, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//下单订单金额（1.竞标卡，2.押金，3.尾款）
export const addBiddingOrder = function(params) {
	return new Promise((resolve, reject) => {
		$Vm.getRequest(bidding.addBiddingOrder, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//支付方法（1.竞标卡，2.押金，3.尾款），
export const payBiddingFee = function(params) {
	return new Promise((resolve, reject) => {
		$Vm.postRequest(bidding.payBiddingFee, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//获取用户个人竞标卡情况,type:0,获取是否有权限，1/返回竞标信息情况
export const userBiddingCard = function(id,type=0) {
	let params={uid:id};
	return new Promise((resolve, reject) => {
		$Vm.getRequest(bidding.userBiddingCard, params).then(res => {
			if(type==0){
//				let flag=(res.is_valid==1?true:false);
				let flag=false;
				if(res){
					flag=(res.is_valid==1?true:false);
				}
				resolve(flag);
			}else{
				resolve(res);
			}
		}).catch(err => {});
	});
}

//获取支付订单状态
export const getPayBiddingOrder = function(id) {
	let params={id:id};
	return new Promise((resolve, reject) => {
		$Vm.getRequest(bidding.getPayBiddingOrder, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//-------------------需求投标模块-------------------
//获取需求投标数据
export const getSubmitList=(params)=>{
	return new Promise((resolve, reject) => {
		$Vm.getRequest(submit.getList, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}


//摄影师删除投标
export const delSubmit=(id)=>{
	let params={id:id};
	return new Promise((resolve, reject) => {
		$Vm.getRequest(submit.del, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}