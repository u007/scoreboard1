export const COURSES = [
  {
    title: 'Course 1',
    slug: 'course-1',
    modules: [
      {
        title: 'Module 1',
        slug: 'module-1',
        chapters: [
          { title: 'Chapter 1', slug: 'chapter-1', duration: 10 },
          {
            title: 'Chapter 2',
            slug: 'chapter-2',
            duration: 3,
            prerequisites: [
              {
                courseSlug: 'course-1',
                moduleSlug: 'module-1',
                chapterSlug: 'chapter-1',
              },
            ],
          },
          {
            title: 'Chapter 3',
            slug: 'chapter-3',
            duration: 1,
            prerequisites: [
              {
                courseSlug: 'course-1',
                moduleSlug: 'module-1',
                chapterSlug: 'chapter-2',
              },
            ],
          },
          {
            title: 'Chapter 4',
            slug: 'chapter-4',
            duration: 12,
            prerequisites: [
              {
                courseSlug: 'course-1',
                moduleSlug: 'module-1',
                chapterSlug: 'chapter-3',
              },
            ],
          },
          {
            title: 'Chapter 5',
            slug: 'chapter-5',
            duration: 5,
            prerequisites: [
              {
                courseSlug: 'course-1',
                moduleSlug: 'module-1',
                chapterSlug: 'chapter-4',
              },
            ],
          },
        ],
      },
      {
        title: 'Module 2',
        slug: 'module-2',
        chapters: [
          {
            title: 'Chapter 1',
            slug: 'chapter-1',
            duration: 10,
            prerequisites: [
              {
                courseSlug: 'course-1',
                moduleSlug: 'module-1',
                chapterSlug: 'chapter-5',
              },
            ],
          },
          {
            title: 'Chapter 2',
            slug: 'chapter-2',
            duration: 3,
            prerequisites: [
              {
                courseSlug: 'course-1',
                moduleSlug: 'module-2',
                chapterSlug: 'chapter-1',
              },
            ],
          },
          {
            title: 'Chapter 3',
            slug: 'chapter-3',
            duration: 1,
            prerequisites: [
              {
                courseSlug: 'course-1',
                moduleSlug: 'module-2',
                chapterSlug: 'chapter-2',
              },
            ],
          },
          {
            title: 'Chapter 4',
            slug: 'chapter-4',
            duration: 12,
            prerequisites: [
              {
                courseSlug: 'course-1',
                moduleSlug: 'module-2',
                chapterSlug: 'chapter-3',
              },
            ],
          },
          {
            title: 'Chapter 5',
            slug: 'chapter-5',
            duration: 5,
            prerequisites: [
              {
                courseSlug: 'course-1',
                moduleSlug: 'module-2',
                chapterSlug: 'chapter-4',
              },
            ],
          },
        ],
      },
    ],
  },
];
