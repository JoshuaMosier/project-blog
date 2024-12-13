<script>
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';

    export let jsonPath;
    let plotlyDiv;
    let loading = true;
    let error = null;

    // Default theme configuration
    const defaultLayout = {
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        margin: {
            t: 20,
            b: 20,
            l: 50,
            r: 20
        },
        font: {
            family: 'Inter, sans-serif',
            color: '#fff'
        },
        title: {
            font: {
                family: 'Space Grotesk, sans-serif',
                color: '#fff'
            }
        },
        xaxis: {
            gridcolor: '#374151',
            linecolor: '#374151',
            zerolinecolor: '#374151',
            tickfont: {
                family: 'Inter, sans-serif',
                color: '#9CA3AF'
            }
        },
        yaxis: {
            gridcolor: '#374151',
            linecolor: '#374151',
            zerolinecolor: '#374151',
            tickfont: {
                family: 'Inter, sans-serif',
                color: '#9CA3AF'
            }
        },
        legend: {
            font: {
                family: 'Inter, sans-serif',
                color: '#fff'
            }
        },
        colorway: ['#C4B5FD', '#93C5FD', '#6EE7B7', '#FDE68A', '#FCA5A5']
    };

    onMount(async () => {
        if (browser) {
            try {
                const Plotly = await import('plotly.js-dist');
                const response = await fetch(jsonPath);
                const plotData = await response.json();
                
                // Merge default layout with provided layout
                const layout = {
                    ...defaultLayout,
                    ...plotData.layout,
                };

                // When creating the plot, modify the data to disable tooltips
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
            } catch (err) {
                error = err.message;
                console.error('Error loading plot:', err);
            } finally {
                loading = false;
            }
        }
    });
</script>

<div class="w-full">
    {#if loading}
        <div class="h-[500px] flex items-center justify-center bg-gray-800/50 rounded-lg">
            <span class="text-gray-400">Loading visualization...</span>
        </div>
    {:else if error}
        <div class="h-[500px] flex items-center justify-center bg-gray-800/50 rounded-lg">
            <span class="text-red-400">Error loading plot: {error}</span>
        </div>
    {/if}
    <div bind:this={plotlyDiv} class="w-full h-[500px]"></div>
</div>