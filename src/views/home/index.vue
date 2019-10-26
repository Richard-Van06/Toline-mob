<template>
  <div class="home">
    <!-- 首页的顶部 -->
    <van-nav-bar title="首页" fixed />
    <!-- 频道栏 -->
    <div class="mytabs">
      <!-- activeTab就是当前选中频道的下标 -->
      <van-tabs v-model="activeTab">
        <van-tab v-for="(item, index) in channelsList" :key="index" :title="item.name">
        {{ activeTab }}
          <!-- 下拉刷新 -->
          <!-- v-model:  -->
          <!-- v-model="isLoading" 是下拉刷新的状态
           现在的数据源是item, 后面的isloading要更换成item.pull -->
          <van-pull-refresh v-model="item.pull" @refresh="onRefresh">
            <!-- 列表 -->
            <!-- v-model：设置当前 list 是否处理加载状态 如果 v-model 为 true 那么不会再次执行 load 事件-->
            <!-- finished：设置当前 List 中的数据是否加载完毕 -->
            <!-- finished-text：设置当 list 将数据加载完成之后再次上拉时显示的文字 -->
            <!-- load：1）当页面加载时会默认调用一次，2）当上拉触底时，会触发这个方法 -->
            <!-- 这个方法有个坑：会自动将 list 中的 v-model 中对应属性设置 true,并且不自动设置为 false,在使用时，需要手动设置为 false -->
            <van-list v-model="item.up" :finished="item.finished" finished-text="没有更多了" @load="onLoad">
              <van-cell class="mycell" v-for="(subitem, subindex) in item.articleList" :key="subindex" :title="subitem.title" />
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
import { apiGetChannelList } from '@/Api/channel.js'

// 按需导入频道下面的文章数据
import { apiGetChannleArticle } from '@/Api/article.js'

export default {
  data () {
    return {
      // list 中的
      loading: false,
      // list
      finished: false,
      // list中的数据源
      channelsList: [],
      // 设置激活的tab
      // 默认选中的频道下标
      activeTab: 0
    }
  },
  methods: {
    // 页面下滑加载内容
    async onLoad () {
      // 当 打开页面 会执行 list 中的 load事件
      // 得到当前选中的 频道
      let channel = this.channelsList[this.activeTab]
      // 得到当前频道的id
      let channelId = channel.id
      // 定义 timestamp
      let timestamp
      // 判断 当前请求是否是第一次
      if (channel.timestamp === 0) {
        // 当请求是第一次时
        timestamp = Date.now()
      } else {
        // 当请求不是第一次时
        timestamp = channel.timestamp
      }
      // 根据id 请求文章数据
      let res = await apiGetChannleArticle(this.$http2, {
        url: '/articles',
        method: 'GET',
        query: {
          channel_id: channelId, // 需要的频道id
          timestamp: timestamp, // 当前的时间戳
          with_top: 0 // 是否置顶, 0-->不置顶
        }
      })
      // 将数据源追加到当前频道下的 articlelist
      channel.articleList = [...channel.articleList, ...res.results]
      // 将本次返回的时间戳进行保存
      channel.timestamp = res.pre_timestamp
      // 判断返回的数据是否为空
      if (res.pre_timestamp === null) {
        // 说明频道已经加载完成
        channel.finished = true
      }
      // 关闭加载状态
      channel.up = false
    },
    // 下拉后, 顶部内容刷新
    onRefresh () {
      // 得到当前选中的频道
      let channel = this.channelsList[this.activeTab]
      // 清除数据源
      channel.articleList = []
      // 将时间戳 设置为0
      channel.timestamp = 0
      channel.finished = false
      channel.up = false
      // 重新获取数据
      this.onLoad()
      // 将下拉状态重置为false
      channel.pull = false
    },
    // 频道列表数据
    async getChannelList () {
      try {
        // 判断用户是否登录
        // 得到用户信息
        let user = this.$store.state.user
        // 判断 如果没有登录过(游客)
        if (!user) {
          // 获取用户保存在 localStorage 中的频道数据
          let channles = JSON.parse(window.localStorage.getItem('channles'))
          // 判断有频道数据
          if (channles) {
            // 则将数据保存到 channelsList中
            this.channelsList = channles
          } else {
            // 如果没有频道数据,则发送请求到服务器 请求数据
            let res = await apiGetChannelList(this.$http, {
              url: '/user/channels',
              method: 'GET'
            })
            // 将服务器返回的数据 设置给 channelsList
            this.channelsList = res.channels
          }
        } else {
          // 如果登录了
          let res = await apiGetChannelList(this.$http, {
            url: '/user/channels',
            method: 'GET'
          })
          // 将服务器返回的数据 设置给 channelsList
          this.channelsList = res.channels
        }
      } catch (error) {
        this.$toast.fail('获取信息失败')
      }
      // 动态向 channlesLIst 中添加额外的属性
      this.addProtoToChannles()
    },
    // 向数据源 channelsList中 添加加额外数据(响应式的)
    addProtoToChannles () {
      // 给 channelsList 中的数据添加额外属性
      this.channelsList.forEach(item => {
        // 下拉状态
        this.$set(item, 'pull', false)
        // 上拉的状态
        this.$set(item, 'up', false)
        // 数据完结的状态
        this.$set(item, 'finished', false)
        // 文章数据的集合
        this.$set(item, 'articleList', [])
        // 添加一个 timestampe
        this.$set(item, 'timestamp', 0)
      })
      console.log(this.channelsList)
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
.mycell {
  line-height: 100px;
}
</style>
