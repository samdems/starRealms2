<script setup lang="ts">
  import PlayerMini from './components/PlayerMini.vue';
  import ActivePlayer from './components/ActivePlayer.vue';
  import gameSettings from './components/GameSettings.vue';
  import {usePlayersStore} from './stores/playersStore';
  import addPlayer from './components/addPlayer.vue';
  import logs from './components/Logs.vue';

  const playersStore = usePlayersStore();

  const nextPlayer = () => {
    console.log('next player');
    playersStore.nextPlayer();
  };
</script>

<template>
  <div class="p-2 flex flex-col gap-2 max-w-2xl mx-auto">
    <div class="grid grid-cols-3 gap-2 justify-center items-center" >
      <PlayerMini v-for="player in playersStore.players" :key="player.id" :player="player" />
    </div>
    <ActivePlayer :player="playersStore.getActivePlayer()" />
    <button v-if="playersStore.getPlayerCount() > 1" class="btn btn-block btn-accent" @click="nextPlayer()">next player</button>
    <div class="p-4" v-else >
      <p>
        You need to add more players to start the game
      </p> 
    </div>
    <div class="flex justify-between">
      <addPlayer/>
      <logs/>
      
      <gameSettings/>
    </div>
  </div>
</template>
