import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.module';
import { RecipeService } from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe:Recipe;
  constructor(private recipeService:RecipeService) { }

  ngOnInit(): void {
  }
  onAddSl(){
    this.recipeService.addIngredientsSL(this.recipe.ingredients);
  }

}
