import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';

import { NavigationComponent } from './shared/header-navigation/navigation.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { Approutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './shared/spinner.component';

import { AuthGuard } from './core/guards/auth.guard';
import { UserService } from './core/services/user.service';
import { StudentService } from './core/services/student.service';
import { ErrorInterceptor } from './core/helpers/error.interceptor';
import { JwtInterceptor  } from './core/helpers/jwt.interceptor';
import { AuthenticationService } from './core/services/authentication.services';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true,
};

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    FullComponent,
    BlankComponent,
    NavigationComponent,
    BreadcrumbComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,   
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(Approutes, { enableTracing: true }),  
    PerfectScrollbarModule
  ],
  providers: [
    FormBuilder,
    AuthGuard,
    UserService,
    StudentService,
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
      {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
