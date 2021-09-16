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