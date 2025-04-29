document.addEventListener('DOMContentLoaded', function () {

  // adding tabindexing to cookie banner

  function bannerLinks() {
    const cookieBanner = document.querySelector('#hs-eu-cookie-confirmation-inner');
    if (cookieBanner) {
      const focusableElements = cookieBanner.querySelectorAll('a, button, [role="button"], [tabindex]');
      focusableElements.forEach((element, index) => {
        element.setAttribute('tabindex', index + 1);
      });
    }
  }

  // using MutationObserver as cookie banner is loaded dynamically
  const observer = new MutationObserver(() => {
    const cookieBanner = document.querySelector('#hs-eu-cookie-confirmation-inner');
    if (cookieBanner) {
      bannerLinks();
      observer.disconnect(); // Stop observing once the banner is found
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

});
