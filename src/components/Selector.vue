<template>
  <div class="flex gap-2 justify-center items-center" >
    <button @click="decrement()" class="btn" :class="btnClass">-</button>
    <h2 class="w-7">{{ props.value }}</h2>
    <button @click="increment()" class="btn" :class="btnClass">+</button>
  </div>
</template>


<script setup lang="ts">
  import {defineProps} from 'vue';

  const props = defineProps<{
    value: number;
    color: string;
    increment: () => void;
    decrement: () => void;
  }>();

  const btnClass: { [key: string]: boolean } = {};

  btnClass['btn-primary'] = props.color === 'primary';
  btnClass['btn-error'] = props.color === 'error';
  btnClass['btn-warning'] = props.color === 'warning';
</script>
