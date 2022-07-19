import legacy from '@vitejs/plugin-legacy'

export default {
  base: '/captcha/',
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ]
}
