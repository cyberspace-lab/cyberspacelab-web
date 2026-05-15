<script setup>
const props = defineProps({
  data: { type: Object, required: true }
});
const d = props.data.data;
</script>

<template>
  <a :href="`/project/${d.slug}`" class="csl-project-card">
    <div class="csl-project-img">
      <img
        v-if="d.featuredImage"
        :src="d.featuredImage"
        :alt="d.title"
      />
      <img
        v-else
        src="/assets/images/background/tron_prague_wide.png"
        alt=""
      />
      <div class="csl-project-img-tint" />
    </div>

    <div class="csl-project-body">
      <div class="csl-project-tags">
        <span class="csl-tag" :class="d.isActive ? 'cyan' : 'violet'">
          {{ d.isActive ? 'ACTIVE' : 'COMPLETED' }}
        </span>
      </div>
      <h3>{{ d.shortname || d.title }}</h3>
      <p v-if="d.description">{{ d.description }}</p>
    </div>
  </a>
</template>
