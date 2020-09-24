import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.module';
import { RecipeService } from '../recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  constructor(private route: ActivatedRoute, private router: Router,
              private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
            this.id = +params['id'];
            this.editMode = params['id'] != null;
            this.initForm();
            //console.log(this.editMode);
        }
      )
  }
  private initForm(){
    let recipeName = '';
    let recipeImgPath = '';
    let recipeDescription = '';
    let recipeingredients = new FormArray([]);
    if(this.editMode){
      const recipe = this.recipeService.gerRecipeById(this.id);
      recipeName = recipe.name;
      recipeImgPath = recipe.imagePath;
      recipeDescription = recipe.description;
      if(recipe['ingredients']) {
        for (let i of recipe.ingredients){
          recipeingredients.push(
            new FormGroup({
              'name': new FormControl(i.name, Validators.required),
              'amount': new FormControl(i.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          )
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImgPath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeingredients
    });
  }
  onSubmit(){
    //console.log(this.recipeForm);
    const newRecipe = new Recipe(
      this.recipeForm.get('name').value,
      this.recipeForm.get('description').value,
      this.recipeForm.get('imagePath').value,
      this.recipeForm.get('ingredients').value
    );
    if(!this.editMode){
      this.recipeService.addRecipe(newRecipe);
    } else{
      this.recipeService.updateRecipe(this.id, newRecipe);
    }
    this.onCancel();
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }
  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }
  onDeleteIngredient(i:number){
(<FormArray>this.recipeForm.get('ingredients')).removeAt(i);
  }



}
