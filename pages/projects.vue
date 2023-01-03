<template>
  <div class="header">
    <h1>Projects</h1>
    <TeamsSelector :callback="selectTeam" />
    <ProjectsCards />
  </div>
</template>
<script>
export default {
  name: 'ProjectsPage',
  layout: 'default',
  async beforeMount () {
    await this.$store.dispatch('teamsSelector/projects')
  },
  methods: {
    async selectTeam() {
      await this.$store.dispatch('teamsSelector/projects')
    }
  }
}
</script>
