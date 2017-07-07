/**
 * 常用函数
 * @namespace
 */
var utils = {

	/**
	 * 获取URL参数值
	 * @param  {String} par url参数key值
	 * @return {String}     url参数值
	 */
	getQuery : function(par){
		var local_url = document.location.href;
		var get = local_url.indexOf(par +"=");
		if(get == -1)
		{
			return false;
		}
		var get_par = local_url.slice(par.length + get + 1);
		var nextPar = get_par.indexOf("&");
		if(nextPar != -1)
		{
			get_par = get_par.slice(0, nextPar);
		}
		return get_par;
	},

	/**
	 * 设置Cookie
	 * @param {String} name        cookie键值
	 * @param {String} value       cookie值
	 * @param {String} expireHours cookie过期时间（小时）
	 */
	setCookie : function(name,value,expireHours){
		var cookieString=name+"="+escape(value)+"; path=/";
		if(expireHours>0){
			var date=new Date();
			date.setTime(date.getTime()+expireHours*3600*1000);
			cookieString=cookieString+";expires="+date.toGMTString();
		}
		document.cookie=cookieString;
	},

	/**
	 * 获取Cookie
	 * @param  {String} name cookie键值
	 * @return {String}      cookie值
	 */
	getCookie : function(name){
		var strcookie=document.cookie;
		var arrcookie=strcookie.split("; ");
		for(var i=0;i<arrcookie.length;i++){
			var arr=arrcookie[i].split("=");
			if(arr[0]==name) return unescape(arr[1]);
		}
		return null;
	},

	/**
	 * 删除Cookie
	 * @param  {String} name cookie 键值
	 */
	delCookie : function(name){
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval=getCookie(name);
		if(cval!=null) document.cookie= name + "="+cval+"; path=/;expires="+exp.toGMTString();
	},

	/**
	 * 获得 n 月后的日期
	 * @return {number} 时间戳（毫秒）
	 */
	 /**
	  * 获得 n 月后的日期
	  * @param  {Number} dateTimestamp 起始日期时间戳
	  * @param  {Number} month         xx月以后
	  * @return {Number}               时间戳
	  */
	getMonthsLater : function(dateTimestamp,month){
		var date = new Date(dateTimestamp);
		date.setMonth(date.getMonth() + parseInt(month));
		return date.getTime();
	},

	/**
	 * 获得 n 天后的日期
	 * @return {number} 时间戳（毫秒）
	 */
	 /**
	  * 获得 n 天后的日期
	  * @param  {Number} dateTimestamp 起始日期时间戳
	  * @param  {Number} day         xx月以后
	  * @return {Number}               时间戳
	  */
	getDayLater : function(dateTimestamp, day){
		var oneday = 24*3600*1000;
		var date = new Date(dateTimestamp);
		var time = date.getTime() - day * oneday;
		return time;
	},

	/**
	 * 字符串转日期
	 * @param  {[type]} format  [description]
	 * @param  {[type]} dateStr [description]
	 * @return {[type]}         [description]
	 */
	strToDate : function(format,dateStr){

	},

	/**
	 * 日期函数，模仿PHP
	 * @param  {[type]} format    日期格式化 yyyy/mm/dd hh:ii:ss
	 * @param  {[type]} timestrap 时间戳，不设置为当前时间戳
	 * @return {[type]}           [description]
	 */
	date : function(format,timestrap){

		var date = timestrap ? new Date(timestrap) : new Date();
		var dateStr = format;

		var dateYear = date.getFullYear();
		var dateMonth = date.getMonth()<9 ? '0'+(date.getMonth()+1) : (date.getMonth()+1);
		var dateDate = date.getDate()<10 ? '0'+date.getDate() : date.getDate();
		var dateHour = date.getHours()<10 ? '0'+date.getHours() : date.getHours();
		var dateMinute = date.getMinutes()<10 ? '0'+date.getMinutes() : date.getMinutes();
		var dateSecond = date.getSeconds()<10 ? '0'+date.getSeconds() : date.getSeconds();

		dateStr = dateStr.replace('yyyy',dateYear);
		dateStr = dateStr.replace('mm',dateMonth);
		dateStr = dateStr.replace('dd',dateDate);
		dateStr = dateStr.replace('hh',dateHour);
		dateStr = dateStr.replace('ii',dateMinute);
		dateStr = dateStr.replace('ss',dateSecond);

		return dateStr;

	},

	/**
	 * 生日转周岁
	 * @param  {String} dateString 生日日期,如：1982/8/8
	 * @return {Int} 周岁
	 */
	birthdayToAge : function(dateString){

		if($.trim(dateString) === '') return false;
		dateString = new Date(Date.parse(dateString));
		var nowDate = new Date();
		var betweenYear = nowDate.getFullYear() - dateString.getFullYear();
		var betweenMonth = dateString.getMonth()-nowDate.getMonth();
		if(betweenMonth>0)
		{
			betweenYear--;
		}
		else if(betweenMonth == 0 && (dateString.getDate()-nowDate.getDate())>0)
		{
			betweenYear--;
		}
		return betweenYear;
	},

	/**
	 * 文件字节转友好字符串
	 * @param  {Int} bytes 字节数
	 * @return {String}       转换后的文件尺寸
	 */
	byteToFirendly : function(bytes){
		if (bytes < 1024)
			return bytes + 'b';
		else if (bytes < 1048576)
			return (bytes / 1024).toFixed(2) + 'K';
		else if (bytes < 1073741824)
			return (bytes / 1048576).toFixed(2)  + 'M';
		else
			return (bytes / 1073741824).toFixed(2)  + 'G';
	},

	/**
	 * 格式化数字为逗号分割（1,000,000）
	 * @param  {Number} num 待转换的数字
	 * @return {String}     转换后的便于阅读的数字字符串
	 */
	numberToFirendly: function(num) {
		var temp = String(num).split('.');
		var formatNumber = function(num) {
			if (num.length <= 3) {
				return num;
			} else {
				return formatNumber(num.substr(0, num.length - 3)) + ',' + num.substr(num.length - 3);
			}
		};
		temp[0] = formatNumber(temp[0]);
		return temp.join('.');
	},

	/**
	 * 生成随机整数
	 * @param  {Int} min 随机数区间开始值
	 * @param  {Int} max 随机数区间结束值
	 * @return {Int}     随机数
	 */
	rand : function(min,max){
		var range = max - min;
		var rand = Math.random();
		return(min + Math.round(rand * range));
	},

	/**
	 * 获取密码强度
	 * @param  {string} pswd 密码字符串
	 * @return {number}      密码强度等级1-4,4最高级
	 */
	getPasswordStrong : function(pswd){
		var modes = 0;
		if (str.length < 6) return modes;
		if (/\d/.test(str)) modes++;
		if (/[a-z]/.test(str)) modes++;
		if (/[A-Z]/.test(str)) modes++;
		if (/\W/.test(str)) modes++;
		switch (modes) {
			case 1:
				return 1;
				break;
			case 2:
				return 2;
			case 3:
			case 4:
				return str.length < 12 ? 3 : 4;
				break;
		}
	},
	/**
	 * 序列化表单元素
	 * @param  {node} node 节点
	 * @return {Object}
	 */
	serializeObj: function(node){
		var paramsArr = $(node).serializeArray();//序列化数组
		var paramsObj = {};//序列化对象
		var params = {};

		paramsArr.forEach(function(data){

			if(paramsObj[data.name])
			{
				if($.isArray(paramsObj[data.name]))
				{
					paramsObj[data.name].push(data.value);
				}
				else
				{
					paramsObj[data.name]=[paramsObj[data.name],data.value];
				}
			}
			else
			{
				paramsObj[data.name]=data.value;
			}

		});

		return paramsObj;
	},

	/**
	 * 去掉字符串中的空格
	 * @param  {[type]} str [description]
	 * @return {[type]}     [description]
	 */
	trim: function(str){
        return str.replace(/\s/g,"");
	},

	/**
	 * 去掉字符串两侧空格
	 * @param  {[type]} str [description]
	 * @return {[type]}     [description]
	 */
	lrTrim: function(str){
		return str.replace(/(^\s*)|(\s*$)/g, "");
	},

	/**
	 * 去掉字符串左侧空格
	 * @param  {[type]} str [description]
	 * @return {[type]}     [description]
	 */
	lTrim: function(str){
		return str.replace(/(^\s*)/g, "");
	},

	/**
	 * 去掉字符串右侧空格
	 * @param  {[type]} str [description]
	 * @return {[type]}     [description]
	 */
	rTrim: function(str){
		return str.replace(/(\s*$)/g, "");
	},

	/**
     * [isWeiXin 判断是否是微信浏览器]
     * @return {Boolean} [description]
     */
    isWeiXin: function() {
        var ua = window.navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        }
        else {
            return false;
        }
    },

    /**
     * [isMobile 判断是否是移动端]
     * @type {Object}
     */
    isAndroid: function() {
        return navigator.userAgent.match(/Android/i) ? true : false;
    },
    isBlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i) ? true : false;
    },
    isIos: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
    },
    isWindows: function() {
        return navigator.userAgent.match(/IEMobile/i) ? true : false;
    },
    isMobile: function() {
        return (this.isAndroid() || this.isBlackBerry() || this.isIos() || this.isWindows() || this.isWeiXin());
    },

    /**
	 * 获取滚动位置信息
	 * @param  {[type]} element [description]
	 * @return {[type]}         [description]
	 */
	getScrollTop: function(element){
		if(element){
			return element.scrollTop;
		}else {
			return document.documentElement.scrollTop;
		}
	},

	/**
	 * 获取可是区域高度
	 * @param  {[type]} element [description]
	 * @return {[type]}         [description]
	 */
	getVisibleHeight: function(element){
		if(element){
			return element.offsetHeight;
		}else {
			return document.documentElement.offsetHeight;
		}
	},

	/**
	 * 获取滚动区域高度
	 * @param  {[type]} element [description]
	 * @return {[type]}         [description]
	 */
	getScrollHeight: function(element){
		if(element){
			return element.scrollHeight;
		}else {
			return document.documentElement.scrollHeight;
		}
	},

	/**
	 * 企业端与个人端转换器
	 * @param  {[type]} url  [description]
	 * @param  {[type]} type [description]
	 * @return {[type]}      [description]
	 */
	switchCP: function(url, type){
		var enable = 1;
		var msg = '';
		if(php_session == undefined){
			core.error('未获取到用户权限，请重新登录。<br/>如果登录后仍未获取到用户权限，请联系系统管理员！');
			return ;
		}
		if(type == 'company'){
			enable = php_session.enable_company;
    		msg = '企业端已到期，请到个人中心购买服务';
    	}else if(type == 'person'){
    		enable = php_session.enable_person;
    		msg = '个人端已到期，请到个人中心购买服务';
    	}
        if(enable == 0){
        	core.error(msg);
        }else if(enable == 1){
            core.redirect(url);
        }else if(enable == 2){
            core.error('您没有该菜单的权限');
        }
    },

    /**
     * 替换手机号码中间四位
     * @param  {[type]} tel [description]
     * @return {[type]}     [description]
     */
    changePhoneNo: function(tel){
		var reg = /^(\d{3})\d{4}(\d{4})$/;
		tel = tel.replace(reg, "$1****$2");
		return tel;
    },

	/**
	 * 加载dot数据
	 * @param  {[type]} data   [description]
	 * @param  {[type]} tmpl   [description]
	 * @param  {[type]} target [description]
	 * @return {[type]}        [description]
	 */
	loadDoT: function(data, tmpl, target){
		var interText = doT.template(tmpl.text());
		target.html(interText(data));
	}

};

if(module) module.exports = utils;