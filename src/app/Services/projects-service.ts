import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000';

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/categories`);
  }
  getAllProjects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/projects`);
  }
  getProjectsByCategory(category: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/projects?category=${category}`);
  }
  getProjectById(projectId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/projects/${projectId}`);
  }
  addProject(project: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/projects`, project);
  }
  editProject(projectId: number, project: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/projects/${projectId}`, project);
  }
  deleteProject(projectId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/projects/${projectId}`);
    
  }
}
