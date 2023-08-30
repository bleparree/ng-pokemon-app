import { Component } from '@angular/core';

/** Component to call as an element to show a Materialize loading spinner */
@Component({
  selector: 'app-loader',
  template: `
    <br/>
    <div class="center">
      <div class="preloader-wrapper big active">
        <div class="spinner-layer spinner-blue-only">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div><div class="gap-patch">
            <div class="circle"></div>
          </div><div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class LoaderComponent {}
