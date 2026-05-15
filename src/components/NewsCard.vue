<script setup>
const props = defineProps({
  data: { type: Object, required: true }
});
const d = props.data.data;

function formatDate(date) {
  if (!date) return '';
  try {
    return new Date(date).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch { return ''; }
}
</script>

<template>
  <a :href="`/news/${d.slug}`" class="csl-news-card">
    <div class="csl-news-img">
      <img
        v-if="d.featuredImage"
        :src="d.featuredImage"
        :alt="d.title"
      />
      <div class="csl-news-img-tint" />
    </div>
    <div class="csl-news-body">
      <div class="csl-news-date">{{ formatDate(d.date) }}</div>
      <h3>{{ d.title }}</h3>
      <p v-if="d.description" class="csl-news-desc">{{ d.description }}</p>
    </div>
  </a>
</template>
