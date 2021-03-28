<template>
  <base-card>
    <base-button @click="setSelectedTab('stored-resources')"></base-button>
    <base-button @click="setSelectedTab('add-resource')"></base-button>
  </base-card>
  <component :is="selectedTab"></component>
</template>

<script>
import BaseCard from '@/components/UI/BaseCard';
import BaseButton from '@/components/UI/BaseButton';
import StoredResources from '@/components/learning-resources/StoredResources';
import AddResource from '@/components/learning-resources/AddResource';
export default {
  components: { BaseButton, BaseCard, StoredResources, AddResource },
  data() {
    return {
      selectedTab: 'stored-resources',
    };
  },
  methods: {
    setSelectedTab(tab) {
      this.selectedTab = tab;
    },
  },
};
</script>
