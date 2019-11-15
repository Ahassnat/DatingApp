import { Injectable } from '@angular/core';

declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

constructor() { }

// add methods that we will use from the alertify library
    // () => any = annonymous function called after the confirmed dialog has been confirmed
confirm(message: string, okCallback: () => any) {
  alertify.confirm(message, function(e) {
    if (e) {
      // call function when the user confirms
      okCallback();
    } else {}
  });
}

success(message: string) {
  alertify.success(message);
}

error(message: string) {
  alertify.error(message);
}

warning(message: string) {
  alertify.warning(message);
}

message(message: string) {
  alertify.message(message);
}

}
