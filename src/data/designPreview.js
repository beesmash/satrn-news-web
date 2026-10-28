// VISUAL DESIGN FIXTURE — these illustrative headlines and stock-photo URLs are
// intentionally NOT published articles, current news, independently verified
// reporting, or SATRN editorial output. Never put them into articles.json.
const photo = id => 'https://images.unsplash.com/' + id + '?auto=format&fit=crop&w=760&q=68';
const item = (title, category, image, section='news', date='May 24, 2025') =>
  ({title,category,image:photo(image),section,date,preview:true});
export const preview = {
 lead: item('New Global Accord Aims to Safeguard Earth’s Future', 'WORLD', 'photo-1446776811953-b23d57bd21aa', 'world-news'),
 hero: [
  item('U.S. Jobs Report Surprises Markets With Strong Gains','U.S. NEWS','photo-1520869562399-e772f042f422','us-news'),
  item('Breakthrough Chip Could Redefine Computing Power','TECHNOLOGY','photo-1518770660439-4636190af475','technology'),
  item('Global Markets Rally on Easing Inflation Data','BUSINESS','photo-1611974789855-9c2a0a7236a3','business'),
  item('Champions League Final: A Night of Drama in Madrid','SPORT','photo-1579952363873-27f3bade9f55','sport')
 ],
 headlines: ['Ceasefire Talks Resume in Middle East','WHO Warns of New Global Health Threat','Japan Unveils Plan for Lunar Base by 2035','Oil Prices Dip as OPEC+ Boosts Output','EU Approves Landmark AI Regulation'],
 latest: [
  item('Ukraine Launches New Drone Offensive in Black Sea','WORLD','photo-1473968512647-3e447244af8f','world-news'),
  item('Universities Face Funding Crisis Across the Globe','EDUCATION','photo-1531058020387-3be344556be6','education'),
  item('Venice Biennale Opens With Bold New Visions','CULTURE','photo-1531058020387-3be344556be6','culture'),
  item('Record Heatwaves Hit South Asia Early This Year','ENVIRONMENT','photo-1500534623283-312aade485b7','environment'),
  item('Tech Giants Announce $200B Investment in AI','TECHNOLOGY','photo-1518770660439-4636190af475','technology')
 ],
 world: [
  item('Israel–Hamas Truce Talks Show Signs of Progress','WORLD','photo-1486406146926-c627a92ad1ab','world-news'),
  item('China and ASEAN Deepen Trade and Security Ties','WORLD','photo-1500534623283-312aade485b7','world-news'),
  item('Floods Displace Thousands in Southern Brazil','WORLD','photo-1500530855697-b586d89ba3ee','world-news')
 ],
 us: [
  item('Supreme Court Weighs Major Voting Rights Case','U.S. NEWS','photo-1520869562399-e772f042f422','us-news'),
  item('Biden Administration Expands Clean Energy Goals','U.S. NEWS','photo-1497435334941-8c899ee9e8e9','us-news'),
  item('FBI Warns of Rising Cybercrime Threats','U.S. NEWS','photo-1518770660439-4636190af475','us-news')
 ],
 politics: [
  item('Congress Debates $1.2T Infrastructure Package','POLITICS','photo-1520869562399-e772f042f422','us-politics'),
  item('2025 Midterm-Era Battles Take Shape','POLITICS','photo-1494412519320-aa613dfb7738','us-politics'),
  item('EU Leaders Push for Stronger Defense Union','POLITICS','photo-1486406146926-c627a92ad1ab','us-politics')
 ],
 janus: [
  item('De-Dollarization: A New Global Monetary Era?','ANALYSIS','photo-1611974789855-9c2a0a7236a3','janus-intelligence'),
  item('The Geopolitics of Critical Minerals','WATCH','photo-1451187580459-43490279c0fa','janus-intelligence'),
  item('AI Governance in 2030: Three Possible Futures','SCENARIO','photo-1518770660439-4636190af475','janus-intelligence'),
  item('Is a Global Recession Still on the Horizon?','OUTLOOK','photo-1559526324-4b87b5e36e44','janus-intelligence')
 ],
 business: [
  item('Major Airlines Order Record 500 Jets','BUSINESS','photo-1486406146926-c627a92ad1ab','business'),
  item('Retail Giants Face Pressure as Shoppers Tighten Budgets','BUSINESS','photo-1441986300917-64674bd600d8','business'),
  item('Startup Funding Rebounds in Q2','BUSINESS','photo-1497366811353-6870744d04b2','business')
 ],
 markets: [
  item('S&P 500 Hits New High as Investors Bet on Growth','FINANCIAL MARKETS','photo-1611974789855-9c2a0a7236a3','markets'),
  item('Bitcoin Surges Above $70,000 Milestone','FINANCIAL MARKETS','photo-1518546305927-5a555bb7020d','markets'),
  item('Fed Signals Patience on Interest Rates','FINANCIAL MARKETS','photo-1520869562399-e772f042f422','markets'),
  item('Gold Prices Rise Amid Global Uncertainty','FINANCIAL MARKETS','photo-1610375461246-83df859d849d','markets')
 ],
 science: [
  item('New Gene Therapy Shows Promise for Rare Disease','SCIENCE','photo-1532094349884-543bc11b234d','science'),
  item('NASA Discovers Potentially Habitable Exoplanet','SCIENCE','photo-1446776811953-b23d57bd21aa','science'),
  item('Breakthrough in Quantum Energy Efficiency','SCIENCE','photo-1518770660439-4636190af475','science')
 ],
 technology: [
  item('AI Systems Enter a New Era of Collaboration','TECHNOLOGY','photo-1485827404703-89b55fcc595e','technology'),
  item('Apple Reveals Mixed Reality Headset 2','TECHNOLOGY','photo-1518770660439-4636190af475','technology'),
  item('Cybersecurity Firm Exposes Global Data Breach','TECHNOLOGY','photo-1558494949-ef010cbdcc31','technology'),
  item('5G Expansion Accelerates Worldwide','TECHNOLOGY','photo-1518770660439-4636190af475','technology')
 ],
 environment: [
  item('Amazon Deforestation Hits 15-Year Low','ENVIRONMENT','photo-1441974231531-c6227db76b6e','environment'),
  item('Ocean Cleanup Project Reaches New Milestone','ENVIRONMENT','photo-1518837695005-2083093ee35b','environment'),
  item('Renewables Hit Record Share of Global Power','ENVIRONMENT','photo-1497435334941-8c899ee9e8e9','environment')
 ],
 society: [
  item('Youth Mental Health Crisis Alarms Experts','SOCIETY','photo-1529156069898-49953e39b3ac','society'),
  item('Global Literacy Rate Continues to Improve','SOCIETY','photo-1524578271613-d550eacf6090','society'),
  item('Urbanization Trends Reshape Megacities','SOCIETY','photo-1519501025264-65ba15a82390','society')
 ],
 progress: [
  item('Poverty Rate Drops to Lowest Level in Decade','WORLD PROGRESS','photo-1469474968028-56623f02e42e','world-progress'),
  item('Innovations Driving Sustainable Agriculture','WORLD PROGRESS','photo-1500382017468-9049fed747ef','world-progress'),
  item('Clean Water Access Expands Globally','WORLD PROGRESS','photo-1437482078695-73f5ca6c96e2','world-progress')
 ],
 culture: [
  item('Cannes 2025: Films That Stand Out','CULTURE','photo-1579783902614-a3fb3927b6a5','culture'),
  item('Global Music Chart: Top Hits This Week','CULTURE','photo-1514525253161-7a46d19cd819','culture'),
  item('Celebrating Indigenous Voices in Literature','CULTURE','photo-1524578271613-d550eacf6090','culture')
 ],
 lifestyle: [
  item('Top Travel Destinations for Summer 2025','LIFESTYLE','photo-1546069901-ba9599a7e63c','lifestyle'),
  item('Minimalism Gains Ground in Busy Lives','LIFESTYLE','photo-1497366811353-6870744d04b2','lifestyle'),
  item('Best Smartwatches for Everyday Use','LIFESTYLE','photo-1523275335684-37898b6baf30','lifestyle')
 ],
 sport: [
  item('NBA Playoffs: Teams Eye the Finals','SPORT','photo-1546519638-68e109498ffc','sport'),
  item('Tennis Star Wins Rome Open','SPORT','photo-1595435934249-5df7ed86e1c0','sport'),
  item('Formula 1: Monaco GP Highlights','SPORT','photo-1503376780353-7e6692767b70','sport')
 ],
 videos:[
  item('Global News Update','SATRN TV','photo-1446776811953-b23d57bd21aa','videos'),
  item('Inside the AI Revolution','SATRN TV','photo-1485827404703-89b55fcc595e','videos'),
  item('The Future of Energy','SATRN TV','photo-1497435334941-8c899ee9e8e9','videos'),
  item('Beyond the Headlines','SATRN TV','photo-1518770660439-4636190af475','videos'),
  item('Exploring Our Planet','SATRN TV','photo-1469474968028-56623f02e42e','videos')
 ],
 more: [
  item('Poland Boosts Military Spending','WORLD','photo-1473968512647-3e447244af8f','world-news'),
  item('California Advances AI Safety Bill','U.S. NEWS','photo-1494412519320-aa613dfb7738','us-news'),
  item('Amazon Invests in Nuclear Energy','BUSINESS','photo-1497435334941-8c899ee9e8e9','business'),
  item('Google Unveils New Search Experience','TECHNOLOGY','photo-1558494949-ef010cbdcc31','technology'),
  item('Great Barrier Reef Shows Signs of Recovery','ENVIRONMENT','photo-1518837695005-2083093ee35b','environment'),
  item('Global Refugee Numbers Reach Record High','SOCIETY','photo-1529156069898-49953e39b3ac','society')
 ]
};
