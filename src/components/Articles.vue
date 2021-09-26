<!--lista artykułów, używana w template views/Home równie dobrze mogła by być indywidualnym widokiem-->

<template>
  <v-container>
    <v-row>
      <dp-article
        v-for="articleData in articles"
        :key="articleData.id"
        :article-data="articleData"
      ></dp-article>
    </v-row>
  </v-container>
</template>

<script>
import Article from '@/components/Article';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Articles',
  components: {
    'dp-article': Article
  },
  computed: {
    ...mapGetters({
      articles: 'getArticles'
    })
  },
  async created() {
    try {
      // pobieranie listy artykułów
      await this.fetchArticles();
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    ...mapActions({
      fetchArticles: 'fetchArticles'
    })
  }
};
</script>

<style scoped></style>
