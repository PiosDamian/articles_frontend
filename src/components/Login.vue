<!--formularz logowania-->
<template>
  <v-card>
    <v-card-title>Konto</v-card-title>
    <v-card-text v-if="!logged">
      <v-form @submit.prevent="valid && login(form)" ref="form" v-model="valid">
        <v-text-field
          v-model="form.email"
          label="Email"
          outlined
          type="email"
          required
          :rules="emailRules"
        ></v-text-field>
        <v-text-field
          v-model="form.password"
          label="Hasło"
          outlined
          type="password"
          required
          :rules="passwordRules"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn
        v-if="!logged"
        type="submit"
        @click="
          login(form);
          close();
        "
        color="primary"
        :disabled="!valid"
      >
        Zaloguj
      </v-btn>
      <v-btn
        v-else
        type="button"
        @click="
          close();
          logout();
        "
        color="secondary"
      >
        Wyloguj
      </v-btn>
      <v-btn @click="close()" color="accent">Anuluj</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

// wyrażenie regularne email
const emailRegExp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;

export default {
  name: 'Login',
  data() {
    return {
      form: {
        email: null,
        password: null
      },
      valid: true,
      // wartości wymagane do ustawienia podpowiedzi pól formularza
      passwordRules: [(value) => !!value || 'Pole wymagane'],
      emailRules: [
        (value) => !!value || 'Pole wymagane',
        (value) => emailRegExp.test(value) || 'Niepoprawny adres email'
      ]
    };
  },
  computed: {
    ...mapGetters({
      logged: 'isAuthorized'
    })
  },
  methods: {
    ...mapActions({
      login: 'login',
      logout: 'logout'
    }),
    close() {
      this.$emit('close');
      // po zamknięciu należy wyczyścić formularz
      this.$refs.form?.reset();
    }
  }
};
</script>

<style scoped></style>
