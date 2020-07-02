<template>
    <div>
        
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    created(){
        if(confirm("你确定要退出吗?")){
            this.$router.push('/')
        }else{
            this.$router.push('/home')
        }
    }
}
</script>
<style  scoped>

</style>