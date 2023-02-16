# Shopify - Consent Tracking API

## Useful tools for testing

1. [Cookie Quick Manager](https://addons.mozilla.org/en-US/firefox/addon/cookie-quick-manager) extension for Firefox

2. A [script](/test-api.js) to add in shopify theme. The script loads the Customer Privacy API and creates two methods on the window object: `setMyConsent()`, `getCustomerPrivacyStatus()` and `printAllCookies()`.

## Loading the API

For the API to be accessible, it has to be loaded in the page.

Relevant documation for how to load the API in the [Official page](https://shopify.dev/api/consent-tracking)

## Cookies created

[Source](https://www.shopify.com/legal/cookies)

1. `_cmp_a`: Used for managing customer privacy settings. *Duration: 1 day* 

    ```
    {
      "purposes": {
        "a": false,
        "p": false,
        "m": false,
        "t": false
      },
      "display_banner": true,
      "merchant_geo": "GR",
      "sale_of_data_region": false
    }
    ```

2. `_tracking_consent`: Used to store a user's preferences if a merchant has set up privacy rules in the visitor's region. *Duration: 1 year*.
    ```
    {
      "lim": [
        "CCPA",
        "GDPR_BLOCK_ALL"
      ],
      "v": "2.1",
      "reg": "GDPR",
      "region": "GRG",
      "con": {
        "CMP": {
          "p": "",
          "s": "",
          "m": "",
          "a": ""
        }
      }
    }
    ```

## Store preferences for Customer Privacy

These preferences are available under the main store preferences page in the store admin.

#### 1. Collected before consent

Data is collected before a customer gives consent. This may not meet applicable data protection and privacy laws, but has no impact on analytics and ad campaigns.

#### 2. Partially collected before consent

Analytics data collection is limited to the duration of a user session, and marketing data collection is blocked, before a customer gives consent.

#### 3. Collected after consent

Data is not collected until a customer gives consent. This may be required by applicable data protection and privacy laws, but may impact analytics and ad campaigns.

## What does the Customer Privacy preference do?

Setting the preference for a store only affects the default value of the `_cmp_a` and `_tracking_consent` cookies. Publishers read the cookie value througth the API to know how to handler tracking, sale of data and cookies.

## Publishers Interacting with the API (Judge.me)

The hypothesis is that Publishers "read" the cookie value through API methods such as `window.Shopify.customerPrivacy.userCanBeTracked()` and `window.Shopify.customerPrivacy.userDataCanBeSold()` to know how to handler tracking, sale of data and cookies.

## CMPs Interactiing with the API (Pandectes)

A CMP gathers the preferences of the user from the banner and can call the following methods of the API to set the consent:

1. `window.Shopify.customerPrivacy.setTrackingConsent(true, function() {...})`: this grants consent to all categories at once (marketing: m, analytics: a, preferences: p, sale_of_data: s)
