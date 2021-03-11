'use strict';
export const api_host = 'https://www.paitume.com/';
export const cookie_expire = 30 * 24 * 60 * 1000;
//export const qiniuHost = 'http://pic.paitume.com/';
//export const defaultStorePic="http://pic.paitume.com/images/storeLogo.png";
export const qiniuHost = 'https://pic.paitume.com/';
//export const defaultEquipPic = qiniuHost +'static/equip-static.jpg';
export const defaultStorePic = qiniuHost + "images/storeLogo.png?v=1";
export const male_pic = qiniuHost + 'images/male.png?v=' + new Date().getTime();
export const error_pic = qiniuHost + 'images/error_pic.png?v=' + new Date().getTime();
export const defaultEquipPic = qiniuHost+'images/equip_default.svg';
export const femalePic = qiniuHost + 'images/female.png';
export const squarePostfix200 = '?imageView2/1/w/200/h/200';
export const squarePostfix400 = '?imageView2/1/w/400/h/400';
export const squarePostfix800 = '?imageView2/1/w/800/h/800';


export const borrowType = {
    _BorrowTypeHasStudioCanOut: 0,
    _BorrowTypeHasStudioCanNotOut: 1,
    _BorrowTypeHasNoStudioOnlyOut: 2
};
export const getBorrowTypeText = function (borrowType) {
    const borrowTypeInt = parseInt(borrowType);
    let txt = '';
    if (borrowTypeInt == 0) {
        txt = '可外借可影棚内使用'
    } else if (borrowTypeInt == 1) {
        txt = '仅在影棚内使用'
    } else if (borrowTypeInt == 2) {
        txt = '仅外借'
    }
    return txt;
};
export const staticNationArray = [{ id: 1, name: '中国' }, { id: 2, name: '中国2' }];
export const staticSkinArray = [{ id: 1, name: 'skin1' }, { id: 2, name: 'skin2' }];
export const staticFaceArray = [{ id: 1, name: 'Face1' }, { id: 2, name: 'F2' }];
export const staticHairArray = [{ id: 1, name: 'Hair1' }, { id: 2, name: 'Hair2' }];
export const staticEyelidArray = [{ id: 1, name: '单眼皮' }, { id: 2, name: '双眼皮' }];
//export const conditionArray = [{ "id": 1, "name": "\u5316\u5986\u95f4", "icon": "iconfont icon-huazhuangpin" }, { "id": 2, "name": "\u7a7a\u8c03", "icon": "iconfont icon-kongtiao" }, { "id": 3, "name": "WIFI", "icon": "iconfont icon-wuxianwang" }, { "id": 4, "name": "\u4f11\u606f\u5ba4", "icon": "iconfont icon-xiuxi" }, { "id": 5, "name": "\u706f\u5149", "icon": "iconfont icon-dengpao" }, { "id": 6, "name": "\u97f3\u54cd", "icon": "iconfont icon-yinxiang" }, { "id": 7, "name": "\u505c\u8f66\u573a", "icon": "iconfont icon-tingchechang" }, { "id": 8, "name": "\u6295\u5f71\u8bbe\u5907", "icon": "iconfont icon-projector" }, { "id": 9, "name": "\u9910\u996e", "icon": "iconfont icon-canting" }];
export const conditionArray = [{ "id": 1, "name": "化妆间", "icon": "iconfont icon-huazhuangpin" }, { "id": 2, "name": "空调", "icon": "iconfont icon-kongtiao" }, { "id": 3, "name": "WIFI", "icon": "iconfont icon-wuxianwang" }, { "id": 4, "name": "休息室", "icon": "iconfont icon-xiuxi" }, { "id": 5, "name": "灯光", "icon": "iconfont icon-dengpao" }, { "id": 6, "name": "音响", "icon": "iconfont icon-yinxiang" }, { "id": 7, "name": "停车场", "icon": "iconfont icon-tingchechang" }, { "id": 8, "name": "投影设备", "icon": "iconfont icon-projector" }, { "id": 9, "name": "餐饮", "icon": "iconfont icon-canting" }, { "id": 10, "name": "咖啡厅", "icon": "iconfont icon-Coffee" }, { "id": 11, "name": "仓库", "icon": "iconfont icon-cangku" }, { "id": 12, "name": "洗浴间", "icon": "iconfont icon-xizaomuyu" },{ "id": 13, "name": "试衣间", "icon": "iconfont icon-shiyijian" }];
export const squareArray = [{ id: 0, name: '不限' }, { id: 1, name: '100m²以下' }, { id: 2, name: '100m²~200m²' }, { id: 3, name: '200m²~300m²' }, { id: 4, name: '300m²以上' }];
export const studioType = [{ id: 0, name: '不限' }, { id: 1, name: '录音棚' }, { id: 2, name: '实景棚' }, { id: 3, name: '无影棚' }, { id: 4, name: '特效棚' }, { id: 5, name: '白棚' }, { id: 6, name: '绿棚' }];
export const priceRange = [{ id: 0, name: '不限' }, { id: 1, name: '￥100以下' }, { id: 2, name: '￥100~￥200' }, { id: 3, name: '￥200~￥300' }, { id: 4, name: '￥300以上' }];




