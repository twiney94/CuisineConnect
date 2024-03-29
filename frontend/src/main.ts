import './assets/main.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBowlFood, faTree, faClock, faUsers, faGauge, faPlus, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { faXTwitter, faFacebook, faLinkedin, faReddit, faWhatsapp } from '@fortawesome/free-brands-svg-icons'

library.add(faBowlFood, faTree, faClock, faUsers, faGauge, faPlus, faCartShopping, faXTwitter, faFacebook, faLinkedin, faReddit, faWhatsapp)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
