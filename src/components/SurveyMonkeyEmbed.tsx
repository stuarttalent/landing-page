"use client";

import Script from "next/script";

export function SurveyMonkeyEmbed() {
  return (
    <div className="space-y-3">
      <div
        className="rounded-2xl border bg-white"
        aria-label="SurveyMonkey pre-registration form"
      >
        <Script
          id="smcx-sdk"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html:
              '(function(t,e,s,n){var o,a,c;t.SMCX=t.SMCX||[],e.getElementById(n)||(o=e.getElementsByTagName(s),a=o[o.length-1],c=e.createElement(s),c.type="text/javascript",c.async=!0,c.id=n,c.src="https://widget.surveymonkey.com/collect/website/js/tRaiETqnLgj758hTBazgd9WQ3UcqmOrK2hM1lRCqSPzPP6KARIIUuvTkoBtjLyna.js",a.parentNode.insertBefore(c,a))})(window,document,"script","smcx-sdk");',
          }}
        />
        <noscript>
          <p className="p-4 text-sm text-slate-700">
            JavaScript is required to load the pre-registration form. Please use
            the link below to access SurveyMonkey.
          </p>
        </noscript>
        <div className="p-4 text-sm text-slate-600">
          Loading survey…
        </div>
      </div>

      <a
        className="text-xs text-slate-500 hover:text-slate-700"
        style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
        href="https://www.surveymonkey.com"
        target="_blank"
        rel="noreferrer"
      >
        Create your own user feedback survey
      </a>
    </div>
  );
}

