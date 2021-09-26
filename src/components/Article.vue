<!--komponent używany na liście artykułów do skróconej prezentacji-->

<template>
  <v-container>
    <!--    router używający nazwy widoku docelowego-->
    <v-card :to="{ name: 'Article', params: { id: articleData.id } }">
      <v-card-title>{{ articleData.title }}</v-card-title>
      <v-card-subtitle>
        <div>{{ articleData.abstract }}</div>
        <div class="mt-5">
          <span v-if="articleData.author">
            {{ articleData.author.first_name }}
            {{ articleData.author.last_name }}
          </span>
          <div v-if="articleData.keywords && articleData.keywords.length > 0">
            Tagi:
            <v-chip-group>
              <v-chip
                label
                outlined
                v-for="tag in articleData.keywords"
                :key="tag.id"
                color="primary"
              >
                {{ tag.name }}
              </v-chip>
            </v-chip-group>
          </div>
        </div>
      </v-card-subtitle>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'Article',
  props: {
    // informacje o artykule przyjmowane z rodzica
    articleData: {
      required: true,
      type: Object
    }
  }
};
</script>

<style scoped></style>
