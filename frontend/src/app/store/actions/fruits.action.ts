import { createAction, props } from '@ngrx/store';
import { Fruit } from 'src/app/shared/models/fruit';


//get fruits actions
export const getFruits = createAction('[Fruit] get fruit');
export const getFruitsSuccess = createAction(
  '[Fruit] get fruit success',
    // props<ReadonlyArray<Fruit>>()
    (fruits: ReadonlyArray<Fruit>) => fruits
);
export const getFruitsFailure = createAction(
    '[Fruit] get fruit failure',
  props<any>()
  );

// add fruit actions
export const addFruits = createAction(
  '[Fruit] add fruit',
    props<Fruit>()
);
export const addFruitsSuccess = createAction(
  '[Fruit] add fruit sucess',
//   (fruits: ReadonlyArray<Fruit>) => fruits
(fruits: ReadonlyArray<Fruit>) => fruits
);
export const addFruitsFailure = createAction('[Fruit] add fruit failure');

// update fruit actions
export const updateFruits = createAction(
    '[Fruit] update fruit',
  //   (fruit: Fruit) => fruit
      props<Fruit>()
  );
  export const updateFruitsSuccess = createAction(
    '[Fruit] update fruit sucess',
  //   (fruits: ReadonlyArray<Fruit>) => fruits
    (fruits: ReadonlyArray<Fruit>) => fruits
  );
  export const updateFruitsFailure = createAction('[Fruit] update fruit failure');

  
// delete fruit actions
export const deleteFruits = createAction(
  '[Fruit] delete fruit',
  // (fruit: String) => fruit
    props<{name: string}>()
);
export const deleteFruitsSuccess = createAction(
  '[Fruit] detele fruit sucess',
//   (fruits: ReadonlyArray<Fruit>) => fruits
  (fruits: ReadonlyArray<Fruit>) => fruits
);
export const deleteFruitsFailure = createAction('[Fruit] delete fruit failure');
