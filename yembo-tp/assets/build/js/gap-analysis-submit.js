var returnvalue = 0;
var complete = 0;

var overallScore;
var resultsLink;

var meetingType;

var agmAnswers = [];
var mmAnswers = [];
var irAnswers = [];

var responseId;
var resultsLink;
var resultsLinkHttp;

var emailValue; // From query string or Typeform? Or submitted via form

$(function() {

/*
* [data-score] is used across the site to segment content based on low, medium or high scores.
*
* Based on overall score, we will show() the containers which match the score rating.
* i.e. if 80 is the overall score, and 80 is considered medium, [data-score="medium"] should be display block.
*/

function fetcher() {

    var queryString = {};

    window.location.href.replace(
      new RegExp("([^?=&]+)(=([^&]*))?", "g"),
      function($0, $1, $2, $3) { queryString[$1] = $3; }
    );

    var id = queryString.response_id;
    console.log(id);
    window.responseId = id;
    window.resultsLink = "https://go.lumiglobal.com/your-gap-analysis-results?response_id="+id;
    var responseUrl = "//audit.tp-demo.co.uk/api/response/"+id;

    function checkData() {
      $.getJSON(responseUrl, function(data, status) {
        if (status === "success") {
          if(window.returnvalue = 0) {
            window.returnvalue = 1;
          }
          if(window.returnvalue = 1) {
          window.returnvalue = 2;

          var page = $(data);

          /****************************/
          // GETTING THE DATA FROM JSON
          /****************************/

          // Get questions
          var questionData = data.data.questions;
          var questions = JSON.parse(questionData);

          // Get answers
          var answerData = data.data.answers;
          var answers = JSON.parse(answerData);

          // Map questions to answers
          var res = questions.map(x => Object.assign(x, answers.find(y => y.field.ref == x.ref)));

          /*********/
          // RESULTS
          /*********/
            
          var typeQuestion = [];
            
          var meeting_type = res.filter(o => {
            var regex = /(meeting)\w+/g;
            return o.ref.match(regex);
          });
            
          for(i=0;i < meeting_type.length;i++) {
            typeQuestion.push(meeting_type[i]);
          }
            
          for(i=0;i < typeQuestion.length;i++) {
            if ( typeQuestion[i].choice.label == "AGMs" ) {
              window.meetingType = "agm";
            } else if ( typeQuestion[i].choice.label == "Private or member meetings" ) {
              window.meetingType = "mm";
            } else {
              window.meetingType = "ir";
            }
              
          }
            
          if ( window.meetingType == "agm" ) {

          /**************/
          /* AGM Participation */
          /**************/

          var agmPartQuestions = [];

          var agmPart = res.filter(o => {
            var regex = /(agm_part_)\w+/g;
            return o.ref.match(regex);
          });

          for(i=0;i < agmPart.length;i++) {
            agmPartQuestions.push(agmPart[i]);
          }

          for(i=0;i < agmPartQuestions.length;i++) {
            if ( agmPartQuestions[i].boolean ) {
              var answer = "Yes";
            } else {
              var answer = "No";
            }
            window.agmAnswers.push(answer);
          }

          /**************/
          /* AGM Security */
          /**************/

          var agmSecuQuestions = [];

          var agmSecu = res.filter(o => {
            var regex = /(agm_secu_)\w+/g;
            return o.ref.match(regex);
          });

          for(i=0;i < agmSecu.length;i++) {
            agmSecuQuestions.push(agmSecu[i]);
          }

          for(i=0;i < agmSecuQuestions.length;i++) {
            if ( agmSecuQuestions[i].boolean ) {
              var answer = "Yes";
            } else {
              var answer = "No";
            }
            window.agmAnswers.push(answer);
          }
            
          /**************/
          /* AGM Communication */
          /**************/

          var agmCommQuestions = [];

          var agmComm = res.filter(o => {
            var regex = /(agm_comm_)\w+/g;
            return o.ref.match(regex);
          });

          for(i=0;i < agmComm.length;i++) {
            agmCommQuestions.push(agmComm[i]);
          }

          for(i=0;i < agmCommQuestions.length;i++) {
            if ( agmCommQuestions[i].boolean ) {
              var answer = "Yes";
            } else {
              var answer = "No";
            }
            window.agmAnswers.push(answer);
          }
            
          }
            
          if ( window.meetingType == "mm" ) {

          /**************/
          /* Member Meetings Participation */
          /**************/

          var memPartQuestions = [];

          var memPart = res.filter(o => {
            var regex = /(mem_part_)\w+/g;
            return o.ref.match(regex);
          });

          for(i=0;i < memPart.length;i++) {
            memPartQuestions.push(memPart[i]);
          }

          for(i=0;i < memPartQuestions.length;i++) {
            if ( memPartQuestions[i].boolean ) {
              var answer = "Yes";
            } else {
              var answer = "No";
            }
            window.mmAnswers.push(answer);
          }

          /**************/
          /* Member Meetings Security */
          /**************/

          var memSecuQuestions = [];

          var memSecu = res.filter(o => {
            var regex = /(mem_secu_)\w+/g;
            return o.ref.match(regex);
          });

          for(i=0;i < memSecu.length;i++) {
            memSecuQuestions.push(memSecu[i]);
          }

          for(i=0;i < memSecuQuestions.length;i++) {
            if ( memSecuQuestions[i].boolean ) {
              var answer = "Yes";
            } else {
              var answer = "No";
            }
            window.mmAnswers.push(answer);
          }
            
          /**************/
          /* Member Meetings Communication */
          /**************/

          var memCommQuestions = [];

          var memComm = res.filter(o => {
            var regex = /(mem_comm_)\w+/g;
            return o.ref.match(regex);
          });

          for(i=0;i < memComm.length;i++) {
            memCommQuestions.push(memComm[i]);
          }

          for(i=0;i < memCommQuestions.length;i++) {
            if ( memCommQuestions[i].boolean ) {
              var answer = "Yes";
            } else {
              var answer = "No";
            }
            window.mmAnswers.push(answer);
          }
            
          }
            
          if ( window.meetingType == "ir" ) {

          /**************/
          /* IR Participation */
          /**************/

          var irPartQuestions = [];

          var irPart = res.filter(o => {
            var regex = /(ir_part_)\w+/g;
            return o.ref.match(regex);
          });

          for(i=0;i < irPart.length;i++) {
            irPartQuestions.push(irPart[i]);
          }

          for(i=0;i < irPartQuestions.length;i++) {
            if ( irPartQuestions[i].boolean ) {
              var answer = "Yes";
            } else {
              var answer = "No";
            }
            window.irAnswers.push(answer);
          }

          /**************/
          /* IR Security */
          /**************/

          var irSecuQuestions = [];

          var irSecu = res.filter(o => {
            var regex = /(ir_secu_)\w+/g;
            return o.ref.match(regex);
          });

          for(i=0;i < irSecu.length;i++) {
            irSecuQuestions.push(irSecu[i]);
          }

          for(i=0;i < irSecuQuestions.length;i++) {
            if ( irSecuQuestions[i].boolean ) {
              var answer = "Yes";
            } else {
              var answer = "No";
            }
            window.irAnswers.push(answer);
          }
            
          /**************/
          /* IR Communication */
          /**************/

          var irCommQuestions = [];

          var irComm = res.filter(o => {
            var regex = /(ir_comm_)\w+/g;
            return o.ref.match(regex);
          });

          for(i=0;i < irComm.length;i++) {
            irCommQuestions.push(irComm[i]);
          }

          for(i=0;i < irCommQuestions.length;i++) {
            if ( irCommQuestions[i].boolean ) {
              var answer = "Yes";
            } else {
              var answer = "No";
            }
            window.irAnswers.push(answer);
          }
            
          }
            
          /**************/
          /* Email */
          /**************/

          var emailQuestions = [];

          var email = res.filter(o => {
            var regex = /(emai)\w+/g;
            return o.ref.match(regex);
          });

          for(i=0;i < email.length;i++) {
            emailQuestions.push(email[i]);
          }

          var emailTypeform;

          for(i=0;i < emailQuestions.length;i++) {
              emailTypeform = emailQuestions[i].email;
          }

          window.emailValue = emailTypeform;

          if(window.complete == 0) {
            window.complete = 1;
          }
          return true;
        }
        }
      });
    }
    function callInterval() {
        checkData();
          var interval = window.setInterval(function () {
              if (window.returnvalue != 0) {
                  window.clearInterval(interval);
              }
          }, 1000);

      }

          callInterval();

  };

  fetcher();


});

