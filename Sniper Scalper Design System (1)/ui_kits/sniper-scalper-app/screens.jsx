const DS = window.SniperScalperDesignSystem_1bcd68;
const { Button, LinkAction, Chip, Badge, Toggle, SectionHeader, Card, ListRow, StatPair, FeatureTile, TopBar, BottomNav, CourseCard, NewsCard } = DS;

const AVATAR = '../../assets/avatar-fx-ramzan.png';
const CHART_PHOTO = '../../assets/course-chart-photo.png';
const NEWS1 = '../../assets/news-sample-1.png';
const NEWS2 = '../../assets/news-sample-2.png';

function StatusBar() {
  return (
    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 24px 4px', color:'var(--text-primary)', fontSize:14, fontWeight:500}}>
      <span>12:42</span>
      <span className="material-symbols-outlined" style={{fontSize:16}}>signal_wifi_4_bar</span>
    </div>
  );
}

function SplashScreen() {
  return (
    <div data-screen-label="Splash" style={{height:'100%', background:'var(--bg-chart)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:14, position:'relative'}}>
      <div style={{width:130, height:130, borderRadius:34, background:'var(--bg-2)', border:'1px solid var(--border-subtle)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:40}}>
        <span className="material-symbols-outlined" style={{fontSize:56, color:'var(--accent-peach)', fontVariationSettings:"'FILL' 1"}}>shield</span>
      </div>
      <div style={{fontSize:34, fontWeight:500, letterSpacing:'0.06em'}}>
        <span style={{color:'var(--accent-peach)'}}>SNIPER</span> <span style={{color:'var(--text-primary)'}}>SCALPER</span>
      </div>
      <div style={{color:'var(--text-muted)', fontSize:12, fontWeight:500, letterSpacing:'0.3em'}}>PRECISION TRADING TERMINAL</div>
      <div style={{width:'80%', height:1, background:'var(--accent-peach)', marginTop:70}}></div>
      <div style={{color:'var(--accent-orange)', fontSize:13, fontWeight:700, letterSpacing:'0.2em'}}>CONNECTING TO SERVER</div>
      <div style={{position:'absolute', bottom:36, left:28, right:28, display:'flex', justifyContent:'space-between', fontSize:12}}>
        <div><div style={{color:'var(--text-muted)', letterSpacing:'0.15em'}}>SERVER STATUS</div><div style={{color:'var(--text-primary)', fontSize:15, letterSpacing:'0.1em', marginTop:4}}>OPTIMAL</div></div>
        <div style={{textAlign:'right'}}><div style={{color:'var(--text-muted)', letterSpacing:'0.15em'}}>PROTOCOL</div><div style={{color:'var(--text-primary)', fontSize:15, letterSpacing:'0.1em', marginTop:4}}>V.4.22.8</div></div>
      </div>
    </div>
  );
}

function AcademyScreen({ onOpenCourse }) {
  return (
    <div data-screen-label="Academy" style={{padding:'0 20px 24px'}}>
      <TopBar title="Academy" avatar={AVATAR} style={{padding:'14px 0'}} />
      <div style={{color:'var(--accent-peach)', fontSize:13, fontWeight:700, letterSpacing:'0.28em', marginTop:14}}>INSTITUTIONAL TRAINING</div>
      <h1 style={{margin:'14px 0 0', color:'var(--text-primary)', fontSize:56, fontWeight:500, lineHeight:1.02}}>Courses</h1>
      <p style={{margin:'18px 0 0', color:'var(--text-secondary)', fontSize:17, lineHeight:1.55}}>Access three professional trading courses designed to build a complete trading system, taught with an institutional approach to the markets.</p>
      <div style={{margin:'20px 0 0'}}><Chip label="Live Enrollment Open" dot /></div>
      <p style={{margin:'16px 0 0', color:'var(--text-muted)', fontSize:13.5, lineHeight:1.5}}>For educational purposes only. Not financial advice — trading involves risk of loss.</p>
      <div style={{marginTop:24, display:'flex', flexDirection:'column', gap:20}}>
        <CourseCard level="Beginner" image={CHART_PHOTO} title="Smart Money Concepts (SMC)"
          body="Master the mechanics of institutional liquidity and order flow. Understand how major players move price and learn to identify high-probability setups."
          lessons="12 Modules" duration="8 Hours" author="FX Ramzan" onView={onOpenCourse} />
        <CourseCard level="Intermediate" image={NEWS1} title="Precision Scalping System"
          body="A complete intraday execution framework: entries, risk, and trade management."
          lessons="10 Modules" duration="6 Hours" author="FX Ramzan" onView={onOpenCourse} />
      </div>
    </div>
  );
}

function CourseDetailScreen({ onBack, onEnroll }) {
  return (
    <div data-screen-label="Course Detail">
      <TopBar title="Academy" tracked={false} onBack={onBack} style={{justifyContent:'center'}} />
      <div style={{position:'relative'}}>
        <img src={CHART_PHOTO} alt="" style={{width:'100%', height:300, objectFit:'cover', display:'block', opacity:0.85}} />
        <div style={{position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(13,13,13,0.25), rgba(13,13,13,0.92))'}}></div>
        <div style={{position:'absolute', inset:0, padding:'18px 20px', display:'flex', flexDirection:'column'}}>
          <div style={{display:'flex', gap:10}}>
            <Badge label="Beginner" variant="level" />
            <Chip label="8 Hours" style={{padding:'8px 16px', fontSize:12}} />
            <Chip label="12 Modules" style={{padding:'8px 16px', fontSize:12}} />
          </div>
          <h1 style={{margin:'auto 0 0', color:'var(--accent-peach)', fontSize:34, fontWeight:700, lineHeight:1.1}}>Smart Money Concepts (SMC)</h1>
          <div style={{color:'var(--text-secondary)', fontStyle:'italic', fontSize:16, marginTop:8}}>Led by FX Ramzan</div>
        </div>
      </div>
      <div style={{padding:'24px 20px 28px'}}>
        <Button label="Enroll Now" onClick={onEnroll} style={{padding:'16px 56px'}} />
        <div style={{marginTop:32}}><SectionHeader label="The Protocol" size="lg" /></div>
        <p style={{margin:'16px 0 0', color:'var(--text-secondary)', fontSize:16.5, lineHeight:1.6}}>Deconstruct the financial matrix. This program is an Architectural Protocol designed to rewire your perception of liquidity. We move beyond retail noise, focusing exclusively on how institutional algorithms deliver price through the lens of Smart Money Concepts.</p>
        <div style={{margin:'28px 0 0', color:'var(--accent-peach)', fontSize:13, fontWeight:700, letterSpacing:'0.18em'}}>SYSTEM ARCHITECTURE</div>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginTop:16}}>
          <FeatureTile icon="account_tree" title="Market Structure" body="Identify the true narrative behind price swings." />
          <FeatureTile icon="water_drop" title="Liquidity" body="Locate the fuel that drives institutional moves." />
          <FeatureTile icon="grid_view" title="Order Blocks" body="Pinpoint the footprints of large institutional orders." />
          <FeatureTile icon="alt_route" title="FVG" body="Exploit Fair Value Gaps and algorithmic inefficiencies." />
        </div>
        <div style={{marginTop:24}}><Button label="Enroll Now" fullWidth onClick={onEnroll} /></div>
      </div>
    </div>
  );
}

function NewsScreen() {
  return (
    <div data-screen-label="News">
      <TopBar title="Sniper Scalper" avatar={AVATAR} icons={["refresh", "menu"]} style={{padding:'14px 20px'}} />
      <div style={{display:'flex', alignItems:'stretch', background:'var(--bg-2)'}}>
        <span style={{background:'var(--accent-peach)', color:'var(--text-on-accent)', fontSize:12, fontWeight:700, letterSpacing:'0.15em', padding:'16px 18px', display:'flex', alignItems:'center'}}>BREAKING</span>
        <span style={{color:'var(--text-primary)', fontSize:14, fontWeight:600, letterSpacing:'0.04em', padding:'12px 16px', display:'flex', alignItems:'center'}}>BITGET LAUNCHES CRYPTO INDUSTRY'S FIRST EVER US STOCK OPTIONS TRADING ·</span>
      </div>
      <div style={{padding:'20px 20px 24px', display:'flex', flexDirection:'column', gap:20}}>
        <NewsCard source="Pakistan News Express" timestamp="22h ago" image={NEWS1}
          headline="Bitget Launches Crypto Industry's First Ever US Stock Options Trading"
          excerpt="VICTORIA, Seychelles, July 03, 2026 (GLOBE NEWSWIRE) — Bitget, the world's largest Universal Exchange, expands access to US equity options." />
        <NewsCard source="Riauone.com | Berita Nusantara Terkini" timestamp="23h ago" image={NEWS2}
          headline="From Crypto to Gold: UEX Launches First Cross-Asset Trading Tournament"
          excerpt="VICTORIA, Seychelles, July 01, 2026 (GLOBE NEWSWIRE) — the world's first cross-asset trading tournament spanning crypto, gold and indices." />
      </div>
    </div>
  );
}

function SettingsScreen() {
  return (
    <div data-screen-label="Settings" style={{padding:'0 20px 24px'}}>
      <TopBar title="Sniper Scalper" avatar={AVATAR} style={{padding:'14px 0'}} />
      <Card size="sm" style={{marginTop:16}}>
        <div style={{display:'flex', alignItems:'center', gap:20, padding:'24px 22px'}}>
          <div style={{position:'relative'}}>
            <img src={AVATAR} alt="" style={{width:80, height:80, borderRadius:'50%', objectFit:'cover'}} />
          </div>
          <div>
            <div style={{color:'var(--accent-peach)', fontSize:26, fontWeight:700}}>FX Ramzan</div>
            <div style={{color:'var(--text-secondary)', fontSize:16, marginTop:4}}>Founder &amp; Lead Strategist</div>
          </div>
        </div>
      </Card>
      <div style={{margin:'28px 0 14px'}}><SectionHeader label="Notification Preferences" color="blue" /></div>
      <Card size="sm">
        <ListRow icon="notifications" label="Signal Alerts" trailing="none"><Toggle defaultChecked /></ListRow>
        <ListRow icon="newspaper" label="Market News Updates" trailing="none" divider><Toggle /></ListRow>
        <ListRow icon="mail" label="Newsletter & Insights" trailing="none" divider><Toggle defaultChecked /></ListRow>
      </Card>
      <div style={{margin:'28px 0 14px'}}><SectionHeader label="Information" color="muted" /></div>
      <Card size="sm">
        <ListRow icon="info" label="About Us" />
        <ListRow icon="help" label="Contact & Support" divider />
        <ListRow icon="quiz" label="FAQs & Knowledge Base" divider />
      </Card>
      <div style={{display:'flex', alignItems:'center', justifyContent:'center', gap:8, marginTop:36, color:'var(--text-muted)', fontSize:15, fontWeight:500}}>
        <span className="material-symbols-outlined" style={{fontSize:18}}>location_on</span>
        Office: Ahmadpur East
      </div>
    </div>
  );
}

function ChartsPlaceholder() {
  return (
    <div data-screen-label="Charts" style={{height:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:14, padding:'0 40px', textAlign:'center'}}>
      <span className="material-symbols-outlined" style={{fontSize:44, color:'var(--accent-peach)'}}>show_chart</span>
      <div style={{color:'var(--text-primary)', fontSize:18, fontWeight:700, letterSpacing:'0.08em'}}>XAUUSD · 15M</div>
      <p style={{margin:0, color:'var(--text-muted)', fontSize:14, lineHeight:1.5}}>The live chart screen embeds a third-party TradingView widget — intentionally not recreated in this kit.</p>
    </div>
  );
}

Object.assign(window, { StatusBar, SplashScreen, AcademyScreen, CourseDetailScreen, NewsScreen, SettingsScreen, ChartsPlaceholder });
