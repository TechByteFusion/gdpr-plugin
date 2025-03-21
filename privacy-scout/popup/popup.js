document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("scan-btn").addEventListener("click", runScan);
    setupTabs();
});

// Request website scan
function runScan() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs.length === 0) return;

        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            files: ["content.js"]
        });
    });
}

// Listen for messages from content.js via background.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "complianceResults") {
        updateComplianceUI(message.data);
    }
});

// Update UI with received compliance results
function updateComplianceUI(results) {
    let totalChecks = results.length;
    let passedChecks = results.filter(check => check.passed).length;
    let score = totalChecks > 0 ? (passedChecks / totalChecks) * 100 : 0;
    score = Math.round(score);

    document.getElementById("complianceScore").innerText = score + "%";
    document.getElementById("progress").style.width = score + "%";

    results.forEach(result => {
        let elementId = result.check.toLowerCase().replace(/\s+/g, ""); // Convert to lowercase ID
        let statusText = result.passed ? "✅ Yes" : "❌ No";

        if (document.getElementById(elementId)) {
            document.getElementById(elementId).innerText = statusText;
        }
    });
}

// Handle tabs in UI
function setupTabs() {
    let tabs = document.querySelectorAll(".tab-button");
    let contents = document.querySelectorAll(".tab-content");

    tabs.forEach(tab => {
        tab.addEventListener("click", function () {
            tabs.forEach(t => t.classList.remove("active"));
            contents.forEach(c => c.classList.remove("active"));

            tab.classList.add("active");
            document.getElementById(tab.dataset.tab).classList.add("active");
        });
    });
}


document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".detail-section h3");

    sections.forEach((section) => {
        section.addEventListener("click", function () {
            const content = this.nextElementSibling;

            // Toggle display of content
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    });
});



document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("scan-btn").addEventListener("click", function () {
        const spinner = document.getElementById("loading-spinner");
        const homeSection = document.getElementById("home-section");
        const summarySection = document.getElementById("summary-section");
        
        
        spinner.style.display = "block"; // Show spinner
        // Simulate some async operation
        setTimeout(() => {
            spinner.style.display = "none"; // Hide spinner after 3 seconds
            
             // Hide the home section and show the summary section
             homeSection.style.display = "none";
             summarySection.style.display = "block";    

        }, 3000);


        
    });

    // document.getElementById("settings-btn").addEventListener("click", function () {
    //     alert("Opening Settings... ⚙️");
    // });

    // document.getElementById("clear-btn").addEventListener("click", function () {
    //     if (confirm("Are you sure you want to clear all data? 🗑️")) {
    //         alert("Data Cleared!");
    //     }
    // });

    // document.getElementById("export-btn").addEventListener("click", function () {
    //     alert("Exporting Compliance Report... 📤");
    // });

    // document.getElementById("help-btn").addEventListener("click", function () {
    //     alert("Need Help? 📖 Read the GDPR Compliance Guide.");
    // });



    document.getElementById('helpButton').addEventListener('click', () => {
        // alert('Please contant ashish.techbytes@gmail.com for help');
        // window.open('https://example.com/help', '_blank');

        const help_sect = document.getElementById("help-section");
        const homeSection = document.getElementById("home-section");
        const summarySection = document.getElementById("summary-section");

        help_sect.style.display = "block";  
        homeSection.style.display = "none";
        summarySection.style.display = "none"; 



    });

   
    
     // Open Home section

     document.getElementById('popup-header').addEventListener('click', () => {
        // alert('Please contant ashish.techbytes@gmail.com for help');
        // window.open('https://example.com/help', '_blank');

        const help_sect = document.getElementById("help-section");
        const homeSection = document.getElementById("home-section");
        const summarySection = document.getElementById("summary-section");

        help_sect.style.display = "none";  
        homeSection.style.display = "block";
        summarySection.style.display = "none"; 

    });




});
