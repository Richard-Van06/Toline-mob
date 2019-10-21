<template>
  <div class="login">
    <!-- 页面顶部 -->
    <van-nav-bar title="登录" />
    <!-- 用户输入框 -->
    <van-cell-group>
      <van-field v-model="user.mobile" clearable :error-message="errmsg.mobile" placeholder="请输入手机号">
        <template slot="left-icon">
          <i class="iconfont icon-phone"></i>
        </template>
      </van-field>
      <van-field v-model="user.code" clearable :error-message="errmsg.code" placeholder="请输入验证码">
        <template slot="left-icon">
          <i class="iconfont icon-lock"></i>
        </template>
        <van-button class="mycode" slot="button" size="small" round>发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <!-- 登录按钮 -->
    <div class="login-btn">
      <!-- 给loading 添加动态 -->
      <van-button :loading="loginLoading" loading-text="加载中..." class="l-btn" type="info" size="large" @click="login">确定</van-button>
    </div>
    <!-- 有个隐私条款 -->
  </div>
</template>

<script>
// 单独导入 request文件
// import request from '@/utils/request.js'
// 在完成自己封装的插件后可以删除上面的 request用回 this.$http

// 导入 userLogin
import { userLogin } from '@/Api/user.js'
// import { log } from 'util' 没用过

// 导入userlocal
// import { setUserLocal } from '@/utils/userlocal'

export default {
  data () {
    return {
      // 登录的数据
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      // 验证的错误信息
      errmsg: {
        mobile: '',
        code: ''
      },
      // 加载状态
      loginLoading: false
    }
  },
  methods: {
    // 验证用户信息----是否为空  长度是否满足
    async login () {
      // 参数验证
      if (!this.validData()) {
        // 如果是false 直接跳出login方法 不执行
        return false
      }
      // 登录逻辑
      try {
        // 点击事件触发 发送请求后 开启加载状态
        this.loginLoading = true
        // 开始发送请求 请求数据
        let res = await userLogin(this.$http, {
          url: '/authorizations',
          method: 'POST',
          data: this.user
        })
        // 保存用户信息到localstorage中
        // window.localStorage.setItem('user', JSON.stringify(res.data.data))
        // 在request中 的响应拦截器里 处理了响应回来的response-----在后面加 data.data
        // 下面直接用 res 就行了
        // window.localStorage.setItem('user', JSON.stringify(res.data.data))
        // setUserLocal(res)
        // 将用户信息保存到 vuex 中
        this.$store.commit('setUser', res)
        // 加载状态关闭
        this.loginLoading = false
        // 跳转到 home
        this.$router.push('/home')
      } catch (err) {
        // 提示 错误
        this.$toast.fail('手机号或验证码错误!')
        console.log(err)
        // 提示错误时, 登录按钮加载 旋转不停
        // 需要手动设置
        setTimeout(() => {
          this.loginLoading = false
        }, 2000)
      }
    },
    validData () {
      if (this.user.mobile.trim().length === 0) {
        this.errmsg.mobile = '手机号码不能为空'
        return false
      }
      if (this.user.mobile.trim().length !== 11) {
        this.errmsg.mobile = '请输入正确的手机号'
        return false
      }
      // 将手机号的错误信息设置为空
      this.errmsg.mobile = ''
      if (this.user.code.trim().length === 0) {
        this.errmsg.code = '验证码不能为空'
        return false
      }
      if (this.user.code.trim().length !== 6) {
        this.errmsg.code = '请输入正确的验证码'
        return false
      }
      // 将验证码的错误信息设置为空
      this.errmsg.code = ''
      console.log('验证通过')
      return true
    }
  }
}
</script>

<style scope lang="less">
.van-nav-bar.van-hairline--bottom {
  background-color: #0094ff;
  .van-nav-bar__title {
    color: #fff;
  }
}

.mycode {
  background-color: #eee;
  color: rgb(109, 107, 107);
}

.login-btn {
  margin: 15px;
  .l-btn {
    border-radius: 5px;
  }
}

.login-btn {
  margin: 20px;
  .l-btn {
    border-radius: 10px;
  }
}

</style>
