<!--
	Demo
	<ui-dialog :width="700" :height="600" :show.sync="true">
		<div slot="header">标题</div>
		<div slot="content">传递过来的内容</div>
		<div slot="footer">
			<button class="btn btn-primary">确定</button>
			<button class="btn btn-default" @click="showA = false">取消</button>
		</div>
	</ui-dialog>
-->

<style lang="sass">
@import "../styles/base/_global.scss";
@import "../styles/base/_mixin.scss";

$vue-h5-dialog-padding : 10px;

html.vue-h5-dialog-pop{
	overflow: hidden !important;
}

.vue-h5-dialog-modal{
	position: fixed;
	top:0;
	right:0;
	bottom:0;
	left:0;
	z-index:999;
	background: rgba(0,0,0,0.3);
	overflow: auto;

	.vue-h5-dialog{

		border-radius: $radius;
		// overflow: hidden;
		position: absolute;
		/*top:50%;*/
		/*top:10px;*/
		left:50%;
		box-shadow:0 5px 10px rgba(0,0,0,0.3);
		color: #fff;
		background: $h5-menu-bg-color;
		border-radius: 5px;
		@include translate(-50%,0);

		.vue-h5-dialog-header{
			line-height: 23px;
			padding : $vue-h5-dialog-padding $vue-h5-dialog-padding $vue-h5-dialog-padding $vue-h5-dialog-padding;
			font-size :$font-size-title;
			color : #fff;
			background: rgba(0,0,0,0);
		}

		.vue-h5-dialog-content{
			padding : $vue-h5-dialog-padding/2 $vue-h5-dialog-padding $vue-h5-dialog-padding $vue-h5-dialog-padding;
			font-size :$font-size-info;
			color : #fff;
			line-height:2;
			input,select,textarea{
				// border: none;
				border: 1px solid $h5-border-color;
				background: rgba(0,0,0,0);
				color: #fff;
			}
			label{
				color: #fff;
			}
		}

		.vue-h5-dialog-footer{
			padding : $vue-h5-dialog-padding/2 $vue-h5-dialog-padding $vue-h5-dialog-padding $vue-h5-dialog-padding;
			font-size :$font-size-title;
			color : $color-title;
			text-align: center;
			.btn + .btn {
				margin-left: 10px;
			}
			.btn{
				min-width: 80px;
			}
		}

		.vue-h5-dialog-close{
			font-size: 30px;
			color:#fff;
			position: absolute;
			top:5px;
			right:20px;
			line-height: 1;
			cursor: pointer;

			&:hover{
				@include scale(1.2);
			}

		}
		.form-group {
			p {
				color: $color-title;
				margin-bottom: 10px;
			}
		}
	}
	.vue-h5-dialog-tips {
	    strong {
	        display: block;
	        color: $color-title;
	        text-align: center;
	        font-size: 16px;
	        margin-bottom: 20px;
	    }
	    p {
	        margin: 0 auto;
	        padding: 5px 0;
	        width: 300px;
	        color: $color-info
	    }
	    .btn-box {
	        text-align: center;
	        padding-bottom: 20px;
	    }
	}
}


</style>

<template>

<div class="vue-h5-dialog-modal" transition="vue-fade" v-show="show" tabindex="1" @keyup.esc="show = false" @dblclick="show = false" v-cloak>
	<div class="vue-h5-dialog" :style="{width : width+'px',height : height+'px'}"  @dblclick.stop>
		<div class="vue-h5-dialog-close" @click="show = false">
			<slot name="close">×</slot>
		</div>
		<div class="vue-h5-dialog-header">
			<slot name="header"></slot>
		</div>
		<div class="vue-h5-dialog-content">
			<slot name="content"></slot>
		</div>
		<div class="vue-h5-dialog-footer">
			<slot name="footer"></slot>
		</div>
	</div>
</div>
</template>

<script>
module.exports = {

	props : {
		width : {default: 500 },
		height : Number,
		show : {default:false}
	},
	data : function(){
		return {
			width:500,
			height:300
		};
	},

	methods : {
		resize : function(){
			var $el = $(this.$el);
			var $dialog = $el.find('.vue-h5-dialog');
			var top = ($el.height() - $dialog.height()) /2;
			if(top<=0) top = 0;
			$dialog.css({top:top});
		}
	},

	watch: {
		'show': function (val, oldVal) {
			if(val){
				var that = this;
				this.resize();
				this.$el.focus();
				// $(that.$el).find('textarea,input:not(:hidden)').eq(0).focus();
				$('html').addClass('vue-h5-dialog-pop');
			}
			else
			{
				$('html').removeClass('vue-h5-dialog-pop');
			}
		},
	}
}
</script>