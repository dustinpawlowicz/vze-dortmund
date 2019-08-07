import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RoadConditionRecordingPage } from './road-condition-recording.page';

const routes: Routes = [
  {
    path: '',
    component: RoadConditionRecordingPage,
    children: [
      {
        path: 'basic-data',
        children: [
          {
            path: '',
            loadChildren: './../road-condition-recording/basic-data/basic-data.module#BasicDataPageModule'
          }
        ]
      },
      {
        path: 'characteristics',
        children: [
          {
            path: '',
            loadChildren: './../road-condition-recording/characteristics/characteristics.module#CharacteristicsPageModule'
          }
        ]
      },
      {
        path: 'comments',
        children: [
          {
            path: '',
            loadChildren: './../road-condition-recording/comments/comments.module#CommentsPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/recording/basic-data',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/recording/basic-data',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RoadConditionRecordingPage]
})
export class RoadConditionRecordingPageModule {}
