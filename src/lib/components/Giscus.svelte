<script>
    import { onMount } from 'svelte';
    
    // Props to customize Giscus
    export let repo = "JoshuaMosier/project-blog"; // Replace with your repo
    export let repoId = "R_kgDOMnDwhg"; // From giscus.app
    export let category = "General";
    export let categoryId = "DIC_kwDOMnDwhs4ClJQd"; // From giscus.app
    
    onMount(() => {
        const script = document.createElement('script');
        script.src = 'https://giscus.app/client.js';
        script.setAttribute('data-repo', repo);
        script.setAttribute('data-repo-id', repoId);
        script.setAttribute('data-category', category);
        script.setAttribute('data-category-id', categoryId);
        script.setAttribute('data-mapping', 'pathname');
        script.setAttribute('data-strict', '0');
        script.setAttribute('data-reactions-enabled', '1');
        script.setAttribute('data-emit-metadata', '0');
        script.setAttribute('data-input-position', 'top');
        script.setAttribute('data-theme', 'dark_dimmed');
        script.setAttribute('data-lang', 'en');
        script.setAttribute('crossorigin', 'anonymous');
        script.async = true;
        script.setAttribute('data-loading', 'lazy');

        const container = document.getElementById('giscus-container');
        container.appendChild(script);
        
        return () => {
            container.removeChild(script);
        };
    });
</script>

<div class="mt-16">
    <div class="border-t border-gray-700 pt-8">
        <h2 class="text-2xl font-bold mb-8">Comments</h2>
        <div id="giscus-container"></div>
    </div>
</div> 