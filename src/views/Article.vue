<template>
  <v-container v-if="article">
    <v-card>
      <v-card-title>{{ article.title }}</v-card-title>
      <v-card-subtitle>
        <strong>{{ article.abstract }}</strong>
      </v-card-subtitle>
      <v-card-text>
        <div>{{ article.content }}</div>
        <div class="mt-5">
          <span v-if="article.author">
            {{ article.author.first_name }}
            {{ article.author.last_name }}
          </span>
          <div v-if="article.keywords && article.keywords.length > 0">
            Tagi:
            <v-chip-group>
              <v-chip
                v-for="tag in article.keywords"
                :key="tag.id"
                label
                outlined
                color="primary"
              >
                {{ tag.name }}
              </v-chip>
            </v-chip-group>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Article',
  props: {
    id: {
      required: true
    }
  },
  computed: {
    ...mapGetters({
      getArticle: 'getArticle'
    })
  },
  methods: {
    ...mapActions({
      fetchArticles: 'fetchArticles'
    })
  },
  data() {
    return {
      article: null
    };
  },
  async created() {
    // najpierw pobieramy wszystkie artykuły, tak aby przy uruchomieniu aplikacji metoda `getArticle(id)` miała na czym pracować
    this.article = await this.fetchArticles().then(() =>
      this.getArticle(+this.id)
    );
  }
};
</script>

<style scoped></style>
