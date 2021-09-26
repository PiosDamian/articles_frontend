<template>
  <v-container>
    <articles></articles>
  </v-container>
</template>

<script>
import Articles from '@/components/Articles';

export default {
  name: 'Home',
  components: { articles: Articles }
};
</script>
