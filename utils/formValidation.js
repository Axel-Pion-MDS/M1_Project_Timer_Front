const isEmpty = value => value === null || value === undefined || value === ''

const isEmail =
  (msg = ("it's not an email")) =>
    email =>
      // eslint-disable-next-line vue/max-len
      /^(([^<>()[\]\\.,;:\s@"\\']+(\.[^<>()[\]\\.,;:\s@"\\']+)*)|("[^"\\']+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z\d\\-]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      ) || msg

const required =
  (msg = ('required')) =>
    v =>
      !isEmpty(v) || msg

export const rules = {
  isEmail,
  required
}
