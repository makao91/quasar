/* eslint-disable */
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
          v-if="!this.$store.state.loginStore.user_details.user_id"
          @click="toLoginPage"
          class="absolute-right q-pr-md"
          no-caps
          flat
          dense
          icon="account_circle"
          label="Login" />
        <q-btn
          v-else
          @click="logOut"
          class="absolute-right q-pr-md"
          no-caps
          flat
          dense
          icon="account_circle"
          style="line-height: 1.2"
        >
          Logout<br>
          {{ this.$store.state.loginStore.user_details.name }}
        </q-btn>

      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script lang="ts">
import { defineComponent} from 'vue'
import { useStore } from 'vuex'


export default defineComponent({
  name: 'MainLayout',
  computed: {
    title() {
      let current_path = this.$route.fullPath;
        if (current_path == '/') return 'Witamy w chaterii';
        else if (current_path == '/chat') return 'Chat';
        else if (current_path == '/auth') return 'Login';
        else return "";
    }
  },
  methods: {
    returnPage() {
      if (this.$route.fullPath.includes('/chat')) {
        this.$router.go(-1)
      }
    },
    toLoginPage() : void {
        this.$router.push('/auth').catch(err => console.log(err.message)).then(() => console.log('success'))
    },
    logOut() :void{
      this.$store.dispatch('loginStore/logoutUser')
    }
  },
  setup() {
    const $store = useStore();

    return {
      $store
    }
  }
})
</script>
