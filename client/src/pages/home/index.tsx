import React, {useEffect, useState} from 'react'
import {Box} from "grommet";
import {Spin} from "antd";
import {useUserAccount} from "../../hooks/useUserAccount";
import {getUserTopics, postUserTopics} from "../../api/worker";
import {useNavigate} from "react-router-dom";

export const HomePage = () => {
  const { wallet } = useUserAccount()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [userTopics, setUserTopics] = useState<string[]>([])

  useEffect(() => {
    const loadData = async () => {
      if(!wallet?.address) {
        console.log('return')
        return false
      }
      setIsLoading(true)
      let items: string[] = []
      try {
        items = await getUserTopics(wallet.address)
        console.log('User topics: ', items)
      } catch (e) {

      } finally {
        setIsLoading(false)
        if(items.length === 0) {
          navigate('/welcome')
        } else {
          navigate('/feed')
        }
      }
    }
    loadData()
  }, [wallet]);

  return <Box margin={{ top: '32px' }}>
    <Spin size={'default'} />
  </Box>
}
