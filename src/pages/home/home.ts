import { Component } from '@angular/core';
import { NavController, AlertController, reorderArray, ToastController } from 'ionic-angular';
import { TodoProvider } from './../../providers/todo/todo';
import { ArchivedTodosPage } from './../archived-todos/archived-todos';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public todos = [];
  public reorderIsEnabled = false;

  constructor(
    private todoProvider: TodoProvider, 
    private toastControllers: ToastController, 
    public navCtrl: NavController, 
    private alertController: AlertController) {
      this.todos = this.todoProvider.getTodos();
  }

  archiveTodo(todoIndex){
    this.todoProvider.archiveTodo(todoIndex);
  }
  
  goToArchivePage(){
    this.navCtrl.push(ArchivedTodosPage);
  }
  
  toggleReorder(){
    this.reorderIsEnabled = !this.reorderIsEnabled;
  }
  
  itemReordered($event){
    reorderArray(this.todos, $event)
  }
  
  editTodo(todoIndex){
    let editTodoAlert = this.alertController.create({
      title: "Edit Todo",
      inputs: [{
        type: "text",
        name: "editTodoInput",
        value: this.todos[todoIndex]
      }],
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Edit Todo",
          handler: (inputData) => {
            let todoText;
            todoText = inputData.editTodoInput;
            this.todoProvider.editTodo(todoText, todoIndex);

            editTodoAlert.onDidDismiss(()=>{
              let addTodoToast = this.toastControllers.create({
                message: "Edited Todo",
                duration: 2000
              });
              addTodoToast.present();
            });

          }
        }
      ]
    });
    editTodoAlert.present();
  }

  openTodoAlert(){
    let addTodoAlert = this.alertController.create({
      title: "Add a Todo",
      message: "Enter Your Todo",
      inputs: [{
        type: "text",
        name: "addTodoInput"
      }],
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Add Todo",
          handler: (inputData) => {
            let todoText;
            console.log("inputData", inputData.addTodoInput);
            todoText = inputData.addTodoInput;
            this.todoProvider.addTodo(todoText);

            addTodoAlert.onDidDismiss(()=>{
              let addTodoToast = this.toastControllers.create({
                message: "Todo Added",
                duration: 2000
              });
              addTodoToast.present();
            });

          }
        }
      ]
    });
    addTodoAlert.present();
  }

}
