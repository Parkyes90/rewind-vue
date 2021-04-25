import { computed, ref, watch } from 'vue';

export const useSearch = (items, searchProp) => {
  const enteredSearchTerm = ref('');
  const activeSearchTerm = ref('');

  const availableItems = computed(() => {
    let filterItems = [];
    if (activeSearchTerm.value) {
      filterItems = items.value.filter((item) =>
        item[searchProp].includes(activeSearchTerm.value)
      );
    } else if (items.value) {
      filterItems = items.value;
    }
    return filterItems;
  });

  watch(enteredSearchTerm, (val) => {
    setTimeout(() => {
      if (val === enteredSearchTerm.value) {
        activeSearchTerm.value = val;
      }
    }, 300);
  });

  const updateSearch = (val) => {
    enteredSearchTerm.value = val;
  };

  return {
    enteredSearchTerm,
    availableItems,
    updateSearch,
  };
};
