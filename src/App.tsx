import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  Bell,
  Bolt,
  CalendarDays,
  CheckCircle2,
  Download,
  ExternalLink,
  Eye,
  Languages,
  LocateFixed,
  MessageSquareText,
  MoreHorizontal,
  Plus,
  QrCode,
  Search,
  SendHorizontal,
  Settings,
  Sparkles,
  SunMedium,
  Moon,
  UserRoundPlus,
} from "lucide-react";
import {
  catalysts,
  copy,
  events,
  leads,
  localeMeta,
  navItems,
  orbitNodes,
  orbitContacts,
  people,
  peopleRecommendations,
  quickMetrics,
  type AiResultMode,
  type Locale,
  type SectionId,
  type Theme,
} from "./content";

function App() {
  const [theme, setTheme] = useState<Theme>("light");
  const [locale, setLocale] = useState<Locale>("zh");
  const [activeSection, setActiveSection] = useState<SectionId>("ai");
  const [aiResult, setAiResult] = useState<AiResultMode>("idle");
  const t = copy[locale];

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = localeMeta[locale].htmlLang;
  }, [locale]);

  const sectionTitle = useMemo(() => {
    if (activeSection === "ai") return t.aiChat.title;
    if (activeSection === "events") return t.eventHub;
    if (activeSection === "people") return t.peopleHub;
    if (activeSection === "connections") return t.connectionHub;
    if (activeSection === "analytics") return t.analyticsHub;
    return t.heroTitle;
  }, [activeSection, t]);

  return (
    <div className="app-shell">
      <SideNav activeSection={activeSection} setActiveSection={setActiveSection} locale={locale} />
      <div className="workspace">
        <TopBar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          locale={locale}
          setLocale={setLocale}
          theme={theme}
          setTheme={setTheme}
        />
        <main className={activeSection === "ai" ? "main-grid chat-main" : "main-grid"} aria-labelledby="page-title">
          {activeSection === "ai" ? (
            <AiChatWorkspace locale={locale} resultMode={aiResult} setResultMode={setAiResult} />
          ) : (
            <>
              <section className="content-stage">
                <PageHeader activeSection={activeSection} title={sectionTitle} locale={locale} />
                {activeSection === "events" && <EventsView locale={locale} />}
                {activeSection === "people" && <PeopleView locale={locale} />}
                {activeSection === "connections" && <ConnectionsView locale={locale} />}
                {activeSection === "analytics" && <AnalyticsView locale={locale} />}
              </section>
              <OrbitAiRail locale={locale} />
            </>
          )}
        </main>
      </div>
    </div>
  );
}

function SideNav({
  activeSection,
  setActiveSection,
  locale,
}: {
  activeSection: SectionId;
  setActiveSection: (section: SectionId) => void;
  locale: Locale;
}) {
  const t = copy[locale];

  return (
    <aside className="side-rail">
      <div className="brand-block">
        <div className="brand-mark" aria-hidden="true">
          <span>@</span>
        </div>
        <div>
          <strong>{t.brand}</strong>
          <span>{t.tagline}</span>
        </div>
      </div>

      <div className="version-card">
        <span>{t.commandCenter}</span>
        <strong>{t.version}</strong>
      </div>

      <nav className="primary-nav" aria-label="Primary">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              className={isActive ? "nav-item is-active" : "nav-item"}
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              type="button"
            >
              <Icon aria-hidden="true" size={20} />
              <span>{t.nav[item.id]}</span>
            </button>
          );
        })}
      </nav>

      <div className="side-assist">
        <Sparkles aria-hidden="true" size={16} />
        <strong>{t.ai.title}</strong>
        <p>{t.heroBody}</p>
      </div>

      <div className="side-footer">
        <button type="button">
          <Settings aria-hidden="true" size={20} />
          {t.settings}
        </button>
        <button type="button">
          <MessageSquareText aria-hidden="true" size={20} />
          {t.support}
        </button>
      </div>
    </aside>
  );
}

