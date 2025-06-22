/* --------------------------------------------------------------------------
   src/app/schedule-builder/page.tsx
   — Interactive Class-Schedule Builder
   Tailwind v4 · shadcn/ui · React state (no backend yet)
-------------------------------------------------------------------------- */
'use client';

import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

/* shadcn/ui atoms */
import {
  Card, CardHeader, CardTitle, CardContent, CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

/* ---------- Config ---------- */
const DAYS   = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] as const;
const PERIOD = [
  { id: 'p1', label: '08:00 – 09:00' },
  { id: 'p2', label: '09:00 – 10:00' },
  { id: 'p3', label: '10:00 – 11:00' },
  { id: 'p4', label: '11:00 – 12:00' },
  { id: 'p5', label: '13:00 – 14:00' },
  { id: 'p6', label: '14:00 – 15:00' },
  { id: 'p7', label: '15:00 – 16:00' },
  { id: 'p8', label: '16:00 – 17:00' },
];

/* ---------- Types ---------- */
type Day      = typeof DAYS[number];
type PeriodId = typeof PERIOD[number]['id'];
type Schedule = Record<Day, Record<PeriodId, string>>;

/* ---------- Helpers ---------- */
const blankSchedule: Schedule = DAYS.reduce((acc, d) => {
  acc[d] = PERIOD.reduce((p, { id }) => ({ ...p, [id]: '' }), {});
  return acc;
}, {} as Schedule);

/* ---------- Page ---------- */
export default function ScheduleBuilderPage() {
  const [schedule, setSchedule]   = useState<Schedule>({ ...blankSchedule });
  const [day,      setDay]        = useState<Day>('Mon');
  const [period,   setPeriod]     = useState<PeriodId>('p1');
  const [subject,  setSubject]    = useState('');

  /* add / overwrite slot -------------------------------------------------- */
  function addEntry() {
    if (!subject.trim()) return;
    setSchedule((prev) => ({
      ...prev,
      [day]: { ...prev[day], [period]: subject.trim() },
    }));
    setSubject('');
  }

  /* clear entire grid ----------------------------------------------------- */
  function clearAll() {
    setSchedule({ ...blankSchedule });
  }

  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-12 px-4 py-12">
      {/* ─ Heading ─────────────────────────────────────────────── */}
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Build Your Class Schedule
        </h1>
        <p className="mt-2 text-muted-foreground">
          Add subjects to any slot, then export or save later.
        </p>
      </header>

      {/* ─ Builder panel ───────────────────────────────────────── */}
      <Card className="max-w-xl self-center">
        <CardHeader>
          <CardTitle>Add / Update a Slot</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Select value={day} onValueChange={(v) => setDay(v as Day)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Day" />
              </SelectTrigger>
              <SelectContent>
                {DAYS.map((d) => (
                  <SelectItem key={d} value={d}>{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={period}
              onValueChange={(v) => setPeriod(v as PeriodId)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Period" />
              </SelectTrigger>
              <SelectContent>
                {PERIOD.map(({ id, label }) => (
                  <SelectItem key={id} value={id}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Input
            placeholder="Subject (e.g. Physics)"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </CardContent>

        <CardFooter className="flex gap-4">
          <Button onClick={addEntry} className="flex-1">
            <Plus className="mr-2 h-4 w-4" /> Save slot
          </Button>
          <Button variant="destructive" onClick={clearAll}>
            <Trash2 className="mr-2 h-4 w-4" /> Clear all
          </Button>
        </CardFooter>
      </Card>

      <Separator />

      {/* ─ Timetable grid ──────────────────────────────────────── */}
      <section className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="w-24 border-b py-3 text-left font-semibold">Time</th>
              {DAYS.map((d) => (
                <th key={d} className="border-b py-3 text-left font-semibold">{d}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PERIOD.map(({ id, label }) => (
              <tr key={id} className="border-t">
                <td className="whitespace-nowrap py-2 font-medium">{label}</td>
                {DAYS.map((d) => (
                  <td key={d} className="border-l p-2 align-top">
                    {schedule[d][id] && (
                      <span className="inline-block rounded bg-brand px-2 py-1 text-xs font-medium text-white">
                        {schedule[d][id]}
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
