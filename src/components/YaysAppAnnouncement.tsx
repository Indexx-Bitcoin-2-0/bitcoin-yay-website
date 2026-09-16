"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, MessageCircle, Phone, Users, X } from "lucide-react";
import { EXTERNAL_URLS } from "@/lib/api-config";
import CustomButton2 from "@/components/CustomButton2";
import ChatOvalButtonImage from "@/assets/images/roadmap/chat-oval.svg";
import InfoButtonImage from "@/assets/images/buttons/info-button.webp";
import ArrowRightButtonImage from "@/assets/images/buttons/arrow-right-button.svg";
import ArrowUpButtonImage from "@/assets/images/buttons/arrow-up-button.webp";
import styles from "./YaysAppAnnouncement.module.css";

const STORAGE_KEY = "btcy_yaysapp_intro_v1_seen";
const features = [
  { icon: MessageCircle, label: "Chats" },
  { icon: Phone, label: "Calls" },
  { icon: Users, label: "Communities" },
];
const products = [
  { name: "YaysApp", purpose: "Chats, calls & communities", description: "The Bitcoin Yay ecosystem's dedicated app — sign in with your existing login.", href: EXTERNAL_URLS.yaysapp.home, external: true },
  { name: "Bitcoin Yay", purpose: "Mobile mining", description: "Your home for daily mobile mining and mining rewards.", href: "/mining/free-mining" },
  { name: "Indexx.ai", purpose: "Wallet & utilities", description: "The platform behind Bitcoin Yay’s wallet and ecosystem utilities.", href: "/btcy-indexx-relationship" },
  { name: "BTCY Alchemy", purpose: "Reward conversion", description: "Convert eligible mining rewards into tokens when Alchemy requirements are met.", href: "/alchemy" },
];

