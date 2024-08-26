<script>
    // Sample project data - replace with your actual data
    const projectsByYear = {
      2023: [
        { title: "On Air Kickstarter", date: "Dec 15" },
        { title: "Multimodal Haptic Device", date: "Sep 1" },
        { title: "Levitating Halo Ghost", date: "Jun 20" },
      ],
      2022: [
        { title: "Levitating Baby Yoda Crib", date: "Nov 30" },
        { title: "Lasercut VT Map", date: "Aug 15" },
        { title: "Speakirby: Custom 3D printed speaker", date: "May 10" },
        { title: "Arcade Controller for SSBM", date: "Feb 5" },
      ],
      2021: [
        { title: "VT Hacks 2021: Novel Movie Recommender", date: "Oct 20" },
        { title: "HooHacks 2021: Spotify Data Analysis Tool", date: "Apr 12" },
        { title: "3D Printed Windup Toy: Pullback Car", date: "Jan 25" },
      ],
    };

    // Function to parse date string (assuming format is "MMM DD")
    function parseDate(dateStr, year) {
      const [month, day] = dateStr.split(' ');
      const monthIndex = new Date(`${month} 1, 2000`).getMonth();
      return new Date(year, monthIndex, parseInt(day));
    }

    // Flatten and sort all projects
    const allProjects = Object.entries(projectsByYear).flatMap(([year, projects]) =>
      projects.map(project => ({
        ...project,
        year: parseInt(year),
        fullDate: parseDate(project.date, year)
      }))
    ).sort((a, b) => b.fullDate - a.fullDate);

    // Group sorted projects by year
    const sortedProjectsByYear = allProjects.reduce((acc, project) => {
      if (!acc[project.year]) acc[project.year] = [];
      acc[project.year].push(project);
      return acc;
    }, {});
</script>

<h1 class="text-5xl font-bold mb-8 text-purple-300">Posts</h1>

<section>
  {#each Object.entries(sortedProjectsByYear).sort((a, b) => b[0] - a[0]) as [year, projects]}
    <div class="mb-8">
      <h2 class="text-3xl font-bold mb-4 text-gray-400">{year}</h2>
      <ul class="space-y-2">
        {#each projects as project}
          <li class="flex justify-between items-baseline">
            <a href="#" class="text-blue-300 hover:text-blue-400 text-lg">{project.title}</a>
            <span class="text-gray-500">{project.date}</span>
          </li>
        {/each}
      </ul>
    </div>
  {/each}
</section>