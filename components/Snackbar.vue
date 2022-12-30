<template>
  <div class="text-center ma-2">
    <v-snackbar
      :value="snackbar.snackbar.show"
      :color="snackbar.snackbar.mode"
      :timeout="snackbar.snackbar.timer"
    >
      {{ snackbar.snackbar.message }}
    </v-snackbar>
  </div>
</template>
<script>
export default {
  data () {
    return {
      snackbar: this.$store.state.snackbar
    }
  },
}
</script>
