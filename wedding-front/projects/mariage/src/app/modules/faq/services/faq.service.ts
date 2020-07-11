import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  constructor(private readonly http: HttpClient) {
  }

  public getCategories(type:string) {
    return this.http.get(`https://cms-api-dot-mariage-serein-2019.ew.r.appspot.com/categories`,
      {
        params:{
          type
        }
      });
  }

  public findCategory(type: string, libelle: string) {
    // @ts-ignore
    libelle = libelle.replaceAll('-', ' ');
    return this.http.get(`https://cms-api-dot-mariage-serein-2019.ew.r.appspot.com/categories`,
      {
        params: {
          type,
          libelle
        }
      });
  }


  public findSubCategory(type: string, category: string, subCategory: string) {

    // @ts-ignore
    const libelle = subCategory.replaceAll('-', ' ');
    // @ts-ignore
    const categoryLibelle = category.replaceAll('-', ' ');

    return this.http.get(`https://cms-api-dot-mariage-serein-2019.ew.r.appspot.com/sous-categories`,
      {
        params: {
          libelle,
          'category.libelle': categoryLibelle,
          'category.type': type
        }
      });

  }


}


