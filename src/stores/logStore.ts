import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLogStore = defineStore('log', ()=> {
  
  const logs = ref<{id:string,message:string,data:any,error:boolean}[]>([])

  const log = (message:string,data:any = '') => {
    const id = Math.random().toString(36).substring(7)
    logs.value.push({id, message, data, error:false})
  }
  const logError = (message:string, data:any = '') => {
    const id = Math.random().toString(36).substring(7)
    logs.value.push({id,message, data, error:true})
  }

  return {
    logs,
    log,
    logError
  }
})
