import { Recipe } from './recipe.module';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.module';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
@Injectable()
export class RecipeService{
    private recipes: Recipe[] = [new Recipe('Musched Potato', 'First recipe', 'https://static01.nyt.com/images/2013/06/26/dining/26JPFLEX1/26JPFLEX1-articleLarge-v3.jpg', 
    [new Ingredient('Meat',1),new Ingredient('French Fries', 20)]),
    new Recipe('Pasta', 'Second recipe', 'https://static01.nyt.com/images/2013/06/26/dining/26JPFLEX1/26JPFLEX1-articleLarge-v3.jpg', 
    [new Ingredient('Buns', 2), new Ingredient('Meat',2)])];
    recipeSelected= new EventEmitter<Recipe>();
    getRecipes(){
        return this.recipes.slice();
    }
    constructor(private slService: ShoppingListService){}
    addIngredientsSL(i:Ingredient[]){
        this.slService.addIngredients(i);
    }
    gerRecipeById(id: number){
        return this.recipes[id];
    }


}