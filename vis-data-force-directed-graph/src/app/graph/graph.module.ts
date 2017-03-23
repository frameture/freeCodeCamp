import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ForceDirectedGraphComponent } from './force-directed-graph/force-directed-graph.component';
import { GraphService } from './graph.service';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ ForceDirectedGraphComponent ],
  providers: [ GraphService ],
  exports: [ ForceDirectedGraphComponent ]
})
export class GraphModule { }
