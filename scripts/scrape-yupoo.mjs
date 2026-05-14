/**
 * TKJerseys — Yupoo scraper
 * Scrapes: https://yolo55.x.yupoo.com/categories/5188273
 *
 * Run: node scripts/scrape-yupoo.mjs
 * Cron: daily 07:00
 *
 * Uses Playwright (headless Chromium) because Yupoo renders via JavaScript.
 * After each run: auto git push → Vercel auto-deploys.
 */

import { chromium } from 'playwright'
import { writeFileSync, readFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { execSync } from 'child_process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const INVENTORY_PATH = join(__dirname, '../data/inventory.json')

const CATEGORY_URL = 'https://yolo55.x.yupoo.com/categories/5188273'
const TOTAL_PAGES  = 8
const DELAY_MS     = 1200  // polite delay between pages

// ─── Team / variant translation maps (duplicated from lib/translations.ts for use in plain .mjs) ───

const TEAM_MAP = {
  // Eredivisie / Dutch
  '阿贾克斯': { name: 'Ajax Amsterdam',       league: 'Eredivisie' },
  'PSV':      { name: 'PSV Eindhoven',         league: 'Eredivisie' },
  '费耶诺德': { name: 'Feyenoord',             league: 'Eredivisie' },
  // English clubs (extra spellings)
  '纽卡斯尔': { name: 'Newcastle United',      league: 'Premier League' },
  '纽卡斯':   { name: 'Newcastle United',      league: 'Premier League' },
  '利兹联':   { name: 'Leeds United',          league: 'Premier League' },
  // Celtic
  '凯尔特人': { name: 'Celtic FC',             league: 'Overig' },
  '新凯尔特人': { name: 'Celtic FC',        league: 'Overig' },
  // Flamengo (multiple spellings)
  '弗拉明戈': { name: 'Flamengo',              league: 'Overig' },
  '佛拉明戈': { name: 'Flamengo',              league: 'Overig' },
  '弗拉明戰': { name: 'Flamengo',              league: 'Overig' },
  '弗拉明戎': { name: 'Flamengo',              league: 'Overig' },
  // Corinthians (multiple spellings)
  '科林蒂安': { name: 'Corinthians',           league: 'Overig' },
  '科林蒂按': { name: 'Corinthians',           league: 'Overig' },
  // Inter Miami
  '迈阿密': { name: 'Inter Miami CF',       league: 'Overig' },
  // Saudi national
  '沙特':   { name: 'Saudi-Arabië',          league: 'Nationaal team' },
  // Other national teams
  '哥伦比亚': { name: 'Colombia',              league: 'Nationaal team' },
  '比利时': { name: 'België',                league: 'Nationaal team' },
  '尼日利亚': { name: 'Nigeria',               league: 'Nationaal team' },
  '阿尔及利亚': { name: 'Algerije',         league: 'Nationaal team' },
  '加拿大': { name: 'Canada',                league: 'Nationaal team' },
  '牙买加': { name: 'Jamaica',               league: 'Nationaal team' },
  '挂威':   { name: 'Noorwegen',             league: 'Nationaal team' },
  '苏格兰': { name: 'Schotland',             league: 'Nationaal team' },
  '埃及国民': { name: 'Egypte',              league: 'Nationaal team' },
  '埃及国名': { name: 'Egypte',              league: 'Nationaal team' },
  '开罗国民': { name: 'Egypte',              league: 'Nationaal team' },
  '中国队': { name: 'China',                 league: 'Nationaal team' },
  '马里':   { name: 'Mali',                  league: 'Nationaal team' },
  '刚果':   { name: 'Congo',                 league: 'Nationaal team' },
  '科特迪瓦': { name: 'Ivoorkust',            league: 'Nationaal team' },
  '乌拉圭': { name: 'Uruguay',               league: 'Nationaal team' },
  '香港':   { name: 'Hongkong',              league: 'Nationaal team' },
  '瑞典':   { name: 'Zweden',                league: 'Nationaal team' },
  // Other clubs
  '芯山主': { name: 'Al Ain',                league: 'Overig' },
  '艾因':   { name: 'Al Ain',                league: 'Overig' },
  '花辣椒': { name: 'CD Guadalajara (Chivas)',league: 'Overig' },
  '苝福':   { name: 'JDT (Johor)',           league: 'Overig' },
  '奥兰多': { name: 'Orlando City SC',       league: 'Overig' },
  '莱昂':   { name: 'Club León',             league: 'Overig' },
  '米娀塞': { name: 'CF Monterrey',          league: 'Overig' },
  '科特':   { name: "Côte d'Ivoire",         league: 'Overig' },
  '新库勒森': { name: 'Leverkusen (new)',     league: 'Bundesliga' },
  '新纽卡斯': { name: 'Newcastle United',    league: 'Premier League' },
  '新里斯本': { name: 'Sporting Lissabon',    league: 'Overig' },
  '里斯本': { name: 'Sporting Lissabon',    league: 'Overig' },
  '拉齐噩':{ name: 'SS Lazio',              league: 'Serie A' },  // alt spelling
  '黄色青年人': { name: 'BSC Young Boys',   league: 'Overig' },
  // Neymar / Messi specials
  '内马尔':{ name: 'Neymar Special Edition', league: 'Overig' },
  '梅西':   { name: 'Messi Special Edition',  league: 'Overig' },
  // Extra clubs
  '红牛':     { name: 'Red Bull Leipzig', league: 'Bundesliga' },
  '阿斯顿':   { name: 'Aston Villa', league: 'Premier League' },
  '卡尔比':   { name: 'Deportivo Cali', league: 'Overig' },
  '里斯本竞技': { name: 'Sporting Lissabon', league: 'Overig' },
  '利兹':     { name: 'Leeds United', league: 'Premier League' },
  // Premier League
  '曼城': { name: 'Manchester City', league: 'Premier League' },
  '曼联': { name: 'Manchester United', league: 'Premier League' },
  '利物浦': { name: 'Liverpool FC', league: 'Premier League' },
  '切尔西': { name: 'Chelsea FC', league: 'Premier League' },
  '阿森纳': { name: 'Arsenal FC', league: 'Premier League' },
  '热刺': { name: 'Tottenham Hotspur', league: 'Premier League' },
  '纽卡斯尔': { name: 'Newcastle United', league: 'Premier League' },
  '西汉姆联': { name: 'West Ham United', league: 'Premier League' },
  '埃弗顿': { name: 'Everton FC', league: 'Premier League' },
  '水晶宫': { name: 'Crystal Palace', league: 'Premier League' },
  '狼队': { name: 'Wolverhampton', league: 'Premier League' },
  '阿斯顿维拉': { name: 'Aston Villa', league: 'Premier League' },
  '富勒姆': { name: 'Fulham FC', league: 'Premier League' },
  '布莱顿': { name: 'Brighton & Hove', league: 'Premier League' },
  // La Liga
  '皇马': { name: 'Real Madrid', league: 'La Liga' },
  '巴萨': { name: 'FC Barcelona', league: 'La Liga' },
  '马竞': { name: 'Atlético Madrid', league: 'La Liga' },
  '塞维利亚': { name: 'Sevilla FC', league: 'La Liga' },
  '贝蒂斯': { name: 'Real Betis', league: 'La Liga' },
  '毕尔巴鄂': { name: 'Athletic Bilbao', league: 'La Liga' },
  '皇家社会': { name: 'Real Sociedad', league: 'La Liga' },
  '瓦伦西亚': { name: 'Valencia CF', league: 'La Liga' },
  '比利亚雷亚尔': { name: 'Villarreal CF', league: 'La Liga' },
  // Serie A
  '国米': { name: 'Inter Milan', league: 'Serie A' },
  '米兰': { name: 'AC Milan', league: 'Serie A' },
  '尤文': { name: 'Juventus FC', league: 'Serie A' },
  '那不勒斯': { name: 'SSC Napoli', league: 'Serie A' },
  '罗马': { name: 'AS Roma', league: 'Serie A' },
  '拉齐奥': { name: 'SS Lazio', league: 'Serie A' },
  '亚特兰大': { name: 'Atalanta BC', league: 'Serie A' },
  '佛罗伦萨': { name: 'Fiorentina', league: 'Serie A' },
  // Bundesliga
  '拜仁': { name: 'Bayern Munich', league: 'Bundesliga' },
  '多特': { name: 'Borussia Dortmund', league: 'Bundesliga' },
  '勒沃库森': { name: 'Bayer Leverkusen', league: 'Bundesliga' },
  '莱比锡': { name: 'RB Leipzig', league: 'Bundesliga' },
  '法兰克福': { name: 'Eintracht Frankfurt', league: 'Bundesliga' },
  '弗赖堡': { name: 'SC Freiburg', league: 'Bundesliga' },
  // Ligue 1
  '巴黎': { name: 'Paris Saint-Germain', league: 'Ligue 1' },
  '马赛': { name: 'Olympique Marseille', league: 'Ligue 1' },
  '里昂': { name: 'Olympique Lyon', league: 'Ligue 1' },
  '摩纳哥': { name: 'AS Monaco', league: 'Ligue 1' },
  '里尔': { name: 'LOSC Lille', league: 'Ligue 1' },
  '雷恩': { name: 'Stade Rennais', league: 'Ligue 1' },
  // Overig clubs
  '波尔图': { name: 'FC Porto', league: 'Overig' },
  '本菲卡': { name: 'SL Benfica', league: 'Overig' },
  '体育': { name: 'Sporting CP', league: 'Overig' },
  '吉达': { name: 'Al-Ittihad', league: 'Overig' },
  '利雅得': { name: 'Al-Nassr', league: 'Overig' },
  '希拉尔': { name: 'Al-Hilal', league: 'Overig' },
  '弗拉门戈': { name: 'Flamengo', league: 'Overig' },
  '博卡': { name: 'Boca Juniors', league: 'Overig' },
  '河床': { name: 'River Plate', league: 'Overig' },
  '美洲': { name: 'Club América', league: 'Overig' },
  '老虎': { name: 'Tigres UANL', league: 'Overig' },
  '帕丘卡': { name: 'CF Pachuca', league: 'Overig' },
  '蓝十字': { name: 'Cruz Azul', league: 'Overig' },
  '托卢卡': { name: 'Deportivo Toluca', league: 'Overig' },
  '美洲狮': { name: 'Pumas UNAM', league: 'Overig' },
  '圣保罗': { name: 'São Paulo FC', league: 'Overig' },
  '桑托斯': { name: 'Santos FC', league: 'Overig' },
  '格雷米奥': { name: 'Grêmio', league: 'Overig' },
  '科林蒂按': { name: 'Corinthians', league: 'Overig' },
  // Extra Flamengo spellings
  '佛拉门戈': { name: 'Flamengo', league: 'Overig' },
  '弗拉明戈': { name: 'Flamengo', league: 'Overig' },
  '弗拉明戎': { name: 'Flamengo', league: 'Overig' },
  '佛拉明戈': { name: 'Flamengo', league: 'Overig' },
  // National teams
  '阿根廷': { name: 'Argentina', league: 'Nationaal team' },
  '巴西': { name: 'Brazilië', league: 'Nationaal team' },
  '法国': { name: 'Frankrijk', league: 'Nationaal team' },
  '荷兰': { name: 'Nederland', league: 'Nationaal team' },
  '葡萄牙': { name: 'Portugal', league: 'Nationaal team' },
  '西班牙': { name: 'Spanje', league: 'Nationaal team' },
  '德国': { name: 'Duitsland', league: 'Nationaal team' },
  '意大利': { name: 'Italië', league: 'Nationaal team' },
  '英格兰': { name: 'Engeland', league: 'Nationaal team' },
  '墨西哥': { name: 'Mexico', league: 'Nationaal team' },
  '日本': { name: 'Japan', league: 'Nationaal team' },
  '喀麦隆': { name: 'Kameroen', league: 'Nationaal team' },
  '巴勒斯坦': { name: 'Palestina', league: 'Nationaal team' },
  '克罗地亚': { name: 'Kroatië', league: 'Nationaal team' },
  '卡塔尔':   { name: 'Qatar', league: 'Nationaal team' },
  '克罗地':   { name: 'Kroatië', league: 'Nationaal team' },
  '土耳其':   { name: 'Turkije', league: 'Nationaal team' },
  '波兰':     { name: 'Polen', league: 'Nationaal team' },
  '瑞士':     { name: 'Zwitserland', league: 'Nationaal team' },
  '澳大利亚': { name: 'Australië', league: 'Nationaal team' },
  '加纳':     { name: 'Ghana', league: 'Nationaal team' },
  '突尼斯':   { name: 'Tunesië', league: 'Nationaal team' },
  '厄瓜多尔': { name: 'Ecuador', league: 'Nationaal team' },
  '秘鲁':     { name: 'Peru', league: 'Nationaal team' },
  '智利':     { name: 'Chili', league: 'Nationaal team' },
  '乌拉圭':   { name: 'Uruguay', league: 'Nationaal team' },
  '哥斯达黎加': { name: 'Costa Rica', league: 'Nationaal team' },
  '伊朗':     { name: 'Iran', league: 'Nationaal team' },
  '沙特':     { name: 'Saudi-Arabië', league: 'Nationaal team' },
  '摩洛哥': { name: 'Marokko', league: 'Nationaal team' },
  '塞内加尔': { name: 'Senegal', league: 'Nationaal team' },
  '韩国': { name: 'Zuid-Korea', league: 'Nationaal team' },
  '美国': { name: 'USA', league: 'Nationaal team' },
}

const VARIANT_MAP = {
  '主':    'Thuis',
  '客':    'Uit',
  '第三':  'Third',
  '二客':  'Uit 2',
  '三客':  'Derde Uit',
  '四客':  'Vierde Uit',
  '冠军版': 'Kampioenversie',
  '冠军纪念版': 'Kampioenversie',
  '特别版': 'Special Edition',
  '欧冠版': 'Champions League',
  '赛前服': 'Pre-match',
  '长袖':  'Lange mouw',
  '纪念版': 'Jubileumeditie',
  '白':    'Wit',
  '黑':    'Zwart',
  '红':    'Rood',
  '蓝':    'Blauw',
  '绿':    'Groen',
  '黄':    'Geel',
  '粉':    'Roze',
  '灰':    'Grijs',
  '紫':    'Paars',
  '橙':    'Oranje',
  '金':    'Goud',
  '白金':  'Platinum',
}

// Strip all remaining CJK characters and tidy whitespace
function cleanText(str) {
  return str
    .replace(/[\u4e00-\u9fff\u3000-\u303f\uff00-\uffef]+/g, ' ')  // remove CJK
    .replace(/\s+/g, ' ')
    .replace(/[-—:\s]+$/, '')  // trailing separators
    .replace(/^[-—:\s]+/, '')  // leading separators
    .trim()
}

function parseTitle(raw) {
  let str = raw
    .replace(/^\d+Y\s*/i, '')                        // "50Y "
    .replace(/【[^】]+】/g, '')                        // "【Link13】"
    .replace(/球员\d*[.,。一-]?\s*/g, '')           // "球员-" / "球员26."
    .replace(/^[-；;·\s]+/, '')                       // leading separator
    .replace(/^(\d{2}-\d{2})\s*/, '')                // season "25-26 "
    .replace(/\d{2}\.\s*/g, '')                      // "26. "
    .replace(/^[,，]?\s*\d{2}(?=[\u4e00-\u9fff])/g, '') // bare "26克罗" -> "克罗"
    .replace(/[,，]?\s*[SMLX]{1,2}\d*[-一~]?\d*[SMLX]{0,2}\s*|\d+[SMLX]{1,2}\s*/gi, ' ') // sizes: S一2XL, 3XL
    .replace(/\s+/g, ' ')
    .trim()

  for (const [zh, info] of Object.entries(TEAM_MAP)) {
    if (str.includes(zh)) {
      // Get the rest (everything except the matched team name)
      let rest = str.replace(zh, '')
        .replace(/^[-；;·\s,，]+/, '')       // leading separator
        .replace(/^(\d{2}-\d{2})\s*/, '')  // season prefix: 25-26
        .replace(/^\d{2}\s*/, '')           // bare year: 26
        .trim()

      // Apply variant translations one by one (longest match first)
      const sortedVariants = Object.entries(VARIANT_MAP).sort(([a], [b]) => b.length - a.length)
      for (const [k, v] of sortedVariants) {
        rest = rest.split(k).join(` ${v} `)
      }

      // Strip remaining Chinese characters + size notations + trailing numbers
      rest = cleanText(rest)
        .replace(/\b[SMLX]{1,3}\d*\b/g, '')     // size labels: S, M, L, XL, 2XL
        .replace(/\b\d+[SMLX]{1,3}\b/g, '')     // size labels: 3XL
        .replace(/[-\d\s]+$/, '')                 // trailing "-2", "3" etc.
        .replace(/\s+/g, ' ')
        .trim()

      return {
        name: `${info.name}${rest ? ` — ${rest}` : ''}`,
        club: info.name,
        variant: rest,
        league: info.league,
      }
    }
  }

  // No team match — clean up and return with generic label
  const cleaned = cleanText(str)
    .replace(/\b[SMLX]{1,3}\d*\b/g, '')
    .replace(/\b\d+[SMLX]{1,3}\b/g, '')
    .replace(/\s+/g, ' ')
    .trim()

  return { name: cleaned || 'Special Edition', club: 'Overig', variant: '', league: 'Overig' }
}

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

// ─── Main ──────────────────────────────────────────────────────────────────

async function scrape() {
  console.log('🔍 TKJerseys scraper — starting Playwright...')
  const prev = existsSync(INVENTORY_PATH)
    ? JSON.parse(readFileSync(INVENTORY_PATH, 'utf8'))
    : []

  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/124.0 Safari/537.36',
  })
  const page = await context.newPage()

  const items = []
  const SKIP_KEYWORDS = ['尺码表', '尺码', 'size chart']

  for (let p = 1; p <= TOTAL_PAGES; p++) {
    const url = p === 1 ? CATEGORY_URL : `${CATEGORY_URL}?page=${p}`
    console.log(`📄 Page ${p}/${TOTAL_PAGES}: ${url}`)

    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 })
    await page.waitForSelector('.album__title', { timeout: 20000 })
    // Extra wait for lazy images to populate their src attributes
    await sleep(1500)

    // Extract all album cards from this page
    // DOM structure per album:
    //   div.categories__children
    //     a.album__main[href=/albums/ID]  ← image link
    //       img[src=...]
    //     div.album__title                ← title (sibling, NOT child of link)
    const pageItems = await page.evaluate(() => {
      const results = []
      const titles = document.querySelectorAll('.album__title')

      titles.forEach((titleEl) => {
        // parentElement = div.categories__children (the per-album wrapper)
        const card = titleEl.parentElement
        if (!card) return

        // The image link is a sibling: a.album__main
        const link = card.querySelector('a.album__main') || card.querySelector('a[href*="/albums/"]')
        const img  = card.querySelector('img')

        if (!link || !img) return

        const href     = link.href
        const rawTitle = titleEl.textContent?.trim() || ''
        let imgSrc     = img.src || img.dataset?.src || ''

        // Upgrade small thumbnails to medium for better quality
        imgSrc = imgSrc.replace('/small.jpg', '/medium.jpg')

        // Extract album ID from URL
        const albumMatch = href.match(/\/albums\/(\d+)/)
        const albumId = albumMatch ? albumMatch[1] : null

        if (albumId && rawTitle && imgSrc && imgSrc.startsWith('http')) {
          results.push({ albumId, rawTitle, imgSrc, albumUrl: href })
        }
      })

      return results
    })

    console.log(`   → Found ${pageItems.length} albums`)

    for (const item of pageItems) {
      // Skip size charts and non-jersey entries
      if (SKIP_KEYWORDS.some((k) => item.rawTitle.includes(k))) continue

      const parsed = parseTitle(item.rawTitle)
      items.push({
        id:         item.albumId,
        name:       parsed.name,
        club:       parsed.club,
        variant:    parsed.variant,
        league:     parsed.league,
        rawTitle:   item.rawTitle,
        imageUrl:   item.imgSrc,
        albumUrl:   item.albumUrl,
        available:  true,
        scrapedAt:  new Date().toISOString(),
      })
    }

    if (p < TOTAL_PAGES) await sleep(DELAY_MS)
  }

  await browser.close()

  // Merge with previous: preserve manual `available: false` overrides
  const prevMap = Object.fromEntries(prev.map((j) => [j.id, j]))
  const merged = items.map((item) => {
    const old = prevMap[item.id]
    return old ? { ...item, available: old.available } : item
  })

  writeFileSync(INVENTORY_PATH, JSON.stringify(merged, null, 2))
  console.log(`\n✅ Saved ${merged.length} jerseys to data/inventory.json`)

  // Git push → Vercel auto-deploy
  try {
    execSync('git add data/inventory.json && git commit -m "chore: update jersey inventory" && git push', {
      cwd: join(__dirname, '..'),
      stdio: 'inherit',
    })
    console.log('🚀 Pushed to GitHub → Vercel auto-deploy triggered')
  } catch (err) {
    console.warn('⚠️ Git push skipped (no changes or not a git repo yet)')
  }

  // Summary
  const byLeague = {}
  merged.forEach((j) => {
    byLeague[j.league] = (byLeague[j.league] || 0) + 1
  })
  console.log('\n📊 Summary by league:')
  Object.entries(byLeague)
    .sort(([, a], [, b]) => b - a)
    .forEach(([league, count]) => console.log(`   ${league}: ${count}`))

  return merged
}

scrape().catch((err) => {
  console.error('❌ Scraper failed:', err)
  process.exit(1)
})
