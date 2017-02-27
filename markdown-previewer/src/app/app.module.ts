import { BrowserModule } from '@angular/platform-browser';
import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent }       from './app.component';
import { MarkdownComponent }  from './markdown.component';
import { PreviewerComponent } from './previewer.component';

@NgModule({
  declarations: [
    AppComponent,
    MarkdownComponent,
    PreviewerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
