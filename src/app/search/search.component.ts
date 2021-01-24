import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Movie } from '../interfaces/movie';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  @Input() slideRef: any;
  @Input() genreList: any;
  @Output() showEvent = new EventEmitter<void>();
  searchData: any;
  filteredData: any = [];
  movies: Movie[] = [];
  imageBaseUrl: string = 'https://image.tmdb.org/t/p/w185';
  image: string = '';
  movieGenres: any;
  movieInfo: any = document.querySelector('.info');
  showId: number = -1;
  constructor(
    private router: Router,
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((response) => {
      const query = response.get('query');
      if (query === null) {
        this.getTrending();
      } else {
        this.search(query);
      }
    });
    console.log(this.movies);

    // this.getMovieGenres(this.slideRef);
  }

  getTrending = () => {
    this.movieService.getTrending().subscribe((response) => {
      this.searchData = response;
    });
  };

  search = (query: string) => {
    this.movies = [];
    this.movieService.runSearch(query).subscribe((response) => {
      this.searchData = response;
      this.searchData.results.filter((movie: any) => {
        if (movie.media_type === 'movie') {
          const movieResult = this.makeMovie(movie);
          this.movies.push(movieResult);
        }
      });
    });
  };

  makeMovie = (movie: any): Movie => {
    const newMovie: Movie = {
      title: movie.title,
      genre: movie.genre_ids,
      image: this.imageBaseUrl + movie.poster_path,
      id: movie.id,
      overview: movie.overview,
      vote_average: movie.vote_average,
      release_date: movie.release_date,
      backdrop_path: 'https://image.tmdb.org/t/p/w185' + movie.backdrop_path,
    };
    return newMovie;
  };

  // getMovieGenres = (slideRef: any) => {
  //   const movieGenres: string[] = [];
  //   this.genreList.forEach((genre: any) => {
  //     if (slideRef.genre_ids.includes(genre.id)) {
  //       movieGenres.push(genre.name);
  //     }
  //   });
  //   this.movieGenres = movieGenres;
  // };
  sendToWatchList = (movie: any) => {
    let newMovie: Movie = {
      title: movie.title,
      genre: movie.genres,
      image: movie.image,
      id: movie.id,
      overview: movie.overview,
      vote_average: movie.vote_average,
      release_date: movie.release_date,
      backdrop_path: 'https://image.tmdb.org/t/p/w185' + movie.backdrop_path,
    };
    this.movieService.addToWatchList(newMovie);
  };

  showMe = () => {
    this.showEvent.emit();
  };

  heardYa = () => {
    this.movieInfo.classList.toggle('hidden');
  };

  toggleShowId = (id: number) => {
    this.showId === id ? (this.showId = -1) : (this.showId = id);
  };
}
