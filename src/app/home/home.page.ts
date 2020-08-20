import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { CreatetaskPage } from '../createtask/createtask.page';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

import { MenuController } from '@ionic/angular';
import { NoteDetailPage } from '../note-detail/note-detail.page';
import { BehaviorSubject, ReplaySubject, Subscription } from 'rxjs';

import { Validators, FormGroup, FormBuilder } from '@angular/forms';

import { Task } from '../../models/task.inteface';
import { News } from '../../models/news.interface';
import { DataService } from '../data.service';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  implements OnInit{
  taskForm:FormGroup;
  startTime:number;
  list:Array<Task> = [];
  listNews:Array<News> = [];
  private listData: Array<Task> = new Array();
  listSub:Subscription;
  completed:boolean;
  private loadingState: ReplaySubject<boolean> = new ReplaySubject();
  private notesSub: Subscription;
  private authSub: Subscription;
  private newsSub: Subscription;
  
  constructor(    
    private data: DataService, 
    private dataNews: DataService, 
    private modal: ModalController,
    private auth: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private afAuth: AngularFireAuth,
    private dataService:DataService,
    private menu: MenuController) {}
  ngOnInit() {
    this.afAuth.authState.subscribe(() => {
      this.getNews();
      /*if ( user ) {
        this.getNotes();
      }
      else{
        this.notesSub.unsubscribe();
        //this.authSub.unsubscribe();
      }*/
    });
    // get notes
    //this.getNotes();
    //this.getNews();
    //this.newsSub = this.dataService.news$.subscribe( taskData => this.listNews = taskData );
    
  }
  delete(  ) {
    
  }
  getNews(){
    this.loadingState.next(true);
    this.newsSub = this.data.news$.subscribe((data) => {
      // store notes to display in notes
      this.listNews = data;
      this.loadingState.next(false);
    });
    console.log(JSON.stringify(this.listNews)); 
  }
  /*getNotes() {
    // set loading state to true to show spinner
    this.loadingState.next(true);
    this.notesSub = this.data.notes$.subscribe((data) => {
      // store original data in notesData
      this.listData = data;
      // store notes to display in notes
      this.list = data;
      this.loadingState.next(false);
    });
  }
  completeTask(id){
    this.data.updateNote( id );
    
  }
  async addTask() {
    const createTaskModal = await this.modal.create({
      component: CreatetaskPage
    });
    createTaskModal.onDidDismiss()
    .then( (response) => {
      if ( response.data ) {
        // create note
        this.data.addNote( response.data );
      }
    })
    .catch( (error) => {
      console.log(error);
    });
    createTaskModal.present();
  }

  async getNoteDetail( task ) {
    const detailModal = await this.modal.create({ 
      component: NoteDetailPage, componentProps: {
      "name": task.name,
      "details": task.details,
      "date": task.date,
      "completed": task.completed,
      "image": task.image,
      "id": task.id
    } });
    detailModal.onDidDismiss()
      .then( (response) => {
        if ( response.data ) {
          // save note
          // console.log( response.data );
          this.data.updateNote( response.data );
        }
      })
      .catch( (error) => {
        console.log(error);
      });
    detailModal.present();
  }
  signOut() {
    this.afAuth.auth.signOut().then(()=>{
      // redirect user to signin page
      this.router.navigate(['/signin'])
    })
  }*/
}
