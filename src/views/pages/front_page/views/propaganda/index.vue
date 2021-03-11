<template>
<div class="all-wrap">
    <div class="mountain">
        <p class="mountain-title animated fadeInLeftBig">影棚租赁行业创导者</p>

        <router-link to="/hire/index">
            <p class="mountain-btn animated fadeInLeftBig">立即免费入驻</p>
        </router-link>

    </div>
    <div class="video">
        <div class="img-wrap  animated fadeInRightBig">
            <img class="video-center-img" :src="$qiniuHost+'images/video.png'" alt="">
            <img class="first  animated tada animation-long" :src="$qiniuHost+'images/video-search.png'" alt="">
            <img class="second animated tada animation-long" :src="$qiniuHost+'images/video-clock.png'" alt="">
            <img class="third animated tada animation-long" :src="$qiniuHost+'images/video-list.png'" alt="">
            <img class="fouth animated tada animation-long" :src="$qiniuHost+'images/video-cart.png'" alt="">
            <img class="fifth animated tada animation-long" :src="$qiniuHost+'images/video-person.png'" alt="">
            <img class="play" :src="$qiniuHost+'images/video-play.png'" alt="">
        </div>
    </div>
    <div class="function function-hide" id="function">
        <p class="function-title">强大的特色和功能</p>
        <div class="function-content">
            <div class="function-img">
                <img class="function-img1" :src="$qiniuHost+'images/Rectangle.png'" alt="">
                <img class="function-img2" :src="$qiniuHost+'images/schedule.png'" alt="">
                <img class="function-img3" :class="{'animated':functionMoveThree,'pulse':functionMoveThree,'animation-three':functionMoveThree}" :src="$qiniuHost+'images/addItem.png'" alt="">
                <img class="function-img4" :class="{'animated':functionMoveThree,'pulse':functionMoveThree,'animation-three':functionMoveThree}" :src="$qiniuHost+'images/addItemBtn.png'" alt="">
            </div>
            <div class="decription">
                <p class="dec-title">日程管理</p>
                <div class="dec-intro">
                    派图租赁根据影像行业租赁工作流程量身打造的一个特色功能。您可以将您的工作及线上、线下订单放到您的日程中，随时查看每天的工作及订单，同时为工作和订单指派相应的员工进行执行。
                </div>
            </div>
        </div>
    </div>
    <div class="stock stock-hide" id="stock">
        <div class="stock-dec">
            <p class="stock-dec-title">动态库存</p>
            <p class="stock-dec-intro">
                无论客户的订单是按天或者按小时进行租赁，派图租赁的动态库存系统都会根据您的设定，自动的为您接单，使您对于客户的档期，进行从容不迫的安排。
            </p>
        </div>
        <div class="stock-img">
            <img class="stock-img1" :class="{'animated':stockMoveThree,'pulse':stockMoveThree,'animation-three':stockMoveThree}" :src="$qiniuHost+'images/equipImport.png'" alt="">
            <img class="stock-img2" :class="{'animated':stockMoveThree,'tada':stockMoveThree,'animation-three':stockMoveThree}" :src="$qiniuHost+'images/camera1.png'" alt="">
            <img class="stock-img3" :class="{'animated':stockMoveThree,'tada':stockMoveThree,'animation-three':stockMoveThree}" :src="$qiniuHost+'images/camera2.png'" alt="">
            <img class="stock-img4" :src="$qiniuHost+'images/import.png'" alt="">
        </div>
    </div>
    <div class="client client-hide" id="client">
        <div class="client-img">
            <img class="client-img1" :src="$qiniuHost+'images/gray-block.png'" alt="">
            <img class="client-img2" :class="{'animated':clientMoveThree,'pulse':clientMoveThree,'animation-three':clientMoveThree}" :src="$qiniuHost+'images/newClient.png'" alt="">
            <img class="client-img3" :class="{'animated':clientMoveThree,'pulse':clientMoveThree,'animation-three':clientMoveThree}" :src="$qiniuHost+'images/newBtn.png'" alt="">
            <img class="client-img4" :class="{'animated':clientMoveThree,'pulse':clientMoveThree,'animation-three':clientMoveThree}" :src="$qiniuHost+'images/woman.png'" alt="">
        </div>
        <div class="client-dec">
            <div class="purple-line"></div>
            <div class="client-dec-title">客户管理</div>
            <div class="client-dec-intro">在您店铺消费过的客户，系统会自动将客户放到您的客户管理系统中，并根据您的设置，对客户进行分组，维护客户关系。</div>
        </div>
    </div>
    <div class="task task-hide" id="task">
        <div class="task-img">
            <img class="task-img1" :class="{'animated':taskMoveThree,'pulse':taskMoveThree,'animation-three':taskMoveThree}" :src="$qiniuHost+'images/man.png'" alt="">
            <img class="task-img2" :class="{'animated':taskMoveThree,'pulse':taskMoveThree,'animation-three':taskMoveThree}" :src="$qiniuHost+'images/newTaskBtn.png'" alt="">
            <img class="task-img3" :src="$qiniuHost+'images/pointTask.png'" alt="">
            <img class="task-img4" :src="$qiniuHost+'images/staffList.png'" alt="">
            <img class="task-img5" :src="$qiniuHost+'images/staffManage.png'" alt="">
        </div>
        <div class="task-dec">
            <div class="purple-line"></div>
            <div class="task-dec-title">指派任务</div>
            <div class="task-dec-intro">根据客户的订单和工作内容，您可以指派您的员工进行执行，同时也可以根据客户的反馈和工作量，对员工进行相关工作的考核。</div>
        </div>
    </div>
    <div class="advantage advantage-hide" id="advantage">
        <!-- <img class="advantage-center" src="./Group 38 Copy.png"></img> -->
        <div class="advantage-row1">
            <div class="advantage-item">
                <div class="advantage-img-title">
                    <div class="advantage-img-wrap">
                        <img class="advantage-item-img" :src="$qiniuHost+'images/liked.png'" alt="">
                        <img class="advantage-item-bg bg1" :src="$qiniuHost+'images/circle.png'" alt="">
                    </div>
                    <p class="advantage-title">独立推广</p>
                </div>
                <p class="advantage-intro">多平台的渠道和独立的店铺，为您带来海量客户。</p>
            </div>
        </div>
        <div class="advantage-row2">
            <div class="advantage-item">
                <div class="advantage-img-title">
                    <div class="advantage-img-wrap">
                        <img class="advantage-item-img" :src="$qiniuHost+'images/money.png'" alt="">
                        <img class="advantage-item-bg bg2" :src="$qiniuHost+'images/circle.png'" alt="">
                    </div>
                    <p class="advantage-title">促销管理</p>
                </div>
                <p class="advantage-intro">多种促销工具和玩法，可以为您的销售和维护新老客户关系保驾护航。</p>
            </div>
            <div class="advantage-item">
                <img class="center-circle" :src="$qiniuHost+'images/center-circle.png'" alt="">
            </div>
            <div class="advantage-item">
                <div class="advantage-img-title">
                    <div class="advantage-img-wrap">
                        <img class="advantage-item-img" :src="$qiniuHost+'images/person.png'" alt="">
                        <img class="advantage-item-bg bg3" :src="$qiniuHost+'images/circle.png'" alt="">
                    </div>
                    <p class="advantage-title">多账户</p>
                </div>
                <p class="advantage-intro">一个后台，可以指定多个管理账户，账户相互协作，又可以相互独立。</p>
            </div>
        </div>
        <div class="advantage-row3">
            <div class="advantage-item">
                <div class="advantage-img-title">
                    <div class="advantage-img-wrap">
                        <img class="advantage-item-img" :src="$qiniuHost+'images/flow.png'" alt="">
                        <img class="advantage-item-bg bg4" :src="$qiniuHost+'images/circle.png'" alt="">
                    </div>
                    <p class="advantage-title">数据分析</p>
                </div>
                <p class="advantage-intro">派图租赁后台可以根据您的要求分析您相关资产的使用率和提供相应的报表，为您的经营策略提供更加全面和科学的参考。</p>
            </div>
            <div class="advantage-item">
                <div class="advantage-img-title">
                    <div class="advantage-img-wrap">
                        <img class="advantage-item-img" :src="$qiniuHost+'images/safe.png'" alt="">
                        <img class="advantage-item-bg bg5" :src="$qiniuHost+'images/circle.png'" alt="">
                    </div>
                    <p class="advantage-title">数据安全</p>
                </div>
                <p class="advantage-intro">无论是您的客户信息，还是您的相关经营数据，派图租赁都采用多种顶级加密算法，存储在多个云端，除了您，任何人都无权追踪和查看。</p>
            </div>
        </div>
    </div>
    <div class="price price-hide" id="price" v-if="false">
        <img class="side-bg" :src="$qiniuHost+'images/bg-rectangle.png'" alt="">
        <div class="price-title-bg">
            <img class="price-bg" :src="$qiniuHost+'images/PAITUME.png'" alt="">
            <span class="price-title">不同版本，任君选择</span>
        </div>
        <div class="edition">
            <div class="edition-card1 .card-hover">
                <div class="card-head">
                    <span class="card-head-title">免费</span>
                    <span class="card-head-intro">适用偶尔需要租赁业务的企业</span>
                </div>
                <div class="card-content">
                    <p class="card-content-title">免费使用</p>
                    <p class="card-content-intro">新用户赠送1000条推广短信</p>
                    <div class="card-content-btn">免费使用</div>
                </div>
            </div>
            <div class="edition-card2 .card-hover">
                <div class="card-head">
                    <span class="card-head-title">按月付费</span>
                    <span class="card-head-intro">专业的，大型影棚或团队</span>
                </div>
                <div class="card-content">
                    <p class="card-content-item">
                        <span>单账户：</span>
                        <span>￥198元</span>
                        <span>/月</span>
                    </p>
                    <p class="card-content-item">
                        <span>多账户：</span>
                        <span>￥298元</span>
                        <span>/月</span>
                    </p>
                    <div class="card-content-btn">立即购买</div>
                </div>
            </div>
            <div class="edition-card3 .card-hover">
                <div class="card-head">
                    <span class="card-head-title">按年付费</span>
                    <span class="card-head-intro">适合企业级团队或企业</span>
                </div>
                <div class="card-content">
                    <p class="card-content-item">
                        <span>单账户：</span>
                        <span>￥1998元</span>
                        <span>/年</span>
                    </p>
                    <p class="front-price">¥2388</p>
                    <p class="card-content-item">
                        <span>多账户：</span>
                        <span>￥2998元</span>
                        <span>/年</span>
                    </p>
                    <p class="front-price">¥3576</p>
                    <div class="card-content-btn">立即购买</div>
                </div>
            </div>
            <div class="edition-card4 .card-hover">
                <div class="card-head">
                    <span class="card-head-title">定制版</span>
                    <span class="card-head-intro">适合企业级团队或企业</span>
                </div>
                <div class="card-content">
                    <p class="card-content-title">按需定制</p>
                    <p class="card-content-intro">满足您的特别需求价格双方协商后确定</p>
                    <div class="card-content-btn color-area">咨询销售顾问</div>
                </div>
            </div>
        </div>
        <div class="price-table">
            <div class="price-table-title">目录表</div>
            <img :src="$qiniuHost+'images/price-table.png'" alt="">
        </div>
    </div>
    <div class="bottom">
        <img class="bottom-img" :src="$qiniuHost+'images/bg-purple.png'" alt="">
        <div class="bottom-text">
            <p class="bottom-text-title">立即入驻, 体验强大功能</p>
            <p class="bottom-text-intro">与影像行业一起成长</p>

            <router-link to="/hire/index">
                <span class="bottom-text-btn">立即免费入驻</span> </router-link>
        </div>
    </div>
