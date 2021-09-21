const createAlert = {
    alert: {
        monitor_type: "",
        name: "",
        alert_type: "",
        lang: "",
        alert_query_settings: [
            {
                any_keywords: [],
                keywords: [],
                exclude_keywords: []
            }
        ],
        exclude_domains: [],
        exclude_domain_extensions: [],
        exclude_twittos: []
    },
    alert_retrieving: {
        retrieve_news: false,
        retrieve_blogs: false,
        retrieve_google_forums: false,
        retrieve_bing: false,
        retrieve_twitter: false,
        retrieve_instagram_public: false,
        retrieve_instagram_public_videos: false,
        retrieve_images: false,
        retrieve_vimeo: false
    },
    sharing: {
        favorited: null,
        mail_alert: "",
        web_mobile_notification_frequency: "",
        web_desktop_notification_frequency: ""
    },
    xml_sources: [],
    my_pages: null,
    google_my_business_locations: null,
    booking_urls: [],
    agoda_urls: [],
    opinion_assurances_urls: [],
    google_places: [],
    expedia_urls: [],
    trip_advisor_urls: []
}

const getRequestBody = (type = null) => {
    const requestBody = {...createAlert};

    if (type === "social") {
        delete requestBody.alert.lang;
        delete requestBody.alert.alert_query_settings;
        delete requestBody.alert.exclude_domains;
        delete requestBody.alert.exclude_domain_extensions;
        delete requestBody.alert.exclude_twittos;
        delete requestBody.alert_retrieving;
        delete requestBody.xml_sources;
        delete requestBody.google_my_business_locations;
        delete requestBody.booking_urls;
        delete requestBody.agoda_urls;
        delete requestBody.opinion_assurances_urls;
        delete requestBody.google_places;
        delete requestBody.expedia_urls;
        delete requestBody.trip_advisor_urls;

        requestBody.instagram_business_accounts = {};
        requestBody.twitter_accounts = [];
        requestBody.other_fan_pages = [];
        requestBody.non_admin_twitter_accounts = [];
        requestBody.non_admin_instagram_business_accounts = [];
    }
    return requestBody;

}

export {
    createAlert,
    getRequestBody
}