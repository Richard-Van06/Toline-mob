<template>
  <div>
    <!-- 频道管理的弹窗 -->
    <!-- 弹出层 -->
    <van-popup :value="value" @input="$emit('input', false)" position="bottom" :style="{ height: '80%' }">
    <!-- 弹窗内容 -->
    <!-- 我的频道 -->
      <div>
        <van-cell title="我的频道" title-class="fontS">
          <tamplate slot="default">
            <van-button v-if="iconshow===false" @click="iconshow=true" class="channelbtn" size="small" round plain hairline type="warning">编辑</van-button>
            <van-button v-if="iconshow===true" @click="iconshow=false" class="channelbtn" size="small" round plain hairline type="warning">完成</van-button>
          </tamplate>
        </van-cell>
        <!-- 频道部分 -->
        <van-grid clickable>
          <van-grid-item  class="channelword" v-for="(item, index) in channelsList" :key="index">
            <tamplate slot="text">
              <div>
                <div class="channelsListS">
                  {{ item.name }}
                </div>
                <van-icon v-show="iconshow" class="channelicon" name="clear" />
              </div>
            </tamplate>
          </van-grid-item>
        </van-grid>
      </div>
    <!-- 其他频道 -->
      <div>
        <van-cell title="其他频道" title-class="fontS">
        </van-cell>
        <!-- 频道部分 -->
        <van-grid clickable>
          <van-grid-item text="推荐" v-for="value in 8" :key="value"/>
        </van-grid>
      </div>
    </van-popup>
    <!-- v-model 在组件中的使用 -->
    <!-- 给子组件添加一个属性:value  给子组件添加一个事件: input -->
  </div>
</template>

<script>
export default {
  props: ['value', 'channelsList'],
  data () {
    return {
      // // 控制弹窗的显示与隐藏
      // show: false
      // 默认隐藏删除选项
      iconshow: false
    }
  },
  methods: {
    getAllChannels () {

    }
  },
  created () {
    // 请求所有的频道数据
    this.getAllChannels()
  }
}
</script>

<style lang="less" scoped>
.channelbtn {
  font-size: 14px;
}
.fontS{
  font-size: 18px;
}
.channelword {
  position: relative;
  .channelicon {
    position: absolute;
    top: 0;
    right: 0;
    color:#ccc;
  }
}
.channelsListS{
  font-size: 14px;
  color: rgb(167, 159, 159);
}
</style>
