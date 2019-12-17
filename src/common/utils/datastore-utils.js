/**
 * 数据持久化工具类
 * 
 * @created: 2019-11-11
 * @Author: yyx (yyyyxx163@163.com)
 */

export const keys = {
    USER_SESSION: 'user_session',
    FROM_URL: 'from_url',
}

 const DataStore = {
     // 存储驱动对象，需要实现（getItem, setItem, removeItem）方法
     dirver: window.localStorage,

     // 构建key名
     _key: function(originKey){
        const prefix = '__template_';
        if(originKey.indexOf(prefix) === 0){
            return originKey
        }
        return prefix + originKey
     },

     // 存储
     setItem: function(key, value, express){
        key =  this._key(key);
        try {
            express > 0 ? (express + parseInt(Date.now() / 1000)) :  express;
            value = JSON.stringify({ value: btoa(encodeURIComponent(JSON.stringify(value))), express });
        } catch (error) {
            return false
        }
        this.dirver.setItem(key, value);
        return true
     },

     // 获取
     getItem: function(key, def = '', once = false){
        key = this._key(key);
        let storeInfo = this.dirver.getItem(key);
        if(storeInfo === null){
            return def
        }

        // 获取一次后，立即删除
        once === true && this.removeItem(key);
        
        let value = def;
        try{
            storeInfo = JSON.parse(storeInfo);
            if(storeInfo && storeInfo.value && storeInfo.express !== undefined){
                if(storeInfo.express === 0 || storeInfo.express > parseInt(Date.now() / 1000)){
                    value = JSON.parse(decodeURIComponent(atob(storeInfo.value)));
                } else {
                    this.removeItem(key);
                }
            }
        } catch (error){
            return def
        }
        return value
     },

     // 移除
     removeItem: function(key){
        key = this._key(key);
        this.dirver.removeItem(key);
        return true
     },

     // 清空
     clear: function(){
        this.dirver.clear()
     },

     // 判断是否存在
    hasItem: function(key){
        return this.getItem(key, '__IS_NULL__') !== '__IS_NULL__';
    },

    // 设置存储驱动对象
    setDriver(dirver){
        this.dirver = dirver
    }
 };

 // 设置默认的存储驱动对象喂lcoalStorage
 DataStore.setDriver(window.localStorage);

 export default DataStore;