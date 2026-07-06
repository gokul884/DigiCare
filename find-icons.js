import fs from 'fs';

const html = fs.readFileSync('post_html.txt', 'utf-8');

// Check for <svg> tags
const svgCount = (html.match(/<svg/gi) || []).length;
console.log(`Number of <svg> tags in HTML: ${svgCount}`);

// Check for classes containing 'icon' or 'box'
const classRegex = /class=["']([^"']+)["']/gi;
let match;
const classes = new Set();
while ((match = classRegex.exec(html)) !== null) {
  const classNames = match[1].split(/\s+/);
  classNames.forEach(c => {
    if (c.toLowerCase().includes('icon') || c.toLowerCase().includes('box') || c.toLowerCase().includes('card') || c.toLowerCase().includes('block')) {
      classes.add(c);
    }
  });
}

console.log(`Classes matching 'icon', 'box', 'card', or 'block':`, Array.from(classes));

// Print any occurrences of SVG tags or custom icon/box elements
if (svgCount > 0) {
  console.log(`\n=== SVG TAG CONTEXTS ===`);
  const regex = /<svg[\s\S]*?<\/svg>/gi;
  let svgMatch;
  let idx = 0;
  while ((svgMatch = regex.exec(html)) !== null && idx < 5) {
    console.log(`SVG [${idx}]:`);
    console.log(html.substring(Math.max(0, svgMatch.index - 100), Math.min(html.length, svgMatch.index + svgMatch[0].length + 100)));
    console.log(`----------------------------------------`);
    idx++;
  }
}
