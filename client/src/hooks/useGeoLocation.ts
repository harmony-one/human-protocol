import {useEffect, useState} from "react";

export const useGeoLocation = () => {
  const [state, setState] = useState<GeolocationPosition>();
  let mounted = true;
  let watchId: number;

  const onEvent = (event: GeolocationPosition) => {
    if (mounted) {
      setState(event);
    }
  };
  const onError = (error: any) => {
    setState(error);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onEvent, onError);
    watchId = navigator.geolocation.watchPosition(onEvent, onError);

    return () => {
      mounted = false;
      navigator.geolocation.clearWatch(watchId);
    };
  }, [0]);

  return state;
};
