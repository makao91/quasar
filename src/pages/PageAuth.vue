<template>
  <q-page class="full-width  q-pa-md">
    <q-card>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="login" label="Login" />
        <q-tab name="register" label="Register" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>

        <q-tab-panel name="login">
          <login-register :tab="tab"></login-register>
        </q-tab-panel>

        <q-tab-panel name="register">
          <login-register :tab="tab"></login-register>
        </q-tab-panel>

      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import LoginRegister from 'components/LoginRegister.vue';

export default defineComponent({
  name: 'PageAuth',
  components: {
    LoginRegister
  },
  setup() {
    return {
      tab: ref('login'),
    }
  }
});
</script>
