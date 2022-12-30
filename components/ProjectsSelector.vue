<template class="projects_selector">
  <div>
    <span class="projects_selector-title">
      Projects
    </span>
    <v-col
      cols="12"
      sm="6"
      class="pa-0 mt-1 d-flex projects_selector-select d-flex align-center"
    >
      <v-select
        v-model="value"
        :items="projects"
        item-text="label"
        item-value="id"
        chips
        label="Select projects"
        multiple
        solo
        flat
        outlined
        hide-details
        @change="change"
      />

      <div class="projects_selector-counter ml-5 d-flex justify-center align-center">
        <span>0</span>
      </div>
    </v-col>
  </div>
</template>
<script>
export default {
  data: () => ({
    projects: []
  }),
  mounted() {
    // this.projects = this.$store.getters['projectsSelector/getProjects']

  },
  async beforeMount() {
    await this.$store.dispatch('projectsSelector/getProjects')
    this.projects = this.$store.getters['projectsSelector/getProjects']
    console.log(this.$store.getters['projectsSelector/getProjects'])
  },
  methods: {
    change(e) {
      const counter = document.querySelector('.projects_selector-counter')
      counter.querySelector('span').innerText = this.value.length
      if (this.value.length) {
        counter.style.opacity = 1
      } else {
        counter.style.opacity = 0
      }
      this.$store.dispatch('projectsSelector/setSelectedProjects', this.value)
      console.log(this.$store.getters['projectsSelector/getSelectedProjects'])
      console.log(this.$store.dispatch('projectsSelector/getSelectedProjects'))
    }
  }
}
</script>
<style lang="scss" scoped>

  .projects_selector-title{
    font-size: 12px;
    color: $tertiary-color;
  }

  .v-select-list::v-deep .v-list-item__content{
    flex: unset!important;
  }

  .projects_selector-counter{
    width: 54px;
    height: 54px;
    border-radius: 54px;
    background-color: $quinary-color;
    opacity: 0;

    &-visible{
      opacity: 1;
    }

    span{
      color: $secondary-color;
      font-size: 20px;
      font-weight: 600;
    }
  }
</style>
