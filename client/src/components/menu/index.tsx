import React, {useState} from 'react'
import { Box } from "grommet"
import {Button, Typography} from "antd"
import {getAuth, signOut } from "firebase/auth";
import {LSAccountKey, useUserContext} from "../../context/UserContext";
import {useNavigate} from "react-router-dom";

export const AppMenu = () => {
  const navigate = useNavigate()
  const { currentUser } = useUserContext()
  const [isOpened, setIsOpened] = useState(false)

  const onLogoutClicked = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
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
      {currentUser &&
        <Box gap={'8px'} align={'end'}>
            <Box direction={'row'} gap={'8px'} align={'center'}>
                <Typography.Text style={{ fontWeight: 500, fontSize: '20px' }}>
                  {currentUser.displayName}
                </Typography.Text>
                {currentUser.providerData.length > 0 &&
                    <Typography.Text style={{ fontWeight: 300, color: 'gray' }}>
                      {currentUser.providerData[0].providerId}
                    </Typography.Text>
                }
            </Box>
            <Box width={'100px'}>
                <Button type={'primary'} onClick={onLogoutClicked}>
                    Logout
                </Button>
            </Box>
        </Box>
      }
    </Box>
  </Box>
}
