<template>
<div v-if="player" class="card w-full bg-neutral text-neutral-content">
  <div class="card-body items-center text-center">
    <h2 class="card-title">
      {{ player.name }}
    </h2>
    <div class="card-actions justify-end">
    <div v-if="player" class="flex flex-col gap-2 justify-center items-center">
      <Selector :value="player.authority" color="primary" :increment="() => increment('authority')" :decrement="() => decrement('authority')"/>
      <Selector :value="player.trade" color="warning" :increment="() => increment('trade')" :decrement="() => decrement('trade')"/>
      <Selector :value="player.combat" color="error" :increment="() => increment('combat')" :decrement="() => decrement('combat')"/>
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
import { Player } from '../types';
const playersStore = usePlayersStore();

const props = defineProps<{
  player:Player | null;
}>();

function decrement(type: string) {
  if(!props.player) return;
  if(props.player[type] <= 0) return;
  playersStore.decrement(props.player.id,type,1)
}
function increment(type: string) {
  if(!props.player) return;
  playersStore.increment(props.player.id,type,1)
}
</script>
