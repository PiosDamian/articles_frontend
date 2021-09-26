<!--widok definiowania słów kluczowych dla artykułu + definiowanie nowych słów-->
<template>
  <v-dialog width="800" v-model="show">
    <v-card>
      <v-card-title>Słowa kluczowe</v-card-title>
      <v-card-text class="d-flex justify-space-between">
        <v-card>
          <v-card-title>Wybrane słowa</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item v-for="tag in currentTags.entries()" :key="tag[0]">
                <v-list-item-content>{{ tag[1].name }}</v-list-item-content>
                <v-list-item-action>
                  <v-btn @click="removeWord(tag)" icon>
                    <v-icon color="red">mdi-delete</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
            <v-text-field
              v-model="newWord"
              label="Nowe słowo"
              outlined
              type="text"
              append-icon="mdi-plus"
              @click:append="
                createWord(newWord);
                newWord = null;
              "
            ></v-text-field>
          </v-card-text>
        </v-card>
        <div>
          <v-card>
            <v-card-title>Zapisane słowa</v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item v-for="tag in allKeywords" :key="tag.id">
                  <v-list-item-content>{{ tag.name }}</v-list-item-content>
                  <v-list-item-action>
                    <v-btn @click="addWord(tag)" icon>
                      <v-icon color="green">mdi-plus</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="save()">Zapisz</v-btn>
        <v-btn color="accent" @click="close()">Zamknij</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Keywords',
  // tagi które zostały dodane wcześniej
  props: {
    tags: Array
  },
  data() {
    return {
      show: false,
      // mapa znacznie ułatwia zarządzanie dodanymi tagami, kluczem jest id tagu z bazy, wartość - cały obiekt tagu (id, name)
      currentTags: new Map(),
      newWord: null
    };
  },
  methods: {
    ...mapActions({
      fetchKeywords: 'fetchKeywords',
      createKeyword: 'createKeyword'
    }),
    close() {
      this.$emit('close');
    },
    save() {
      this.$emit('saveTags', [...this.currentTags.values()]);
      this.close();
    },
    addWord(word) {
      this.currentTags.set(word.id, word);
      // mapa jest obiektem mutującym, aby odświeżyć widok trzeba to wymusić
      this.$forceUpdate();
    },
    createWord(word) {
      if (word) {
        this.createKeyword(word).then((created) => {
          this.addWord(created);
        });
      }
    },
    removeWord(word) {
      this.currentTags.delete(word[0]);
      // mapa jest obiektem mutującym, aby odświeżyć widok trzeba to wymusić
      this.$forceUpdate();
    }
  },
  computed: {
    ...mapGetters({
      allKeywords: 'getKeywords'
    })
  },
  created() {
    // pobieranie znanych już słów kluczowych
    this.fetchKeywords().then(() => (this.show = true));
  },
  mounted() {
    // po każdym zamontowaniu należy zaktualizować tagi w mapie tagów
    this.tags.forEach((tag) => this.addWord(tag));
  }
};
</script>

<style scoped></style>
