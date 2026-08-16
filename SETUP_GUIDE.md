# Portfolio Setup Guide

## ✅ What's Been Set Up

Your Next.js + Tailwind portfolio is ready! Here's what you have:

### Project Structure
```
portfolio/
├── app/
│   ├── page.tsx          # Homepage with hero, projects, and about
│   ├── layout.tsx        # Root layout with metadata
│   └── globals.css       # Global styles
├── components/
│   ├── Header.tsx        # Navigation header
│   ├── Hero.tsx          # Hero section
│   ├── ProjectCard.tsx   # Project card component
│   └── Footer.tsx        # Footer with links
├── public/               # Static assets (add images here)
└── package.json          # Dependencies
```

### Features Included
- ✨ Modern, responsive design
- 🌙 Dark mode support
- ⚡ Fast performance with Next.js 16
- 🎨 Tailwind CSS for styling
- 📱 Mobile-first design
- 🔍 SEO-friendly with metadata

## 🚀 Next Steps

### 1. Customize Your Content
Edit `app/page.tsx` and update:
- Your name in the Hero section
- Project titles, descriptions, and tags
- About section text

Update `components/Header.tsx`:
- Change "Your Name" in the logo
- Update nav links if needed

Update `components/Footer.tsx`:
- Your social media links
- Footer text

### 2. Add Your Project Images
1. Create a folder in `/public` for your images
2. Add your project screenshots/images
3. Update the `image` paths in the projects array in `app/page.tsx`

Example:
```typescript
{
  id: 1,
  title: 'My Project',
  description: 'Project description',
  tags: ['Tag1', 'Tag2'],
  image: '/projects/project-1.jpg',  // Add path here
}
```

### 3. Create Additional Pages (Optional)

Create new pages in the `app` directory:

**app/projects/page.tsx** - Detailed projects page
```typescript
export default function ProjectsPage() {
  return <div>Projects detail page</div>;
}
```

**app/contact/page.tsx** - Contact form page
```typescript
export default function ContactPage() {
  return <div>Contact form</div>;
}
```

### 4. Deploy to Vercel (Easy!)

**Option A: Using GitHub (Recommended)**
```bash
cd C:\Users\Broqwork_01\portfolio
git add .
git commit -m "Initial portfolio"
git push origin main
```
Then visit [vercel.com/new](https://vercel.com/new) and connect your GitHub repo.

**Option B: Using Vercel CLI**
```bash
npm i -g vercel
vercel
```
Follow the prompts to deploy.

## 🎨 Customization Tips

### Change Colors
Edit `tailwind.config.ts` to customize the color scheme.

### Add More Sections
Add new sections to `app/page.tsx` following the existing structure.

### Update Fonts
Modify font imports in `app/layout.tsx` to use different Google Fonts.

## 📁 Important Files to Update

1. **app/page.tsx** - Main homepage content
2. **components/Header.tsx** - Navigation and branding
3. **components/Footer.tsx** - Links and social media
4. **public/** - Add your project images here
5. **app/layout.tsx** - SEO metadata

## 🌐 Local Development

```bash
# Start dev server
npm run dev

# View at http://localhost:3000
```

## 📦 Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm run start
```

## 🆘 Troubleshooting

**Images not showing?**
- Make sure images are in the `/public` folder
- Check file paths in the projects array

**Styles looking weird?**
- Run `npm install` to ensure all dependencies are installed
- Clear `.next` folder: `rm -rf .next`
- Restart dev server

**Build errors?**
- Check the terminal output for specific errors
- Ensure all component imports are correct

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vercel Docs](https://vercel.com/docs)

---

You're all set! Start customizing your portfolio and deploy it to share with the world. 🎉
