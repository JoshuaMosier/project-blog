import { Feed } from 'feed';
import { posts } from '$lib/posts';
import { postContent } from '$lib/postContent';

export async function GET() {
  const feed = new Feed({
    title: "Josh Mosier's Blog",
    description: "Personal portfolio and blog of Josh Mosier",
    id: "https://joshmosier.com/",
    link: "https://joshmosier.com/",
    language: "en",
    image: "https://joshmosier.com/favicon.png",
    favicon: "https://joshmosier.com/favicon.png",
    copyright: `All rights reserved ${new Date().getFullYear()}, Josh Mosier`,
    author: {
      name: "Josh Mosier",
      email: "josh.r.mosier@gmail.com",
      link: "https://joshmosier.com/about"
    }
  });

  posts.forEach(post => {
    console.log('Processing post:', post.id);
    console.log('Post content available:', !!postContent[post.id]);

    let firstImage;
    let content = '';

    try {
      if (postContent[post.id]) {
        const match = postContent[post.id].match(/const items = \[(.*?)\]/s);
        if (match) {
          const items = JSON.parse(`[${match[1]}]`);
          firstImage = items[0]?.src;
        }

        content = postContent[post.id]
          .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
          .replace(/^\s+/, '');
      } else {
        console.warn(`No content found for post: ${post.id}`);
        content = post.title;
      }
    } catch (e) {
      console.error(`Error processing post ${post.id}:`, e);
      firstImage = post.image;
      content = post.title;
    }

    feed.addItem({
      title: post.title,
      id: `https://joshmosier.com${post.path}`,
      link: `https://joshmosier.com${post.path}`,
      description: `
        ${firstImage ? `<img src="https://joshmosier.com${firstImage}" />` : ''}
        ${content.slice(0, 200)}...
      `,
      date: new Date(post.date),
      image: firstImage ? `https://joshmosier.com${firstImage}` : (post.image ? `https://joshmosier.com${post.image}` : undefined)
    });
  });

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=0, s-maxage=3600'
    }
  });
}