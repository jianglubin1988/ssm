<!-- <input-file :file-type="['xls', 'xlsx']" :max-size="10485760"></input-file> -->
<style lang="sass">
	input[type="file"] {
		line-height: 1
	}
</style>

<template>
	<input type="file" accept="{{accept}}" name="{{name}}" @change="change">
</template>

<script>
module.exports = {
	props: {
        fileType: Array,   //文件格式
        maxSize: Number,    //文件大小
        name: String       //input name
    },
    data: function(){
        return {accept: ''}
    },
    ready: function(){
        var that = this;
        $.each(this.fileType, function(i, v){
            if(i == 0){
                that.accept += '.'+v
            }else{
                that.accept += ',.'+v
            }
        })
    },
	methods : {
		change: function(e){
            var files = e.target.files || e.dataTransfer.files;
            var file = files[0];
            var filename = file.name;
            var postfix = filename.substring(filename.lastIndexOf('.') + 1).toLowerCase(); //文件后缀

            if($.inArray(postfix, this.fileType) == -1){
                core.error('请上传正确的文件格式')
                e.target.value = ''
                return
            }

            if(file.size > this.maxSize){
                core.error('上传文件的大小不能超过2MB，请修改后重新上传')
                e.target.value = ''
                return
            }
        }
	}
}
</script>