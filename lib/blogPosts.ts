export type BlogPost = {
  id: number
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  category: string
  image: string
  readTime: string
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'How to Make Money with URL Shorteners in 2024',
    excerpt:
      'Discover the top strategies to monetize your short links and earn passive income online.',
    content:
      'URL shorteners have become a practical monetization channel for creators and marketers. By using multi-step redirects, you can increase ad visibility while still guiding users to the final destination safely. Focus on relevant traffic, transparent messaging, and consistent tracking to improve long-term performance.',
    author: 'Admin',
    date: '2024-01-15',
    category: 'Monetization',
    image: 'https://via.placeholder.com/600x300/6366f1/ffffff?text=Monetization+Guide',
    readTime: '5 min read',
  },
  {
    id: 2,
    title: 'Best Practices for URL Shortening Services',
    excerpt:
      'Learn the essential tips and tricks to optimize your URL shortening strategy.',
    content:
      'Strong URL shortening strategy starts with clean links, clear intent, and reliable destinations. Avoid misleading titles, keep user trust high, and monitor click patterns regularly. Testing placements and audiences helps you improve CTR and overall revenue from each campaign.',
    author: 'Admin',
    date: '2024-01-10',
    category: 'Tips & Tricks',
    image: 'https://via.placeholder.com/600x300/8b5cf6/ffffff?text=Best+Practices',
    readTime: '7 min read',
  },
  {
    id: 3,
    title: 'The Future of Link Management',
    excerpt: 'Explore upcoming trends and technologies that will shape the future.',
    content:
      'Link management is moving toward deeper analytics, fraud detection, and smarter routing. Modern tools now combine shortening, tracking, and audience segmentation in one workflow. Teams that adopt data-driven link optimization early will capture stronger results.',
    author: 'Admin',
    date: '2024-01-05',
    category: 'Industry News',
    image: 'https://via.placeholder.com/600x300/06b6d4/ffffff?text=Future+Trends',
    readTime: '6 min read',
  },
]
