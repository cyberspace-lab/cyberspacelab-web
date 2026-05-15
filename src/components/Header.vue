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
      <a class="csl-logo-link" href="/">
        <img src="/assets/images/logo-white.png" alt="CyberspaceLab" height="32" />
      </a>

      <!-- Desktop nav -->
      <nav>
        <ul class="csl-main-nav" :class="{ open: mobileOpen }">
          <li v-for="item in navItems" :key="item.href">
            <a
              :href="item.href"
              class="csl-nav-link"
              :class="{ active: isActive(item.href) }"
            >{{ item.label }}</a>
          </li>
        </ul>
      </nav>

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

      <!-- Mobile hamburger -->
      <button
        class="csl-mobile-toggle"
        @click="mobileOpen = !mobileOpen"
        :aria-expanded="mobileOpen"
        aria-label="Toggle navigation"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </header>
</template>
