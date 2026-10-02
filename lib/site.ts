/* Who Kamal is, said once. Search engines and AI assistants trust a fact more
   when it reads the same everywhere, so metadata, JSON-LD and llms.txt all
   come from here (llms.txt is static; keep it in step by hand). */

export const SITE_URL = 'https://kamalsaloi.vercel.app';

export const PERSON = {
  name: 'Kamal Saloi',
  jobTitle: 'Product Designer',
  employer: 'AiDOOS',
  employerUrl: 'https://aidoos.com',
  city: 'Bangalore',
  country: 'India',
  /** The one line used on every profile. */
  summary:
    'Product designer at AiDOOS in Bangalore. I design AI products end to end, from the first research call to the shipped frontend. Open to remote work.',
  /** Same idea in the third person, for meta descriptions. */
  description:
    'Kamal Saloi is a product designer at AiDOOS in Bangalore who designs AI products end to end, from research to the shipped frontend. Open to remote work.',
  sameAs: [
    'https://www.linkedin.com/in/kamal-saloi-01731b342/',
    'https://x.com/KamalSaloi15710',
  ],
  knowsAbout: [
    'Product design',
    'UX design',
    'AI product design',
    'Landing pages',
    'Design systems',
    'Frontend development',
    'React',
    'Next.js',
  ],
};

export const PERSON_ID = `${SITE_URL}/#person`;

/** Serialise JSON-LD for a <script> tag, escaping `<` so it can't close the tag. */
export function jsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
