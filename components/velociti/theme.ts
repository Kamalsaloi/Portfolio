/** Tokens read off the finalized Velociti Paper frame (GK-0), carried over
    from the velociti repo unchanged. */
export const T = {
  shell: '#F3F5F9',
  surface: '#FFFFFF',
  line: '#E4E8F1',
  lineSoft: '#EDF0F6',
  lineFaint: '#F1F3F8',
  ink: '#101733',
  body: '#3A4560',
  muted: '#79839C',
  dim: '#A3ACC0',
  blue: '#2B44D6',
  navy: '#1E2C8A',
  railIdle: '#9CA3B4',
  railDone: '#5B6480',
  tint: {
    persona: '#DCEEE4',
    personaInk: '#3E6E56',
    activity: '#DEE1F7',
    activityInk: '#4A509B',
    step: '#FAE7CD',
    stepInk: '#8A6535',
    detail: '#EEE6F8',
    detailInk: '#7059A0',
  },
} as const;

export const EASE = [0.22, 1, 0.36, 1] as const;
