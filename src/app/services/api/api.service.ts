import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly API_URL: string = 'http://192.168.1.5:3000/api';
  private defaultOptions: any;

  constructor(public http: HttpClient) {
    this.defaultOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
  }

  /**
   * post - POST-Request to the 'rest-api-vze-dortmund' RESTful API
   *
   * @param endpoint  endpoint of the API request
   * @param body      transmitted data in the body of the request
   * @param options   http options for the respective request
   *
   * Note: Prevent multiple request and share observable among subscribers
   */
  public post(endpoint: string, body: any, options?: any): Observable<any> {
    return this.http.post(this.API_URL + endpoint, body, (options ? options : this.defaultOptions)).pipe(share());
  }

  /**
   * get - GET-Request to the 'rest-api-vze-dortmund' RESTful API
   *
   * @param endpoint  endpoint of the API request
   * @param options   http options for the respective request
   *
   * Note: Prevent multiple request and share observable among subscribers
   */
  public get(endpoint: string, options?: any): Observable<any> {
    return this.http.get(this.API_URL + endpoint, (options ? options : this.defaultOptions)).pipe(share());
  }
}
