import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit {

  constructor() {

    this.regresaObservable()
    .subscribe(
      numero => console.log( 'Subs', numero ),
      error => console.error( 'Error en el obs', error ),
      () => console.log( 'El observador termino!' )
    );


  }

  ngOnInit() {
  }

  regresaObservable(): Observable<any> {

    // tslint:disable-next-line: prefer-const
    return new Observable( (observer: Subscriber<any> ) => {

      let contador = 0;

      let intervalo = setInterval( () => {

        contador ++;

        const salida = {
          valor: contador
        };

        observer.next( salida );

        if ( contador === 3 ) {
          clearInterval( intervalo );
          observer.complete();
        }

        // if ( contador === 2 ) {
        //   // clearInterval( intervalo );
        //   observer.error( 'Auxilio!' );
        // }

      }, 1000 );

    }).pipe(

      map( resp => resp.valor),
      filter( ( valor, index ) => {
        // console.log( 'Filter', valor, index );

        if ( ( valor % 2) === 1 ) {
          // impar
          return true;

        } else {
          // par
          return false;
        }
      })
    );

  }

}
