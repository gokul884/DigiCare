import fetch from 'node-fetch';

async function run() {
  const res = await fetch('https://omnirangesolutions.blogspot.com/feeds/posts/default?alt=json&max-results=50');
  const data = await res.json() as any;
  const entries = data.feed?.entry || [];
  const entry = entries.find((e: any) => (e.title?.$t || '').includes('what is digital marketing agency'));
  if (entry) {
    console.log('Categories:', JSON.stringify(entry.category, null, 2));
  } else {
    console.log('Entry not found');
  }
}

run().catch(console.error);
