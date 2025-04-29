var returnvalue = 0;
var complete = 0;

var overallScore;
var resultsLink;

var meetingType;

var answers = [];
var answersLength = [];
var benchmarks = [4, 4, 4];

var agmAnswers = [];
var mmAnswers = [];
var irAnswers = [];

var agm_participation_score;
var agm_security_score;
var agm_communication_score;

var mem_participation_score;
var mem_security_score;
var mem_communication_score;

var ir_participation_score;
var ir_security_score;
var ir_communication_score;

var emailValue;
var responseId;

var overallLabels = true;
var overallLayout = 0;

function overallLabelsShow() {
  $(window).width() < 992
    ? overallLabels = false
    : overallLabels = true;

  $(window).width() < 992
    ? overallLayout = 20
    : overallLayout = 0;
};

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
    window.responseId = id;
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

          var agmPartScore = 0;

          for(i=0;i < agmPartQuestions.length;i++) {
            if ( agmPartQuestions[i].boolean ) {
              agmPartScore += 1;
            }
          }

          window.agm_participation_score = agmPartScore;
          window.answers.push(agmPartScore);
          window.answersLength.push(agmPartQuestions.length);

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

          var agmSecuScore = 0;

          for(i=0;i < agmSecuQuestions.length;i++) {
            if ( agmSecuQuestions[i].boolean ) {
              agmSecuScore += 1;
            }
          }

          window.agm_security_score = agmSecuScore;
          window.answers.push(agmSecuScore);
          window.answersLength.push(agmSecuQuestions.length);
            
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

          var agmCommScore = 0;

          for(i=0;i < agmCommQuestions.length;i++) {
            if ( agmCommQuestions[i].boolean ) {
              agmCommScore += 1;
            }
          }

          window.agm_communication_score = agmCommScore;
          window.answers.push(agmCommScore);
          window.answersLength.push(agmCommQuestions.length);
            
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

          var memPartScore = 0;

          for(i=0;i < memPartQuestions.length;i++) {
            if ( memPartQuestions[i].boolean ) {
              memPartScore += 1;
            }
          }

          window.mem_participation_score = memPartScore;
          window.answers.push(memPartScore);
          window.answersLength.push(memPartQuestions.length);

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

          var memSecuScore = 0;

          for(i=0;i < memSecuQuestions.length;i++) {
            if ( memSecuQuestions[i].boolean ) {
              memSecuScore += 1;
            }
          }

          window.mem_security_score = memSecuScore;
          window.answers.push(memSecuScore);
          window.answersLength.push(memSecuQuestions.length);
            
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

          var memCommScore = 0;

          for(i=0;i < memCommQuestions.length;i++) {
            if ( memCommQuestions[i].boolean ) {
              memCommScore += 1;
            }
          }

          window.mem_communication_score = memCommScore;
          window.answers.push(memCommScore);
          window.answersLength.push(memCommQuestions.length);
            
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

          var irPartScore = 0;

          for(i=0;i < irPartQuestions.length;i++) {
            if ( irPartQuestions[i].boolean ) {
              irPartScore += 1;
            }
          }

          window.ir_participation_score = irPartScore;
          window.answers.push(irPartScore);
          window.answersLength.push(irPartQuestions.length);

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

          var irSecuScore = 0;

          for(i=0;i < irSecuQuestions.length;i++) {
            if ( irSecuQuestions[i].boolean ) {
              irSecuScore += 1;
            }
          }

          window.ir_security_score = irSecuScore;
          window.answers.push(irSecuScore);
          window.answersLength.push(irSecuQuestions.length);
            
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

          var irCommScore = 0;

          for(i=0;i < irCommQuestions.length;i++) {
            if ( irCommQuestions[i].boolean ) {
              irCommScore += 1;
            }
          }

          window.mem_communication_score = irCommScore;
          window.answers.push(irCommScore);
          window.answersLength.push(irCommQuestions.length);
            
          }
            
          /**************/
          /* Overall */
          /**************/
                      
          var overallScore = 0;

          for(i=0;i < window.answers.length;i++) {
            overallScore += window.answers[i];
          }
            
          window.overallScore = overallScore;
            
          /**************/
          /* Email */
          /**************/

          // var emailQuestions = [];

          // var email = res.filter(o => {
          //   var regex = /(emai)\w+/g;
          //   return o.ref.match(regex);
          // });

          // for(i=0;i < email.length;i++) {
          //   emailQuestions.push(email[i]);
          // }

          // var emailTypeform;

          // for(i=0;i < emailQuestions.length;i++) {
          //     emailTypeform = emailQuestions[i].email;
          // }

          // window.emailValue = emailTypeform;

          if(window.complete == 0) {
            window.complete = 1;
          }
          drawGraphs();
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

  overallLabelsShow();

  fetcher();


});

