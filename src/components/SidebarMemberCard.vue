<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="sidebar-member">
    <a :href="`/team/${data.data.slug}`" class="member-link">
      <div class="member-content">
        <div class="member-image">
            <figure class="image">
              <img 
                v-if="data.data.featuredImage"
                :src="data.data.featuredImage"
                :alt="`${data.data.title} - Featured image`"
                className="featured-image"
              />
              <img 
                v-else
                src="/assets/images/team/team-6.jpg" 
                alt=""
              />
            </figure>
        </div>
        <div class="member-info">
          <h4>{{ data.data.title }}</h4>
          <p>{{ data.data.description }}</p>
        </div>
      </div>
    </a>
  </div>
</template>

<style scoped>
.sidebar-member {
  margin-bottom: 15px;
}

.member-link {
  text-decoration: none;
  color: inherit;
}

.member-content {
  display: flex;
  align-items: center;
  gap: 15px;
}

.member-image {
  width: 60px;
  height: 60px;
  overflow: hidden;
  flex-shrink: 0;
}


</style>
