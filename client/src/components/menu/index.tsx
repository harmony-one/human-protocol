import React, {useState} from 'react'
import { Box } from "grommet"
import {Button, Modal, Typography} from "antd"
import {getAuth, TwitterAuthProvider,GithubAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import {useUserAccount} from "../../hooks/useUserAccount";

export const AppMenu = () => {
  const { currentUser } = useUserAccount()
  const [isOpened, setIsOpened] = useState(false)

  const onGithubClicked = () => {
    const provider = new GithubAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        if(credential) {
          const token = credential.accessToken;

          // The signed-in user info.
          const user = result.user;
          // IdP data available using getAdditionalUserInfo(result)
          console.log('Github user successfully authorized! User:', user, ', credential:', credential)
          setIsOpened(false)
        }
      }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GithubAuthProvider.credentialFromError(error);
      // ...
    });
  }

  const onTwitterClicked = async () => {
    const auth = getAuth();
    const provider = new TwitterAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
        // You can use these server side with your app's credentials to access the Twitter API.
        const credential = TwitterAuthProvider.credentialFromResult(result);
        if(credential) {
          const token = credential.accessToken;
          const secret = credential.secret;
        }

        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        console.log('Twitter user successfully authorized! User:', user, ', credential:', credential)
        setIsOpened(false)
      }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = TwitterAuthProvider.credentialFromError(error);
    });
  }

  const onLogoutClicked = () => {
    const auth = getAuth();
    signOut(auth).then(() => {

    }).catch((error) => {
      // An error happened.
    });
  }

  return <Box pad={'16px'}>
    <Box align={'end'}>
      {!currentUser &&
          <Box width={'200px'}>
              <Button onClick={() => setIsOpened(true)}>
                  Login
              </Button>
          </Box>
      }
      {currentUser &&
        <Box gap={'8px'} align={'end'}>
            <Box>
                <Typography.Text style={{ fontWeight: 500, fontSize: '18px' }}>
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

    <Modal
      title="Login"
      open={isOpened}
      onOk={() => setIsOpened(false)}
      onCancel={() => setIsOpened(false)}
      okButtonProps={{ disabled: false }}
      cancelButtonProps={{ disabled: false }}
    >
      <Box gap={'24px'} align={'center'}>
        <Button type={'primary'} onClick={onTwitterClicked}>Continue with Twitter</Button>
        <Button type={'primary'} onClick={onGithubClicked}>Continue with Github</Button>
      </Box>
    </Modal>
  </Box>
}
