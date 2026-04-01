# portfolio

Next.js portfolio site with TypeScript and Tailwind.

## stack

- Next.js 13+ (app router)
- TypeScript
- Tailwind CSS

## setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

## structure

```
src/
├── app/              # routes and pages
├── components/       # react components
│   ├── layout/      # header, footer, nav
│   ├── sections/    # hero, about, skills, projects
│   └── ui/          # buttons, cards, inputs
├── data/            # content (projects, skills, experience)
├── hooks/           # custom hooks
├── lib/             # utils and helpers
└── types/           # typescript types

public/              # static assets
```

## deployment

Push to GitHub and deploy on Vercel. That's it.

## customization

- Update content in `src/data/`
- Add images to `public/`
- Tweak styles in `tailwind.config.js`