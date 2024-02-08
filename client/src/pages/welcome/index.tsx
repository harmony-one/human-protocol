import React, {useState, useEffect} from 'react'
import {Box, Grid} from "grommet";
import {useUserAccount} from "../../hooks/useUserAccount";
import {postUserTopics} from "../../api/worker";
import {toast} from "react-toastify";
import {Button, Typography} from "antd";
import {TopicsList} from "../../constants";
import styled from "styled-components";
import { CheckOutlined } from '@ant-design/icons';
import {useNavigate} from "react-router-dom";

interface TopicItemProps {
  text: string
  isSelected: boolean
  onClick: () => void
}

const TopicItemContainer = styled(Box)`
    position: relative;
    width: 140px;
    height: 140px;
    user-select: none;
    box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 16px;
    border-radius: 6px;
`

const TopicItem = (props: TopicItemProps) => {
  const { text, isSelected } = props
  return <TopicItemContainer justify={'end'} onClick={props.onClick}>
    {isSelected &&
        <Box style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <CheckOutlined style={{ color: 'green', fontSize: '20px' }} />
        </Box>
    }
   <Box alignSelf={'center'}>
     <Typography.Text>{text}</Typography.Text>
   </Box>
  </TopicItemContainer>
}

export const WelcomePage = () => {
  const { account } = useUserAccount()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])

  useEffect(() => {
    const submitTopics = async () => {
      // Here's where we'll add the check
      if (selectedTopics.length === 4 && account?.address) { // Ensure account address is not undefined
        try {
          setIsLoading(true);
          // Now we can safely call postUserTopics because account.address is confirmed to be defined
          const data = await postUserTopics(account.address, selectedTopics);
          toast.success(`Added ${selectedTopics.length} topics!`, {
            autoClose: 10000
          });
          navigate('/feed');
        } catch (e) {
          console.error('Cannot add topics', e);
          toast.error(`Cannot add topics: ${(e as Error).message}`, {
            autoClose: 1000
          });
        } finally {
          setIsLoading(false);
        }
      } else if (selectedTopics.length === 4 && !account?.address) {
        // Handle the case where an account address is not available
        toast.error('Account information is missing, cannot proceed.');
      }
    };
    submitTopics();
  }, [selectedTopics, account?.address, navigate]);

  return <Box gap={'24px'} pad={'32px'}>
    <Grid style={{
      gap: '10px',
      gridTemplateColumns: 'repeat(4, 1fr)'
    }}>
      {TopicsList.map((topic) => {
        const onClick = () => {
          const newSelectedTopics = selectedTopics.includes(topic) 
            ? selectedTopics.filter(t => t !== topic)
            : [...selectedTopics, topic];
          setSelectedTopics(newSelectedTopics);
        };
        return <TopicItem
          key={topic}
          text={topic}
          isSelected={selectedTopics.includes(topic)}
          onClick={onClick}
        />
      })}
    </Grid>
  </Box>
}
