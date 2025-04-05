<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});

const newsData = props.data.data
import { ref, onMounted } from 'vue';
import { getImageUrl } from '../utils/images';
const imageSrc = ref('');

onMounted(async () => {
  if (newsData.featuredImage) {
    try {
      imageSrc.value = await getImageUrl(newsData.featuredImage);
    } catch (error) {
      console.error("Error loading image:", error);
    }
  }
});
</script>
<template>
  <div class="news-block full-width-banner">
    <a :href="`/news/${newsData.slug}`">
      <div class="news-block-one wow fadeInUp" data-wow-delay="300ms" data-wow-duration="1500ms">
        <div class="inner-box">
          <div class="image-container">
            <figure class="image-box">
              <img 
                v-if="imageSrc"
                :src="imageSrc"
                :alt="`${newsData.title} - Featured image`"
                class="featured-image"
              />
              <img 
                v-else
                src="/assets/images/news/news-7.jpg"
                alt=""
              />
            </figure>
          </div>
          <div class="content-box">
            <h2 class="news-title">{{newsData.title}}</h2>
            <p class="news-description">{{newsData.description}}</p>
          </div>
        </div>
      </div>
    </a>
  </div>
</template>

<style scoped>
.full-width-banner {
  width: 100%;
  margin-bottom: 1.5rem;
}

.news-block-one {
  width: 100%;
}

.inner-box {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.image-container {
  width: 100%;
  margin-bottom: 1rem;
}

.image-box {
  width: 100%;
  height: 200px;
  overflow: hidden;
  margin: 0;
}

.image-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content-box {
  padding: 0.5rem 0;
  text-align: center;
}

.news-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.news-description {
  font-size: 1rem;
  line-height: 1.4;
  color: #666;
}

@media (min-width: 768px) {
  .inner-box {
    flex-direction: row;
    align-items: center;
  }
  
  .image-container {
    width: 33.333%;
    margin-bottom: 0;
    margin-right: 1.5rem;
  }
  
  .content-box {
    width: 66.667%;
    text-align: left;
  }
}
</style>