<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});
console.log(props.data.data);
const projectData = props.data.data
</script>
<template>
  <a :href="`/project/${projectData.slug}`">
    <div class="project-block">
      <div class="project-block-one wow fadeInUp" data-wow-delay="300ms"data-wow-duration="1500ms">
        <div class="inner-box">
          <div class="line-one"></div>
          <div class="line-two"></div>
          <figure class="image-box">
            <img 
              v-if="projectData.featuredImage"
              :src="projectData.featuredImage"
              :alt="`${projectData.title} - Featured image`"
              className="featured-image"
            />
            <img 
              v-else
              src="assets/images/news/news-7.jpg"
              alt=""
            />
          </figure>
          <div class="content-box" id="cstm">
            <h3>{{projectData.shortname}}</h3>
          </div>
        </div>
      </div>
    </div>
  </a>
</template>

<style scoped>
.image-box {
  width: 400px;
  height: 300px;
  overflow: hidden;
}

.image-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-block {
  max-width: 400px;
}

.project-block-one {
  height: 100%;
}

.inner-box {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>