export const allCity = {
    "010": "北京市",
    "021": "上海市",
    "022": "天津市",
    "023": "重庆市",
    "0311": "石家庄市",
    "0312": "保定市",
    "0314": "承德市",
    "0310": "邯郸市",
    "0315": "唐山市",
    "0335": "秦皇岛市",
    "0317": "沧州市",
    "0318": "衡水市",
    "0316": "廊坊市",
    "0319": "邢台市",
    "0313": "张家口市",
    "0351": "太原市",
    "0355": "长治市",
    "0352": "大同市",
    "0356": "晋城市",
    "0354": "晋中市",
    "0357": "临汾市",
    "0358": "吕梁市",
    "0349": "朔州市",
    "0350": "忻州市",
    "0359": "运城市",
    "0353": "阳泉市",
    "0471": "呼和浩特市",
    "0472": "包头市",
    "0476": "赤峰市",
    "0477": "鄂尔多斯市",
    "0470": "呼伦贝尔市",
    "0475": "通辽市",
    "0474": "乌兰察布市",
    "0473": "乌海市",
    "0482": "兴安盟市",
    "024": "沈阳市",
    "0411": "大连市",
    "0412": "鞍山市",
    "0415": "丹东市",
    "0413": "抚顺市",
    "0416": "锦州市",
    "0417": "营口市",
    "0414": "本溪市",
    "0428": "朝阳市",
    "0418": "阜新市",
    "0429": "葫芦岛市",
    "0419": "辽阳市",
    "0427": "盘锦市",
    "0410": "铁岭市",
    "0431": "长春市",
    "0432": "吉林市",
    "0436": "白城市",
    "0439": "白山市",
    "0437": "辽源市",
    "0434": "四平市",
    "0438": "松原市",
    "0435": "通化市",
    "0451": "哈尔滨市",
    "0459": "大庆市",
    "0452": "齐齐哈尔市",
    "0454": "佳木斯市",
    "0457": "大兴安岭市",
    "0456": "黑河市",
    "0468": "鹤岗市",
    "0467": "鸡西市",
    "0453": "牡丹江市",
    "0464": "七台河市",
    "0455": "绥化市",
    "0469": "双鸭山市",
    "0458": "伊春市",
    "025": "南京市",
    "0512": "苏州市",
    "0519": "常州市",
    "0518": "连云港市",
    "0523": "泰州市",
    "0510": "无锡市",
    "0516": "徐州市",
    "0514": "扬州市",
    "0511": "镇江市",
    "0517": "淮安市",
    "0513": "南通市",
    "0527": "宿迁市",
    "0515": "盐城市",
    "0571": "杭州市",
    "0574": "宁波市",
    "0573": "嘉兴市",
    "0575": "绍兴市",
    "0577": "温州市",
    "0580": "舟山市",
    "0572": "湖州市",
    "0579": "金华市",
    "0578": "丽水市",
    "0576": "台州市",
    "0551": "合肥市",
    "0553": "芜湖市",
    "0556": "安庆市",
    "0552": "蚌埠市",
    "0558": "亳州市",
    "0565": "巢湖市",
    "0566": "池州市",
    "0550": "滁州市",
    "0558": "阜阳市",
    "0559": "黄山市",
    "0561": "淮北市",
    "0554": "淮南市",
    "0564": "六安市",
    "0555": "马鞍山市",
    "0557": "宿州市",
    "0562": "铜陵市",
    "0563": "宣城市",
    "0591": "福州市",
    "0592": "厦门市",
    "0595": "泉州市",
    "0597": "龙岩市",
    "0593": "宁德市",
    "0599": "南平市",
    "0594": "莆田市",
    "0598": "三明市",
    "0596": "漳州市",
    "0791": "南昌市",
    "0797": "赣州市",
    "0792": "九江市",
    "0798": "景德镇市",
    "0796": "吉安市",
    "0799": "萍乡市",
    "0793": "上饶市",
    "0790": "新余市",
    "0795": "宜春市",
    "0701": "鹰潭市",
    "0531": "济南市",
    "0532": "青岛市",
    "0631": "威海市",
    "0535": "烟台市",
    "0536": "潍坊市",
    "0538": "泰安市",
    "0543": "滨州市",
    "0534": "德州市",
    "0546": "东营市",
    "0530": "菏泽市",
    "0537": "济宁市",
    "0635": "聊城市",
    "0539": "临沂市",
    "0634": "莱芜市",
    "0633": "日照市",
    "0533": "淄博市",
    "0632": "枣庄市",
    "020": "广州市",
    "0755": "深圳市",
    "0756": "珠海市",
    "0769": "东莞市",
    "0757": "佛山市",
    "0752": "惠州市",
    "0750": "江门市",
    "0760": "中山市",
    "0754": "汕头市",
    "0759": "湛江市",
    "0768": "潮州市",
    "0762": "河源市",
    "0663": "揭阳市",
    "0668": "茂名市",
    "0753": "梅州市",
    "0763": "清远市",
    "0751": "韶关市",
    "0660": "汕尾市",
    "0662": "阳江市",
    "0766": "云浮市",
    "0758": "肇庆市",
    "0898": "海口市",
    "0898": "三亚市",
    "0771": "南宁市",
    "0779": "北海市",
    "0771": "崇左市",
    "0770": "防城港市",
    "0773": "桂林市",
    "0775": "贵港市",
    "0778": "河池市",
    "0774": "贺州市",
    "0772": "柳州市",
    "0772": "来宾市",
    "0777": "钦州市",
    "0775": "玉林市",
    "0774": "梧州市",
    "0371": "郑州市",
    "0379": "洛阳市",
    "0378": "开封市",
    "0374": "许昌市",
    "0372": "安阳市",
    "0375": "平顶山市",
    "0392": "鹤壁市",
    "0391": "焦作市",
    "0391": "济源市",
    "0395": "漯河市",
    "0377": "南阳市",
    "0393": "濮阳市",
    "0398": "三门峡市",
    "0370": "商丘市",
    "0373": "新乡市",
    "0376": "信阳市",
    "0396": "驻马店市",
    "0394": "周口市",
    "027": "武汉市",
    "0710": "襄樊市",
    "0719": "十堰市",
    "0714": "黄石市",
    "0711": "鄂州市",
    "0718": "恩施市",
    "0713": "黄冈市",
    "0716": "荆州市",
    "0724": "荆门市",
    "0722": "随州市",
    "0717": "宜昌市",
    "0728": "天门市",
    "0728": "潜江市",
    "0728": "仙桃市",
    "0712": "孝感市",
    "0715": "咸宁市",
    "0731": "长沙市",
    "0730": "岳阳市",
    "0732": "湘潭市",
    "0736": "常德市",
    "0735": "郴州市",
    "0743": "凤凰市",
    "0734": "衡阳市",
    "0745": "怀化市",
    "0738": "娄底市",
    "0739": "邵阳市",
    "0737": "益阳市",
    "0746": "永州市",
    "0733": "株洲市",
    "0744": "张家界市",
    "028": "成都市",
    "0816": "绵阳市",
    "0832": "资阳市",
    "0827": "巴中市",
    "0838": "德阳市",
    "0818": "达州市",
    "0826": "广安市",
    "0839": "广元市",
    "0833": "乐山市",
    "0830": "泸州市",
    "0833": "眉山市",
    "0832": "内江市",
    "0817": "南充市",
    "0812": "攀枝花市",
    "0825": "遂宁市",
    "0831": "宜宾市",
    "0835": "雅安市",
    "0813": "自贡市",
    "0851": "贵阳市",
    "0853": "安顺市",
    "0857": "毕节市",
    "0856": "铜仁市",
    "0852": "遵义市",
    "0871": "昆明市",
    "0877": "玉溪市",
    "0878": "楚雄市",
    "0872": "大理市",
    "0873": "红河市",
    "0874": "曲靖市",
    "0691": "西双版纳市",
    "0870": "昭通市",
    "0891": "拉萨市",
    "0892": "日喀则市",
    "0983": "山南市",
    "029": "西安市",
    "0915": "安康市",
    "0917": "宝鸡市",
    "0916": "汉中市",
    "0914": "商洛市",
    "0919": "铜川市",
    "0913": "渭南市",
    "0910": "咸阳市",
    "0911": "延安市",
    "0912": "榆林市",
    "0931": "兰州市",
    "0943": "白银市",
    "0932": "定西市",
    "0935": "金昌市",
    "0937": "酒泉市",
    "0939": "陇南市",
    "0930": "临夏市",
    "0933": "平凉市",
    "0930": "庆阳市",
    "0935": "武威市",
    "0938": "天水市",
    "0936": "张掖市",
    "0971": "西宁市",
    "0972": "海东市",
    "0970": "海北市",
    "0974": "海南市",
    "0951": "银川市",
    "0952": "石嘴山市",
    "0953": "吴忠市",
    "0953": "中卫市",
    "0991": "乌鲁木齐市",
    "0901": "塔城市",
    "0902": "哈密市",
    "0903": "和田市",
    "0906": "阿勒泰市",
    "0908": "阿图什市",
    "0909": "博乐市",
    "0990": "克拉玛依市",
    "0992": "奎屯市",
    "0993": "石河子市",
    "0994": "昌吉市",
    "0995": "吐鲁番市",
    "0996": "库尔勒市",
    "0997": "阿克苏市",
    "0998": "喀什市",
    "0999": "伊宁市",
    "0937": "嘉峪关市",
    "0888": "丽江市",
    "0837": "阿坝藏族羌族自治州市",
    "0834": "凉山彝族自治州市",
    "0898": "陵水黎族自治县市",
    "0887": "迪庆藏族自治州市",
    "0875": "保山市",
    "0719": "神农架林区市",
    "0570": "衢州市市",
    "0836": "甘孜藏族自治州市",
    "0876": "文山壮族苗族自治州市",
    "0692": "德宏傣族景颇族自治州市",
    "1853": "澳门特别行政区",
    "1852": "香港特别行政区",
    "1886": "台湾省"
}












export const cityArray2Tree = function (cityArray) {
    let targetArray = [];
    for (let i = 0, n = cityArray.length; i < n; i++) {
        let cityData = cityArray[i];
        let provinceHasExist = false;
        for (let j = 0, k = targetArray.length; j < k; j++) {
            let provinceData = targetArray[j];
            if (cityData.province_code === provinceData.code) {
                if (provinceData.children === undefined || provinceData.children === null) {
                    provinceData.children = [];
                }
                // //如果有_city
                // if (_city != '') {
                //     if (_city == cityData.city) {
                //         _selectCityArray = [cityData.province_code + '', cityData.code + ''];
                //     }
                // }
                provinceData.children.push({ code: cityData.code, label: cityData.city });
                provinceHasExist = true;
                break;
            }
        }
        if (!provinceHasExist) {
            // if (_city != '') {
            //     if (_city == cityData.city) {
            //         _selectCityArray = [cityData.province_code + '', cityData.code + ''];
            //     }
            // }
            targetArray.push({ code: cityData.province_code, label: cityData.province, children: [{ code: cityData.code, label: cityData.city }] })
        }
    }
    return targetArray;
}


export const RentTypeDay = 2;
export const RentTypeHour = 1;

export const OrderStatus = {
    OrderStatusWaitPay: 1,
    OrderStatusPaid: 2,
    OrderStatusConfirm: 3,
    OrderStatusRejecting: 4,
    OrderStatusRejected: 5,
    OrderStatusIng: 6,
    OrderStatusWaitComment: 7,
    OrderStatusDone: 8
}
export const getOrderStatusText = function (OrderStatusCode) {
    let OrderStatusCodeInt = parseInt(OrderStatusCode);
    switch (OrderStatusCodeInt) {
        case OrderStatus.OrderStatusWaitPay:
            return '待支付';
        case OrderStatus.OrderStatusPaid:
            return '已支付';
        case OrderStatus.OrderStatusConfirm:
            return '已确认';
        case OrderStatus.OrderStatusRejecting:
            return '已拒绝,退款中';
        case OrderStatus.OrderStatusRejected:
            return '已拒绝完毕';
        case OrderStatus.OrderStatusIng:
            return '进行中';
        case OrderStatus.OrderStatusWaitComment:
            return '已完成,等待评论';
        case OrderStatus.OrderStatusDone:
            return '已完成';
    }
}
export const scheduleOptions = [
    {
        value: "order",
        label: "订单"
    },
    {
        value: "job",
        label: "工作"
    }
];
export const orderOptions = [
    {
        value: "studio",
        label: "影棚订单"
    },
    {
        value: "equip",
        label: "设备订单"
    }
];
export const rentTypeOptions = [
    {
        value: "hour",
        label: "按小时"
    },
    {
        value: "day",
        label: "按天"
    }
];