</div>
</template>

<script>
import Login from "@front/components/minilogin";
export default {
    data() {
        return {
            functionMoveThree: false,
            stockMoveThree: false,
            clientMoveThree: false,
            taskMoveThree: false
        }
    },
    mounted() {
        window.onscroll = () => {
            if (this.$route.name === 'propaganda') {
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                // if(scrollTop >= parseInt(this.getElementTop(document.getElementById('price')))-parseInt(document.documentElement.clientHeight)/4){
                //     console.log('滚到价格了')
                //     document.querySelector('.price').classList.remove('price-hide')
                //     document.querySelector('.price-title-bg').classList.add('animated', 'flipInY')
                //     document.querySelector('.edition').classList.add('animated', 'fadeIn')
                //     document.querySelector('.price-table').classList.add('animated', 'fadeIn')
                // }else 
                if (scrollTop >= parseInt(this.getElementTop(document.getElementById('advantage'))) - parseInt(document.documentElement.clientHeight) / 6) {
                    // console.log('滚到特点了')
                    document.querySelector('.advantage').classList.remove('advantage-hide')
                    document.querySelectorAll('.advantage-item')[0].classList.add('animated', 'fadeInDown')
                    document.querySelectorAll('.advantage-item')[1].classList.add('animated', 'fadeInLeft')
                    document.querySelectorAll('.advantage-item')[2].classList.add('animated', 'fadeInUp')
                    document.querySelectorAll('.advantage-item')[3].classList.add('animated', 'fadeInRight')
                    document.querySelectorAll('.advantage-item')[4].classList.add('animated', 'fadeInLeft')
                    document.querySelectorAll('.advantage-item')[5].classList.add('animated', 'fadeInRight')
                    this.taskMoveThree = false
                } else if (scrollTop >= parseInt(this.getElementTop(document.getElementById('task'))) - parseInt(document.documentElement.clientHeight) / 2) {
                    // console.log('滚到指派任务了')
                    document.querySelector('.task').classList.remove('task-hide')
                    document.querySelector('.task-dec').classList.add('animated', 'fadeInUp')
                    document.querySelector('.task-img').classList.add('animated', 'fadeInDown')
                    this.taskMoveThree = true
                    this.clientMoveThree = false
                } else if (scrollTop >= parseInt(this.getElementTop(document.getElementById('client'))) - parseInt(document.documentElement.clientHeight) / 2) {
                    // console.log('滚到客户了')
                    document.querySelector('.client').classList.remove('client-hide')
                    document.querySelector('.client-dec').classList.add('animated', 'fadeInUp')
                    document.querySelector('.client-img').classList.add('animated', 'fadeInDown')
                    this.clientMoveThree = true
                    this.stockMoveThree = false
                    this.taskMoveThree = false
                } else if (scrollTop >= parseInt(this.getElementTop(document.getElementById('stock'))) - parseInt(document.documentElement.clientHeight) / 4) {
                    // console.log('滚到库存了')
                    document.querySelector('.stock').classList.remove('stock-hide')
                    document.querySelector('.stock-dec').classList.add('animated', 'fadeInLeft')
                    document.querySelector('.stock-img').classList.add('animated', 'fadeInRight')
                    this.functionMoveThree = false
                    this.stockMoveThree = true
                    this.clientMoveThree = false
                } else if (scrollTop >= parseInt(this.getElementTop(document.getElementById('function'))) - parseInt(document.documentElement.clientHeight) / 4) {
                    // console.log('滚到功能了')
                    document.querySelector('.function').classList.remove('function-hide')
                    document.querySelector('.function-title').classList.add('animated', 'flipInX')
                    document.querySelector('.function-img').classList.add('animated', 'fadeInLeft')
                    document.querySelector('.decription').classList.add('animated', 'fadeInRight')
                    this.functionMoveThree = true
                    this.stockMoveThree = false
                } else {
                    this.functionMoveThree = false
                }
            }
        }
    },
    methods: {
        // 获取某个Dom元素距离页面顶部也就是根节点的高度距离
        getElementTop(ele) {
            let actualTop = ele.offsetTop
            let current = ele.offsetParent
            while (current !== null) {
                actualTop += current.offsetTop
                current = current.offsetParent
            }
            return actualTop
        },
    }
}
</script>

