import {useEffect} from "react";

export default ({ placeholder, onChange = () => {} }) => {
    let auto = null;

    useEffect(() => {
        if (typeof window !== "undefined") {
            var input = document.getElementById('searchTextField');
            auto = new google.maps.places.Autocomplete(input);
            auto.addListener('place_changed', function() {
                var place = auto.getPlace();
                onChange(
                    {
                        "place_id": place.place_id,
                        "name": place.name,
                        "description": input.value
                    }
                );
            });
        }
    }, []);


    return <input placeholder={placeholder} id="searchTextField" type="text" size="50" />
}
