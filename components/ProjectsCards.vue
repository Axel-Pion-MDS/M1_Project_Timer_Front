<template class="projects_cards">
  <div class="projects_cards_items mt-8 d-flex flex-wrap">
    <v-col
      cols="12"
      class="ma-0 pa-0"
    >
      <v-btn
        @click="openProjectForm(true)"
      >
        Add project
      </v-btn>
    </v-col>

    <v-card
      v-for="project in projects"
      :key="project.id"
      :data-team="project.team.id"
      :data-project="project.id"
      elevation="2"
      class="projects_cards_item"
      width="calc(50% - 18px)"
    >
      <v-card-title>{{ project.label }}</v-card-title>
      <v-card-text class="text--primary">
        <p>{{ project.description }}</p>
      </v-card-text>
      <v-row
        align="center"
        justify="end"
        class="ma-0"
      >
        <v-card-actions>
          <v-btn
            text
            @click="updateProject(project)"
          >
            Edit
          </v-btn>

          <v-btn
            text
            @click="deleteProject(project.id)"
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
              <v-card-title>Add project</v-card-title>
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
                  v-model="team"
                  :items="teams"
                  item-text="label"
                  item-value="id"
                  label="Select teams"
                  class="add_project_select_team"
                  solo
                  flat
                  outlined
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
                  label="Select organization"
                  class="add_project_select_team"
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
              @click="sendProjectForm"
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
    name: '',
    description: '',
    team: []
  }),
  computed: {
    projects () {
      return this.$store.state.teamsSelector.projects
    },
    organizations () {
      return this.$store.state.user.user.organizations
    }
  },
  async beforeMount () {
    await this.$store.dispatch('teamsSelector/getTeams')
    this.teams = this.$store.getters['teamsSelector/getTeams']
  },
  methods: {
    async deleteProject(id) {
      if (await this.$store.dispatch('teamsSelector/deleteProject', id)) {
        await this.$store.dispatch('snackbar/success', {
          message: 'This project has been deleted',
          timer: 4000
        }, { root: true })
      }
    },
    updateProject(project) {
      this.name = project.label
      this.description = project.description
      this.team = project.team
      this.projectId = project.id
      this.showForm = true
      this.create = false
    },
    openProjectForm() {
      this.name = ''
      this.description = ''
      this.team = 0
      this.showForm = true
      this.create = true
    },
    async sendProjectForm() {
      const form = {
        id: this.projectId ? this.projectId : -1,
        label: this.name,
        description: this.description,
        team: this.team,
        organization: this.organization
      }
      if (this.create) {
        const request = await this.$store.dispatch('teamsSelector/newProject', form)
        if (request) {
          this.showForm = false
          this.name = ''
          this.description = ''
          this.team = 0
          this.organizationId = 0
        }
      } else {
        const request = await this.$store.dispatch('teamsSelector/updateProject', form)
        if (request) {
          this.showForm = false
          this.name = ''
          this.description = ''
          this.team = 0
          this.organizationId = 0
        }
      }
    }
  },
}
</script>
  <style lang="scss" scoped>

    .projects_cards_items{
      gap: 36px;
    }

    .v-select-list::v-deep .v-list-item__content{
      flex: unset!important;
    }

  </style>
