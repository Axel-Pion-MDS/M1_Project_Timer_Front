<template >
<v-dialog v-model="showModal" max-width="650">
    <v-card>
      <form @submit.prevent="submitForm">
        <div class="d-flex justify-center">
          <v-col cols="5">
            <v-autocomplete
              v-model="form.assignMenber"
              :items="users"
              item-text="name"
              item-value="id"
              outlined
              dense
              chips
              small-chips
              label="assign to a member"
              multiple
            />
          </v-col>
          <v-col cols="5">
            <v-autocomplete
              v-model="form.assignProject"
              :items="projects"
              item-text="label"
              item-value="id"
              outlined
              dense
              chips
              small-chips
              label="Project"
              multiple
            />
          </v-col>
        </div>
        <v-col
          cols="12"
          sm="10"
          class="wap-form"
        >
          <v-textarea
            v-model="form.label"
            auto-grow
            filled
            color="deep-purple"
            label="Title"
            rows="1"
          />
          <v-textarea
            v-model="form.description"
            auto-grow
            filled
            color="deep-purple"
            label="Description"
            rows="4"
          />
          <div class="d-flex justify-space-between">
            <div class="selectedDate">
              <v-text-field
                v-model="selectedDate"
                label="Beginning of the task"
                placeholder="Cliquez pour sélectionner une date"
                @click="showDatePicker = true"
              />
              <v-date-picker
                v-if="showDatePicker"
                v-model="selectedDate"
                @input="showDatePicker = false"
              />
            </div>
            <div class="selectedDate">
              <v-text-field
                v-model="selectedDate2"
                label="End of the task"
                placeholder="Cliquez pour sélectionner une date"
                @click="showDatePicker2 = true"
              />
              <v-date-picker
                v-if="showDatePicker2"
                v-model="selectedDate2"
                type="date"
                time-picker
                @input="showDatePicker2 = false"
              />
            </div>
          </div>
        </v-col>

        <v-card-actions>
          <v-btn color="primary" type="submit">
            Submit
          </v-btn>
          <v-btn color="primary" @click="showModal = false">
            Fermer
          </v-btn>
        </v-card-actions>
      </form>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  data() {
    return {
      tasks: [],
      showModal: false,
      valuesUser: [],
      valuesProject: [],

      projects: [
        {
          id: 1,
          label: 'projects01',
          nb_projects: 2,
        },
        {
          id: 2,
          label: 'projects02',
          nb_projects: 1,
        },
      ],
      selectedDate: null,
      showDatePicker: false,
      selectedDate2: null,
      showDatePicker2: false,
      form: {
        created_at: null,
        description: null,
        id: null,
        is_billable: true,
        is_ended: false,
        label: null,
        provisional_end: null,
        provisional_start: null,
        provisional_time: null,
        updated_at: null,
      },
    }
  },
  computed: {
    filteredCards() {
      if (this.selected) {
        return this.tasks.filter(task => task.project.label === this.selected)
      }
      return this.tasks
    },
  },
  async mounted() {
    await this.$store.dispatch('task/getTasks', 1)
    this.tasks = this.$store.state.task.tasks
    console.log(this.tasks)
  },
  methods: {
    async submitForm() {
      const task = { ...this.form }
      task.project = this.form.project.id
      await this.$store.dispatch('task/updateTask', task)
    },

  }
}

</script>