export default function YaysAppAnnouncement() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const previousOverflow = useRef<string | null>(null);

  const restoreScroll = useCallback(() => {
    if (previousOverflow.current !== null) {
      document.body.style.overflow = previousOverflow.current;
      previousOverflow.current = null;
    }
  }, []);

  const openIntro = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    previousOverflow.current = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
  }, []);

  const rememberIntro = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // The introduction remains usable when browser storage is disabled.
    }
  }, []);

  const closeIntro = () => dialogRef.current?.close();

  useEffect(() => {
    let seen = false;
    try {
      seen = localStorage.getItem(STORAGE_KEY) === "true";
    } catch {
      // Fall back to showing the introduction for this visit.
    }
    if (seen) return;
    const timer = window.setTimeout(() => {
      // Do not interrupt sign-in or another dialog the visitor has opened.
      if (!document.querySelector('dialog[open], [role="dialog"], [aria-modal="true"]')) {
        openIntro();
      }
    }, 900);
    return () => window.clearTimeout(timer);
  }, [openIntro]);

  useEffect(() => restoreScroll, [restoreScroll]);

  return (
    <section id="yaysapp" aria-labelledby="yaysapp-heading" className={styles.section}>
      <div className={styles.banner}>
        <div>
          <p className={styles.eyebrow}>New in the Bitcoin Yay ecosystem</p>
          <Image src="/images/yaysapp-logo-white.png" alt="YaysApp" width={250} height={70} className={styles.logo} />
          <h2 id="yaysapp-heading" className={styles.heading}>Your community. Now a conversation away.</h2>
          <p className={styles.description}>Meet YaysApp, the Bitcoin Yay ecosystem’s dedicated app for chats, calls, and communities.</p>
          <div className={styles.features}>
            {features.map(({ icon: Icon, label }) => <span key={label}><Icon size={18} aria-hidden="true" />{label}</span>)}
          </div>
        </div>
        <div className={styles.accountCard}>
          <span className={styles.accountIcon}><Check aria-hidden="true" size={22} /></span>
          <h3>Same account.<br />No new registration.</h3>
          <p>Sign in to YaysApp with the same login credentials you already use for Bitcoin Yay.</p>
          <div className={styles.actions}>
            <CustomButton2
              image={ChatOvalButtonImage}
              text="Get YaysApp"
              link={EXTERNAL_URLS.yaysapp.home}
              _blank
              ariaLabel="Get YaysApp (opens in a new tab)"
              imageStyling="w-20 md:w-24"
            />
            <CustomButton2
              image={ArrowUpButtonImage}
              text="Visit yaysapp.com"
              link={EXTERNAL_URLS.yaysapp.home}
              _blank
              ariaLabel="Visit yaysapp.com (opens in a new tab)"
              imageStyling="w-20 md:w-24"
            />
            <CustomButton2
              image={InfoButtonImage}
              text="Discover more"
              onClick={openIntro}
              ariaLabel="Discover YaysApp and the ecosystem"
              imageStyling="w-20 md:w-24"
            />
          </div>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby="yaysapp-intro-title"
        aria-describedby="yaysapp-intro-description"
        onClose={() => {
          rememberIntro();
          restoreScroll();
          const target = previousFocus.current;
          if (target?.isConnected && target !== document.body) target.focus();
        }}
        onClick={event => { if (event.target === event.currentTarget) closeIntro(); }}
      >
        <div className={styles.dialogContent}>
          <button type="button" className={styles.closeButton} onClick={closeIntro} aria-label="Close YaysApp introduction"><X size={24} aria-hidden="true" /></button>
          <p className={styles.eyebrow}>Meet the newest member of the family</p>
          <Image src="/images/yaysapp-logo-white.png" alt="YaysApp" width={250} height={70} className={styles.logo} />
          <h2 id="yaysapp-intro-title" className={styles.dialogTitle}>Say hello to YaysApp.</h2>
          <p id="yaysapp-intro-description" className={styles.description}>A separate app. Part of Bitcoin Yay. Stay connected through chats, calls, and communities.</p>
          <div className={styles.features}>
            {features.map(({ icon: Icon, label }) => <span key={label}><Icon size={18} aria-hidden="true" />{label}</span>)}
          </div>
          <div className={styles.loginNote}>
            <Check size={22} aria-hidden="true" />
            <div><h3>Your Bitcoin Yay login works here too.</h3><p>Use your existing login credentials. You do not need to register again.</p></div>
          </div>
          <ol className={styles.steps}>
            <li>Get YaysApp from Google Play — free, no wallet required to start. (iOS is coming soon.)</li>
            <li>Open the app and choose <strong>Sign in</strong>, not &ldquo;Create account&rdquo;.</li>
            <li>Enter the same email and password you use for Bitcoin Yay. You&apos;re in — no new registration.</li>
          </ol>
          <div className={styles.stores}>
            <span className={`${styles.store} ${styles.storeSoon}`} role="link" aria-disabled="true">
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" /></svg>
              <span className={styles.storeTxt}><small>Coming soon to the</small><strong>App Store</strong></span>
            </span>
            <a className={styles.store} href={EXTERNAL_URLS.yaysapp.googlePlay} target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#00A0FF" d="M3 20.5V3.5c0-.59.34-1.11.84-1.35L13.69 12 3.84 21.85c-.5-.25-.84-.76-.84-1.35Z" />
                <path fill="#00D26A" d="M6.05 2.66l10.76 6.22-2.27 2.27L6.05 2.66Z" />
                <path fill="#FF3A44" d="M16.81 15.12L6.05 21.34l8.49-8.49 2.27 2.27Z" />
                <path fill="#FFCE00" d="M20.16 10.81c.34.27.59.69.59 1.19 0 .5-.22.9-.57 1.18l-2.29 1.32-2.5-2.5 2.5-2.5 2.27 1.31Z" />
              </svg>
              <span className={styles.storeTxt}><small>Get it on</small><strong>Google Play</strong></span>
            </a>
          </div>
          <a
            className={styles.hint}
            href={EXTERNAL_URLS.yaysapp.home}
            target="_blank"
            rel="noopener noreferrer"
          >
            Prefer the browser? Visit the YaysApp website instead.
          </a>
          <div className={styles.ecosystem}>
            <h3>One ecosystem. More to explore.</h3>
            {products.map(product =>
              product.external ? (
                <a
                  key={product.name}
                  href={product.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.product}
                >
                  <div><h4>{product.name} <span>· {product.purpose}</span></h4><p>{product.description}</p></div>
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              ) : (
                <Link key={product.name} href={product.href} className={styles.product} onClick={closeIntro}>
                  <div><h4>{product.name} <span>· {product.purpose}</span></h4><p>{product.description}</p></div>
                  <ArrowUpRight size={18} aria-hidden="true" />
                </Link>
              ),
            )}
          </div>
          <div className={styles.actions}>
            <CustomButton2
              image={ArrowRightButtonImage}
              text="Continue exploring"
              onClick={closeIntro}
              ariaLabel="Continue exploring Bitcoin Yay"
              imageStyling="w-16 md:w-20"
            />
          </div>
        </div>
      </dialog>
    </section>
  );
}
