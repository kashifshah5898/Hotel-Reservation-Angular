import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

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
}
