import React, {useEffect, useState} from 'react'
import {Box} from "grommet";
import {Spin} from "antd";
import {useUserAccount} from "../../hooks/useUserAccount";
import {getUserTopics} from "../../api/worker";
import {useNavigate} from "react-router-dom";

export const HomePage = () => {
  const { wallet } = useUserAccount()
  const navigate = useNavigate()

  useEffect(() => {
    const loadData = async () => {
      if(!wallet?.address) {
        console.log('return')
        return false
      }
      let items: string[] = []
      try {
        items = await getUserTopics(wallet.address)
        console.log('User topics: ', items)
      } catch (e) {

      } finally {
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
