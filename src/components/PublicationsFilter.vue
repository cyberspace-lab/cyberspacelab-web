<script setup>
import { ref, computed } from 'vue';
import PublicationCard from './PublicationCard.vue';

const props = defineProps({
  publications: { type: Array, required: true },
  types: { type: Array, required: true }
});

const search = ref('');
const selectedType = ref('');

const filtered = computed(() => {
  const q = search.value.trim().toLowerCase();
  return props.publications.filter(pub => {
    const d = pub.data;
    const matchesType = !selectedType.value || d.type === selectedType.value;
    const matchesSearch = !q ||
      d.title.toLowerCase().includes(q) ||
      d.authors.toLowerCase().includes(q) ||
      (d.journal && d.journal.toLowerCase().includes(q));
    return matchesType && matchesSearch;
  });
});
</script>

<template>
  <div>
    <div class="csl-pub-controls">
      <div class="csl-pub-search-wrap">
        <span class="csl-pub-search-icon" aria-hidden="true">⌕</span>
        <input
          v-model="search"
          class="csl-pub-search"
          type="search"
          placeholder="Search by title, author, journal…"
          aria-label="Search publications"
        />
      </div>
      <div class="csl-pub-type-wrap">
        <select
          v-model="selectedType"
          class="csl-pub-type-select"
          aria-label="Filter by output type"
        >
          <option value="">All Output Types</option>
          <option v-for="t in types" :key="t" :value="t">{{ t }}</option>
        </select>
        <span class="csl-pub-select-arrow" aria-hidden="true">▾</span>
      </div>
    </div>

    <div v-if="filtered.length" class="csl-grid-pub">
      <PublicationCard v-for="pub in filtered" :key="pub.id" :publication="pub" />
    </div>
    <p v-else class="csl-pub-empty">No publications match your search.</p>
  </div>
</template>

<style scoped>
.csl-pub-controls {
  display: flex;
  gap: 12px;
  margin-bottom: 32px;
  flex-wrap: wrap;
}

/* Search */
.csl-pub-search-wrap {
  position: relative;
  flex: 1 1 300px;
}
.csl-pub-search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  color: var(--csl-fg-3);
  pointer-events: none;
  line-height: 1;
}
.csl-pub-search {
  width: 100%;
  background: var(--csl-deep);
  border: 1px solid var(--csl-line);
  border-left: 2px solid var(--csl-cyan);
  color: var(--csl-fg-1);
  font-family: var(--csl-font-mono);
  font-size: 13px;
  letter-spacing: 0.04em;
  padding: 10px 14px 10px 40px;
  outline: none;
  transition: border-color 0.2s, background 0.2s;
  box-sizing: border-box;
  appearance: none;
}
.csl-pub-search::placeholder { color: var(--csl-fg-4); }
.csl-pub-search:focus {
  border-color: var(--csl-cyan);
  background: var(--csl-panel);
}
.csl-pub-search::-webkit-search-cancel-button { display: none; }

/* Type select */
.csl-pub-type-wrap {
  position: relative;
  flex: 0 1 220px;
}
.csl-pub-type-select {
  width: 100%;
  background: var(--csl-deep);
  border: 1px solid var(--csl-line);
  border-left: 2px solid var(--csl-magenta);
  color: var(--csl-fg-1);
  font-family: var(--csl-font-mono);
  font-size: 13px;
  letter-spacing: 0.04em;
  padding: 10px 36px 10px 14px;
  outline: none;
  transition: border-color 0.2s, background 0.2s;
  cursor: pointer;
  appearance: none;
  box-sizing: border-box;
  width: 100%;
}
.csl-pub-type-select:focus {
  border-color: var(--csl-magenta);
  background: var(--csl-panel);
}
.csl-pub-select-arrow {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  color: var(--csl-magenta);
  pointer-events: none;
  line-height: 1;
}

/* Light mode overrides */
[data-theme="light"] .csl-pub-search,
[data-theme="light"] .csl-pub-type-select {
  background: var(--csl-paper);
  border-color: var(--csl-rule);
  color: var(--csl-ink-1);
}
[data-theme="light"] .csl-pub-search:focus,
[data-theme="light"] .csl-pub-type-select:focus {
  background: #fff;
}
[data-theme="light"] .csl-pub-search::placeholder { color: var(--csl-ink-4); }

/* Empty state */
.csl-pub-empty {
  font-family: var(--csl-font-mono);
  font-size: 13px;
  letter-spacing: 0.08em;
  color: var(--csl-fg-3);
  padding: 40px 0;
  text-align: center;
}
</style>
