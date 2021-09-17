<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-if="$route.fullPath.includes('/chat')"
          @click="returnPage"
          flat
          dense
          icon="arrow_back"
          label="Back" />
        <q-toolbar-title class="absolute-center">
          {{ title }}
        </q-toolbar-title>

        <q-btn
          @click="toLoginPage"
          class="absolute-right q-pr-md"
          no-caps
          flat
          dense
          icon="account_circle"
          label="Login" />

      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script lang="ts">
import { defineComponent} from 'vue'

export default defineComponent({
  name: 'MainLayout',
  computed: {
    title() {
      let current_path = this.$route.fullPath;
        if (current_path == '/') return 'Witamy w chaterii';
        else if (current_path == '/chat') return 'Chat';
        else if (current_path == '/auth') return 'Login';
    }
  },
  methods: {
    returnPage() {
      if (this.$route.fullPath.includes('/chat')) {
        this.$router.go(-1)
      }
    },
    toLoginPage() {
        this.$router.push('/auth')
    }
  },
  setup() {

  }
})
</script>
