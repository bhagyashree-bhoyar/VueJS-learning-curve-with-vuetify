<template>
  <v-card >
    <v-list flat  id="entry-list">
      <v-subheader class="sub-header">List</v-subheader>
      <v-list-item-group
        color="primary"
        class="list"
      >
        <v-list-item
          class="list-item"
          v-for="(entry, index) in entrys" :key="index"
        >
          <v-list-item-icon>
            <v-icon>mdi-account-circle</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              Name: {{ entry.name }},  Email: {{ entry.email }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>

  export default {
    name: 'List',
    data: () => ({
    }),
    computed: {
       /**
         * Computed the entrys for store 
         * @return{array} entrys
         */
      entrys(){
        return this.$store.state.entrys
      },
    }
  }

</script>

