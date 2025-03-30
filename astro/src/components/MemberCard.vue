<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  }
});

// load image from fdata.featured image
</script>

<template>
  <div class="col-lg-3 col-md-6 col-sm-12 team-block">
    <a :href="`/team/${data.slug}`">
      <div 
        class="team-block-one wow fadeInUp" 
        data-wow-delay="200ms" 
        data-wow-duration="1500ms"
      >
        <div class="inner-box">
          <div class="image-box">
            <figure class="image">
              <img 
                v-if="data.featuredImage"
                :src="data.featuredImage"
                :alt="`${data.title} - Featured image`"
                className="featured-image"
              />
              <img 
                v-else
                src="/assets/images/team/team-6.jpg" 
                alt=""
              />
            </figure>
            <ul v-if="data.social" class="social-links clearfix">
              <li v-if="data.social.twitter">
                <a :href="data.social.twitter">
                  <i class="fab fa-twitter"></i>
                </a>
              </li>
              <li v-if="data.social.facebook">
                <a :href="data.social.facebook">
                  <i class="fab fa-facebook-f"></i>
                </a>
              </li>
              <li v-if="data.social.linkedin">
                <a :href="data.social.linkedin">
                  <i class="fab fa-linkedin-in"></i>
                </a>
              </li>
              <li v-if="data.social.researchgate">
                <a :href="data.social.researchgate">
                  <i class="fab fa-researchgate"></i>
                </a>
              </li>
            </ul>
            <div class="link">
              <a :href="`/team/${data.slug}`">
                <i class="fas fa-link"></i>
              </a>
            </div>
          </div>
          <div class="lower-content">
            <h3>{{ data.title }}</h3>
            <span class="designation">{{ data.description }}</span>
          </div>
        </div>
      </div>
    </a>
  </div>
</template>

<style scoped>
.image-box figure {
  position: relative;
  margin: 0;
  width: 100%;
  /* Force aspect ratio */
  aspect-ratio: 3/4;
  overflow: hidden;
}

.image-box figure img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* This ensures images cover the area without distortion */
  object-position: center; /* Centers the image */
}

/* Optional: Add a transition for smooth loading */
.image-box figure img {
  transition: transform 0.3s ease;
}

/* Optional: Add hover effect */
.image-box figure:hover img {
  transform: scale(1.05);
}
</style> 