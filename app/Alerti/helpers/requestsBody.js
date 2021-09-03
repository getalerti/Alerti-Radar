createAlert = {
    alert: {
        monitor_type: "",
        name: title,
        alert_type: "",
        lang: fr,
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
        retrieve_google_forums: null,
        retrieve_bing: null,
        retrieve_twitter: null,
        retrieve_instagram_public: null,
        retrieve_instagram_public_videos: null,
        retrieve_images: null,
        retrieve_vimeo: null
    },
    sharing: {
        favorited: null,
        mail_alert: daily,
        web_mobile_notification_frequency: none,
        web_desktop_notification_frequency: none
    },
    xml_sources: [],
    my_pages: {},
    google_my_business_locations: {},
    booking_urls: [],
    agoda_urls: [],
    opinion_assurances_urls: [],
    google_places: [],
    expedia_urls: [],
    trip_advisor_urls: []
}

export {
    createAlert
}