<style lang="scss" scoped>
.all-wrap {
    background: #fff;
}

.mountain {
    background: url('https://pic.paitume.com/images/bg-top.png') no-repeat;
    height: 448px;
    padding-top: 82px;
    box-sizing: border-box;
    text-align: center;

    .mountain-title {
        font-size: 40px;
        color: #333333;
        font-weight: 600;
        margin-bottom: 10px;
    }

    .mountain-btn {
        width: 160px;
        height: 40px;
        margin: 0 auto;
        line-height: 40px;
        background: rgb(101, 31, 255);
        border-radius: 20px;
        color: #fff;
        font-size: 16px;
        cursor: pointer;
    }
}

.video {
    margin-top: -180px;
    text-align: center;
    margin-bottom: 66px;

    .img-wrap {
        display: inline-block;
        position: relative;

        .video-center-img {
            z-index: 2;
        }

        .first,
        .second,
        .third,
        .fouth,
        .fifth,
        .play {
            position: absolute;
            left: 0;
            top: 0;
        }

        .first {
            left: 477px;
            top: 162px;
            // animation-delay: 2s;
        }

        .second {
            left: 546px;
            top: 98px;
        }

        .third {
            left: 660px;
            top: 51px;
        }

        .fouth {
            left: 782px;
            top: 130px;
        }

        .fifth {
            left: 860px;
            top: 180px;
            z-index: 1;
        }

        .play {
            left: 50%;
            top: 158px;
            transform: translateX(-50%);
        }
    }
}

