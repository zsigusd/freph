import messages from '@intlify/unplugin-vue-i18n/messages'
//import FloatingVue from 'floating-vue'
//import 'floating-vue/dist/style.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import './assets/index.css'

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: navigator.language,
  fallbackLocale: 'en-EN',
  availableLocales: ['en-EN', 'hu-HU'],
  messages: messages,
})

const app = createApp(App)

app.use(i18n)
app.use(createPinia())
//app.use(FloatingVue)

app.mount('#app')
