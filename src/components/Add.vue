<template>
  <v-layout
    align-center
    justify-center
  >
    <v-flex
      xs12
      sm8
      md4
    >
      <v-card
        class="elevation-12"
        v-if="!submitted"
      >
        <v-toolbar
          color="primary"
          dark
          flat
        >
          <v-toolbar-title>Add Entry</v-toolbar-title>
        </v-toolbar>
        <v-spacer></v-spacer>
        <v-card-text class="card-text-wrapper">
          <v-form
            ref="form"
            @submit.prevent="submit()"
            v-model="valid"
            class="form-style"
          >
            <v-text-field
              v-model="name"
              :counter="20"
              :rules="nameRules"
              label="Name"
              required
            >
            </v-text-field>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            >
            </v-text-field>
            <v-btn
              class="btn-style"
              type="submit"
              color="success"
            >
              submit
            </v-btn>
            <v-btn
            class="btn-style"
              @click="clear"
              color="warning"
              type="button"
            >
              clear
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
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
    </v-flex>
  </v-layout>
</template>

<script>

  /* eslint-disable no-useless-escape */
  
  
  export default {
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
    }),
    methods: {
       /**
         * Submit the form data of add entry.
         * also reset the form
         */
      submit () {
        if(this.valid && this.name && this.email) {
          this.$store.dispatch('addEntry',{name: this.name, email: this.email});   
          this.submitted= true;
          this.$refs.form.reset();
        }
      },
      /**
         * Reset submitted flag.
         */
      toggleSubmited () {
        this.submitted= false;
      },
       /**
         * Reset the form and submitted flag
         */
      clear () {
        this.$refs.form.reset()
        this.submitted= false;
      },
    },
  }

</script>