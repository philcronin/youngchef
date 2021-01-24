import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { WatchListComponent } from './watch-list/watch-list.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'watch-list', component: WatchListComponent },
  { path: 'search', component: SearchComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }, // redirect to `first-component`
  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