export const jrDate = ["2019-01-01", "2019-02-04", "2019-02-05",
    "2019-02-06", "2019-02-07", "2019-02-08", "2018-02-09",
    "2019-02-10", "2019-04-05", "2019-04-06", "2019-04-07",
    "2019-05-01", "2019-05-02", "2019-05-03", "2019-05-04",
    "2019-06-07", "2019-06-08", "2019-06-09", "2019-09-13",
    "2019-09-14", "2019-09-15", "2019-10-01", "2019-10-02",
    "2019-10-03", "2019-10-04", "2019-10-09", "2019-10-06", "2019-10-07"
];

export const allCityCode = [
    { id: "1", city: "洛阳市", code: "0379", province: "河南省", province_code: "41", pinyin: "L" },
    { id: "2", city: "三门峡市", code: "0398", province: "河南省", province_code: "41", pinyin: "S" },
    { id: "3", city: "漯河市", code: "0395", province: "河南省", province_code: "41", pinyin: "L" },
    { id: "4", city: "许昌市", code: "0374", province: "河南省", province_code: "41", pinyin: "X" },
    { id: "5", city: "南阳市", code: "0377", province: "河南省", province_code: "41", pinyin: "N" },
    { id: "6", city: "信阳市", code: "0376", province: "河南省", province_code: "41", pinyin: "X" },
    { id: "7", city: "济源市", code: "1391", province: "河南省", province_code: "41", pinyin: "J" },
    { id: "8", city: "驻马店市", code: "0396", province: "河南省", province_code: "41", pinyin: "Z" },
    { id: "9", city: "濮阳市", code: "0393", province: "河南省", province_code: "41", pinyin: "P" },
    { id: "10", city: "焦作市", code: "0391", province: "河南省", province_code: "41", pinyin: "J" },
    { id: "11", city: "鹤壁市", code: "0392", province: "河南省", province_code: "41", pinyin: "H" },
    { id: "12", city: "新乡市", code: "0373", province: "河南省", province_code: "41", pinyin: "X" },
    { id: "13", city: "平顶山市", code: "0375", province: "河南省", province_code: "41", pinyin: "P" },
    { id: "14", city: "周口市", code: "0394", province: "河南省", province_code: "41", pinyin: "Z" },
    { id: "15", city: "商丘市", code: "0370", province: "河南省", province_code: "41", pinyin: "S" },
    { id: "16", city: "开封市", code: "0378", province: "河南省", province_code: "41", pinyin: "K" },
    { id: "17", city: "郑州市", code: "0371", province: "河南省", province_code: "41", pinyin: "Z" },
    { id: "18", city: "安阳市", code: "0372", province: "河南省", province_code: "41", pinyin: "A" },
    { id: "19", city: "汕头市", code: "0754", province: "广东省", province_code: "44", pinyin: "S" },
    { id: "20", city: "佛山市", code: "0757", province: "广东省", province_code: "44", pinyin: "F" },
    { id: "21", city: "肇庆市", code: "0758", province: "广东省", province_code: "44", pinyin: "Z" },
    { id: "22", city: "惠州市", code: "0752", province: "广东省", province_code: "44", pinyin: "H" },
    { id: "23", city: "深圳市", code: "0755", province: "广东省", province_code: "44", pinyin: "S" },
    { id: "24", city: "珠海市", code: "0756", province: "广东省", province_code: "44", pinyin: "Z" },
    { id: "25", city: "湛江市", code: "0759", province: "广东省", province_code: "44", pinyin: "Z" },
    { id: "26", city: "江门市", code: "0750", province: "广东省", province_code: "44", pinyin: "J" },
    { id: "27", city: "茂名市", code: "0668", province: "广东省", province_code: "44", pinyin: "M" },
    { id: "28", city: "汕尾市", code: "0660", province: "广东省", province_code: "44", pinyin: "S" },
    { id: "29", city: "云浮市", code: "0766", province: "广东省", province_code: "44", pinyin: "Y" },
    { id: "30", city: "潮州市", code: "0768", province: "广东省", province_code: "44", pinyin: "C" },
    { id: "31", city: "阳江市", code: "0662", province: "广东省", province_code: "44", pinyin: "Y" },
    { id: "32", city: "东沙群岛", code: "0767", province: "广东省", province_code: "44", pinyin: "D" },
    { id: "33", city: "河源市", code: "0762", province: "广东省", province_code: "44", pinyin: "H" },
    { id: "34", city: "梅州市", code: "0753", province: "广东省", province_code: "44", pinyin: "M" },
    { id: "35", city: "东莞市", code: "0769", province: "广东省", province_code: "44", pinyin: "D" },
    { id: "36", city: "清远市", code: "0763", province: "广东省", province_code: "44", pinyin: "Q" },
    { id: "37", city: "韶关市", code: "0751", province: "广东省", province_code: "44", pinyin: "S" },
    { id: "38", city: "揭阳市", code: "0663", province: "广东省", province_code: "44", pinyin: "J" },
    { id: "39", city: "广州市", code: "020", province: "广东省", province_code: "44", pinyin: "G" },
    { id: "40", city: "中山市", code: "0760", province: "广东省", province_code: "44", pinyin: "Z" },
    { id: "41", city: "乌海市", code: "0473", province: "内蒙古自治区", province_code: "15", pinyin: "W" },
    { id: "42", city: "包头市", code: "0472", province: "内蒙古自治区", province_code: "15", pinyin: "B" },
    { id: "43", city: "巴彦淖尔市", code: "0478", province: "内蒙古自治区", province_code: "15", pinyin: "B" },
    { id: "44", city: "呼伦贝尔市", code: "0470", province: "内蒙古自治区", province_code: "15", pinyin: "H" },
    { id: "45", city: "鄂尔多斯市", code: "0477", province: "内蒙古自治区", province_code: "15", pinyin: "E" },
    { id: "46", city: "阿拉善盟", code: "0483", province: "内蒙古自治区", province_code: "15", pinyin: "A" },
    { id: "47", city: "赤峰市", code: "0476", province: "内蒙古自治区", province_code: "15", pinyin: "C" },
    { id: "48", city: "通辽市", code: "0475", province: "内蒙古自治区", province_code: "15", pinyin: "T" },
    { id: "49", city: "兴安盟", code: "0482", province: "内蒙古自治区", province_code: "15", pinyin: "X" },
    { id: "50", city: "乌兰察布市", code: "0474", province: "内蒙古自治区", province_code: "15", pinyin: "W" },
    { id: "51", city: "锡林郭勒盟", code: "0479", province: "内蒙古自治区", province_code: "15", pinyin: "X" },
    { id: "52", city: "呼和浩特市", code: "0471", province: "内蒙古自治区", province_code: "15", pinyin: "H" },
    { id: "53", city: "大兴安岭地区", code: "0457", province: "黑龙江省", province_code: "23", pinyin: "D" },
    { id: "54", city: "七台河市", code: "0464", province: "黑龙江省", province_code: "23", pinyin: "Q" },
    { id: "55", city: "鹤岗市", code: "0468", province: "黑龙江省", province_code: "23", pinyin: "H" },
    { id: "56", city: "伊春市", code: "0458", province: "黑龙江省", province_code: "23", pinyin: "Y" },
    { id: "57", city: "绥化市", code: "0455", province: "黑龙江省", province_code: "23", pinyin: "S" },
    { id: "58", city: "黑河市", code: "0456", province: "黑龙江省", province_code: "23", pinyin: "H" },
    { id: "59", city: "哈尔滨市", code: "0451", province: "黑龙江省", province_code: "23", pinyin: "H" },
    { id: "60", city: "齐齐哈尔市", code: "0452", province: "黑龙江省", province_code: "23", pinyin: "Q" },
    { id: "61", city: "牡丹江市", code: "0453", province: "黑龙江省", province_code: "23", pinyin: "M" },
    { id: "62", city: "鸡西市", code: "0467", province: "黑龙江省", province_code: "23", pinyin: "J" },
    { id: "63", city: "双鸭山市", code: "0469", province: "黑龙江省", province_code: "23", pinyin: "S" },
    { id: "64", city: "大庆市", code: "0459", province: "黑龙江省", province_code: "23", pinyin: "D" },
    { id: "65", city: "佳木斯市", code: "0454", province: "黑龙江省", province_code: "23", pinyin: "J" },
    { id: "66", city: "北屯市", code: "1906", province: "新疆维吾尔自治区", province_code: "65", pinyin: "B" },
    { id: "67", city: "双河市", code: "1909", province: "新疆维吾尔自治区", province_code: "65", pinyin: "S" },
    { id: "68", city: "铁门关市", code: "1996", province: "新疆维吾尔自治区", province_code: "65", pinyin: "T" },
    { id: "69", city: "可克达拉市", code: "1999", province: "新疆维吾尔自治区", province_code: "65", pinyin: "K" },
    { id: "70", city: "博尔塔拉蒙古自治州", code: "0909", province: "新疆维吾尔自治区", province_code: "65", pinyin: "B" },
    { id: "71", city: "塔城地区", code: "0901", province: "新疆维吾尔自治区", province_code: "65", pinyin: "T" },
    { id: "72", city: "克拉玛依市", code: "0990", province: "新疆维吾尔自治区", province_code: "65", pinyin: "K" },
    { id: "73", city: "和田地区", code: "0903", province: "新疆维吾尔自治区", province_code: "65", pinyin: "H" },
    { id: "74", city: "昆玉市", code: "1903", province: "新疆维吾尔自治区", province_code: "65", pinyin: "K" },
    { id: "75", city: "阿勒泰地区", code: "0906", province: "新疆维吾尔自治区", province_code: "65", pinyin: "A" },
    { id: "76", city: "石河子市", code: "0993", province: "新疆维吾尔自治区", province_code: "65", pinyin: "S" },
    { id: "77", city: "昌吉回族自治州", code: "0994", province: "新疆维吾尔自治区", province_code: "65", pinyin: "C" },
    { id: "78", city: "五家渠市", code: "1994", province: "新疆维吾尔自治区", province_code: "65", pinyin: "W" },
    { id: "79", city: "巴音郭楞蒙古自治州", code: "0996", province: "新疆维吾尔自治区", province_code: "65", pinyin: "B" },
    { id: "80", city: "阿克苏地区", code: "0997", province: "新疆维吾尔自治区", province_code: "65", pinyin: "A" },
    { id: "81", city: "伊犁哈萨克自治州", code: "0999", province: "新疆维吾尔自治区", province_code: "65", pinyin: "Y" },
    { id: "82", city: "阿拉尔市", code: "1997", province: "新疆维吾尔自治区", province_code: "65", pinyin: "A" },
    { id: "83", city: "乌鲁木齐市", code: "0991", province: "新疆维吾尔自治区", province_code: "65", pinyin: "W" },
    { id: "84", city: "图木舒克市", code: "1998", province: "新疆维吾尔自治区", province_code: "65", pinyin: "T" },
    { id: "85", city: "喀什地区", code: "0998", province: "新疆维吾尔自治区", province_code: "65", pinyin: "K" },
    { id: "86", city: "克孜勒苏柯尔克孜自治州", code: "0908", province: "新疆维吾尔自治区", province_code: "65", pinyin: "K" },
    { id: "87", city: "哈密市", code: "0902", province: "新疆维吾尔自治区", province_code: "65", pinyin: "H" },
    { id: "88", city: "吐鲁番市", code: "0995", province: "新疆维吾尔自治区", province_code: "65", pinyin: "T" },
    { id: "89", city: "十堰市", code: "0719", province: "湖北省", province_code: "42", pinyin: "S" },
    { id: "90", city: "襄阳市", code: "0710", province: "湖北省", province_code: "42", pinyin: "X" },
    { id: "91", city: "荆门市", code: "0724", province: "湖北省", province_code: "42", pinyin: "J" },
    { id: "92", city: "宜昌市", code: "0717", province: "湖北省", province_code: "42", pinyin: "Y" },
    { id: "93", city: "武汉市", code: "027", province: "湖北省", province_code: "42", pinyin: "W" },
    { id: "94", city: "黄冈市", code: "0713", province: "湖北省", province_code: "42", pinyin: "H" },
    { id: "95", city: "天门市", code: "1728", province: "湖北省", province_code: "42", pinyin: "T" },
    { id: "96", city: "孝感市", code: "0712", province: "湖北省", province_code: "42", pinyin: "X" },
    { id: "97", city: "潜江市", code: "2728", province: "湖北省", province_code: "42", pinyin: "Q" },
    { id: "98", city: "恩施土家族苗族自治州", code: "0718", province: "湖北省", province_code: "42", pinyin: "E" },
    { id: "99", city: "仙桃市", code: "0728", province: "湖北省", province_code: "42", pinyin: "X" },
    { id: "100", city: "荆州市", code: "0716", province: "湖北省", province_code: "42", pinyin: "J" },
    { id: "101", city: "咸宁市", code: "0715", province: "湖北省", province_code: "42", pinyin: "X" },
    { id: "102", city: "神农架林区", code: "1719", province: "湖北省", province_code: "42", pinyin: "S" },
    { id: "103", city: "随州市", code: "0722", province: "湖北省", province_code: "42", pinyin: "S" },
    { id: "104", city: "鄂州市", code: "0711", province: "湖北省", province_code: "42", pinyin: "E" },
    { id: "105", city: "黄石市", code: "0714", province: "湖北省", province_code: "42", pinyin: "H" },
    { id: "106", city: "葫芦岛市", code: "0429", province: "辽宁省", province_code: "21", pinyin: "H" },
    { id: "107", city: "大连市", code: "0411", province: "辽宁省", province_code: "21", pinyin: "D" },
    { id: "108", city: "丹东市", code: "0415", province: "辽宁省", province_code: "21", pinyin: "D" },
    { id: "109", city: "锦州市", code: "0416", province: "辽宁省", province_code: "21", pinyin: "J" },
    { id: "110", city: "抚顺市", code: "0413", province: "辽宁省", province_code: "21", pinyin: "F" },
    { id: "111", city: "沈阳市", code: "024", province: "辽宁省", province_code: "21", pinyin: "S" },
    { id: "112", city: "铁岭市", code: "0410", province: "辽宁省", province_code: "21", pinyin: "T" },
    { id: "113", city: "营口市", code: "0417", province: "辽宁省", province_code: "21", pinyin: "Y" },
    { id: "114", city: "朝阳市", code: "0421", province: "辽宁省", province_code: "21", pinyin: "Z" },
    { id: "115", city: "辽阳市", code: "0419", province: "辽宁省", province_code: "21", pinyin: "L" },
    { id: "116", city: "鞍山市", code: "0412", province: "辽宁省", province_code: "21", pinyin: "A" },
    { id: "117", city: "阜新市", code: "0418", province: "辽宁省", province_code: "21", pinyin: "F" },
    { id: "118", city: "盘锦市", code: "0427", province: "辽宁省", province_code: "21", pinyin: "P" },
    { id: "119", city: "本溪市", code: "0414", province: "辽宁省", province_code: "21", pinyin: "B" },
    { id: "120", city: "烟台市", code: "0535", province: "山东省", province_code: "37", pinyin: "Y" },
    { id: "121", city: "威海市", code: "0631", province: "山东省", province_code: "37", pinyin: "W" },
    { id: "122", city: "青岛市", code: "0532", province: "山东省", province_code: "37", pinyin: "Q" },
    { id: "123", city: "淄博市", code: "0533", province: "山东省", province_code: "37", pinyin: "Z" },
    { id: "124", city: "聊城市", code: "0635", province: "山东省", province_code: "37", pinyin: "L" },
    { id: "125", city: "临沂市", code: "0539", province: "山东省", province_code: "37", pinyin: "L" },
    { id: "126", city: "潍坊市", code: "0536", province: "山东省", province_code: "37", pinyin: "W" },
    { id: "127", city: "枣庄市", code: "0632", province: "山东省", province_code: "37", pinyin: "Z" },
    { id: "128", city: "日照市", code: "0633", province: "山东省", province_code: "37", pinyin: "R" },
    { id: "129", city: "滨州市", code: "0543", province: "山东省", province_code: "37", pinyin: "B" },
    { id: "130", city: "东营市", code: "0546", province: "山东省", province_code: "37", pinyin: "D" },
    { id: "131", city: "泰安市", code: "0538", province: "山东省", province_code: "37", pinyin: "T" },
    { id: "132", city: "德州市", code: "0534", province: "山东省", province_code: "37", pinyin: "D" },
    { id: "133", city: "济南市", code: "0531", province: "山东省", province_code: "37", pinyin: "J" },
    { id: "134", city: "济宁市", code: "0537", province: "山东省", province_code: "37", pinyin: "J" },
    { id: "135", city: "菏泽市", code: "0530", province: "山东省", province_code: "37", pinyin: "H" },
    { id: "136", city: "连云港市", code: "0518", province: "江苏省", province_code: "32", pinyin: "L" },
    { id: "137", city: "宿迁市", code: "0527", province: "江苏省", province_code: "32", pinyin: "S" },
    { id: "138", city: "南京市", code: "025", province: "江苏省", province_code: "32", pinyin: "N" },
    { id: "139", city: "镇江市", code: "0511", province: "江苏省", province_code: "32", pinyin: "Z" },
    { id: "140", city: "南通市", code: "0513", province: "江苏省", province_code: "32", pinyin: "N" },
    { id: "141", city: "淮安市", code: "0517", province: "江苏省", province_code: "32", pinyin: "H" },
    { id: "142", city: "徐州市", code: "0516", province: "江苏省", province_code: "32", pinyin: "X" },
    { id: "143", city: "盐城市", code: "0515", province: "江苏省", province_code: "32", pinyin: "Y" },
    { id: "144", city: "扬州市", code: "0514", province: "江苏省", province_code: "32", pinyin: "Y" },
    { id: "145", city: "泰州市", code: "0523", province: "江苏省", province_code: "32", pinyin: "T" },
    { id: "146", city: "无锡市", code: "0510", province: "江苏省", province_code: "32", pinyin: "W" },
    { id: "147", city: "常州市", code: "0519", province: "江苏省", province_code: "32", pinyin: "C" },
    { id: "148", city: "苏州市", code: "0512", province: "江苏省", province_code: "32", pinyin: "S" },
    { id: "149", city: "商洛市", code: "0914", province: "陕西省", province_code: "61", pinyin: "S" },
    { id: "150", city: "西安市", code: "029", province: "陕西省", province_code: "61", pinyin: "X" },
    { id: "151", city: "汉中市", code: "0916", province: "陕西省", province_code: "61", pinyin: "H" },
    { id: "152", city: "铜川市", code: "0919", province: "陕西省", province_code: "61", pinyin: "T" },
    { id: "153", city: "榆林市", code: "0912", province: "陕西省", province_code: "61", pinyin: "Y" },
    { id: "154", city: "安康市", code: "0915", province: "陕西省", province_code: "61", pinyin: "A" },
    { id: "155", city: "延安市", code: "0911", province: "陕西省", province_code: "61", pinyin: "Y" },
    { id: "156", city: "宝鸡市", code: "0917", province: "陕西省", province_code: "61", pinyin: "B" },
    { id: "157", city: "咸阳市", code: "0910", province: "陕西省", province_code: "61", pinyin: "X" },
    { id: "158", city: "渭南市", code: "0913", province: "陕西省", province_code: "61", pinyin: "W" },
    { id: "159", city: "上海市", code: "021", province: "上海市", province_code: "31", pinyin: "S" },
    { id: "160", city: "遵义市", code: "0852", province: "贵州省", province_code: "52", pinyin: "Z" },
    { id: "161", city: "铜仁市", code: "0856", province: "贵州省", province_code: "52", pinyin: "T" },
    { id: "162", city: "六盘水市", code: "0858", province: "贵州省", province_code: "52", pinyin: "L" },
    { id: "163", city: "黔东南苗族侗族自治州", code: "0855", province: "贵州省", province_code: "52", pinyin: "Q" },
    { id: "164", city: "黔南布依族苗族自治州", code: "0854", province: "贵州省", province_code: "52", pinyin: "Q" },
    { id: "165", city: "安顺市", code: "0853", province: "贵州省", province_code: "52", pinyin: "A" },
    { id: "166", city: "黔西南布依族苗族自治州", code: "0859", province: "贵州省", province_code: "52", pinyin: "Q" },
    { id: "167", city: "毕节市", code: "0857", province: "贵州省", province_code: "52", pinyin: "B" },
    { id: "168", city: "贵阳市", code: "0851", province: "贵州省", province_code: "52", pinyin: "G" },
    { id: "169", city: "重庆市", code: "023", province: "重庆市", province_code: "50", pinyin: "C" },
    { id: "171", city: "昌都市", code: "0895", province: "西藏自治区", province_code: "54", pinyin: "C" },
    { id: "172", city: "那曲市", code: "0896", province: "西藏自治区", province_code: "54", pinyin: "N" },
    { id: "173", city: "拉萨市", code: "0891", province: "西藏自治区", province_code: "54", pinyin: "L" },
    { id: "174", city: "日喀则市", code: "0892", province: "西藏自治区", province_code: "54", pinyin: "R" },
    { id: "175", city: "山南市", code: "0893", province: "西藏自治区", province_code: "54", pinyin: "S" },
    { id: "176", city: "林芝市", code: "0894", province: "西藏自治区", province_code: "54", pinyin: "L" },
    { id: "177", city: "阿里地区", code: "0897", province: "西藏自治区", province_code: "54", pinyin: "A" },
    { id: "178", city: "淮北市", code: "0561", province: "安徽省", province_code: "34", pinyin: "H" },
    { id: "179", city: "阜阳市", code: "1558", province: "安徽省", province_code: "34", pinyin: "F" },
    { id: "180", city: "马鞍山市", code: "0555", province: "安徽省", province_code: "34", pinyin: "M" },
    { id: "181", city: "铜陵市", code: "0562", province: "安徽省", province_code: "34", pinyin: "T" },
    { id: "182", city: "池州市", code: "0566", province: "安徽省", province_code: "34", pinyin: "C" },
    { id: "183", city: "亳州市", code: "0558", province: "安徽省", province_code: "34", pinyin: "B" },
    { id: "184", city: "蚌埠市", code: "0552", province: "安徽省", province_code: "34", pinyin: "B" },
    { id: "185", city: "滁州市", code: "0550", province: "安徽省", province_code: "34", pinyin: "X" },
    { id: "186", city: "六安市", code: "0564", province: "安徽省", province_code: "34", pinyin: "L" },
    { id: "187", city: "安庆市", code: "0556", province: "安徽省", province_code: "34", pinyin: "A" },
    { id: "188", city: "黄山市", code: "0559", province: "安徽省", province_code: "34", pinyin: "H" },
    { id: "189", city: "宣城市", code: "0563", province: "安徽省", province_code: "34", pinyin: "X" },
    { id: "190", city: "淮南市", code: "0554", province: "安徽省", province_code: "34", pinyin: "H" },
    { id: "191", city: "合肥市", code: "0551", province: "安徽省", province_code: "34", pinyin: "H" },
    { id: "192", city: "宿州市", code: "0557", province: "安徽省", province_code: "34", pinyin: "S" },
    { id: "193", city: "芜湖市", code: "0553", province: "安徽省", province_code: "34", pinyin: "W" },
    { id: "194", city: "宁德市", code: "0593", province: "福建省", province_code: "35", pinyin: "N" },
    { id: "195", city: "福州市", code: "0591", province: "福建省", province_code: "35", pinyin: "F" },
    { id: "196", city: "莆田市", code: "0594", province: "福建省", province_code: "35", pinyin: "P" },
    { id: "197", city: "龙岩市", code: "0597", province: "福建省", province_code: "35", pinyin: "L" },
    { id: "198", city: "厦门市", code: "0592", province: "福建省", province_code: "35", pinyin: "X" },
    { id: "199", city: "泉州市", code: "0595", province: "福建省", province_code: "35", pinyin: "Q" },
    { id: "200", city: "漳州市", code: "0596", province: "福建省", province_code: "35", pinyin: "Z" },
    { id: "201", city: "南平市", code: "0599", province: "福建省", province_code: "35", pinyin: "N" },
    { id: "202", city: "三明市", code: "0598", province: "福建省", province_code: "35", pinyin: "S" },
    { id: "203", city: "岳阳市", code: "0730", province: "湖南省", province_code: "43", pinyin: "Y" },
    { id: "204", city: "衡阳市", code: "0734", province: "湖南省", province_code: "43", pinyin: "H" },
    { id: "205", city: "益阳市", code: "0737", province: "湖南省", province_code: "43", pinyin: "Y" },
    { id: "206", city: "长沙市", code: "0731", province: "湖南省", province_code: "43", pinyin: "C" },
    { id: "207", city: "怀化市", code: "0745", province: "湖南省", province_code: "43", pinyin: "H" },
    { id: "208", city: "娄底市", code: "0738", province: "湖南省", province_code: "43", pinyin: "L" },
    { id: "209", city: "张家界市", code: "0744", province: "湖南省", province_code: "43", pinyin: "Z" },
    { id: "210", city: "湘西土家族苗族自治州", code: "0743", province: "湖南省", province_code: "43", pinyin: "X" },
    { id: "211", city: "常德市", code: "0736", province: "湖南省", province_code: "43", pinyin: "C" },
    { id: "212", city: "邵阳市", code: "0739", province: "湖南省", province_code: "43", pinyin: "S" },
    { id: "213", city: "湘潭市", code: "0732", province: "湖南省", province_code: "43", pinyin: "X" },
    { id: "214", city: "永州市", code: "0746", province: "湖南省", province_code: "43", pinyin: "Y" },
    { id: "215", city: "郴州市", code: "0735", province: "湖南省", province_code: "43", pinyin: "C" },
    { id: "216", city: "株洲市", code: "0733", province: "湖南省", province_code: "43", pinyin: "Z" },
    { id: "217", city: "临高县", code: "1896", province: "海南省", province_code: "46", pinyin: "L" },
    { id: "218", city: "定安县", code: "0806", province: "海南省", province_code: "46", pinyin: "D" },
    { id: "219", city: "屯昌县", code: "1892", province: "海南省", province_code: "46", pinyin: "C" },
    { id: "220", city: "昌江黎族自治县", code: "0803", province: "海南省", province_code: "46", pinyin: "C" },
    { id: "221", city: "白沙黎族自治县", code: "0802", province: "海南省", province_code: "46", pinyin: "B" },
    { id: "222", city: "琼海市", code: "1894", province: "海南省", province_code: "46", pinyin: "Q" },
    { id: "223", city: "琼中黎族苗族自治县", code: "1899", province: "海南省", province_code: "46", pinyin: "Q" },
    { id: "224", city: "东方市", code: "0807", province: "海南省", province_code: "46", pinyin: "D" },
    { id: "225", city: "万宁市", code: "1898", province: "海南省", province_code: "46", pinyin: "W" },
    { id: "226", city: "五指山市", code: "1897", province: "海南省", province_code: "46", pinyin: "W" },
    { id: "227", city: "乐东黎族自治县", code: "2802", province: "海南省", province_code: "46", pinyin: "L" },
    { id: "228", city: "保亭黎族苗族自治县", code: "0801", province: "海南省", province_code: "46", pinyin: "B" },
    { id: "229", city: "陵水黎族自治县", code: "0809", province: "海南省", province_code: "46", pinyin: "L" },
    { id: "230", city: "三沙市", code: "2898", province: "海南省", province_code: "46", pinyin: "S" },
    { id: "231", city: "文昌市", code: "1893", province: "海南省", province_code: "46", pinyin: "W" },
    { id: "232", city: "儋州市", code: "0805", province: "海南省", province_code: "46", pinyin: "D" },
    { id: "233", city: "澄迈县", code: "0804", province: "海南省", province_code: "46", pinyin: "C" },
    { id: "234", city: "三亚市", code: "0899", province: "海南省", province_code: "46", pinyin: "S" },
    { id: "235", city: "海口市", code: "0898", province: "海南省", province_code: "46", pinyin: "H" },
    { id: "236", city: "海东市", code: "0972", province: "青海省", province_code: "63", pinyin: "H" },
    { id: "237", city: "海南藏族自治州", code: "0974", province: "青海省", province_code: "63", pinyin: "H" },
    { id: "238", city: "海西蒙古族藏族自治州", code: "0977", province: "青海省", province_code: "63", pinyin: "H" },
    { id: "239", city: "玉树藏族自治州", code: "0976", province: "青海省", province_code: "63", pinyin: "Y" },
    { id: "240", city: "黄南藏族自治州", code: "0973", province: "青海省", province_code: "63", pinyin: "H" },
    { id: "241", city: "果洛藏族自治州", code: "0975", province: "青海省", province_code: "63", pinyin: "G" },
    { id: "242", city: "西宁市", code: "0971", province: "青海省", province_code: "63", pinyin: "X" },
    { id: "243", city: "海北藏族自治州", code: "0970", province: "青海省", province_code: "63", pinyin: "H" },
    { id: "244", city: "百色市", code: "0776", province: "广西壮族自治区", province_code: "45", pinyin: "B" },
    { id: "245", city: "钦州市", code: "0777", province: "广西壮族自治区", province_code: "45", pinyin: "Q" },
    { id: "246", city: "北海市", code: "0779", province: "广西壮族自治区", province_code: "45", pinyin: "B" },
    { id: "247", city: "桂林市", code: "0773", province: "广西壮族自治区", province_code: "45", pinyin: "G" },
    { id: "248", city: "河池市", code: "0778", province: "广西壮族自治区", province_code: "45", pinyin: "H" },
    { id: "249", city: "柳州市", code: "0772", province: "广西壮族自治区", province_code: "45", pinyin: "L" },
    { id: "250", city: "来宾市", code: "1772", province: "广西壮族自治区", province_code: "45", pinyin: "L" },
    { id: "251", city: "南宁市", code: "0771", province: "广西壮族自治区", province_code: "45", pinyin: "N" },
    { id: "252", city: "崇左市", code: "1771", province: "广西壮族自治区", province_code: "45", pinyin: "C" },
    { id: "253", city: "防城港市", code: "0770", province: "广西壮族自治区", province_code: "45", pinyin: "F" },
    { id: "254", city: "贺州市", code: "1774", province: "广西壮族自治区", province_code: "45", pinyin: "H" },
    { id: "255", city: "玉林市", code: "0775", province: "广西壮族自治区", province_code: "45", pinyin: "Y" },
    { id: "256", city: "贵港市", code: "1755", province: "广西壮族自治区", province_code: "45", pinyin: "G" },
    { id: "257", city: "梧州市", code: "0774", province: "广西壮族自治区", province_code: "45", pinyin: "W" },
    { id: "258", city: "固原市", code: "0954", province: "宁夏回族自治区", province_code: "64", pinyin: "G" },
    { id: "259", city: "中卫市", code: "1953", province: "宁夏回族自治区", province_code: "64", pinyin: "Z" },
    { id: "260", city: "银川市", code: "0951", province: "宁夏回族自治区", province_code: "64", pinyin: "Y" },
    { id: "261", city: "石嘴山市", code: "0952", province: "宁夏回族自治区", province_code: "64", pinyin: "S" },
    { id: "262", city: "吴忠市", code: "0953", province: "宁夏回族自治区", province_code: "64", pinyin: "W" },
    { id: "263", city: "九江市", code: "0792", province: "江西省", province_code: "36", pinyin: "J" },
    { id: "264", city: "新余市", code: "0790", province: "江西省", province_code: "36", pinyin: "X" },
    { id: "265", city: "抚州市", code: "0794", province: "江西省", province_code: "36", pinyin: "F" },
    { id: "266", city: "鹰潭市", code: "0701", province: "江西省", province_code: "36", pinyin: "Y" },
    { id: "267", city: "赣州市", code: "0797", province: "江西省", province_code: "36", pinyin: "G" },
    { id: "268", city: "南昌市", code: "0791", province: "江西省", province_code: "36", pinyin: "N" },
    { id: "269", city: "宜春市", code: "0795", province: "江西省", province_code: "36", pinyin: "Y" },
    { id: "270", city: "吉安市", code: "0796", province: "江西省", province_code: "36", pinyin: "J" },
    { id: "271", city: "景德镇市", code: "0798", province: "江西省", province_code: "36", pinyin: "J" },
    { id: "272", city: "上饶市", code: "0793", province: "江西省", province_code: "36", pinyin: "S" },
    { id: "273", city: "萍乡市", code: "0799", province: "江西省", province_code: "36", pinyin: "P" },
    { id: "274", city: "舟山市", code: "0580", province: "浙江省", province_code: "33", pinyin: "Z" },
    { id: "275", city: "嘉兴市", code: "0573", province: "浙江省", province_code: "33", pinyin: "J" },
    { id: "276", city: "宁波市", code: "0574", province: "浙江省", province_code: "33", pinyin: "N" },
    { id: "277", city: "台州市", code: "0576", province: "浙江省", province_code: "33", pinyin: "T" },
    { id: "278", city: "温州市", code: "0577", province: "浙江省", province_code: "33", pinyin: "W" },
    { id: "279", city: "丽水市", code: "0578", province: "浙江省", province_code: "33", pinyin: "L" },
    { id: "280", city: "杭州市", code: "0571", province: "浙江省", province_code: "33", pinyin: "H" },
    { id: "281", city: "绍兴市", code: "0575", province: "浙江省", province_code: "33", pinyin: "S" },
    { id: "282", city: "湖州市", code: "0572", province: "浙江省", province_code: "33", pinyin: "H" },
    { id: "283", city: "金华市", code: "0579", province: "浙江省", province_code: "33", pinyin: "J" },
    { id: "284", city: "衢州市", code: "0570", province: "浙江省", province_code: "33", pinyin: "Q" },
    { id: "285", city: "唐山市", code: "0315", province: "河北省", province_code: "13", pinyin: "T" },
    { id: "286", city: "承德市", code: "0314", province: "河北省", province_code: "13", pinyin: "C" },
    { id: "287", city: "廊坊市", code: "0316", province: "河北省", province_code: "13", pinyin: "L" },
    { id: "288", city: "秦皇岛市", code: "0335", province: "河北省", province_code: "13", pinyin: "Q" },
    { id: "289", city: "保定市", code: "0312", province: "河北省", province_code: "13", pinyin: "B" },
    { id: "290", city: "石家庄市", code: "0311", province: "河北省", province_code: "13", pinyin: "S" },
    { id: "291", city: "邯郸市", code: "0310", province: "河北省", province_code: "13", pinyin: "H" },
    { id: "292", city: "邢台市", code: "0319", province: "河北省", province_code: "13", pinyin: "X" },
    { id: "293", city: "张家口市", code: "0313", province: "河北省", province_code: "13", pinyin: "Z" },
    { id: "294", city: "沧州市", code: "0317", province: "河北省", province_code: "13", pinyin: "C" },
    { id: "295", city: "衡水市", code: "0318", province: "河北省", province_code: "13", pinyin: "H" },
    { id: "296", city: "香港特别行政区", code: "1852", province: "香港特别行政区", province_code: "81", pinyin: "X" },
    { id: "314", city: "澳门特别行政区", code: "1853", province: "澳门特别行政区", province_code: "82", pinyin: "A" },
    { id: "322", city: "嘉峪关市", code: "1937", province: "甘肃省", province_code: "62", pinyin: "J" },
    { id: "323", city: "酒泉市", code: "0937", province: "甘肃省", province_code: "62", pinyin: "J" },
    { id: "324", city: "金昌市", code: "0935", province: "甘肃省", province_code: "62", pinyin: "J" },
    { id: "325", city: "兰州市", code: "0931", province: "甘肃省", province_code: "62", pinyin: "L" },
    { id: "326", city: "平凉市", code: "0933", province: "甘肃省", province_code: "62", pinyin: "P" },
    { id: "327", city: "白银市", code: "0943", province: "甘肃省", province_code: "62", pinyin: "B" },
    { id: "328", city: "天水市", code: "0938", province: "甘肃省", province_code: "62", pinyin: "T" },
    { id: "329", city: "武威市", code: "1935", province: "甘肃省", province_code: "62", pinyin: "W" },
    { id: "330", city: "陇南市", code: "2935", province: "甘肃省", province_code: "62", pinyin: "L" },
    { id: "331", city: "甘南藏族自治州", code: "0941", province: "甘肃省", province_code: "62", pinyin: "G" },
    { id: "332", city: "临夏回族自治州", code: "0930", province: "甘肃省", province_code: "62", pinyin: "L" },
    { id: "333", city: "张掖市", code: "0936", province: "甘肃省", province_code: "62", pinyin: "Z" },
    { id: "334", city: "庆阳市", code: "0934", province: "甘肃省", province_code: "62", pinyin: "Q" },
    { id: "335", city: "定西市", code: "0932", province: "甘肃省", province_code: "62", pinyin: "D" },
    { id: "336", city: "广元市", code: "0839", province: "四川省", province_code: "51", pinyin: "G" },
    { id: "337", city: "南充市", code: "0817", province: "四川省", province_code: "51", pinyin: "N" },
    { id: "338", city: "巴中市", code: "0827", province: "四川省", province_code: "51", pinyin: "B" },
    { id: "339", city: "德阳市", code: "0838", province: "四川省", province_code: "51", pinyin: "D" },
    { id: "340", city: "绵阳市", code: "0816", province: "四川省", province_code: "51", pinyin: "M" },
    { id: "341", city: "成都市", code: "028", province: "四川省", province_code: "51", pinyin: "C" },
    { id: "342", city: "广安市", code: "0826", province: "四川省", province_code: "51", pinyin: "G" },
    { id: "343", city: "乐山市", code: "0833", province: "四川省", province_code: "51", pinyin: "L" },
    { id: "344", city: "达州市", code: "0818", province: "四川省", province_code: "51", pinyin: "D" },
    { id: "345", city: "资阳市", code: "0832", province: "四川省", province_code: "51", pinyin: "Z" },
    { id: "346", city: "内江市", code: "1832", province: "四川省", province_code: "51", pinyin: "N" },
    { id: "347", city: "遂宁市", code: "0825", province: "四川省", province_code: "51", pinyin: "S" },
    { id: "348", city: "眉山市", code: "1833", province: "四川省", province_code: "51", pinyin: "M" },
    { id: "349", city: "自贡市", code: "0813", province: "四川省", province_code: "51", pinyin: "Z" },
    { id: "350", city: "泸州市", code: "0830", province: "四川省", province_code: "51", pinyin: "L" },
    { id: "351", city: "宜宾市", code: "0831", province: "四川省", province_code: "51", pinyin: "Y" },
    { id: "352", city: "凉山彝族自治州", code: "0834", province: "四川省", province_code: "51", pinyin: "L" },
    { id: "353", city: "攀枝花市", code: "0812", province: "四川省", province_code: "51", pinyin: "P" },
    { id: "354", city: "阿坝藏族羌族自治州", code: "0837", province: "四川省", province_code: "51", pinyin: "A" },
    { id: "355", city: "雅安市", code: "0835", province: "四川省", province_code: "51", pinyin: "Y" },
    { id: "356", city: "甘孜藏族自治州", code: "0836", province: "四川省", province_code: "51", pinyin: "G" },
    { id: "357", city: "吉林市", code: "0432", province: "吉林省", province_code: "22", pinyin: "J" },
    { id: "358", city: "长春市", code: "0431", province: "吉林省", province_code: "22", pinyin: "C" },
    { id: "359", city: "松原市", code: "0438", province: "吉林省", province_code: "22", pinyin: "S" },
    { id: "360", city: "辽源市", code: "0437", province: "吉林省", province_code: "22", pinyin: "L" },
    { id: "361", city: "白城市", code: "0436", province: "吉林省", province_code: "22", pinyin: "B" },
    { id: "362", city: "四平市", code: "0434", province: "吉林省", province_code: "22", pinyin: "S" },
    { id: "363", city: "延边朝鲜族自治州", code: "1433", province: "吉林省", province_code: "22", pinyin: "Y" },
    { id: "364", city: "白山市", code: "0439", province: "吉林省", province_code: "22", pinyin: "B" },
    { id: "365", city: "通化市", code: "0435", province: "吉林省", province_code: "22", pinyin: "T" },
    { id: "366", city: "天津市", code: "022", province: "天津市", province_code: "12", pinyin: "T" },
    { id: "367", city: "昭通市", code: "0870", province: "云南省", province_code: "53", pinyin: "Z" },
    { id: "368", city: "曲靖市", code: "0874", province: "云南省", province_code: "53", pinyin: "Q" },
    { id: "369", city: "红河哈尼族彝族自治州", code: "0873", province: "云南省", province_code: "53", pinyin: "H" },
    { id: "370", city: "怒江傈僳族自治州", code: "0886", province: "云南省", province_code: "53", pinyin: "N" },
    { id: "371", city: "西双版纳傣族自治州", code: "0691", province: "云南省", province_code: "53", pinyin: "X" },
    { id: "372", city: "玉溪市", code: "0877", province: "云南省", province_code: "53", pinyin: "Y" },
    { id: "373", city: "大理白族自治州", code: "0872", province: "云南省", province_code: "53", pinyin: "D" },
    { id: "374", city: "丽江市", code: "0888", province: "云南省", province_code: "53", pinyin: "L" },
    { id: "375", city: "迪庆藏族自治州", code: "0887", province: "云南省", province_code: "53", pinyin: "D" },
    { id: "376", city: "文山壮族苗族自治州", code: "0876", province: "云南省", province_code: "53", pinyin: "W" },
    { id: "377", city: "保山市", code: "0875", province: "云南省", province_code: "53", pinyin: "B" },
    { id: "378", city: "普洱市", code: "0879", province: "云南省", province_code: "53", pinyin: "P" },
    { id: "379", city: "昆明市", code: "0871", province: "云南省", province_code: "53", pinyin: "K" },
    { id: "380", city: "楚雄彝族自治州", code: "0878", province: "云南省", province_code: "53", pinyin: "C" },
    { id: "381", city: "临沧市", code: "0883", province: "云南省", province_code: "53", pinyin: "L" },
    { id: "382", city: "德宏傣族景颇族自治州", code: "0692", province: "云南省", province_code: "53", pinyin: "D" },
    { id: "383", city: "北京市", code: "010", province: "北京市", province_code: "11", pinyin: "B" },
    { id: "384", city: "阳泉市", code: "0353", province: "山西省", province_code: "14", pinyin: "Y" },
    { id: "385", city: "太原市", code: "0351", province: "山西省", province_code: "14", pinyin: "T" },
    { id: "386", city: "临汾市", code: "0357", province: "山西省", province_code: "14", pinyin: "L" },
    { id: "387", city: "运城市", code: "0359", province: "山西省", province_code: "14", pinyin: "Y" },
    { id: "388", city: "长治市", code: "0355", province: "山西省", province_code: "14", pinyin: "C" },
    { id: "389", city: "朔州市", code: "0349", province: "山西省", province_code: "14", pinyin: "S" },
    { id: "390", city: "晋城市", code: "0356", province: "山西省", province_code: "14", pinyin: "J" },
    { id: "391", city: "忻州市", code: "0350", province: "山西省", province_code: "14", pinyin: "X" },
    { id: "392", city: "晋中市", code: "0354", province: "山西省", province_code: "14", pinyin: "J" },
    { id: "393", city: "吕梁市", code: "0358", province: "山西省", province_code: "14", pinyin: "L" },
    { id: "394", city: "大同市", code: "0352", province: "山西省", province_code: "14", pinyin: "D" },
    { id: "395", city: "台湾", code: "1886", province: "台湾", province_code: "114", pinyin: "T" }];