function TopBar({
  activeSection,
  setActiveSection,
  locale,
  setLocale,
  theme,
  setTheme,
}: {
  activeSection: SectionId;
  setActiveSection: (section: SectionId) => void;
  locale: Locale;
  setLocale: (locale: Locale) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}) {
  const t = copy[locale];

  return (
    <header className="top-bar" role="banner">
      <button className="mobile-brand" type="button" onClick={() => setActiveSection("ai")}>
        {t.brand}
      </button>
      <nav className="top-tabs" aria-label="Workspace">
        {(["ai", "analytics", "events"] as SectionId[]).map((id) => (
          <button
            className={activeSection === id ? "top-tab is-active" : "top-tab"}
            key={id}
            type="button"
            onClick={() => setActiveSection(id)}
          >
            {t.nav[id]}
          </button>
        ))}
      </nav>
      <div className="top-actions">
        <label className="search-box">
          <Search aria-hidden="true" size={18} />
          <span className="sr-only">{t.globalSearch}</span>
          <input type="search" placeholder={t.globalSearch} />
        </label>
        <div className="control-group" aria-label="Language">
          <Languages aria-hidden="true" size={17} />
          {(Object.keys(localeMeta) as Locale[]).map((code) => (
            <button
              className={locale === code ? "mini-control is-active" : "mini-control"}
              key={code}
              onClick={() => setLocale(code)}
              type="button"
            >
              {localeMeta[code].label}
            </button>
          ))}
        </div>
        <button
          className="theme-switch"
          type="button"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <SunMedium aria-hidden="true" size={17} /> : <Moon aria-hidden="true" size={17} />}
          {theme === "dark" ? t.themeBright : t.themeDark}
        </button>
        <button className="icon-button" type="button" aria-label={t.notifications}>
          <Bell aria-hidden="true" size={20} />
        </button>
        <button className="icon-button" type="button" aria-label={t.automation}>
          <Bolt aria-hidden="true" size={20} />
        </button>
        <img
          className="avatar"
          src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=160&q=80"
          alt="Executive profile"
        />
      </div>
    </header>
  );
}

function AiChatWorkspace({
  locale,
  resultMode,
  setResultMode,
}: {
  locale: Locale;
  resultMode: AiResultMode;
  setResultMode: (mode: AiResultMode) => void;
}) {
  const t = copy[locale];
  const answer =
    resultMode === "events"
      ? t.aiChat.eventsAnswer
      : resultMode === "people"
        ? t.aiChat.peopleAnswer
        : resultMode === "analytics"
          ? t.aiChat.analyticsAnswer
          : t.aiChat.assistantIdle;

  return (
    <section className="ai-workspace">
      <section className="chat-console" aria-labelledby="page-title">
        <div className="chat-header">
          <span className="live-dot" />
          <div>
            <h1 id="page-title">{t.aiChat.title}</h1>
            <p>{t.aiChat.context}</p>
          </div>
        </div>

        <div className="conversation-feed" role="log" aria-label="Orbit AI conversation">
          <article className="message-bubble user-message">
            <p>{t.aiChat.userPrompt}</p>
            <time>10:42 AM</time>
          </article>
          <article className="message-bubble ai-message">
            <Sparkles aria-hidden="true" size={18} />
            <div>
              <p>{answer}</p>
              <span>Orbit AI · Just now</span>
            </div>
          </article>
        </div>

        <div className="chat-actions">
          <span>{t.suggestedCommands}</span>
          <div>
            <button type="button" onClick={() => setResultMode("events")}>
              <CalendarDays aria-hidden="true" size={16} />
              {t.aiChat.recommendEvents}
            </button>
            <button type="button" onClick={() => setResultMode("people")}>
              <UserRoundPlus aria-hidden="true" size={16} />
              {t.aiChat.recommendPeople}
            </button>
            <button type="button" onClick={() => setResultMode("analytics")}>
              <BarChart3 aria-hidden="true" size={16} />
              {t.aiChat.analyzeNetwork}
            </button>
          </div>
          <label className="chat-input">
            <span className="sr-only">{t.aiChat.inputPlaceholder}</span>
            <input placeholder={t.aiChat.inputPlaceholder} />
            <button type="button" aria-label={t.aiChat.sendCommand}>
              <SendHorizontal aria-hidden="true" size={18} />
            </button>
          </label>
        </div>
      </section>

      <AiResultPanel locale={locale} resultMode={resultMode} />
    </section>
  );
}

