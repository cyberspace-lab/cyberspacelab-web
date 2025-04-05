<script setup>
import MemberCard from './MemberCard.vue';
import SidebarMemberCard from './SidebarMemberCard.vue';

const props = defineProps({
  members: {
    type: Array,
    required: true
  },
  layout: {
    type: String,
    default: 'grid', // 'grid' or 'sidebar'
    required: false
  }
});
</script>

<template>
  <div :class="layout === 'sidebar' ? 'sidebar-layout' : 'grid-layout'">
    <template v-if="layout === 'sidebar'">
      <SidebarMemberCard 
        v-for="member in members"
        :key="member.slug" 
        :data="member"
      />
    </template>
    <template v-else>
      <div class="row clearfix members-page-flex-fix">
        <MemberCard 
          v-for="member in members"
          :key="member.slug" 
          :data="member"
        />
      </div>
    </template>
  </div>
</template>

<style scoped>
.sidebar-layout {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.grid-layout {
  width: 100%;
}
</style>
