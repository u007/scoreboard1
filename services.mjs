import { COURSES } from './data.mjs';

const userCompletion = [];

export const getChapter = (courseSlug, moduleSlug, chapterSlug) => {
  const course = COURSES.find((course) => course.slug === courseSlug);
  if (!course) {
    throw new Error('Course not found');
  }

  const module = course.modules.find((module) => module.slug === moduleSlug);
  if (!module) {
    throw new Error('Module not found');
  }

  const chapter = module.chapters.find((chapter) => chapter.slug === chapterSlug);
  if (!chapter) {
    throw new Error('Chapter not found');
  }

  return chapter;
};

export const retrieveChapter = (courseSlug, moduleSlug, chapterSlug) => {
  const chapter = getChapter(courseSlug, moduleSlug, chapterSlug);

  if (chapter.prerequisites) {
    for (let p = 0; p < chapter.prerequisites.length; p++) {
      const prerequisite = chapter.prerequisites[p];
      const isCompleted = getIsCompleted(prerequisite.courseSlug, prerequisite.moduleSlug, prerequisite.chapterSlug);
      if (!isCompleted) {
        console.error('Chapter prerequisites not met', prerequisite, userCompletion);
        throw new Error('Chapter prerequisites not met');
      }
    }
  }
  return chapter;
};

export const getIsCompleted = (courseSlug, moduleSlug, chapterSlug) => {
  return !!userCompletion.find(
    (c) => c.chapterSlug === chapterSlug && c.moduleSlug === moduleSlug && c.courseSlug === courseSlug
  );
};

export const completeChapter = (courseSlug, moduleSlug, chapterSlug) => {
  if (
    userCompletion.find(
      (c) => c.chapterSlug === chapterSlug && c.moduleSlug === moduleSlug && c.courseSlug === courseSlug
    )
  ) {
    return;
  }

  userCompletion.push({ courseSlug, moduleSlug, chapterSlug });
};

export const getCourseProgress = (courseSlug) => {
  const course = COURSES.find((course) => course.slug === courseSlug);
  if (!course) {
    // return res.status(404).json({ error: 'Course not found' });
    throw new Error('Course not found');
  }

  const completed = userCompletion.filter((c) => c.courseSlug === courseSlug);
  let durationCompleted = 0;
  for (let c = 0; c < completed.length; c++) {
    const chapter = course.modules
      .find((module) => module.slug === completed[c].moduleSlug)
      .chapters.find((chapter) => chapter.slug === completed[c].chapterSlug);

    if (!chapter) {
      throw new Error('Chapter not found');
    }

    durationCompleted += chapter.duration;
  }

  const courseDuration = course.modules.reduce((acc, module) => {
    return acc + module.chapters.reduce((acc, chapter) => acc + chapter.duration, 0);
  }, 0);

  const progress = Math.round((durationCompleted / courseDuration) * 100);

  return { durationCompleted, progress, courseDuration };
};