.function {
    text-align: center;
    margin-bottom: 62px;

    .function-title {
        font-size: 32px;
        color: #050505;
        font-weight: 600;
    }

    .function-content {
        display: flex;
        align-items: center;
        padding-left: 180px;
        box-sizing: border-box;

        .function-img {
            margin-right: 108px;
            margin-top: -20px;
            width: 774px;
            height: 536px;
            position: relative;

            .function-img1 {
                position: absolute;
                left: 0;
            }

            .function-img2 {
                position: absolute;
                top: 117px;
                left: 200px;
            }

            .function-img3 {
                position: absolute;
                // top: 213px;
                // left: 538px;
                right: 0;
                bottom: 0;
            }

            .function-img4 {
                position: absolute;
                top: 150px;
                right: 200px;
            }
        }

        .decription {
            width: 355px;
            padding-top: 50px;
            box-sizing: border-box;
            text-align: left;

            .dec-title {
                font-size: 24px;
                color: #050505;
                margin-bottom: 17px;
            }

            .dec-intro {
                font-size: 16px;
                color: #767283;
                line-height: 30px;
            }
        }
    }
}

.function-hide {
    visibility: hidden;
}

.stock {
    padding-left: 462px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    margin-bottom: 155px;

    .stock-dec {
        width: 297px;
        margin-right: 205px;

        .stock-dec-title {
            font-size: 24px;
            color: #050505;
            margin-bottom: 17px;
            font-weight: 600;
        }

        .stock-dec-intro {
            font-size: 16px;
            color: #767283;

        }
    }

    .stock-img {
        width: 704px;
        height: 484px;
        position: relative;

        .stock-img1 {
            position: absolute;
            left: 0;
            bottom: 0;
            z-index: 2;
        }

        .stock-img2 {
            position: absolute;
            left: 258px;
            top: 126px;
            z-index: 4;
        }

        .stock-img3 {
            position: absolute;
            left: 292px;
            top: 184px;
            z-index: 3;
        }

        .stock-img4 {
            position: absolute;
            left: 89px;
            bottom: 26px;
        }
    }
}

