import { COURSES } from './data.mjs';
import express from 'express';
import { getChapter, getIsCompleted, completeChapter, getCourseProgress } from './services.mjs';

const app = express();

// getting a chapter
app.get('/api/courses/:courseSlug/modules/:moduleSlug/chapters/:chapterSlug', (req, res) => {
  const { courseSlug, moduleSlug, chapterSlug } = req.params;
  try {
    const chapter = getChapter(courseSlug, moduleSlug, chapterSlug);

    if (chapter.prerequisites) {
      for (let p = 0; p < chapter.prerequisites.length; p++) {
        const prerequisite = chapter.prerequisites[p];
        const isCompleted = getIsCompleted(prerequisite.courseSlug, prerequisite.moduleSlug, prerequisite.chapterSlug);
        if (!isCompleted) {
          return res.status(400).json({ error: 'Chapter prerequisites not met' });
        }
      }
    }

    return res.json({ chapter, success: true });
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
});

// mark completed
app.patch('/api/courses/:courseSlug/modules/:moduleSlug/chapters/:chapterSlug/complete', (req, res) => {
  const { courseSlug, moduleSlug, chapterSlug } = req.params;

  let chapter;
  try {
    chapter = getChapter(courseSlug, moduleSlug, chapterSlug);
  } catch (err) {
    return res.status(404).error({ error: err.message });
  }

  if (chapter.prerequisites) {
    for (let p = 0; p < chapter.prerequisites.length; p++) {
      const prerequisite = chapter.prerequisites[p];
      const isCompleted = getIsCompleted(prerequisite.courseSlug, prerequisite.moduleSlug, prerequisite.chapterSlug);
      if (!isCompleted) {
        return res.status(400).json({ error: 'Chapter prerequisites not met' });
      }
    }
  }

  if (
    userCompletion.find(
      (c) => c.chapterSlug === chapterSlug && c.moduleSlug === moduleSlug && c.courseSlug === courseSlug
    )
  ) {
    return res.status(400).json({ error: 'Chapter already completed' });
  }

  completeChapter(courseSlug, moduleSlug, chapterSlug);

  return res.json({ success: true });
});

// get course progress
app.get('/api/courses/:courseSlug/progress', (req, res) => {
  const { courseSlug } = req.params;

  const res = getCourseProgress(courseSlug);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
