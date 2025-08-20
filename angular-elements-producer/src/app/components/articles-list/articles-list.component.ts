import { Component, Input, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ArticleItem = {
  title: string;
  summary?: string;
  image?: string;
  url?: string;
};

@Component({
  selector: 'app-articles-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent {
  private _articles = signal<ArticleItem[]>([]);
  query = signal<string>('');

  @Input() set articles(v: ArticleItem[] | null | undefined) {
    this._articles.set(v ?? []);
  }
  get articles(): ArticleItem[] { return this._articles(); }

  filtered = computed(() => {
    const q = this.query().trim().toLowerCase();
    if (!q) return this._articles();
    return this._articles().filter(a =>
      (a.title?.toLowerCase().includes(q)) ||
      (a.summary?.toLowerCase().includes(q))
    );
  });
}
