<template>
  <div class="home">
    <!-- 首页的顶部 -->
    <van-nav-bar title="首页" fixed />
    <!-- 频道栏 -->
    <div class="mytabs">
      <van-tabs>
        <van-tab v-for="index in 6" :key="index" :title="'标签 ' + index">
          <!-- 列表 -->
          <!-- v-model：设置当前 list 是否处理加载状态 如果 v-model 为 true 那么不会再次执行 load 事件-->
          <!-- finished：设置当前 List 中的数据是否加载完毕 -->
          <!-- finished-text：设置当 list 将数据加载完成之后再次上拉时显示的文字 -->
          <!-- load：1）当页面加载时会默认调用一次，2）当上拉触底时，会触发这个方法 -->
          <!-- 这个方法有个坑：会自动将 list 中的 v-model 中对应属性设置 true,并且不自动设置为 false,在使用时，需要手动设置为 false -->
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="item in 14" :key="item" :title="item" />
          </van-list>
        </van-tab>
      </van-tabs>
      <!-- 频道右边小图标 -->
      <div class="tab-icon">
        <van-icon name="apps-o" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // list 中的
      loading: false,
      // list
      finished: false,
      // list中的数据源
      list: []
    }
  },
  methods: {
    onload () {}
  }
}
</script>

<style lang="less" scoped>
.van-nav-bar.van-hairline--bottom {
  background-color: #0094ff;
  .van-nav-bar__title {
    color: #fff;
  }
}
.mytabs {
  // 相对定位
  position: relative;
  .tab-icon {
    // 绝对定位
    position: fixed;
    top: 50px;
    right: 0;
    width: 10%;
    height: 44px;
    text-align: center;
    line-height: 44px;
    font-size: 30px;
  }
}
// 深度选择器
.home /deep/ .van-tabs__wrap {
  width: 90%;
  position: fixed;
  top: 47px;
  left: 0;
  z-index: 1000;
}
.home {
  margin-top: 97px;
  margin-bottom: 50px;
}
</style>
