import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function generatePostContent() {
    const postsDir = path.join(__dirname, '../src/posts');
    const outputFile = path.join(__dirname, '../src/lib/postContent.js');
    
    const postContent = {};
    
    // Read all markdown files
    const files = fs.readdirSync(postsDir).filter(file => file.endsWith('.md'));
    
    for (const file of files) {
        const id = path.basename(file, '.md');
        const content = fs.readFileSync(path.join(postsDir, file), 'utf-8');
        
        // Process content: remove frontmatter, HTML tags, and code blocks
        const processedContent = content
            .replace(/---[\s\S]*?---/, '') // Remove frontmatter
            .replace(/<[^>]*>/g, ' ')      // Remove HTML tags
            .replace(/```[\s\S]*?```/g, '') // Remove code blocks
            .replace(/\s+/g, ' ')          // Normalize whitespace
            .trim();
        
        postContent[id] = processedContent;
    }
    
    // Generate the JavaScript file
    const fileContent = `// Generated file - do not edit directly
export const postContent = ${JSON.stringify(postContent, null, 2)};
`;
    
    fs.writeFileSync(outputFile, fileContent);
    console.log('Post content map generated successfully!');
}

generatePostContent();