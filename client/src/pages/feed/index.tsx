import React, {useEffect, useState} from 'react'
import {Box} from "grommet";
import {useUserAccount} from "../../hooks/useUserAccount";
import {getUserActions} from "../../api/worker";
import {Spin, Typography} from "antd";
import {UserAction} from "../../types";

const UserActionItem = (props: { data: UserAction }) => {
  const { data } = props
  return <Box border={{ size: '1px', color: 'black' }}>
    <Box direction={'row'}>
      <Typography.Text>User:</Typography.Text>
      <Typography.Text>{data.user}</Typography.Text>
    </Box>
    <Box direction={'row'}>
      <Typography.Text>Action:</Typography.Text>
      <Typography.Text>{data.action}</Typography.Text>
    </Box>
    <Box direction={'row'}>
      <Typography.Text>Topic:</Typography.Text>
      <Typography.Text>{data.topic}</Typography.Text>
    </Box>
  </Box>
}

export const FeedPage = () => {
  const { account } = useUserAccount()

  const [isLoading, setIsLoading] = useState(false)
  const [userTopics, setUserTopics] = useState<string[]>([])
  const [actions, setActions] = useState<UserAction[]>([])

  useEffect(() => {
    const loadData = async () => {
      if(!account?.address) {
        console.log('return')
        return false
      }
      setIsLoading(true)
      let items: UserAction[] = []
      try {
        items = await getUserActions()
        setActions(items.slice(0, 10))
        console.log('Actions: ', items)
      } catch (e) {

      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [account]);

  const harmonyActions = actions
    .filter(action => action.topic === 'harmony')

  return <Box margin={{ top: '32px' }}>
    <Box>
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
            {harmonyActions.map((item, index) => {
              return <UserActionItem key={item.user + item.action + index.toString()} data={item} />
            })}
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
          <Box gap={'8px'}>
            {actions.map((item, index) => {
              return <UserActionItem key={item.user + item.action + index.toString()} data={item} />
            })}
          </Box>
      }
    </Box>
  </Box>
}
