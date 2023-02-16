const intervalId = setInterval(() => {
  if (window.Shopify) {
    clearInterval(intervalId);
    if (window.Shopify.loadFeatures) {
      window.Shopify.loadFeatures(
        [
          {
            name: "consent-tracking-api",
            version: "0.1",
          },
        ],
        (error) => {
          if (error) {
            console.error("CustomerPrivacy API -> failed to load", "warning");
            return;
          }

          console.info("CustomerPrivacy API -> loaded successfully");
          function getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(";").shift();
          }
          window.printCookie = (name) => {
            const value = getCookie(name);
            if (!value) {
              console.log('No cookie named: ' + name);
              return;
            }
            console.log(
              JSON.stringify(JSON.parse(decodeURIComponent(value)), null, 2)
            );
          };
          window.printAllCookies = () => {
            console.info("_cmp_a");
            window.printCookie("_cmp_a");
            console.log("--------------------------");
            console.info("_tracking_consent");
            window.printCookie("_tracking_consent");
          };
          window.setMyConsent = (val) => {
            window.Shopify.customerPrivacy.setTrackingConsent(val, function () {
              console.info("CustomerPrivacy Api -> " + val);
              window.printAllCookies();
            });
          };
          window.getCustomerPrivacyStatus = () => {
            const prefs = window.Shopify.customerPrivacy.getShopPrefs();
            if (prefs && prefs.limit) {
              console.log('Shop preferences: ' + prefs.limit.join(', '));
            }
            console.log('Merchant Granular Consent: ' + window.Shopify.customerPrivacy.doesMerchantSupportGranularConsent());
            const regulation = window.Shopify.customerPrivacy.getRegulation();
            console.log('Regulation: ' + regulation);
            console.log('Regulation enforced: ' + window.Shopify.customerPrivacy.isRegulationEnforced());
            console.log('------------------------------------------------------');
            console.log('GDPR consent: ' + window.Shopify.customerPrivacy.getTrackingConsent());
            console.log('CCPA consent: ' + window.Shopify.customerPrivacy.getCCPAConsent());
            console.log('User can be tracked: ' + window.Shopify.customerPrivacy.userCanBeTracked());
            console.log('User data can be sold: ' + window.Shopify.customerPrivacy.userDataCanBeSold());
            console.log('------------------------------------------------------');
            console.log('Should show GDPR Banner: ' + window.Shopify.customerPrivacy.shouldShowGDPRBanner());
            console.log('Should show CCPA Banner: ' + window.Shopify.customerPrivacy.shouldShowCCPABanner());
          }
        }
      );
    }
  } else {
    console.warn("CustomerPrivacy API -> undefined");
  }
}, 10);
