import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Movie } from '../interfaces/movie';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.css'],
})
export class WatchListComponent implements OnInit {
  watchList: Movie[] = [];
  @Output() watchListEvent = new EventEmitter<Movie>();

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.watchList = this.movieService.getWatchList();
    console.log(this.watchList);
  }

  sendToWatchList = (movie: any) => {
    let newMovie: Movie = {
      title: movie.title,
      genre: movie.genre,
      image: movie.image,
      id: movie.id,
      overview: movie.overview,
      vote_average: movie.vote_average,
      release_date: movie.release_date,
      backdrop_path: 'https://image.tmdb.org/t/p/w185' + movie.backdrop_path,
    };
    this.movieService.addToWatchList(newMovie);
  };
}
