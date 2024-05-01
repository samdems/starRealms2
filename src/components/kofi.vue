<template>

<button class="" onclick="kofiModal.showModal()"><img class="h-12" src="https://storage.ko-fi.com/cdn/kofi1.png?v=2"></button>
<dialog id="kofiModal" class="modal">
  <div class="modal-box">
    <div class="p-2 flex flex-col justify-center items-center">
      <iframe 
        src='https://ko-fi.com/samdems/?hidefeed=true&widget=true' class="w-full rounded" height="650" title='samdems'></iframe>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>

</template>
