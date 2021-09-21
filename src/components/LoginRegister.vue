/* eslint-disable */
<template>
  <q-form @submit="submitForm">
    <q-input outlined class="q-mb-md" v-model="form_data.name" label="Name" v-if="tab === 'register'" />
    <q-input outlined class="q-mb-md" v-model="form_data.email" label="Email" type="email"/>
    <q-input outlined class="q-mb-md" v-model="form_data.password" label="Password" type="password" />
    <div class="row">
      <q-space></q-space>
      <q-btn color="primary" :label="tab" type="submit"/>
    </div>
  </q-form>
</template>

<script>
import {defineComponent} from 'vue';
export default defineComponent({
  name: 'LoginRegister',
  props: {
    tab: String
  },

  methods: {
    submitForm() {
      if (this.tab === 'login') {
        this.$store.dispatch('loginStore/loginUser', this.form_data).catch(err => console.log(err))
      } else{
        this.$store.dispatch('loginStore/registerUser', this.form_data).catch(err => console.log(err))
        setTimeout(() => {  this.$store.dispatch('loginStore/handleAuthUser', this.$router).catch(err => console.log(err)); }, 1000);
      }
    }
  },
  data(){
    return {
      form_data: {
        name: 'Marcin',
        email: 'kokos@gmail.com',
        password: 'kokoko',
      }
    }
  },
});

</script>

<style scoped>

</style>
