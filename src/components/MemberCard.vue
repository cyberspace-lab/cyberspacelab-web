<script setup>
const props = defineProps({
  data: { type: Object, required: true }
});

const ACCENT_COLORS = ['var(--csl-cyan)', 'var(--csl-magenta)', 'var(--csl-violet)', 'var(--csl-hot-pink)'];

function accentFor(slug) {
  let hash = 0;
  for (const ch of (slug || '')) hash = (hash * 31 + ch.charCodeAt(0)) & 0xffffffff;
  return ACCENT_COLORS[Math.abs(hash) % ACCENT_COLORS.length];
}

function initials(name) {
  return (name || '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join('');
}

const d = props.data.data;
const accent = accentFor(d.slug);
const memberInitials = initials(d.title);
</script>

<template>
  <a :href="`/team/${d.slug}`" class="csl-member-card">
    <div class="csl-member-portrait" :style="{ borderColor: accent }">
      <img
        v-if="d.featuredImage"
        :src="d.featuredImage"
        :alt="d.title"
      />
      <div
        v-else
        class="csl-member-initials"
        :style="{ color: accent, textShadow: `0 0 18px ${accent}` }"
      >{{ memberInitials }}</div>
      <div class="csl-member-scan" />
    </div>

    <div class="csl-member-body">
      <h3>{{ d.title }}</h3>
      <div class="csl-member-level" :style="{ color: accent }">{{ d.level || d.role }}</div>

      <div v-if="d.education && d.education.length" class="csl-member-tags">
        <span
          v-for="tag in d.education.slice(0, 2)"
          :key="tag"
          class="csl-tag"
        >{{ tag }}</span>
      </div>

      <div v-if="d.social" class="csl-member-socials">
        <a v-if="d.social.twitter"     class="csl-member-social-link" :href="d.social.twitter"     target="_blank" rel="noopener noreferrer" @click.stop>TW</a>
        <a v-if="d.social.linkedin"    class="csl-member-social-link" :href="d.social.linkedin"    target="_blank" rel="noopener noreferrer" @click.stop>LI</a>
        <a v-if="d.social.researchgate" class="csl-member-social-link" :href="d.social.researchgate" target="_blank" rel="noopener noreferrer" @click.stop>RG</a>
      </div>
    </div>
  </a>
</template>
