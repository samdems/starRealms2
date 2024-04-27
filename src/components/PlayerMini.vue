<template>
<div class="card bg-neutral text-neutral-content">
  <div class="card-body items-center text-center p-4">
    <h2 class="card-title">
      {{ props.player.name }}
    </h2>
    {{ props.player.authority }}
  </div>
</div>
</template>


<script setup lang="ts">
  import {defineProps} from 'vue';
  import { Player } from '../types';

  const props = defineProps<{
    player:Player
    }>();


</script>
