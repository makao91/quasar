<template>
  <router-view />
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({

    mounted() {
      this.$store.dispatch('loginStore/handleAuthUser', this.$router)
    }
  }
)
</script>
