import {Pipe, PipeTransform} from '@angular/core';
import {Observable, of} from "rxjs";
import {UsersService} from "../../core/services/users/users.service";
import {catchError, map} from "rxjs/operators";
import {User} from "../../core/model/user";

@Pipe({
  name: 'resolveName'
})
export class ResolveNamePipe implements PipeTransform {
  constructor(private usersService: UsersService) {
  }

  transform(value: string, users?: User[]): Observable<string> {
    if(!users) {
      return of('No name found!');
    } else if (users?.some(u => u.discordId === value || u.universityId === value)) {
      return of(users.find(u => u.discordId === value || u.universityId === value).name);
    } else {
      return this.usersService.getUserFromCode(value).pipe(map(u => u.name), catchError(error => of('No name found!')))
    }
  }
}
