<div class="flex flex-col sm:flex-row gap-4 bg-slate-200 p-4">
  <!-- Boks 1 (vises alltid) -->
  <div class="flex-1 flex justify-center items-center bg-slate-800 rounded-lg">
    <div class="aspect-w-8 aspect-h-10 bg-slate-400 w-full max-w-xs"></div>
  </div>

  <!-- Boks 2 (kun synlig i landskapsmodus og større skjermer) -->
  <div class="hidden md:flex flex-1 justify-center items-center bg-slate-800 ">
    <div class="aspect-w-8 aspect-h-10 bg-slate-400 w-full max-w-xs"></div>
  </div>

  <!-- Boks 3 (vises under boks 1 i portrettmodus, ved siden av i landskap og på større skjermer) -->
  <div class="flex-1 flex justify-center items-center bg-slate-800 md:hidden lg:block">
    <div class="aspect-w-8 aspect-h-10 bg-slate-400 w-full max-w-xs"></div>
  </div>
    <!-- Boks 3 (vises under boks 1 i portrettmodus, ved siden av i landskap og på større skjermer) -->
    <div class="flex-1 flex justify-center items-center bg-slate-800 md:hidden lg:block">
      <div class="aspect-w-8 aspect-h-10 bg-slate-400 w-full max-w-xs"></div>
    </div>
</div>