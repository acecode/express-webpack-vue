<template>
    <div class="page2">
        <div>{{msg}}</div>
    </div>
</template>
<style lang="stylus" scoped>
    .page2
        background rgba(0,255,0,0.3)
</style>
<script>
export default{
  data() {
    return {
      msg: 'Here is Page2',
    };
  },
};
</script>
