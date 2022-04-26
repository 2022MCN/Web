<template>
  <div id="tableau">
  </div>
</template>

<script>

export default ({
  name: 'TableauViz',
  props: {
    url: {
      type: String,
      default: ''
    },
    options: {
      type: Object,
      required: false
    },
    width: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
    },
    filters: {
      type: Object,
      required: false
    },
    apiUrl: {
      type: String,
      default: 'https://public.tableau.com/javascripts/api/tableau-2.8.0.min.js'
    }
  },
  data () {
    return {
      viz: {},
      workBook: {}
    }
  },
  watch: {
    url () {
      if (this.viz) {
        this.viz.dispose()
      }
      this.initViz()
    },
    height (val) {
      this.viz.setFrameSize(parseInt(this.width), parseInt(val))
    },
    width (val) {
      this.viz.setFrameSize(parseInt(val), parseInt(this.height))
    },
    filters () {
      if (this.viz) {
        this.viz.dispose()
      }
      this.initViz()
    }
  },
  computed: {
    worksheet () {
      return this.workBook.getActiveSheet()
    }
  },
  methods: {
    initViz () {
      const containerDiv = document.getElementById('tableau')
      // Setting up constructor options
      let options = {}
      if (!this.options) {
        options = {
          height: this.height ? this.height : 1000,
          width: this.width ? this.width : 1000,
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
      this.viz = new window.tableau.Viz(containerDiv, this.url, options)
    }
  },
  mounted () {
    this.tableauViz = this.$store.state.tableauViz
    const recaptchaScript = document.createElement('script')
    // recaptchaScript.async = true
    recaptchaScript.setAttribute('src', this.apiUrl)
    this.tableauScript = document.head.appendChild(recaptchaScript)
    this.initViz()
  },
  beforeDestroy () {
    this.viz.dispose()
  }
})

</script>
