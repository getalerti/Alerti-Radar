import {createAlert} from "../helpers/requestsBody";
import {create} from "./API";

const default_google_my_business_locations = {
    "2476": [
        "accounts/109836663543325227260/locations/16871217276328111579"
    ]
}
const default_my_pages = {
    "4549": {
        "175329223140": "175329223140"
    }
}
export default  {
    requestBody: createAlert,
    clean() {
      const busines_location = JSON.stringify(this.requestBody.google_my_business_locations);
      const is_busines_location_empty = busines_location === "[]" ||  busines_location === "{}";

      const pages = JSON.stringify(this.requestBody.my_pages);
      const is_pages_empty = pages === "[]" ||  pages === "{}";

      if (is_busines_location_empty) {
            this.requestBody.google_my_business_locations = default_google_my_business_locations;
      }
      if (is_pages_empty) {
            this.requestBody.my_pages = default_my_pages;
      }
    },
    update(params) {
        const keys = Object.keys(params);
        keys.forEach(key => {
            const value = params[key];
            switch (key) {
                case 'name':
                    this.requestBody.alert.name = value;
                    break;
                case 'includedKeywords':
                    this.requestBody.alert.alert_query_settings[0].any_keywords = value;
                    break;
                case 'excludedKeywords':
                    this.requestBody.alert.alert_query_settings[0].exclude_keywords = value;
                    break;
                case 'plusKeywords':
                    this.requestBody.alert.alert_query_settings[0].keywords = value;
                    break;
                case 'monitorType':
                    this.requestBody.alert.monitor_type = value;
                    break;
                case 'alertType':
                    this.requestBody.alert.alert_type = value;
                    break;
                case 'lang':
                    this.requestBody.alert.lang = value;
                    break;
                case 'alertSources':
                    this.requestBody.alert_retrieving.retrieve_bing = value.some(src => src === "bing");
                    this.requestBody.alert_retrieving.retrieve_blogs = value.some(src => src === "blogs");
                    this.requestBody.alert_retrieving.retrieve_google_forums = value.some(src => src === "google_forums");
                    this.requestBody.alert_retrieving.retrieve_images = value.some(src => src === "images");
                    this.requestBody.alert_retrieving.retrieve_instagram_public = value.some(src => src === "instagram_public_posts");
                    this.requestBody.alert_retrieving.retrieve_instagram_public_videos = value.some(src => src === "instagram_public_videos");
                    this.requestBody.alert_retrieving.retrieve_news = value.some(src => src === "news");
                    this.requestBody.alert_retrieving.retrieve_twitter = value.some(src => src === "twitter");
                    this.requestBody.alert_retrieving.retrieve_vimeo = value.some(src => src === "vimeo");
                    break;
                case 'rssFeeds':
                    this.requestBody.xml_sources = value;
                    break;
                case 'excludeWebsites':
                    this.requestBody.alert.exclude_domains = value;
                    break;
                case 'excludeDomainNames':
                    this.requestBody.alert.exclude_domain_extensions = value;
                    break;
                case 'excludeTweets':
                    this.requestBody.alert.exclude_twittos = value;
                    break;
                case 'opinion_assurances_urls':
                    this.requestBody.opinion_assurances_urls = value;
                    break;
                case 'trip_advisor_urls':
                    this.requestBody.trip_advisor_urls = value;
                    break;
                case 'booking_urls':
                    this.requestBody.booking_urls = value;
                    break;
                case 'expedia_urls':
                    this.requestBody.expedia_urls = value;
                    break;
                case 'agoda_urls':
                    this.requestBody.agoda_urls = value;
                    break;
                case 'trustpilot_urls':
                    this.requestBody.trustpilot_url = value;
                    break;
                case 'google_places':
                    this.requestBody.google_places = value;
                    break;
                case 'google_my_business_locations':
                    this.requestBody.google_my_business_locations = value;
                    break;
                case 'emailNotification':
                    this.requestBody.sharing.mail_alert = value;
                    break;
                case 'mobileNotification':
                    this.requestBody.sharing.web_mobile_notification_frequency = value;
                    break;
                case 'desktopNotification':
                    this.requestBody.sharing.web_desktop_notification_frequency = value;
                    break;
                case '': break;
            }
        });
    },
    submit() {
        this.clean();
        return create(this.requestBody);
    }
}