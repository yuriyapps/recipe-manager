import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.module';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  //@ViewChild('nameInput', {static:false})nameInputRef:ElementRef;
  //@ViewChild('amountInput', {static:false})amountInputRef:ElementRef;
  //@Output()ingredientAdded = new EventEmitter<Ingredient>();
  @ViewChild('f',{static:false})shoppingForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editItemIndex: number;
  editedItem:Ingredient;
  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.slService.startedEditing
        .subscribe((i:number)=>{
          this.editItemIndex = i;
          this.editMode = true;
          this.editedItem = this.slService.getIngredientById(i);
          this.shoppingForm.setValue({name: this.editedItem.name, amount: this.editedItem.amount});

        });
  }
  onAddItem(form: NgForm){
    const newIngredient = new Ingredient(form.value.name, form.value.amount);
    //this.ingredientAdded.emit(newIngredient);
    if(this.editMode){
      this.slService.updateIngredientById(this.editItemIndex, newIngredient);
    } else {
      this.slService.addIngredient(newIngredient);
    }
    this.shoppingForm.reset();
    this.editMode = false;
    
  }
  onReset(){
    this.shoppingForm.reset();
    this.editMode = false;
    
  }
  onDelete(){
    this.slService.onDelete(this.editItemIndex);
    this.onReset();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
