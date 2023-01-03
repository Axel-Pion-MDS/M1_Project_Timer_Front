<template class="teams_cards">
  <div class="teams_cards_items mt-8 d-flex flex-wrap">
    <v-col
      cols="12"
      class="ma-0 pa-0"
    >
      <v-btn
        @click="openTeamForm(true)"
      >
        Add team
      </v-btn>
    </v-col>

    <v-card
      v-for="team in teams"
      :key="team.id"
      :data-organization="team.organization.id"
      :data-team="team.id"
      elevation="2"
      class="teams_cards_item"
      width="calc(50% - 18px)"
    >
      <v-card-title>{{ team.label }}</v-card-title>
      <v-card-text class="text--primary">
        <p>{{ team.description }}</p>
      </v-card-text>
      <v-row
        align="center"
        justify="end"
        class="ma-0"
      >
        <v-card-actions>
          <v-btn
            text
            @click="updateTeam(team)"
          >
            Edit
          </v-btn>

          <v-btn
            text
            @click="deleteTeam(team.id)"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-row>
    </v-card>
    <v-dialog
      v-model="showForm"
      width="500"
    >
      <v-card>
        <v-form v-model="valid">
          <v-container>
            <v-row>
              <v-card-title>Add team</v-card-title>
              <v-col
                cols="12"
              >
                <v-text-field
                  v-model="name"
                  label="Name"
                  required
                  flat
                  outlined
                  hide-details
                />
              </v-col>

              <v-col
                cols="12"
              >
                <v-textarea
                  v-model="description"
                  outlined
                  name="description"
                  label="Description"
                  value=""
                  solo
                  flat
                  hide-details
                />
              </v-col>
              <v-col
                cols="12"
              >
                <v-select
                  v-model="organization"
                  :items="organizations"
                  item-text="label"
                  item-value="id"
                  label="Select organizations"
                  solo
                  flat
                  outlined
                  hide-details
                />
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <v-row
          align="center"
          justify="end"
          class="ma-0"
        >
          <v-card-actions>
            <v-btn
              text
              @click="sendTeamForm"
            >
              {{ create ? 'create' : 'update' }}
            </v-btn>
          </v-card-actions>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: {
  },
  data: () => ({
    showForm: false,
    create: true,
    organization: [],
    name: '',
    description: ''
  }),
  computed: {
    teams () {
      return this.$store.state.organizationsSelector.teams
    }
  },
  async beforeMount () {
    await this.$store.dispatch('organizationsSelector/getOrganizations')
    this.organizations = this.$store.getters['organizationsSelector/getOrganizations']
  },
  methods: {
    async deleteTeam(id) {      
      if (await this.$store.dispatch('organizationsSelector/deleteTeam', id) ) {
        await this.$store.dispatch('snackbar/success', {
          message: 'This team has been deleted',
          timer: 4000
        }, { root: true })
      }
    },
    updateTeam(team) {
      this.name = team.label
      this.description = team.description
      this.organization = team.organization.id
      this.teamId = team.id
      this.showForm = true
      this.create = false
    },
    openTeamForm() {
      this.name = ''
      this.description = ''
      this.organization = 0
      this.showForm = true
      this.create = true
    },
    async sendTeamForm() {
      const form = {
        id: this.teamId ? this.teamId : -1,
        label: this.name,
        description: this.description,
        organization: this.organization
      }
      if (this.create) {
        const request = await this.$store.dispatch('organizationsSelector/newTeam', form)
        if (request) {
          this.showForm = false
          this.name = ''
          this.description = ''
          this.organization = 0
        }
      } else {
        const request = await this.$store.dispatch('organizationsSelector/updateTeam', form)
        if (request) {
          this.showForm = false
          this.name = ''
          this.description = ''
          this.organization = 0
        }
      }
    }
  },
}
</script>
  <style lang="scss" scoped>

    .teams_cards_items{
      gap: 36px;
    }

  </style>
