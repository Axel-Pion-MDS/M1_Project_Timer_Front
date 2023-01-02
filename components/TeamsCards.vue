<template class="teams_cards">
  <div class="teams_cards_items mt-8 d-flex">
    <v-card
      v-for="team in teams"
      :key="team.id"
      :data-organization="team.organizationID"
      elevation="2"
      class="teams_cards_item"
      width="50%"
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
          >
            Edit
          </v-btn>

          <v-btn
            text
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-row>
    </v-card>
  </div>
</template>
<script>
export default {
  data: () => ({
    teams: []
  }),
  async beforeMount() {
    // await this.$store.dispatch('teamsSelector/getTeams')
    const requestOrganization = await this.$apis.organization.organizations()
    const organizations = requestOrganization.data.data
    const requestTeams = await this.$apis.team.teams()
    const teams = requestTeams.data.data
    const teamsOrganization = []
    organizations.forEach(function(organization) {
      if (Array.isArray(organization.teams) && organization.teams.length) {
        organization.teams.forEach(function(team) {
          teamsOrganization.push({ teamID: team.id, organizationID: organization.id })
        })
      }
    })
    teams.forEach(function(team) {
      let organizationID = 0
      teamsOrganization.forEach(function(teamOrganization) {
        if (teamOrganization.teamID === team.id) {
          organizationID = teamOrganization.organizationID
        }
      })
      team.organizationID = organizationID
    })
    this.teams = teams
  },
  methods: {

  }
}
</script>
  <style lang="scss" scoped>

    .teams_cards_items{
      gap: 35px;
    }

  </style>
