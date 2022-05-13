<template>
  <v-main>
    <v-container fill-height fluid>
      <v-layout class="mx-auto mt-2" justify-center>
        <v-sheet
          style="position:relative; top:30px;"
          dark
          class="mt-16"
          color="transparent"
        >
          <v-row>
            <v-col align="center" justify="center" cols="12">
              <TableauViz v-if="tableauUrl!==''"></TableauViz>
              <span justify="center" align="center" v-if="tableauUrl === ''" class="pa-2">
                  <v-sheet color="transparent">
                      <v-icon justify="center" align="center" color="red darken-2" justify-center size="200"> mdi-alert </v-icon>
                      <h2 justify-center><a style="color:white; text-decoration:none;" :href="this.$store.state.contactDiscordUrl"><span style="color:#FFBB00"><v-icon>mdi-discord</v-icon>Click here</span> to get access permission</a></h2>
                  </v-sheet>
              </span>
            </v-col>
          </v-row>
        </v-sheet>
      </v-layout>
    </v-container>
  </v-main>
</template>
<!-- eslint-disable -->
<script>
import TableauViz from '../components/vTableauViz.vue'
import { mapState } from "vuex"

export default ({
  components:{
    TableauViz
  },
  data: () => ({
    userTeam: '',
  }),
  methods: {
    movePage (target) {
      this.$router.push({ path: target }).catch(err => {
        if (
          err.name !== 'NavigationDuplicated' &&
          !err.message.includes('Avoided redundant navigation to current location')
        ) {
          console.log(err)
        }
      })
    }
  },
  computed: {
    ...mapState({
      tableauUrl: state => state.tableauUrl
    })
  }
})
</script>
