/**
 * 数组操作工具
 * 
 * @Crearte: 2019-11-21
 * @Author: yyx (yyyyxx163@163.com)
 */

 /**
  * 对象转数组
  * @param {*} obj 目标对象
  */
 export const ObjectToArray = (obj) => {
    return Object.keys(obj).map( (item) => obj[item] )
 }

 /**
  * 数组去重（采用对象属性名不能同名的原理）
  * @param {*} array 目标数组
  * @param {*} keyName 
  */
 export const ArrayUnique = (array, keyName = false) => {
    if(keyName === true){
        return Array.from(new Set(array));
    }
    // 遍历数组，取唯一标识（例如：id）为对象属性名放入对象
    let obj = {};
    array.forEach( (item) => {
        obj[item[keyName]] = item  //                                                    
    });
    return ObjectToArray(obj)
 }

/**
 * 获取数组中同一类的对象
 * @param {*} array 目标数组
 * @param {*} str 以此参数分类
 */
 export const sortArrar = (array, str) => {
    // 定义两个数组（一个数组装同类型对象，一个装所有数组）和一个变量（临时变量，装分类的类型值）
    var targetArr = [],
        kindArr = [],
        tmp;
    // 按照特定的参数排序，将相同的类型排在一起。
    array = array.sort( (a, b) => {
        var s = a[str],
            t = b[str];
        return s < t ? -1 : 1
    } )
    // 拿到数组第一个对象中类型值
    tmp = array[0][str];
    // 循环数组，将相同类型的对象放在同一个数组里
    array.forEach( (item) => {
        if( item[str] === tmp ){
            kindArr.push(item)
        } else {
            tmp = item[str];
            targetArr.push(kindArr);
            kindArr = [item];
        }
    } )
    // 将最后的分类数组放进总数组
    targetArr.push(kindArr)
    return targetArr
}