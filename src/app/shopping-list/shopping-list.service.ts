import { Ingredient } from '../shared/ingredient.module';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

export class ShoppingListService {
    //ingredientsChanged = new EventEmitter<Ingredient[]>();
    ingredientsChanged = new Subject<Ingredient[]>();
    private ingredients: Ingredient[] = [new Ingredient("pepper", 10),
                                         new Ingredient("water", 1)];

    getIngredients(){
        return this.ingredients.slice();
    }
    addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
    addIngredients(i:Ingredient[]){
        this.ingredients.push(...i);
        this.ingredientsChanged.next(this.ingredients.slice())

    }
}