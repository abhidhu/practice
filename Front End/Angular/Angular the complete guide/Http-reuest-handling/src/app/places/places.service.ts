import { Injectable, inject, signal } from '@angular/core';

import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, pipe, tap, throwError } from 'rxjs';
import { ErrorService } from '../shared/error.service';

@Injectable( {
  providedIn: 'root',
} )
export class PlacesService {

  private errorService = inject(ErrorService)
  private httpClient = inject( HttpClient )
  private userPlaces = signal<Place[]>( [] );

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchPlaces(
      'http://localhost:3000/places',
      'Something went wrong while fetching the available places, please try again latter...'
    );
  }

  loadUserPlaces() {
    return this.fetchPlaces(
      'http://localhost:3000/user-places',
      'Something went wrong while fetching the available places, please try again latter...'
    ).pipe( tap( {
      next: ( userPlaces ) => this.userPlaces.set( userPlaces )
    } ) );
  }

  addPlaceToUserPlaces( place: Place ) {
    const prevPlaces = this.userPlaces()
    if ( !prevPlaces.some( ( p ) => p.id === place.id ) ) {
      this.userPlaces.update( prevPlaces => [ ...prevPlaces, place ] );
    }
    return this.httpClient.put( 'http://localhost:3000/user-places', { placeId: place.id } )
      .pipe(
        catchError( error => {
          this.userPlaces.set( prevPlaces );
          this.errorService.showError('Failed to store selected place.')
          return throwError( () => new Error( 'Failed to store selected place.' ) )
        } )
      )
  }

  removeUserPlace( place: Place ) {
    const prevPlaces = this.userPlaces()
    if ( prevPlaces.some( ( p ) => p.id === place.id ) ) {
      this.userPlaces.set(prevPlaces.filter(p => p.id !==place.id));
    }

    return this.httpClient.delete('http://localhost:3000/user-places/' + place.id)
    .pipe(
      catchError((error) => {
        this.userPlaces.set(prevPlaces);
        this.errorService.showError('Failed to remove the selected  places');
        return throwError(() => new Error('Failed to remove the selected  places'))
      })
    )
   }

  private fetchPlaces( url: string, errorMessage: string ) {
    return this.httpClient.get<{ places: Place[] }>( url )
      .pipe(
        map( ( res ) => res.places ),
        catchError(
          ( error ) => throwError( () => new Error( errorMessage ) )
        )
      )
  }
}
