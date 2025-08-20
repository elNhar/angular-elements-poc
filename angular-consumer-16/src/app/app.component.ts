import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent implements OnInit {
  title = 'angular-consumer-16';

  async ngOnInit() {
    // Wait until the custom element definition is available
    if (!customElements.get('wc-carousel')) {
      await customElements.whenDefined('wc-carousel');
    }
    const el = document.getElementById('poke') as any;
    if (!el) return;
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

    // Wire wc-articles
    if (!customElements.get('wc-articles')) {
      await customElements.whenDefined('wc-articles');
    }
    const articlesEl = document.getElementById('articles') as any;
    if (articlesEl) {
      articlesEl.articles = [
        { title: 'Angular Elements with Signals', summary: 'Build reactive web components in Angular 18', image: 'https://picsum.photos/seed/a1/600/300', url: '#' },
        { title: 'Real-time Search Filtering', summary: 'Use computed() to filter efficiently', image: 'https://picsum.photos/seed/a2/600/300' },
        { title: 'Consume in React/Vue', summary: 'Drop-in usage across frameworks', image: 'https://picsum.photos/seed/a3/600/300', url: '#' }
      ];
    }
  }
}
