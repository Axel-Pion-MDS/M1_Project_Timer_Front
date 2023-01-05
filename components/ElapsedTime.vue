<template>
  <div>
    <p>{{ elapsedTime }}</p>
  </div>
</template>

<script>
export default {
  name: 'ElapsedTime',
  props: ['startDate'],
  data() {
    return {
      elapsedTime: 0,
      timerInterval: null
    }
  },
  mounted() {
    this.startTimer()
  },
  methods: {
    startTimer() {
      setInterval(() => {
        const now = Date.now()
        const distance = now - new Date(this.startDate)

        // Calculate days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)
        // Update elapsedTime in the data
        this.elapsedTime = `${days}d ${hours}h ${minutes}m ${seconds}s`
      }, 1000)
    },
  }
}
</script>
