<script setup>
import MemberCard from './MemberCard.vue';

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <section class="team-home-section bg-color-2 centered">
    <div class="auto-container">
      <div class="sec-title">
        <h2>Core members</h2>
        <span class="separator"></span>
      </div>
      <div class="row clearfix team-home-members-container">
        <MemberCard 
          v-for="member in props.data"
          :key="member.id" 
          :data="member"
        />
      </div>
    </div>
  </section>
</template>
