<template>
  <q-page class="flex column">
    <q-banner class="bg-grey-5 text-center">
      User is offline
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
          class="q-pa-sm full-width"
          bg-color="white"
          label="Message"
          dense
          rounded
          outlined
          v-model="new_message">
          <template v-slot:after>
            <q-btn
              @click="onSubmit"
              color="white"
              round
              dense
              flat
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

export default defineComponent({
  name: 'PageChat',
  computed: {
    otherUserDetails(){
      return this.$store.state.loginStore.valueOf().users.find((user) => {
        return user.user_id === this.$route.params.another_user_id
      })
    }
  },
  setup() {
    const route = useRoute()
    const store = useStore()
    const new_message = ref('');
    const messages = computed(() : [] => store.getters['loginStore/messages'])

    onMounted(() => {
      store.dispatch('loginStore/firebaseFetchMessages', route.params.another_user_id).catch(err => console.log(err))
    })
    onDeactivated(() => {
      store.dispatch('loginStore/firebaseStopFetchMessages').catch(err => console.log(err))
    })

    return {
      new_message,
      messages,
      store,
      route
      // onSubmit() {
      //   messages.value.push({
      //     text_field: new_message.value,
      //     from: 'me'
      //   });
      //   new_message.value = '';
      // },
    }
  }
});
</script>
