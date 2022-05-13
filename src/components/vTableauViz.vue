<template>
  <div id="tableau_div">
  </div>
</template>

<script>
import { mapState } from 'vuex'
import tableau from 'tableau-api'

export default ({
  name: 'TableauViz',
  data: () => ({
    // apiUrl: 'https://public.tableau.com/javascripts/api/tableau-2.9.0.min.js',
    viz: {},
    workBook: {}
  }),
  computed: {
    worksheet () {
      return this.workBook.getActiveSheet()
    },
    ...mapState({
      tableauUrl: state => state.tableauUrl
    })
  },
  methods: {
    initViz () {
      const containerDiv = document.getElementById('tableau_div')
      // Setting up constructor options
      let options = {}
      if (!this.options) {
        options = {
          // height: this.height ? this.height : 904,
          // width: this.width ? this.width : 1709,
          hideTabs: false,
          hideToolbar: false,
          onFirstInteractive: () => { this.workBook = this.viz.getWorkbook() }
        }
        if (this.filters) {
          Object.keys(this.filters).map((el) => {
            options[el.toString()] = this.filters[el.toString()]
          })
        }
      } else {
        options = this.options
      }
      this.viz = new tableau.Viz(containerDiv, this.tableauUrl, options)
    }
  },
  mounted () {
    const containerDiv = document.getElementById('tableau_div')
    // Setting up constructor options
    let options = {}
    if (!this.options) {
      options = {
        height: this.height ? this.height : 904,
        width: this.width ? this.width : 1709,
        hideTabs: false,
        hideToolbar: false,
        onFirstInteractive: () => { this.workBook = this.viz.getWorkbook() }
      }
      if (this.filters) {
        Object.keys(this.filters).map((el) => {
          options[el.toString()] = this.filters[el.toString()]
        })
      }
    } else {
      options = this.options
    }
    this.viz = new window.tableau.Viz(containerDiv, this.tableauUrl, options)
  },
  beforeDestroy () {
    this.viz.dispose()
  }
})
</script>
