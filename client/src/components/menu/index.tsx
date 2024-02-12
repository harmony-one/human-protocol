import React, {useState} from 'react'
import { Box } from "grommet"
import {Button, Typography} from "antd"
import {getAuth, signOut } from "firebase/auth";
import {LSAccountKey, useUserContext} from "../../context/UserContext";
import {useNavigate} from "react-router-dom";
import { shortenAddress } from '../../utils';

export const AppMenu = () => {
  const navigate = useNavigate();
  const { wallet, setWallet } = useUserContext();
  const [isOpened, setIsOpened] = useState(false);

  const onLogoutClicked = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      setWallet(undefined);
      window.localStorage.removeItem(LSAccountKey)
      navigate('/')
    }).catch((e) => {
      console.error('Failed to logout', e)
    });
  }

  return <Box pad={'16px'}>
    <Box align={'end'}>
      {/*{!currentUser &&*/}
      {/*    <Box width={'200px'}>*/}
      {/*        <Button onClick={() => setIsOpened(true)}>*/}
      {/*            Login*/}
      {/*        </Button>*/}
      {/*    </Box>*/}
      {/*}*/}
      {wallet &&
        <Box gap={'8px'} align={'end'}>
            <Box direction={'row'} gap={'8px'} align={'center'}>
                <Typography.Text style={{ fontSize: '16px' }} copyable={{ text: wallet.address }}>
                  {shortenAddress(wallet.address)}
                </Typography.Text>
            </Box>
            <Box width={'100px'}>
                <Button type={'default'} onClick={onLogoutClicked}>
                    Logout
                </Button>
            </Box>
        </Box>
      }
    </Box>
  </Box>
}
