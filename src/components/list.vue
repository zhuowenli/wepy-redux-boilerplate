<template lang="pug">
    view.list
        view
            button(@tap="onAddAction" size="mini") 添加列表
        block(wx:for-items="{{list}}" wx:for-index="index" wx:for-item="item" wx:key="id")
            view.mylist(@tap="tap")
            text {{item.id}}: {{item.title}}
</template>

<script>
    import wepy from 'wepy';

    export default class List extends wepy.component {
        data = {
            list: [
                {
                    id: '0',
                    title: 'loading'
                }
            ]
        }

        events = {
            'index-broadcast': (...args) => {
                const $event = args[args.length - 1];
                console.log(`${this.$name} receive ${$event.name} from ${$event.source.name}`);
            }
        }

        methods = {
            tap () {
            // this.num = this.num + 1
                console.log(`${this.$name} tap`);
            },
            onAddAction () {
                const len = this.list.length;
                this.list.push({ id: len + 1, title: `title_${len}` });
            }
        }

        onLoad () {
        }
    }
</script>

<style lang="less">
  .mylist:odd {
    color: red;
  }
  .mylist:even {
    color: green;
  }
</style>

