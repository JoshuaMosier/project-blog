<script>
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';

    export let jsonPath;
    let plotlyDiv;
    let loading = true;
    let error = null;
    let width;

    // Function to get layout based on screen width
    function getLayout(screenWidth) {
        const isMobile = screenWidth < 640; // Typical mobile breakpoint
        
        return {
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            margin: isMobile ? {
                t: 10,
                b: 10,
                l: 35,
                r: 10
            } : {
                t: 20,
                b: 20,
                l: 50,
                r: 20
            },
            font: {
                family: 'Inter, sans-serif',
                color: '#fff',
                size: isMobile ? 10 : 12
            },
            title: {
                font: {
                    family: 'Space Grotesk, sans-serif',
                    color: '#fff',
                    size: isMobile ? 14 : 16
                }
            },
            xaxis: {
                gridcolor: '#374151',
                linecolor: '#374151',
                zerolinecolor: '#374151',
                tickfont: {
                    family: 'Inter, sans-serif',
                    color: '#9CA3AF',
                    size: isMobile ? 10 : 12
                },
                automargin: true
            },
            yaxis: {
                gridcolor: '#374151',
                linecolor: '#374151',
                zerolinecolor: '#374151',
                tickfont: {
                    family: 'Inter, sans-serif',
                    color: '#9CA3AF',
                    size: isMobile ? 10 : 12
                },
                automargin: true
            },
            legend: {
                font: {
                    family: 'Inter, sans-serif',
                    color: '#fff',
                    size: isMobile ? 10 : 12
                },
                orientation: isMobile ? 'h' : 'v',
                yanchor: isMobile ? 'bottom' : 'auto',
                y: isMobile ? -0.5 : null
            },
            colorway: ['#C4B5FD', '#93C5FD', '#6EE7B7', '#FDE68A', '#FCA5A5']
        };
    }

    onMount(async () => {
        if (browser) {
            try {
                const Plotly = await import('plotly.js-dist');
                const response = await fetch(jsonPath);
                const plotData = await response.json();
                
                const isMobile = width < 640;
                const layout = {
                    ...getLayout(width),
                    ...plotData.layout,
                    // Disable drag interactions on mobile
                    dragmode: isMobile ? false : 'zoom',
                    // Freeze the plot on mobile
                    staticPlot: isMobile
                };

                const dataWithoutTooltips = plotData.data.map(trace => ({
                    ...trace,
                    hoverinfo: 'none'
                }));

                await Plotly.default.newPlot(plotlyDiv, dataWithoutTooltips, layout, {
                    responsive: true,
                    displayModeBar: false,
                    modeBarButtonsToRemove: ['lasso2d', 'select2d'],
                    displaylogo: false,
                    toImageButtonOptions: {
                        format: 'png',
                        filename: 'plot',
                        height: 500,
                        width: 700,
                        scale: 2
                    }
                });

                // Handle resize events
                const handleResize = () => {
                    Plotly.default.relayout(plotlyDiv, getLayout(window.innerWidth));
                };
                window.addEventListener('resize', handleResize);
                return () => window.removeEventListener('resize', handleResize);
            } catch (err) {
                error = err.message;
                console.error('Error loading plot:', err);
            } finally {
                loading = false;
            }
        }
    });
</script>

<svelte:window bind:innerWidth={width} />

<div class="w-full">
    {#if loading}
        <div class="min-h-[300px] md:h-[500px] flex items-center justify-center bg-gray-800/50 rounded-lg">
            <span class="text-gray-400">Loading visualization...</span>
        </div>
    {:else if error}
        <div class="min-h-[300px] md:h-[500px] flex items-center justify-center bg-gray-800/50 rounded-lg">
            <span class="text-red-400">Error loading plot: {error}</span>
        </div>
    {/if}
    <div bind:this={plotlyDiv} class="w-full min-h-[300px] md:h-[500px]"></div>
</div>