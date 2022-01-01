import { NgModule } from "@angular/core";
import { FilterPipe } from "../filter.pipe";
import { SpinnerComponent } from './spinner/spinner.component';
import { ErrorModalComponent } from './error-modal/error-modal.component';

@NgModule({
    imports:[],
    declarations:[FilterPipe, SpinnerComponent, ErrorModalComponent],
    exports:[FilterPipe,SpinnerComponent,ErrorModalComponent],
    providers:[]
})

export class SharedModule{

}