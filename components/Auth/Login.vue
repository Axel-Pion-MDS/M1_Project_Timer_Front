<template>
  <v-form
    ref="formulaire"
    v-model="valid"
    class="my-8"
    lazy-validation
    @submit.prevent="login"
  >
    <v-container>
      <v-row class="d-flex flex-column">
        <v-col
          cols="12"
        >
          <v-text-field
            v-model="form.email"
            :rules="[rules.required(), rules.isEmail()]"
            label="E-mail"
            validate-on-blur
            outlined
            required
          />
        </v-col>
        <v-col
          cols="12"
        >
          <v-text-field
            v-model="form.password"
            type="password"
            :rules="[rules.required()]"
            label="Password"
            validate-on-blur
            outlined
            required
          />
        </v-col>
        <v-btn
          class="black--text"
          :disabled="!valid"
          color="primary"
          type="submit"
        >
          Login
        </v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>
<script>
import { rules } from '~/utils/formValidation'
export default {
  data: () => ({
    rules,
    valid: true,
    form: {
      email: '',
      password: ''
    },
  }),
  methods: {
    test() {
      alert(this.form.email)
    },
    validate() {
      this.$refs.formulaire.validate()
    },
    reset () {
      this.$refs.formulaire.reset()
    },
    resetValidation () {
      this.$refs.formulaire.resetValidation()
    },
    async login() {
      if (await this.$store.dispatch('user/login', this.form)) {
        await this.$store.dispatch('snackbar/success', {
          message: 'You are logged in!',
          timer: 4000
        }, { root: true })
        this.reset()
      }
    }
  }
}
</script>
