import { IncorrectDataError } from './../../../errors/incorrect-data-error';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Comment } from './../../../interfaces/comment';
import { HelperService } from './../../../services/helper/helper.service';
import { RoadConditionRecordingService } from 'src/app/services/road-condition-recording/road-condition-recording.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { uniqueComment } from 'src/app/helpers/validators';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {
  public commentsForm: FormGroup;
  public defaultComments: Comment[] = new Array<Comment>();
  public comments: string[] = new Array<string>();

  constructor(
    private router: Router,
    private helperService: HelperService,
    private formBuilder: FormBuilder,
    private roadConditionRecordingService: RoadConditionRecordingService) { }

  ngOnInit(): void {
    try {
      this.defaultComments = this.roadConditionRecordingService.getComments();

      this.commentsForm = this.formBuilder.group({
        comment: new FormControl('', [
          Validators.minLength(1),
          uniqueComment(this.comments, this.defaultComments)
        ])
      });
    } catch (error) {
      this.helperService.handleError(error);
    }
  }

  /**
   * toggleComment - Add or remove a comment, depending on the existence within the entered comments.
   */
  public toggleComment(comment: string): void {
    const index = this.comments.indexOf(comment, 0);
    if (index > -1) {
      this.comments.splice(index, 1);
    } else {
      this.comments.push(comment);
    }
  }

  public getCustomComments(): string[] {
    return this.comments.filter(comment => !this.defaultComments.find(defaultComment => defaultComment.text === comment));
  }

  /**
   * submitComment - Add a comment to the array of entered comments.
   */
  public submitComment(): void {
    try {
      if (!this.commentsForm.valid) {
        throw new IncorrectDataError();
      }

      this.comments.push(this.commentsForm.controls.comment.value);
      this.commentsForm.controls.comment.setValue('');
    } catch (error) {
      this.helperService.handleError(error);
    }
  }

  /**
   * completeComments - Complete comments and the process of registering a road condition.
   */
  public async completeComments(): Promise<void> {
    try {
      const isCompleted = await this.roadConditionRecordingService.completeComments(this.comments);
      if (!isCompleted) {
        throw new IncorrectDataError();
      }

      this.helperService.displaySuccessMessage('ROAD_CONDITION_REGISTERED');
      this.router.navigate(['/home']);
    } catch (error) {
      this.helperService.handleError(error);
    }
  }

  /**
   * cancelRecording - Cancel the process of registering a road condition.
   */
  public cancelRecording(): void {
    this.router.navigate(['/home']);
  }
}
