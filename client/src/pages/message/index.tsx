import React, { useEffect, useState } from 'react'
import { Box } from "grommet";
import { getUserActions, sendUserAction } from "../../api/worker";
import { Spin, Typography, List, Input, Button, Select, SelectProps } from "antd";
import { UserAction } from "../../types";
import { TopicsList } from "../../constants";
import { toast } from "react-toastify";
import { useUserContext } from '../../context/UserContext';
import { firebaseClient } from '../../firebase';

export const MessagePage = () => {
  // const { user } = useUser()
  const { wallet } = useUserContext();

  const [isLoading, setIsLoading] = useState(false)
  const [selectedTopic, setSelectedTopic] = useState<string>('')
  const [userText, setUserText] = useState<string>('')
  const [actions, setActions] = useState<UserAction[]>([])

  const loadData = async () => {
    if (!wallet?.address) {
      return false
    }
    setIsLoading(true)
    let items: UserAction[] = []
    try {
      items = await getUserActions()
      setActions(items.filter(item => item.user).slice(0, 10))
      console.log('Actions: ', items)
    } catch (e) {

    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [wallet]);

  const harmonyActions = actions
    .filter(action => action.topic === 'harmony')

  const options = TopicsList.map((topic) => ({
    label: topic.name,
    value: topic.name,
  }));

  const onSendMessageClicked = async () => {
    if (!wallet?.address) {
      return
    }

    try {
      await firebaseClient.addMessage({
        text: userText,
        address: wallet?.address
      })
      toast.success('Message sent!', {
        autoClose: 10000
      })
      loadData()
    } catch (e) {
      toast.error(`Error: ${(e as Error).message}`, {
        autoClose: 10000
      })
    }
  }

  return <Box margin={{ top: '32px' }}>
    <Box>
      <Box align={'center'}>
        <Typography.Text style={{ fontSize: '22px' }}>Add new Message</Typography.Text>
      </Box>
      <Box>
        <Box>
          <Typography.Text>Enter any text:</Typography.Text>
          <Input
            value={userText}
            onChange={(e) => setUserText(e.target.value)}
          />
        </Box>
        <Box margin={{ top: '16px' }}>
          <Button type={'primary'} disabled={false} onClick={onSendMessageClicked}>
            Send Message
          </Button>
        </Box>
      </Box>
    </Box>

    <Box margin={{ top: '42px' }}>
      <Box align={'center'}>
        <Typography.Text style={{ fontSize: '22px' }}>Harmony</Typography.Text>
      </Box>
      {isLoading &&
        <Box>
          <Spin />
        </Box>
      }
      {!isLoading &&
        <Box>
          <List
            size="small"
            // header={<div>Header</div>}
            // footer={<div>Footer</div>}
            bordered
            dataSource={harmonyActions}
            renderItem={(item) => <List.Item>
              User: {item.user}, topic: {item.topic}
            </List.Item>}
          />
        </Box>
      }
    </Box>
    <Box margin={{ top: '32px' }}>
      <Box align={'center'}>
        <Typography.Text style={{ fontSize: '22px' }}>Global</Typography.Text>
      </Box>
      {isLoading &&
        <Box>
          <Spin />
        </Box>
      }
      {!isLoading &&
        <Box>
          <List
            size="small"
            // header={<div>Header</div>}
            // footer={<div>Footer</div>}
            bordered
            dataSource={actions}
            renderItem={(item) => <List.Item>
              User: {item.user}, topic: {item.topic}, payload: {JSON.stringify(item.payload)}
            </List.Item>}
          />
        </Box>
      }
    </Box>
  </Box>
}
