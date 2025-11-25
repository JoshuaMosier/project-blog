<script>
    import { page } from '$app/stores';
</script>

<div class="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
    <div class="relative mb-8">
        <!-- Glowing background effect -->
        <div class="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-accent-teal/20 blur-3xl -z-10 scale-150"></div>
        
        <!-- Error code -->
        <h1 class="text-8xl md:text-9xl font-bold font-display bg-gradient-to-r from-violet-400 to-accent-teal bg-clip-text text-transparent">
            {$page.status}
        </h1>
    </div>
    
    <h2 class="text-2xl md:text-3xl font-semibold text-slate-200 mb-4 font-display">
        {#if $page.status === 404}
            Page Not Found
        {:else}
            Something Went Wrong
        {/if}
    </h2>
    
    <p class="text-slate-400 max-w-md mb-8 leading-relaxed">
        {#if $page.status === 404}
            The page you're looking for doesn't exist or has been moved. 
            Perhaps you'd like to explore some projects instead?
        {:else}
            {$page.error?.message || "An unexpected error occurred. Please try again later."}
        {/if}
    </p>
    
    <div class="flex flex-wrap gap-4 justify-center">
        <a 
            href="/" 
            class="px-6 py-3 bg-violet-500/10 text-violet-400 border border-violet-500/30 rounded-lg font-medium hover:bg-violet-500/20 transition-all duration-200 hover:scale-105 flex items-center gap-2"
        >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Back to Home
        </a>
        <a 
            href="/gallery" 
            class="px-6 py-3 bg-bg-tertiary text-slate-300 border border-bg-tertiary rounded-lg font-medium hover:border-accent-teal/50 hover:text-accent-teal transition-all duration-200 flex items-center gap-2"
        >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            View Gallery
        </a>
    </div>
    
    <!-- Decorative elements -->
    <div class="mt-16 flex items-center gap-4 text-slate-600">
        <div class="w-12 h-px bg-gradient-to-r from-transparent to-bg-tertiary"></div>
        <span class="text-sm">Error {$page.status}</span>
        <div class="w-12 h-px bg-gradient-to-l from-transparent to-bg-tertiary"></div>
    </div>
</div>

