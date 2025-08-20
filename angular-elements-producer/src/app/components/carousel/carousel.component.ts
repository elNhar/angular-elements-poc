import { Component, Input, Output, EventEmitter, OnDestroy, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent implements OnInit, OnDestroy {
  // Internal reactive state as signals
  private _images = signal<Array<string | { src: string; alt?: string }>>([]);
  private _autoplay = signal<boolean>(true);
  private _interval = signal<number>(3000);
  private _showArrows = signal<boolean>(true);
  private _showDots = signal<boolean>(true);
  private _slidesPerView = signal<number>(1);

  // Public inputs that write into signals (compatible with Angular Elements)
  @Input() set images(v: Array<string | { src: string; alt?: string }> | undefined | null) {
    this._images.set(v ?? []);
  }
  get images(): Array<string | { src: string; alt?: string }> { return this._images(); }

  @Input() set autoplay(v: boolean | undefined | null) { this._autoplay.set(!!v); }
  get autoplay(): boolean { return this._autoplay(); }

  @Input() set interval(v: number | undefined | null) { this._interval.set((v as number) ?? 3000); }
  get interval(): number { return this._interval(); }

  @Input() set showArrows(v: boolean | undefined | null) { this._showArrows.set(!!v); }
  get showArrows(): boolean { return this._showArrows(); }

  @Input() set showDots(v: boolean | undefined | null) { this._showDots.set(!!v); }
  get showDots(): boolean { return this._showDots(); }

  // Responsive: 1 slide on mobile, 3 on desktop
  get slidesPerView(): number { return this._slidesPerView(); }

  // Events
  @Output() slideChange = new EventEmitter<number>();

  private timer: any;
  index = signal(0); // current starting slide index (page start)
  private mql?: MediaQueryList;
  private mqlHandler?: () => void;

  // Derive from current input each render
  get count(): number { return this._images()?.length ?? 0; }

  slides() {
    return (this._images() || []).map((it: string | { src: string; alt?: string }) =>
      typeof it === 'string' ? { src: it, alt: '' } : { src: it?.src ?? '', alt: it?.alt ?? '' }
    );
  }

  ngOnInit(): void {
    // Initialize responsive behavior
    if (typeof window !== 'undefined') {
      this.mql = window.matchMedia('(max-width: 768px)');
      this.mqlHandler = () => this._slidesPerView.set(this.mql?.matches ? 1 : 3);
      this.mqlHandler();
      this.mql.addEventListener?.('change', this.mqlHandler as any);
      // Fallback for older browsers
      (this.mql as any).addListener?.(this.mqlHandler);
    }
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
    if (this.mql && this.mqlHandler) {
      this.mql.removeEventListener?.('change', this.mqlHandler as any);
      (this.mql as any).removeListener?.(this.mqlHandler);
    }
  }

  next(): void {
    const c = this.count;
    if (c === 0) return;
    const spv = this.slidesPerView;
    const pages = Math.max(1, Math.ceil(c / spv));
    const currentPage = Math.floor(this.index() / spv);
    const nextPage = (currentPage + 1) % pages;
    const nextIndex = nextPage * spv;
    this.index.set(nextIndex);
    this.slideChange.emit(this.index());
  }

  prev(): void {
    const c = this.count;
    if (c === 0) return;
    const spv = this.slidesPerView;
    const pages = Math.max(1, Math.ceil(c / spv));
    const currentPage = Math.floor(this.index() / spv);
    const prevPage = (currentPage - 1 + pages) % pages;
    const prevIndex = prevPage * spv;
    this.index.set(prevIndex);
    this.slideChange.emit(this.index());
  }

  goToPage(p: number): void {
    const c = this.count;
    if (c === 0) return;
    const spv = this.slidesPerView;
    const pages = Math.max(1, Math.ceil(c / spv));
    const safePage = ((p % pages) + pages) % pages;
    this.index.set(safePage * spv);
    this.slideChange.emit(this.index());
  }

  pages(): number[] {
    const total = Math.max(1, Math.ceil(this.count / this.slidesPerView));
    return Array.from({ length: total }, (_, i) => i);
  }

  pageIndex(): number {
    const spv = this.slidesPerView || 1;
    return Math.floor(this.index() / spv);
  }

  pagesCount(): number {
    return Math.max(1, Math.ceil(this.count / (this.slidesPerView || 1)));
  }

  pause(): void {
    this.stopAutoplay();
  }

  resume(): void {
    this.startAutoplay();
  }

  private startAutoplay(): void {
    if (!this.autoplay) return;
    this.stopAutoplay();
    this.timer = setInterval(() => this.next(), Math.max(1000, this.interval | 0));
  }

  private stopAutoplay(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
  }
}
