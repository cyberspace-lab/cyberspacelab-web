<script setup>  
const props = defineProps({
    publication: {
        type: Object,
        required: true
    }
})
// the publication date is in the format YYYY-MM
const publicationYear = props.publication.data.date.split('-')[0];
const publicationMonth = props.publication.data.date.split('-')[1];

</script>
<template>
    <div class="upper-box">
        <h4>{{ publication.data.type }}</h4>
        <h3>{{ publication.data.title }}</h3>
        <p>
          {{ publication.data.authors }}, <i>{{ publication.data.journal }}</i> ({{ publicationYear }}), <a :href="publication.data.url">Link</a>
        </p>
    </div>
</template>