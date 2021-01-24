import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie } from '../interfaces/movie';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css'],
})
export class TrendingComponent implements OnInit {
  @Input() slideRef: any;
  @Input() genreList: any;
  @Output() watchListEvent = new EventEmitter<Movie>();
  imageBaseUrl: string = 'https://image.tmdb.org/t/p/w185';
  image: string = '';
  movieGenres: any;
  showId: number = -1;
  constructor() {}

  ngOnInit(): void {
    this.image = this.getImage(this.slideRef);

    this.getMovieGenres(this.slideRef);
  }

  getImage = (slideRef: any): string => {
    return this.imageBaseUrl + slideRef.poster_path;
  };

  getMovieGenres = (slideRef: any) => {
    const movieGenres: string[] = [];
    this.genreList.forEach((genre: any) => {
      if (slideRef.genre_ids.includes(genre.id)) {
        movieGenres.push(genre.name);
      }
    });
    this.movieGenres = movieGenres;
  };

  sendToWatchList = (movie: any) => {
    let newMovie: Movie = {
      title: movie.title,
      genre: this.movieGenres,
      image: this.image,
      id: movie.id,
      overview: movie.overview,
      vote_average: movie.vote_average,
      release_date: movie.release_date,
      backdrop_path: 'https://image.tmdb.org/t/p/w185' + movie.backdrop_path,
    };
    this.watchListEvent.emit(newMovie);
  };

  toggleShowId = (id: number) => {
    this.showId === id ? (this.showId = -1) : (this.showId = id);
  };
}