//-----------------模特--------------------
//模特类型
export const modelTypeList = [
    { id: "1", name: '时装模特' },
    { id: "2", name: '商用模特' },
    { id: "3", name: '内衣模特' },
    { id: "4", name: '试衣模特' },
    { id: "5", name: '部件模特' },
    { id: "6", name: '特型模特' },
    { id: "7", name: 'T台模特' },
    { id: "8", name: '人体模特' },
    { id: "9", name: '彩绘模特' },
    { id: "10", name: '车模' },
    { id: "11", name: '房模' },
    { id: "12", name: '表演模特' },
    { id: "13", name: '站位模特' },
    { id: "14", name: '肢体模特' },
    { id: "15", name: '童模' },
    { id: "16", name: '外模' },
    { id: "17", name: '中老年模特' },
    { id: "18", name: '平面模特' },
    { id: "19", name: '影视模特' }
];

//拍摄风格
export const shootingTypeList = [
    { id: "1", name: '运动' },
    { id: "2", name: 'OL' },
    { id: "3", name: '日韩' },
    { id: "4", name: '街头' },
    { id: "5", name: '甜美' },
    { id: "6", name: '英伦' },
    { id: "7", name: '中国风' },
    { id: "8", name: '孕妇装' },
    { id: "9", name: '复古' }
];

