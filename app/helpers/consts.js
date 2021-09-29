const alertTypePodcast = "podcast";
const alertTypeRss = "rss";
const alertTypeSocial = "social";
const alertTypeKeywords = "keywords";
const alertTypeReviews = "reviews";
const alertTypeWebsite = "website";
const isAuthenticatedKey = "@:isAuthenticated";
const isAuthenticatedUser = "@:isAuthenticatedUser";
const isUserSelectTopics = "@:isUserSelectTopics";
const userSelectedTopics = "@:userSelectedTopics";
const alertTypes = [
    alertTypeRss,
    alertTypePodcast,
    // alertTypeWebsite,
]
const getAlertTypes = () => {
    if (process.env.ALERTI_API_URL && process.env.ALERTI_API_TOKEN) {
        return [...alertTypes,
            alertTypeSocial,
            alertTypeKeywords,
            alertTypeReviews
        ]
    }
    return alertTypes;
}
export default {
    alertTypePodcast,
    alertTypeReviews,
    alertTypeRss,
    alertTypeSocial,
    alertTypeKeywords,
    alertTypeWebsite,
    isAuthenticatedKey,
    isAuthenticatedUser,
    isUserSelectTopics,
    userSelectedTopics,
    alertTypes: getAlertTypes(),
}