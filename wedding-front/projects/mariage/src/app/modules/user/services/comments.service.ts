import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {


  constructor(private readonly http: HttpClient) { }

  public postResponse(id: string,content:string) {
    return this.http.post(`${environment.apiUrl}/comments/${id}/response`, {
      content
    });
  }

  public addComment(body: any) {
    return this.http.post(`${environment.apiUrl}/comments/`, body);
  }

  public updateResponse(commentId: string, id: string, content: string) {
    return this.http.put(`${environment.apiUrl}/comments/${commentId}/response/${id}`, {
      content
    });
  }

  public updateComment(commentId: string, body:any) {
    return this.http.put(`${environment.apiUrl}/comments/${commentId}`, body);
  }

  public deleteResponse(commentId: string, id: string) {
    return this.http.delete(`${environment.apiUrl}/comments/${commentId}/response/${id}`);
  }

  public deleteComment(commentId: string) {
    return this.http.delete(`${environment.apiUrl}/comments/${commentId}`);
  }

}
