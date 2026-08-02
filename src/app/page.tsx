"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Configurator from "@/components/configurator";
import { MetalButton } from "@/components/ui/liquid-glass-button";

const KineticGrid = dynamic(
  () => import("@/components/ui/kinetic-grid"),
  { ssr: false }
);

function RevealOnScroll({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.unobserve(el); } },
      { threshold: 0.12, rootMargin: "0px 0px -32px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-[550ms] ease-[cubic-bezier(.16,1,.3,1)] ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[18px]"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [cfgMenu, setCfgMenu] = useState<string | null>(null);
  const [navOpen, setNavOpen] = useState(false);
  const [hideNav, setHideNav] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHideNav(y > lastY.current && y > 200);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeNav = () => setNavOpen(false);

  return (
    <>
      {/* ═══ NAV ═══ */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] bg-[rgba(13,12,8,.88)] backdrop-blur-[14px] backdrop-saturate-[1.6] border-b border-rule transition-transform duration-[350ms] ease-[cubic-bezier(.16,1,.3,1)] ${
          hideNav ? "-translate-y-full" : ""
        }`}
      >
        <div className="max-w-[620px] mx-auto px-5 h-14 flex items-center justify-between">
          <a href="#" className="font-display font-bold text-xl tracking-tight">
            L&apos;APPART<b className="text-lime text-sm ml-px">98</b>
          </a>
          <div
            className={`flex items-center gap-1.5 max-sm:absolute max-sm:top-14 max-sm:left-0 max-sm:right-0 max-sm:flex-col max-sm:bg-[rgba(13,12,8,.96)] max-sm:backdrop-blur-[20px] max-sm:px-5 max-sm:py-3 max-sm:gap-0.5 max-sm:border-b max-sm:border-rule ${
              navOpen ? "max-sm:flex" : "max-sm:hidden"
            }`}
          >
            <a href="#menus" onClick={closeNav} className="text-[11.5px] font-semibold uppercase tracking-[.1em] text-dim px-2.5 py-1.5 rounded-lg hover:text-chalk transition-colors max-sm:py-3 max-sm:px-0">
              Menus
            </a>
            <a href="#how" onClick={closeNav} className="text-[11.5px] font-semibold uppercase tracking-[.1em] text-dim px-2.5 py-1.5 rounded-lg hover:text-chalk transition-colors max-sm:py-3 max-sm:px-0">
              Comment
            </a>
            <a href="#contact" onClick={closeNav} className="text-[11.5px] font-semibold uppercase tracking-[.1em] text-dim px-2.5 py-1.5 rounded-lg hover:text-chalk transition-colors max-sm:py-3 max-sm:px-0">
              Contact
            </a>
            <a
              href="https://wa.me/33675008633"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11.5px] font-bold uppercase tracking-[.06em] bg-lime text-bg px-4 py-2 rounded-lg hover:bg-chalk transition-colors max-sm:text-center max-sm:mt-2 max-sm:py-3 max-sm:rounded-lg"
            >
              WhatsApp
            </a>
          </div>
          <button
            className="hidden max-sm:flex w-9 h-9 flex-col gap-[5px] justify-center items-center"
            onClick={() => setNavOpen(!navOpen)}
            aria-label="Menu"
          >
            <span
              className={`w-5 h-[1.5px] bg-chalk rounded-sm transition-transform duration-300 ease-[cubic-bezier(.16,1,.3,1)] ${
                navOpen ? "translate-y-[3.25px] rotate-45" : ""
              }`}
            />
            <span
              className={`w-5 h-[1.5px] bg-chalk rounded-sm transition-transform duration-300 ease-[cubic-bezier(.16,1,.3,1)] ${
                navOpen ? "-translate-y-[3.25px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* ═══ HERO with KineticGrid ═══ */}
      <KineticGrid className="!min-h-0">
        <section className="px-5 pt-24 pb-14 text-center relative" id="top">
          <div className="relative z-10 max-w-[620px] mx-auto">
            <RevealOnScroll>
              <div className="inline-flex items-center gap-[7px] px-3.5 py-[5px] mb-6 bg-lime-s border border-[rgba(200,255,0,.12)] rounded-full text-[11px] font-semibold tracking-[.12em] uppercase text-lime">
                <i className="w-[5px] h-[5px] rounded-full bg-lime" />
                Sans minimum de commande
              </div>
            </RevealOnScroll>
            <RevealOnScroll>
              <h1 className="font-display font-extrabold text-[clamp(34px,9.5vw,52px)] leading-[.92] tracking-tighter uppercase mb-3.5">
                Le <em className="not-italic text-lime">menu</em>
                <br />
                de l&apos;atelier
              </h1>
            </RevealOnScroll>
            <RevealOnScroll>
              <p className="text-[11.5px] font-semibold tracking-[.14em] uppercase text-dim mb-2">
                DTF · Stickers UV · Broderie
              </p>
            </RevealOnScroll>
            <RevealOnScroll>
              <p className="text-[15px] text-dim max-w-[360px] mx-auto mb-8 leading-relaxed">
                Compose ton textile personnalise comme au comptoir : choisis ta formule, on s&apos;occupe du reste.
              </p>
            </RevealOnScroll>

            <RevealOnScroll>
              <div className="flex items-center justify-center gap-2.5 mb-2.5 flex-wrap">
                <FormulaCard icon="palette" label="Ton visuel" />
                <span className="font-display text-lg font-bold text-lime">+</span>
                <FormulaCard icon="press" label="La pose" />
                <span className="font-display text-lg font-bold text-lime">+</span>
                <FormulaCard icon="textile" label="Le textile" />
              </div>
            </RevealOnScroll>
            <RevealOnScroll>
              <div className="font-display text-[clamp(18px,5vw,24px)] font-bold uppercase text-lime mb-8">
                = Ta piece perso
              </div>
            </RevealOnScroll>

            <RevealOnScroll>
              <div className="flex flex-col gap-2.5 max-w-[300px] mx-auto">
                <MetalButton
                  variant="lime"
                  className="w-full text-[13.5px] tracking-[.06em] uppercase"
                  onClick={() => document.getElementById("menus")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Voir les menus
                </MetalButton>
                <a
                  href="https://wa.me/33675008633"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3.5 px-6 rounded-[10px] text-[13.5px] font-bold uppercase tracking-[.06em] border-[1.5px] border-lime text-lime hover:bg-lime-s transition-all w-full"
                >
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6A8.4 8.4 0 0 1 12 3h.5a8.5 8.5 0 0 1 8 8.5z" /></svg>
                  WhatsApp
                </a>
                <a
                  href="mailto:contact@lappart98.com"
                  className="flex items-center justify-center gap-2 py-3.5 px-6 rounded-[10px] text-[13.5px] font-bold uppercase tracking-[.06em] border-[1.5px] border-faint text-dim hover:border-dim hover:text-chalk transition-all w-full"
                >
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></svg>
                  Email
                </a>
              </div>
            </RevealOnScroll>
          </div>
        </section>
      </KineticGrid>

      {/* ═══ MARQUEE ═══ */}
      <div className="overflow-hidden bg-lime py-3" aria-hidden="true">
        <div className="inline-flex" style={{ animation: "mq 22s linear infinite" }}>
          {["DTF", "Broderie", "Stickers UV", "T-Shirts", "Sweats", "Casquettes", "Tote bags", "DTF", "Broderie", "Stickers UV", "T-Shirts", "Sweats", "Casquettes", "Tote bags"].map((t, i) => (
            <span
              key={i}
              className="font-display text-[12.5px] font-bold uppercase tracking-[.14em] text-bg px-5 inline-flex items-center gap-5 after:content-[''] after:w-1 after:h-1 after:rounded-full after:bg-bg after:opacity-35"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ═══ MENUS ═══ */}
      <section className="py-[72px] px-5" id="menus">
        <div className="max-w-[620px] mx-auto">
          <RevealOnScroll>
            <p className="text-[11px] font-semibold tracking-[.18em] uppercase text-faint mb-2.5">
              Sers-toi, c&apos;est a la commande
            </p>
          </RevealOnScroll>
          <RevealOnScroll>
            <h2 className="font-display text-[clamp(26px,7vw,38px)] font-bold leading-[.95] uppercase tracking-tight mb-2.5">
              Les <em className="not-italic text-lime">menus</em>
            </h2>
          </RevealOnScroll>
          <RevealOnScroll>
            <p className="text-[14.5px] text-dim max-w-[400px] leading-relaxed">
              Choisis ta formule selon la quantite.
            </p>
          </RevealOnScroll>
          <div className="flex flex-col gap-3 mt-7">
            <MenuCard
              name="Le P'tit Solo"
              qty="1 a 4"
              desc="Ta piece perso, flocage + textile au choix"
              price={14}
              onClick={() => setCfgMenu("solo")}
            />
            <MenuCard
              name="Le Menu Team"
              qty="5 a 14"
              desc="Parfait equipes, assos & familles"
              price={12}
              onClick={() => setCfgMenu("team")}
            />
            <MenuCard
              name="Le Maxi Best-Of"
              qty="15 a 40"
              desc="Le plus commande — rapport qualite/prix"
              price={11}
              featured
              onClick={() => setCfgMenu("bestof")}
            />
          </div>
          <RevealOnScroll>
            <div className="mt-4 bg-lime rounded-[10px] px-[18px] py-3.5 font-display text-[12.5px] font-bold uppercase tracking-[.04em] text-bg text-center leading-snug">
              Chaque menu = ton textile + ton flocage + la pose
            </div>
          </RevealOnScroll>
          <RevealOnScroll>
            <p className="text-[12px] text-faint text-center mt-3 leading-relaxed">
              *Prix indicatifs T-Shirt Basique + flocage dos. Tarif selon textile et emplacements.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* ═══ COMMENT CA MARCHE ═══ */}
      <section className="py-[72px] px-5" id="how">
        <div className="max-w-[620px] mx-auto">
          <RevealOnScroll>
            <p className="text-[11px] font-semibold tracking-[.18em] uppercase text-faint mb-2.5">
              Simple comme bonjour
            </p>
          </RevealOnScroll>
          <RevealOnScroll>
            <h2 className="font-display text-[clamp(26px,7vw,38px)] font-bold leading-[.95] uppercase tracking-tight mb-2.5">
              Comment <em className="not-italic text-lime">ca marche</em>
            </h2>
          </RevealOnScroll>
          <div className="flex flex-col gap-3 mt-7">
            <StepCard n="1" icon="chat" title="Contacte-nous" desc="Envoie-nous ton visuel ou ton idee par WhatsApp. On te repond en moins de 2h avec un devis gratuit." />
            <StepCard n="2" icon="edit" title="On prepare" desc="On adapte ton visuel, tu valides le BAT. Tu choisis ton textile et ta technique (DTF, stickers UV ou broderie)." />
            <StepCard n="3" icon="box" title="C'est pret" desc="Production express dans notre atelier a Gentilly. Retrait sur place ou livraison." />
          </div>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section className="text-center py-[72px] px-5 relative" id="contact">
        <div className="absolute bottom-0 left-1/2 w-[min(600px,100vw)] h-[400px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_50%_100%,rgba(200,255,0,.03),transparent_70%)] pointer-events-none" />
        <div className="max-w-[620px] mx-auto relative">
          <RevealOnScroll>
            <p className="text-[11px] font-semibold tracking-[.18em] uppercase text-faint mb-2.5">
              On est la
            </p>
          </RevealOnScroll>
          <RevealOnScroll>
            <h2 className="font-display text-[clamp(26px,7vw,38px)] font-bold leading-[.95] uppercase tracking-tight mb-3">
              On <em className="not-italic text-lime">t&apos;attend</em>
            </h2>
          </RevealOnScroll>
          <RevealOnScroll>
            <p className="text-[14.5px] text-dim max-w-[400px] mx-auto mb-7 leading-relaxed text-center">
              Passe nous voir a l&apos;atelier ou envoie ton projet par WhatsApp. Devis gratuit, reponse en moins de 2h.
            </p>
          </RevealOnScroll>
          <RevealOnScroll>
            <div className="flex flex-col gap-2.5 max-w-[300px] mx-auto mb-8">
              <MetalButton
                variant="lime"
                className="w-full text-[13.5px] tracking-[.06em] uppercase"
                onClick={() => window.open("https://wa.me/33675008633", "_blank")}
              >
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6A8.4 8.4 0 0 1 12 3h.5a8.5 8.5 0 0 1 8 8.5z" /></svg>
                Envoyer un message
              </MetalButton>
            </div>
          </RevealOnScroll>

          <div className="flex flex-col gap-2.5">
            <ContactCard
              href="https://maps.google.com/?q=65+rue+Charles+Frerot+94250+Gentilly"
              icon="pin"
              label="Atelier"
              value="65 rue Charles Frerot, 94250 Gentilly"
            />
            <ContactCard
              href="https://wa.me/33675008633"
              icon="phone"
              label="WhatsApp"
              value="06 75 00 86 33"
            />
            <ContactCard
              href="https://instagram.com/lappart_98"
              icon="instagram"
              label="Instagram"
              value="@lappart_98"
            />
            <ContactCard
              href="https://www.lappart98.com"
              icon="globe"
              label="Site web"
              value="www.lappart98.com"
            />
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-rule py-7 px-5 text-center">
        <div className="max-w-[620px] mx-auto">
          <div className="font-display font-bold text-base mb-1">
            L&apos;APPART<b className="text-lime text-xs">98</b>
          </div>
          <p className="text-[11.5px] text-faint leading-relaxed">
            Atelier textile personnalise · Gentilly (94)
          </p>
        </div>
      </footer>

      {/* ═══ CONFIGURATEUR ═══ */}
      {cfgMenu && (
        <Configurator
          menuKey={cfgMenu}
          onClose={() => setCfgMenu(null)}
        />
      )}
    </>
  );
}

/* ── Sub-components ── */

function FormulaCard({ icon, label }: { icon: string; label: string }) {
  const icons: Record<string, React.ReactElement> = {
    palette: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><path d="M12 2C6.5 2 2 6.5 2 12a10 10 0 0 0 10 10c.8 0 1.4-.3 1.8-.9.4-.5.4-1.2.2-1.8-.3-.7-.3-1.4 0-2 .4-.8 1.2-1.3 2-1.3h2a4 4 0 0 0 4-4c0-4.4-4.5-8-10-8z" /><circle cx="8" cy="8" r="1.2" fill="currentColor" stroke="none" /><circle cx="14" cy="7" r="1.2" fill="currentColor" stroke="none" /><circle cx="6.5" cy="12.5" r="1.2" fill="currentColor" stroke="none" /></svg>,
    press: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><rect x="5" y="3" width="14" height="6" rx="1.5" /><line x1="12" y1="9" x2="12" y2="12" /><rect x="4" y="12" width="16" height="8" rx="1.5" /></svg>,
    textile: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><path d="M8 2L2 7l2.5 3L8 7.5V22h8V7.5l3.5 2.5L22 7l-6-5c0 2.2-1.8 4-4 4S8 4.2 8 2z" /></svg>,
  };
  return (
    <div className="bg-sf border border-rule rounded-xl p-3.5 px-4 flex flex-col items-center gap-2 min-w-[88px] hover:border-[rgba(200,255,0,.25)] hover:-translate-y-0.5 transition-all">
      <div className="w-9 h-9 rounded-[9px] bg-[rgba(200,255,0,.08)] flex items-center justify-center text-lime">
        {icons[icon]}
      </div>
      <span className="text-[10px] font-bold uppercase tracking-[.1em]">{label}</span>
    </div>
  );
}

function StepCard({ n, icon, title, desc }: { n: string; icon: string; title: string; desc: string }) {
  const icons: Record<string, React.ReactElement> = {
    chat: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>,
    edit: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>,
    box: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><path d="M3.3 7 12 12l8.7-5M12 22V12" /></svg>,
  };
  return (
    <RevealOnScroll>
      <div className="bg-sf border border-rule rounded-[14px] p-6 px-[22px] hover:border-[rgba(200,255,0,.15)] hover:-translate-y-px transition-all">
        <div className="flex items-center gap-3 mb-3.5">
          <span className="font-display text-[12px] font-bold text-faint w-6 h-6 rounded-md border border-rule flex items-center justify-center shrink-0">
            {n}
          </span>
          <div className="w-[38px] h-[38px] rounded-[9px] bg-[rgba(200,255,0,.08)] flex items-center justify-center text-lime shrink-0">
            {icons[icon]}
          </div>
        </div>
        <h3 className="font-display text-[15px] font-bold uppercase tracking-[.02em] mb-1.5">{title}</h3>
        <p className="text-sm text-dim leading-relaxed">{desc}</p>
      </div>
    </RevealOnScroll>
  );
}

function MenuCard({
  name,
  qty,
  desc,
  price,
  featured,
  onClick,
}: {
  name: string;
  qty: string;
  desc: string;
  price: number;
  featured?: boolean;
  onClick: () => void;
}) {
  return (
    <RevealOnScroll>
      <div
        onClick={onClick}
        className={`bg-sf border rounded-[14px] p-[22px] flex items-center justify-between gap-4 cursor-pointer hover:-translate-y-px transition-all relative overflow-hidden ${
          featured
            ? "border-[rgba(200,255,0,.5)] hover:border-lime"
            : "border-rule hover:border-[rgba(200,255,0,.2)]"
        }`}
      >
        {featured && (
          <span className="absolute top-2.5 -right-8 bg-lime text-bg text-[8.5px] font-bold tracking-[.08em] px-10 py-[3px] rotate-[32deg] uppercase pointer-events-none">
            Le + commande
          </span>
        )}
        <div>
          <h3 className="font-display text-base font-bold uppercase tracking-tight mb-1 flex items-center gap-2 flex-wrap">
            {name}
            <span className="text-[10px] font-semibold px-[9px] py-[3px] rounded-full bg-sf2 text-dim tracking-[.04em] font-body">
              {qty}
            </span>
          </h3>
          <p className="text-[13px] text-dim leading-snug">{desc}</p>
        </div>
        <div className="text-center shrink-0 min-w-[56px]">
          <span className="text-[9.5px] font-bold uppercase tracking-[.06em] text-dim block">
            Des
          </span>
          <span className="font-display text-[34px] font-bold text-lime leading-none tabular-nums block">
            {price}
          </span>
          <span className="text-[10.5px] font-medium text-dim block">
            &euro;/piece*
          </span>
        </div>
      </div>
    </RevealOnScroll>
  );
}

function ContactCard({
  href,
  icon,
  label,
  value,
}: {
  href: string;
  icon: string;
  label: string;
  value: string;
}) {
  const icons: Record<string, React.ReactElement> = {
    pin: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" className="w-[18px] h-[18px]"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>,
    phone: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.1 2 2 0 0 1 4.1 2H7a2 2 0 0 1 2 1.7c.1.7.4 1.4.7 2.1a2 2 0 0 1-.5 2.1L8 9.7a16 16 0 0 0 6.3 6.3l1.1-1.1a2 2 0 0 1 2.1-.5c.7.3 1.4.5 2.1.7A2 2 0 0 1 22 16.9z" /></svg>,
    instagram: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" className="w-[18px] h-[18px]"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" /></svg>,
    globe: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" className="w-[18px] h-[18px]"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" /></svg>,
  };

  return (
    <RevealOnScroll>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-sf border border-rule rounded-xl p-[18px] px-5 flex items-center gap-3.5 hover:border-[rgba(200,255,0,.15)] hover:-translate-y-px transition-all"
      >
        <div className="w-[42px] h-[42px] rounded-[10px] bg-[rgba(200,255,0,.08)] shrink-0 flex items-center justify-center text-lime">
          {icons[icon]}
        </div>
        <div className="text-left">
          <span className="text-[10px] font-semibold tracking-[.12em] uppercase text-faint block">
            {label}
          </span>
          <span className="text-sm font-semibold mt-px block">{value}</span>
        </div>
      </a>
    </RevealOnScroll>
  );
}
