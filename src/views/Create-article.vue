<template>
  <v-container>
    <v-card>
      <v-card-title>Utwórz artykuł</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" @submit.prevent="create(form)">
          <v-text-field
            v-model="form.title"
            label="Tytuł"
            outlined
            type="text"
            clearable
            required
            :rules="requiredField"
          ></v-text-field>
          <v-textarea
            v-model="form.abstract"
            label="Opis"
            outlined
            type="text"
            clearable
            required
            :rules="requiredField"
          ></v-textarea>
          <v-textarea
            v-model="form.content"
            label="Treść"
            outlined
            type="text"
            clearable
            required
            :rules="requiredField"
          ></v-textarea>
        </v-form>
        <v-chip-group>
          <v-chip
            label
            outlined
            v-for="tag in form.keywords"
            :key="tag.id"
            color="primary"
          >
            {{ tag.name }}
          </v-chip>
        </v-chip-group>
        <v-btn color="primary" @click="showKeywords = true">
          Edytuj słowa kluczowe
        </v-btn>
      </v-card-text>
      <v-card-actions>
        <v-btn
          @click="create(form).then(() => $router.push('/'))"
          :disabled="!valid"
          color="primary"
        >
          Utwórz
        </v-btn>
        <v-btn @click="$router.back()">Anuluj</v-btn>
      </v-card-actions>
    </v-card>
    <div v-if="showKeywords">
      <Keywords
        :tags="form.keywords"
        @close="showKeywords = false"
        @saveTags="form.keywords = $event"
      ></Keywords>
    </div>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';
import Keywords from '@/components/Keywords';

export default {
  name: 'Create-article',
  data() {
    return {
      form: {
        title: null,
        abstract: null,
        content: null,
        keywords: []
      },
      valid: false,
      requiredField: [(value) => Boolean(value) || 'Pole wymagane'],
      showKeywords: false
    };
  },
  methods: {
    ...mapActions({
      create: 'addArticle'
    }),
    clear() {
      this.$refs.form?.reset();
    }
  },
  components: {
    Keywords
  }
};
</script>

<style scoped></style>
