# Shopify - Consent Tracking API

## Useful tools

1. Cookie Quick Manager extension for Firefox

[Download here](https://addons.mozilla.org/en-US/firefox/addon/cookie-quick-manager)

2. A script to add in shopify theme

```
  const intervalId = setInterval(() => {
    if (window.Shopify) {
      clearInterval(intervalId);
      if (window.Shopify.loadFeatures) {
        window.Shopify.loadFeatures(
          [
            {
              name: 'consent-tracking-api',
              version: '0.1',
            },
          ],
          (error) => {
            if (error) {
              console.error('CustomerPrivacy API -> failed to load', 'warning');
              return;
            }

            console.info('CustomerPrivacy API -> loaded successfully');
            function getCookie(name) {
              const value = `; ${document.cookie}`;
              const parts = value.split(`; ${name}=`);
              if (parts.length === 2) return parts.pop().split(';').shift();
            }
            window.printCookie = (name) => {
              const value = getCookie(name);
              console.log(JSON.stringify(JSON.parse(decodeURIComponent(value)), null, 2));
            }
            window.printAllCookies = () => {
              console.info("_cmp_a");
              window.printCookie('_cmp_a');
              console.log("--------------------------");
              console.info("_tracking_consent");
              window.printCookie('_tracking_consent');
            }
            window.setMyConsent = (val) => {
              window.Shopify.customerPrivacy.setTrackingConsent(val, function () {
                console.info('CustomerPrivacy Api -> ' + val);
                window.printAllCookies();
              });
            };
            
          },
        );
      }
    } else {
      console.warn('CustomerPrivacy API -> undefined');
    }
  }, 10);
```
