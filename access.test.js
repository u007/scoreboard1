import { retrieveChapter, completeChapter } from './services.mjs';

describe('access courses', () => {
  it('should accessible chapter', () => {
    const chapter = retrieveChapter('course-1', 'module-1', 'chapter-1');
    expect(chapter).toBeTruthy();

    expect(() => {
      const chapter2 = retrieveChapter('course-1', 'module-1', 'chapter-3');
    }).toThrow();

    completeChapter('course-1', 'module-1', 'chapter-1');

    const chapter2 = retrieveChapter('course-1', 'module-1', 'chapter-2');
    expect(chapter2).toBeTruthy();

    expect(() => {
      const chapter3 = retrieveChapter('course-1', 'module-1', 'chapter-3');
    }).toThrow();
  });
});