//拍摄行业
export const shootIndustryList = [
    { id: 0, name: '家装家饰' },
    { id: 1, name: '3C数码' },
    { id: 2, name: '内衣泳装' },
    { id: 3, name: '鞋帽箱包' },
    { id: 4, name: '其他' },
    { id: 5, name: '服饰配件' },
    { id: 6, name: '美容美发' },
    { id: 7, name: '食品保健' },
    { id: 8, name: '母婴玩具' },
    { id: 9, name: '珠宝首饰' },
];

//拍摄方式
export const shootMethodList = [
    { id: 1, name: '实景棚拍' },
    { id: 2, name: '纯色背景棚拍' },
    { id: 3, name: '外景拍摄' },
    { id: 4, name: '平铺/挂拍' },
    { id: 5, name: '其他' },
    { id: 6, name: '景物拍摄' }
];


//摄影师技能
export const photoerSkillList = [
    { id: 1, name: '拍照' },
    { id: 2, name: '视频' },
    { id: 3, name: '后期' },
];

//export const modelType = [
// '时装模特','商用模特','内衣模特','试衣模特','部件模特','特型模特','T台模特','人体模特','彩绘模特','车模','房模',
//	'表演模特','站位模特','肢体模特','童模','外模','中老年模特','平面模特','影视模特'
//];

