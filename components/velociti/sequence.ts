export type Stage = 'overview' | 'generating' | 'canvas' | 'problem' | 'story' | 'live';

export const FIELDS = {
  solution: 'a vetted caregiver marketplace',
  industry: 'elderly care',
  problem: 'families cannot tell who has been checked',
};

/** How long each module stays on screen, reveal included. The Velo AI panel
    runs off the same numbers so the two can never drift apart. */
export const DWELL = { canvas: 6600, problem: 4220, story: 4620 } as const;

export const LOADING = [
  {
    label: 'Reading your product overview',
    subs: ['Parsing the solution', 'Identifying the industry', 'Extracting the problem'],
  },
  {
    label: 'Drafting the product canvas',
    subs: ['Product Vision', 'North Star Metric', 'Jobs To Be Done'],
  },
];

type Job = {
  title: string;
  steps: string[];
  produced: { n: string; label: string; done: boolean }[];
};

export const JOB: Partial<Record<Stage, Job>> = {
  canvas: {
    title: 'Mapping problems and opportunities',
    steps: ['Extracting problems', 'Linking each to an outcome', 'Drafting opportunities'],
    produced: [
      { n: '3', label: 'problems', done: true },
      { n: '6', label: 'opportunities', done: true },
      { n: '0', label: 'experiments', done: false },
    ],
  },
  problem: {
    title: 'Building the story map',
    steps: ['Choosing the persona', 'Mapping activities', 'Writing steps and details'],
    produced: [
      { n: '1', label: 'persona', done: true },
      { n: '4', label: 'activities', done: true },
      { n: '0', label: 'steps', done: false },
    ],
  },
  story: {
    title: 'Sequencing your strategy',
    steps: ['Scoring initiatives', 'Ordering by impact', 'Linking context back'],
    produced: [
      { n: '6', label: 'initiatives', done: true },
      { n: '3', label: 'iterations', done: true },
      { n: '0', label: 'tickets', done: false },
    ],
  },
};

export const DONE_JOB: Job = {
  title: 'Your workspace is ready',
  steps: ['Canvas', 'Problem map', 'Story map', 'Strategy'],
  produced: [
    { n: '9', label: 'canvas blocks', done: true },
    { n: '3', label: 'problems', done: true },
    { n: '6', label: 'initiatives', done: true },
  ],
};

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
