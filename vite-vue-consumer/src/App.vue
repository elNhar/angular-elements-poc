<template>
  <main class="container">
    <h1>Vue + Vite consuming &lt;wc-carousel&gt;</h1>
    <p>Ensure producer server is running at <code>http://localhost:4000</code>.</p>

    <wc-carousel id="poke"></wc-carousel>

    <h2 style="margin-top: 2rem;">Consuming &lt;wc-articles&gt;</h2>
    <wc-articles id="articles"></wc-articles>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(async () => {
  const el = document.getElementById('poke') as any;
  if (!el) return;
  // Important: wait until the custom element is defined so that property setters are in place
  if (!customElements.get('wc-carousel')) {
    await customElements.whenDefined('wc-carousel');
  }
  el.images = [
    { src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png', alt: 'Bulbasaur' },
    { src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png', alt: 'Charmander' },
    { src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png', alt: 'Squirtle' },
    { src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png', alt: 'Pikachu' },
    { src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/39.png', alt: 'Jigglypuff' },
    { src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/52.png', alt: 'Meowth' },
  ];
  el.autoplay = true;
  el.interval = 2200;

  // Wire wc-articles
  if (!customElements.get('wc-articles')) {
    await customElements.whenDefined('wc-articles');
  }
  const articlesEl = document.getElementById('articles') as any;
  if (articlesEl) {
    articlesEl.articles = [
      { title: 'Angular Elements with Signals', summary: 'Build reactive web components in Angular 18', image: 'https://picsum.photos/seed/v1/600/300', url: '#' },
      { title: 'Real-time Search Filtering', summary: 'Use computed() to filter efficiently', image: 'https://picsum.photos/seed/v2/600/300' },
      { title: 'Consume in React/Vue', summary: 'Drop-in usage across frameworks', image: 'https://picsum.photos/seed/v3/600/300', url: '#' }
    ];
  }
});
</script>

<style scoped>
.container {
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
  margin: 2rem auto;
  padding: 0 1rem;
  max-width: 980px;
}
wc-carousel {
  display: block;
  height: 400px;
}
</style>
