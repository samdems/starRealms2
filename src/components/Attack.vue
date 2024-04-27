  <template>
    <button class="btn btn-error" @click="setup">Make Attack</button>
    <dialog id="attackModal" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">Make Attack</h3>
          {{combat}}
        <div>
          <div class="p-2" v-for="player in attack" :key="player.id">
            {{player.name}}
            <Selector 
              :value="player.value"
              color="error"
              :increment="() => increment(player)" 
              :decrement="() => decrement(player)"
            />
          </div>
          <button class="btn btn-accent" @click="makeAttack">Make Attack</button>
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
import { ref } from 'vue';
import { usePlayersStore } from '../stores/playersStore';
import Selector from './Selector.vue';
const playersStore = usePlayersStore();
const activePlayer = playersStore.getActivePlayer();
type PlayerAttack = {
  value: number,
  name: string,
  start: number,
  id: string
}
const combat = ref(0);
const attack = ref<{[key:string]:PlayerAttack}>({}); 

const setup = () => {
  Object.keys(playersStore.players).forEach(player => {
    if(player == activePlayer?.id) return;
    attack.value[player] = {
      value: playersStore.players[player].authority,
      name: playersStore.players[player].name,
      id: playersStore.players[player].id,
      start: playersStore.players[player].authority
    }
  });

  if(!activePlayer) return console.log('no active player');
  combat.value = activePlayer.combat;
  //@ts-ignore 
  window.attackModal.showModal();
  
}

const decrement = (player:{value:number}) => {
  if(!activePlayer) return console.log('no active player');
  if(combat.value == 0) return console.log('no more points');
  if(player.value == 0) return console.log('not enough points');
   player.value -= 1;
   combat.value -= 1;
}
const increment = (player:{value:number,start:number}) => {
  if(!activePlayer) return console.log('no active player');
  if(combat.value+1 > activePlayer.combat) return console.log('not enough points');
  if(player.value+1 > player.start) return console.log('not enough points');
  player.value += 1;
  combat.value += 1;
}

const makeAttack = () => {
  if(!activePlayer) return console.log('no active player');
  Object.keys(attack.value).forEach(player => {
    playersStore.updatePlayer(player, 'authority', attack.value[player].value)
  });
  activePlayer.combat = combat.value;
  //@ts-ignore 
  window.attackModal.close()
}
</script>
