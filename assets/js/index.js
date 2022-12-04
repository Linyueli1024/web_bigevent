$(function(){
    //调用getUserInfo获取用户基本信息
    getUserInfo()

    var layer = layui.layer

    $('#btnLogout').on('click', function(){
        // console.log('ok');
        //提示用户是否退出
        layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, 
        function(index){
            //do something
            //1 清空本地存储中的token
            localStorage.removeItem('token')
            //2 重新跳转到登录页
            location.href = 'login.html'
            //关闭confirm询问框
            layer.close(index);
          });
    })
    
})
//获取用户的基本信息
function getUserInfo(){
    var layer = layui.layer
    $.ajax({
        method:"get",
        url:"/my/userinfo",
        success:function(res){
            if(res.status !== 0){
                return layui.layer.msg('获取用户信息失败')
            }
            //渲染用户头像
            renderAvater(res.data)
        }
    //    complete:function(res){
    //         // console.log(res);
    //         //在complete回调函数中，可以使用res.responseJson拿到服务器响应回来的数据
    //         // 判断返回的状态
    //         if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
    //             //1 强制清空token
    //             localStorage.removeItem('token')
    //             //2 强制跳转到登录页面
    //             location.href = '/login.html'
    //         }
    //    }

    })
}
//渲染用户头像
function renderAvater(user){

    //1.获取用户名称
    var name=user.nickname || user.username
    //2.将用户名渲染到页面
    $('#welcome').html('欢迎&nbsp;&nbsp;'+name)
    console.log(user.user_pic);
    // 3。获取头像
    if(user.user_pic !==null){
        //有自己设置的头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    }
    else
    {
        // 没有自己设置头像，渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
   
}