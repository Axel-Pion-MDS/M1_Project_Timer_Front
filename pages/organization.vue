<template v-slot:activator="{ on, attrs }">
  <v-form
    ref="formulaire"
    v-model="valid"
    class="my-8"
    lazy-validation
    @submit.prevent="actionOrganization"
  >
    <h2 class="my-8">
      Organization info
    </h2>
    <v-container>
      <v-row class="d-flex flex-column">
        <v-col
          cols="12"
        >
          <v-text-field
            v-model="form.label"
            :rules="[rules.required()]"
            label="Label"
            :readonly="isOrganizationMember"
            validate-on-blur
            outlined
            required
          />
        </v-col>
        <v-col
          cols="12"
        >
          <v-textarea
            v-model="form.description"
            filled
            :rules="[rules.required()]"
            :readonly="isOrganizationMember"
            name="input-7-4"
            label="Description"
            validate-on-blur
            outlined
            required
          />
        </v-col>
        <v-col v-if="!isOrganizationMember" cols="4">
          <v-btn
            class="black--text"
            :disabled="!valid"
            color="primary"
            type="submit"
          >
            {{ Object.keys(organization).length !== 0 ? 'Update organization info' : 'Create organization' }}
          </v-btn>
        </v-col>
        <v-col
          cols="12"
        >
          <div v-if="Object.keys(organization).length !== 0" class="d-flex text-center justify-space-between my-8">
            <h2>
              Organization users
            </h2>
            <v-btn v-if="!isOrganizationMember" @click="showModal = true">
              Add new user
            </v-btn>
            <v-dialog v-model="showModal" width="500">
              <v-card>
                <v-form
                  ref="userForm"
                  v-model="form_user_valid"
                  class=""
                  @submit.prevent="addUser"
                >
                  <div class="d-flex flex-column justify-center align-center">
                    <v-col
                      cols="12"
                    >
                      <h4>Add new user</h4>
                      <v-text-field
                        v-model="form_user.email"
                        :rules="[rules.required(), rules.isEmail()]"
                        label="Email"
                        validate-on-blur
                        outlined
                        required
                        class="mt-8"
                      />
                    </v-col>
                    <v-col cols="12">
                      <v-select
                        v-model="form_user.role"
                        :items="roles"
                        :rules="[rules.required()]"
                        item-text="label"
                        item-value="id"
                        required
                        chips
                        validate-on-blur
                        label="Select role"
                        solo
                        flat
                        outlined
                        hide-details
                      />
                    </v-col>
                    <v-card-actions>
                      <v-btn
                        class="black--text"
                        :disabled="!form_user_valid"
                        color="primary"
                        type="submit"
                      >
                        Add user
                      </v-btn>
                      <v-btn color="red" @click="cancelDialog">
                        Fermer
                      </v-btn>
                    </v-card-actions>
                  </div>
                </v-form>
              </v-card>
            </v-dialog>
          </div>
          <v-simple-table v-if="Object.keys(organization).length !== 0" dark>
            <template #default>
              <thead>
                <tr>
                  <th class="text-left">
                    Firstname
                  </th>
                  <th class="text-left">
                    Lastname
                  </th>
                  <th class="text-left">
                    Email
                  </th>
                  <th class="text-left">
                    Role
                  </th>
                  <th v-if="!isOrganizationMember" class="text-left">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="user in organization.users"
                  :key="user.id"
                >
                  <td>{{ user.firstname }}</td>
                  <td>{{ user.lastname }}</td>
                  <td>{{ user.email }}</td>
                  <td v-if="!isOrganizationMember">
                    <v-select
                      class="roleSelect"
                      :hint="`Current role : ${user.role.label}`"
                      persistent-hint
                      :items="roles"
                      item-text="label"
                      item-value="id"
                      return-object
                      @change="updateUserRole(user.email, $event)"
                    />
                  </td>
                  <td v-else>
                    {{ user.role.label }}
                  </td>
                  <td v-if="!isOrganizationMember">
                    <v-icon
                      small
                      @click="deleteUser(user.email)"
                    >
                      mdi-delete
                    </v-icon>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { rules } from '~/utils/formValidation'
export default {
  name: 'Organization',
  data() {
    return {
      dialog: false,
      showModal: false,
      rules,
      selectedRole: '',
      valid: true,
      form_user_valid: true,
      form_user: {
        email: '',
        role: ''
      }
    }
  },
  computed: {
    organization() {
      return this.$store.state.organization?.organization
    },
    roles() {
      return this.$store.getters['role/getOrganizationRoles']
    },
    form() {
      return {
        label: this.organization.label,
        description: this.organization.description
      }
    },
    isOrganizationMember() {
      return this.$store.state.organization?.user_organization_role.label === 'ROLE_ORGANIZATION_MEMBER'
    }
  },
  async beforeMount() {
    await this.$store.dispatch('role/getRoles')
  },
  methods: {
    test() {
      alert(this.form.email)
    },
    validateOrganizationForm() {
      this.$refs.formulaire.validate()
    },
    resetOrganizationForm () {
      this.$refs.formulaire.reset()
    },
    resetValidationOrganizationForm () {
      this.$refs.formulaire.resetValidation()
    },
    validateUserForm() {
      this.$refs.userForm.validate()
    },
    resetUserForm () {
      this.$refs.userForm.reset()
    },
    resetValidationUserForm () {
      this.$refs.userForm.resetValidation()
    },

    cancelDialog() {
      this.showModal = false
      this.resetUserForm()
      this.resetValidationUserForm()
    },
    addUser() {
      if (!this.isOrganizationMember) {
        this.$store.dispatch('organization/addUserOrganization', this.form_user)
        this.cancelDialog()
      }
    },
    actionOrganization() {
      if (Object.keys(this.organization).length !== 0) {
        if (!this.isOrganizationMember) {
          this.$store.dispatch('organization/updateOrganization', this.form)
        }
      } else {
        this.$store.dispatch('organization/addOrganization', this.form)
      }
    },
    deleteUser(email) {
      if (!this.isOrganizationMember) {
        this.$store.dispatch('organization/deleteUserOrganization', email)
      }
    },
    updateUserRole(email, role) {
      if (!this.isOrganizationMember) {
        this.$store.dispatch('organization/updateUserOrganizationRole', { userEmail: email, userNewRole: role })
      }
    }
  },
}

</script>

  <style lang="scss">

  .container--fluid {
      padding: 0;
      margin-top: 10px;
  }

  .task-grid{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
  }
  .arrow_right{
    display : inline-block;
    height : 0;
    width : 0;
    border-top : 5px solid transparent;
    border-bottom : 6px solid transparent;
    border-left : 12px solid $button-color;
    margin:0 5px;
  }

  .selectedDate{
    width: 40%;
  }

  .wap-form{
    margin: auto auto;
  }
  .roleSelect {
    max-width: 300px;
    .v-select__selection.v-select__selection--comma {
      position: absolute;
    }
    .v-messages__message {
        color: $accent-color !important;
      }
  }
  </style>
