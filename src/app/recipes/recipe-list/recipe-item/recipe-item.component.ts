import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../recipe.module';
//import { RecipeService } from '../../recipes.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe:Recipe;
  @Input() id: number;
  //@Output() recipeClicked = new EventEmitter<void>();
  //constructor(private recipeService: RecipeService) { }

  ngOnInit(){
  }
  // onRecipeClicked(){
  //   console.log("Inside item component clicked");
  //   this.recipeService.recipeSelected.emit(this.recipe);
  //   //this.recipeClicked.emit();
  //   //console.log(this.recipe.name);
  // }

}