//export const shootingType=[
//	'运动','OL','日韩','街头','甜美','英伦','中国风','孕妇装','复古'
//];


//语言类型
export const languageType = [
    { value: "1", label: "普通话" },
    { value: "2", label: "粤语" },
    { value: "3", label: "英语" },
    { value: "4", label: "西班牙语" },
    { value: "9", label: "其他" }
];

//国籍
export const nationType = [
    { id: "1", name: '中国' },
    { id: "2", name: '乌克兰' },
    { id: "5", name: '美国' },
    { id: "6", name: '俄罗斯' },
]

//皮肤肤色类型
export const skinType = [
    { id: "1", name: '白色' },
    { id: "2", name: '黄色' },
    { id: "3", name: '黑色' },
]

//脸型类型
export const faceType = [
    { id: "1", name: '圆脸' },
    { id: "2", name: '长脸' },
    { id: "3", name: '瓜子脸' },
]

//发型类型
export const hairType = [
    { id: "1", name: '直长发' },
    { id: "2", name: '短发' }
]

//眼睛类型
export const eyeType = [
    { id: "1", name: '单眼皮' },
    { id: "2", name: '双眼皮' },
]


//--------------短视频-------------
//短视频服务行业
export const sVideoServiceList = [
    { id: 1, name: '内衣泳装' },
    { id: 2, name: '汽车' },
    { id: 3, name: '美妆洗护' },
    { id: 4, name: '其他' },
    { id: 5, name: '旅游' },
    { id: 6, name: '女装' },
    { id: 7, name: '男装' },
    { id: 8, name: '图书' },
    { id: 9, name: '童装' },
    { id: 10, name: '日用百货' },
    { id: 11, name: '鞋子箱包' },
    { id: 12, name: '家装家纺' },
    { id: 13, name: '运动户外' },
    { id: 14, name: '食品保健' },
    { id: 15, name: '数码家电' },
    { id: 16, name: '母婴玩具' },
    { id: 17, name: '珠宝首饰' },
];