.stock-hide {
    visibility: hidden;
}

.client {
    width: 1085px;
    height: 650px;
    margin: 0 auto;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    margin-bottom: 300px;

    .client-img {
        height: 580px;
        position: relative;

        .client-img1 {}

        .client-img2 {
            position: absolute;
            left: 404px;
            top: 120px;
        }

        .client-img3 {
            position: absolute;
            left: 585px;
            top: 95px;
        }

        .client-img4 {
            position: absolute;
            right: 60px;
            top: 142px;
        }
    }

    .client-dec {
        text-align: center;
        margin-top: -65px;

        .purple-line {
            width: 6px;
            margin: 0 auto;
            height: 20px;
            background: rgb(120, 66, 237);
            border-radius: 3px;
            margin-bottom: 20px;
        }

        .client-dec-title {
            font-size: 24px;
            color: #050505;
            margin-bottom: 17px;
            font-weight: 600;
        }

        .client-dec-intro {
            width: 510px;
            margin: 0 auto;
            font-size: 16px;
            color: #767283;
            line-height: 30px;
        }
    }
}

.client-hide {
    visibility: hidden;
}

.task {
    width: 1415px;
    height: 650px;
    margin: 0 auto;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    margin-bottom: 100px;

    .task-img {
        height: 580px;
        position: relative;

        .task-img1 {
            position: absolute;
            left: 200px;
        }

        .task-img2 {
            position: absolute;
            left: 570px;
            top: 85px;
        }

        .task-img3 {
            position: absolute;
            left: 585px;
            top: 170px;
            z-index: 2;
        }

        .task-img4 {
            position: absolute;
            right: 200px;
            top: 17px;
        }

        .task-img5 {
            position: absolute;
            right: 352px;
            top: 270px;
        }
    }

    .task-dec {
        text-align: center;
        margin-top: -158px;

        .purple-line {
            width: 6px;
            margin: 0 auto;
            height: 20px;
            background: rgb(120, 66, 237);
            border-radius: 3px;
            margin-bottom: 20px;
        }

        .task-dec-title {
            font-size: 24px;
            color: #050505;
            margin-bottom: 17px;
            font-weight: 600;
        }

        .task-dec-intro {
            width: 510px;
            margin: 0 auto;
            font-size: 16px;
            color: #767283;
            line-height: 30px;
        }
    }
}

