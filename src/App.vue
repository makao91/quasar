<template>
  <router-view />
</template>
<script lang="ts">
import { onMounted } from 'vue';
import { useStore } from './store'
import { useRouter } from 'vue-router';

export default ({
    setup() {
      const store = useStore()
      const router = useRouter()

      onMounted(() => {
        store.dispatch('loginStore/handleAuthUser', router).catch(err => console.log(err))
      })

      return{
      }
    }
  }
)
</script>
