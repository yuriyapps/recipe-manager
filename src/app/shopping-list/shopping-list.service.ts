import { Ingredient } from '../shared/ingredient.module';
import { EventEmitter } from '@angular/core';

export class ShoppingListService {
    ingredientsChanged = new EventEmitter<Ingredient[]>();
    private ingredients: Ingredient[] = [new Ingredient("pepper", 10),
                                         new Ingredient("water", 1)];

    getIngredients(){
        return this.ingredients.slice();
    }
    addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientsChanged.emit(this.ingredients.slice());
    }
    addIngredients(i:Ingredient[]){
        this.ingredients.push(...i);
        this.ingredientsChanged.emit(this.ingredients.slice())

    }
}