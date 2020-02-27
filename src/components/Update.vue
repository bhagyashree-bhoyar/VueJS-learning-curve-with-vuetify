<template>
  <v-card>
    <v-list flat  id="entry-list">
      <v-subheader class="sub-header">
        Update
      </v-subheader>
      <v-list-item-group
        v-model="item"
        color="primary"
        class="list"
      >
        <v-list-item
          class="list-item"
          v-for="(entry, index) in entrys"
          :key="entry"
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
            <v-form ref="form"
              v-model="valid"
              v-if="!submitted"
              @submit.prevent="updateEnttryValues()"
            >
              <v-text-field
                v-model="name"
                :error-messages="nameErrors"
                :counter="20"
                label="Name"
                required
                @input="$v.name.$touch()"
                @blur="$v.name.$touch()"
              >
              </v-text-field>
              <v-text-field
                v-model="email"
                :error-messages="emailErrors"
                label="E-mail"
                required
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
              >
              </v-text-field>
              <v-btn
                class="mr-4"
                type="submit"
                color="success"
              >
                submit
              </v-btn>
              <v-btn
                @click="clear"
                color="warning"
              >
                clear
              </v-btn>
            </v-form>
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
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email } from 'vuelidate/lib/validators'
    
  export default {
    mixins: [validationMixin],
    validations: {
      name: { required, maxLength: maxLength(20) },
      email: { required, email },
    },
    name: 'List',
    data: () => ({
      name: '',
      email: '',
      valid: false,
      submitted: false,
      update: false,
      updateIndex: null,
      preveousEntrys: [],
    }),
    computed: {
      entrys(){
        return this.$store.state.entrys
      },
      nameErrors () {
        const errors = [];
        const nameRegExp = /^[a-zA-Z\s\.]+$/;
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.maxLength && errors.push('Name must be at most 20 characters long')
        !this.$v.name.required && errors.push('Name is required.')
        !nameRegExp.test(this.name) && errors.push('Name can have only characters')
        return errors
      },
      emailErrors () {
        const errors = [];
      
        if (!this.$v.email.$dirty) return errors 
        this.$store.state.entrys.forEach((entry, index) => {
        if (entry.email == this.email && index !== this.updateIndex) errors.push('This email already exists');
         });
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      },
    },
    methods: {
      updateEntry: function(name, email, index) {
        this.name= name;
        this.email= email;
        this.updateIndex= index;
        this.update= true;
      },
        
      updateEnttryValues: function () {
        this.$v.$touch()
        if(this.valid && this.name && this.email) {
          this.preveousEntrys = cloneDeep(this.$store.state.entrys);
          this.preveousEntrys[this.updateIndex].name= this.name;
          this.preveousEntrys[this.updateIndex].email= this.email;
          this.$store.dispatch('updateEnttrys', this.preveousEntrys);  
          this.submitted= true;
          this.clear();
        }
      },
      toggleSubmited: function () {
        this.submitted= false;
        this.update= false;
        this.updateIndex= null;
        this.preveousEntrys= [];
      },
      clear () {
        this.$v.$reset()
        this.name = ''
        this.email = ''
      },
    },
  }

</script>

<style scoped>
  #entry-list {
    background: #e8e0b4;
    box-shadow: 1px 2px 3px rgba(0,0,0,0.2);
    padding: 15px 25px;
  }
  .list {
    padding: 0;
  }
  .list-item {
    margin-right: 10px;
    margin-top: 10px;
    padding: 10px;
    background: rgba(255,255,255,0.7);
  }
  .sub-header {
    font-size: 25px;
    padding: 0;
  }
  .items-wrapper {
    display: flex;
    overflow: hidden;
  }

</style>