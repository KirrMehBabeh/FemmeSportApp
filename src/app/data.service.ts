import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Subscription, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from '../models/task.inteface';
import { News } from '../models/news.interface';
import { AngularFireAuth } from '@angular/fire/auth';



@Injectable({
  providedIn: 'root'
})
export class DataService {
  private notesCollection: AngularFirestoreCollection<Task>;
  private newsCollection: AngularFirestoreCollection<News>;
  // notes$: Observable<Note[]>;
  public notes$ = new BehaviorSubject<Task[]>([]);
  public articles$ = new BehaviorSubject<News[]>([]);
  private uid: string;
  private authStatus: Subscription;
  private ncSub: Subscription;
  taskList:Array<Task> = new Array();
  newsList:Array<News> = new Array();
  list$ = new BehaviorSubject<Task[]>( this.taskList ) ;
  news$ = new BehaviorSubject<News[]>( this.newsList ) ;

  constructor(private afs: AngularFirestore, private afauth: AngularFireAuth) {
    // get the user auth status
    /*this.loadData().then((data:Array<News>) => {
      data.forEach((item) => {
        this.newsList.push(item)
      })
      this.news$.next( this.newsList );
    }) 
    this.list$.next( this.taskList );
    this.news$.next( this.newsList );
    this.authStatus = afauth.authState.subscribe((user) => {
      if (user) {
        // get the user id
        this.uid = user.uid;
        // create path
        const path = `notes/${this.uid}/usernotes`;
        // set the collection
        this.notesCollection = afs.collection<Task>(path);
        // this.notes$ = this.getNotes();
        this.ncSub = this.getNotes().subscribe((data) => {
          this.notes$.next(data);
        });
      }
      else{
        this.ncSub.unsubscribe();
      }
    });*/
    /*this.authStatus = afauth.authState.subscribe((user) => {
      if (user) {
        // create path
        const path = `news`;
        // set the collection
        this.notesCollection = afs.collection<Task>(path);
        // this.notes$ = this.getNotes();
        this.ncSub = this.getNotes().subscribe((data) => {
          this.notes$.next(data);
        });
      }
      else{
        //this.ncSub.unsubscribe();
      }
    });*/
    this.authStatus = afauth.authState.subscribe(() => {
        // create path
        const path = `news`;
        // set the collection
        this.newsCollection = afs.collection<News>(path);
        // this.notes$ = this.getNotes();
        this.news$.next( this.newsList );
        this.ncSub = this.getNews().subscribe((data) => {
          this.articles$.next(data);
          data.forEach((item) => {
            this.newsList.push(item)
          })
          this.news$.next( this.newsList );
          console.log(JSON.stringify(this.articles$));
        });
    });
  }
  /* addToList( task:Task ) {
    this.taskList.push( task );
    this.list$.next( this.taskList );
    this.saveData();
  }
  saveData() {
    let data = JSON.stringify( this.taskList );
    try {
      window.localStorage.setItem("tasks" , data );
      if( !window.localStorage.getItem("tasks") ) {
        throw("local storage not available");
      }
    }
    catch( exc ) {
      console.log( exc );
    }
  }

  loadData() {
    return new Promise( (resolve,reject) => {
      if( !window.localStorage.getItem("tasks") ) {
        reject( false );
      }
      else{
        let data = JSON.parse( window.localStorage.getItem("tasks") );
        resolve( data );
      }
    } );
  } */
  addNote(data: Task) {
    this.notesCollection.add(data);
  }
  getNews(){
    return this.newsCollection.snapshotChanges()
      .pipe( map(actions => actions.map(a => {
          const data = a.payload.doc.data() as News;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
  }
  getNotes() {
    // this function retuns an Observable
    return this.notesCollection.snapshotChanges()
      .pipe( map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Task;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
  }

  updateNote( note ) {
    this.notesCollection.doc( note.id ).update( { name: note.name, details: note.details, date: note.date, completed: note.completed, image: note.image });
  }

  deleteNote( id ) {
    this.notesCollection.doc( id ).delete();
  }

  getUid() {
    return this.uid;
  }
}
