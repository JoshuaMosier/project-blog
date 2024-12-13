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
    feed.addItem({
      title: post.title,
      id: `https://joshmosier.com${post.path}`,
      link: `https://joshmosier.com${post.path}`,
      description: postContent[post.id]?.slice(0, 200) + '...',
      date: new Date(post.date),
      image: post.image ? `https://joshmosier.com${post.image}` : undefined
    });
  });

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=0, s-maxage=3600'
    }
  });
}