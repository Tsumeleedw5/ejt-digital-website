import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from "framer-motion";
import emailjs from "@emailjs/browser";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

import logoIcon from "@assets/02_icon_black_1776423555542.png";
import ejtLogoOfficial from "@assets/Desktop_-_11_1777037625444.png";
import mukotiLogo from "@assets/mcs-logo-transparent_(1)_1777037253028.png";
import mahlubiLogo from "@assets/10_Wordmark_Full_Text_NO_bg_1777037290131.png";
import heroBg from "@/assets/hero-bg.png";
import serviceWebsites from "@assets/ChatGPT_Image_May_5,_2026,_06_23_26_PM_1778004803575.png";
import serviceSocial from "@/assets/service-social.png";
import serviceBrand from "@/assets/service-brand.png";
import serviceAds from "@/assets/service-ads.png";
import processBg from "@/assets/process-bg.png";
import aboutBg from "@assets/ChatGPT_Image_May_4,_2026,_06_07_07_PM_1778005199715.png";
import packagesBg from "@assets/ChatGPT_Image_May_4,_2026,_12_16_57_PM_1778005227341.png";
import faqBg from "@assets/ChatGPT_Image_May_4,_2026,_04_12_50_PM_1778005210362.png";

const EJT_SVG = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="18" y1="22" x2="52" y2="22" stroke="#F4F4F2" strokeWidth="2.2"/>
    <line x1="18" y1="22" x2="18" y2="78" stroke="#F4F4F2" strokeWidth="2.2"/>
    <line x1="18" y1="50" x2="46" y2="50" stroke="#F4F4F2" strokeWidth="2.2"/>
    <line x1="18" y1="78" x2="52" y2="78" stroke="#F4F4F2" strokeWidth="2.2"/>
    <path d="M52 22 L52 68 Q52 78 42 78" stroke="#F4F4F2" strokeWidth="2.2" fill="none"/>
    <line x1="12" y1="50" x2="88" y2="50" stroke="#F4F4F2" strokeWidth="2.2"/>
    <line x1="58" y1="22" x2="82" y2="22" stroke="#F4F4F2" strokeWidth="2.2"/>
    <line x1="70" y1="22" x2="70" y2="82" stroke="#F4F4F2" strokeWidth="2.2"/>
  </svg>
);

const HERO_MARK_SVG = () => (
  <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <line x1="90" y1="110" x2="265" y2="110" stroke="#F4F4F2" strokeWidth="5"/>
    <line x1="90" y1="110" x2="90" y2="390" stroke="#F4F4F2" strokeWidth="5"/>
    <line x1="90" y1="250" x2="220" y2="250" stroke="#F4F4F2" strokeWidth="5"/>
    <line x1="90" y1="390" x2="265" y2="390" stroke="#F4F4F2" strokeWidth="5"/>
    <path d="M265 110 L265 350 Q265 390 225 390" stroke="#F4F4F2" strokeWidth="5" fill="none"/>
    <line x1="60" y1="250" x2="440" y2="250" stroke="#F4F4F2" strokeWidth="5"/>
    <line x1="295" y1="110" x2="410" y2="110" stroke="#F4F4F2" strokeWidth="5"/>
    <line x1="352" y1="110" x2="352" y2="410" stroke="#F4F4F2" strokeWidth="5"/>
  </svg>
);

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  businessName: z.string().optional(),
  service: z.enum(["websites", "social-media", "brand-strategy", "ads", "other"]).optional(),
  message: z.string().min(5, "Message is required"),
});

const EASE = [0.16, 1, 0.3, 1] as const;
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
} as const;
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
} as const;
const fadeLeft = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE } },
} as const;

