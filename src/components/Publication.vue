<template>
  <article class="publication-article">
    <div class="container">
      <header class="publication-header">
        <h1 class="title">{{ publication.data.title }}</h1>
        <div class="meta">
          <p class="authors">{{ publication.data.authors }}</p>
          <p class="journal">{{ publication.data.journal }}</p>
          <p class="date">{{ publication.data.date }}</p>
        </div>
      </header>

      <div class="content">
        <div v-if="publication.data.abstrakt" class="abstract">
          <h2>Abstract</h2>
          <p>{{ publication.data.abstrakt }}</p>
        </div>
        <slot></slot>
      </div>

      <footer class="publication-footer">
        <div class="links">
          <a v-if="publication.data.url" 
             :href="publication.data.url" 
             target="_blank" 
             rel="noopener noreferrer"
             class="external-link">
            View Publication
          </a>
        </div>

        <nav class="pagination" v-if="previous || next">
          <div class="prev" v-if="previous">
            <a :href="previous.slug">
              <span>← Previous</span>
              <span class="title">{{ previous.title }}</span>
            </a>
          </div>
          <div class="next" v-if="next">
            <a :href="next.slug">
              <span>Next →</span>
              <span class="title">{{ next.title }}</span>
            </a>
          </div>
        </nav>
      </footer>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    publication: {
      type: Object,
      required: true
    },
    previous: {
      type: Object,
      default: null
    },
    next: {
      type: Object,
      default: null
    }
  }
}
</script>

<style>
.publication-article {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
}

.publication-header {
  margin-bottom: 2rem;
}

.title {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.meta {
  color: #666;
  line-height: 1.5;
}

.abstract {
  margin: 2rem 0;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 4px;
}

.abstract h2 {
  margin-bottom: 1rem;
}

.publication-footer {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;
}

.external-link {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}

.pagination {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}

.pagination a {
  text-decoration: none;
  color: #007bff;
}

.pagination .title {
  display: block;
  font-size: 0.9rem;
  color: #666;
}
</style>
