<template>
  <section>
    <base-card>
      <h2>Page not found</h2>
      <p>This page could not be found - maybe check out all our</p>
      <router-link to="/coaches">coaches</router-link>
    </base-card>
  </section>
</template>

<script>
import BaseCard from '@/components/ui/BaseCard';
export default {
  components: { BaseCard },
};
</script>
