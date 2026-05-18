<script setup>
const props = defineProps({
  publication: { type: Object, required: true }
});
const pub = props.publication.data;
const year = pub.date ? pub.date.split('-')[0] : '';
</script>

<template>
  <article class="csl-pub-item">
    <div class="csl-pub-meta">
      <span class="csl-eyebrow">{{ pub.type }}</span>
      <span class="csl-pub-year">{{ year }}</span>
    </div>
    <h3 class="csl-pub-title">{{ pub.title }}</h3>
    <p class="csl-pub-authors">
      {{ pub.authors }}<template v-if="pub.journal"> · <em>{{ pub.journal }}</em></template>
    </p>
    <a v-if="pub.url" class="csl-pub-link" :href="pub.url" target="_blank" rel="noopener noreferrer">
      <span>READ PAPER</span><span aria-hidden="true">↗</span>
    </a>
  </article>
</template>
