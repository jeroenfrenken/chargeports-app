import React, { Fragment, useEffect, useState } from 'react';
import { Polyline } from 'react-native-maps';

export default (props) => {
    const [polyLine, setPolyLine] = useState([]);
    let interVal = null;

    useEffect(() => {
        setPolyLine(props.coords);
        animatePolyline();
    });

    function animatePolyline() {
        if (interVal !== null) return;
        interVal = setInterval(() => animatePolylineStart(), 70);
    }

    function animatePolylineStart() {
        if ( polyLine.length < props.coords.length ) {
            const Direction = props.coords;
            const polylinePath = [
                ...Direction.slice(0, polyLine.length - 1)
            ];
            setPolyLine(polylinePath);
        } else {
            setPolyLine([]);
        }
    }

    return (
        <Fragment>
            {
                polyLine.length > 0 && (<Polyline
                    {...props}
                    coordinates={polyLine}
                    strokeColor={"#6690f4"}
                />)
            }
        </Fragment>
    );
}
