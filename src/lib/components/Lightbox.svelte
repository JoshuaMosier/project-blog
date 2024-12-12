<script>
    export let src = '';
    export let alt = '';
    let isOpen = false;

    function handleKey(event) {
        if (event.key === 'Escape') {
            isOpen = false;
        } else if ((event.key === 'Enter' || event.key === ' ') && !isOpen) {
            isOpen = true;
        }
    }

    function handleBackdropClick(event) {
        if (event.target === event.currentTarget) {
            isOpen = false;
        }
    }
</script>

<svelte:window on:keydown={handleKey} />

<div 
    class="cursor-zoom-in" 
    on:click={() => isOpen = true}
    on:keypress={handleKey}
    role="button"
    tabindex="0"
>
    <slot />
</div>

{#if isOpen}
    <div 
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm cursor-zoom-out"
        on:click={handleBackdropClick}
        role="presentation"
    >
        <div class="relative">
            <button 
                class="w-auto h-auto max-w-[90vw] max-h-[90vh] p-0 bg-transparent border-0"
                on:click={() => isOpen = false}
                aria-label="Close lightbox"
            >
                <img 
                    {src} 
                    {alt} 
                    class="w-auto h-auto max-w-[90vw] max-h-[90vh] object-contain cursor-zoom-out lightbox-image"
                />
            </button>
            <button
                class="absolute -top-2 -right-2 text-white/70 hover:text-white bg-black/50 hover:bg-black/70 rounded-full p-2"
                on:click={() => isOpen = false}
                aria-label="Close lightbox"
            >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    </div>
{/if} 