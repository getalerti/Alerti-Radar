import {useEffect, useState} from "react";
import TwitterAvatar from "./../assets/img/twitter-avatar.png"

export default ({ username }) => {
    const [src, setSrc] = useState(null);
    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append(
            'Authorization',
            'Bearer ' + process.env.TWITTER_BEARER_TOKEN
        );
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            mode: 'no-cors',
            redirect: 'follow'
        };

        fetch("https://api.twitter.com/1.1/users/show/" + username + ".json", requestOptions)
            .then(response => response.text())
            .then(result => {
                const url = result.profile_image_url_https;
                setSrc(url)
            })
            .catch(error => console.log('error', error));
    }, [])
    return <img src={src ? src : TwitterAvatar} />
}