export default function Home() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.18], [1, 0.96]);
  const markY = useTransform(scrollYProgress, [0, 0.2], [0, 60]);

  // Parallax refs
  const aboutRef = useRef<HTMLElement>(null);
  const faqRef = useRef<HTMLElement>(null);
  const { scrollYProgress: aboutScroll } = useScroll({ target: aboutRef, offset: ["start end", "end start"] });
  const { scrollYProgress: faqScroll } = useScroll({ target: faqRef, offset: ["start end", "end start"] });
  const aboutBgY = useTransform(aboutScroll, [0, 1], ["-12%", "12%"]);
  const faqBgY = useTransform(faqScroll, [0, 1], ["-12%", "12%"]);

  // Scroll progress bar
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: '#111111', color: '#F4F4F2', fontFamily: "'Montserrat', sans-serif" }}>
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX, transformOrigin: 'left', position: 'fixed', top: 0, left: 0, right: 0, height: 2, background: 'rgba(244,244,242,0.55)', zIndex: 1000 }}
      />
      <Navbar />

      {/* ── HERO ── */}
      <section id="hero" className="relative h-screen min-h-[680px] flex items-center overflow-hidden">
        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 z-10" style={{ background: 'rgba(17,17,17,0.62)' }} />
          <img src={heroBg} alt="background" className="w-full h-full object-cover object-center" />
        </motion.div>

        {/* Large EJT mark watermark */}
        <motion.div
          className="absolute right-[-6%] bottom-[-8%] z-0 pointer-events-none"
          style={{ width: 'clamp(380px, 58vw, 820px)', opacity: 0.11, y: markY }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 0.11, y: 0 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          <HERO_MARK_SVG />
        </motion.div>

        <div className="relative z-10 w-full px-6 pt-20 flex justify-center">
          <div className="max-w-[720px] text-center flex flex-col items-center">
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
              className="flex items-center justify-center gap-3 mb-7"
              style={{ fontSize: '0.6rem', letterSpacing: '0.34em', textTransform: 'uppercase', color: '#9A9A9A' }}
            >
              <motion.span
                initial={{ width: 0 }} animate={{ width: 28 }}
                transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: 'block', height: 1, background: '#9A9A9A', flexShrink: 0 }}
              />
              Etched into reality
              <motion.span
                initial={{ width: 0 }} animate={{ width: 28 }}
                transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: 'block', height: 1, background: '#9A9A9A', flexShrink: 0 }}
              />
            </motion.p>
            <div style={{ fontFamily: "'Advent Pro', sans-serif", fontWeight: 600, fontSize: 'clamp(2.6rem, 5.2vw, 4.6rem)', lineHeight: 1.08, color: '#F4F4F2', marginBottom: 26, letterSpacing: '0.01em', textTransform: 'uppercase', overflow: 'hidden' }}>
              <motion.div initial={{ y: '110%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.85 }}>
                Make Your Business
              </motion.div>
              <motion.div initial={{ y: '110%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 1.0 }} style={{ fontWeight: 300, color: '#9A9A9A' }}>
                Impossible To
              </motion.div>
              <motion.div initial={{ y: '110%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 1.15 }}>
                Ignore Online.
              </motion.div>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 1.35 }}
              style={{ fontSize: '0.82rem', lineHeight: 1.85, fontWeight: 300, color: '#9A9A9A', marginBottom: 44, maxWidth: 520 }}
            >
              We build the websites, social media, and digital systems that help local businesses look professional, get found, and attract more clients — so you can focus on what you do best.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 1.5 }}
              className="flex gap-4 flex-wrap justify-center"
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 30px', background: '#F4F4F2', color: '#111111', fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, textDecoration: 'none' }}
              >
                Get a Free Consultation
              </motion.a>
              <motion.a
                href="#packages"
                whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 30px', background: '#F4F4F2', color: '#111111', fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, textDecoration: 'none' }}
              >
                See Our Packages
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width={13} height={13}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </motion.a>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="absolute bottom-9 left-[52px] flex items-center gap-3"
        >
          <span style={{ fontSize: '0.58rem', letterSpacing: '0.26em', textTransform: 'uppercase', color: '#3A3A3A' }}>Scroll</span>
          <div style={{ width: 40, height: 1, background: 'linear-gradient(to right, #3A3A3A, transparent)' }} />
        </motion.div>
      </section>

      {/* ── CLIENTS ── */}
      <section id="clients" style={{ background: '#0d0d0d', borderTop: '1px solid rgba(244,244,242,0.05)', borderBottom: '1px solid rgba(244,244,242,0.05)', padding: '40px 0' }}>
        <motion.div
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
          style={{ maxWidth: 1200, margin: '0 auto', padding: '0 52px', display: 'flex', alignItems: 'center', gap: 60, flexWrap: 'wrap' }}
        >
          <motion.span variants={fadeLeft} style={{ fontSize: '0.56rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#3A3A3A', whiteSpace: 'nowrap', flexShrink: 0 }}>Brands We've Worked With</motion.span>
          <motion.div variants={fadeLeft} style={{ width: 1, height: 32, background: 'rgba(244,244,242,0.08)', flexShrink: 0 }} />
          <div className="flex items-center gap-14 flex-wrap">
            {[
              { name: 'Mukoti Cleaning Services', img: mukotiLogo, href: 'https://mukoticleaning.co.za/', height: 64 },
              { name: 'Mahlubi Hut Designs', img: mahlubiLogo, href: 'https://unrivaled-sorbet-a8bb11.netlify.app/', height: 32 },
            ].map((c) => (
              <motion.a
                key={c.name}
                variants={fadeUp}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={c.name}
                whileHover={{ opacity: 1, filter: 'grayscale(0) brightness(1)', y: -3 }}
                style={{ display: 'inline-block', opacity: 0.55, filter: 'grayscale(1) brightness(1.1)' }}
              >
                <img src={c.img} alt={c.name} style={{ display: 'block', height: c.height, width: 'auto', maxWidth: 220, objectFit: 'contain' }} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── ABOUT ── */}
      <section ref={aboutRef} id="about" style={{ position: 'relative', padding: '130px 0', overflow: 'hidden' }}>
        {/* Parallax background */}
        <div className="absolute inset-0 z-0" style={{ overflow: 'hidden' }}>
          <motion.img src={aboutBg} alt="" style={{ y: aboutBgY, width: '100%', height: '120%', top: '-10%', position: 'absolute', objectFit: 'cover', objectPosition: 'center', filter: 'grayscale(0.3)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(17,17,17,0.97) 0%, rgba(17,17,17,0.88) 50%, rgba(17,17,17,0.55) 100%)' }} />
        </div>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 52px', position: 'relative', zIndex: 1 }}>
          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-16 md:gap-20 items-start">
            <motion.div
              variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div variants={fadeUp} style={{ width: 72, marginBottom: 32, opacity: 0.6 }}>
                <img src={logoIcon} alt="EJT Digital" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
              </motion.div>
              <motion.p variants={fadeLeft} style={{ fontSize: '0.58rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: '#3A3A3A' }}>Who We Are</motion.p>
            </motion.div>
            <motion.div
              variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
              style={{ borderTop: '1px solid rgba(244,244,242,0.08)', paddingTop: 36 }}
            >
              <motion.h2
                variants={fadeUp}
                style={{ fontFamily: "'Advent Pro', sans-serif", fontWeight: 600, fontSize: 'clamp(2rem, 3.8vw, 3rem)', lineHeight: 1.15, color: '#F4F4F2', marginBottom: 32, textTransform: 'uppercase', letterSpacing: '0.01em' }}
              >
                Your business is<br />great at what it does.<br /><span style={{ fontWeight: 300, color: '#9A9A9A' }}>We make sure people<br />know about it.</span>
              </motion.h2>
              <motion.p
                variants={fadeUp}
                style={{ fontSize: '0.88rem', lineHeight: 1.9, fontWeight: 300, color: '#9A9A9A', maxWidth: 520 }}
              >
                EJT Digital is a Johannesburg-based agency that helps service businesses — cleaning companies, security firms, salons, restaurants, and tradespeople — build a professional online presence that actually brings in clients. We handle the websites, social media, and digital strategy so you don't have to.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={{ padding: '130px 0', position: 'relative', overflow: 'hidden' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, #3a3a3a 0%, #2a2a2a 50%, #1a1a1a 100%)' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 52px', position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="flex justify-between items-end flex-wrap gap-4"
            style={{ borderBottom: '1px solid rgba(244,244,242,0.1)', paddingBottom: 28, marginBottom: 0 }}
          >
            <h2 style={{ fontFamily: "'Advent Pro', sans-serif", fontWeight: 600, fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#F4F4F2', textTransform: 'uppercase', letterSpacing: '0.04em' }}>What We Do</h2>
            <span style={{ fontSize: '0.58rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#9A9A9A' }}>04 Core Services</span>
          </motion.div>
          <motion.div
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2"
          >
            {[
              {
                num: '01', delay: 0.1, img: serviceWebsites,
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="#9A9A9A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" width={22} height={22}><rect x="2" y="3" width="20" height="14" rx="1"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/><polyline points="7 10 10 7 13 10 17 7"/></svg>,
                name: 'Websites That Work For You',
                desc: 'Not just a page — a professional online home that shows up on Google, builds trust with visitors, and turns them into paying clients. Mobile-ready, fast, and designed to generate enquiries.',
              },
              {
                num: '02', delay: 0.22, img: serviceSocial,
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="#9A9A9A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" width={22} height={22}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
                name: 'Social Media That Builds Authority',
                desc: 'Consistent, professional content that positions you as the go-to business in your area. We handle strategy, graphics, captions, and scheduling — so you can focus on your work.',
              },
              {
                num: '03', delay: 0.1, img: serviceBrand,
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="#9A9A9A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" width={22} height={22}><polygon points="12 2 22 8.5 12 22 2 8.5"/><line x1="2" y1="8.5" x2="22" y2="8.5"/><polyline points="7 2 9.5 8.5 12 2 14.5 8.5 17 2"/></svg>,
                name: 'Brand Strategy & Identity',
                desc: 'We design how your business looks, speaks, and shows up everywhere — from your logo and colours to how you present yourself on every platform. So clients trust you before they even call.',
              },
              {
                num: '04', delay: 0.22, img: serviceAds,
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="#9A9A9A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" width={22} height={22}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="#9A9A9A"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/></svg>,
                name: 'Ads & Client Acquisition',
                desc: 'Targeted Meta ads and follow-up systems that keep your phone ringing with new enquiries. We set up campaigns, manage the spend, and track results so every rand works harder.',
              },
            ].map((s, i) => (
              <motion.div
                key={s.num}
                variants={fadeUp}
                whileHover={{ backgroundColor: 'rgba(244,244,242,0.02)' }}
                className="group"
                style={{
                  padding: i % 2 === 0 ? '48px 48px 48px 0' : '48px 0 48px 48px',
                  borderBottom: '1px solid rgba(244,244,242,0.07)',
                  borderRight: i % 2 === 0 ? '1px solid rgba(244,244,242,0.07)' : 'none',
                  cursor: 'default',
                }}
              >
                <div className="overflow-hidden mb-6 relative" style={{ aspectRatio: '4/3' }}>
                  <img
                    src={s.img}
                    alt={s.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 transition-colors duration-700 group-hover:opacity-0" style={{ background: 'rgba(0,0,0,0.2)' }} />
                </div>
                <div className="flex items-center gap-4 mb-5">
                  <motion.div
                    whileHover={{ borderColor: 'rgba(244,244,242,0.4)', scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    style={{ width: 50, height: 50, flexShrink: 0, border: '1px solid rgba(244,244,242,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    {s.icon}
                  </motion.div>
                  <span style={{ fontSize: '0.55rem', letterSpacing: '0.15em', color: 'rgba(244,244,242,0.15)', fontWeight: 300 }}>{s.num}</span>
                </div>
                <h3 style={{ fontFamily: "'Advent Pro', sans-serif", fontWeight: 500, fontSize: '1.4rem', color: '#F4F4F2', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.03em', lineHeight: 1.2 }}>{s.name}</h3>
                <p style={{ fontSize: '0.8rem', lineHeight: 1.8, fontWeight: 300, color: '#9A9A9A' }}>{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PACKAGES ── */}
      <section id="packages" style={{ position: 'relative', padding: '130px 0', borderTop: '1px solid rgba(244,244,242,0.05)', overflow: 'hidden' }}>
        <div className="absolute inset-0 z-0">
          <img src={packagesBg} alt="" className="w-full h-full object-cover object-center" style={{ filter: 'grayscale(0.5)' }} />
          <div className="absolute inset-0" style={{ background: 'rgba(17,17,17,0.88)' }} />
        </div>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 52px', position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="flex justify-between items-end flex-wrap gap-4"
            style={{ borderBottom: '1px solid rgba(244,244,242,0.1)', paddingBottom: 28, marginBottom: 48 }}
          >
            <h2 style={{ fontFamily: "'Advent Pro', sans-serif", fontWeight: 600, fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#F4F4F2', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Website Packages</h2>
            <p style={{ fontSize: '0.8rem', fontWeight: 300, color: '#9A9A9A', maxWidth: 400, textAlign: 'right', lineHeight: 1.7 }}>Every business deserves a professional website. Choose the level that fits where you are right now.</p>
          </motion.div>
          <motion.div
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                name: 'Presence', featured: false, delay: 0.1,
                tagline: 'For businesses that need to exist online and look professional. Nothing more, nothing less.',
                delivery: '1–2 week delivery',
                features: ['3-page website (Home, About, Contact)', 'Mobile responsive design', 'Contact form with WhatsApp integration', 'Brand colours and fonts applied', 'Basic on-page SEO setup', 'Google Maps embed', '30 days post-launch support'],
                waText: "Hi EJT Digital, I'm interested in the Presence website package. Let's talk.",
              },
              {
                name: 'Professional', featured: true, delay: 0.22,
                tagline: 'A complete digital home. Designed to generate enquiries, not just exist. The standard for a serious SA business.',
                delivery: '2–3 week delivery',
                features: ['5-page custom website', 'Mobile + tablet responsive', 'Contact form + WhatsApp chat button', 'Full on-page SEO (titles, meta, structure)', 'Google Analytics 4 setup', 'Google Business Profile integration', 'Social media links + feeds', 'Speed optimisation', '30 days post-launch support'],
                waText: "Hi EJT Digital, I'm interested in the Professional website package. Let's talk.",
              },
              {
                name: 'Authority', featured: false, delay: 0.34,
                tagline: 'A full-scale digital asset. Built to rank on Google, convert visitors into leads, and position you as the leader.',
                delivery: '3–5 week delivery',
                features: ['7–10 page custom website', 'Full brand integration or creation', 'Advanced animations & interactions', 'Full SEO — on-page, technical, sitemap', 'Google Analytics 4 + Search Console', 'Blog / news section', 'Testimonials & case study pages', 'WhatsApp + contact + booking integration', '60 days post-launch support'],
                waText: "Hi EJT Digital, I'm interested in the Authority website package. Let's talk.",
              },
            ].map((pkg) => (
              <motion.div
                key={pkg.name}
                variants={fadeUp}
                whileHover={{ y: -6, borderColor: 'rgba(244,244,242,0.35)', boxShadow: '0 16px 48px rgba(0,0,0,0.35)' }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                style={{ border: `1px solid ${pkg.featured ? 'rgba(244,244,242,0.2)' : 'rgba(244,244,242,0.08)'}`, padding: '40px 32px', position: 'relative', background: 'rgba(17,17,17,0.5)' }}
              >
                {pkg.featured && (
                  <div style={{ position: 'absolute', top: -1, right: 32, background: '#F4F4F2', color: '#111111', fontSize: '0.52rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, padding: '6px 14px' }}>Most Popular</div>
                )}
                <div style={{ fontFamily: "'Advent Pro', sans-serif", fontWeight: 600, fontSize: '1.5rem', color: '#F4F4F2', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{pkg.name}</div>
                <p style={{ fontSize: '0.72rem', color: '#9A9A9A', fontWeight: 300, marginBottom: 28, lineHeight: 1.6 }}>{pkg.tagline}</p>
                <p style={{ fontSize: '0.65rem', color: '#3A3A3A', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 20 }}>{pkg.delivery}</p>
                <ul style={{ listStyle: 'none', marginBottom: 32 }}>
                  {pkg.features.map((f) => (
                    <li key={f} style={{ fontSize: '0.76rem', color: '#9A9A9A', fontWeight: 300, padding: '8px 0', borderBottom: '1px solid rgba(244,244,242,0.04)', display: 'flex', alignItems: 'flex-start', gap: 10, lineHeight: 1.6 }}>
                      <span style={{ color: 'rgba(244,244,242,0.4)', fontSize: '0.7rem', flexShrink: 0, marginTop: 1 }}>—</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={`https://wa.me/27670070229?text=${encodeURIComponent(pkg.waText)}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'block', textAlign: 'center', padding: '14px 28px',
                    border: '1px solid #F4F4F2',
                    background: '#F4F4F2',
                    color: '#111111',
                    fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  Work With Us
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" style={{ position: 'relative', padding: '130px 0', overflow: 'hidden' }}>
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 z-10" style={{ background: 'rgba(17,17,17,0.82)' }} />
          <img src={processBg} alt="Process" className="w-full h-full object-cover" style={{ filter: 'grayscale(1)', opacity: 0.3 }} />
        </div>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 52px', position: 'relative', zIndex: 1 }}>
          <div className="flex justify-between items-end flex-wrap gap-4" style={{ marginBottom: 0 }}>
            <p style={{ fontSize: '0.58rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: '#3A3A3A' }}>How It Works</p>
            <h2 style={{ fontFamily: "'Advent Pro', sans-serif", fontWeight: 600, fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#F4F4F2', textTransform: 'uppercase', letterSpacing: '0.04em' }}>The Process</h2>
          </div>
          <motion.div
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col md:flex-row"
            style={{ borderTop: '1px solid rgba(244,244,242,0.08)', marginTop: 48 }}
          >
            {[
              { n: '01', title: 'Audit', desc: 'We look at your current online presence — website, socials, Google visibility — and give you an honest assessment of what\'s working and what\'s costing you clients.' },
              { n: '02', title: 'Plan', desc: 'We build a clear roadmap based on your budget, your business goals, and where you\'ll get the biggest return. No guesswork — just a strategy tailored to you.' },
              { n: '03', title: 'Build', desc: 'We design, develop, and launch. Everything is polished, tested on mobile, and ready to represent your business before it goes live.' },
              { n: '04', title: 'Grow', desc: 'With your systems running, we track performance, optimise what\'s working, and keep your online presence consistently generating results month after month.' },
            ].map((step, i) => (
              <motion.div
                key={step.n}
                variants={fadeUp}
                whileHover={{ backgroundColor: 'rgba(244,244,242,0.025)' }}
                className="group flex-1"
                style={{
                  padding: i === 0 ? '40px 32px 40px 0' : i === 3 ? '40px 0 40px 32px' : '40px 32px',
                  borderRight: i < 3 ? '1px solid rgba(244,244,242,0.07)' : 'none',
                  transition: 'background 0.4s',
                }}
              >
                <motion.div
                  initial={{ opacity: 0.05 }}
                  whileInView={{ opacity: 0.05 }}
                  whileHover={{ opacity: 0.14 }}
                  transition={{ duration: 0.4 }}
                  style={{ fontFamily: "'Advent Pro', sans-serif", fontWeight: 300, fontSize: '3.8rem', lineHeight: 1, marginBottom: 20, color: 'rgba(244,244,242,1)' }}
                >
                  {step.n}
                </motion.div>
                <motion.p
                  initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 + 0.3 }}
                  style={{ fontSize: '0.62rem', letterSpacing: '0.26em', textTransform: 'uppercase', color: '#F4F4F2', marginBottom: 14 }}
                >{step.title}</motion.p>
                <p style={{ fontSize: '0.8rem', lineHeight: 1.85, fontWeight: 300, color: '#9A9A9A' }}>{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section ref={faqRef} id="faq" style={{ position: 'relative', borderTop: '1px solid rgba(244,244,242,0.05)', padding: '130px 0', overflow: 'hidden' }}>
        <div className="absolute inset-0 z-0" style={{ overflow: 'hidden' }}>
          <motion.img src={faqBg} alt="" style={{ y: faqBgY, width: '100%', height: '120%', top: '-10%', position: 'absolute', objectFit: 'cover', objectPosition: 'center', filter: 'grayscale(0.4)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(13,13,13,0.92) 0%, rgba(13,13,13,0.85) 50%, rgba(13,13,13,0.92) 100%)' }} />
        </div>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 52px', position: 'relative', zIndex: 1 }}>
          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-16 md:gap-20 items-start">
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
              <motion.p variants={fadeLeft} style={{ fontSize: '0.58rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: '#3A3A3A', marginBottom: 16 }}>Common Questions</motion.p>
              <motion.h2 variants={fadeUp} style={{ fontFamily: "'Advent Pro', sans-serif", fontWeight: 600, fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: '#F4F4F2', lineHeight: 1.15, textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                What you need<br /><span style={{ fontWeight: 300, color: '#9A9A9A' }}>to know</span>
              </motion.h2>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.15 }}>
              <FAQList />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ position: 'relative', overflow: 'hidden', padding: '150px 0', background: 'linear-gradient(150deg, #1a1a1a 0%, #252525 30%, #3a3a3a 60%, #9A9A9A 100%)' }}>
        <div className="absolute pointer-events-none" style={{ right: '5%', top: '50%', transform: 'translateY(-50%)', width: 'clamp(220px, 30vw, 420px)', opacity: 0.06 }}>
          <HERO_MARK_SVG />
        </div>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 52px', position: 'relative', zIndex: 10 }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <motion.div
              variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
            >
              <motion.p variants={fadeLeft} className="flex items-center gap-3 mb-6" style={{ fontSize: '0.6rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: '#9A9A9A' }}>
                <motion.span initial={{ width: 0 }} whileInView={{ width: 28 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }} style={{ display: 'block', height: 1, background: '#9A9A9A' }} />
                Let's Build
              </motion.p>
              <motion.h2 variants={fadeUp} style={{ fontFamily: "'Advent Pro', sans-serif", fontWeight: 700, fontSize: 'clamp(3.5rem, 9vw, 8rem)', lineHeight: 0.95, letterSpacing: '0.01em', color: '#F4F4F2', marginBottom: 20, textTransform: 'uppercase' }}>
                Ready to get<br />
                <span style={{ display: 'block', color: 'rgba(244,244,242,0.32)', fontWeight: 300 }}>etched in?</span>
              </motion.h2>
              <motion.p variants={fadeUp} style={{ fontSize: '0.8rem', lineHeight: 1.8, fontWeight: 300, color: '#9A9A9A', marginBottom: 44, maxWidth: 400 }}>
                Tell us about your business and we'll get back to you within 24 hours with a clear plan and quote.
              </motion.p>
              <motion.div variants={staggerContainer} className="space-y-6">
                {[
                  { label: 'Email', content: <a href="mailto:ejtdigital19@gmail.com" style={{ fontSize: '0.88rem', color: '#9A9A9A', textDecoration: 'none', borderBottom: '1px solid rgba(154,154,154,0.3)', paddingBottom: 2 }}>ejtdigital19@gmail.com</a> },
                  { label: 'Phone', content: <a href="tel:0670070229" style={{ fontSize: '0.88rem', color: '#9A9A9A', textDecoration: 'none' }}>067 007 0229</a> },
                  { label: 'Location', content: <p style={{ fontSize: '0.88rem', color: '#9A9A9A', margin: 0 }}>Johannesburg, South Africa</p> },
                ].map(({ label, content }) => (
                  <motion.div key={label} variants={fadeUp}>
                    <p style={{ fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#3A3A3A', marginBottom: 6 }}>{label}</p>
                    {content}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}>
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <motion.footer
        initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
        style={{ background: '#0a0a0a', padding: '32px 52px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(244,244,242,0.06)', flexWrap: 'wrap', gap: 16 }}
      >
        <div className="flex items-center gap-3">
          <div style={{ width: 22, height: 22, opacity: 0.5 }}><EJT_SVG /></div>
          <span style={{ fontSize: '0.6rem', letterSpacing: '0.28em', color: '#3A3A3A', textTransform: 'uppercase' }}>E J T &nbsp; D I G I T A L</span>
        </div>
        <small style={{ fontSize: '0.58rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2a2a2a' }}>© 2026 EJT Digital — Etched Into Reality</small>
      </motion.footer>
    </div>
  );
}

function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  React.useEffect(() => {
    const unsub = scrollY.on("change", (latest) => setIsScrolled(latest > 60));
    return unsub;
  }, [scrollY]);

  return (
    <>
      <nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: isScrolled ? '16px 52px' : '24px 52px',
          background: isScrolled ? 'rgba(17,17,17,0.96)' : 'transparent',
          borderBottom: isScrolled ? '1px solid rgba(244,244,242,0.06)' : '1px solid transparent',
          transition: 'all 0.4s',
        }}
      >
        {/* Logo */}
        <a href="#hero" style={{ display: 'flex', alignItems: 'center', gap: 14, textDecoration: 'none' }}>
          <img src={ejtLogoOfficial} alt="EJT Digital" style={{ width: 90, height: 90, objectFit: 'contain', display: 'block' }} />
          <div style={{ width: 1, height: 40, background: 'rgba(244,244,242,0.18)' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <span style={{ fontFamily: "'Advent Pro', sans-serif", fontWeight: 700, fontSize: '1.25rem', letterSpacing: '0.28em', color: '#F4F4F2', textTransform: 'uppercase', lineHeight: 1 }}>E J T</span>
            <span style={{ fontFamily: "'Advent Pro', sans-serif", fontWeight: 300, fontSize: '0.78rem', letterSpacing: '0.34em', color: '#9A9A9A', textTransform: 'uppercase', lineHeight: 1, marginTop: 5 }}>D I G I T A L</span>
          </div>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center" style={{ listStyle: 'none', gap: 36 }}>
          {['About', 'Services', 'Packages', 'Process', 'FAQ', 'Contact'].map((l) => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`} style={{ fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#9A9A9A', textDecoration: 'none', transition: 'color 0.3s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#F4F4F2')}
                onMouseLeave={e => (e.currentTarget.style.color = '#9A9A9A')}
              >{l}</a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a href="#contact" className="hidden md:inline-flex items-center gap-2"
          style={{ padding: '9px 22px', background: 'transparent', border: '1px solid rgba(244,244,242,0.3)', color: '#F4F4F2', fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', textDecoration: 'none', transition: 'all 0.3s' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(244,244,242,0.08)'; e.currentTarget.style.borderColor = 'rgba(244,244,242,0.6)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(244,244,242,0.3)'; }}
        >
          Let's Talk
        </a>

        {/* Mobile hamburger */}
        <button className="md:hidden flex flex-col gap-[5px] bg-transparent border-0 cursor-pointer p-1" onClick={() => setDrawerOpen(!drawerOpen)}>
          <span style={{ display: 'block', width: 22, height: 1, background: '#F4F4F2', transition: 'transform 0.3s', transform: drawerOpen ? 'translateY(6px) rotate(45deg)' : 'none' }} />
          <span style={{ display: 'block', width: 22, height: 1, background: '#F4F4F2', transition: 'opacity 0.3s', opacity: drawerOpen ? 0 : 1 }} />
          <span style={{ display: 'block', width: 22, height: 1, background: '#F4F4F2', transition: 'transform 0.3s', transform: drawerOpen ? 'translateY(-6px) rotate(-45deg)' : 'none' }} />
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, zIndex: 400, background: 'rgba(17,17,17,0.98)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 36 }}
          >
            {['About', 'Services', 'Packages', 'Process', 'FAQ', 'Contact'].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setDrawerOpen(false)}
                style={{ fontFamily: "'Advent Pro', sans-serif", fontSize: '2.4rem', fontWeight: 500, color: '#F4F4F2', textDecoration: 'none', letterSpacing: '0.06em', textTransform: 'uppercase' }}
              >{l}</a>
            ))}
            <a href="#contact" onClick={() => setDrawerOpen(false)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 32px', border: '1px solid rgba(244,244,242,0.3)', color: '#F4F4F2', fontFamily: "'Montserrat', sans-serif", fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', marginTop: 12, textDecoration: 'none' }}
            >
              Let's Talk
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function FAQList() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = [
    { q: 'I already have a Facebook page. Do I still need a website?', a: "A Facebook page is a start, but it's not yours — the algorithm controls who sees your posts. A website is your own space on the internet. It shows up on Google when people search for your services, it looks professional, and it works 24/7 to bring in enquiries even while you sleep." },
    { q: 'How much does it cost?', a: "It depends on what your business needs. We have packages starting from basic 3-page websites up to full 10-page digital platforms with SEO and analytics. Send us a message and we'll give you a clear quote within 24 hours — no pressure, no obligation." },
    { q: 'How long does it take to get my website live?', a: "Most websites go live within 1–3 weeks depending on the package. Once we've had an initial conversation and you've confirmed, we move fast. The sooner you start, the sooner your business is working online." },
    { q: 'Do I need to provide content and images?', a: "It helps if you have photos of your work, but it's not required. We can guide you on what to photograph, write all the copy for you, and source professional images where needed. We handle everything so you don't have to stress about it." },
    { q: 'What happens after the website is built?', a: "Every website comes with post-launch support (30–60 days depending on your package). After that, we offer optional monthly maintenance plans to keep your site updated, secure, and performing well. We also offer social media management and ads if you want to grow further." },
    { q: 'Do you work with businesses outside of Johannesburg?', a: "Yes. While we're based in Johannesburg, we work with clients across South Africa remotely. Everything we do can be managed digitally, so location is rarely a limitation." },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {faqs.map((faq, i) => (
        <div key={i} style={{ borderBottom: '1px solid rgba(244,244,242,0.08)' }}>
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left', padding: '24px 0', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20, color: '#F4F4F2', fontFamily: "'Montserrat', sans-serif", fontSize: '0.82rem', fontWeight: 400, letterSpacing: '0.02em' }}
          >
            {faq.q}
            <div style={{ width: 18, height: 18, flexShrink: 0, border: '1px solid rgba(244,244,242,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.4s', transform: openIndex === i ? 'rotate(45deg)' : 'none', fontSize: '0.75rem', color: '#9A9A9A' }}>+</div>
          </button>
          <AnimatePresence>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{ overflow: 'hidden' }}
              >
                <p style={{ fontSize: '0.82rem', lineHeight: 1.85, fontWeight: 300, color: '#9A9A9A', paddingBottom: 24 }}>{faq.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

const EMAILJS_SERVICE_ID = "service_bcnwuj7";
const EMAILJS_TEMPLATE_ID = "template_vf7266v";
const EMAILJS_PUBLIC_KEY = "VRIKELfmjcT3IIgrt";

function ContactForm() {
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', phone: '', businessName: '', message: '' },
  });

  async function onSubmit(values: z.infer<typeof contactSchema>) {
    setIsSending(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: values.name,
          from_email: values.email,
          phone: values.phone ?? '',
          business_name: values.businessName ?? '',
          service: values.service ?? 'Not specified',
          message: values.message,
          reply_to: values.email,
        },
        EMAILJS_PUBLIC_KEY
      );
      toast({ title: "Message received.", description: "We'll get back to you within 24 hours." });
      form.reset();
    } catch {
      toast({ variant: "destructive", title: "Submission failed.", description: "Please try again or email us directly at ejtdigital19@gmail.com" });
    } finally {
      setIsSending(false);
    }
  }

  const inputStyle = { background: 'rgba(244,244,242,0.04)', border: '1px solid rgba(244,244,242,0.1)', color: '#F4F4F2', fontFamily: "'Montserrat', sans-serif", fontSize: '0.82rem', fontWeight: 300, borderRadius: 0, padding: '12px 16px', outline: 'none', width: '100%' };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} style={{ background: 'rgba(17,17,17,0.6)', border: '1px solid rgba(244,244,242,0.08)', padding: '40px 32px' }} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem>
              <FormLabel style={{ display: 'block', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9A9A9A', marginBottom: 8 }}>Your Name *</FormLabel>
              <FormControl><Input placeholder="e.g. Thabo Mokoena" style={inputStyle} className="rounded-none focus-visible:ring-0 focus-visible:border-[rgba(244,244,242,0.35)]" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="phone" render={({ field }) => (
            <FormItem>
              <FormLabel style={{ display: 'block', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9A9A9A', marginBottom: 8 }}>Phone Number</FormLabel>
              <FormControl><Input placeholder="e.g. 067 007 0229" style={inputStyle} className="rounded-none focus-visible:ring-0 focus-visible:border-[rgba(244,244,242,0.35)]" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <FormLabel style={{ display: 'block', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9A9A9A', marginBottom: 8 }}>Email Address *</FormLabel>
            <FormControl><Input type="email" placeholder="e.g. thabo@mybusiness.co.za" style={inputStyle} className="rounded-none focus-visible:ring-0 focus-visible:border-[rgba(244,244,242,0.35)]" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="businessName" render={({ field }) => (
          <FormItem>
            <FormLabel style={{ display: 'block', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9A9A9A', marginBottom: 8 }}>Business Name</FormLabel>
            <FormControl><Input placeholder="Your business name" style={inputStyle} className="rounded-none focus-visible:ring-0 focus-visible:border-[rgba(244,244,242,0.35)]" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="service" render={({ field }) => (
          <FormItem>
            <FormLabel style={{ display: 'block', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9A9A9A', marginBottom: 8 }}>Service Interested In</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger style={{ ...inputStyle, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} className="rounded-none focus:ring-0">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="rounded-none border-[rgba(244,244,242,0.1)] bg-[#1a1a1a]">
                <SelectItem value="websites">Websites</SelectItem>
                <SelectItem value="social-media">Social Media</SelectItem>
                <SelectItem value="brand-strategy">Brand Strategy</SelectItem>
                <SelectItem value="ads">Ads</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="message" render={({ field }) => (
          <FormItem>
            <FormLabel style={{ display: 'block', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9A9A9A', marginBottom: 8 }}>How Can We Help? *</FormLabel>
            <FormControl>
              <Textarea placeholder="Tell us what your business does and what you need..." style={{ ...inputStyle, resize: 'vertical', minHeight: 100 }} className="rounded-none focus-visible:ring-0 focus-visible:border-[rgba(244,244,242,0.35)]" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <button
          type="submit"
          disabled={isSending}
          style={{ width: '100%', padding: '15px 28px', background: '#F4F4F2', color: '#111111', border: 'none', fontFamily: "'Montserrat', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, cursor: isSending ? 'wait' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
        >
          {isSending ? <><Loader2 size={14} className="animate-spin" /> Sending...</> : 'Send Message'}
        </button>
        <p style={{ fontSize: '0.62rem', color: '#3A3A3A', textAlign: 'center', lineHeight: 1.6 }}>We respond within 24 hours.</p>
      </form>
    </Form>
  );
}
