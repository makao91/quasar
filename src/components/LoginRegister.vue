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
import {defineComponent, ref} from 'vue';

export default defineComponent({
  name: 'LoginRegister',
  components: {  },
  props: {
    tab : String
  },
  methods: {
    submitForm() {
      if (this.tab === 'login') {
        console.log('login user')
      } else
        console.log('register user')
    }
  },
  setup() {
    const form_data = ref([{
      name: '',
      email: '',
      password: ''
      }
    ]);
    return {
      form_data,
    }
  }
});




</script>

<style scoped>

</style>
