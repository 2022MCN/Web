<template>
    <v-main>
        <v-container fill-height fluid>
            <v-layout class="mx-auto" justify-center>
                <v-flex>
                <v-row class="white--text ma-3">
                    <h2>Workshop Codes</h2>
                </v-row>
                    <v-simple-table>
                        <template v-slot:default>
                            <thead>
                            <tr>
                                <th class="text-left">
                                Server
                                </th>
                                <th class="text-left">
                                Description
                                </th>
                                <th class="text-left">
                                Workshop Code
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr
                                v-for="(item, i) in workshops"
                                :key="i"
                            >
                                <td>{{ item.server }}</td>
                                <td>{{ item.description }}</td>
                                <td> <span class="workshop-code font-weight-bold mr-3">{{ item.code }}</span>
                                    <v-icon small @click.stop.prevent="copyCode(item.code)">mdi-content-copy</v-icon>
                                </td>
                            </tr>
                            </tbody>
                        </template>
                        </v-simple-table>
                </v-flex>
            </v-layout>
        </v-container>
    </v-main>
</template>

<script>
export default {
  name: 'Workshop',
  data () {
    return {
      workshops: [
        {
          version: '2.1',
          server: 'Tournament C',
          code: 'Z4NRF',
          description: 'w/ Scrim Convenience Functions'
        },
        {
          version: '2.1',
          server: 'Tournament C',
          code: '2GWEX',
          description: 'w/o Scrim Convenience Functions'
        }
      ]
    }
  },
  methods: {
    copyCode (mytext) {
      try {
        navigator.clipboard.writeText(mytext)
      } catch ($e) {
        alert('Cannot copy')
      }
    }
  }
}
</script>
