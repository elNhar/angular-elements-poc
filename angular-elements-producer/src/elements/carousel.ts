import { createCustomElement } from '@angular/elements';
import { provideZoneChangeDetection } from '@angular/core';
import { createApplication } from '@angular/platform-browser';
import { CarouselComponent } from '../app/components/carousel/carousel.component';

// Create a minimal Angular application context, then register <wc-carousel>
(async () => {
  const app = await createApplication({
    providers: [provideZoneChangeDetection({ eventCoalescing: true })],
  });

  const element = createCustomElement(CarouselComponent, { injector: app.injector });
  if (!customElements.get('wc-carousel')) {
    customElements.define('wc-carousel', element);
  }
})().catch(console.error);
