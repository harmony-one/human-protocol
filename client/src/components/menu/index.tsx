import React, { useEffect } from 'react'
import { Box } from "grommet"
import { Button, Typography } from "antd"
import { useUserContext } from "../../context/UserContext";
import { shortenAddress } from '../../utils';
import { useAuth0 } from '@auth0/auth0-react';
import { firebaseClient } from '../../firebase';

export const AppMenu = () => {
  const { wallet } = useUserContext();
  const { user, loginWithRedirect, logout } = useAuth0();

  useEffect(() => {
    if(user && wallet) {
      firebaseClient.addAuth(wallet.address, {
        nickname: user.nickname || '',
        type: user.sub?.split('|')[0] || '',
      })
    }
  }, [user, wallet]);
  
  return <Box pad={'16px'}>
    <Box align={'end'}>
      <Box direction="row" gap={'8px'} align={'center'}>
        {wallet && <Box direction={'row'} gap={'8px'} align={'center'}>
          <Typography.Text style={{ fontSize: '16px' }} copyable={{ text: wallet?.address }}>
            {wallet ? shortenAddress(wallet.address) : 'Wallet not available'}
          </Typography.Text>
        </Box>}

        {user && <Box direction={'row'} gap={'8px'} align={'center'}>
          <Typography.Text style={{ fontSize: '16px' }} copyable={{ text: wallet?.address }}>
            {user.nickname}
          </Typography.Text>
        </Box>}

        {user ?
          <Box width={'100px'}>
            <Button type={'default'} onClick={() => logout()}>
              Logout
            </Button>
          </Box> :
          <Box width={'100px'}>
            <Button type={'default'} onClick={() => {
              loginWithRedirect();
            }}>
              Login
            </Button>
          </Box>}
      </Box>
    </Box>
  </Box>
}
