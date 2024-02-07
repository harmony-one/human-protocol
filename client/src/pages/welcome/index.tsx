import React, {useState} from 'react'
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

  const onAddTopicsClicked = async () => {
    try {
      if(!account?.address) {
        return
      }
      setIsLoading(true)
      const data = await postUserTopics(account.address, selectedTopics)
      toast.success(`Added ${selectedTopics.length} topics!`, {
        autoClose: 10000
      })
      navigate('/feed')
    } catch (e) {
      console.error('Cannot add topics', e)
      toast.error(`Cannot add topics: ${(e as Error).message}`, {
        autoClose: 1000
      })
    } finally {
      setIsLoading(false)
    }
  }

  return <Box gap={'24px'} pad={'32px'}>
    <Box justify={'center'} align={'center'}>
      <Typography.Text style={{ fontSize: '24px' }}>Select Your Interests</Typography.Text>
      <Typography.Text style={{ fontSize: '18px', fontWeight: 'bold' }}>Pick at least 4</Typography.Text>
    </Box>
    <Grid style={{
      gap: '10px',
      gridTemplateColumns: 'repeat(4, 1fr)'
    }}>
      {TopicsList.map((topic) => {
        const onClick = () => {
          if(!selectedTopics.includes(topic)) {
            setSelectedTopics([...selectedTopics, topic])
          } else {
            setSelectedTopics(topics => {
              return topics.filter(t => t !== topic)
            })
          }
        }
        return <TopicItem
          key={topic}
          text={topic}
          isSelected={selectedTopics.includes(topic)}
          onClick={onClick}
        />
      })}
    </Grid>
    <Box justify={'center'} align={'center'}>
      <Box width={'150px'}>
        <Button
          type={'primary'}
          loading={isLoading}
          size={'large'}
          disabled={selectedTopics.length < 4}
          onClick={onAddTopicsClicked}
        >
          Add topics
        </Button>
      </Box>
    </Box>
  </Box>
}
