import{Component, Output, EventEmitter} from '@angular/core';

@Component({
    selector:"app-header",
    templateUrl: './header.component.html'
})
export class HeaderComponent{
    @Output() option = new EventEmitter<number>();
    onRecipesClick(){
        console.log("Recipes clicked");
        this.option.emit(1);
    }
    onShoppingListClick(){
        this.option.emit(2);
    }
}