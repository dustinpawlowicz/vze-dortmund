import { AdminAuthenticationGuard } from './guards/admin-authentication/admin-authentication.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './guards/authentication/authentication.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'tutorial', loadChildren: './pages/tutorial/tutorial.module#TutorialPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LogInPageModule' },
  {
    path: 'home',
    loadChildren: './pages/home/home.module#HomePageModule',
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'recording',
    loadChildren: './pages/road-condition-recording/road-condition-recording.module#RoadConditionRecordingPageModule',
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'change-password',
    loadChildren: './pages/change-password/change-password.module#ChangePasswordPageModule',
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'registration',
    loadChildren: './pages/registration/registration.module#RegistrationPageModule',
    canActivate: [AdminAuthenticationGuard]
  },
  {
    path: 'edit-user',
    loadChildren: './pages/edit-user/edit-user.module#EditUserPageModule',
    canActivate: [AdminAuthenticationGuard]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
