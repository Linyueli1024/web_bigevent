$(function(){
    //点击 “去注册账号” 的链接
    $('#link_reg').on('click', function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击 "去登陆"
    $('#link_login').on('click', function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })
    // 从layui中获取form对象
    var form = layui.form
    //从layui中获取layer对象
    var layer = layui.layer


    //通过form.verify()自定义校验规则
    form.verify({
        //自定义密码校验规则
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
          //校验两次密码是否一致的规则
        repwd:function(value){
            //通过形参拿到的是确认密码框中的内容
            //还需要拿到密码框中的内容
            //还需要进行一次判断
            //如果判断失败，return错误提示
            var pwd = $('.reg-box [name=password]').val()
            if(pwd !== value){
                return '两次密码不一致'
            }
        }
    })

    //监听注册表单的提交事件
    $('#form_reg').on('submit', function(e){
        e.preventDefault()
        $.post('/api/reguser',
        {
            username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()
        },
        function(res){
            if(res.status!==0){
                return layer.msg(res.message)
            }
            else{
                layer.msg('注册成功！')
                //自动跳转到登录
                $('#link_login').click()
            }
        })
    })

    //监听登陆表单的提交事件
    $('#form_login').submit(function(e){
        e.preventDefault()
        $.ajax({
            url:'/api/login',
            method:'POST',
            //快速获取表单中的数据
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                //将登录成功得到的token字符串保存到localstorage中
                localStorage.setItem('token', res.token)
                // console.log(res.token);
                //跳转到后台主页
                location.href='/index.html'
            }

        })
    })
})