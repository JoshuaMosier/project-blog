<script>
    import { browser } from '$app/environment';
    let isMobile = browser && window.innerWidth <= 768;
</script>

<div class="max-w-5xl mx-auto">
    <div class="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8 animate-fade-in-up">
        <h1 class="text-4xl sm:text-5xl font-bold font-display m-0">
            <span class="bg-gradient-to-r from-violet-400 to-accent-teal bg-clip-text text-transparent">Resume</span>
        </h1>
        <a 
            href="/jmosier-resume.pdf" 
            download
            class="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-500/10 text-violet-400 border border-violet-500/30 rounded-lg font-medium hover:bg-violet-500/20 transition-all duration-200 hover:scale-105"
        >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download PDF
        </a>
    </div>

    {#if isMobile}
        <div class="max-w-4xl mx-auto animate-fade-in-up" style="animation-delay: 100ms">
            <div class="rounded-xl overflow-hidden border border-bg-tertiary shadow-xl">
                <img 
                    src="/jmosier-resume.png" 
                    alt="Resume preview" 
                    class="w-full"
                />
            </div>
        </div>
    {:else}
        <div class="max-w-4xl mx-auto aspect-[8.5/11] animate-fade-in-up" style="animation-delay: 100ms">
            <iframe
                src="/jmosier-resume.pdf#zoom=100&navpanes=0&scrollbar=0"
                class="w-full h-full rounded-xl border border-bg-tertiary shadow-xl"
                title="Resume PDF"
            ></iframe>
        </div>
    {/if}
</div>