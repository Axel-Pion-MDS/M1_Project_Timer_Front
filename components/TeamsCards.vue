<template class="teams_cards">
  <div class="teams_cards_items mt-8 d-flex flex-wrap">
    <v-card
      v-for="team in teams"
      :key="team.id"
      :data-organization="team.organization.id"
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
  props: {
  },
  computed: {
    teams () {
      return this.$store.state.organizationsSelector.teams
    }
  },
  methods: {
  },
}
</script>
  <style lang="scss" scoped>

    .teams_cards_items{
      gap: 36px;
    }

  </style>
