import {NgModule} from "@angular/core";
import {ResolveNamePipe} from "./resolve-name/resolve-name.pipe";

@NgModule({
  declarations: [
    ResolveNamePipe
  ],
  exports: [
    ResolveNamePipe
  ]
})
export class PipesModule {
}
