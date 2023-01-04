export const state = () => ({
  organization: {},
  user_organization_role: {}
})

export const getters = {
  getOrganization(state) {
    return state.organization
  },
  getUserOrganizationRole(state) {
    return state.user_organization_role
  }
}

export const mutations = {
  setOrganization(state, organization) {
    state.organization = organization
  },
  setUserOrganizationRole(state, userOrganizationRole) {
    state.user_organization_role = userOrganizationRole
  }
}

export const actions = {
//   async getOrganization({ commit, dispatch }, organization) {
//     // console.log(state.organization)
//     const response = await this.$apis.organization.get_organization(organization.id)
//     console.log(response)
//   },
  async setOrganization({ commit, state, rootState }, organization) {
    const response = await this.$apis.organization.get_organization(organization.id)
    if (response.status === 200) {
      const res = response.data.data
      const userOrganization = await this.$apis.organization.get_users_organization(organization.id)
      if (userOrganization.status === 200) {
        res.users = userOrganization.data.data[1].users
        commit('setOrganization', res)
        res.users.forEach((user) => {
          if (user.id === rootState.user.user.id) {
            return commit('setUserOrganizationRole', user.role)
          }
        })
      }
    }
  },

  async addUserOrganization({ dispatch, state }, form) {
    const response = await this.$apis.organization.add_user_organization(form, state.organization.id)
    if (response.data.code === 201) {
      await dispatch('snackbar/success', {
        message: 'This user has been added',
        timer: 4000
      }, { root: true })
      await dispatch('setOrganization', state.organization)
      return true
    } else {
      await dispatch('snackbar/error', {
        message: response.data.message,
        timer: 4000
      }, { root: true })
    }
  },
  async deleteUserOrganization({ dispatch, state }, email) {
    const response = await this.$apis.organization.delete_user_organization(state.organization.id, email)
    if (response.data.code === 200) {
      await dispatch('snackbar/success', {
        message: 'This user has been deleted',
        timer: 4000
      }, { root: true })
      await dispatch('setOrganization', state.organization)
      return true
    } else {
      await dispatch('snackbar/error', {
        message: response.data.message,
        timer: 4000
      }, { root: true })
    }
  },
  async updateUserOrganizationRole({ dispatch, state }, payload) {
    const response = await this.$apis.organization.update_user_organization_role(
      state.organization.id, payload.userEmail, payload.userNewRole
    )
    if (response.data.code === 201) {
      await dispatch('snackbar/success', {
        message: 'The user role has been updated',
        timer: 4000
      }, { root: true })
      await dispatch('setOrganization', state.organization)
      return true
    } else {
      await dispatch('snackbar/error', {
        message: response.data.message,
        timer: 4000
      }, { root: true })
    }
  },
  async updateOrganization({ dispatch, state }, form) {
    form.organization = state.organization.id
    const response = await this.$apis.organization.update_organization(form, state.organization.id)
    if (response.data.code === 201) {
      await dispatch('snackbar/success', {
        message: 'This organization has been updated',
        timer: 4000
      }, { root: true })
      await dispatch('setOrganization', state.organization)
      return true
    } else {
      await dispatch('snackbar/error', {
        message: response.data.message,
        timer: 4000
      }, { root: true })
    }
  },
  async addOrganization({ dispatch }, form) {
    const response = await this.$apis.organization.add_organization(form)
    if (response.data.code === 201) {
      await dispatch('snackbar/success', {
        message: 'This organization has been created',
        timer: 4000
      }, { root: true })
      await dispatch('setOrganization', response.data.data)
      return true
    } else {
      await dispatch('snackbar/error', {
        message: response.data.message,
        timer: 4000
      }, { root: true })
    }
  }
}
