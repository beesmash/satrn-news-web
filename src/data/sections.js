// SATRN News v2.1 newsroom taxonomy, adapted from the supplied WordPress theme.
export const navLinks = [
  ['/', 'Home'], ['/news/', 'News'], ['/world-news/', 'World'],
  ['/us-news/', 'U.S.'], ['/us-politics/', 'Politics'], ['/business/', 'Business'],
  ['/science/', 'Science'], ['/technology/', 'Technology'], ['/environment/', 'Environment'],
  ['/janus-intelligence/', 'Intelligence'], ['/opinion/', 'Opinion'],
  ['/markets/', 'Markets'], ['/sport/', 'Sport'], ['/culture/', 'Culture'],
  ['/lifestyle/', 'Lifestyle'], ['/newspapers/', 'Newspapers']
];

export const homeSections = [
 ['world-news','World News'], ['world-videos','World Videos'], ['culture','Culture'],
 ['business','Business'], ['blockchain','Blockchain'], ['crypto-videos','Crypto Videos'],
 ['videos','Videos'], ['science','Science'], ['technology','Technology'],
 ['sport','Sports'], ['soccer-videos','Soccer Videos'], ['racing-videos','Racing Videos']
];

const extraSections = [
 ['breaking-news','Breaking News'], ['us-news','U.S. News'],
 ['us-politics','U.S. Politics'], ['opinion','Opinion'], ['markets','Markets'],
 ['lifestyle','Lifestyle'], ['janus-intelligence','JANUS Intelligence'],
 ['satrn-audio','SATRN Audio'], ['environment','Environment'],
 ['cities','Cities'], ['education','Education'], ['obituaries','Obituaries'],
 ['society','Society'], ['world-progress','World Progress'], ['cartoon','Cartoon'],
 ['columnists','Columnists'], ['the-satrn-view','The SATRN View'], ['commentary','Commentary'],
 ['golf','Golf'], ['mlb','MLB'], ['nba','NBA'], ['nfl','NFL'], ['nhl','NHL'],
 ['racing','Racing'], ['soccer','Soccer'], ['tennis','Tennis'],
 ['arts-design','Arts & Design'], ['books','Books'], ['classical','Classical'],
 ['film','Film'], ['music','Music'], ['theatre','Theatre'], ['tv-radio','TV & Radio'],
 ['beauty','Beauty'], ['cars','Cars'], ['food','Food'], ['health-wellness','Health & Wellness'],
 ['home-garden','Home & Garden'], ['love-relationships','Love & Relationships'],
 ['men','Men'], ['money','Money'], ['recipes','Recipes'], ['travel','Travel'],
 ['women','Women'], ['financial-markets','Financial Markets'], ['economy','Economy'],
 ['banking','Banking'], ['commodities','Commodities'], ['cryptocurrency','Cryptocurrency'],
 ['companies','Companies']
];
export const sections = [...homeSections, ...extraSections];
export const slugToTitle = Object.fromEntries(sections);
export const slugify = value => String(value || '').toLowerCase().trim()
 .replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
export const storyBelongsTo = (article, slug) => {
 const cats = [article.category, ...(article.categories || [])].map(slugify);
 const equivalents = {
  'world-news':['world'], 'us-politics':['politics'], 'us-news':['us'],
  'sport':['sports'], 'janus-intelligence':['intelligence'],
  'markets':['market'], 'science':['sciences']
 };
 return cats.includes(slug) || (equivalents[slug] || []).some(c=>cats.includes(c));
};
