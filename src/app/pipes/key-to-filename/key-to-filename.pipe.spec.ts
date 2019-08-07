import { KeyToFilenamePipe } from './key-to-filename.pipe';

describe('KeyToFilenamePipe', () => {
  it('create an instance', () => {
    const pipe = new KeyToFilenamePipe();
    expect(pipe).toBeTruthy();
  });
});