.task-hide {
    visibility: hidden;
}

.advantage {
    width: 1200px;
    height: 810px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    margin-bottom: 70px;

    .advantage-row1,
    .advantage-row2,
    .advantage-row3 {
        flex: 1;
    }

    .advantage-item {
        width: 370px;
        height: 100%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;

        .advantage-img-wrap {
            width: 120px;
            height: 120px;
            position: relative;

            .advantage-item-img {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
            }

            .advantage-item-bg {
                width: 120px;
                height: 120px;
                position: absolute;
                left: 0;
                top: 0;
                z-index: 3;
                // animation: bgrotate 8s infinite linear;
            }

            .bg1 {
                animation: bgrotate1 12s infinite linear;
            }

            .bg2 {
                transform: rotate(90deg);
                animation: bgrotate2 12s infinite linear;
            }

            .bg3 {
                transform: rotate(180deg);
                animation: bgrotate3 12s infinite linear;
            }

            .bg4 {
                transform: rotate(270deg);
                animation: bgrotate4 12s infinite linear;
            }

            .bg5 {
                // transform: rotate(360deg);
                animation: bgrotate5 12s infinite linear;
            }
        }

        .advantage-title {
            margin-bottom: 20px;
            margin-top: 12px;
            font-size: 24px;
            font-weight: 600;
            color: #050505;
        }

        .advantage-intro {
            font-size: 16px;
            color: #767283;
        }
    }

    .advantage-row1 {
        .advantage-item {
            text-align: center;

            .advantage-img-wrap {
                margin: 0 auto;
            }
        }
    }

    .advantage-row2 {
        display: flex;

        .advantage-item {
            .center-circle {
                width: 268px;
                height: 268px;
                margin: 0 auto;
                // animation: bgrotate 3s infinite linear;
            }
        }

        .advantage-item:first-child {
            margin-top: -60px;

            .advantage-img-title {
                padding-right: 75px;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                align-items: flex-end;

                .advantage-title {
                    box-sizing: border-box;
                    text-align: right;
                }
            }

            .advantage-intro {
                text-align: center;
                line-height: 30px;
            }
        }

        .advantage-item:last-child {
            margin-top: -60px;

            .advantage-img-title {
                padding-left: 75px;
                box-sizing: border-box;

                .advantage-title {
                    box-sizing: border-box;
                }
            }

            .advantage-intro {
                text-align: center;
                line-height: 30px;
            }
        }
    }

    .advantage-row3 {
        display: flex;

        .advantage-item:first-child {
            .advantage-img-title {
                display: flex;
                flex-direction: column;
                align-items: flex-end;

                .advantage-title {
                    box-sizing: border-box;
                    text-align: right;
                }
            }

            .advantage-intro {
                text-align: right;
                line-height: 30px;
            }
        }

        .advantage-item:last-child {
            .advantage-title {
                box-sizing: border-box;
            }

            .advantage-intro {
                line-height: 30px;
            }
        }
    }
}

