<script setup>
import MemberCard from './MemberCard.vue';
const props = defineProps({
  members: {
    type: Array,
    required: true
  }
})
console.log(props.members);
</script>
<template>
 <div class="auto-container members-page-pading-fix">
    <div class="row clearfix members-page-flex-fix">
        <MemberCard 
          v-for="member in props.members"
          :key="member.slug" 
          :data="member"
        />
    </div>
  </div>
</template>
