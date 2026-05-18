<script setup>
defineProps({
  data: { type: Object, required: true }
});
</script>

<template>
  <footer class="csl-footer">
    <div class="csl-footer-inner csl-container">
      <div class="csl-footer-brand">
        <img src="/assets/images/logo-white.png" alt="CyberspaceLab" />
        <p>
          Research group studying spatial cognition, virtual reality, and games
          at the intersection of psychology and neuroscience.
        </p>
      </div>

      <div class="csl-footer-col">
        <div class="csl-eyebrow">Follow</div>
        <a class="csl-footer-link" href="https://twitter.com/cyberspace_lab" rel="noopener noreferrer" target="_blank">Twitter / X</a>
        <a class="csl-footer-link" href="https://www.instagram.com/cyberspacelab" rel="noopener noreferrer" target="_blank">Instagram</a>
        <a class="csl-footer-link" href="https://www.linkedin.com/company/93281920" rel="noopener noreferrer" target="_blank">LinkedIn</a>
      </div>

      <div class="csl-footer-col">
        <div class="csl-eyebrow">Contact</div>
        <a class="csl-footer-link" href="mailto:research@cyberspacelab.cz">research@cyberspacelab.cz</a>
        <span class="csl-footer-link" style="color: var(--csl-fg-3); cursor: default; border: 0;">Kampus Hybernská, Praha</span>
      </div>
    </div>

    <div class="csl-footer-bottom csl-container">
      <span class="csl-footer-mono">© 2026 · CyberspaceLab · ALL RIGHTS RESERVED</span>
      <span class="csl-footer-mono" style="color: var(--csl-fg-3);">BUILT IN PRAGUE · WIRED IN NEON</span>
    </div>
  </footer>
</template>
