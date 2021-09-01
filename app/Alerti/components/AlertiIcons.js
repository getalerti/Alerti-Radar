import {
    FcOrganization,
    FcDisapprove,
    FcBusinessman,
    FcBusiness,
    FcReadingEbook,
    FcShipped,
    FcOrgUnit,
    FcShop,
    FcNightPortrait,
    FcCalendar,
    FcInspection,
    FcMindMap,
    FcGlobe,
    FcMultipleInputs,
    FcVideoFile,
    FcCollect,
    FcImageFile,
    FcKindle,
    FcNews,
    FcApproval,
    FcMinus,
    FcIphone,
    FcSelfServiceKiosk,
    FcCancel
} from "react-icons/fc";
import { AiOutlineInstagram, AiOutlineTwitter, AiFillFacebook, AiOutlineMail } from "react-icons/ai";
import { HiOutlineRss } from "react-icons/hi";
import CustomIcon from "./../assets/icons";

export default ({name}) => {
    if(name === "my_company")
        return <FcOrganization />
    if(name === "competitors")
        return <FcDisapprove />
    if(name === "me")
        return <FcBusinessman />
    if(name === "products")
        return <FcBusiness />
    if(name === "clients")
        return <FcReadingEbook />
    if(name === "suppliers")
        return <FcShipped />
    if(name === "industry")
        return <FcOrgUnit />
    if(name === "place")
        return <FcShop />
    if(name === "celebrity")
        return <FcNightPortrait />
    if(name === "celebrity")
        return <FcNightPortrait />
    if(name === "event")
        return <FcCalendar />
    if(name === "name")
        return <FcInspection />
    if(name === "keywords")
        return <FcMindMap />
    if(name === "lang")
        return <FcGlobe />
    if(name === "source")
        return <FcMultipleInputs />
    if(name === "reviews")
        return <FcApproval />
    if(name === "news")
        return <FcNews />
    if(name === "other")
        return <FcCancel />
    if(name === "blogs")
        return <FcKindle />
    if(name === "twitter")
        return <AiOutlineTwitter />
    if(name === "instagram_public_posts")
        return <AiOutlineInstagram />
    if(name === "instagram_public_videos")
        return <AiOutlineInstagram />
    if(name === "images")
        return <FcImageFile />
    if(name === "forums")
        return <FcCollect />
    if(name === "videos")
        return <FcVideoFile />
    if(name === "facebook")
        return <AiFillFacebook />
    if(name === "rss")
        return <HiOutlineRss />
    if(name === "exclude")
        return <FcMinus />
    if(name === "mobile")
        return <FcIphone />
    if(name === "desktop")
        return <FcSelfServiceKiosk />
    if(name === "email")
        return <AiOutlineMail />

    if(name === "opinion_assurances")
        return <CustomIcon name={"opinion_assurances"} />
    if(name === "trip_advisor")
        return <CustomIcon name={"trip_advisor"} />
    if(name === "booking")
        return <CustomIcon name={"booking"} />
    if(name === "expedia")
        return <CustomIcon name={"expedia"} />
    if(name === "agoda")
        return <CustomIcon name={"agoda"} />
    if(name === "trustpilot")
        return <CustomIcon name={"trustpilot"} />
    console.log( `if(name === "${name}")
        return <FcVideoFile />` )
    return <s>{name}</s>
}