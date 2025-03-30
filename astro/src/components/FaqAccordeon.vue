<script setup>
import { ref } from 'vue';

const props = defineProps({
  arr: {
    type: Array,
    required: true
  }
});

const activeIndex = ref(-1);

const toggleAccordion = (index) => {
  activeIndex.value = activeIndex.value === index ? -1 : index;
};
</script>

<template>
  <ul class="accordion-box">
    <li 
      v-for="(field, index) in arr" 
      :key="index"
      class="accordion block"
    >
      <div 
        class="acc-btn"
        :class="{ 'active': activeIndex === index }"
        @click="toggleAccordion(index)"
      >
        <div class="icon-outer">
          <i :class="activeIndex === index ? 'fas fa-minus' : 'fas fa-plus'"></i>
        </div>
        <h6>{{ field[0] }}</h6>
      </div>
      <div 
        class="acc-content"
        :class="{ 'active': activeIndex === index }"
      >
        <div class="content">
          <p>{{ field[1] }}</p>
        </div>
      </div>
    </li>
  </ul>
</template>
