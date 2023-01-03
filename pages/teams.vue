<template>
  <div class="header">
    <h1>Teams</h1>
    <OrganizationsSelector :callback="selectOrganization" />
    <TeamsCards />
  </div>
</template>
<script>
export default {
  name: 'TeamsPage',
  layout: 'default',
  async beforeMount () {
    await this.$store.dispatch('organizationsSelector/teams')
  },
  methods: {
    async selectOrganization() {
      await this.$store.dispatch('organizationsSelector/teams')
    }
  }
}
</script>
