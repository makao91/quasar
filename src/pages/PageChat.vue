<template>
  <q-page
    class="flex column"
    ref="page_chat"
  >
    <q-banner
      class="bg-grey-5 text-center"
      v-if="otherUserDetails.user_details.online === false"
    >
      {{ otherUserDetails.user_details.name }} is offline
    </q-banner>
    <div class="class q-pa-md column col justify-end">
        <q-chat-message
          v-for="(message, index) in messages" :key="index"
          :name="message.message_detail.from === 'me' ? store.state.loginStore.valueOf().user_details.name : otherUserDetails.user_details.name"
          :text="[message.message_detail.text_field]"
          stamp="7 minutes ago"
          :sent="message.message_detail.from === 'me'"
          :bg-color="message.message_detail.from === 'me' ? 'amber-7' : 'indigo-5'"
          :text-color="message.message_detail.from === 'me' ? color='black' : color='white'"
        />
    </div>
  </q-page>
  <q-footer elevated>
    <q-toolbar>
      <q-form
        @submit="onSubmit"
        class="q-gutter-md"
      >
        <q-input
          ref="input_message"
          autofocus
          class="q-pa-sm full-width"
          bg-color="white"
          label="Message"
          dense
          rounded
          outlined
          v-model="new_message">
          <template v-slot:after>
            <q-btn
              @click="sendMessage"
              color="white"
              round
              dense
              flat
              type="submit"
              icon="send" />
          </template>
        </q-input>
      </q-form>
    </q-toolbar>
  </q-footer>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, onDeactivated, ref} from 'vue';
import {useRoute} from 'vue-router';
import {useStore} from 'src/store';
import mixinOtherUserDetails from 'src/mixins/mixin-other-user-details'

export default defineComponent({
  mixins: [mixinOtherUserDetails],
  name: 'PageChat',
  methods: {
    scrollToBottom() {
      let page_chat = this.$refs.page_chat.$el
      setTimeout(() => {
        window.scrollTo(0, page_chat.scrollHeight)
      }, 20)
    }
  },
  watch: {
    messages: function (val) {
      if (Object.keys(val).length){
        this.scrollToBottom()
      }
    }
  },
  setup() {
    const route = useRoute()
    const store = useStore()
    const new_message = ref('');
    const messages = computed(() : [] => store.getters['loginStore/messages'])
    const input_message = ref()
    onMounted(() => {
      store.dispatch('loginStore/firebaseFetchMessages', route.params.another_user_id).catch(err => console.log(err))
    },
    )
    onDeactivated(() => {
      store.dispatch('loginStore/firebaseStopFetchMessages').catch(err => console.log(err))
    })
    return {
      new_message,
      messages,
      store,
      route,
      input_message,
      sendMessage() {
        store.dispatch('loginStore/firebaseSendMessage',{
          message: {
            from: 'me',
            text_field: new_message.value
          },
          other_user_id: route.params.another_user_id
        }).catch(err => console.log(err))

        new_message.value = '';
        input_message.value.focus()
      },
    }
  }
});
</script>
