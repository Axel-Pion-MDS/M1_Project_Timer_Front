<template>
  <div>
    <h1 class="text-center">
      Welcome back!
    </h1>
    <Login />
    <p class="text-center">
      You don't have any account?
      <nuxt-link to="/auth/signup">
        Create one!
      </nuxt-link>
    </p>
  </div>
</template>
<script>
import Login from '~/components/Auth/Login.vue'

export default {
  name: 'LoginPage',
  components: { Login },
  layout: 'auth',
}
</script>
