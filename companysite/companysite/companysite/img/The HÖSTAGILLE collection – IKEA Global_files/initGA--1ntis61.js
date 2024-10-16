(function initGA() {
  var options = window.ikeaExternalScriptOptions || {};
  var gaOptions = options.ga || {};

  var trackingIds = gaOptions.trackingIds || '';
  var ids = trackingIds
    .split(/[\s\n,;]/gi)
    .map((x) => x.trim())
    .filter((x) => x);

  var excludeForIsoCountries = gaOptions.excludeForIsoCountries || '';
  var excludedCountries = excludeForIsoCountries
    .split(/[\s\n,;]/gi)
    .map((x) => x.trim())
    .filter((x) => x);
  var userGeolocationData = (OneTrust && OneTrust.getGeolocationData()) || {};
  var userCountry = userGeolocationData.country;
  var isExcluded = !userCountry || excludedCountries.includes(userCountry);

  if (isExcluded || ids.length === 0) {
    return;
  }

  var onetrustCategoryId;
  try {
    onetrustCategoryId = document.currentScript.dataset.otCategoryId;
  } catch (err) {
    console.error(err);
  }

  OneTrust.InsertScript(
    'https://www.googletagmanager.com/gtag/js',
    'head',
    _runAfterGaLibLoaded,
    null,
    onetrustCategoryId
  );

  function _runAfterGaLibLoaded() {
    window.dataLayer = window.dataLayer || [];

    function gtag() {
      mapOldEventToGA4(arguments);
      window.dataLayer.push(arguments);
    }

    window.gtag = gtag;
    gtag('js', new Date());

    for (var id of ids) {
      gtag('config', id, {
        transport_type: 'beacon',
        anonymize_ip: true,
        allow_ad_personalization_signals: false,
        restricted_data_processing: true,
        allow_google_signals: false,
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        ad_storage: 'denied',
        analytics_storage: 'granted',
        // default dimensions
        site_language: 'en',
        site_platform: 'global',
      });
    }
  }

  // map old UA events to GA4 events
  var oldEventToGA4 = {
    'Link click': 'link_click',
    'Click to country page': 'nav_to_country_page',
    'Navigate to ikeaes region page': 'nav_to_ikeaes_region_page',
  };
  function mapOldEventToGA4(args) {
    var shouldMap = args && args[0] === 'event' && args[1] in oldEventToGA4;
    if (shouldMap) {
      args[1] = oldEventToGA4[args[1]];
    }
  }
})();
