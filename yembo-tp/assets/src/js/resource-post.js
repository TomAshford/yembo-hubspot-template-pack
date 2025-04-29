/* read time blog post */

function calculateReadingTime(text) {
  const wordCount = text.replace(/[^\w ]/g, '').split(/\s+/).length;
  return Math.floor(wordCount / 228) + 1;
}

function updateReadingTime() {
  const postContent = document.querySelector('.postContent');
  const detailsTimeElement = document.querySelector('.postReadTime span');

  if (detailsTimeElement && postContent) {
    const text = postContent.textContent;
    const readingTimeInMinutes = calculateReadingTime(text);
    const readingTimeAsString = `${readingTimeInMinutes} minute${readingTimeInMinutes === 1 ? '' : 's'}`;
    detailsTimeElement.textContent = readingTimeAsString;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const readTime = document.querySelector('.postReadTime');
  if (readTime) {
    updateReadingTime();
  }
});
