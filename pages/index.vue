<template v-slot:activator="{ on, attrs }">
  <div class="header">
    <h1>My Tasks</h1>
    <div>
      <h3>Projects</h3>
      <v-container fluid>
        <v-row class="align-center">
          <v-col
            class="d-flex"
            cols="12"
            sm="4"
          >
            <v-select
              v-model="selected"
              :items="projects"
              item-text="label"
              label="Projects"
              dense
              outlined
            />
          </v-col>
          {{ selected }}
        </v-row>
      </v-container>
    </div>
    <div class="task-grid">
      <v-card
        v-for="task in filteredCards"
        :key="task.id"
        elevation="2"
      >
        <v-card-title>{{ task.label }}</v-card-title>
        <v-card-text>{{ task.description }}</v-card-text>
        <div>
          <div class="pl-4">
            <span>{{ task.provisional_start }}</span>
            <span class="arrow_right" />
            <span>{{ task.provisional_end }}</span>
          </div>
          <v-card-actions>
            <v-btn color="error" @click="deleteItem(task.id)">
              Supprimer
            </v-btn>

            <v-btn @click="showModal = true; showTask(task.id) ">
              Edit
            </v-btn>
            <v-dialog v-model="showModal" max-width="650">
              <v-card>
                <form @submit.prevent="submitUpdateForm">
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
          </v-card-actions>
        </div>
      </v-card>
    </div>
    <v-btn
      class="mx-2"
      fab
      dark
      color="indigo"
      style="bottom: 15px;right: 0;position: absolute;"
    >
      <v-icon dark>
        mdi-plus
      </v-icon>
    </v-btn>
  </div>
</template>

<script>

export default {
  name: 'IndexPage',
  data() {
    return {
      tasks: [],
      task: {
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
      selected: null,
      showModal: false,
      valuesUser: [],
      valuesProject: [],
      users: [{
        id: 1,
        name: 'leo',
      },
      {
        id: 2,
        name: 'lea',
      }],
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
    async deleteItem(taskId) {
      await this.$store.dispatch('task/deleteTask', taskId)
      this.tasks = this.$store.state.task.tasks
    },
    async submitUpdateForm() {
      const task = { ...this.form}
      task.project = this.form.project.id
      await this.$store.dispatch('task/updateTask', task)
    },
    async showTask(taskId) {
      await this.$store.dispatch('task/getTask', taskId)
      this.form = { ...this.$store.state.task.task }
    }
  }
}

</script>

<style lang="scss">

.container--fluid {
    padding: 0;
    margin-top: 10px;
}

.task-grid{
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
}
.arrow_right{
  display : inline-block;
  height : 0;
  width : 0;
  border-top : 5px solid transparent;
  border-bottom : 6px solid transparent;
  border-left : 12px solid $button-color;
  margin:0 5px;
}

.selectedDate{
  width: 40%;
}

.wap-form{
  margin: auto auto;
}

</style>
