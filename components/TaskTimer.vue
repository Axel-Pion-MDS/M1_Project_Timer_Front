<template>
  <v-card>
    <v-card-title>Task Timers</v-card-title>
    <v-card-text>
      <v-card-actions>
        <v-btn @click=" addTaskTimer(task.id) ">
          Add Task Timer
        </v-btn>
      </v-card-actions>
      <v-list>
        <v-list-item v-for="taskTimer in taskTimers" :key="taskTimer.id">
          <v-list-item-content>
            <div class="pl-4 gTimerTask">
              <span>{{ formatDate(taskTimer.start_time) }} </span>
              <span class="arrow_right" />
              <span v-if="taskTimer.end_time">
                {{ formatDate(taskTimer.end_time) }}
              </span>
              <ElapsedTime v-if="!taskTimer.end_time" :start-date="taskTimer.start_time" />
            </div>
          </v-list-item-content>
          <v-list-item-action class="gTimerTask">
            <v-btn v-if="!taskTimer.end_time" @click=" stopTaskTimer(taskTimer.id) ">
              Stop
            </v-btn>
            <v-btn @click=" deleteTaskTimer(taskTimer.id) ">
              Delete
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>

export default {
  props: ['task'],
  data() {
    return {
      taskTimers: [],
      elapsedTime: 0,
      timerInterval: null,
      intervalId: null,
      isRunning: false
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
    await this.$store.dispatch('task_timer/getTaskTimers', this.task.id)
    this.taskTimers = this.$store.state.task_timer.taskTimers
  },
  methods: {
    async addTaskTimer() {
      await this.$store.dispatch('task_timer/addTaskTimer', this.task.id)
      location.reload()
    },
    async stopTaskTimer(taskTimerId) {
      await this.$store.dispatch('task_timer/stopTaskTimer', taskTimerId)
      this.taskTimersList()
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }
      return date.toLocaleDateString('en-US', options)
    },
    async deleteTaskTimer(taskTimerId) {
      await this.$store.dispatch('task_timer/deleteTaskTimer', taskTimerId)
      this.taskTimersList()
    },
    async taskTimersList() {
      await this.$store.dispatch('task_timer/getTaskTimers', this.task.id)
      this.taskTimers = this.$store.state.task_timer.taskTimers
    }
  }
}

</script>

<style lang="scss">

.arrow_right{
  display : inline-block;
  height : 0;
  width : 0;
  border-top : 5px solid transparent;
  border-bottom : 6px solid transparent;
  border-left : 12px solid $button-color;
  margin:0 5px;
}

</style>
