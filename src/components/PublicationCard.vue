<script setup>  
const props = defineProps({
    publication: {
        type: Object,
        required: true
    }
})
</script>
<template>
    <div class="upper-box">
        <h4>{{ publication.data.type }}</h4>
        <h3>{{ publication.data.title }}</h3>
        <p>
          {{ publication.data.authors }}, <i>{{ publication.data.journal }}</i> ({{ publication.data.year }}), <a :href="publication.data.doi">Link</a>
        </p>
    </div>
</template>