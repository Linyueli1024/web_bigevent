$.ajaxPrefilter(function(options){
    //拼接产生真正的url
    options.url = 'http://www.liulongbin.top:3007'+ options.url
    // console.log(options.url);

    //统一为有权限的接口设置headers请求头
    //判断是否是/my路径
    if(options.url.indexOf('/my') !== -1){
        options.headers={
        Authorization:localStorage.getItem('token')||''
    }
    }
    


    //全局统一挂载complete回调函数
    options.complete=function(res){
        // console.log(res);
        //在complete回调函数中，可以使用res.responseJson拿到服务器响应回来的数据
        // 判断返回的状态
        if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
            //1 强制清空token
            localStorage.removeItem('token')
            //2 强制跳转到登录页面
            location.href = '/login.html'
        }
   }
})
