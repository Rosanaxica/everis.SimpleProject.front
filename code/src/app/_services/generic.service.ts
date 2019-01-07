import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { AbstractDataService } from './abstract-data.service';


@Injectable()
export class GenericService extends AbstractDataService {

  constructor(http: HttpService)
  { super(http)}
}
