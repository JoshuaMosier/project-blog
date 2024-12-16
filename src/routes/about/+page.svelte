<script>
    import SocialIcons from '$lib/components/SocialIcons.svelte';
</script>

<div class="max-w-4xl mx-auto">
    <div class="flex flex-col md:flex-row items-start gap-8 mb-12">
        <div class="flex-1">
            <h1 class="text-5xl font-bold mb-8 text-purple-300">About Me</h1>
            <p class="text-lg leading-relaxed mb-6">
                Hi there! I'm Josh Mosier, a software developer and mechanical engineering graduate who enjoys collecting skills 
                and making stuff I think is neat.
            </p>
            <SocialIcons />
        </div>
        <div class=" md:w-64 md:h-64 rounded-full overflow-hidden shadow-lg border-4 border-purple-300/20 flex-shrink-0">
            <img 
                src="/profile-color.png" 
                alt="Josh Mosier" 
                class="w-full h-full object-cover"
            />
        </div>
    </div>

    <section class="prose prose-invert prose-lg max-w-none">
        <h2 class="text-3xl font-semibold mb-4 text-purple-200">Making & Creating</h2>
        <p class="mb-6">
            My engineering background drives me to build across multiple disciplines. Whether I'm developing AI systems, 
            designing custom electronics, or crafting physical objects, I enjoy the challenge of bringing ideas to life. 
            From training machine learning models to 3D printing prototypes, or designing PCBs to casting metal parts, 
            I'm constantly exploring the intersection of software, electronics, and physical fabrication.
        </p>

        <!-- Skills Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 mb-8">
            <div class="bg-gray-800/50 px-6 py-4 rounded-lg">
                <h3 class="font-semibold text-purple-200 not-prose">Software Development</h3>
                <ul class="list-disc list-inside text-gray-300">
                    <li>Machine Learning & AI</li>
                    <li>Python/JavaScript/C++</li>
                    <li>Data Analysis & Visualization</li>
                    <li>Full Stack Web Development</li>
                </ul>
            </div>
            <div class="bg-gray-800/50 px-6 py-4 rounded-lg">
                <h3 class="font-semibold text-purple-200 not-prose">Hardware & Electronics</h3>
                <ul class="list-disc list-inside text-gray-300">
                    <li>Embedded Systems Design</li>
                    <li>PCB Design & Assembly</li>
                    <li>Microcontroller Programming</li>
                    <li>Sensor Integration</li>
                </ul>
            </div>
            <div class="bg-gray-800/50 px-6 py-4 rounded-lg">
                <h3 class="font-semibold text-purple-200 not-prose">Design & Manufacturing</h3>
                <ul class="list-disc list-inside text-gray-300">
                    <li>CAD/CAM Design</li>
                    <li>Additive Manufacturing</li>
                    <li>Rapid Prototyping</li>
                    <li>Digital Fabrication</li>
                </ul>
            </div>
            <div class="bg-gray-800/50 px-6 py-4 rounded-lg">
                <h3 class="font-semibold text-purple-200 not-prose">Engineering</h3>
                <ul class="list-disc list-inside text-gray-300">
                    <li>Mechanical Design</li>
                    <li>System Integration</li>
                    <li>Product Development</li>
                    <li>Technical Documentation</li>
                </ul>
            </div>
        </div>



        <h2 class="text-3xl font-semibold mb-4 text-purple-200">Let's Connect</h2>
        <p class="mb-6">
            Whether you're interested in AI development, mechanical engineering, or the intersection of both, I'm always 
            open to discussing new ideas and opportunities. Feel free to reach out at josh.r.mosier@gmail.com, 
            connect with me on <a href="https://linkedin.com/in/joshua-mosier" class="text-purple-300 hover:text-purple-400">LinkedIn</a>,
            or view my <a href="/resume" class="text-purple-300 hover:text-purple-400">resume</a>.
        </p>
    </section>
</div>
