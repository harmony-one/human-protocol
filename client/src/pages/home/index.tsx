import React, {useState} from 'react'
import {Box, Text, Anchor} from "grommet";
import {Select, SelectProps, Typography} from "antd";
import {useGeoLocation} from "../../hooks/useGeoLocation";
import {useUserAccount} from "../../hooks/useUserAccount";
import {TopicsList} from "../../constants";

export const HomePage = () => {
  const location = useGeoLocation()
  const { account } = useUserAccount()

  const [selectedTopics, setSelectedTopics] = useState<string[]>([])

  const options: SelectProps['options'] = TopicsList
    .map((topic) => {
      return {
        label: topic,
        value: topic
      }
    });

  return <Box gap={'24px'} pad={'32px'}>
    <Typography.Text style={{ fontSize: '24px' }}>Human Protocol Demo</Typography.Text>
    <Typography.Text copyable={{ text: account?.address }}>
      User address: {account?.address}
    </Typography.Text>
    <Box width={'400px'} gap={'8px'}>
      <Typography.Text>Select topics (4 max):</Typography.Text>
      <Select
        mode="multiple"
        size={'large'}
        allowClear
        style={{ width: '100%' }}
        placeholder="Please select topics (4 max)"
        defaultValue={[]}
        maxCount={4}
        onChange={(values: string[]) => {
          setSelectedTopics(values)
          console.log(`selected ${values}`);
        }}
        options={options}
      />
    </Box>
    {location &&
        <Box>
            <Box gap={'8px'} direction={'row'}>
                <Typography.Text>
                    Location: {location.coords.latitude} {location.coords.longitude}
                </Typography.Text>
                <Typography.Text>
                    <a href={`https://maps.google.com/?q=${location.coords.latitude},${location.coords.longitude}`} target={'_blank'}>
                        Open on Google Maps
                    </a>
                </Typography.Text>
            </Box>
        </Box>
    }
  </Box>
}
