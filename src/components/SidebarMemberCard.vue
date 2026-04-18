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
          <p>{{ data.data.level }}</p>
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
  border-radius: 50%;
}

.member-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.member-link:hover .member-info h4 {
  color: var(--theme-color, #0d6efd);
}

.member-info h4 {
  margin: 0 0 2px;
  font-size: 16px;
  transition: color 0.2s ease;
}

.member-info p {
  margin: 0;
  font-size: 14px;
  color: #777;
}
</style>
