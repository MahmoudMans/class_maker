/* --------------------------------------------------------------------------
   src/app/schedule-templates/page.tsx
   — Class-Schedule Template Gallery
   Tailwind v4 · shadcn/ui · Lucide icons
   Palette white · black · #0F52BA accent
-------------------------------------------------------------------------- */
'use client';

import { Calendar, LayoutGrid, Repeat, RotateCcw } from 'lucide-react';

/* shadcn/ui atoms */
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

/* ---------- Data ---------- */
interface Template {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

const TEMPLATES: Template[] = [
  {
    id: 'weekly',
    name: 'Weekly Schedule',
    description:
      'Classic Monday-to-Friday grid—perfect for universities and bootcamps.',
    icon: <Calendar className="h-6 w-6" />,
  },
  {
    id: 'block',
    name: 'Block Schedule',
    description:
      '90-minute blocks with passing periods—ideal for high-school cohorts.',
    icon: <LayoutGrid className="h-6 w-6" />,
  },
  {
    id: 'rotating',
    name: 'Rotating Days',
    description:
      'Day-A / Day-B rotation that shuffles periods across the week.',
    icon: <RotateCcw className="h-6 w-6" />,
  },
  {
    id: 'modular',
    name: 'Modular 45-min',
    description:
      'Eight 45-min modules you can rearrange into flexible clusters.',
    icon: <Repeat className="h-6 w-6" />,
  },
];

/* ---------- Page ---------- */
export default function ScheduleTemplatesPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      {/* ── Heading ───────────────────────────────────────────── */}
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Class-Schedule Templates</h1>
        <p className="mt-2 text-muted-foreground">
          Pick a starter layout and customise it in seconds.
        </p>
      </header>

      {/* ── Grid of templates ────────────────────────────────── */}
      <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {TEMPLATES.map((tpl) => (
          <Card
            key={tpl.id}
            className="flex flex-col justify-between border-muted/30 shadow-sm transition hover:shadow-md"
          >
            <CardHeader className="flex flex-row items-center gap-4">
              {tpl.icon}
              <div>
                <CardTitle>{tpl.name}</CardTitle>
                <CardDescription>{tpl.description}</CardDescription>
              </div>
            </CardHeader>

            <CardContent className="mt-4">
              {/* Placeholder preview grid */}
              <div className="grid grid-cols-5 gap-px rounded border border-muted bg-muted/20 p-px">
                {Array.from({ length: 25 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-white/80"
                  />
                ))}
              </div>
            </CardContent>

            <CardFooter className="mt-4 flex justify-end">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  // You can push to a route or open a modal here
                  console.log(`Selected template: ${tpl.id}`);
                }}
              >
                Use this template
              </Button>
            </CardFooter>
          </Card>
        ))}
      </section>
    </main>
  );
}
