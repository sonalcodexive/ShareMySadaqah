import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { AccordionComponent } from './home/accordion/accordion.component';
import { SliderComponent } from './home/slider/slider.component';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabsComponent } from './tabs/tabs.component';
import { TabModule } from 'angular-tabs-component';
import { CharityTabComponent } from './tabs/charitytab/charitytab.component';
import { BelovedtabComponent } from './tabs/belovedtab/belovedtab.component';
import { GifttabComponent } from './tabs/gifttab/gifttab.component';
import { SharetabComponent } from './tabs/sharetab/sharetab.component';
import { BaraqahtabComponent } from './tabs/baraqahtab/baraqahtab.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AliveComponent } from './tabs/belovedtab/alive/alive.component';
import { MemoryComponent } from './tabs/belovedtab/memory/memory.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { BaraqahaccordionComponent } from './tabs/baraqahtab/baraqahaccordion/baraqahaccordion.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from './shared/api.service';
import { AuthService } from './shared/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ToastService } from './shared/toasts-container/toast-service';
import { ToastsContainer } from './shared/toasts-container/toasts-container.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tabs', component: TabsComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'thankyou', component: ThankyouComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SignupComponent,
    SigninComponent,
    SliderComponent,
    AccordionComponent,
    TabsComponent,
    CharityTabComponent,
    BelovedtabComponent,
    GifttabComponent,
    SharetabComponent,
    BaraqahtabComponent,
    AliveComponent,
    MemoryComponent,
    ThankyouComponent,
    BaraqahaccordionComponent,
    ToastsContainer
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    TabModule,
    FlexLayoutModule,
    CarouselModule,
    AccordionModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    FontAwesomeModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [ApiService, AuthService,ToastService],
  bootstrap: [AppComponent]
})
export class AppModule { }