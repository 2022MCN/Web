<template>
  <v-container class="mt-6">
    <v-row class="mt-6">
      <h2 class="mt-6 white--text">User Guide</h2>
    </v-row>
    <v-row class="mt-6" justify="center">
      <v-col cols="8">
        <v-carousel
        height="1000">
          <v-carousel-item
            v-for="(item, i) in manualItems"
            :key="i"
          >
          <span class="text-subtitle-1 white--text">{{ item.description }}</span>
          <v-img :src="item.src" contain max-height="700"></v-img>
          <div v-if="item.description === '6. Fill the SOMBRA workshop code.' " class="text-body-1 white--text">
            <Workshop></Workshop>
          </div>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Workshop from '@/components/Workshop.vue'

export default {
  name: 'Manual',
  components: {
    Workshop
  },
  data: () => {
    return {
      manualItems: [
        {
          description: '1. Go Game Settings in battle net application.',
          src: require('@/assets/manual/raw_1.png')
        },
        {
          description: '2. Set TEXT LANGUAGE to English.',
          src: require('@/assets/manual/raw_2.png')
        },
        {
          description: '3. In Overwatch game option, set "ENABLE WORKSHOP INSPECTOR" ON and "ENABLE WORKSHOP INSPECTOR LOG FILE" ON.',
          src: require('@/assets/manual/raw_3.png')
        },
        {
          description: '4. Create a custom game and go SETTINGS.',
          src: require('@/assets/manual/raw_4.png')
        },
        {
          description: '5. Go IMPORT.',
          src: require('@/assets/manual/raw_5.png')
        },
        {
          description: '6. Fill the SOMBRA workshop code.',
          src: require('@/assets/manual/raw_6.png')
        },
        {
          description: '7. After play a map, the log file will be saved in C:/Users/{username}/Documents/Overwatch/Workshop.',
          src: require('@/assets/manual/raw_7.png')
        },
        {
          description: '8. Drag and drop your log files into the SOMBRA.',
          src: require('@/assets/manual/raw_8.png')
        },
        {
          description: '9. Click SUBMIT to upload your log files.',
          src: require('@/assets/manual/raw_9.png')
        }
      ]
    }
  },
  methods: {
  }
}
</script>
