import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { Swiper } from 'swiper/bundle';
import 'swiper/swiper-bundle.css';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TrendingComponent } from './trending/trending.component';
import { TopRatedComponent } from './top-rated/top-rated.component';
import { PopularComponent } from './popular/popular.component';
import { SearchComponent } from './search/search.component';
import { MovieInfoComponent } from './movie-info/movie-info.component';
import { WatchListComponent } from './watch-list/watch-list.component';
import { HomeComponent } from './home/home.component';

const swiper = new Swiper('.swiper-container');

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto',
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TrendingComponent,
    TopRatedComponent,
    PopularComponent,
    SearchComponent,
    MovieInfoComponent,
    WatchListComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SwiperModule,
    FormsModule,
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
