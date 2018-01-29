<script>
    import wepy from 'wepy';
    import 'wepy-async-function';
    import { setStore } from 'wepy-redux';
    import configStore from './store';

    const store = configStore();

    setStore(store);

    export default class extends wepy.app {
        config = {
            pages: [
                'pages/index'
            ],
            window: {
                backgroundTextStyle: 'light',
                navigationBarBackgroundColor: '#fff',
                navigationBarTitleText: 'WeChat',
                navigationBarTextStyle: 'black'
            }
        }

        globalData = {
            userInfo: null
        }

        constructor () {
            super();
            this.use('requestfix');
            this.use('promisify');
        }

        onLaunch() {
        }

        async getUserInfo() {
            const that = this;

            if (this.globalData.userInfo) {
                return this.globalData.userInfo;
            }

            const data = await wepy.getUserInfo();

            that.globalData.userInfo = data.userInfo;

            return data;
        }
    }
</script>

<style lang="sass">
@import './stylesheet/main.sass'
</style>
