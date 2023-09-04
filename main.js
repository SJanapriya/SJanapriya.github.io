const candidatesData = [
  {
    id: 1,
    name: "Anusha Das",
    location: "Bengaluru, KA",
    experience: 5,
    update: "updated 2 days ago",
    workStatus: "Ready to work",
    immediateJoin: true,
  },
  {
    id: 2,
    name: "karthik Kumar",
    location: "Bengaluru, KA",
    experience: 4,
    update: "updated a week ago",
    workStatus: "Passive job seeker",
    immediateJoin: false,
  },
  {
    id: 3,
    name: "Ashish CR",
    location: "Chennai, TN",
    experience: 2,
    update: "updated 10 days ago",
    workStatus: "Ready to work",
    immediateJoin: true,
  },
  {
    id: 4,
    name: "Kavya",
    location: "Hyderabad, TS",
    experience: 2,
    update: "updated 2 days ago",
    workStatus: "Ready to work",
    immediateJoin: true,
  },
  {
    id: 5,
    name: "Nandhan",
    location: "Chennai, TS",
    experience: 1,
    update: "updated 3 days ago",
    workStatus: "Passive job seeker",
    immediateJoin: false,
  },
];

$("#navigation").load("nav.html");
window.onload = () => {
  function toggleClass() {
    document.querySelector(".main-menu").classList.toggle("show");
  }

  document.querySelector(".menu-btn").addEventListener("click", toggleClass);

  if (location.search) {
    const params = Object.fromEntries(new URLSearchParams(location.search));

    $("#jobTitle").val(params.jobTitle || "");
    $("#location").val(params.location || "");
  }

  function getCandidatesListingHTML(candidateData, filterTags = {}) {
    let candidatesListingHTML = `
              <div class="card">
                <div class="candidate-details">
                  <span class="candidate-name">${candidateData.name}</span>
                  <span class="candidate-location">Bengaluru, KA</span>
                  <a class="view-resume" href="#">View resume</a>
                </div>
                <span class="experience-year">Experience (${
                  candidateData.experience
                })</span>
                <div class="experience-designations">
                  <p>UI/UX designer <span class="place">at LTMindtree</span></p>
                  <p>
                    Associate UX designer
                    <span class="place">at Nanoyota Tech</span>
                  </p>
                  <p>
                    Junior UI/UX designer <span class="place">at FA Tech</span>
                  </p>
                  <p>
                    Junior UI/UX designer <span class="place">at Finwego</span>
                  </p>
                  <p>
                    UI/UX design Intern
                    <span class="place">at Kpost Software Ltd</span>
                  </p>
                </div>
                <div class="tags-group">
                  <div class="update">${candidateData.update}</div>
                  <div class="status ${
                    candidateData.immediateJoin
                      ? "status-immediate"
                      : "status-passive"
                  }">${candidateData.workStatus}</div>
                </div>
            </div>
      `;

    if (Object.keys(filterTags).length) {
      let isFound = false;
      for (each in filterTags) {
        if (
          candidateData.experience === filterTags[each]["min"] ||
          candidateData.experience === filterTags[each]["max"]
        ) {
          isFound = true;
          break;
        }
      }
      if (!isFound) {
        return "";
      }
    }

    return candidatesListingHTML;
  }

  function setCandidatesList(filterTags) {
    const candidatesDataHTML = candidatesData.reduce((acc, currentListing) => {
      return acc + getCandidatesListingHTML(currentListing, filterTags);
    }, "");

    document.querySelector("#card-container").innerHTML = candidatesDataHTML;
  }
  if (location.href.indexOf("advanced-search.") > -1) {
    let temp = {};
    $(".years-of-exp").change(function () {
      if ($(this).is(":checked")) {
        if ($(this).val().includes("-")) {
          let arr = $(this).val().split("-");
          temp[arr[0]] = { min: +arr[0], max: +arr[1] };
        } else {
          temp["5"] = { min: 5, max: 10 };
        }
      } else {
        if ($(this).val().includes("-")) {
          let arr = $(this).val().split("-");
          delete temp[arr[0]];
        } else {
          delete temp["5"];
        }
      }
      setCandidatesList(temp);
    });
    setCandidatesList();
  }
};
