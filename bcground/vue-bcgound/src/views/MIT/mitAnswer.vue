<template>
<div>
  {{ dataCode }}
</div>
</template>

<script lang="ts" setup>
import {useRoute} from "vue-router";
let $route = useRoute()
let dataCode = $route.query.data
</script>

<style scoped>

</style>