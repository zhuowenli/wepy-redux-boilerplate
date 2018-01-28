<template lang="pug">
    view.panel
        slot(name="title")
            Title
        slot
</template>
<script>
    import wepy from 'wepy';

    export default class Panel extends wepy.component {
    }
</script>
<style lang="less">
    .panel {
        width: 100%;
        margin-top: 20rpx;
        text-align: left;
        font-size: 12px;
        padding-top: 20rpx;
        padding-left: 50rpx;
        padding-bottom: 20rpx;
        border: 1px solid #ccc;

        .title {
        padding-bottom: 20rpx;
        font-size: 14px;
        font-weight: bold;
        }
        .info {
        padding: 15rpx;
        }
        .testcounter {
        margin-top: 15rpx;
        position: absolute;
        }
        .counterview {
        margin-left: 120rpx;
        }
    }
</style>