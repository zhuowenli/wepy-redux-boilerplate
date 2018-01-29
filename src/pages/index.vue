<template>
    <view class="container">
        <view class="userinfo" @tap="handleViewTap">
            <image class="userinfo-avatar" src="{{ userInfo.avatarUrl }}" background-size="cover"/>
            <view class="userinfo-nickname">{{ userInfo.nickName }}</view>
        </view>

        <panel>
            <view class="title" slot="title">其它测试</view>
            <button @tap="communicate" size="mini">组件通信</button>
            <button @tap="tap" size="mini">混合TAP事件</button>
        </panel>

        <panel>
            <view class="title" slot="title">测试并发网络请求</view>
            <view>返回结果: <text>{{netrst}}</text></view>
        </panel>

        <Toast />
    </view>
</template>

<script>
    import wepy from 'wepy';
    import { connect } from 'wepy-redux';
    import Toast from 'wepy-com-toast';
    import Counter from 'counter'; // alias example
    import List from '../components/list';
    import Panel from '../components/panel';
    import Group from '../components/group';
    import testMixin from '../mixins/test';

    @connect({
        num: ({ counter }) => counter.num,
        asyncNum (state) {
            return state.counter.asyncNum;
        },
        sumNum (state) {
            return state.counter.num + state.counter.asyncNum;
        }
    })

    export default class extends wepy.page {
        config = {
            navigationBarTitleText: 'test'
        }

        components = {
            panel: Panel,
            counter1: Counter,
            counter2: Counter,
            list: List,
            group: Group,
            Toast
        }

        mixins = [testMixin]

        data = {
            mynum: 20,
            userInfo: {
                nickName: '加载中...'
            },
            normalTitle: '原始标题',
            setTimeoutTitle: '标题三秒后会被修改',
            count: 0,
            netrst: '',
        }

        computed = {
            now () {
                return +new Date();
            }
        }

        methods = {
            plus () {
                this.mynum += 1;
                console.log(this.mynum);
            },
            toast () {
                const promise = this.$invoke('toast', 'show', {
                    title: '自定义标题',
                    img: 'https://raw.githubusercontent.com/kiinlam/wetoast/master/images/star.png'
                });

                promise.then((d) => {
                    console.log('toast done');
                });
            },
            communicate () {
                console.log(`${this.$name} tap`);

                this.$invoke('counter2', 'minus', 45, 6);
                this.$invoke('counter1', 'plus', 45, 6);

                this.$broadcast('index-broadcast', 1, 3, 4);
            },
            counterEmit (...args) {
                const $event = args[args.length - 1];
                console.log(`${this.$name} receive ${$event.name} from ${$event.source.$name}`);
            }
        }

        events = {
            'index-emit': (...args) => {
                const $event = args[args.length - 1];
                console.log(`${this.$name} receive ${$event.name} from ${$event.source.$name}`);
            }
        }

        async onLoad() {
            const userInfo = await this.$parent.getUserInfo();

            if (userInfo) {
                this.userInfo = userInfo;
            }

            this.$apply();
        }
    }
</script>

<style lang="sass">
@import './index.sass'
</style>