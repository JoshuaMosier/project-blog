<script>
    import { browser } from '$app/environment';
    let isMobile = browser && window.innerWidth <= 768;
</script>

<div class="max-w-8xl mx-auto">
    <div class="max-w-4xl mx-auto flex justify-between items-end mb-8">
        <h1 class="text-5xl font-bold text-purple-300 m-0">Resume</h1>
        <a 
            href="/jmosier-resume.pdf" 
            download
            class="inline-block px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
        >
            Download PDF
        </a>
    </div>

    {#if isMobile}
        <div class="max-w-4xl mx-auto">
            <img 
                src="/jmosier-resume.png" 
                alt="Resume preview" 
                class="w-full rounded-lg shadow-lg mb-4"
            />
        </div>
    {:else}
        <div class="max-w-4xl mx-auto aspect-[8.5/11]">
            <iframe
                src="/jmosier-resume.pdf#zoom=100&navpanes=0&scrollbar=0"
                class="w-full h-full rounded-lg border-0"
                title="Resume PDF"
            ></iframe>
        </div>
    {/if}
</div>