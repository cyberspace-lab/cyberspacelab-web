<script setup>
import { ref, onMounted } from 'vue';

const theme = ref('dark');
const mobileOpen = ref(false);

const navItems = [
  { href: '/',            label: 'Home' },
  { href: '/about',       label: 'About' },
  { href: '/team',        label: 'Team' },
  { href: '/project',     label: 'Projects' },
  { href: '/publication', label: 'Publications' },
  { href: '/contact',     label: 'Contact' },
];

function isActive(href) {
  if (typeof window === 'undefined') return false;
  const path = window.location.pathname;
  if (href === '/') return path === '/';
  return path.startsWith(href);
}

function applyTheme(t) {
  theme.value = t;
  document.documentElement.setAttribute('data-theme', t);
  try { localStorage.setItem('csl-theme', t); } catch(e) {}
}

onMounted(() => {
  const saved = localStorage.getItem('csl-theme');
  if (saved === 'light' || saved === 'dark') theme.value = saved;
  else theme.value = document.documentElement.getAttribute('data-theme') || 'dark';
});
</script>

<template>
  <header class="csl-header">
    <div class="csl-header-inner">

      <!-- Logo -->
      <a class="csl-logo-link" href="/">
        <img src="/assets/images/logo-white.png" alt="CyberspaceLab" height="32" />
      </a>

      <!-- Desktop nav links (hidden on mobile via CSS) -->
      <nav class="csl-desktop-nav">
        <ul class="csl-main-nav">
          <li v-for="item in navItems" :key="item.href">
            <a
              :href="item.href"
              class="csl-nav-link"
              :class="{ active: isActive(item.href) }"
            >{{ item.label }}</a>
          </li>
        </ul>
      </nav>

      <!-- Right cluster: theme toggle + hamburger -->
      <div class="csl-header-right">
        <div class="csl-theme-toggle" role="group" aria-label="Theme">
          <button
            :class="{ active: theme === 'dark' }"
            @click="applyTheme('dark')"
            :aria-pressed="theme === 'dark'"
            title="Dark — neon"
          >◐</button>
          <button
            :class="{ active: theme === 'light' }"
            @click="applyTheme('light')"
            :aria-pressed="theme === 'light'"
            title="Light — paper"
          >◑</button>
        </div>

        <button
          class="csl-mobile-toggle"
          @click="mobileOpen = !mobileOpen"
          :aria-expanded="mobileOpen"
          aria-label="Toggle navigation"
        >
          <span :class="{ open: mobileOpen }"></span>
          <span :class="{ open: mobileOpen }"></span>
          <span :class="{ open: mobileOpen }"></span>
        </button>
      </div>

    </div>

    <!-- Mobile nav drawer (vertical, below header bar) -->
    <nav class="csl-mobile-nav" :class="{ open: mobileOpen }" aria-hidden="!mobileOpen">
      <ul>
        <li v-for="item in navItems" :key="item.href">
          <a
            :href="item.href"
            class="csl-nav-link"
            :class="{ active: isActive(item.href) }"
            @click="mobileOpen = false"
          >{{ item.label }}</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
/* ── Right cluster ─────────────────────────────────────────── */
.csl-header-right {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: auto;
  flex-shrink: 0;
}

/* Desktop nav: push to right of logo, left of right cluster */
.csl-desktop-nav {
  margin-left: auto;
}

/* Hamburger: hidden on desktop */
.csl-mobile-toggle {
  display: none;
}

/* Mobile nav drawer: hidden by default */
.csl-mobile-nav {
  display: none;
  flex-direction: column;
  overflow: hidden;
  max-height: 0;
  transition: max-height 300ms cubic-bezier(.2,.7,.2,1);
  border-top: 1px solid var(--csl-line);
  background: rgba(5,1,15,0.97);
  backdrop-filter: blur(18px);
}
[data-theme="light"] .csl-mobile-nav {
  background: rgba(251,250,255,0.97);
}

.csl-mobile-nav.open {
  max-height: 400px;
}

.csl-mobile-nav ul {
  list-style: none;
  margin: 0;
  padding: 12px 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 0;
}
.csl-mobile-nav li {
  border-bottom: 1px solid var(--csl-line);
}
.csl-mobile-nav li:last-child {
  border-bottom: none;
}
.csl-mobile-nav .csl-nav-link {
  display: block;
  padding: 14px 0;
  font-size: 14px;
  width: 100%;
}

/* ── Breakpoint: show mobile UI ────────────────────────────── */
@media (max-width: 860px) {
  .csl-desktop-nav { display: none; }
  .csl-mobile-toggle { display: flex; }
  .csl-mobile-nav { display: flex; }
  .csl-header-right { margin-left: auto; }

  /* Animate hamburger spans into X when open */
  .csl-mobile-toggle span {
    display: block;
    width: 22px;
    height: 2px;
    background: var(--csl-fg-1);
    transition: transform 220ms ease, opacity 220ms ease;
    transform-origin: center;
  }
  .csl-mobile-toggle span.open:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .csl-mobile-toggle span.open:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .csl-mobile-toggle span.open:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
}
</style>
