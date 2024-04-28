import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLogStore = defineStore('log', ()=> {
  
  const logs = ref<{message:string,data:any,error:boolean}[]>([])

  const log = (message:string,data:any) => {
    logs.value.push({message, data, error:false})
  }
  const logError = (message:string, data:any) => {
    logs.value.push({message, data, error:true})
  }

  return {
    logs,
    log,
    logError
  }
})
