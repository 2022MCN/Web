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
              <TableauViz
              v-if="tableauViz !== ''"
              :url="tableauViz"
              height="100vh"
              width="180vh"
              refs="tableau"
              >
              </TableauViz>
              <span justify="center" align="center" v-if="tableauViz === ''" class="pa-2">
                  <v-sheet color="transparent">
                      <v-icon justify="center" align="center" color="red darken-2" justify-center size="200"> mdi-alert </v-icon>
                      <h2 justify-center><a style="color:white; text-decoration:none;" href="https://discord.gg/fvQF382QXd"><span style="color:#FFBB00"><v-icon>mdi-discord</v-icon>Click here</span> to get access permission</a></h2>
                  </v-sheet>
              </span>
            </v-col>
            <v-col cols="12" align="center" justify="center">
                <v-btn color="#FFBB00" style="color:#FFFFFF;" @click="movePage('/')">Upload scrim log</v-btn>
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

export default ({
  components:{
    TableauViz
  },
  data: () => ({
    userTeam: '',
    tableauViz: 'https://public.tableau.com/views/SOMBRA_beta_NYE_JECGw57BEKEu4qmS/PerformancePlot?:language=ko-KR&:display_count=n&:origin=viz_share_link'
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
  mounted () {
    this.tableauViz = this.$store.state.tableauViz
  },
  created () {
    this.tableauViz = this.$store.state.tableauViz
  },
})
</script>
