<template>
  <v-form
    ref="formulaire"
    v-model="valid"
    class="mt-8"
    lazy-validation
    @submit.prevent="signup"
  >
    <v-container>
      <v-row class="flex-column">
        <v-container>
          <v-row>
            <v-col
              cols="6"
            >
              <v-text-field
                v-model="form.firstname"
                :rules="[rules.required()]"
                label="First Name"
                validate-on-blur
                outlined
                required
              />
            </v-col>
            <v-col
              cols="6"
            >
              <v-text-field
                v-model="form.lastname"
                :rules="[rules.required()]"
                label="Last Name"
                validate-on-blur
                outlined
                required
              />
            </v-col>
          </v-row>
        </v-container>
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
          Signup
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
      lastname: '',
      firstname: '',
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
    async signup() {
      await this.$store.dispatch('user/signUp', this.form)
      this.reset()
    }
  }
}
</script>
