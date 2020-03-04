<template>
  <!-- 产品参数控件 -->
  <!-- 动态绑定is_fixed样式 -->
  <div class="nav-bar" :class="{'is_fixed':isFixed}"> 
    <!-- 用container保证安全宽度 -->
    <div class="container">
      <div class="pro-title">
        {{title}}
      </div>
      <div class="pro-param">
        <!-- href="javascript:;" => 默认无法点击 -->
        <a href="javascript:;">概述</a><span>|</span>
        <a href="javascript:;">参数</a><span>|</span>
        <a href="javascript:;">用户评价</a>
        <!-- 按钮插槽 -->
        <slot name="buy"></slot>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    name:'nav-bar',
    props:{
      title:String
    },
    data(){
      return {
        isFixed:false //吸顶式要固定，默认为false
      }
    },
    mounted(){
      window.addEventListener('scroll',this.initHeight) //滚动时绑定高度
    },
    methods:{
      initHeight(){
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;  //根据浏览器的兼容性不同，这三个总能取到一个
        this.isFixed = scrollTop > 152? true:false;
      }
    },
    destroyed(){  //页面销毁时把该事件销毁，否则在别的页面也会加载
      window.removeEventListener('scroll',this.initHeight,false)
    }
  }
</script>
<style lang="scss">
  @import './../assets/scss/config.scss';
  @import './../assets/scss/mixin.scss';
  .nav-bar{
    height:70px;
    line-height:70px;
    border-top:1px solid $colorH;
    background-color:$colorG;
    z-index:10;
    &.is_fixed{
      position:fixed;
      top:0;
      width:100%; //父容器宽度只有1226,fixed后要设置其宽度使其撑满
      box-shadow: 0 5px 5px $colorE;  //fixed之后加一个阴影
    }
    .container{
      @include flex();
      .pro-title{
        font-size:$fontH;
        color:$colorB;
        font-weight:bold;
      }
      .pro-param{
        font-size:$fontJ;
        span{
          margin:0 10px;  //上下间隔为0，左右间隔为10px
        }
        a{
          color:$colorC;
        }
      }
    }
  }
</style>