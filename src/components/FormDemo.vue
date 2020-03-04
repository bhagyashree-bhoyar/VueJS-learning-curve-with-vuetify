<template>
  <v-form 
    :ref="FormRef"
    v-model="valid"
    v-if="!submitted"
    @submit.prevent="submitForm()"
    >
    <v-text-field
      v-model="name"
      :rules="nameRules"
      :counter="counter"
      :label="nameLabel"
      :required="nameRequired"
    >
    </v-text-field>
    <v-text-field
      v-model="email"
      :rules="emailRules"
      :label="emailLabel"
      :required="emailRequired"
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
      @click="clearForm"
      color="warning"
      type="button"
    >
      clear
    </v-btn>
  </v-form>
</template>
<script>
export default {
    name: 'FormDemo',
    props: {
      FormRef: String,
      valid: Boolean,
      submitted: Boolean,
      submit: {
        type: Function
      },
      name: String,
      nameRules: Array,
      counter: [ String, Number],
      nameLabel: String,
      nameRequired: Boolean,
      email: String,
      emailLabel: String,
      emailRequired: Boolean,
      emailRules: Array,
      clear: {
        type: Function
      }
    },
    methods: {
       /**
         * Callback for parent subimt method.
         */
      submitForm() {
        this.submit(this.name, this.email, this.valid);   
      },
      /**
        * Callback for parent clear method.
        */
      clearForm() {
        this.clear(this.$refs);
      }
    }
  }
</script>