function AiResultPanel({ locale, resultMode }: { locale: Locale; resultMode: AiResultMode }) {
  const t = copy[locale];
  return (
    <aside className="ai-results-panel" aria-label={t.aiChat.resultsPanelLabel}>
      <RelationshipOrbit locale={locale} />
      {resultMode === "idle" && (
        <section className="result-placeholder">
          <h2>{t.aiChat.resultsTitle}</h2>
          <p>{t.aiChat.resultIdle}</p>
        </section>
      )}
      {resultMode === "events" && <RecommendedEventsPanel locale={locale} />}
      {resultMode === "people" && <PeopleRecommendationsPanel locale={locale} />}
      {resultMode === "analytics" && <NetworkSignalPanel locale={locale} />}
    </aside>
  );
}

function RelationshipOrbit({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <section className="relationship-orbit" aria-label={t.aiChat.orbitTitle}>
      <div className="orbit-copy">
        <span>{t.liveActivity}</span>
        <strong>{t.nodesConnected}</strong>
      </div>
      <div className="orbit-stage">
        <span className="orbit-ring ring-1" />
        <span className="orbit-ring ring-2" />
        <span className="orbit-ring ring-3" />
        {orbitContacts.map((contact, index) => (
          <span
            className={`orbit-path orbit-path-${contact.orbit}`}
            data-testid="orbiting-contact"
            key={contact.name}
            style={
              {
                "--orbit-duration": contact.duration,
                "--orbit-delay": contact.delay,
                "--orbit-start": `${index * 42}deg`,
              } as CSSProperties
            }
          >
            <span className="orbit-planet" title={contact.name}>
              <img src={contact.image} alt="" />
              <b>{contact.initials}</b>
            </span>
          </span>
        ))}
        <img
          className="orbit-center-avatar"
          src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=220&q=80"
          alt={t.aiChat.centerAvatarAlt}
        />
      </div>
    </section>
  );
}

