<template>
<button class="btn" onclick="settingsModal.showModal()">show invite</button>
<dialog id="settingsModal" class="modal">
  <div class="modal-box">
    <div class="p-2 flex flex-col justify-center items-center">
      <p>Scan the QR code to join the game</p>
      <qrcode-vue :value="value" size="200" level="H" class="m-4 p-2 bg-white" />
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

const value = "https://star-realms.samcross.uk/#pqri9jw31" // window.location.href.replace('http://','');
</script>
