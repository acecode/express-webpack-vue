<template>
    <div class="page1">
        <div>{{msg}}</div>
    </div>
</template>
<style lang="stylus" scoped>
    .page1
        background rgba(255,0,0,0.3)
</style>
<script>
export default{
  data() {
    return {
      msg: 'hello vue',
    };
  },
};
</script>
