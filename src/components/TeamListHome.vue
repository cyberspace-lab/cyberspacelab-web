<script setup>
import MemberCard from './MemberCard.vue';

defineProps({
  data: { type: Array, required: true }
});
</script>

<template>
  <section class="csl-section alt">
    <div class="csl-container">
      <div class="csl-section-head">
        <div class="csl-eyebrow" style="margin-bottom: 12px;">// 02 · Team</div>
        <div class="csl-section-title">
          <h2>Principal investigators &amp; researchers</h2>
          <div class="csl-bar"></div>
        </div>
      </div>
      <div class="csl-grid-4">
        <MemberCard v-for="member in data" :key="member.id" :data="member" />
      </div>
      <div style="text-align: center; margin-top: 36px;">
        <a href="/team" class="csl-btn cyan">Meet the full team</a>
      </div>
    </div>
  </section>
</template>
