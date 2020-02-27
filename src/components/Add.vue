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
          <v-form ref="form"
            @submit.prevent="submit()"
            v-model="valid"
            class="form-style"
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
            >
              clear
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
      <v-alert
        v-model="submitted"
        dismissible
        dense
        text
        icon="mdi-check"
        type="success"
        elevation="2"
      >
        Added entry successfully!
      </v-alert>
    </v-flex>
  </v-layout>
</template>

<script>

  /* eslint-disable no-useless-escape */
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email } from 'vuelidate/lib/validators'
  
  export default {
    mixins: [validationMixin],
    validations: {
      name: { required, maxLength: maxLength(20) },
      email: { required, email },
    },
    data: () => ({
      name: '',
      email: '',
      valid: false,
      submitted: false,
    }),
    computed: {
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
        this.$store.state.entrys.forEach((entry) => {
        if (entry.email == this.email) errors.push('This email already exists');
         });
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      },
    },
    methods: {
      submit () {
        this.$v.$touch()
        if(this.valid && this.name && this.email) {
          this.$store.dispatch('addEntry',{name: this.name, email: this.email});   
          this.submitted= true;
          this.clear();
        }
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
  .card-text-wrapper {
    background: #e8e0b4;
    padding: 15px 25px;
  }
  .form-style {
    background: rgba(255,255,255,0.7);
    padding: 15px;
  }
  .btn-style {
    margin-top: 25px;
    margin-right: 25px;
  }
</style>