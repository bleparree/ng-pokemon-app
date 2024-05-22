import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { DialogModule } from '@angular/cdk/dialog';
import { HttpClientModule } from '@angular/common/http';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        // BrowserModule,
        // FormsModule,
        HttpClientModule,
        // HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false, passThruUnknownUrl: true}),
        // PokemonModule,
        // AppRoutingModule,
        // AppSharedModule,
        // BrowserAnimationsModule,
        // CdkDropList, CdkDrag, 
        DialogModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

//   it(`should have as title 'AngularUnitTestApp'`, () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.componentInstance;
//     expect(app.title).toEqual('AngularUnitTestApp');
//   });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#title_app')?.textContent).toContain('Pokédex');
  });
});
