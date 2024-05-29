import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase,roomid } from '../supabase.ts'
import { Player } from '../types.ts'
import { useLogStore } from './logStore.ts'

export const usePlayersStore = defineStore('players', ()=> {
  
  const events = supabase.channel(roomid+'-players')
  const {log,logError} = useLogStore()

  const players = ref<Record<string, Player | any>>(
    JSON.parse(localStorage.getItem(`${roomid}/players`) || '{}')
  ) 
  const activePlayer = ref<string | null>(localStorage.getItem(`${roomid}/activePlayer`) || null)

  const getActivePlayer = ():Player | null => {
    if(!activePlayer.value) return null;
    return players.value[activePlayer.value]
  }

  const getPlayerCount = ():number => {
    return Object.keys(players.value).length
  }

  const nextPlayer = () => {
    if(activePlayer.value === null) return logError('No active player');

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
    sync();

  }
  
  const increment = (id:string,type:string,amount = 1) => {
    updatePlayer(id, type, players.value[id][type] + amount)
  }

  const decrement = (id:string,type:string,amount= 1) => {
    updatePlayer(id, type, players.value[id][type] - amount)
  }
  
  const updatePlayer = (id:string,key:string,value:number | string) => {
    players.value[id][key] = value
    sync();
  }

  const addPlayer = (player:Player) => {
    players.value[player.id] = player
    if(!activePlayer.value) activePlayer.value = player.id
    sync();
  }

  const removePlayer = (id:string) => {
    delete players.value[id];
    sync();
  }

  const sync = () => {
    const payload = {players: players.value, activePlayer: activePlayer.value}

    localStorage.setItem(`${roomid}/players`, JSON.stringify(players.value))
    localStorage.setItem(`${roomid}/activePlayer`, activePlayer.value || '')
    
    log('SYNC OUT',payload )
    events.send({
      type: 'broadcast',
      event: 'SYNC', 
      payload
    })
  }
  events.on('broadcast', { event: 'SYNC' }, ({payload}: any) => {
    log('SYNC IN', payload)
    players.value = payload.players;
    activePlayer.value = payload.activePlayer;
  });

  events.on('broadcast', {event: 'SYNC_REQUEST' }, () => {
    log('SYNC_REQUEST')
    if(Object.keys(players.value).length === 0) return;
    events.send({
      type: 'broadcast',
      event: 'SYNC', 
      payload: {players: players.value, activePlayer: activePlayer.value}
    })
  });

  events.subscribe();

  setTimeout(() => { 
    log('SYNC_REQUEST','send')
    events.send({
      type: 'broadcast',
      event: 'SYNC_REQUEST', 
      payload: {}
    })
  }, 200);
   return { players,activePlayer,nextPlayer,getActivePlayer, addPlayer, updatePlayer, removePlayer, increment, decrement, getPlayerCount}
});
