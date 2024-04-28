<template>
  <button class="btn" onclick="logsModal.showModal()">
   logs 
  </button>
  <dialog id="logsModal" class="modal">
    <div class="modal-box">
      <h3 class="font-bold text-lg">logs</h3>
      <table class="table">
        <tbody>
          <tr v-for="log in logs" :key="log.id">
            <td>{{ log.message }}</td>
            <td><pre>{{ log.data }}</pre></td>
          </tr>
        </tbody>
      </table>
      <div class="modal-action">
        <button class="btn" onclick="logsModal.close()">Close</button>
       </div>
    </div>
  </dialog>
</template>


<script setup lang="ts">
import { useLogStore } from '../stores/logStore';

const {logs} = useLogStore();


</script>
