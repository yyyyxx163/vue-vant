<template>
    <van-tabbar v-model="tabbarActive">
        <van-tabbar-item @click="onNavigation('index')">
            <p class="iconfont iconshouye tabbar"></p>
            <span>首页</span>
        </van-tabbar-item>
        <van-tabbar-item @click="onNavigation('function')">
            <p class="iconfont icontext tabbar"></p>
            <span>智能信息</span>
        </van-tabbar-item>
        <van-tabbar-item @click="onNavigation('system')">
            <p class="iconfont iconfunction tabbar"></p>
            <span>系统管理</span>
        </van-tabbar-item>
        <van-tabbar-item @click="onNavigation('user')">
            <p class="iconfont iconcustom-user tabbar"></p>
            <span>个人中心</span>
        </van-tabbar-item>
    </van-tabbar>
</template>
<script>
// active index映射
const activeMap = {
    'index': 0,
    'function': 1,
    'system': 2,
    'user': 3
}
export default {
    name: 'g-keep-footer',
    props: {
        active: {
            type: String,
            default: ''
        }
    },
    watch: {
        active: {
            handler(val){
                if(val){
                    this.tabbarActive = activeMap[val];
                }
            },
            immediate: true
        }
    },
    data() {
        return {
            tabbarActive: 0
        }
    },
    methods: {
        // 事件： 页面导航
        onNavigation(type = '') {
            if(!type){
                return false
            }
            // 导航操作分发 （重定向）
            switch(type){
                case 'index':
                    this.navigationIndex();
                    break;
                case 'function':
                    this.navigationFuntion();
                    break;
                case 'system':
                    this.navigationSystem();
                    break;
                case 'user':
                    this.navigationUser();
                    break;
                default:
                    break;
            }
        },
        // 导航到首页
        navigationIndex(){
            this.$router.push({ name: 'government-index' });
        },
        // 导航到职能信息
        navigationFuntion(){
            this.$router.push({ name: '' })
        },
        // 导航到系统管理
        navigationSystem(){
            this.$router.push({})
        },
        navigationUser(){
            this.$router.push({})
        }
    }
}
</script>
<style lang='scss'>
    .tabbar{
        font-size: 0.48rem;
        margin-bottom: 0.08rem;
    }
</style>
