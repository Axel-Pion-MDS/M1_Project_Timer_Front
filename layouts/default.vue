<template>
  <v-app dark>
    <v-navigation-drawer permanent>
      <v-list-item>
        <v-avatar
          color="primary"
          size="38"
        >
          <span class="white--text text-h5">
            {{ user.initials }}
          </span>
        </v-avatar>
        <v-list-item-content>
          <div>
            <v-list-item-title class="text-h6">
              {{ user.email }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ user.organization }}
            </v-list-item-subtitle>
          </div>
        </v-list-item-content>
      </v-list-item>

      <v-divider />

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list
        dense
        nav
      >
        <div class="nav-section-title">
          <span>Track</span>
        </div>
        <v-list-item
          v-for="task in tasks"
          :key="task.title"
          :to="task.to"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ task.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ task.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list
        dense
        nav
      >
        <div class="nav-section-title">
          <span>analyse</span>
        </div>
        <v-list-item
          v-for="analyse in analyses"
          :key="analyse.title"
          :to="analyse.to"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ analyse.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ analyse.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list
        dense
        nav
      >
        <div class="nav-section-title">
          <span>workspace</span>
        </div>
        <v-list-item
          v-for="workspace in workspaces"
          :key="workspace.title"
          :to="workspace.to"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ workspace.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ workspace.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list
        dense
        nav
        class="mt-8 logout"
      >
        <v-list-item @click="logout">
          <v-list-item-icon>
            <v-icon color="red">
              mdi-logout
            </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              Logout
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <snackbar />
  </v-app>
</template>

<script>
import Snackbar from '~/components/Snackbar.vue'
export default {
  name: 'DefaultLayout',
  components: { Snackbar },
  data() {
    return {
      items: [
        {
          icon: 'mdi-magnify',
          title: 'Home',
          to: '/search',
        },
        {
          icon: 'mdi-cog',
          title: 'Settings',
          to: '/settings',
        },
      ],
      tasks: [{
        icon: 'mdi-clock-time-four-outline',
        title: 'Tasks',
        to: '/',
      }],
      analyses: [
        {
          icon: 'mdi-calendar-month-outline',
          title: 'Calender',
          to: '/calender',
        },
        {
          icon: 'mdi-chart-line',
          title: 'Charts',
          to: '/charts',
        }
      ],
      workspaces: [
        {
          icon: 'mdi-briefcase-outline',
          title: 'Projects',
          to: '/projects',
        },
        {
          icon: 'mdi-account-group-outline',
          title: 'Teams',
          to: '/teams',
        }
      ],
      section: [
        {
          title: 'track',

        }
      ],
      user: {}

    }
  },
  async beforeMount() {
    if (!this.$store.getters['user/userIsConnected']) {
      this.$router.push('/auth/login')
    } else {
      await this.$store.dispatch('user/getUserInfo')
      this.user = this.$store.state.user.user
      this.user.initials = (this.user.firstname).charAt(0) + (this.user.lastname).charAt(0)
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logOut')
    }
  }
}
</script>

<style lang="scss">

.theme--dark.v-navigation-drawer {
    background-color: $bg-light-color;
}

.v-application--wrap {
  flex-direction: row;
}
.v-list-item__content {
    flex-direction: column;
}
.nav-section-title {
  margin: 10px;
  text-transform: uppercase;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 24px;
}
.logout {
  position: absolute;
  bottom: 0;
}
</style>