.advantage-hide {
    visibility: hidden;
}

.price {
    padding-top: 92px;
    padding-bottom: 50px;
    box-sizing: border-box;
    background: #FAFAFA;
    position: relative;

    .side-bg {
        position: absolute;
        left: 0;
    }

    .price-title-bg {
        text-align: center;
        position: relative;
        margin-bottom: 40px;

        .price-title {
            font-size: 32px;
            color: #333333;
            font-weight: 600;
            position: absolute;
            left: 50%;
            bottom: -10px;
            transform: translateX(-50%);
        }
    }

    .edition {
        width: 1028px;
        margin: 0 auto;
        height: 266px;
        display: flex;
        justify-content: space-between;
        margin-bottom: 120px;

        .edition-card1 {
            display: flex;
            flex-direction: column;
            height: 100%;
            width: 245px;

            .card-head {
                background: #A7C784;
                color: #fff;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: 72px;

                .card-head-title {
                    font-size: 18px;
                }
            }

            .card-content {
                flex: 1;
                // height: calc(100% - 72px);
                background: linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(250, 250, 250, 1) 100%);
                box-shadow: 0px -32px 16px 0px rgba(35, 4, 115, 0.06);
                padding: 45px 8px 0;
                box-sizing: border-box;
                text-align: center;
                position: relative;

                .card-content-title {
                    font-size: 24px;
                    color: #A2C083;
                    margin-bottom: 16px;
                }

                .card-content-intro {
                    font-size: 18px;
                    color: #999999;
                }

                .card-content-btn {
                    width: 138px;
                    height: 40px;
                    line-height: 40px;
                    text-align: center;
                    background: rgb(167, 199, 132);
                    font-size: 16px;
                    color: #fff;
                    position: absolute;
                    left: 50%;
                    bottom: 0;
                    transform: translate(-50%, 50%);
                }
            }
        }

        .edition-card2 {
            display: flex;
            flex-direction: column;
            height: 100%;
            width: 245px;

            .card-head {
                background: #549DF1;
                color: #fff;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: 72px;

                .card-head-title {
                    font-size: 18px;
                }
            }

            .card-content {
                background: linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(250, 250, 250, 1) 100%);
                box-shadow: 0px -32px 16px 0px rgba(35, 4, 115, 0.06);
                padding-top: 41px;
                box-sizing: border-box;
                text-align: center;
                position: relative;
                height: 100%;
                flex: 1;

                .card-content-item {
                    span:not(:nth-child(2)) {
                        color: #999999;
                    }

                    span:nth-child(2) {
                        color: #2379E5;
                        font-size: 24px;
                    }

                    &+.card-content-item {
                        margin-top: 15px;
                    }
                }

                .card-content-btn {
                    width: 138px;
                    height: 40px;
                    line-height: 40px;
                    text-align: center;
                    background: #5299EE;
                    font-size: 16px;
                    color: #fff;
                    position: absolute;
                    left: 50%;
                    bottom: 0;
                    transform: translate(-50%, 50%);
                }
            }
        }

        .edition-card3 {
            display: flex;
            flex-direction: column;
            height: 100%;
            width: 245px;

            .card-head {
                background: #7842ED;
                color: #fff;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: 72px;

                .card-head-title {
                    font-size: 18px;
                }
            }

            .card-content {
                background: linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(250, 250, 250, 1) 100%);
                box-shadow: 0px -32px 16px 0px rgba(35, 4, 115, 0.06);
                padding-top: 26px;
                box-sizing: border-box;
                text-align: center;
                position: relative;
                height: 100%;
                flex: 1;

                .card-content-item {
                    span:not(:nth-child(2)) {
                        color: #999999;
                    }

                    span:nth-child(2) {
                        color: #7842ED;
                        font-size: 24px;
                    }

                    &+.card-content-item {
                        margin-top: 15px;
                    }
                }

                .front-price {
                    font-size: 18px;
                    margin-top: 6px;
                    color: #BCBEC7;
                    text-decoration: line-through;

                    &:not(:last-child) {
                        margin-bottom: 12px;
                    }
                }

                .card-content-btn {
                    width: 138px;
                    height: 40px;
                    line-height: 40px;
                    text-align: center;
                    background: #7842ED;
                    font-size: 16px;
                    color: #fff;
                    position: absolute;
                    left: 50%;
                    bottom: 0;
                    transform: translate(-50%, 50%);
                }
            }
        }

        .edition-card4 {
            display: flex;
            flex-direction: column;
            height: 100%;
            width: 245px;

            .card-head {
                background: #291655;
                color: #fff;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: 72px;

                .card-head-title {
                    font-size: 18px;
                    position: relative;

                    &:after {
                        padding: 0 4px;
                        box-sizing: border-box;
                        margin-left: 5px;
                        position: absolute;
                        content: 'NEW';
                        background: #FF641F;
                        height: 20px;
                        border-radius: 3px;
                    }
                }
            }

            .card-content {
                flex: 1;
                // height: calc(100% - 72px);
                background: linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(250, 250, 250, 1) 100%);
                box-shadow: 0px -32px 16px 0px rgba(35, 4, 115, 0.06);
                padding: 45px 38px 0;
                box-sizing: border-box;
                text-align: center;
                position: relative;

                .card-content-title {
                    font-size: 24px;
                    color: #291655;
                    margin-bottom: 16px;
                }

                .card-content-intro {
                    font-size: 18px;
                    color: #999999;
                }

                .card-content-btn {
                    width: 138px;
                    height: 40px;
                    line-height: 40px;
                    text-align: center;
                    background: #291655;
                    font-size: 16px;
                    color: #fff;
                    position: absolute;
                    left: 50%;
                    bottom: 0;
                    transform: translate(-50%, 50%);
                }
            }
        }
    }

    .price-table {
        text-align: center;

        .price-table-title {
            font-size: 24px;
            color: #291655;
            font-weight: 600;
        }

        img {
            margin-top: -50px;
        }
    }
}

