# Deploying Your Portfolio to Vercel

## Quick Start

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial portfolio setup"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [https://vercel.com/new](https://vercel.com/new)
   - Sign in with GitHub
   - Select your portfolio repository
   - Vercel will automatically detect Next.js and configure it
   - Click "Deploy"

## After Deployment

1. **Custom Domain** (Optional)
   - In Vercel dashboard, go to Settings > Domains
   - Add your custom domain
   - Update DNS records as instructed

2. **Environment Variables** (If Needed)
   - Go to Settings > Environment Variables
   - Add any required variables

## Local Development

```bash
npm run dev
# Open http://localhost:3000
```

## Build for Production

```bash
npm run build
npm run start
```

## Project Structure

- `/app` - Next.js App Router pages and layouts
- `/components` - Reusable React components
- `/public` - Static assets (add project images here)
- `tailwind.config.ts` - Tailwind CSS configuration
- `next.config.ts` - Next.js configuration

## Customization

### Update Your Information
Edit these files to personalize your portfolio:
- `app/page.tsx` - Hero section and projects list
- `components/Header.tsx` - Your name in navigation
- `components/Footer.tsx` - Social links and contact info

### Add Project Images
1. Add your project images to `/public` folder
2. Update the image paths in `app/page.tsx`

### Styling
- Tailwind CSS classes are used throughout
- Modify colors in `tailwind.config.ts`
- Dark mode is fully supported

## Need Help?

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
