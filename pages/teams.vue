<template>
  <div class="header">
    <h1>Teams</h1>
    <OrganizationsSelector :callback="test" />
    <TeamsCards />
  </div>
</template>
<script>
export default {
  name: 'TeamsPage',
  layout: 'default',
  methods: {
    test() {
      console.log('ici')
    }
  }
}
</script>
