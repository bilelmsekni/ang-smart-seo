import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class SeoService {

    // tslint:disable-next-line:max-line-length
    private frSeoAdr = `https://trends.google.com/trends/api/widgetdata/relatedsearches?hl=fr&tz=-120&req=%7B%22restriction%22:%7B%22geo%22:%7B%7D,%22time%22:%222012-06-27+2017-06-27%22,%22complexKeywordsRestriction%22:%7B%22keyword%22:%5B%7B%22type%22:%22BROAD%22,%22value%22:%22immobilier%22%7D%5D%7D%7D,%22keywordType%22:%22QUERY%22,%22metric%22:%5B%22TOP%22,%22RISING%22%5D,%22trendinessSettings%22:%7B%22compareTime%22:%222007-06-27+2012-06-26%22%7D,%22requestOptions%22:%7B%22property%22:%22%22,%22backend%22:%22IZG%22,%22category%22:0%7D,%22language%22:%22fr%22%7D&token=APP6_UEAAAAAWVPEv1nOlC3SgFVOOslIIFJL-WX-O3Hc`;
    private enSeoAdr = `https://trends.google.com/trends/api/widgetdata/relatedsearches?hl=en&tz=-120&req=%7B%22restriction%22:%7B%22geo%22:%7B%7D,%22time%22:%222012-06-27+2017-06-27%22,%22complexKeywordsRestriction%22:%7B%22keyword%22:%5B%7B%22type%22:%22BROAD%22,%22value%22:%22immobilier%22%7D%5D%7D%7D,%22keywordType%22:%22QUERY%22,%22metric%22:%5B%22TOP%22,%22RISING%22%5D,%22trendinessSettings%22:%7B%22compareTime%22:%222007-06-27+2012-06-26%22%7D,%22requestOptions%22:%7B%22property%22:%22%22,%22backend%22:%22IZG%22,%22category%22:0%7D,%22language%22:%22fr%22%7D&token=APP6_UEAAAAAWVPEv1nOlC3SgFVOOslIIFJL-WX-O3Hc`;
    constructor(private http: Http) { }

    getKeywords(): Observable<string> {
        return this.getRegion()
            .do(res => console.log(res))
            .switchMap(res => this.getKeywordsByRegion(res[0]))
            .do(res => console.log(res))
    }

    getKeywordsByRegion(arg: string): Observable<string> {
        if (arg === 'fr-Fr') {
            return this.http.get('https://api-adresse.data.gouv.fr/search/?q=eiffel tower')
                .map((res: Response) => res.json() as any)
                .map(res => res.query);
        } else {
            return this.http.get('https://api-adresse.data.gouv.fr/search/?q=downing street')
                .map((res: Response) => res.json() as any)
                .map(res => res.query);
        }
    }

    getRegion(): Observable<string[]> {
        return this.http.get('http://localhost:4000/region')
            .map((res: Response) => res.json() as any)
            .map(res => res.lang.split(';'));
    }
}