//---------------------红人服务模块------------
//红人类别
export const redMTypeList = [
    { id: 1, name: '微博博主' },
    { id: 2, name: '明星名人' },
    { id: 3, name: '直播网红' },
    { id: 4, name: '网络红人' },
];

//平台类型
export const platformList = [
    { id: 1, name: 'b站' },
    { id: 2, name: '微博' },
    { id: 3, name: '快手' },
    { id: 4, name: '抖音' },
    { id: 5, name: '微信公众号' },
    { id: 6, name: '知乎' },
    { id: 7, name: '其他' },
]

//粉丝数量
export const fansCountList = [
    { id: 1, name: '1万以下' },
    { id: 2, name: '1-5万' },
    { id: 3, name: '5-10万' },
    { id: 4, name: '10-20万' },
    { id: 5, name: '20-50万' },
    { id: 6, name: '50-100万' },
    { id: 7, name: '100万以上' },
];


//价格
export const fansPriceList = [
    { id: 1, name: '2000以下' },
    { id: 2, name: '2000-5000' },
    { id: 3, name: '5000-1万' },
    { id: 4, name: '1万-5万' },
    { id: 5, name: '5万-10万' },
    { id: 6, name: '10万-20万' },
    { id: 7, name: '20万以上' },
];

//后台订单状态
export const orderStatus = [
    { id: 0, name: '已取消' },
    { id: 1, name: '未支付' },
    { id: 2, name: '已支付' },
    { id: 3, name: '商家接单' },
    { id: 4, name: '退款中' },
    { id: 5, name: '退款完毕' },
    { id: 6, name: '订单进行中' },
    { id: 7, name: '待评论' },
    { id: 8, name: '已评论' }
]

