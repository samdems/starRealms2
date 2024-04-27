import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase,roomid } from '../supabase.ts'

export const usePlayersStore = defineStore('players', ()=> {
  
  const events = supabase.channel(roomid+'-players')

  const players = ref({})
  const activePlayer = ref(null)

  const getActivePlayer = () => {
    return players.value[activePlayer.value]
  }

  const getPlayerCount = () => {
    return Object.keys(players.value).length
  }

  const nextPlayer = () => {
    const keys = Object.keys(players.value)
    const index = keys.indexOf(activePlayer.value)
    const player = players.value[activePlayer.value]
    if(player) {
      player.trade = 0
      player.combat = 0
    }

    if(index === keys.length - 1) {
      activePlayer.value = keys[0]
    } else {
      activePlayer.value = keys[index + 1]
    }
  }
  
  const increment = async (id,type,amount = 1) => {
    updatePlayer(id, type, players.value[id][type] + amount)
  }

  const decrement = async (id,type,amount= 1) => {
    updatePlayer(id, type, players.value[id][type] - amount)
  }
  
  const updatePlayer = async (id,key,value) => {
    players.value[id][key] = value
    sync();
  }

  const addPlayer = (player) => {
    player.id = Math.random().toString(36).substr(2, 9)
    players.value[player.id] = player
    if(!activePlayer.value) activePlayer.value = player.id
    sync();
  }

  const removePlayer = (id) => {
    delete players.value[id];
    sync();
  }

  const sync = () => {
    events.send({
      type: 'broadcast',
      event: 'SYNC', 
      payload: {players: players.value, activePlayer: activePlayer.value}
    })
  }

  events.on('broadcast', {event: 'SYNC' }, ({payload}) => {
    players.value = payload.players;
    activePlayer.value = payload.activePlayer;
  });

  events.on('broadcast', {event: 'SYNC_REQUEST' }, () => {
    if(Object.keys(players.value).length === 0) return;
    events.send({
      type: 'broadcast',
      event: 'SYNC', 
      payload: {players: players.value, activePlayer: activePlayer.value}
    })
  });

  events.subscribe();

  setTimeout(() => { 
    events.send({
      type: 'broadcast',
      event: 'SYNC_REQUEST', 
      payload: {}
    })
  }, 200);

  return { players,activePlayer,nextPlayer,getActivePlayer, addPlayer, updatePlayer, removePlayer, increment, decrement, getPlayerCount}
});
