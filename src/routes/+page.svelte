<script>
    import { onMount } from 'svelte';
    import ProjectCabinet from '../components/ProjectCabinet.svelte';
    
    // Function to parse date string (assuming format is "MMM DD")
    function parseDate(dateStr, year) {
      const [month, day] = dateStr.split(' ');
      const monthIndex = new Date(`${month} 1, 2000`).getMonth();
      return new Date(year, monthIndex, parseInt(day));
    }

    // Load project data from filenames
    const projectFiles = import.meta.glob('/static/projects/*.{png,jpg,jpeg,gif}', { eager: true });
    const projectsByYear = Object.entries(projectFiles).reduce((acc, [path, module]) => {
        const filename = path.split('/').pop();
        const [year, date, ...titleParts] = filename.split('_');
        const title = titleParts.join(' ').replace(/\.[^/.]+$/, "");
        
        if (!acc[year]) acc[year] = [];
        acc[year].push({
            title,
            date,
            imageFilename: filename,
            year: parseInt(year),
            fullDate: parseDate(date, year)
        });
        return acc;
    }, {});

    // Flatten and sort all projects
    const allProjects = Object.values(projectsByYear).flat().sort((a, b) => b.fullDate - a.fullDate);

    // Group sorted projects by year
    const sortedProjectsByYear = allProjects.reduce((acc, project) => {
      if (!acc[project.year]) acc[project.year] = [];
      acc[project.year].push(project);
      return acc;
    }, {});

    let projectCabinet;
    let highlightedProject = null;

    function handleProjectFocus(event) {
        highlightedProject = event.detail;
    }

    function handleProjectListHover(project) {
        if (projectCabinet) {
            projectCabinet.focusProject(project);
        }
    }

    onMount(() => {
        // Any additional setup if needed
    });
</script>

<div class="flex">
  <div class="w-1/2 pr-8">
    <h1 class="text-5xl font-bold mb-8 text-purple-300">Posts</h1>

    <section>
      {#each Object.entries(sortedProjectsByYear).sort((a, b) => b[0] - a[0]) as [year, projects]}
        <div class="mb-8">
          <h2 class="text-3xl font-bold mb-4 text-gray-400">{year}</h2>
          <ul class="space-y-2">
            {#each projects as project}
              <li class="flex justify-between items-baseline">
                <a 
                  href="#" 
                  class="text-blue-300 hover:text-blue-400 text-lg {highlightedProject === project ? 'font-bold' : ''}"
                  on:mouseenter={() => handleProjectListHover(project)}
                >
                  {project.title}
                </a>
                <span class="text-gray-500">{project.date}</span>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </section>
  </div>

  <div class="w-1/2">
    <ProjectCabinet 
      bind:this={projectCabinet}
      projects={allProjects} 
      on:projectFocus={handleProjectFocus}
    />
  </div>
</div>