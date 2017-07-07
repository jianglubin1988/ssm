/**
 * 项目名称: i社慧
 * 项目描述: 管理后台 - 登录
 * 创建人: zhubaozong
 * 创建时间: 2016-09-26
 * 修改人:
 * 修改时间:
 * 修改备注:
 */

// 公共
require('../common/common.js');

// 样式
require('../../styles/backstage/login_back.scss');

// 交互
$(function(){
	var vm = new Vue({
		el: 'body',
		data: {
			times: 0,
			isFirst: 0,
			isLc: 0,
			imgsrc: '/backstage/Login/verify',
			user_name: '',
			password: '',
			vcode: '',
			userData: {}
		},
		ready: function(){
			if(localStorage.loginName != undefined){
				this.user_name = localStorage.loginName
			}
		},
		methods: {
			login: function(){
				$('input').blur();
				var that = this;
				if($('.ui-dialog-error').length > 0){
					return false
				}
				
				if(this.user_name == ''){
					core.error('账号不能为空')
					return
				}
				if(this.user_name.length < 2){
					core.error('请填写完整的管理员账号')
					return
				}
				if(this.password == ''){
					core.error('密码不能为空')
					return
				}
				if(this.password.length < 6){
					core.error('密码不能少于6位')
					return
				}

				if(this.vcode == ''){
					core.error('验证码不能为空')
					return
				}
				core.post('/backstage/Login/login', {
					user_name: this.user_name,
					password: this.password,
					vcode: this.vcode
				}, {
					onSuccess: function(res){
						if(res.code == 0){
							window.location.href = '/backstage/User/index';
						}
						return false;
					},
					onError: function(res){
							that.verify();
					}
				})
			},
			verify: function(){
				this.imgsrc = '/backstage/Login/verify?' + Date.parse(new Date());
			}

		}
	})

});