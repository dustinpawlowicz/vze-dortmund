import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'keyToFilename' })
export class KeyToFilenamePipe implements PipeTransform {

  /**
   * transform - Transoforms a key into a filename by replacing the underscore with minus.
   *
   * @param value string to be transformed
   */
  transform(value: string): string {
    return value.replace(/_/g, '-');
  }
}