function drawGraphs() {
  
  // Pop for testing
  // window.meetingType = "agm";
  // window.answersLength = [5, 5, 5];
  // window.answers = [3, 5, 2];
  // window.overallScore = 10;

    var highBand = 12;
    var lowBand = 6;
  
    var sectionHighBand = 4;
    var sectionLowBand = 2;
  
    $('.overallResults__body-inner[data-meeting="'+window.meetingType+'"]').show();
    $('.sectionResults__wrapper[data-meeting="'+window.meetingType+'"]').show();
  
    var sections = $('.sectionResults__wrapper[data-meeting="'+window.meetingType+'"] .sectionResults__callout');
  
    var chartIndex1 = window.meetingType + "-participation";
    var chartIndex2 = window.meetingType + "-security";
    var chartIndex3 = window.meetingType + "-communication";

    if (window.overallScore >= highBand) {
        $('.resultsHero__score[data-score="high"]').show();
        $('.overallResults__item[data-score="high"]').show();
    }
    else if (window.overallScore < lowBand) {
        $('.resultsHero__score[data-score="low"]').show();
        $('.overallResults__item[data-score="low"]').show();
    }
    else {
        $('.resultsHero__score[data-score="medium"]').show();
        $('.overallResults__item[data-score="medium"]').show();
    }

    $(sections).each(function(i) {
        if (answers[i] >= sectionHighBand) {
          $(this).find('[data-score="high"]').show();
        } else if (answers[i] < sectionLowBand) {
          $(this).find('[data-score="low"]').show();
        } else {
          $(this).find('[data-score="medium"]').show();
        }
    });

    var charts = [chartIndex1, chartIndex2, chartIndex3];

    Chart.defaults.global.tooltips.enabled = false;

    for(i = 0; i < charts.length; i++) {
        var canvas = $("#canvas-"+charts[i]);

        var answerNum = window.answers[i];
        var answerPercent = parseInt((answerNum/window.answersLength[i]) * 100);
        var benchmarkPercent = parseInt((benchmarks[i]/window.answersLength[i]) * 100);

        var chartData = {
            datasets: [{
              label: "Your results",
              backgroundColor: ['rgba(243, 146, 0)', 'rgba(243, 146, 0, 0)'],
              borderColor: ['rgba(243, 146, 0)', 'rgba(243, 146, 0, 0)'],
              borderAlign: 'inner',
              borderWidth: 40,
              data: [answerPercent, 100 - answerPercent]
            }, {
              label: 'Spacer',
              data: [100],
              backgroundColor: ['rgba(255, 255, 255, 0)'],
              borderColor: ['rgba(255, 255, 255, 0)'],
              borderAlign: 'inner',
              borderWidth: 40
          }, {
              label: "Benchmark",
              backgroundColor: ['rgba(0,32,62)', 'rgba(237, 244, 247, 0)'],
              borderColor: ['rgba(0,32,62)', 'rgba(237, 244, 247, 0)'],
              borderAlign: 'inner',
              borderWidth: 40,
              data: [benchmarkPercent, 100 - benchmarkPercent]
            }]
        };

        var chartOptions = {
            title: {
              display: false,
            },
            legend: {
              display: false,
            },
            tooltips: {
              enabled: false
            },
            maintainAspectRatio: true
        };

        var donutChart = new Chart(canvas, {
            type: 'doughnut',
            responsive: false,
            data: chartData,
            option: chartOptions
        });
    };

    const overallCanvas = document.getElementById("overallResults__chartJS");

    var overallData = {
      labels: [
        ["Participation"],
        [["Security and "],["compliance"]],
        ["Communication"]
      ],
      labelsTooltip: [
        "Participation",
        "Security and compliance",
        "Communication"
      ],
      datasets: [{
        label: "Your results",
        borderColor: 'rgba(243, 146, 0, 1)',
        backgroundColor: 'rgba(243, 146, 0, 0)',
        borderWidth: 4,
        pointBackgroundColor: 'rgba(243, 146, 0, 1)',
        pointBorderColor: 'rgba(243, 146, 0, 1)',
        pointRadius: 5,
        pointHoverBackgroundColor:'rgba(243, 146, 0, 1)',
        pointHoverBorderColor:'rgba(243, 146, 0, 1)',
        pointHoverRadius: 5,
        data: answers
      }, {
        label: "Industry benchmark",
        borderColor: 'rgba(0,32,62, 1)',
        backgroundColor: 'rgba(0,32,62, 0)',
        borderDash: [3, 2],
        borderWidth: 1,
        pointBackgroundColor: 'rgba(0,32,62, 1)',
        pointBorderColor: 'rgba(0,32,62, 1)',
        pointRadius: 3,
        pointHoverBackgroundColor:'rgba(0,32,62, 1)',
        pointHoverBorderColor:'rgba(0,32,62, 1)',
        pointHoverRadius: 3,
        data: benchmarks
      }]
    };

    var overallOptions = {
      layout: {
        padding: {
          top: overallLayout,
          bottom: overallLayout
        }
      },
        legend: {
            display: false
        },
        tooltips: {
            enabled: true,
            callbacks: {
            title: function(tooltipItems, data) {
                return data.labelsTooltip[tooltipItems[0].index];
            },
            label: function(tooltipItem, data) {
                return data.datasets[tooltipItem.datasetIndex].label + ' : ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
            }
            }
        },
        maintainAspectRatio: true,
        scale: {
            ticks: {
              display: true,
                beginAtZero: true,
                maxTicksLimit: 6,
                stepSize: 1,
                suggestedMax: 5
            },
            pointLabels:{
              display: overallLabels,
                fontColor:"#000000",
                fontSize: 14,
                fontFamily: 'Poppins-Semibold',
                fontStyle: "normal",
                textAlign: 'center',
                padding:4
            },
            gridLines: {
                color: 'rgba(225, 225, 225, 1)',
                circular: true
            },
            angleLines: {
                color: 'rgba(225, 225, 225, 1)'
            }
        }
    };

    var radarChart = new Chart(overallCanvas, {
      responsive: false,
      type: 'radar',
      data: overallData,
      options: overallOptions
    });

};