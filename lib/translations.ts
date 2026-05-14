// Chinese team name → English translation map
// Used by the scraper to convert Yupoo album titles to readable names

export const TEAM_MAP: Record<string, { name: string; league: string }> = {
  // Premier League
  '曼城':     { name: 'Manchester City',     league: 'Premier League' },
  '曼联':     { name: 'Manchester United',   league: 'Premier League' },
  '利物浦':   { name: 'Liverpool FC',        league: 'Premier League' },
  '切尔西':   { name: 'Chelsea FC',          league: 'Premier League' },
  '阿森纳':   { name: 'Arsenal FC',          league: 'Premier League' },
  '热刺':     { name: 'Tottenham Hotspur',   league: 'Premier League' },
  '纽卡斯尔': { name: 'Newcastle United',    league: 'Premier League' },
  '西汉姆联': { name: 'West Ham United',     league: 'Premier League' },
  '埃弗顿':   { name: 'Everton FC',          league: 'Premier League' },
  '水晶宫':   { name: 'Crystal Palace',      league: 'Premier League' },
  '狼队':     { name: 'Wolverhampton',       league: 'Premier League' },
  '阿斯顿维拉': { name: 'Aston Villa',       league: 'Premier League' },
  '富勒姆':   { name: 'Fulham FC',           league: 'Premier League' },
  '布莱顿':   { name: 'Brighton & Hove',     league: 'Premier League' },

  // La Liga
  '皇马':     { name: 'Real Madrid',         league: 'La Liga' },
  '巴萨':     { name: 'FC Barcelona',        league: 'La Liga' },
  '马竞':     { name: 'Atlético Madrid',     league: 'La Liga' },
  '塞维利亚': { name: 'Sevilla FC',          league: 'La Liga' },
  '贝蒂斯':   { name: 'Real Betis',          league: 'La Liga' },
  '毕尔巴鄂': { name: 'Athletic Bilbao',     league: 'La Liga' },
  '皇家社会': { name: 'Real Sociedad',       league: 'La Liga' },
  '瓦伦西亚': { name: 'Valencia CF',         league: 'La Liga' },
  '比利亚雷亚尔': { name: 'Villarreal CF',   league: 'La Liga' },

  // Serie A
  '国米':     { name: 'Inter Milan',         league: 'Serie A' },
  '米兰':     { name: 'AC Milan',            league: 'Serie A' },
  '尤文':     { name: 'Juventus FC',         league: 'Serie A' },
  '那不勒斯': { name: 'SSC Napoli',          league: 'Serie A' },
  '罗马':     { name: 'AS Roma',             league: 'Serie A' },
  '拉齐奥':   { name: 'SS Lazio',            league: 'Serie A' },
  '亚特兰大': { name: 'Atalanta BC',         league: 'Serie A' },
  '佛罗伦萨': { name: 'Fiorentina',          league: 'Serie A' },

  // Bundesliga
  '拜仁':     { name: 'Bayern Munich',       league: 'Bundesliga' },
  '多特':     { name: 'Borussia Dortmund',   league: 'Bundesliga' },
  '勒沃库森': { name: 'Bayer Leverkusen',    league: 'Bundesliga' },
  '莱比锡':   { name: 'RB Leipzig',          league: 'Bundesliga' },
  '法兰克福': { name: 'Eintracht Frankfurt', league: 'Bundesliga' },
  '弗赖堡':   { name: 'SC Freiburg',         league: 'Bundesliga' },

  // Ligue 1
  '巴黎':     { name: 'Paris Saint-Germain', league: 'Ligue 1' },
  '马赛':     { name: 'Olympique Marseille', league: 'Ligue 1' },
  '里昂':     { name: 'Olympique Lyon',      league: 'Ligue 1' },
  '摩纳哥':   { name: 'AS Monaco',           league: 'Ligue 1' },
  '里尔':     { name: 'LOSC Lille',          league: 'Ligue 1' },
  '雷恩':     { name: 'Stade Rennais',       league: 'Ligue 1' },

  // Portugal
  '波尔图':   { name: 'FC Porto',            league: 'Overig' },
  '本菲卡':   { name: 'SL Benfica',          league: 'Overig' },
  '体育':     { name: 'Sporting CP',         league: 'Overig' },

  // Saudi Arabia
  '吉达':     { name: 'Al-Ittihad',          league: 'Overig' },
  '利雅得':   { name: 'Al-Nassr',            league: 'Overig' },
  '希拉尔':   { name: 'Al-Hilal',            league: 'Overig' },

  // Latin America
  '弗拉门戈': { name: 'Flamengo',            league: 'Overig' },
  '博卡':     { name: 'Boca Juniors',        league: 'Overig' },
  '河床':     { name: 'River Plate',         league: 'Overig' },
  '美洲':     { name: 'Club América',        league: 'Overig' },
  '老虎':     { name: 'Tigres UANL',         league: 'Overig' },
  '帕丘卡':   { name: 'CF Pachuca',          league: 'Overig' },
  '蓝十字':   { name: 'Cruz Azul',           league: 'Overig' },
  '托卢卡':   { name: 'Deportivo Toluca',    league: 'Overig' },
  '美洲狮':   { name: 'Pumas UNAM',          league: 'Overig' },
  '圣保罗':   { name: 'São Paulo FC',        league: 'Overig' },
  '桑托斯':   { name: 'Santos FC',           league: 'Overig' },
  '格雷米奥': { name: 'Grêmio',             league: 'Overig' },
  '科林蒂按': { name: 'Corinthians',         league: 'Overig' },

  // National teams
  '阿根廷':   { name: 'Argentina',           league: 'Nationaal team' },
  '巴西':     { name: 'Brazilië',            league: 'Nationaal team' },
  '法国':     { name: 'Frankrijk',           league: 'Nationaal team' },
  '荷兰':     { name: 'Nederland',           league: 'Nationaal team' },
  '葡萄牙':   { name: 'Portugal',            league: 'Nationaal team' },
  '西班牙':   { name: 'Spanje',              league: 'Nationaal team' },
  '德国':     { name: 'Duitsland',           league: 'Nationaal team' },
  '意大利':   { name: 'Italië',              league: 'Nationaal team' },
  '英格兰':   { name: 'Engeland',            league: 'Nationaal team' },
  '墨西哥':   { name: 'Mexico',              league: 'Nationaal team' },
  '日本':     { name: 'Japan',               league: 'Nationaal team' },
  '喀麦隆':   { name: 'Kameroen',            league: 'Nationaal team' },
  '巴勒斯坦': { name: 'Palestina',           league: 'Nationaal team' },
  '摩洛哥':   { name: 'Marokko',             league: 'Nationaal team' },
  '塞内加尔': { name: 'Senegal',             league: 'Nationaal team' },
  '韩国':     { name: 'Zuid-Korea',          league: 'Nationaal team' },
  '美国':     { name: 'USA',                 league: 'Nationaal team' },
}

