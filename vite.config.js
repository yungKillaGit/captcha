import legacy from '@vitejs/plugin-legacy'

export default {
  plugins: [
    legacy({
      targets: ['defaults']
    })
  ],
  base: '/captcha/',
}