//后台退款订单状态
export const refundOrderStatus = [
    { id: 1, name: '审核中' },
    { id: 11, name: '拒绝退款' },
    { id: 12, name: '运营审核' },
    { id: 14, name: '运营处理完毕' },
    { id: 21, name: '打款中' },
    { id: 22, name: '退款成功' },
]

//拼拍拍摄类型
export const pinpaiType=[
    {id:1,name:'服装服饰'},
	{id:2,name:'内衣泳装'},
	{id:3,name:'鞋帽箱包'},
	{id:4,name:'食品保健'},
	{id:5,name:'珠宝服饰'},
	{id:6,name:'家居家装'},
	{id:7,name:'美妆洗护'},
	{id:8,name:'3C数码'},
]
//拼拍拍摄风格
export const pinpaiWay=[
    {id:1,name:'运动'},
	{id:2,name:'OL'},
	{id:3,name:'日韩'},
	{id:4,name:'街头'},
	{id:5,name:'英伦'},
	{id:6,name:'中国风'},
	{id:7,name:'孕妇装'},
	{id:8,name:'复古'},
	{id:9,name:'其他'},
]
//拼拍拍摄分类
export const pinpaiClassify=[
    {id:1,name:'室内纯色背景'},
	{id:2,name:'室内实景'},
	{id:3,name:'外拍实景'},
	{id:4,name:'其他'},
]
//拼拍拍摄对象
export const pinpaiObj=[
    {id:1,name:'无需模特'},
	{id:2,name:'自带模特'},
	{id:3,name:'提供模特'},
]
//拼拍服务标签
export const pinpaiLabel=[
    {id:1,name:'延迟退款'},
	{id:2,name:'不满意重拍'},
]

export const MiniAppOptCode = {
    WxOptSetDomain: 1,
    WxOptSetWorkDomain: 2,
    WxOptSetName : 4,
    WxOptSetInfo: 8,
    WxOptSetIcon : 16,
    WxOptSetCategory : 32,
    WxOptUploadTpl : 64,
    WxOptCommit : 128,
    WxOptRelease : 256,
    WxOptPay : 512,
};
export const WxAppAuditStatus = {
    WxAppAuditStatusSucc : 0,
    WxAppAuditStatusFail : 1,
    WxAppAuditStatusIng : 2,
    WxAppAuditStatusCancel : 3,
    WxAppAuditStatusInit : 4
}


//竞拍模块数据
//竞拍类型列表
export const projectList=[
    {id:1,name:'平面拍摄'},
	{id:2,name:'后期制作'},
	{id:3,name:'电商视频制作'},
	{id:4,name:'VR/3D'},
	{id:5,name:'漫画设计'},
	{id:6,name:'Logo设计'},
]

//竞拍技能分类数据
export const biddingSkillType=[
	{id:1,name:'人像摄影'},
	{id:2,name:'平面摄影'},
	{id:3,name:'3D摄影'},
	{id:4,name:'广告设计'},
]

//项目预算范围列表
export const budgetList=[
    {id:1,name:'500以下'},
	{id:2,name:'500-1000'},
	{id:3,name:'1000-5000'},
	{id:4,name:'5000以上'},
	{id:5,name:'价格面议'},
]

//项目状态列表
export const projectStatusList=[
    {id:1,name:'竞标中'},
	{id:2,name:'进行中'},
	{id:3,name:'交付审核 '},
	{id:4,name:'完成'},
	{id:5,name:'流标'}
]