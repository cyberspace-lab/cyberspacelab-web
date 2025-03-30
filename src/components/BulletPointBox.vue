<template>
  <div class="inner-box">
    <div v-for="(aim, i) in aims" :key="i" class="single-item">
      <div class="count-box">
        <span>0{{ i + 1 }}</span>
      </div>
      <div class="inner">
        <h3>{{ aim[0] }}</h3>
        <p>{{ aim[1] }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AimsBox',
  props: {
    aims: {
      type: Array,
      required: true
    }
  }
}
</script>
