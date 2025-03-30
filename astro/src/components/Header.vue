<template>
  <header class="fixed w-full top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
    <div class="container mx-auto px-4">
      <nav class="flex items-center justify-between h-16">
        <a href="/" class="text-xl font-bold">
          {{ siteConfig.meta.title }}
        </a>
        
        <div class="hidden md:flex items-center space-x-8">
          <a v-for="item in menuItems" 
             :key="item.path" 
             :href="item.path"
             class="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
            {{ item.label }}
          </a>
        </div>

        <button @click="toggleMobileMenu" class="md:hidden">
          <span class="sr-only">Toggle menu</span>
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </nav>
    </div>

    <!-- Mobile menu -->
    <div v-if="isMobileMenuOpen" 
         class="md:hidden absolute top-16 inset-x-0 bg-white dark:bg-gray-900 shadow-lg">
      <div class="px-4 py-2 space-y-2">
        <a v-for="item in menuItems" 
           :key="item.path" 
           :href="item.path"
           class="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary"
           @click="isMobileMenuOpen = false">
          {{ item.label }}
        </a>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import siteConfig from '../config'

const menuItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Projects', path: '/projects' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' }
]

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<style scoped>
/* Any additional styles */
</style> 