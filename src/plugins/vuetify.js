import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import OverwatchLeagueIcon from '../components/OverwatchLeagueIcon.vue'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'fa',
    values: {
      OverwatchLeagueIcon: {
        component: OverwatchLeagueIcon
      }
    }
  }
})
