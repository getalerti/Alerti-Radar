export default {
    alert: [
        {
            name: "name",
            type: "text",
            required: true,
            default_value: "",
            restricted_values: []
        },
        {
            name: "alert_type",
            type: "text",
            required: true,
            default_value: "",
            restricted_values: ["keywords", "social", "reviews"]
        },
        {
            name: "monitor_type",
            type: "text",
            required: false,
            default_value: "",
            restricted_values: [
                "my_company",
                "competitors",
                "me",
                "products",
                "clients",
                "suppliers",
                "industry",
                "place",
                "event",
                "celebrity"
            ]
        },
        {
            name: "lang",
            type: "text",
            required: false,
            default_value: "",
            restricted_values: [
                "aa",
                "ab",
                "ae",
                "af",
                "ak",
                "am",
                "an",
                "ar",
                "as",
                "av",
                "ay",
                "az",
                "ba",
                "be",
                "bg",
                "bh",
                "bi",
                "bm",
                "bn",
                "bo",
                "br",
                "bs",
                "ca",
                "ce",
                "ch",
                "co",
                "cr",
                "cs",
                "cu",
                "cv",
                "cy",
                "da",
                "de",
                "dv",
                "dz",
                "ee",
                "el",
                "en",
                "eo",
                "es",
                "et",
                "eu",
                "fa",
                "ff",
                "fi",
                "fj",
                "fo",
                "fr",
                "fy",
                "ga",
                "gd",
                "gl",
                "gn",
                "gu",
                "gv",
                "ha",
                "he",
                "hi",
                "ho",
                "hr",
                "ht",
                "hu",
                "hy",
                "hz",
                "ia",
                "id",
                "ie",
                "ig",
                "ii",
                "ik",
                "io",
                "is",
                "it",
                "iu",
                "ja",
                "jv",
                "ka",
                "kg",
                "ki",
                "kj",
                "kk",
                "kl",
                "km",
                "kn",
                "ko",
                "kr",
                "ks",
                "ku",
                "kv",
                "kw",
                "ky",
                "la",
                "lb",
                "lg",
                "li",
                "ln",
                "lo",
                "lt",
                "lu",
                "lv",
                "mg",
                "mh",
                "mi",
                "mk",
                "ml",
                "mn",
                "mr",
                "ms",
                "mt",
                "my",
                "na",
                "nb",
                "nd",
                "ne",
                "ng",
                "nl",
                "nn",
                "no",
                "nr",
                "nv",
                "ny",
                "oc",
                "oj",
                "om",
                "or",
                "os",
                "pa",
                "pi",
                "pl",
                "ps",
                "pt",
                "qu",
                "rm",
                "rn",
                "ro",
                "ru",
                "rw",
                "sa",
                "sc",
                "sd",
                "se",
                "sg",
                "si",
                "sk",
                "sl",
                "sm",
                "sn",
                "so",
                "sq",
                "sr",
                "ss",
                "st",
                "su",
                "sv",
                "sw",
                "ta",
                "te",
                "tg",
                "th",
                "ti",
                "tk",
                "tl",
                "tn",
                "to",
                "tr",
                "ts",
                "tt",
                "tw",
                "ty",
                "ug",
                "uk",
                "ur",
                "uz",
                "ve",
                "vi",
                "vo",
                "wa",
                "wo",
                "xh",
                "yi",
                "yo",
                "za",
                "zh",
                "zu"
            ]
        },
        {
            name: "exclude_domains",
            type: "list",
            required: false,
            default_value: "",
            restricted_values: []
        },
        {
            name: "exclude_domain_extensions",
            type: "list",
            required: false,
            default_value: "",
            restricted_values: []
        },
        {
            name: "exclude_twittos",
            type: "list",
            required: false,
            default_value: "",
            restricted_values: []
        },
        {
            name: "twitter_id",
            type: "text",
            required: false,
            default_value: "",
            restricted_values: []
        },
        {
            name: "alert_query_settings",
            type: "list",
            required: false,
            default_value: "",
            restricted_values: []
        },
    ],
    alert_retrieving: [{
        name: "retrieve_blogs",
        type: "bool",
        required: false,
        default_value: "",
        restricted_values: []
    },
        {
            name: "retrieve_twitter",
            type: "bool",
            required: false,
            default_value: "",
            restricted_values: []
        },
        {
            name: "retrieve_trustpilot",
            type: "bool",
            required: false,
            default_value: "",
            restricted_values: []
        },
        {
            name: "retrieve_agoda",
            type: "bool",
            required: false,
            default_value: "",
            restricted_values: []
        },
        {
            name: "retrieve_expedia",
            type: "bool",
            required: false,
            default_value: "",
            restricted_values: []
        },
        {
            name: "retrieve_booking",
            type: "bool",
            required: false,
            default_value: "",
            restricted_values: []
        },
        {
            name: "retrieve_trip_advisor",
            type: "bool",
            required: false,
            default_value: "",
            restricted_values: []
        },
        {
            name: "retrieve_opinion_assurances",
            type: "bool",
            required: false,
            default_value: "",
            restricted_values: []
        },
        {
            name: "retrieve_google_places",
            type: "bool",
            required: false,
            default_value: "",
            restricted_values: []
        },
        {
            name: "retrieve_dailymotion",
            type: "bool",
            required: false,
            default_value: "",
            restricted_values: []
        },
        {
            name: "retrieve_vimeo",
            type: "bool",
            required: false,
            default_value: "",
            restricted_values: []
        },
        {
            name: "retrieve_youtube",
            type: "bool",
            required: false,
            default_value: "",
            restricted_values: []
        },
        {
            name: "retrieve_facebook_reviews",
            type: "bool",
            required: false,
            default_value: "",
            restricted_values: []
        },
        {
            name: "retrieve_instagram_public_videos",
            type: "bool",
            required: false,
            default_value: "",
            restricted_values: []
        },
        {
            name: "retrieve_instagram_public",
            type: "bool",
            required: false,
            default_value: "",
            restricted_values: []
        },
        {
            name: "retrieve_twitter_non_admin",
            type: "bool",
            required: false,
            default_value: "",
            restricted_values: []
        },
        {
            name: "retrieve_twitter_admin",
            type: "bool",
            required: false,
            default_value: "",
            restricted_values: []
        },
        {
            name: "retrieve_instagram_business_non_admin",
            type: "bool",
            required: false,
            default_value: "",
            restricted_values: []
        },
        {
            name: "retrieve_instagram_business",
            type: "bool",
            required: false,
            default_value: "",
            restricted_values: []
        },
        {
            name: "retrieve_facebook_public_posts",
            type: "bool",
            required: false,
            default_value: "",
            restricted_values: []
        },
        {
            name: "retrieve_google_plus",
            type: "bool",
            required: false,
            default_value: "",
            restricted_values: []
        },
        {
            name: "retrieve_facebook_comments",
            type: "bool",
            required: false,
            default_value: "",
            restricted_values: []
        },
        {
            name: "retrieve_facebook",
            type: "bool",
            required: false,
            default_value: "",
            restricted_values: []
        },
        {
            name: "retrieve_bing",
            type: "bool",
            required: false,
            default_value: "",
            restricted_values: []
        },
        {
            name: "retrieve_images",
            type: "bool",
            required: false,
            default_value: "",
            restricted_values: []
        },
        {
            name: "retrieve_videos",
            type: "bool",
            required: false,
            default_value: "",
            restricted_values: []
        },
        {
            name: "retrieve_google_forums",
            type: "bool",
            required: false,
            default_value: "",
            restricted_values: []
        },
        {
            name: "retrieve_news",
            type: "bool",
            required: false,
            default_value: "",
            restricted_values: []
        }],
    google_my_business_locations: [],
    my_pages: [],
    instagram_business_accounts: [],
    twitter_accounts: [],
    other_fan_pages: [],
    non_admin_twitter_accounts: [],
    non_admin_instagram_business_accounts: [],
    opinion_assurances_urls: [],
    trip_advisor_urls: [],
    booking_urls: [],
    expedia_urls: [],
    agoda_urls: [],
    trustpilot_urls: [],
    google_places: [],
    sharing: [{
        name: "mail_alert",
        type: "text",
        required: false,
        default_value: "none",
        restricted_values: ["daily", "weekly", "none", "new_articles"]
    },
        {
            name: "push_notification_frequency",
            type: "text",
            required: false,
            default_value: "new_articles",
            restricted_values: ["daily", "weekly", "none", "new_articles"]
        },
        {
            name: "web_desktop_notification_frequency",
            type: "text",
            required: false,
            default_value: "",
            restricted_values: ["daily", "weekly", "none", "new_articles"]
        },
        {
            name: "web_mobile_notification_frequency",
            type: "text",
            required: false,
            default_value: "",
            restricted_values: ["daily", "weekly", "none", "new_articles"]
        },
        {
            name: "manage_qualification",
            type: "bool",
            required: false,
            default_value: true,
            restricted_values: []
        },
        {
            name: "manage_todos",
            type: "bool",
            required: false,
            default_value: true,
            restricted_values: []
        },
        {
            name: "favorited",
            type: "bool",
            required: false,
            default_value: true,
            restricted_values: []
        },],
    includes: []

};