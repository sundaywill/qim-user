<template>
  <el-container class="h-screen flex items-stretch" v-if="auth_user">
    <el-aside width="60px"
              class="w-12 h-full bg-gray-900 text-white px-1 py-6 flex flex-col items-center justify-between">
      <div class="grid grid-cols-1 place-items-center gap-2">
        <router-link to="/" class="w-12 h-12 flex items-center justify-center">
          <el-avatar shape="square" :src="oss_url + auth_user.avatar"></el-avatar>
        </router-link>
        <router-link :to="{ name: 'Index' }"
                     :class="$route.name === 'Index' ? 'text-green-400' : ''"
                     class="w-12 h-12 flex items-center justify-center hover:text-green-500">
          <el-icon name="chat-dot-round" class="text-2xl"></el-icon>
        </router-link>
      </div>
      <div class="grid grid-cols-1 place-items-center gap-2">
        <router-link to="/" class="w-12 h-12 flex items-center justify-center hover:text-green-500">
          <el-icon name="setting" class="text-2xl"></el-icon>
        </router-link>
      </div>
    </el-aside>
    <router-view ref="chat"></router-view>
  </el-container>
</template>

<script>
import { remote } from 'electron'
import {mapState} from 'vuex'
import {oss} from '@/mixins'

export default {
  name: "Home",
  mixins: [oss],
  computed: {
    ...mapState(['auth_user', 'chat'])
  },
  created() {
    this.$store.dispatch('fetchAuthUser').then(data => {
      this.linkStart()
    })
  },
  methods: {
    linkStart() {
      Echo.private(`App.Models.User.${this.auth_user.id}`)
          .notification((notification) => {
            console.log(notification)
            if (notification.type === 'MessageSent') {
              this.messageSent(notification?.message)
            }
          })
    },
    messageSent(message) {
      if (message) {
        if (this.chat?.to_id === message.user_id) {
          this.$store.commit('FETCH_MESSAGE', message)
          let win = remote.getCurrentWindow()
          if (win.isMinimized()) {
            new Notification(message?.user_name, {
              body: message?.content,
              timestamp: 1000
            })
          }
        }
      }
    },
  }
}
</script>
