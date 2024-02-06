import React from 'react'
import {Box, Text, Anchor} from "grommet";
import {useGeolocation} from "../../hooks/useGeoLocation";

export const HomePage = () => {
  const data = useGeolocation()

  return <Box gap={'16px'} height={'100vh'} align={'center'} justify={'center'}>
    <Text>Human Protocol Demo</Text>
    {data &&
        <Box gap={'8px'}>
            <Text>My location: {data.coords.latitude} {data.coords.longitude}</Text>
            <Text>
                <Anchor href={`https://maps.google.com/?q=${data.coords.latitude},${data.coords.longitude}`}>
                    Show on Google Maps
                </Anchor>
            </Text>
        </Box>
    }
  </Box>
}
