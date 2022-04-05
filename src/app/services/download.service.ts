import { Injectable, Inject } from '@angular/core'
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http'
import { download, Download } from './download'
import {catchError, map} from 'rxjs/operators'
import {Observable, of} from 'rxjs'
import { SAVER, Saver } from './saver.provider'

@Injectable({providedIn: 'root'})
export class DownloadService {

    constructor(
        private http: HttpClient,
        @Inject(SAVER) private save: Saver
    ) {
    }

    download(url: string, filename?: string): Observable<Download | null> {
        const headers = new HttpHeaders()
            .append('Content-Type', 'application/json')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('Access-Control-Allow-Origin', '*');
        return this.http.get(url, {
            headers,
            reportProgress: true,
            observe: 'events',
            responseType: 'blob'
        }).pipe(
            download(blob => this.save(blob, filename)),
            catchError((error => {

                return of(null)
            }))
        )
    }
}