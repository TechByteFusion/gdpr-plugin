// Store compliance results
var complianceResults = [];


function checkCookieConsent() {
    let consentBanner = document.querySelector('[id*="cookie"], [class*="cookie"]');
    let passed = !!consentBanner;
    complianceResults.push({ check: "Cookie Check", passed });
}

function checkTrackers() {
    let scripts = document.querySelectorAll("script[src]");
    let trackers = Array.from(scripts).filter(script => script.src.includes("tracker") || script.src.includes("analytics"));
    
    let passed = trackers.length === 0;
    complianceResults.push({ check: "Trackers Check", passed });
}

function checkSecurityHeaders() {
    fetch(window.location.href, { method: "HEAD" })
        .then(response => {
            let headers = response.headers;
            let hasSecurityHeaders = headers.get("content-security-policy") || headers.get("strict-transport-security");

            let passed = !!hasSecurityHeaders;
            complianceResults.push({ check: "Security Check", passed });

            // Send results to popup.js via background.js
            chrome.runtime.sendMessage({ type: "complianceResults", data: complianceResults });
        })
        .catch(error => console.log("Security header check failed", error));
}



function checkPrivacyPolicy() {
    const links = document.querySelectorAll('a');
    for (let link of links) {
        const text = link.innerText.toLowerCase();
        if (text.includes("privacy") || text.includes("terms") || text.includes("gdpr")) {
            passed = true
            complianceResults.push( {  check: "Policy Check", passed});
        }
    }
    
}

function checkSecureConnection() {
    complianceResults.push( { 
        check: "Connection Check", 
        passed: window.location.protocol === 'https:' 
    });
}


function checkConsentBanner() {
    const consentSelectors = [
        "[id*='cookie']",
        "[id*='consent']",
        "[class*='cookie']",
        "[class*='consent']",
        "div[role='dialog']",
        "div[aria-label*='cookie']",
        "div[aria-label*='consent']"
    ];

    let found = false;
    let allowsRejection = false;

    document.querySelectorAll(consentSelectors.join(",")).forEach(element => {
        const text = element.innerText.toLowerCase();
        
        if (text.includes("cookie") || text.includes("consent")) {
            found = true;

            // Check if a "Reject" or "Decline" button exists
            const buttons = element.querySelectorAll("button");
            buttons.forEach(btn => {
                const btnText = btn.innerText.toLowerCase();
                if (btnText.includes("reject") || btnText.includes("decline")) {
                    allowsRejection = true;
                }
            });
        }
    });

    complianceResults.push( { check: "Consent Check", passed: found && allowsRejection });
}


// Run checks
checkCookieConsent();
checkTrackers();
checkSecurityHeaders();
checkConsentBanner();
checkPrivacyPolicy();
checkSecureConnection();
