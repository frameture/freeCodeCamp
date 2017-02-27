import { Output, OnInit, Component}   from '@angular/core';

import { MARKDOWN } from './markdown';

var marked = require('marked'); // simple JS 

@Component({
  selector: 'app-root',
  templateUrl: './views/app.component.html'
})
export class AppComponent implements OnInit {
  markdown: string;
  private previewer: string; 

  private getMarkdown(): void {
    this.markdown = MARKDOWN;
  }

  private parseMarkdown(): void {
    this.previewer = marked(this.markdown);
  }

   ngOnInit(): void {
    this.getMarkdown();
    this.parseMarkdown(); 
  }
}
