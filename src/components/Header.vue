<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex justify-space-between align-center">
      <div>
        <!--        router przy użyciu adresu-->
        <v-btn plain to="/">Artykuły</v-btn>
        <!--        router przy użyciu nazwy-->
        <v-btn plain v-if="logged" :to="{ name: 'Create' }"
          >Dodaj artykuł
        </v-btn>
      </div>
      <div>
        <v-btn icon dark @click="dialog = true">
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </div>
    </div>
    <!--    okienko logowania-->
    <v-dialog v-model="dialog" width="300">
      <login @close="dialog = false"></login>
    </v-dialog>
  </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex';
import Login from '@/components/Login';

export default {
  name: 'Header.vue',
  data() {
    return {
      dialog: false
    };
  },
  components: {
    login: Login
  },
  computed: {
    ...mapGetters({
      logged: 'isAuthorized'
    })
  }
};
</script>

<style scoped>
.d-flex {
  width: 100%;
}
</style>
