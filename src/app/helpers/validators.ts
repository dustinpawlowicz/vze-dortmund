import { Comment } from './../interfaces/comment';
import { FormGroup, ValidationErrors } from '@angular/forms';

/**
 * validCurrentOrPastDate - Validation to ensure that the date is not in the future.
 *
 * @param checkTime boolean whether the time is also checked.
 * @return          the validation result, null or ValidationErrror
 */
export function validCurrentOrPastDate(checkTime?: boolean) {
    return (formGroup: FormGroup): ValidationErrors | null => {
        const value: Date = new Date(formGroup.value);

        if (formGroup.value === null || formGroup.value === '') {
            return;
        }

        const isValidDate = validDate(value);
        if (isValidDate && !checkTime) {
            value.setHours(0, 0, 0, 0);
        }

        if (!isValidDate || value.getTime() > new Date().getTime()) {
            return ({ dateCurrentOrPast: true });
        } else {
            return (null);
        }
    };
}

/**
 * validCurrentOrFutureDate - Validation to ensure that the date is not in the past.
 *
 * @param checkTime boolean whether the time is also checked.
 * @return          the validation result, null or ValidationErrror
 */
export function validCurrentOrFutureDate(checkTime?: boolean) {
    return (formGroup: FormGroup): ValidationErrors | null => {
        const value: Date = new Date(formGroup.value);

        if (formGroup.value === null || formGroup.value === '') {
            return;
        }

        const isValidDate = validDate(value);
        if (isValidDate && !checkTime) {
            value.setHours(23, 59, 59, 999);
        }

        if (!isValidDate || value.getTime() < new Date().getTime()) {
            return ({ dateCurrentOrFuture: true });
        } else {
            return (null);
        }
    };
}

/**
 * beginDateBeforeEndDate - Checks within the FormGroup if the FormControl "begin" is in time before the field "end".
 *
 * @param begin begin control name.
 * @param end   end control name.
 * @return      the validation result, null or ValidationErrror
 */
export function beginDateBeforeEndDate(begin: string, end: string) {
    return (formGroup: FormGroup): ValidationErrors | null => {
        const begindate: Date = new Date(formGroup.get(begin).value);
        const endDate: Date = new Date(formGroup.get(end).value);
        if (formGroup.value === null || formGroup.value === '' || !validDate(endDate)) {
            return;
        }

        if (!validDate(begindate) || begindate.getTime() > endDate.getTime()) {
            return ({ dateBeforeEndDate: true });
        } else {
            return (null);
        }
    };
}

/**
 * validDate - Checks if the given date is a valid Date type.
 *
 * @param date 'Date' to be checked
 * @return      boolean whether of type 'Date' or not
 */
function validDate(date: Date) {
 return date instanceof Date && !isNaN(date.getTime());
}

/**
 * validNumberRange - Validates whether a number lies within a given range.
 *
 * @param min   range begin.
 * @param max   range end.
 * @return      boolean whether the number is within the range
 */
export function validNumberRange(min: number, max: number) {
    return (formGroup: FormGroup): ValidationErrors | null => {
        const value = Number(formGroup.value);

        if (formGroup.value === null || formGroup.value === '' ||  isNaN(value)) {
            return;
        }

        if (value < min || value > max) {
            return ({ numberRange: true });
        } else {
            return (null);
        }
    };
}

/**
 * uniqueComment - Validates whether the comment is unique or has already been entered.
 *
 * @param comments          Array of comments entered
 * @param defaultComments   Array of predefined comments that therefore have already been entered.
 * @return                  boolean whether the comments is unique or not
 */
export function uniqueComment(comments: string[], defaultComments: Comment[]) {
    return (formGroup: FormGroup): ValidationErrors | null => {
        const index = comments.indexOf(formGroup.value, 0);
        if (index > -1 || !!defaultComments.find(defaultComment => defaultComment.text === formGroup.value)) {
            return ({ uniqueComment: true });
        } else {
            return (null);
        }
    };
}
