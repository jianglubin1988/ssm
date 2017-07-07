/**
 * 项目名称: i社慧
 * 项目描述: 管理后台 - 用户管理
 * 创建人: zhubaozong
 * 创建时间: 2016-09-29
 * 修改人:
 * 修改时间:
 * 修改备注:
 */

// 公共
require('../common/common.js');

// 样式
require('../../styles/backstage/user_back.scss');
Vue.component('ui-page', require('../../components/ui-page.vue'));
Vue.component('input-file', require('../../components/input-file.vue'));

// 交互
$(function(){

	var vm = new Vue({
		el: 'body',
		data: {
			auth: {},

			activeData: {
				isSearchMore: false,
				isSuc: false,
				pageData: {
					page: 1,
					count: 0,
					pageAll: 10,
					pageShow: 5
				},
				searchPrams: {
					page: 1,              // 页数
					name: '',         // 用户姓名或手机号
					type: '',        // 用户类型
					status: '',      // 用户状态
				},
				users: [],
				precinctList: []
			},
			keyData: {
				show: false,
				userId: '',
				username: '',
				data: []
			},
			importData: {
				show: false,
				errorUrl: '',
				error: false
			},
			editData: {
				show: false,
				data: {},
				flag: ''
			}
		},
		ready: function(){
			var that = this;
			this.goPageActive(1);
		},
		methods: {
			tab: function(idx){
				this.navCur = idx;
			},
			searchMore: function(flag){
				if(flag == 0){
					this.activeData.isSearchMore = !this.activeData.isSearchMore
				}else{
					this.unactiveData.isSearchMore = !this.unactiveData.isSearchMore
				}
			},
			goPageActive: function(p){
				this.activeData.pageData.page = p;
				var _this = this;
				this.activeData.searchPrams.page = p;
				this.activeData.isSuc = false;

				core.post('/backstage/User/userList', this.activeData.searchPrams, {
					onSuccess: function(res){
						_this.activeData.pageData.pageAll = res.data.totalpage;
						_this.activeData.pageData.count = res.data.pagesize;
						_this.activeData.users = res.data.list;
					}
				})
				
			},
			popKey: function(user){
				this.keyData.show = true;
				this.keyData.username = user.realName;
				var that = this;
				core.post('/o2o_web/keyManage/GetUserKeyList', {user_id: user.userId, precinct_id: user.communityId}, {
					showLoading: false,
					onSuccess: function(res){
						that.keyData.data = res.response;
					}
				})
			},
			updateKey: function(key, flag){
				var tit = '';
				if(flag == 0){
					tit = '撤销'
				}else{
					tit = '恢复'
				}
				var that = this;
				core.confirm('确定' + tit + ' ' + this.keyData.username + ' ' + key.lock_address + ' 钥匙权限吗？', function(sure){
					if(sure){
						var data = {
							key_id: key.key_id,
							user_type: key.user_type,
							key_status: flag
						}
						core.post('/o2o_web/keyManage/UpdateUserKeyStatus', data, {
							onSuccess: function(res){
								key.key_status = flag
							}
						})
					}
				})
			},
			editUser: function(user, flag){
				this.editData.show = true;
				this.editData.flag = flag
				if(flag == 1){
					var postUrl = '/o2o_web/UserManage/load';
					var data = {
						id: user.userId,
						p_id: user.communityId
					}
				}else{
					var postUrl = '/o2o_web/staticUserManage/load';
					var data = {
						id: user.id
					}
				}
				var that = this;
				core.post(postUrl, data, {
					showLoading: false,
					onSuccess: function(res){
						that.editData.data = res.response
					}
				})
			},
			saveUser: function(){
				if(this.editData.data.realName == ''){
					core.error('姓名不能为空')
					return
				}
				if(!nameReg.test(this.editData.data.realName)){
					core.error('姓名由2-25位汉字或字母组成，请检查后重新填写')
					return;
				}
				if(this.editData.data.username == ''){
					core.error('手机号码是帮助您识别住户的关键信息，请填写正确的手机号码')
					return
				}
				if(this.editData.data.username.length < 11){
					core.error('请填写11位手机号码')
					return
				}
				if(!mobileReg.test(this.editData.data.username)){
					core.error('请填写正确的手机号码')
					return
				}
				var data = {
					id: this.editData.data.userId,
					name: this.editData.data.realName,
					phone: this.editData.data.username
				}
				var that = this;
				if(this.editData.flag == 1){
					var postUrl = '/o2o_web/UserManage/update'
				}else{
					var postUrl = '/o2o_web/staticUserManage/update'
				}
				core.post(postUrl, data, {
					showLoading: false,
					onSuccess: function(res){
						that.editData.show = false;
						core.success('保存成功', function(){
							if(that.editData.flag == 1){
								that.goPageActive(that.activeData.searchPrams.page)
							}else{
								that.goPageUnactive(that.unactiveData.searchPrams.page)
							}
						})
						
					}
				})
			},
			changeName: function(){
				/*if(!nameReg.test(this.editData.data.realName)){
					this.editData.data.realName = this.editData.data.realName.substring(0, this.editData.data.realName.length - 1)
				}*/
				this.editData.data.realName = this.editData.data.realName.replace(/[^\u4e00-\u9fa5A-Za-z·.• ]/g, '');
			},
			changeMobile: function(){
				this.editData.data.username = this.editData.data.username.replace(/[^0-9]/g, '');
			},
			cancel: function(){
				this.importData.show = false
				this.keyData.show = false
				this.editData.show = false
			},
			enable: function(user, flag){
				var tit = '';
				if(flag == 0){
					tit = '禁用'
				}else{
					tit = '启用'
				}
				var that = this;
				core.confirm('您确定' + tit + '用户 ' + user.realName + ' 吗？', function(sure){
					if(sure){
						core.post('/o2o_web/userManage/switchStatus', {id: user.userId, status: flag}, {
							showLoading: false,
							onSuccess: function(){
								that.goPageActive(that.activeData.searchPrams.page)
							}
						})
					}
				})
			},
			import: function(){
				this.importData.show = true;
				this.importData.error = false;
				$('input[name="xlsx_file[]"]').val('')
			},
			importPostBefore: function(){
				if($('input[name="xlsx_file[]"]').val() == ''){
					core.error('请上传用户导入文件')
					return false
				}
				core.loading(1)
				return true
			},
			importPostSuccess: function(res){
				var that = this;
				core.loading(0)
				this.importData.error = false
				core.success(res.msg, function(){
					that.importData.show = false;
					that.goPageUnactive(1);
					that.navCur = 1
				})
			},
			importPostError: function(res){
				core.loading(0)
				this.importData.error = false
				if(res.code == 10006){
					this.importData.error = true
					this.importData.errorUrl = res.response.file_path
				}
			}
		}
	})

});