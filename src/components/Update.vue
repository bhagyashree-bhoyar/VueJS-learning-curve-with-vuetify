<template>
  <v-card>
    <v-list flat  id="entry-list">
      <v-subheader class="sub-header">
        Update
      </v-subheader>
      <v-list-item-group
        color="primary"
        class="list"
      >
        <v-list-item
          class="list-item"
          v-for="(entry, index) in entrys"
          :key="index"
        >
          <div class="items-wrapper" v-if="!(updateIndex == index)">
            <v-list-item-icon>
              <v-btn
                title="Update"
                min-width="20px"
                width="20px"
                height="25px"
                color="success"
                @click="updateEntry(entry.name, entry.email, index)"
              >
                <v-icon>
                  mdi-account-circle
                </v-icon>
              </v-btn>  
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                Name: {{ entry.name }},  Email: {{ entry.email }}
              </v-list-item-title>
            </v-list-item-content>
          </div>
          <div v-if="update && (updateIndex == index)">
            <FormDemo
             :name=name
             :valid=valid
             FormRef="forms"
             :submitted=submitted
             :submit="updateEnttryValues"
             :nameRules=nameRules
             :counter="20"
             :nameRequired="true"
             :email=email
             :emailRequired="true"
             :emailRules=emailRules
             :clear="clear"
            />
            
            <v-alert
              v-model="submitted"
              dense
              text
              icon="mdi-check"
              type="success"
              elevation="2"
            >
              Added entry successfully!
              <v-btn
                min-width="20px"
                color="success"
                width="20px"
                height="25px"
                v-on:click="toggleSubmited"
              >
                <v-icon >
                  mdi-close-circle
                </v-icon>
              </v-btn>
            </v-alert>
          </div>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>

  /* eslint-disable no-useless-escape */
  import cloneDeep from 'lodash/cloneDeep';
  import FormDemo from './FormDemo.vue';
    
  export default {
    name: 'List',
    data: () => ({
      name: '',
      nameRules: [
      value => !!value || 'Name is required',
      value => (value && value.length <= 20) || 'Name must be less than 20 characters',
      value => /^[a-zA-Z\s\.]+$/.test(value) || 'Name can have only characters',
    ],
      email: '',
      emailRules: [
      value => !!value || 'E-mail is required',
      value => /.+@.+\..+/.test(value) || 'E-mail must be valid',
    ],
      valid: true,
      submitted: false,
      update: false,
      updateIndex: null,
      preveousEntrys: [],
    }),
    components: {
      FormDemo,
    },
    computed: {
      /**
        * Computed the entrys for store 
        * @return{array} entrys
        */
      entrys(){
        return this.$store.state.entrys
      },
    },
    methods: {
       /**
         * Set the entry field value, index of update entry and update flag in data when click on update button
         * @param{name} form selected entry name value
         * @param{email} form selected entry email value
         * @param{index} form selected entry index value
         */
      updateEntry (name, email, index) {
        this.name= name;
        this.email= email;
        this.updateIndex= index;
        this.update= true;
        this.submitted= false;
      },
         /**
         * Set the updated entry value into store,
         * set the submitted flag and reset the form when form is validate.
         * @param{name} form name input field value
         * @param{email} form email input field value
         * @param{valid} form data validation flag
         */
      updateEnttryValues (name, email, valid) {
        this.name= name;
        this.email= email;
        this.valid= valid;
        if(this.valid && this.name && this.email) {
          this.preveousEntrys = cloneDeep(this.$store.state.entrys);
          this.preveousEntrys[this.updateIndex].name= this.name;
          this.preveousEntrys[this.updateIndex].email= this.email;
          this.$store.dispatch('updateEnttrys', this.preveousEntrys);  
          this.submitted= true;
        }
      },
       /**
         * Reset submitted flag, update flag, updateIndex, and preveousEntrys.
         */
      toggleSubmited () {
        this.submitted= false;
        this.update= false;
        this.updateIndex= null;
        this.preveousEntrys= [];
      },
      /**
        * Reset form
        * @param{fromRefs} form refs
        */
      clear (fromRefs) {
        fromRefs.forms.reset();
        this.name= '';
        this.email= '';
      },
    },
  }

</script>

