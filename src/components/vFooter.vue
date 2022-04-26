<template>
  <v-footer app absolute padless depressed color="rgba(2, 7, 21)" dark>
    <v-col
      class="text-center mt-4"
      cols="6"
    >
      <p> Draftify </p>
      <p style="color:#808080"> Manage your career and your team  </p>
    </v-col>
    <v-col
      class="text-center mt-4"
      cols="6"
    >
      <p> Sombra </p>
      <p style="color:#808080"> Powerful overwatch data analysis tool </p>
    </v-col>
    <v-col cols="12">
    <v-divider dark></v-divider>
    </v-col>
    <v-col
      class="text-center"
      cols="12"
      style="color:#808080"
    >
      <p>(c) {{ new Date().getFullYear() }} — DRAFTIFY all rights reserved.&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;Contact — contact@draftify.gg &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;Help — <a style="text-decoration:none;" href="https://discord.gg/fvQF382QXd"><v-icon>mdi-discord</v-icon></a></p>
    </v-col>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>
