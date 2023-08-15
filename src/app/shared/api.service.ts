import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  myId = this.utils.getLocalStorageData().id;

  constructor(private http: HttpClient, private utils: UtilsService) {}

  login(data: any) {
    return this.http.post(`${environment.baseUrl}/users/login`, data);
  }

  getRoomsApi() {
    return this.http.get(`${environment.baseUrl}/rooms/getRooms`);
  }

  signUpApi(data: any) {
    return this.http.post(`${environment.baseUrl}/users/addUser`, data);
  }

  getRoomAPI(id: any) {
    return this.http.get(`${environment.baseUrl}/rooms/getRooms?id=${id}`);
  }

  bookRoomAPI(data: any) {
    return this.http.post(`${environment.baseUrl}/booking/createBooking`, data);
  }

  getUsersAPI() {
    return this.http.get(`${environment.baseUrl}/users/`);
  }

  deleteUserAPI(id: any) {
    return this.http.delete(`${environment.baseUrl}/users/deleteUser/${id}`);
  }

  getMeAPI(id: any) {
    return this.http.get(`${environment.baseUrl}/users?id=${id}`);
  }

  updateUserAPI(id: any, data: any) {
    return this.http.put(`${environment.baseUrl}/users/${id}`, data);
  }

  updateUserPasswordAPI(id: any, data: any) {
    return this.http.put(
      `${environment.baseUrl}/users/updateUserPassword/${id}`,
      data
    );
  }

  getMyRoomsAPI() {
    return this.http.get(
      `${environment.baseUrl}/booking/myBookings?id=${this.myId}`
    );
  }

  cancelBookingAPI(id: any) {
    return this.http.delete(
      `${environment.baseUrl}/booking/deleteBooking?id=${id}`
    );
  }

  updateRoomAPI(id: any, data: any) {
    return this.http.put(
      `${environment.baseUrl}/rooms/updateRoom?id=${id}`,
      data
    );
  }

  addRoomAPI(data: any) {
    return this.http.post(`${environment.baseUrl}/rooms/createRoom`, data);
  }

  deleteRoomAPI(data: any) {
    return this.http.delete(
      `${environment.baseUrl}/rooms/deleteRoom?id=${data}`,
      data
    );
  }

  getMyCardAPI() {
    return this.http.get(
      `${environment.baseUrl}/creditCard/getCreditCardDetails?userId=${this.myId}`
    );
  }

  addMyCardAPI(data: any) {
    return this.http.post(
      `${environment.baseUrl}/creditCard/createCreditCardDetails`,
      data
    );
  }

  updateCreditCardDetailsAPI(data: any) {
    return this.http.put(
      `${environment.baseUrl}/creditCard/updateCreditCardDetails`,
      data
    );
  }
}
