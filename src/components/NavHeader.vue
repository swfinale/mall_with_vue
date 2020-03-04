<template>
  <div class="header">
    <!-- 顶部条 -->
    <div class="nav-topbar">
      <!-- 加一个container控制一下 -->
      <div class="container">
        <div class="topbar-menu">
          <a href="javascript:;">小米商城</a>
          <a href="javascript:;">MUI</a>
          <a href="javascript:;">云服务</a>
          <a href="javascript:;">协议规则</a>
        </div>
        <div class="topbar-user">
          <a href="javascript:;" v-if="username">{{username}}</a>
          <a href="javascript:;" v-if="!username" @click="login">登录</a>
          <a href="javascript:;" v-if="username" @click="logout">退出</a>
          <a href="/#/order/list" v-if="username">我的订单</a>
          <a href="javascript:;" class="my-cart" @click="goToCart"><span class="icon-cart"></span>购物车({{cartCount}})</a>
        </div>
      </div>
    </div>
    <!-- 导航 -->
    <div class="nav-header">
      <div class="container">
        <div class="header-logo">
          <a href="/#/index"></a>
        </div>
        <div class="header-menu">
          <div class="item-menu">
            <span>小米手机</span>
            <!-- 悬浮下拉菜单 -->
            <div class="children">
              <ul>
                <li class="product" v-for="(item,index) in phoneList" :key="index">
                  <a v-bind:href="'/#/product/'+item.id" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="item.mainImage" :alt="item.subtitle">
                    </div>
                    <div class="pro-name">{{item.name}}</div>
                    <div class="pro-price">{{item.price | currency}}</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="item-menu">
            <span>RedMi红米</span>
          </div>
          <div class="item-menu">
            <span>电视</span>
            <div class="children">
              <ul>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-1.jpg'" alt="">
                    </div>
                    <div class="pro-name">小米壁画电视 65英寸</div>
                    <div class="pro-price">6999元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-2.jpg'" alt="">
                    </div>
                    <div class="pro-name">小米全面屏电视E55A</div>
                    <div class="pro-price">1999元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-3.png'" alt="">
                    </div>
                    <div class="pro-name">小米电视4A 32英寸</div>
                    <div class="pro-price">699元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-4.jpg'" alt="">
                    </div>
                    <div class="pro-name">小米电视4A 55英寸</div>
                    <div class="pro-price">1799元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-5.jpg'" alt="">
                    </div>
                    <div class="pro-name">小米电视4A 65英寸</div>
                    <div class="pro-price">2699元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-6.png'" alt="">
                    </div>
                    <div class="pro-name">查看全部</div>
                    <div class="pro-price">查看全部</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="header-search">
          <div class="wrapper">
            <input type="text" name="keyword">
            <!-- href写一个js脚本防止它跳转 -->
            <a href="javascript:;"></a> 
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  export default{
    name:'nav-header',
    data(){ //定义成function是为了作为局部data
      return {
        phoneList:[]
      }
    },
    computed:{
      /*username(){
        return this.$store.state.username;
      },
      cartCount(){
        return this.$store.state.cartCount;
      }*/
      ...mapState(['username','cartCount'])
    },
    filters:{ //金额格式化
      currency(val){
        if(!val)return '0.00';
        return '￥' + val.toFixed(2) + '元';
      }
    },
    mounted(){
      this.getProductList();
      let params = this.$route.params;
      if(params && params.from == 'login'){
        this.getCartCount();
      }
    },
    methods:{
      login(){
        this.$router.push('/login');
      },
      getProductList(){
        this.axios.get('/products',{
          params:{  //get请求要用params
            categoryId:'100012',
            pageSize:6  //取六条
          }
        }).then((res)=>{
          this.phoneList = res.list;
        })
      },
      getCartCount(){
        this.axios.get('/carts/products/sum').then((res=0)=>{
          this.$store.dispatch('saveCartCount',res);
        })
      },
      logout(){
        this.axios.post('/user/logout').then(()=>{
          this.$message.success('退出成功');
          this.$cookie.set('userId','',{expires:'-1'});
          this.$store.dispatch('saveUserName','');
          this.$store.dispatch('saveCartCount','0');
        })
      },
      goToCart(){
        this.$router.push('/cart'); //路由跳转
      }
    }
  }
