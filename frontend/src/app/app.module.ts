import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './common/welcome/welcome.component';
import { HeaderComponent } from './common/header/header.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TokenInterceptorService } from './shared/services/token-interceptor.service';
import { CurrencyConverterDirective } from './shared/directives/currency-converter.directive';
import { StoreModule } from '@ngrx/store';
import { fruitReducer } from './store/reducers/fruit.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { FruitEffects } from './store/effects/fruit.effects';
import { reducers, metaReducers } from './reducers';
import { AppEffects } from './app.effects';
import { BetterHighlighterDirective } from './shared/directives/better-highlighter.directive';
import { CustomLoaderDirective } from './shared/directives/custom-loader.directive';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      newestOnTop: false
    }),
    StoreModule.forRoot({ fruits: fruitReducer}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([FruitEffects]),
    ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
