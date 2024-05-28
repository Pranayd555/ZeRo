import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { SharedService } from "src/app/shared/services/shared.service";
import { addFruits, addFruitsFailure, addFruitsSuccess, deleteFruits, deleteFruitsFailure, deleteFruitsSuccess, getFruits, getFruitsFailure, getFruitsSuccess, updateFruits, updateFruitsSuccess } from "../actions/fruits.action";
import { EmptyError, catchError, concatMap, exhaustMap, map, mergeMap, of } from "rxjs";
import { Fruit } from "src/app/shared/models/fruit";


@Injectable()
export class FruitEffects {

    constructor( private actions$: Actions, private sharedService: SharedService) {}

    // loadFruits$ = createEffect(
    // () => this.actions$.pipe(
    //     ofType(getFruits),
    //     exhaustMap( ()=> this.sharedService.getFruits().pipe(
    //         map( fruits => getFruitsSuccess(fruits)),
    //         catchError(async () => EmptyError)
    //     ))
    // ))
    loadFuits$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getFruits),
            mergeMap(() => this.sharedService.getFruits().pipe(
                map(
                    (fruits: Fruit[]) => getFruitsSuccess(fruits)
                ),
                catchError(err => of(getFruitsFailure(err)))
            ))
        )
    })

    addFuits$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(addFruits),
            exhaustMap((newFruit: Fruit) => this.sharedService.addFruit(newFruit).pipe(
                map(
                    (fruits: Fruit[]) => addFruitsSuccess(fruits)
                ),
                catchError(err => of(addFruitsFailure()))
            ))
        )
    })

    updateFuits$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updateFruits),
            concatMap((newFruit: Fruit) => this.sharedService.updateFruit(newFruit).pipe(
                map(
                    (fruits: Fruit[]) => addFruitsSuccess(fruits)
                ),
                catchError(err => of(addFruitsFailure()))
            ))
        )
    })

    deleteFuits$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deleteFruits),
            mergeMap((fruitName: any) => this.sharedService.deleteFruit(fruitName['name']).pipe(
                map(
                    (fruits: Fruit[]) => deleteFruitsSuccess(fruits)
                ),
                catchError(() => of(deleteFruitsFailure()))
            ))
        )
    })
}