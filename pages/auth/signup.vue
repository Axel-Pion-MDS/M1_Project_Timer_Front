<template>
  <div>
    <h1 class="text-center">
      Create your account!
    </h1>
    <SignUp />
  </div>
</template>
<script>
import SignUp from '~/components/Auth/SignUp.vue'

export default {
  name: 'SignupPage',
  components: { SignUp },
  layout: 'auth'
}
</script>
