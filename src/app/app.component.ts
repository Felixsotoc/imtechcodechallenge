import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  postId: number = 0; 
  post: any;
  posts: any=[];
  showPosts: boolean = false; 
  nuevoPost = {
    title: '',
    body: '',
    userId: null
  };
  posta={
    title: '',
    body: '',
    userId: 0,
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  cargarPost(): void {
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/posts?_start=0&_limit=20')
      .subscribe((posts) => {
        this.posts = posts;
        this.showPosts = true; 
      });
  }

  hidePosts(): void { // 
    this.showPosts = !this.showPosts;
  }

  buscarPost(): void {
    this.http.get(`https://jsonplaceholder.typicode.com/posts/${this.postId}`)
      .subscribe((post) => {
        this.post = post;
      });
  }
  agregarPost(): void {
    this.http.post<any>('https://jsonplaceholder.typicode.com/posts', this.nuevoPost)
      .subscribe((post) => {
        console.log(post);
      });
  }

 /* actualizarPost() {
    this.http.put<any>('https://jsonplaceholder.typicode.com/posts/${this.postId}', this.nuevoPost)
      .subscribe(post => {
        console.log(post);
      });
  }*/
  actualizarPost(): void {
    const url = `https://jsonplaceholder.typicode.com/posts/${this.postId}`;
    this.http.put<any>(url, this.post)
      .subscribe((post) => {
        console.log(post);
      });
  }

  borrarPost() {
    this.http.delete(`https://jsonplaceholder.typicode.com/posts/${this.postId}`)
      .subscribe(response => {
        console.log(response);
      });
  }

}