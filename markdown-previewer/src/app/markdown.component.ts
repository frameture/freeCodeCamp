import { MARKDOWN } from './markdown';
import { Component, OnInit } from '@angular/core';


@Component({
  moduleId: module.id,
  selector: 'markdown',
  template: `
    <textarea [value]="markdown">
    </textarea>
  `
})
export class MarkdownComponent implements OnInit { 

  private markdown: string;

  private getMarkdown() {
    this.markdown = MARKDOWN;
  }

   ngOnInit(): void {
    this.getMarkdown();
  }
}