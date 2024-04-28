<template>
  <button class="btn" onclick="newPlayerModal.showModal()">
    Manage players
  </button>
  <dialog id="newPlayerModal" class="modal">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Manage Players</h3>
      <table class="table table-compact table-zebra">
        <tbody>
          <tr class="" v-for="player in playersStore.players" :key="player.id">
            <td class="p-0" >{{ player.name }}</td>
            <td class="p-2">
              <Selector
                :value="player.authority"
                color="primary"
                size="sm"
                :increment="() => playersStore.increment(player.id,'authority')"
                :decrement="() => playersStore.decrement(player.id,'authority')"
              />
            </td>
            <td class="p-1">
              <button class="btn btn-sm btn-error" @click="playersStore.removePlayer(player.id)">
                X 
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="divider"></div>
      <div class="text-error mb-2">{{ alert }}</div>
      <div class="flex justify-around gap-2"> 
        <input
          v-model="name"
          type="text"
          placeholder="Name"
          class="input input-bordered w-40"
          @keyup.enter="addPlayer"
        />
        <input v-model="authority" type="number" placeholder="Authority" class="input input-bordered w-20" />
        <button @click="addPlayer" class="btn btn-primary ms-2">Add</button>
      </div>
        <div class="modal-action">
          <button class="btn" onclick="newPlayerModal.close()">Close</button>
        </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { usePlayersStore } from "../stores/playersStore";
import Selector from "./Selector.vue";

const playersStore = usePlayersStore();
const name = ref("");
const alert = ref("");
const authority = ref(50);

const addPlayer = () => {
  if (!name.value) {
    alert.value = "Name is required";
    return;
  }
  const id = Math.random().toString(36).substr(2, 9);
  playersStore.addPlayer({
    id,
    name: name.value,
    authority: authority.value ,
    combat: 0,
    trade: 0,
  });
  name.value = "";
};
</script>
