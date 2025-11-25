<script>
    import SocialIcons from '$lib/components/SocialIcons.svelte';
</script>

<div class="max-w-4xl mx-auto">
    <div class="flex flex-col md:flex-row items-start gap-8 mb-12 animate-fade-in-up">
        <div class="flex-1">
            <h1 class="text-4xl md:text-5xl font-bold mb-6 font-display">
                <span class="bg-gradient-to-r from-violet-400 to-accent-teal bg-clip-text text-transparent">About Me</span>
            </h1>
            <p class="text-lg leading-relaxed mb-6 text-slate-300">
                Hi there! I'm Josh Mosier, a software developer and mechanical engineering graduate who enjoys collecting skills
                and making stuff I think is neat.
            </p>
            <SocialIcons />
        </div>
        <div class="relative flex-shrink-0">
            <div class="md:w-56 md:h-56 rounded-2xl overflow-hidden shadow-xl border-2 border-violet-400/20">
                <img 
                    src="/profile-color.png" 
                    alt="Josh Mosier" 
                    class="w-full h-full object-cover"
                />
            </div>
            <div class="absolute -inset-2 rounded-2xl bg-gradient-to-br from-violet-500/10 to-accent-teal/10 blur-xl -z-10"></div>
        </div>
    </div>

    <section class="prose prose-invert prose-lg max-w-none">
        <h2 class="text-2xl md:text-3xl font-semibold mb-6 font-display flex items-center gap-3">
            <span class="w-8 h-0.5 bg-gradient-to-r from-violet-400 to-transparent"></span>
            <span class="text-slate-100">Making & Creating</span>
        </h2>
        <p class="mb-8 text-slate-400">
            My engineering background drives me to build across multiple disciplines. Whether I'm developing AI systems,
            designing custom electronics, or crafting physical objects, I enjoy the challenge of bringing ideas to life.
            I'm constantly exploring the intersection of software, electronics, and fabrication.
        </p>

        <!-- Skills Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2 mb-10 not-prose">
            <div class="bg-bg-secondary/80 px-6 py-5 rounded-xl border border-bg-tertiary hover:border-teal-800/50 transition-colors duration-300 group">
                <h3 class="font-semibold text-accent-teal font-display text-lg mb-3 flex items-center gap-2">
                    <svg class="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    Software Development
                </h3>
                <ul class="space-y-1.5 text-slate-400">
                    <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-teal-500/50"></span>AI/ML</li>
                    <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-teal-500/50"></span>Python/JavaScript/C++</li>
                    <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-teal-500/50"></span>Data Analysis</li>
                    <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-teal-500/50"></span>Web Development</li>
                </ul>
            </div>
            <div class="bg-bg-secondary/80 px-6 py-5 rounded-xl border border-bg-tertiary hover:border-violet-800/50 transition-colors duration-300 group">
                <h3 class="font-semibold text-accent-violet-light font-display text-lg mb-3 flex items-center gap-2">
                    <svg class="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                    Hardware & Electronics
                </h3>
                <ul class="space-y-1.5 text-slate-400">
                    <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-violet-500/50"></span>Embedded Systems</li>
                    <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-violet-500/50"></span>PCB Design</li>
                    <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-violet-500/50"></span>Microcontroller Programming</li>
                    <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-violet-500/50"></span>Sensor Integration</li>
                </ul>
            </div>
            <div class="bg-bg-secondary/80 px-6 py-5 rounded-xl border border-bg-tertiary hover:border-fuchsia-800/50 transition-colors duration-300 group">
                <h3 class="font-semibold text-fuchsia-400 font-display text-lg mb-3 flex items-center gap-2">
                    <svg class="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                    Design & Manufacturing
                </h3>
                <ul class="space-y-1.5 text-slate-400">
                    <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-fuchsia-500/50"></span>CAD/CAM</li>
                    <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-fuchsia-500/50"></span>Additive Manufacturing</li>
                    <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-fuchsia-500/50"></span>Rapid Prototyping</li>
                    <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-fuchsia-500/50"></span>Digital Fabrication</li>
                </ul>
            </div>
            <div class="bg-bg-secondary/80 px-6 py-5 rounded-xl border border-bg-tertiary hover:border-slate-600/50 transition-colors duration-300 group">
                <h3 class="font-semibold text-slate-300 font-display text-lg mb-3 flex items-center gap-2">
                    <svg class="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Engineering
                </h3>
                <ul class="space-y-1.5 text-slate-400">
                    <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-slate-500/50"></span>Mechanical Design</li>
                    <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-slate-500/50"></span>System Integration</li>
                    <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-slate-500/50"></span>Product Development</li>
                    <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-slate-500/50"></span>Technical Documentation</li>
                </ul>
            </div>
        </div>

        <p class="mb-6 text-slate-400">
            Feel free to reach out at <a href="mailto:josh.r.mosier@gmail.com" class="text-accent-teal hover:text-accent-teal-light transition-colors">
            josh.r.mosier@gmail.com</a>, connect with me on <a href="https://linkedin.com/in/joshua-mosier" class="text-accent-teal hover:text-accent-teal-light transition-colors">LinkedIn</a>,
            or view my <a href="/resume" class="text-accent-teal hover:text-accent-teal-light transition-colors">resume</a>.
        </p>
    </section>
</div>
