<template>
  <div class="h-full w-full flex items-stretch bg-white">
    <div class="h-full w-full flex flex-col flex-grow" v-if="chat">
      <div class="w-full flex items-center justify-between p-1 bg-gray-100 border-b">
        <div class="flex items-center p-1" v-if="chat.to_id > 0">
          <div class="flex items-center p-1">
            <el-avatar size="small" :src="oss_url + chat.to_avatar"></el-avatar>
          </div>
          <div class="text-gray-800 text-base p-1">客服{{ chat.to_name }}</div>
        </div>
        <div class="flex items-center p-1" v-else>
          <div class="text-gray-800 text-base p-1">客服正在忙，请等待</div>
        </div>
      </div>
      <div class="w-full flex-grow flex items-stretch overflow-hidden">
        <div class="w-full overflow-y-auto" v-chat-scroll="scroll_config">
          <div class="w-full p-2 flex items-center justify-center">
            <button
                class="appearance-none focus:outline-none text-xs rounded-full px-6 py-2 bg-gray-200 text-gray-500 hover:bg-gray-300 hover:text-gray-600"
                @click="fetchMessages" v-if="more">加载更早的消息</button>
            <div class="text-xs rounded-full px-6 py-2 bg-gray-200 text-gray-500" v-else>没有更多了</div>
          </div>
          <div class="w-full" :key="'message-' + index" v-for="(item, index) in messages" v-if="messages">
            <chat-message :item="item" :right="item.user_id === chat.user_id"></chat-message>
          </div>
        </div>
      </div>
      <div class="w-full h-48 border-t flex items-stretch">
        <chat-input ref="inputer" :chat="chat" @sent="messageSent"></chat-input>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {oss, scroll} from "@/mixins"
import {CoffeeIcon, XCircleIcon} from 'vue-feather-icons'
import ChatMessage from '../components/ChatMessage'
import ChatInput from "../components/ChatInput"

export default {
  name: "Index",
  mixins: [oss, scroll],
  components: {
    CoffeeIcon,
    XCircleIcon,
    ChatMessage,
    ChatInput,
  },
  data() {
    return {
      page: 1,
      more: false,
    }
  },
  computed: {
    ...mapState(['auth_user', 'chat', 'messages'])
  },
  created() {
    this.$store.dispatch('fetchChat').then(data => {
      this.fetchMessages()
    })
  },
  methods: {
    messageSent(data) {
      this.$store.commit('FETCH_MESSAGE', data)
    },
    fetchMessages() {
      this.$store.dispatch('fetchMessages', this.page).then(data => {
        this.more = data.more
        this.page = data.page + 1
      })
    }
  }
}
</script>