// Variant translations (jersey version labels)
export const VARIANT_MAP: Record<string, string> = {
  '主':   'Thuis',
  '客':   'Uit',
  '第三': 'Third',
  '二客': 'Uit 2',
  '冠军版': 'Kampioenversie',
  '特别版': 'Special Edition',
  '欧冠版': 'Champions League',
  '赛前服': 'Pre-match',
  '长袖':  'Lange mouw',
  '纪念版': 'Jubileumeditie',
}

/**
 * Parse a Yupoo album title into { name, club, variant, league }
 * Input: "50Y【Link13】球员-巴黎冠军版"
 */
export function parseTitle(raw: string): {
  name: string
  club: string
  variant: string
  league: string
} {
  // Strip price, link ref, and season prefix
  let str = raw
    .replace(/^\d+Y\s*/i, '')           // "50Y "
    .replace(/【[^】]+】/g, '')          // "【Link13】"
    .replace(/球员\d*[.。，-]?\s*/g, '') // "球员-" / "球员26."
    .replace(/^\s*[-；;·]\s*/, '')       // leading separator
    .replace(/^(\d{2}-\d{2})\s*/, '')   // season "25-26 "
    .trim()

  // Try to match a known team
  for (const [zh, info] of Object.entries(TEAM_MAP)) {
    if (str.includes(zh)) {
      // Variant is the rest after removing the team name
      const rest = str.replace(zh, '').replace(/^[-；;·\s]+/, '').trim()

      // Translate variant if possible
      let variant = rest
      for (const [zvKey, zvVal] of Object.entries(VARIANT_MAP)) {
        variant = variant.replace(zvKey, zvVal)
      }
      variant = variant.replace(/[-\d]+$/, '').trim() // strip trailing "-2" etc.

      return {
        name: `${info.name}${variant ? ` — ${variant}` : ''}`,
        club: info.name,
        variant,
        league: info.league,
      }
    }
  }

  // Fallback: keep original (cleaned) title
  return {
    name: str || raw,
    club: 'Overig',
    variant: '',
    league: 'Overig',
  }
}
