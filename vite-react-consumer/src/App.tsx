import React, { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    const el = document.getElementById('poke') as any;
    const articlesEl = document.getElementById('articles') as any;
    const ensure = async () => {
      if (!customElements.get('wc-carousel')) {
        await customElements.whenDefined('wc-carousel');
      }
      if (el) {
        el.images = [
          { src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png', alt: 'Bulbasaur' },
          { src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png', alt: 'Charmander' },
          { src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png', alt: 'Squirtle' },
          { src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png', alt: 'Pikachu' },
          { src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/39.png', alt: 'Jigglypuff' },
          { src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/52.png', alt: 'Meowth' },
        ];
        el.showArrows = true;
        el.showDots = true;
        el.autoplay = true;
        el.interval = 3000;
      }

      if (!customElements.get('wc-articles')) {
        await customElements.whenDefined('wc-articles');
      }
      if (articlesEl) {
        articlesEl.articles = [
          { title: 'Angular Elements with Signals', summary: 'Build reactive web components in Angular 18', image: 'https://picsum.photos/seed/r1/600/300', url: '#' },
          { title: 'Real-time Search Filtering', summary: 'Use computed() to filter efficiently', image: 'https://picsum.photos/seed/r2/600/300' },
          { title: 'Consume in React/Vue', summary: 'Drop-in usage across frameworks', image: 'https://picsum.photos/seed/r3/600/300', url: '#' }
        ];
      }
    };
    ensure();
  }, []);

  return (
    <main className="container">
      <h1>React + Vite consuming &lt;wc-carousel&gt;</h1>
      <p>Ensure producer server is running at <code>http://localhost:4000</code>.</p>
      <wc-carousel id="poke"></wc-carousel>
      <h2 style={{ marginTop: '2rem' }}>Consuming &lt;wc-articles&gt;</h2>
      <wc-articles id="articles"></wc-articles>
    </main>
  );
}
