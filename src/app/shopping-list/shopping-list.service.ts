import { Ingredient } from '../shared/ingredient.module';
import { Subject } from 'rxjs';

export class ShoppingListService {
    //ingredientsChanged = new EventEmitter<Ingredient[]>();
    startedEditing = new Subject<number>();
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

    getIngredientById(i:number){
        return this.ingredients[i];
    }

    updateIngredientById(i: number, newIngredient: Ingredient){
        this.ingredients[i] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    onDelete(i: number){
        this.ingredients.splice(i,1);
        this.ingredientsChanged.next(this.ingredients.slice());
      }
    
}