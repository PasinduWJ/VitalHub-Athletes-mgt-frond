import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {
  GET_ALL_ATHLETE,
  GET_COMMON_ATHLETE_PAGE_DATA,
  GET_SEARCH_ATHLETE,
  getEndPoint,
  POST_ATHLETE_CREATE
} from "../core/common/constant";
import {Observable} from "rxjs";
import AthleteDto from "../dto/AthleteDto";

@Injectable({
  providedIn: 'root'
})
export class AthleteService {

  private readonly post_create_athlete_url: string;
  private readonly get_all_athlete_url: string;
  private readonly get_search_athlete_url: string;
  private readonly get_common_athlete_pge_data_url: string;

  constructor(private http: HttpClient) {
    this.post_create_athlete_url = getEndPoint(POST_ATHLETE_CREATE);
    this.get_all_athlete_url = getEndPoint(GET_ALL_ATHLETE);
    this.get_search_athlete_url = getEndPoint(GET_SEARCH_ATHLETE);
    this.get_common_athlete_pge_data_url = getEndPoint(GET_COMMON_ATHLETE_PAGE_DATA);
  }

  public createAthlete(athlete: AthleteDto): Observable<any> {
    return this.http.post(this.post_create_athlete_url, athlete);
  }

  public getAllAthlete(): Observable<any> {
    return this.http.get(this.get_all_athlete_url);
  }

  public getAllCommonData(): Observable<any> {
    return this.http.get(this.get_common_athlete_pge_data_url);
  }

  public getSearchAthlete(name:string , country:string, gender:string, event:string): Observable<any> {
    let params = new HttpParams();
    params = params.append('name', name);
    params = params.append('country', country);
    params = params.append('gender', gender);
    params = params.append('event', event);
    return this.http.get(this.get_search_athlete_url, {params:params});
  }

}
