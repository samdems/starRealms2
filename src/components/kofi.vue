<template>

<button class="" onclick="kofiModal.showModal()"><img class="h-12" src="https://storage.ko-fi.com/cdn/kofi1.png?v=2"></button>
<dialog id="kofiModal" class="modal">
  <div class="modal-box">
    <div class="p-2 flex flex-col justify-center items-center">
      <h2 class="text-2xl">Ko-fi</h2> 
      <iframe id='kofiframe' src='https://ko-fi.com/samdems/?hidefeed=true&widget=true&embed=true&preview=true' style='border:none;width:100%;padding:4px;background:#f9f9f9;' height='712' title='samdems'></iframe>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>

</template>