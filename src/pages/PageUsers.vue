<template>
  <q-page class="flex q-pa-md">
    <q-list
      separator
      >
      <q-item
        v-for="user in users" :key="user.id"
        clickable
        v-ripple
        to="/chat">
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{ user.name.charAt(0) }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ user.name }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-badge :color="user.online ? 'light-green-7' : 'grey-6'">
            {{ user.online ? 'Online' : 'Offline'}}
          </q-badge>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script lang="ts">

const users = [ {
  id: 1,
  name: 'Ruddy Jedrzej',
  online: true,
}, {
  id: 2,
  name: 'Mallorie Alessandrini',
  online: false,
}, {
  id: 3,
  name: 'Elisabetta Wicklen',
  online: true,
}, ]

export default {
  setup () {
    return {
      users,
    }
  }
}

</script>
