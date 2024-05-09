import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { CareComponent } from './pages/care/care.component';
import { ParfumeComponent } from './pages/parfume/parfume.component';
import { MakeupComponent } from './pages/makeup/makeup.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: "care", component: CareComponent},
  { path: "makeup", component: MakeupComponent},
  { path: "parfume", component: ParfumeComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CareComponent,
    ParfumeComponent,
    MakeupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }