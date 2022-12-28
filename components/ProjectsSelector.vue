<template class="projects_selector">
  <div>
    <span class="projects_selector-title">
      Projects
    </span>
    <v-col
      cols="12"
      sm="6"
      class="pa-0 mt-1 d-flex projects_selector-select"
    >
      <v-select
        v-model="value"
        :items="projects"
        item-text="label"
        item-id="id"
        chips
        label="Select projects"
        multiple
        solo
        outlined
      />
    </v-col>
  </div>
</template>
<script>
export default {
  data: () => ({
    projects: [{ id: 'id1', label: 'label 1' }, { id: 'id2', label: 'label 2' }]
  }),
  methods: {
    test() {
      alert(this.projects)
    },
    // async login() {
    //   await this.$store.dispatch('user/login', this.form)
    //   this.reset()
    // }
  }
}
</script>
<style lang="scss" scoped>
  @import '../assets/variables.scss';

  .projects_selector-title{
    font-size: 12px;
    color: $tertiary-color;
  }

  .v-select-list::v-deep .v-list-item__content{
    flex: unset!important;
  }
</style>
