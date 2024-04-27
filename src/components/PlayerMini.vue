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
  import { usePlayersStore } from '../stores/playersStore';
  import Selector from './Selector.vue';

  const playersStore = usePlayersStore();

  function decrementScore() {
    playersStore.decrementScore(props.player.id)
  }

  function incrementScore() {
    playersStore.incrementScore(props.player.id)
  }

  const props = defineProps<{
    player: {
      id: number;
      name: string;
      score: number;
    };
  }>();


</script>
