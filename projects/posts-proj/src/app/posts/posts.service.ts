import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Post, ResponseData } from './post.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();
  private baseUrl =
    'http://postapp-env.eba-8jgbmip3.us-west-2.elasticbeanstalk.com/api';
  maxPosts = 0;

  constructor(private http: HttpClient, private router: Router) {}

  getPost(id: string): Observable<ResponseData> {
    return this.http.get<ResponseData>(this.baseUrl + `/post/${id}`);
  }
  getPosts(postPerPage: number, currentPage: number): void {
    const queryParams = `?pagesize=${postPerPage}&page=${currentPage}`;
    this.http
      .get<ResponseData>(this.baseUrl + '/posts' + queryParams)
      .pipe(
        map((data: ResponseData) => {
          if (data.maxPosts) {
            this.maxPosts = data.maxPosts;
          }
          const resData: Post[] = data.data.map((post: Post) => {
            return {
              title: post.title,
              content: post.content,
              id: post._id,
              imagePath: post.imagePath,
              creator: post.creator,
            };
          });
          return resData;
        })
      )
      .subscribe((post: Post[]) => {
        this.posts = post;
        this.postUpdated.next([...this.posts]);
      });
  }
  getPostUpdateListener(): Observable<Post[]> {
    return this.postUpdated.asObservable();
  }
  addPost(post: Post, image: File): void {
    const postData = new FormData();
    postData.append('title', post.title);
    postData.append('content', post.content);
    postData.append('image', image, post.title);
    this.http
      .post<ResponseData>(this.baseUrl + '/post', postData)
      .subscribe((response: ResponseData) => {
        const createdPost: Post = response.data[0];
        this.posts.push(createdPost);
        this.postUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }
  updatePost(post: Post): void {
    this.http
      .patch(this.baseUrl + `/post/${post.id}`, post)
      .subscribe((response: any) => {
        this.router.navigate(['/']);
      });
  }
  deletePost(postId: string): void {
    this.http
      .delete<ResponseData>(this.baseUrl + `/post/${postId}`)
      .subscribe((result: ResponseData) => {
        this.posts = this.posts.filter((post: Post) => post.id !== result.id);
        this.postUpdated.next([...this.posts]);
      });
  }
}
