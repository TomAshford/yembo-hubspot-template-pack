document.addEventListener("DOMContentLoaded", function() {

  // Honeypot Implementation
  var honeypot = document.querySelector('input[name="honeypot"]');
  if (honeypot) {
    honeypot.style.display = 'none';
    honeypot.parentElement.style.display = 'none';
  }

  // HubSpot Form Validation for Phrase Detection
  const forbiddenPhrases = [
    "Reply with STOP to optout",
    "optout",
    "unsubscribe"
  ];

  // Observe the document for new form additions
  const observer = new MutationObserver(function(mutationsList) {
    mutationsList.forEach(function(mutation) {
      mutation.addedNodes.forEach(function(node) {
        if (node.nodeType === 1 && node.matches('.hs-form')) {
          initializeFormValidation(node);
        }
      });
    });
  });

  // Configure the observer to watch for added nodes in the body
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  function initializeFormValidation(form) {
    const submitButton = form.querySelector('input[type="submit"]');
    const actionsContainer = form.querySelector('.actions');

    form.querySelectorAll('input[type="text"], textarea').forEach(function(field) {
      function validateField(field) {
        let containsForbiddenText = forbiddenPhrases.some(phrase =>
          field.value.toLowerCase().includes(phrase.toLowerCase())
        );

        if (containsForbiddenText) {
          if (actionsContainer) {
            actionsContainer.classList.add('disabled');
          }
          if (submitButton) {
            submitButton.classList.add('disabled');
            submitButton.setAttribute('disabled', 'disabled');
          }
        } else {
          const otherFieldsContainForbidden = Array.from(form.querySelectorAll('input[type="text"], textarea'))
          .some(f => forbiddenPhrases.some(phrase =>
              f.value.toLowerCase().includes(phrase.toLowerCase())
          ));
          if (!otherFieldsContainForbidden) {
            if (actionsContainer) {
              actionsContainer.classList.remove('disabled');
            }
            if (submitButton) {
              submitButton.classList.remove('disabled');
              submitButton.removeAttribute('disabled');
            }
          }
        }
      }

      field.addEventListener('keyup', function() {
        validateField(field);
      });

      field.addEventListener('change', function() {
        validateField(field);
      });

      field.addEventListener('input', function() {
        validateField(field);
      });
    });
  }

});
