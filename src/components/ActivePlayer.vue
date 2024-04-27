<template>
<div class="card w-full bg-neutral text-neutral-content">
  <div class="card-body items-center text-center">
    <h2 class="card-title">
      {{ props.player.name }}
    </h2>
    <div class="card-actions justify-end">
    <div class="flex flex-col gap-2 justify-center items-center">
      <Selector :value="props.player.authority" color="primary" :increment="() => increment('authority')" :decrement="() => decrement('authority')"/>
      <Selector :value="props.player.trade" color="warning" :increment="() => increment('trade')" :decrement="() => decrement('trade')"/>
      <Selector :value="props.player.combat" color="error" :increment="() => increment('combat')" :decrement="() => decrement('combat')"/>
      <Attack/>
    </div>

    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { usePlayersStore } from '../stores/playersStore';
import Attack from './Attack.vue';
import Selector from './Selector.vue';

const playersStore = usePlayersStore();

const props = defineProps<{
  player:object;
}>();

function decrement(type: string) {
  playersStore.decrement(props.player.id,type,1)
}
function increment(type: string) {
  playersStore.increment(props.player.id,type,1)
}
</script>
