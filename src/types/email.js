const email = {
  _regex: {
    default: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
  },
  default: context => {
    if (context.value && !context.value.match(email._regex.default)) {
      context.fail('Value must be a valid email')
    }
  }
}

export default email
