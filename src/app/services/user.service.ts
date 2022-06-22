import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {
  private dbPath = '/users';
  tutorialsRef: AngularFirestoreCollection<Tutorial>;
  constructor(private db: ) {
    this.tutorialsRef = 
  }
  getAll(): AngularFirestoreCollection<Tutorial> {
    return this.tutorialsRef;
  }
  create(tutorial: Tutorial): any {
    return this.tutorialsRef.add({ ...tutorial });
  }
  update(id: string, data: any): Promise<void> {
    return this.tutorialsRef.doc(id).update(data);
  }
  delete(id: string): Promise<void> {
    return this.tutorialsRef.doc(id).delete();
  }
}