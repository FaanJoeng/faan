/**
 * Created by 杨凡 on 2016/9/29.
 */
module.exports = {
  extend: function(target, source, flag) {
    for(var key in source) {
      if(source.hasOwnProperty(key))
        flag ?
          (target[key] = source[key]) :
          (target[key] === void 0 && (target[key] = source[key]));
    }
    return target;
  }
}