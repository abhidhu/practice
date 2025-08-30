import { NgModule } from "@angular/core";
import { NewTaskComponent } from "./new-task/new-task.component";
import { TasksComponent } from "./tasks.component";
import { TaskComponent } from "./task/task.component";
import { TasksService } from "./tasks.service";
import { DatePipe } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { FormsModule } from "@angular/forms";



@NgModule({
  declarations:[NewTaskComponent, TasksComponent, TaskComponent],
  exports:[TasksComponent],
  imports:[DatePipe, SharedModule, FormsModule],
  providers:[TasksService]
})
export class TasksModule{

}