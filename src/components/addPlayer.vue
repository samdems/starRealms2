<template>
  <button class="btn" onclick="newPlayerModal.showModal()">
    Manage players
  </button>
  <dialog id="newPlayerModal" class="modal">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Manage Players</h3>
      <table class="table table-compact table-zebra">
        <thead>
          <tr>
            <th>Name</th>
            <th>Authority</th>
            <th>Combat</th>
            <th>Trade</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="player in playersStore.players" :key="player.id">
            <td>{{ player.name }}</td>
            <td>
              <input
                type="number"
                class="input input-bordered input-sm w-16"
                v-model="player.authority"
            </td>
            <td>
              <input
                type="number"
                class="input input-bordered input-sm w-16"
                v-model="player.combat"
              />
            </td>
            <td>
              <input
                type="number"
                class="input input-bordered input-sm w-16"
                v-model="player.trade"
            </td>
            <td>
              <button class="btn btn-error btn-outline" @click="playersStore.removePlayer(player.id)">
                Remove
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
          class="input input-bordered"
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