.price-hide {
    visibility: hidden;
}

.bottom {
    display: flex;
    position: relative;
    text-align: center;

    .bottom-img {
        width: 100%;
        height: 100%;
    }

    .bottom-text {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        .bottom-text-title {
            font-size: 50px;
            color: #fff;
            font-weight: 600;
            margin-bottom: 8px;
            letter-spacing: 5px;
        }

        .bottom-text-intro {
            font-size: 32px;
            color: #fff;
            font-weight: 100;
            margin-bottom: 16px;
        }

        .bottom-text-btn {
            display: block;
            text-align: center;
            margin: 0 auto;
            width: 160px;
            height: 40px;
            line-height: 40px;
            background: rgb(255, 255, 255);
            border-radius: 20px;
            color: #7842ED;
            cursor: pointer;
        }
    }
}

// @keyframes bgrotate {
//     from{
//         transform: rotate(0);
//     }
//     to{
//         transform: rotate(360deg);
//     }
// }
@keyframes bgrotate1 {
    from {
        transform: rotate(0);
    }

    to {
        transform: rotate(360deg);
    }
}

@keyframes bgrotate2 {
    from {
        transform: rotate(90deg);
    }

    to {
        transform: rotate(450deg);
    }
}

@keyframes bgrotate3 {
    from {
        transform: rotate(180deg);
    }

    to {
        transform: rotate(540deg);
    }
}

@keyframes bgrotate4 {
    from {
        transform: rotate(270deg);
    }

    to {
        transform: rotate(630deg);
    }
}

@keyframes bgrotate5 {
    from {
        transform: rotate(0);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>
