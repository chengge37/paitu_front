<template>
<div class="selectedGood">
    <div class="top">
        <div class="block"></div>
        <p>精选商品</p>
    </div>
    <div class="goods">
        <ul>
            <li v-for="(item,index) in list" :key="index">
                <img :src="item.imageUrl" alt="" />
                <p>{{item.title}}</p>
                <div>
                    <span>￥</span>
                    <span class="money">{{item.price}}</span>
                    <span>起</span>
                </div>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
import {
    qiniuHost
} from "@config/config.js";

export default {
    data() {
        return {

            list: [{
                imageUrl: qiniuHost+'1-1561429452096.png',
                title: '积田咏道沈阳大学影棚',
                price: '199'
            }, {
                imageUrl: qiniuHost+'1-1561429452096.png',
                title: '积田咏道沈阳大学影棚',
                price: '199'
            }, {
                imageUrl: qiniuHost+'1-1561429452096.png',
                title: '积田咏道沈阳大学影棚',
                price: '199'
            }, {
                imageUrl: qiniuHost+'1-1561429452096.png',
                title: '积田咏道沈阳大学影棚',
                price: '199'
            }, {
                imageUrl: qiniuHost+'1-1561429452096.png',
                title: '积田咏道沈阳大学影棚',
                price: '199'
            }, {
                imageUrl: qiniuHost+'1-1561429452096.png',
                title: '积田咏道沈阳大学影棚',
                price: '199'
            }]
        };
    },
    mounted() {

    },
    computed: {

    },
    methods: {

    }
};
</script>

<style lang="scss" scoped>
.selectedGood {
    margin-top: 100px;
    margin-bottom: 45px;

    .top {
        display: flex;
        align-items: center;
        margin-bottom: 16px;

        .block {
            width: 7px;
            height: 20px;
            background: #4A8BFF;
            margin-right: 10px;
        }

        p {
            font-size: 22px;
        }
    }

    .goods {
        ul {
            display: flex;
            justify-content: flex-start;

            li {
                text-align: center;
                margin-right: 1.5vw;

                img {
                    width: 236px;
                    height: 160px;
                }

                p {
                    padding: 5px 0px;
                    font-size: 16px;
                }

                div {
                    color: #F93737;
                    display: flex;
                    justify-content: center;
                    font-size: 14px;

                    .money {
                        font-size: 18px;
                    }
                }
            }

        }
    }
}
</style>