function RecommendedEventsPanel({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <section className="result-section">
      <div className="result-heading">
        <h2>{t.aiChat.eventsTitle}</h2>
        <p>{t.aiChat.eventsSubtitle}</p>
      </div>
      <div className="recommendation-grid">
        {events.slice(0, 2).map((event, index) => (
          <article className="recommendation-card" key={event.title}>
            <div className="result-date">
              <span>{index === 0 ? "NOV" : "OCT"}</span>
              <strong>{index === 0 ? "12" : "15"}</strong>
            </div>
            <div>
              <span className="match-pill-inline">{event.match} {t.aiChat.matchLabel}</span>
              <h3>{event.title}</h3>
              <p>{event.meta}</p>
              <div className="why-card">
                <Sparkles aria-hidden="true" size={16} />
                <span>
                  <strong>{t.aiChat.whyEvent}</strong> {t.aiChat.whyEventBody}
                </span>
              </div>
            </div>
            <footer>
              <button className="button primary" type="button">{t.register}</button>
              <button className="button secondary" type="button">{t.aiChat.viewDetails}</button>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}

function PeopleRecommendationsPanel({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <section className="result-section">
      <div className="result-heading">
        <h2>{t.aiChat.peopleTitle}</h2>
        <p>{t.aiChat.peopleSubtitle}</p>
      </div>
      <div className="recommendation-grid">
        {peopleRecommendations.map((person) => (
          <article className="recommendation-card person-recommendation" key={person.name}>
            <header>
              <img src={person.image} alt="" />
              <div>
                <h3>{person.name}</h3>
                <p>{person.role}</p>
              </div>
              <span className="match-pill-inline">{person.fit} {t.aiChat.fitLabel}</span>
            </header>
            <div className="reason-list">
              <strong>{t.aiChat.whyPeople}</strong>
              {person.reasons.map((reason) => (
                <p key={reason}>
                  <CheckCircle2 aria-hidden="true" size={16} />
                  {reason}
                </p>
              ))}
            </div>
            <blockquote>{person.opener}</blockquote>
            <footer>
              <button className="button secondary" type="button">{t.aiChat.saveToCardHolder}</button>
              <button className="button primary" type="button">{t.aiChat.requestIntro}</button>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}

function NetworkSignalPanel({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <section className="result-section signal-result">
      <div className="result-heading">
        <h2>{t.aiChat.analyticsTitle}</h2>
        <p>{t.analyticsIntro}</p>
      </div>
      <AnalyticsSnapshot locale={locale} />
      <StrategicInsights locale={locale} />
    </section>
  );
}

function PageHeader({ activeSection, title, locale }: { activeSection: SectionId; title: string; locale: Locale }) {
  const t = copy[locale];
  const intro = {
    ai: t.aiChat.assistantIdle,
    events: t.eventIntro,
    people: t.peopleIntro,
    connections: t.connectionIntro,
    analytics: t.analyticsIntro,
  }[activeSection];

  return (
    <div className="page-heading">
      <div>
        <h1 id="page-title">{title}</h1>
        <p>{intro}</p>
      </div>
      <div className="heading-actions">
        {activeSection === "events" && (
          <>
            <button className="button secondary" type="button">
              <CalendarDays aria-hidden="true" size={18} />
              {t.ui.calendarView}
            </button>
            <button className="button primary" type="button">
              <Plus aria-hidden="true" size={18} />
              {t.ui.hostEvent}
            </button>
          </>
        )}
        {activeSection === "people" && (
          <>
            <button className="button secondary" type="button">{t.exportCrm}</button>
            <button className="button primary" type="button">
              <Plus aria-hidden="true" size={18} />
              {t.addConnection}
            </button>
          </>
        )}
        {activeSection === "connections" && (
          <button className="button primary" type="button">
            <QrCode aria-hidden="true" size={18} />
            {t.scanCard}
          </button>
        )}
        {activeSection === "analytics" && (
          <>
            <button className="button secondary" type="button">
              <CalendarDays aria-hidden="true" size={18} />
              {t.last30Days}
            </button>
            <button className="button primary" type="button">
              <Download aria-hidden="true" size={18} />
              {t.exportReport}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function AiCommand({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <label className="ai-command">
      <MessageSquareText aria-hidden="true" size={22} />
      <span className="sr-only">{t.aiPlaceholder}</span>
      <input placeholder={t.aiPlaceholder} />
      <button type="button" aria-label={t.aiChat.sendCommand}>
        <SendHorizontal aria-hidden="true" size={20} />
      </button>
    </label>
  );
}

function CommandChips({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <div className="command-cluster">
      <span>{t.suggestedCommands}</span>
      <div>
        {t.commands.map((command, index) => (
          <button className={`signal-chip signal-${index}`} key={command} type="button">
            <Sparkles aria-hidden="true" size={14} />
            {command}
          </button>
        ))}
      </div>
    </div>
  );
}

function OrbitMap({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <section className="orbit-map" aria-label={t.liveActivity}>
      <div className="activity-card">
        <span className="live-dot" />
        <div>
          <strong>{t.liveActivity}</strong>
          <p>{t.nodesConnected}</p>
        </div>
      </div>
      <div className="orbit-lines" aria-hidden="true">
        {orbitNodes.map((node) => (
          <span
            className={`node node-${node.size}`}
            key={`${node.label}-${node.x}`}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            {node.label}
          </span>
        ))}
      </div>
      <div className="metric-strip">
        {quickMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div className="metric-mini" key={metric.label}>
              <Icon aria-hidden="true" size={17} />
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Overview({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <div className="stack">
      <section className="mode-grid" aria-label={t.ui.orbitWorkflow}>
        {t.modeCards.map((card, index) => (
          <article className="panel mode-card" key={card.title}>
            <span className={`mode-icon icon-${index}`}>
              {index === 0 ? <Eye size={18} /> : index === 1 ? <NetworkIcon /> : <MessageSquareText size={18} />}
            </span>
            <h2>{card.title}</h2>
            <p>{card.body}</p>
          </article>
        ))}
      </section>
      <Recommended locale={locale} />
      <AnalyticsSnapshot locale={locale} compact />
    </div>
  );
}

function EventsView({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <div className="stack">
      <FilterBar locale={locale} />
      <SectionTitle title={t.recommended} subtitle={t.recommendedSub} action={t.viewAll} />
      <EventGrid locale={locale} />
      <article className="panel list-panel">
        <h2>{t.ui.otherAvailableEvents}</h2>
        {events.map((event) => (
          <div className="event-row" key={event.title}>
            <img src={event.image} alt="" />
            <div>
              <strong>{event.title}</strong>
              <span>{event.category}</span>
            </div>
            <time>{event.meta}</time>
            <button className="button secondary" type="button">{t.join}</button>
          </div>
        ))}
      </article>
    </div>
  );
}

function PeopleView({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <div className="stack">
      <Tabs labels={[t.tabs.recent, t.tabs.highValue, `${t.tabs.followUp} 3`]} />
      <section className="people-grid">
        {people.map((person) => (
          <PersonCard person={person} locale={locale} key={person.name} />
        ))}
      </section>
    </div>
  );
}

function ConnectionsView({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <div className="stack">
      <Tabs labels={[t.tabs.allCards, t.tabs.recentScans, t.tabs.favorites, "Tokyo AI Summit"]} />
      <section className="card-grid">
        {people.slice(0, 3).map((person) => (
          <article className="business-card" key={person.name}>
            <img src={person.image} alt="" />
            <div>
              <strong>{person.name}</strong>
              <span>{person.role}</span>
            </div>
            <small>Resonance {person.resonance}</small>
            <button type="button">
              <Eye aria-hidden="true" size={15} />
              {t.ui.viewInsights}
            </button>
          </article>
        ))}
        <article className="import-card">
          <Plus aria-hidden="true" size={24} />
          <span>{t.ui.importFromLinkedIn}</span>
        </article>
      </section>
      <section className="lower-grid">
        <NetworkExpansion locale={locale} />
        <TopGroups locale={locale} />
      </section>
    </div>
  );
}

function AnalyticsView({ locale }: { locale: Locale }) {
  return (
    <div className="stack">
      <AnalyticsSnapshot locale={locale} />
      <section className="analytics-grid">
        <GrowthChart locale={locale} />
        <ResonanceDistribution locale={locale} />
      </section>
      <section className="lower-grid">
        <CatalystTable locale={locale} />
        <StrategicInsights locale={locale} />
      </section>
    </div>
  );
}

function Recommended({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <section>
      <SectionTitle title={t.recommended} subtitle={t.recommendedSub} action={t.viewAll} />
      <EventGrid locale={locale} />
    </section>
  );
}

function SectionTitle({ title, subtitle, action }: { title: string; subtitle: string; action: string }) {
  return (
    <div className="section-title">
      <div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      <button type="button">
        {action}
        <ExternalLink aria-hidden="true" size={16} />
      </button>
    </div>
  );
}

function EventGrid({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <section className="event-grid">
      {events.map((event) => (
        <article className="panel event-card" key={event.title}>
          <div className="event-image">
            <img src={event.image} alt="" />
            <span className={`match-pill tone-${event.tone}`}>{event.match} {t.ui.match}</span>
          </div>
          <div className="event-body">
            <span className="mono-label">{event.category}</span>
            <h3>{event.title}</h3>
            <p>{event.meta}</p>
            <div className="tag-row">
              {event.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <button className="button primary" type="button">{t.requestAccess}</button>
          </div>
        </article>
      ))}
    </section>
  );
}

function PersonCard({
  person,
  locale,
}: {
  person: (typeof people)[number];
  locale: Locale;
}) {
  const t = copy[locale];
  return (
    <article className="panel person-card">
      <div className="person-head">
        <img src={person.image} alt="" />
        <div>
          <strong>{person.name}</strong>
          <span>{person.role}</span>
        </div>
        <div className="resonance-score">
          <strong>{person.resonance}</strong>
          <span>{t.ui.resonance}</span>
        </div>
      </div>
      <div className="person-meta">
        <CalendarDays aria-hidden="true" size={16} />
        <span>Oct 12, 2024</span>
        <em>{person.status}</em>
      </div>
      <div className="person-actions">
        <button type="button">{getPersonAction(person.action, locale)}</button>
        <button type="button" aria-label={t.ui.more}>
          <MoreHorizontal aria-hidden="true" size={18} />
        </button>
      </div>
    </article>
  );
}

function AnalyticsSnapshot({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  const t = copy[locale];
  return (
    <section className={compact ? "stats-grid compact" : "stats-grid"}>
      {t.stats.map(([label, value, delta], index) => (
        <article className="panel stat-card" key={label}>
          <div>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
          <em className={index === 3 ? "warn" : "good"}>{delta}</em>
          <Sparkline index={index} />
        </article>
      ))}
    </section>
  );
}

function Sparkline({ index }: { index: number }) {
  const paths = [
    "M2 34 L18 28 L32 31 L48 20 L63 23 L78 12 L96 16 L118 6",
    "M2 28 L20 26 L39 25 L58 30 L78 22 L97 17 L118 12",
    "M2 36 L18 30 L34 32 L52 25 L70 35 L88 20 L105 19 L118 12",
    "M2 24 H45 M58 24 H118",
  ];
  return (
    <svg className="sparkline" viewBox="0 0 120 40" aria-hidden="true">
      <path d={paths[index]} />
    </svg>
  );
}

function getPersonAction(action: string, locale: Locale) {
  const t = copy[locale];
  if (action === "Message") return t.message;
  if (action === "Profile") return t.profile;
  if (action === "Send Note") return t.ui.sendNote;
  if (action === "Calendar") return t.ui.calendar;
  return action;
}

function FilterBar({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <div className="filter-bar">
      <label>
        <Search aria-hidden="true" size={18} />
        <input placeholder={t.ui.eventSearchPlaceholder} />
      </label>
      <button type="button">{t.ui.allLocations}</button>
      <button type="button">{t.ui.industry}</button>
      <button type="button">{t.ui.anyDate}</button>
    </div>
  );
}

function Tabs({ labels }: { labels: string[] }) {
  return (
    <div className="tabs" role="tablist">
      {labels.map((label, index) => (
        <button className={index === 0 ? "is-active" : ""} key={label} role="tab" type="button">
          {label}
        </button>
      ))}
    </div>
  );
}

function OrbitAiRail({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <aside className="ai-rail" aria-label="Orbit AI">
      <div className="ai-heading">
        <div>
          <h2>{t.ai.title}</h2>
          <p>{t.ai.subtitle}</p>
        </div>
        <Sparkles aria-hidden="true" size={25} />
      </div>

      <section className="rail-section">
        <h3>{t.ai.leads}</h3>
        {leads.map((lead) => (
          <article className="lead-card" key={lead.name}>
            <img src={lead.image} alt="" />
            <div>
              <strong>{lead.name}</strong>
              <span>{lead.role}</span>
              <em>{lead.match} {t.ui.match}</em>
            </div>
            <button type="button">{t.ui.addNetwork}</button>
          </article>
        ))}
      </section>

      <section className="rail-section">
        <h3>{t.ai.actions}</h3>
        <article className="action-card is-hot">
          <MessageSquareText aria-hidden="true" size={18} />
          <div>
            <strong>{t.ui.followUpSana}</strong>
            <p>{t.ui.followUpSanaBody}</p>
            <button type="button">{t.ai.draftEmail}</button>
          </div>
        </article>
        <article className="action-card">
          <NetworkIcon />
          <div>
            <strong>{t.ui.inviteMarcus}</strong>
            <p>{t.ui.inviteMarcusBody}</p>
            <button type="button">{t.ai.connect}</button>
          </div>
        </article>
      </section>

      <label className="rail-input">
        <span>{t.ai.inputTitle}</span>
        <input placeholder={t.ai.inputPlaceholder} />
        <SendHorizontal aria-hidden="true" size={18} />
      </label>
    </aside>
  );
}

function GrowthChart({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <article className="panel chart-panel">
      <h2>{t.ui.networkGrowthTrajectory}</h2>
      <div className="chart-grid">
        <svg viewBox="0 0 600 260" aria-hidden="true">
          <path className="area" d="M40 222 C120 190, 180 230, 240 140 S360 160, 420 105 S520 90, 570 42 L570 240 L40 240 Z" />
          <path className="line" d="M40 222 C120 190, 180 230, 240 140 S360 160, 420 105 S520 90, 570 42" />
          <circle cx="240" cy="140" r="6" />
          <circle cx="420" cy="105" r="6" />
          <circle cx="520" cy="76" r="6" />
        </svg>
      </div>
    </article>
  );
}

function ResonanceDistribution({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <article className="panel distribution-panel">
      <h2>{t.ui.resonanceDistribution}</h2>
      {[
        [t.ui.highSignal, "42%"],
        [t.ui.nurture, "38%"],
        [t.ui.dormant, "20%"],
      ].map(([label, value], index) => (
        <div className="dist-row" key={label}>
          <span>{label}</span>
          <strong>{value}</strong>
          <div>
            <i style={{ width: value }} className={`dist-${index}`} />
          </div>
        </div>
      ))}
      <p>{t.ui.resonanceSummary}</p>
    </article>
  );
}

function CatalystTable({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <article className="panel table-panel">
      <h2>{t.ui.catalystEvents}</h2>
      {catalysts.map(([name, date, nodes, roi]) => (
        <div className="table-row" key={name}>
          <span>{name}</span>
          <time>{date}</time>
          <strong>{nodes}</strong>
          <em>{roi}</em>
        </div>
      ))}
    </article>
  );
}

function StrategicInsights({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <article className="panel insight-panel">
      <h2>
        <Sparkles aria-hidden="true" size={22} />
        {t.ui.strategicInsights}
      </h2>
      <div>
        <strong>{t.ui.networkGapAnalysis}</strong>
        <p>{t.ui.networkGapBody}</p>
      </div>
      <div>
        <strong>{t.ui.nurtureReminder}</strong>
        <p>{t.ui.nurtureBody}</p>
      </div>
    </article>
  );
}

function NetworkExpansion({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <article className="panel expansion-panel">
      <h2>{t.ui.networkExpansion}</h2>
      <p>{t.ui.networkExpansionBody}</p>
      <div className="bars" aria-hidden="true">
        {[32, 48, 24, 68, 44, 76, 56, 80].map((height, index) => (
          <i key={index} style={{ height: `${height}%` }} />
        ))}
      </div>
      <div className="micro-stats">
        <span>{t.ui.newScans} <strong>124</strong></span>
        <span>{t.ui.interactions} <strong>482</strong></span>
      </div>
    </article>
  );
}

function TopGroups({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <article className="panel groups-panel">
      <h2>{t.ui.topGroups}</h2>
      {["Gen AI Builders", "Series B Investors", "EMEA Partners"].map((group, index) => (
        <div key={group}>
          <span className={`group-dot dot-${index}`} />
          <strong>{group}</strong>
          <em>{[42, 18, 31][index]} {t.ui.cards}</em>
        </div>
      ))}
      <button className="button secondary" type="button">{t.ui.manageGroups}</button>
    </article>
  );
}

function NetworkIcon() {
  return <CheckCircle2 aria-hidden="true" size={18} />;
}

export default App;
