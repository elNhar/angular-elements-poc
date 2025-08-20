import { createCustomElement } from '@angular/elements';
import { provideZoneChangeDetection } from '@angular/core';
import { createApplication } from '@angular/platform-browser';
import { ArticlesListComponent } from '../app/components/articles-list/articles-list.component';

// Create a minimal Angular application context, then register <wc-articles>
(async () => {
  const app = await createApplication({
    providers: [provideZoneChangeDetection({ eventCoalescing: true })],
  });

  const element = createCustomElement(ArticlesListComponent, { injector: app.injector });
  if (!customElements.get('wc-articles')) {
    customElements.define('wc-articles', element);
  }
})().catch(console.error);
