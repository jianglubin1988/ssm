
<!-- 
demo:
<ui-upload-image :max-count="4" :file-type="['jpg', 'png']" :max-size="10485760" @error="uploadError"></ui-upload-image>

-->


<template>
    <div class="ui-upload" v-for="img in imgs">
        <img :src="" class="zoomify" v-if="zoom != 0">
        <img :src="" v-if="zoom == 0">
        <span>+ 点此上传</span>
        <input type="file" name="{{name}}" @change="change" accept="{{accept}}"/>
        <i @click="del(img)">删除</i>
    </div>
</template>

<script>
module.exports = {
	props: {
        postUrl: String,   //上传地址
        fileType: Array,   //文件格式
        maxSize: Number,   //文件大小
        maxCount: Number,  //文件个数
        name: String,      //input name
        zoom: Number
    },
    data: function(){
        return {
            isUpload: false,     //是否开始上传
            isUploaded: false,    //是否上传完成
            zoom: 1,
            count: 0,
            imgs: ['0'],
            accept: ''
        }
    },
    watch: {
        'maxCount': function(val, oldVal){
            if(oldVal == this.count){
                this.imgs.push(new Date().getTime())
            }
        }
    },
    ready: function(){
        console.log(this.maxCount)
        if(this.maxCount == 0){
            this.imgs = []
        }
        var that = this;
        $.each(this.fileType, function(i, v){
            if(i == 0){
                that.accept += '.'+v
            }else{
                that.accept += ',.'+v
            }
        })
    },
    methods: {
        change: function(e){
            var files = e.target.files || e.dataTransfer.files;
            var file = files[0];
            var filename = file.name;
            var postfix = filename.substring(filename.lastIndexOf('.') + 1).toLowerCase(); //文件后缀
            var img = $(e.target).parent('.ui-upload').find('img');

            if($.inArray(postfix, this.fileType) == -1){
                this.$emit('error', 'type');
                return
            }

            if(file.size > this.maxSize){
                this.$emit('error', 'size');
                return
            }
            
            var reader = new FileReader();
            var _this = this;
            var input = e.target;
            reader.readAsDataURL(file);
            reader.onload = function(e) {
                $(input).parent('.ui-upload').addClass('checked')
                img.attr('src', e.target.result);
                
                $('.ui-upload .zoomify').zoomify();
                
                _this.count = _this.count + 1;
                if(_this.count == _this.maxCount){
                    return false
                }
                _this.imgs.push(new Date().getTime())
            }
        },
        del: function(img){
            var index = $.inArray(img, this.imgs);
            this.imgs.splice(index, 1);
            this.count = this.count - 1;

            if(this.maxCount - this.count == 1 || this.maxCount == 1){
                this.imgs.push(new Date().getTime())
            }
        }
    }
}
</script>