# Personal Blog - Notes from the Road

A fast, minimalist personal site for essays and notes on nondual awareness, travel, and building businesses in Southeast Asia.

## Features

- **Clean, minimal design** with dark/light mode toggle
- **Mobile-first** responsive layout
- **Fast performance** with static generation
- **SEO optimized** with proper meta tags and structured data
- **Multiple content types**: Essays, Notes, Travel logs, Build logs
- **Tag-based organization** and search
- **Reading time estimates**
- **Markdown-based content** management

## Tech Stack

- **Framework:** React + Vite + TypeScript
- **Styling:** Tailwind CSS with custom design system
- **UI Components:** Radix UI + shadcn/ui
- **Fonts:** Inter (UI) + Spectral (content)
- **Icons:** Lucide React
- **Routing:** React Router

## How to Add a New Post

1. **Create the markdown file** in the appropriate content folder:
   ```
   content/posts/essays/your-post-slug.md
   content/posts/notes/your-post-slug.md
   content/posts/travel/your-post-slug.md
   content/posts/build-log/your-post-slug.md
   ```

2. **Use this frontmatter template:**
   ```markdown
   ---
   title: "Your Post Title"
   slug: "your-post-slug"
   date: "2024-01-15"
   tldr: "One sentence summary of the main point"
   tags: ["tag1", "tag2", "tag3"]
   readingTime: 5
   category: "essays" # or "notes", "travel", "build-log"
   ---

   # Your Post Title

   Your content here in markdown...
   ```

3. **Add the post to the appropriate page component** (e.g., `src/pages/Essays.tsx`) in the posts array.

## Available Tags

Use these consistent tags across posts:
- **Nondual:** `nondual`, `awareness`, `presence`, `self-inquiry`, `meditation`
- **Business:** `business`, `startup`, `revenue`, `hiring`, `remote-work`
- **Travel:** `Thailand`, `Cambodia`, `Vietnam`, `digital-nomad`, `expat`, `visa`
- **Tech:** `tech`, `engineering`, `product`, `design`
- **Meta:** `writing`, `reflection`, `process`

## Content Guidelines

### Voice & Tone
- **Direct and calm** - no motivational language
- **Evidence-aware** - back up claims
- **Short paragraphs** - easy mobile reading
- **Strong headlines** - scannable structure

### Structure
- **Lead with TL;DR** in frontmatter
- **Use subheadings** for long posts
- **Include practical info** for travel/business posts
- **End with key lessons** or takeaways

## How to Update "Now" Status

Edit `content/now.md` with your current focus and location.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

The site is configured for static deployment on Vercel, Netlify, or any static hosting provider.

### One-click Deploy

1. **Push to GitHub**
2. **Connect to Vercel/Netlify**
3. **Deploy automatically** on push to main branch

### Manual Build

```bash
npm run build
# Upload dist/ folder to your hosting provider
```

## Performance Features

- **Lazy loading** for images
- **Minimal JavaScript** bundle
- **Optimized fonts** with display swap
- **Fast transitions** with CSS
- **Clean HTML** structure for SEO

## SEO Optimization

- **Semantic HTML** structure
- **Meta descriptions** for all pages  
- **Open Graph** tags for social sharing
- **Structured data** for articles
- **Clean URLs** and internal linking
- **Mobile-optimized** viewport

## Customization

### Colors
Edit `src/index.css` to change the color scheme. Current accent color is muted gold (`--gold`).

### Typography  
- **UI font:** Inter (clean, modern)
- **Content font:** Spectral (readable serif)

### Layout
- **Max width:** 4xl (896px)
- **Responsive breakpoints:** Mobile-first approach
- **Spacing:** Consistent 8px grid system

## Content Roadmap

### Planned Features
- [ ] Search functionality
- [ ] RSS/JSON feeds  
- [ ] Email newsletter signup
- [ ] Related posts suggestions
- [ ] Archive pages by year/tag
- [ ] Reading progress indicator
- [ ] Copy-to-clipboard for code blocks

### Content Ideas
- [ ] Cambodia business formation guide
- [ ] Thailand visa comparison
- [ ] Remote team hiring playbook
- [ ] Nondual awareness FAQ
- [ ] Southeast Asia cost comparison
- [ ] Digital nomad tax strategies

## License

MIT - Feel free to use this as a template for your own personal site.