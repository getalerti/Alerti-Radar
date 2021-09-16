import agoda from './agoda.svg';
import triadvisor from './triadvisor.svg';
import booking from './booking.svg';
import expedia from './expedia.svg';
import trustpilot from './trustpilot.svg';
import opinion_assurances from './opinion_assurance.svg';
import myBusiness from './myBusiness.svg';

export default ({name}) => {
    if (name === "agoda") return <img src={agoda} />;
    if (name === "trip_advisor") return <img src={triadvisor} />;
    if (name === "opinion_assurances") return <img src={opinion_assurances} />;
    if (name === "trustpilot") return <img src={trustpilot} />;
    if (name === "expedia") return <img src={expedia} />;
    if (name === "booking") return <img src={booking} />;
    if (name === "myBusiness") return <img src={myBusiness} />;
    return  <s>custom - {name}</s>
}