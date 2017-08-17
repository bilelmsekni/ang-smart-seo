import { SeoService } from './common/seo.service';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ang-smart-seo'}),
    AppRoutingModule
  ],
  providers: [SeoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
