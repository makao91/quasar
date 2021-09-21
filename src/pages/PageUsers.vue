<template>
  <q-page class="flex q-pa-md">
    <q-list
      separator
      >
      <q-item
        v-for="user in users" :key="user.user_id"
        clickable
        v-ripple
        :to="'/chat/' + user.user_id">
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{ user.user_details.name.charAt(0) }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ user.user_details.name }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-badge :color="user.user_details.online ? 'light-green-7' : 'grey-6'">
            {{ user.user_details.online ? 'Online' : 'Offline'}}
          </q-badge>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useStore } from '../store'
import { useRoute } from "vue-router";

export default defineComponent({
    setup() {
      const store = useStore()
      const users = computed(() : [] => store.getters['loginStore/users'])

      return {
        users
      }
   }
  },
)
</script>