</script>
<style lang="scss"> // 定义style的语法
  @import './../assets/scss/base.scss'; //在base定义了container以复用
  @import './../assets/scss/mixin.scss';
  @import './../assets/scss/config.scss';
  // scss语法可以嵌套
  .header{
    .nav-topbar{
      height:39px;
      line-height:39px; //高度和行高相同
      background-color:#333333;
      color:#B0B0B0;
      .container{ //在base定义了container以复用
        @include flex();
        a{
          display:inline-block;
          color:#B0B0B0;  //a标签有自带的颜色，不会被外层样式覆盖，所以要额外定义
          margin-right:17px;
        }
        .my-cart{
          width:110px;
          background-color:#FF6600;
          text-align:center;
          color:#ffffff;
          margin-right:0;
          .icon-cart{
            @include bgImg(16px,12px,'/imgs/icon-cart-checked.png');
            margin-right:4px; //图标和右边的字体留4px间隔
          }
        }
      }
    }
    .nav-header{
      .container{
        position:relative;
        height:112px; //容器高度112px
        @include flex();  //调用mixin里的flex方法
        // header-logo定义在base.scss里
        .header-menu{
          display:inline-block;
          width:643px;
          padding-left:209px;
          .item-menu{
            display:inline-block; //使大标题水平排列
            color:#333333;
            font-weight:bold;
            font-size:16px;
            line-height:112px;  //定义行高112px，垂直居中
            margin-right:20px;
            span{
              cursor:pointer; //鼠标移上去会显示一个小手
            }
            &:hover{
              color:$colorA;
              .children{
                height:220px;
                opacity:1;  //hover时将.children的opacity设为1
              }
            }
            .children{
              position:absolute;  //绝对定位
              top:112px;
              left:0;
              width:1226px;
              height:0; //默认高度为0，使其隐藏
              opacity:0;
              overflow:hidden;  //voerflow隐藏
              border-top:1px solid #E5E5E5; //上面1px的边框
              box-shadow:0px 7px 6px 0px rgba(0, 0, 0, 0.11); //阴影
              z-index: 10;
              transition:all .5s;
              background-color: #ffffff;  //设置一个白的背景色，否则下面的内容会透出来
              .product{
                position:relative;  //&:before要用绝对定位，所以这里要加相对定位
                float:left;
                width:16.6%;
                height:220px;
                font-size:12px;
                line-height:12px;
                text-align: center;
                a{
                  display:inline-block; //把a变成块级的 //a里面的div是块级的
                }
                img{
                  width:auto;
                  height:111px;
                  margin-top:26px;
                }
                .pro-img{
                  height:137px;
                }
                .pro-name{
                  font-weight:bold;
                  margin-top:19px;
                  margin-bottom:8px;
                  color:$colorB;  //调用config里面的颜色2
                }
                .pro-price{
                  color:$colorA;
                }
                &:before{ //伪类
                  content:' ';  //不占位竖线就不会出现
                  position:absolute;
                  top:28px;   //通过绝对定位的方式，加一条竖线
                  right:0;
                  border-left:1px solid $colorF;
                  height:100px;
                  width:1px;
                }
                &:last-child:before{  //去掉最后一个before元素的竖线
                  display:none;
                }
              }
            }
          }
        }
        .header-search{
          width:319px;
          .wrapper{
            height:50px;
            border:1px solid #E0E0E0; //设一个小边框
            display:flex; //居中
            align-items:center; //垂直居中
            input{
              border:none;  //把border干掉，否则input本身有自带样式
              box-sizing: border-box;
              border-right:1px solid #E0E0E0;
              width:264px;
              height:50px;
              padding-left:14px;  //让文本框离左边有点距离
            }
            a{
              @include bgImg(18px,18px,'/imgs/icon-search.png');
              margin-left:17px; //使放大镜图标居中
            }
          }
        }
      }
    }
  }
</style>