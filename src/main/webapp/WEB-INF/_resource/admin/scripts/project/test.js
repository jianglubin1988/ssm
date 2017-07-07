require('../common/common.js');
require('../../styles/project/test.scss');
$(function(){

	new Vue({
		el: 'body',
		data: {

		},

		methods: {
			init: function(){
				console.log('hahaha');
			}
		},

		ready: function(){
			this.init();
		}

	});

})