# Source Tree Structure

```
/
├── .bmad-core/           # BMAD development configuration
├── docs/                 # Documentation
│   ├── architecture/     # Architecture documentation
│   ├── design-system/    # Design system specs
│   └── stories/         # Development stories
├── public/              # Static assets
│   └── imgs/           # Image assets
├── src/
│   └── app/            # Next.js App Router
│       ├── components/ # Reusable React components
│       ├── context/    # React context providers
│       ├── hooks/      # Custom React hooks
│       ├── utilities/  # Utility functions
│       ├── data/       # Static data files
│       ├── about/      # About page
│       ├── home/       # Home page
│       ├── store/      # Store page
│       ├── globals.css # Global styles
│       ├── layout.tsx  # Root layout
│       └── page.tsx    # Home page component
├── package.json        # Project dependencies
├── next.config.ts      # Next.js configuration
├── tailwind.config.ts  # Tailwind configuration
└── tsconfig.json       # TypeScript configuration
```

## Key Directories
- **src/app/components/**: Reusable UI components
- **src/app/context/**: Global state management
- **src/app/hooks/**: Custom React hooks
- **src/app/utilities/**: Helper functions
- **public/imgs/**: Product and UI images