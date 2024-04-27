<template>
<button class="btn" onclick="newPlayerModal.showModal()"> Manage players
</button>
<dialog id="newPlayerModal" class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg">Add new player</h3>
    <p>current players: </p>
    <span class="text-sm">press to remove</span>
    <div class="flex gap-2 flex-wrap items-center">
      <div 
        class="badge badge-primary cursor-pointer"
        v-for="player in playersStore.players"
        :key="player.id"
        @click="playersStore.removePlayer(player.id)"
      > 
        {{player.name}}
      </div>
    </div>
    <div class="divider"></div>
    <div class="text-error">{{alert}}</div>
    <input v-model="name" type="text" placeholder="Name" class="input input-bordered" @keyup.enter="addPlayer"
    /> 
    <div class="modal-action">
      <button @click="addPlayer" class="btn btn-primary">Add</button>
      <button class="btn" onclick="newPlayerModal.close()">Close</button>
    </div>
  </div>
</dialog>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import { usePlayersStore } from '../stores/playersStore';

const playersStore = usePlayersStore();
const name = ref('');
const alert = ref('');

const addPlayer = () => {
  if (!name.value) {
    alert.value = 'Name is required';
    return;
  }
  const id = Math.random().toString(36).substr(2, 9)
  playersStore.addPlayer({id, name: name.value, authority: 50, combat: 0, trade: 0});
  name.value = '';
};

</script>


