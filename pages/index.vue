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
            <span>{{ task.start }}</span>
            <span class="arrow_right" />
            <span>{{ task.end }}</span>
          </div>
          <v-card-actions>
            <v-btn color="error" @click="deleteItem(task.id)">
              Supprimer
            </v-btn>

            <v-btn @click="showModal = true">
              Edit
            </v-btn>
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
                      v-model="form.title"
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
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      tasks: [
        {
          id: 1,
          label: 'test01',
          // eslint-disable-next-line vue/max-len
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec risus felis, mollis eu justo in, feugiat porta magna. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur rhoncus est in feugiat tempor. Quisque at sodales purus. Ut quis elit nec tellus tincidunt feugiat.',
          start: '2022-10-11 18:10:15',
          end: '2022-10-11 18:55:12',
          projectLabel: 'projects01',
          projectDescription: 'Lorem ipsum dolor sit amet',
        },
        {
          id: 2,
          label: 'test02',
          // eslint-disable-next-line vue/max-len
          description: 'Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur rhoncus est in feugiat tempor. Quisque at sodales purus. Ut quis elit nec tellus tincidunt feugiat.',
          start: '2022-10-17 02:10:15',
          end: '2022-10-18 16:55:12',
          projectLabel: 'projects02',
          projectDescription: 'Lorem ipsum dolor sit amet',
        },
        {
          id: 3,
          label: 'test03',
          // eslint-disable-next-line vue/max-len
          description: 'Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur rhoncus est in feugiat tempor. Quisque at sodales purus. Ut quis elit nec tellus tincidunt feugiat.',
          start: '2022-10-17 02:10:15',
          end: '2022-10-18 16:55:12',
          projectLabel: 'projects01',
          projectDescription: 'Lorem ipsum dolor sit amet',
        },

      ],
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
          label: 'projects01',
          nb_projects: 2,
        },
        {
          label: 'projects02',
          nb_projects: 1,
        },
      ],
      selectedDate: null,
      showDatePicker: false,
      selectedDate2: null,
      showDatePicker2: false,
      form: {
        description: null,
        title: null,
        assignMenber: null,
        startAt: null,
        endAt: null,
        assignProject: null
      }
    }
  },
  computed: {
    filteredCards() {
      if (this.selected) {
        console.log('ici')
        return this.tasks.filter(task => task.projectLabel === this.selected)
      }
      return this.tasks
    },
  },
  methods: {
    deleteItem() {

    },
    submitForm() {
      console.log(this.form)
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
.container-mb{
  display: flex;
  justify-content: center;
}
</style>
