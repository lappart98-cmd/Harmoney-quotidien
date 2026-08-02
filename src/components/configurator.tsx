"use client";

import { useState, useCallback } from "react";
import { PRODUCTS, MENUS, FLOCS, TECHS } from "@/lib/data";

interface CfgState {
  menu: string | null;
  step: number;
  cart: Record<string, number>;
  floc: Record<string, boolean | number>;
  tech: string;
}

const initialState: CfgState = {
  menu: null,
  step: 0,
  cart: {},
  floc: { dos: true, coeur: true, logos: 0 },
  tech: "dtf",
};

export default function Configurator({
  menuKey,
  onClose,
}: {
  menuKey: string;
  onClose: () => void;
}) {
  const [state, setState] = useState<CfgState>({
    ...initialState,
    menu: menuKey,
  });

  const menu = MENUS[state.menu!];

  const totalPcs = useCallback(() => {
    return Object.values(state.cart).reduce((a, b) => a + b, 0);
  }, [state.cart]);

  const textileSum = useCallback(() => {
    return PRODUCTS.reduce(
      (t, p) => t + (state.cart[p.id] || 0) * p.price,
      0
    );
  }, [state.cart]);

  const flocPP = useCallback(() => {
    let t = 0;
    FLOCS.forEach((f) => {
      if (state.floc[f.id]) t += f.price;
    });
    t += (state.floc.logos as number) * 2;
    return t;
  }, [state.floc]);

  const estimate = useCallback(() => {
    const n = totalPcs();
    return textileSum() + flocPP() * n;
  }, [totalPcs, textileSum, flocPP]);

  const setStep = (n: number) =>
    setState((s) => ({ ...s, step: n }));

  const setQty = (id: string, d: number) => {
    setState((s) => {
      const cur = s.cart[id] || 0;
      let nv = cur + d;
      if (nv < 0) nv = 0;
      const m = MENUS[s.menu!];
      const tot = totalPcs() - cur + nv;
      if (tot > m.max) return s;
      return { ...s, cart: { ...s.cart, [id]: nv } };
    });
  };

  const togFloc = (id: string) =>
    setState((s) => ({ ...s, floc: { ...s.floc, [id]: !s.floc[id] } }));

  const togLogos = () =>
    setState((s) => ({
      ...s,
      floc: { ...s.floc, logos: s.floc.logos === 0 ? 1 : 0 },
    }));

  const adjLogos = (d: number) =>
    setState((s) => ({
      ...s,
      floc: {
        ...s.floc,
        logos: Math.max(0, (s.floc.logos as number) + d),
      },
    }));

  const setTech = (id: string) =>
    setState((s) => ({ ...s, tech: id }));

  const orderText = () => {
    const pcs = totalPcs();
    const est = estimate();
    const techName = TECHS.find((t) => t.id === state.tech)?.name || "";
    const lines = [
      "Salut ! Voici ma commande :",
      "",
      `Formule : ${menu.name}`,
      `Technique : ${techName}`,
      "",
      "Textiles :",
    ];
    PRODUCTS.forEach((p) => {
      const q = state.cart[p.id] || 0;
      if (q > 0)
        lines.push(`- ${p.name} x${q} = ${q * p.price}€`);
    });
    lines.push("", "Flocage :");
    FLOCS.forEach((f) => {
      if (state.floc[f.id])
        lines.push(`- ${f.name} (+${f.price}€/piece)`);
    });
    if ((state.floc.logos as number) > 0)
      lines.push(
        `- ${state.floc.logos} logo(s) supp. (+2€/logo/piece)`
      );
    lines.push("", `Estimation : ~${est}€`, "", "Merci !");
    return lines.join("\n");
  };

  const waLink = () =>
    `https://wa.me/33675008633?text=${encodeURIComponent(orderText())}`;
  const mailLink = () =>
    `mailto:contact@lappart98.com?subject=${encodeURIComponent(
      `Devis L'Appart 98 — ${menu.name}`
    )}&body=${encodeURIComponent(orderText())}`;

  const tabs = ["Le textile", "Personnalisation", "Recapitulatif"];
  const pcs = totalPcs();
  const est = estimate();

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col bg-black/50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="mt-14 flex-1 flex flex-col bg-sf rounded-t-[18px] overflow-hidden"
        style={{ animation: "cfgUp .4s cubic-bezier(.16,1,.3,1)" }}
      >
        {/* Header */}
        <div className="flex justify-between items-start px-5 pt-5">
          <div>
            <h2 className="font-display text-xl font-bold uppercase tracking-tight">
              {menu.name}
            </h2>
            <p className="text-[13px] text-dim mt-0.5">
              {state.step === 0
                ? menu.label
                : `${pcs} pieces${est > 0 ? ` · ~${est}€` : ""}`}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-sf2 flex items-center justify-center text-xl text-dim shrink-0 hover:bg-faint transition-colors"
            aria-label="Fermer"
          >
            &times;
          </button>
        </div>

        {/* Tabs */}
        <div className="flex px-5 pt-4 gap-1">
          {tabs.map((t, i) => (
            <button
              key={t}
              onClick={() => setStep(i)}
              className={`flex-1 py-2.5 px-1.5 text-center rounded-lg text-[10.5px] font-bold uppercase tracking-wide transition-all ${
                i === state.step
                  ? "bg-lime text-bg"
                  : "bg-sf2 text-dim"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {state.step === 0 && (
            <Step1
              cart={state.cart}
              menu={menu}
              totalPcs={totalPcs}
              setQty={setQty}
            />
          )}
          {state.step === 1 && (
            <Step2
              floc={state.floc}
              tech={state.tech}
              totalPcs={totalPcs}
              flocPP={flocPP}
              togFloc={togFloc}
              togLogos={togLogos}
              adjLogos={adjLogos}
              setTech={setTech}
            />
          )}
          {state.step === 2 && (
            <Step3
              state={state}
              totalPcs={totalPcs}
              textileSum={textileSum}
              flocPP={flocPP}
              estimate={estimate}
            />
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-2 px-5 py-3 pb-[calc(12px+env(safe-area-inset-bottom))] border-t border-rule bg-sf">
          {state.step === 0 && (
            <button
              onClick={() => setStep(1)}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-[10px] text-[13.5px] font-bold uppercase tracking-wide bg-lime text-bg hover:bg-chalk transition-all"
            >
              Suivant &rsaquo;
            </button>
          )}
          {state.step === 1 && (
            <>
              <button
                onClick={() => setStep(0)}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-[10px] text-[13.5px] font-bold uppercase tracking-wide border-[1.5px] border-faint text-dim hover:border-dim hover:text-chalk transition-all"
              >
                Retour
              </button>
              <button
                onClick={() => setStep(2)}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-[10px] text-[13.5px] font-bold uppercase tracking-wide bg-lime text-bg hover:bg-chalk transition-all"
              >
                Suivant &rsaquo;
              </button>
            </>
          )}
          {state.step === 2 && (
            <>
              <button
                onClick={() => setStep(1)}
                className="flex items-center justify-center gap-2 py-3.5 px-6 rounded-[10px] text-[13.5px] font-bold uppercase tracking-wide border-[1.5px] border-faint text-dim hover:border-dim hover:text-chalk transition-all"
              >
                Retour
              </button>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-[1.2] flex items-center justify-center gap-2 py-3.5 px-6 rounded-[10px] text-[13.5px] font-bold uppercase tracking-wide bg-lime text-bg hover:bg-chalk transition-all"
              >
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6"><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6A8.4 8.4 0 0 1 12 3h.5a8.5 8.5 0 0 1 8 8.5z" /></svg>
                WhatsApp
              </a>
              <a
                href={mailLink()}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-[10px] text-[13.5px] font-bold uppercase tracking-wide bg-lime text-bg hover:bg-chalk transition-all"
              >
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></svg>
                Email
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── STEP 1: Textiles ── */
function Step1({
  cart,
  menu,
  totalPcs,
  setQty,
}: {
  cart: Record<string, number>;
  menu: { max: number };
  totalPcs: () => number;
  setQty: (id: string, d: number) => void;
}) {
  return (
    <>
      <p className="text-[13px] text-dim mb-3.5">
        Ajoute les textiles et choisis la quantite pour chacun.
      </p>
      {PRODUCTS.map((p) => {
        const q = cart[p.id] || 0;
        return (
          <div
            key={p.id}
            className="bg-paper rounded-xl p-3.5 flex items-center gap-3.5 mb-2"
          >
            <div
              className="w-16 h-16 rounded-[10px] bg-[#e5e0d4] flex items-center justify-center shrink-0 text-ink2"
              dangerouslySetInnerHTML={{ __html: p.svg }}
              style={{ color: "#7a7464" }}
            />
            <div className="flex-1 min-w-0">
              <div className="font-display text-[13px] font-bold uppercase text-ink leading-tight mb-0.5">
                {p.name}
              </div>
              <div className="text-[12.5px] text-ink2">
                {p.price}&euro;/piece
              </div>
            </div>
            <div className="flex items-center gap-0.5 shrink-0">
              <button
                onClick={() => setQty(p.id, -1)}
                className="w-[34px] h-[34px] rounded-lg bg-[#ddd8cc] text-lg text-ink flex items-center justify-center active:bg-[#ccc7bb] transition-colors"
              >
                −
              </button>
              <span className="w-[30px] text-center font-display font-bold text-[15px] text-ink tabular-nums">
                {q}
              </span>
              <button
                onClick={() => setQty(p.id, 1)}
                className="w-[34px] h-[34px] rounded-lg bg-[#ddd8cc] text-lg text-ink flex items-center justify-center active:bg-[#ccc7bb] transition-colors"
              >
                +
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}

/* ── STEP 2: Personnalisation ── */
function Step2({
  floc,
  tech,
  totalPcs,
  flocPP,
  togFloc,
  togLogos,
  adjLogos,
  setTech,
}: {
  floc: Record<string, boolean | number>;
  tech: string;
  totalPcs: () => number;
  flocPP: () => number;
  togFloc: (id: string) => void;
  togLogos: () => void;
  adjLogos: (d: number) => void;
  setTech: (id: string) => void;
}) {
  const pcs = totalPcs();
  const fp = flocPP();

  return (
    <>
      <div className="font-display text-[13px] font-bold uppercase tracking-wider text-dim my-4 first:mt-0">
        Emplacements flocage
      </div>
      {FLOCS.map((f) => {
        const on = !!floc[f.id];
        return (
          <div
            key={f.id}
            onClick={() => togFloc(f.id)}
            className={`rounded-xl p-4 px-[18px] flex items-center gap-3 mb-2 cursor-pointer border-[1.5px] transition-all ${
              on
                ? "border-lime bg-lime-s"
                : "border-rule bg-sf"
            }`}
          >
            <div
              className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all ${
                on
                  ? "bg-lime border-lime text-bg"
                  : "border-faint"
              }`}
            >
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`w-3.5 h-3.5 ${on ? "opacity-100" : "opacity-0"}`}
              >
                <path d="M3 8l3.5 4L13 4" />
              </svg>
            </div>
            <span className="flex-1 font-display text-sm font-bold uppercase">
              {f.name}
            </span>
            <span className="text-[13px] text-dim font-semibold">
              +{f.price}&euro;/piece
            </span>
          </div>
        );
      })}

      {/* Logos supplementaires */}
      <div
        onClick={() => togLogos()}
        className={`rounded-xl p-4 px-[18px] flex items-center gap-3 mb-2 cursor-pointer border-[1.5px] transition-all ${
          (floc.logos as number) > 0
            ? "border-lime bg-lime-s"
            : "border-rule bg-sf"
        }`}
      >
        <div
          className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all ${
            (floc.logos as number) > 0
              ? "bg-lime border-lime text-bg"
              : "border-faint"
          }`}
        >
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`w-3.5 h-3.5 ${(floc.logos as number) > 0 ? "opacity-100" : "opacity-0"}`}
          >
            <path d="M3 8l3.5 4L13 4" />
          </svg>
        </div>
        <div className="flex-1">
          <span className="font-display text-sm font-bold uppercase">
            Logo(s) supplementaire(s)
          </span>
          <div className="text-[12.5px] text-ink2 mt-0.5">
            +2&euro;/logo/piece
          </div>
        </div>
        {(floc.logos as number) > 0 && (
          <div
            className="flex items-center gap-0.5 ml-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => adjLogos(-1)}
              className="w-[34px] h-[34px] rounded-lg bg-sf2 text-lg flex items-center justify-center"
            >
              −
            </button>
            <span className="w-[30px] text-center font-display font-bold text-[15px] tabular-nums">
              {floc.logos as number}
            </span>
            <button
              onClick={() => adjLogos(1)}
              className="w-[34px] h-[34px] rounded-lg bg-sf2 text-lg flex items-center justify-center"
            >
              +
            </button>
          </div>
        )}
      </div>

      {pcs > 0 && (
        <div className="text-right text-[12.5px] text-dim mt-2 tabular-nums">
          Flocage : {fp}&euro;/piece &times; {pcs} = {fp * pcs}&euro;
        </div>
      )}

      <div className="font-display text-[13px] font-bold uppercase tracking-wider text-dim my-4">
        Technique
      </div>
      {TECHS.map((t) => {
        const on = tech === t.id;
        return (
          <div
            key={t.id}
            onClick={() => setTech(t.id)}
            className={`rounded-xl p-4 px-[18px] mb-2 cursor-pointer border-[1.5px] transition-all ${
              on ? "border-lime bg-lime-s" : "border-rule bg-sf"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="font-display text-sm font-bold uppercase">
                {t.name}
              </span>
              <span
                className={`text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded ${
                  t.rec
                    ? "bg-lime text-bg"
                    : "bg-sf2 text-dim"
                }`}
              >
                {t.badge}
              </span>
              <div
                className={`ml-auto w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                  on
                    ? "bg-lime border-lime text-bg"
                    : "border-faint"
                }`}
              >
                {on && (
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 8l3.5 4L13 4" />
                  </svg>
                )}
              </div>
            </div>
            <div className="text-[13px] text-dim leading-snug">
              {t.desc}
            </div>
          </div>
        );
      })}
    </>
  );
}

/* ── STEP 3: Receipt ── */
function Step3({
  state,
  totalPcs,
  textileSum,
  flocPP,
  estimate,
}: {
  state: CfgState;
  totalPcs: () => number;
  textileSum: () => number;
  flocPP: () => number;
  estimate: () => number;
}) {
  const menu = MENUS[state.menu!];
  const pcs = totalPcs();
  const ts = textileSum();
  const fp = flocPP();
  const ft = fp * pcs;
  const est = estimate();
  const techName = TECHS.find((t) => t.id === state.tech)?.name || "";

  return (
    <div className="relative mx-[-20px] py-4">
      <div className="rcpt bg-paper p-7 px-[22px] relative text-ink font-mono text-[12.5px] leading-relaxed">
        <div className="text-center mb-3">
          <h3 className="font-display text-xl font-bold uppercase tracking-tight">
            L&apos;Appart 98
          </h3>
          <p className="text-[11.5px] text-ink2 leading-snug">
            65 rue Charles Frerot, 94250 Gentilly
            <br />
            06 75 00 86 33
          </p>
        </div>
        <hr className="border-none border-t-[1.5px] border-dashed border-[#cdc5b4] my-3" />
        <div className="flex justify-between items-baseline gap-2 py-0.5">
          <span>FORMULE</span>
          <b className="font-bold">{menu.name}</b>
        </div>
        <div className="flex justify-between items-baseline gap-2 py-0.5">
          <span>TECHNIQUE</span>
          <b className="font-bold">{techName}</b>
        </div>
        <hr className="border-none border-t-[1.5px] border-dashed border-[#cdc5b4] my-3" />
        <div className="flex justify-between items-baseline gap-2 py-0.5 text-ink2 text-[11px] uppercase tracking-wider mb-1">
          <span>TEXTILES</span>
          <span>QTE&nbsp;&nbsp;&nbsp;P.U.&nbsp;&nbsp;&nbsp;PRIX</span>
        </div>
        {PRODUCTS.filter((p) => (state.cart[p.id] || 0) > 0).map((p) => {
          const q = state.cart[p.id] || 0;
          const nm = p.name.length > 18 ? p.name.substring(0, 16) + "..." : p.name;
          return (
            <div key={p.id} className="flex justify-between items-baseline gap-2 py-0.5">
              <span>{nm}</span>
              <b className="font-bold">
                x{q}&nbsp;&nbsp;{p.price}&euro;&nbsp;&nbsp;{q * p.price}&euro;
              </b>
            </div>
          );
        })}
        <div className="flex justify-between items-baseline gap-2 py-0.5 mt-1">
          <span>Sous-total textile</span>
          <b className="font-bold">{ts}&euro;</b>
        </div>
        <hr className="border-none border-t-[1.5px] border-dashed border-[#cdc5b4] my-3" />
        <div className="flex justify-between items-baseline gap-2 py-0.5 text-ink2 text-[11px] uppercase tracking-wider mb-1">
          <span>FLOCAGE</span>
          <span>PRIX</span>
        </div>
        {FLOCS.filter((f) => !!state.floc[f.id]).map((f) => (
          <div key={f.id} className="flex justify-between items-baseline gap-2 py-0.5">
            <span>{f.name}</span>
            <b className="font-bold">
              {pcs}&times; {f.price}&euro;&nbsp;&nbsp;{pcs * f.price}&euro;
            </b>
          </div>
        ))}
        {(state.floc.logos as number) > 0 && (
          <div className="flex justify-between items-baseline gap-2 py-0.5">
            <span>Logos supp. ({state.floc.logos as number})</span>
            <b className="font-bold">
              {pcs}&times; {(state.floc.logos as number) * 2}&euro;&nbsp;&nbsp;
              {pcs * (state.floc.logos as number) * 2}&euro;
            </b>
          </div>
        )}
        <div className="flex justify-between items-baseline gap-2 py-0.5 mt-1">
          <span>Sous-total flocage</span>
          <b className="font-bold">{ft}&euro;</b>
        </div>
        <hr className="border-none border-t-[1.5px] border-solid border-[#cdc5b4] my-3" />
        <div className="flex justify-between items-baseline py-1">
          <span className="font-display text-base font-bold uppercase">
            ESTIMATION
          </span>
          <span className="font-display text-[28px] font-bold">
            ~{est}&euro;*
          </span>
        </div>
        <hr className="border-none border-t-[1.5px] border-dashed border-[#cdc5b4] my-3" />
        <p className="text-[11px] text-ink2 text-center leading-snug mt-2">
          *Prix indicatif HT — devis final apres
          <br />
          validation du BAT selon textile et visuel.
        </p>
        <p className="font-display text-[13px] font-bold uppercase tracking-[.1em] text-center my-2 text-ink">
          Merci de votre visite !
        </p>
        <hr className="border-none border-t-[1.5px] border-dashed border-[#cdc5b4] my-3" />
        <p className="text-[12px] text-ink2 text-center leading-snug">
          Pour recevoir ton devis final et nous
          <br />
          envoyer ton logo, ecris-nous sur
          <br />
          <a
            href="https://wa.me/33675008633"
            className="text-lime font-semibold"
          >
            WhatsApp
          </a>{" "}
          ou par{" "}
          <a
            href="mailto:contact@lappart98.com"
            className="text-ink font-bold"
          >
            mail
          </a>
        </p>
      </div>
    </div>
  );
}
