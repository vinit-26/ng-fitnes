import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { PostsService } from './../posts.service';
import { Post } from '../post.model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  isLoading = false;
  private postSubscription: Subscription;
  pageSizeOptions = [2, 5, 10, 20, 100];
  postPerPage = 2;
  currentPage = 1;
  totalPosts = 0;
  isAuthenticated = false;
  userId: string | null;
  constructor(
    private postsService: PostsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.isLoading = true;
    this.postSubscription = this.postsService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.totalPosts = this.postsService.maxPosts;
        this.isLoading = false;
      });
    this.isAuthenticated = this.authService.getIsAuth();
    this.authService.getAuthStatusListner().subscribe((isAuth) => {
      if (isAuth) {
        this.isAuthenticated = isAuth;
        this.userId = this.authService.getUserId();
      }
    });
    this.postsService.getPosts(this.postPerPage, this.currentPage);
  }
  onDeletePost(postId: string): void {
    this.postsService.deletePost(postId);
  }
  onPageChange(pageData: PageEvent): void {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postPerPage, this.currentPage);
  }
  ngOnDestroy(): void {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }
}
