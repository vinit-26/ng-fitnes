export interface Post {
  _id?: string;
  id?: string;
  title: string;
  content: string;
  imagePath?: string;
  creator?: string;
}

export interface ResponseData {
  status: number;
  error: boolean;
  message: string;
  data: Post[];
  id?: string;
  maxPosts?: number;
}
