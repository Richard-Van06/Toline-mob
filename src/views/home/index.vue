<template>
  <div class="home">
    <!-- 首页的顶部 -->
    <van-nav-bar title="首页" fixed />
    <!-- 频道栏 -->
    <div class="mytabs">
      <van-tabs>
        <van-tab v-for="(item, index) in ChannelsList" :key="index" :title="item.name">
          <!-- 下拉刷新 -->
          <!-- v-model:  -->
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <!-- 列表 -->
            <!-- v-model：设置当前 list 是否处理加载状态 如果 v-model 为 true 那么不会再次执行 load 事件-->
            <!-- finished：设置当前 List 中的数据是否加载完毕 -->
            <!-- finished-text：设置当 list 将数据加载完成之后再次上拉时显示的文字 -->
            <!-- load：1）当页面加载时会默认调用一次，2）当上拉触底时，会触发这个方法 -->
            <!-- 这个方法有个坑：会自动将 list 中的 v-model 中对应属性设置 true,并且不自动设置为 false,在使用时，需要手动设置为 false -->
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
              <van-cell v-for="item in list" :key="item" :title="item" />
            </van-list>
          </van-pull-refresh>
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

// 按需导入请求频道的方法
import { apiGetChannelList } from '@/Api/channel'

export default {
  data () {
    return {
      // list 中的
      loading: false,
      // list
      finished: false,
      // list中的数据源
      ChannelsList: [],
      // 下拉刷新组件的状态
      isLoading: false
    }
  },
  methods: {
    // 页面下滑加载内容
    onLoad () {
      // 扩展运算符(三点运算符)
      // 前面的数据源(this.list) 加上后面加载的10条数据(更新的数据)
      // 让list 在原有数据的基础上再添加 1-10个数据
      this.list = [...this.list, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
      // 判断内容触底, 不能再下拉
      if (this.list.length >= 80) {
        // 已经加载完成
        this.finished = true
      }
      console.log('3211')
      // 重新设置v-model中的loading的值
      this.loading = false
    },
    // 下拉后, 顶部内容刷新
    onRefresh () {
      // 重新加载list 内容列表
      this.list = []
      this.onLoad()
      this.isLoading = false
    },
    // 频道列表数据
    async getChannelList () {
      try {
        let res = await apiGetChannelList(this.$http, {
          url: '/user/channels',
          method: 'GET'
        })
        console.log(res)
        // 将频道列表信息保存到 ChannelsList 中
        this.ChannelsList = res.channels
      } catch (error) {
        this.$toast.fail('获取信息失败')
      }
    }
  },
  // 打开网页开始加载
  created () {
    // 加载频道列表的数据
    this.getChannelList()
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
