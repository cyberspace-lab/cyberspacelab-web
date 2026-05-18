<script setup>
import { ref } from 'vue';

const props = defineProps({
  arr: { type: Array, required: true }
});

const activeIndex = ref(-1);

function toggle(i) {
  activeIndex.value = activeIndex.value === i ? -1 : i;
}
</script>

<template>
  <div class="csl-faq">
    <div
      v-for="(item, i) in arr"
      :key="i"
      class="csl-faq-item"
      :class="{ open: activeIndex === i }"
    >
      <button class="csl-faq-q" @click="toggle(i)">
        <span>{{ item[0] }}</span>
        <span class="csl-faq-glyph" aria-hidden="true">{{ activeIndex === i ? '−' : '+' }}</span>
      </button>
      <div v-if="activeIndex === i" class="csl-faq-a">{{ item[1] }}</div>
    </div>
  </div>
</template>
