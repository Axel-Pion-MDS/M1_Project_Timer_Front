<template class="teams_selector">
  <div>
    <span class="teams_selector-title">
      Teams
    </span>
    <v-col
      cols="12"
      sm="6"
      class="pa-0 mt-1 d-flex teams_selector-select d-flex align-center"
    >
      <v-select
        v-model="value"
        :items="teams"
        item-text="label"
        item-value="id"
        chips
        label="Select teams"
        multiple
        solo
        flat
        outlined
        hide-details
        @change="change"
      />

      <div class="teams_selector-counter ml-5 d-flex justify-center align-center">
        <span>0</span>
      </div>
    </v-col>
  </div>
</template>
<script>
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    callback: {
      type: Function
    }
  },
  data: () => ({
    teams: [],
    value: ''
  }),
  async beforeMount() {
    await this.$store.dispatch('teamsSelector/getTeams')
    this.teams = this.$store.getters['teamsSelector/getTeams']
  },
  methods: {
    change(e) {
      const counter = document.querySelector('.teams_selector-counter')
      counter.querySelector('span').innerText = this.value.length
      if (this.value.length) {
        counter.style.opacity = 1
      } else {
        counter.style.opacity = 0
      }
      this.$store.dispatch('teamsSelector/setSelectedTeams', this.value)
      if (this.callback) {
        this.callback()
      }
    }
  }
}
</script>
<style lang="scss" scoped>

  .teams_selector-title{
    font-size: 12px;
    color: $tertiary-color;
  }

  .v-select-list::v-deep .v-list-item__content{
    flex: unset!important;
  }

  .teams_selector-counter{
    width: 54px;
    min-width: 54px;
    height: 54px;
    min-height: 54px;
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
