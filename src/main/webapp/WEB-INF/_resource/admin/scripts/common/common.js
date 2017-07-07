window.$ = require('../lib/jquery/3.0.0/jquery.min.js');
window.Vue = require('../lib/vue/1.0.25/vue.min.js');

window.core = require('../utils/core.js');
window.plugin = require('../utils/plugin.js');
window.utils2 = require('../utils/utils.js');
window.validate = require('../utils/validate.js');
window.url = require('./url.js');
window.session = require('./session.js');
require('../utils/textSearch.js');

// bootstrap
require('../lib/bootstrap/3.3.5-noicon/css/bootstrap.min.css');
require('../lib/bootstrap/3.3.5-noicon/js/bootstrap.min.js');

//x-ui modules
window.doT = require('../lib/doT/1.0.3/doT.js');
require('../../styles/module/x-ui-1.0.css');
require('../module/x-ui-1.0.js');

// font icon
require('../lib/icomoon/style.css');

// 样式
require('../../styles/base/base.scss');                 //初始标记化样式
require('../../styles/base/animate.scss');              //动画样式
require('../../styles/base/ui.scss');                   //ui组件样式
require('../../styles/base/vue.scss');                  //vue模板样式（过渡动画）
require('../../styles/base/rewrite_plugin.scss');       //第三方插件样式复写
require('../../styles/base/rewrite_bootstrap.scss');    //bootstrap样式复写
require('../../styles/base/rewrite_xui.scss');          //xui组件库样式复写

require('../../styles/base/layout.scss');               //主结构样式
require('../../styles/base/common.scss');               //公共样式（合并到layout.scss）

require('../lib/jquery-ui-datepicker/1.0/jquery-ui-datepicker.css');
require('../lib/jquery-ui-datepicker/1.0/jquery-ui-datepicker.js');

require('../lib/datetimepicker/bootstrap-datetimepicker.css');
require('../lib/datetimepicker/bootstrap-datetimepicker.js');
require('../lib/datetimepicker/bootstrap-datetimepicker.zh-CN.js');

// vue全局模板
Vue.component('ui-h5-dialog',require('../../components/ui-h5-dialog.vue'));//对话框组件
Vue.component('ui-dialog',require('../../components/ui-dialog.vue'));//对话框组件
Vue.component('ui-form',require('../../components/ui-form.vue'));//表单组件
Vue.component('ui-page',require('../../components/ui-page.vue'));//分页组件

// Vue.component('ui-input-date',require('../../components/ui-input-date.vue'));//日期输入组件
Vue.component('ui-input-area',require('../../components/ui-input-area.vue'));//省市输入组件
Vue.component('ui-input-domicile',require('../../components/ui-input-domicile.vue'));//获取户籍性质输入组件
Vue.component('ui-input-paytype',require('../../components/ui-input-paytype.vue'));//获取缴纳类型输入组件

//jquery-draggable
require('../lib/draggable/jquery-draggable.js');

$(function(){

    plugin.uiDatePicker($('.input-date'));
	//header--修改信息
	new Vue({
        el: '#header',
        data: {
        },
        methods: {
        	modify: function(){
        		this.user.show = true;
        	},
            logout: function(){
                core.confirm('是否确认退出？', function(status){
                    if(status){
                        core.post('/admin/login/logout',{},{
                            onSuccess: function(){
                                window.location.href = '/admin/Login/index';
                                return false;
                            }
                        })
                    }
                })
            },
            message: function(){
                window.location.href = '/admin/Login/message';
            },
            center: function(){
                window.location.href = '/admin/Login/user';
            },
            companyHome: function(){
                utils2.switchCP('/admin/Login/companyIndex', 'company');
            },
            personHome: function(){
                utils2.switchCP('/admin/Login/person', 'person');
            },
            initMsgStatus: function(){
                var _this = this;
                if(php_session){
                    core.post('/messagecenter/SystemMessage/getCountNotRead',{},{
                        showLoading: false,
                        onSuccess: function(result){
                            if(result.data.new_message){
                                $('.message-ico').addClass('message-unread-ico').removeClass('message-ico');
                            }else{
                                $('.operate').find('.message-unread-ico').addClass('message-ico').removeClass('message-unread-ico');
                            }
                            return false;
                        },
                        onError: function(result){
                            return false;
                        }
                    })
                }
            }
        },
        ready: function(){
            this.initMsgStatus();
        }
    });

    new Vue({
        el: '#footer',
        data: {
            qrcode: ''
        },
        methods: {

            initQrcode: function(){
                var _this = this;
                var content = php_session.base_url + '/admin/Login/h5download';
                core.post('/admin/Login/qrCode',{url: content}, {
                    showLoading: false,
                    onSuccess: function(result){
                        _this.qrcode = result.data;
                        return false;
                    }
                })
            },

            goUser: function(val){
                core.redirect(php_session.base_url + '/admin/Login/user?menuFlag=' + val);
            }
        },
        ready: function(){
            this.initQrcode();
        }
    });

    new Vue({
        el: '#userinfo',
        data: {
            user: {}
        },
        methods: {

            init: function(){
                this.getUserInfo();
            },

            pay: function(){
                window.location.href = '/admin/Login/user?menuFlag=charge';
            },

            getUserInfo: function(){
                var _this = this;
                core.post('/admin/user',{},{
                    showLoading: false,
                    onSuccess: function(result){
                        _this.user = result.data.userinfo;
                        return false;
                    }
                })
            }
        },
        ready: function(){
            this.init();
        }
    });

    //header--修改信息
    var h5vm = new Vue({
        el: '#h5header',
        data: {
            more_sync: false
        },
        methods: {
            modify: function(){
                this.user.show = true;
            },
            logout: function(){
                core.confirm('是否确认退出？', function(status){
                    if(status){
                        core.post('/admin/login/logout',{},{
                            onSuccess: function(){
                                window.location.href = '/admin/Login/h5login';
                                return false;
                            }
                        })
                    }
                })
            },
            center: function(){
                window.location.href = '/admin/Login/h5user';
            },
            companyHome: function(){
                utils2.switchCP('/admin/Login/h5company', 'company');
            },
            personHome: function(){
                utils2.switchCP('/admin/Login/h5person', 'person');
            },
            message: function(){
                window.location.href = '/admin/Login/h5message';
            },
            headMore: function(){
                var $more = $('.more-ope');
                $('.more-ope').toggleClass('hide');
            }
        },
        ready: function(){

        }
    });

    //结构
    var $content = $('.content-main');
    var $nav = $('#nav');
    $(window).on('resize',function(){
        var minHeight = $(this).height() - 110;
        $content.css('min-height',minHeight);
    }).resize();

    $('body').on('touchstart', function(e){
        var $target = $(e.target);
        if($target.hasClass('header-more') || $target.hasClass('more-ope') || $target.hasClass('more-item')){
            return ;
        }
        $('.more-ope').addClass('hide');
    })

});