window.addEventListener('message', event => {
  if(event.data.type === 'hsFormCallback' && event.data.eventName === 'onFormReady') {
    
    var myVar = setInterval(setValues, 1000);
    
    function setValues() {
      if(window.complete == 1) {
        window.complete = 2;
      }
      if(window.complete == 2) {
          window.complete = 3;

          myStopFunction();

          if(window.meetingType == "agm") {
            document.querySelector('input[name=meeting_type___typeform]').value = "AGM";
            document.querySelector('input[name=agm_communication___analytics').value = window.agmAnswers[14];
            document.querySelector('input[name=agm_communication___customization').value = window.agmAnswers[10];
            document.querySelector('input[name=agm_communication___pre_agm_communications').value = window.agmAnswers[11];
            document.querySelector('input[name=agm_communication___q_a_moderation').value = window.agmAnswers[12];
            document.querySelector('input[name=agm_communication___response_proposal').value = window.agmAnswers[13];

            document.querySelector('input[name=agm_participation___accessibility_features').value = window.agmAnswers[1];
            document.querySelector('input[name=agm_participation___cost_effectiveness').value = window.agmAnswers[3];
            document.querySelector('input[name=agm_participation___real_time_communication').value = window.agmAnswers[2];
            document.querySelector('input[name=agm_participation___scalability').value = window.agmAnswers[4];
            document.querySelector('input[name=agm_participation___virtual_meeting_capabilities').value = window.agmAnswers[0];

            document.querySelector('input[name=agm_security___compliance_measures').value = window.agmAnswers[7];
            document.querySelector('input[name=agm_security___real_time_results').value = window.agmAnswers[9];
            document.querySelector('input[name=agm_security___reporting_and_audit_trails').value = window.agmAnswers[8];
            document.querySelector('input[name=agm_security___stakeholder_authentication').value = window.agmAnswers[5];
            document.querySelector('input[name=agm_security___voting_and_security').value = window.agmAnswers[6];

          }
          if(window.meetingType == "mm") {
            document.querySelector('input[name=meeting_type___typeform]').value = "Member Meeting";
            document.querySelector('input[name=mm_communication___customization').value = window.mmAnswers[10];
            document.querySelector('input[name=mm_communication___post_meeting_resources').value = window.mmAnswers[14];
            document.querySelector('input[name=mm_communication___q_a_moderation').value = window.mmAnswers[12];
            document.querySelector('input[name=mm_communication___real_time_communication').value = window.mmAnswers[11];
            document.querySelector('input[name=mm_communication___response_proposal').value = window.mmAnswers[13];

            document.querySelector('input[name=mm_participation___accessibility_and_training').value = window.mmAnswers[4];
            document.querySelector('input[name=mm_participation___engagement_tools').value = window.mmAnswers[2];
            document.querySelector('input[name=mm_participation___hybrid_meeting_capabilities').value = window.mmAnswers[0];
            document.querySelector('input[name=mm_participation___mobile_accessibility').value = window.mmAnswers[1];
            document.querySelector('input[name=mm_participation___real_time_support').value = window.mmAnswers[5];
            document.querySelector('input[name=mm_participation___visual_equity').value = window.mmAnswers[3];

            document.querySelector('input[name=mm_security___analytics').value = window.mmAnswers[9];
            document.querySelector('input[name=mm_security___feedback_collection').value = window.mmAnswers[8];
            document.querySelector('input[name=mm_security___security_measures').value = window.mmAnswers[6];
            document.querySelector('input[name=mm_security___verifiable_elections').value = window.mmAnswers[7];

          }
          if(window.meetingType == "ir") {
            document.querySelector('input[name=meeting_type___typeform]').value = "IR";
            document.querySelector('input[name=ir_communication___customization').value = window.irAnswers[10];
            document.querySelector('input[name=ir_communication___engagement_tracking').value = window.irAnswers[14];
            document.querySelector('input[name=ir_communication___q_a_management').value = window.irAnswers[12];
            document.querySelector('input[name=ir_communication___real_time_communication').value = window.irAnswers[11];
            document.querySelector('input[name=ir_communication___real_time_transcription').value = window.irAnswers[15];
            document.querySelector('input[name=ir_communication___response_proposal').value = window.irAnswers[13];

            document.querySelector('input[name=ir_participation___global_accessibility').value = window.irAnswers[1];
            document.querySelector('input[name=ir_participation___mobile_compatibility').value = window.irAnswers[2];
            document.querySelector('input[name=ir_participation___translation_services').value = window.irAnswers[4];
            document.querySelector('input[name=ir_participation___user_friendliness').value = window.irAnswers[3];
            document.querySelector('input[name=ir_participation___virtual_meeting_capabilities').value = window.irAnswers[0];

            document.querySelector('input[name=ir_security___analytics').value = window.irAnswers[9];
            document.querySelector('input[name=ir_security___archival_capabilities').value = window.irAnswers[7];
            document.querySelector('input[name=ir_security___reporting_and_analytics').value = window.irAnswers[6];
            document.querySelector('input[name=ir_security___secure_information_sharing').value = window.irAnswers[5];
            document.querySelector('input[name=ir_security___technical_support').value = window.irAnswers[8];

          }

          document.querySelector('input[name=gap_analysis_results_link]').value = window.resultsLink;


        return true;
      }
    }

    function myStopFunction() {
      clearInterval(myVar);
    }
    
  }
});
window.addEventListener('message', event => {
  if(event.data.type === 'hsFormCallback' && event.data.eventName === 'onFormSubmitted') {
    setTimeout( function() {
      window.location.href = window.resultsLink;
    }, 500 );
  }
});