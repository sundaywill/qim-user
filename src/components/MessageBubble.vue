<template>
  <div class="flex items-center justify-end p-2">
    <el-image
        fit="cover"
        class="max-w-xs rounded shadow"
        :src="oss_url + item.content"
        :preview-src-list="[oss_url + item.content]"
        @contextmenu.prevent="$refs.ctxmenu.open($event, item)"
        v-if="item.type === types.IMAGE"
    ></el-image>
    <div class="px-4 py-2 rounded-lg break-all whitespace-pre-wrap select-text"
         :class="right ? 'bg-green-200' : 'bg-gray-300'"
         @contextmenu.prevent="$refs.ctxmenu.open($event, item)"
         v-html="item.content"
         v-else
    ></div>
  </div>
</template>

<script>
const OSS = require('../mixins').oss
const types = require('../utils/dict').message.types

export default {
  name: "ChatBubble",
  mixins: [OSS],
  props: {
    item: {
      require: true,
      type: Object,
    },
    right: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      types
    }
  }
}
</script>
