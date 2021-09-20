<template>
  <q-page class="flex column">
    <q-banner class="bg-grey-5 text-center">
      User is offline
    </q-banner>
    <div class="class q-pa-md column col justify-end">
        <q-chat-message
          v-for="(message, index) in messages" :key="index"
          :name="message.from"
          :text="[message.text]"
          stamp="7 minutes ago"
          :sent="message.from === 'me'"
          :bg-color="message.from === 'me' ? 'amber-7' : 'indigo-5'"
          :text-color="message.from === 'me' ? color='black' : color='white'"
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
import {defineComponent, ref} from 'vue';

export default defineComponent({
  name: 'PageChat',
  components: {  },

  setup() {
    const new_message = ref('');
    const messages = ref([
      {
        text: 'Space',
        from: 'me',
      },
      {
        text: 'The final frontier',
        from: 'them',
      },
      {
        text: 'These are the voyagers of the starship Enterprise',
        from: 'others',
      },
    ])

    return {
      new_message,
      messages,

      onSubmit() {
        messages.value.push({
          text: new_message.value,
          from: 'me'
        });
        new_message.value = '';
      },
    }
  }
});
</script>
