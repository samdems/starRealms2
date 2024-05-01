<template>
<button class="btn" onclick="settingsModal.showModal()">settings</button>
<dialog id="settingsModal" class="modal">
  <div class="modal-box">
    <div class="p-2 flex flex-col justify-center items-center">
      <h2 class="text-2xl">Game Settings</h2> 
      <div class="p-2">
            <input class="input input-bordered" v-model="hash"> <button class="btn btn-primary" @click="join">Set Game</button>
      </div>
      <p>Scan the QR code to join the game</p>
      <qrcode-vue :value="value" :size="200" level="H" class="m-4 p-2 bg-white" />
      <p class="text-xs">{{value}}</p>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
</template>


<script setup lang="ts">
import QrcodeVue from 'qrcode.vue';
import { ref } from 'vue';

const hash = ref(window.location.hash.substring(1));
const value = window.location.href.replace('http://','');

const join = () => {
  window.location.hash = hash.value;
  window.location.reload();
}
</script>
