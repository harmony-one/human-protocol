// import arbitrum from './assets/logos/arbitrum.svg';
// import base from './assets/logos/base.svg';
// import boredApeYachtClub from './assets/logos/boredApeYachtClub.svg';
// import compound from './assets/logos/compound.svg';
// import cryptoPunks from './assets/logos/cryptoPunks.svg';
// import ethDenver from './assets/logos/ethDenver.svg';
// import ethereum from './assets/logos/ethereum.svg';
// import gnosis from './assets/logos/gnosis.svg';
// import harmony from './assets/logos/harmony.svg';
// import metamask from './assets/logos/metamask.svg';
// import openSea from './assets/logos/openSea.svg';
// import optimism from './assets/logos/optimism.svg';
// import polygon from './assets/logos/polygon.svg';
// import sporkDao from './assets/logos/sporkDao.svg';
// import uniswap from './assets/logos/uniswap.svg';
// import zkGame from './assets/logos/zkGame.svg';
import oneColor from './assets/logos/one-color.svg';
import oneOutline from './assets/logos/one-grey.svg';
import {UserTopicType, type UserTopic} from "./types";

export const baseTopicList = [
  { name: 'chainlink', group: 1, type: 'blockchain'},
  { name: 'base', group: 1, type: 'blockchain'},
  { name: 'trustwallet', group: 1, type: 'blockchain'},
  { name: 'optimism', group: 1, type: 'blockchain'},
  { name: 'sandbox', group: 1, type: 'blockchain'},
  { name: 'opensea', group: 1, type: 'blockchain'},
  { name: 'arbitrum', group: 1, type: 'blockchain'},
  { name: 'ethfoundation', group: 1, type: 'blockchain'},
  { name: 'ethdenver', group: 1, type: 'blockchain'},
  { name: 'polygon', group: 1, type: 'blockchain'},
  { name: 'kraken', group: 1, type: 'blockchain'},
  { name: 'eth', group: 1, type: 'blockchain'},
  // group 2
  { name: 'sol', group: 2, type: 'blockchain'},
  { name: 'one', group: 2, type: 'blockchain'},
  { name: 'kucoin', group: 2, type: 'blockchain'},
  { name: 'compound', group: 2, type: 'blockchain'},
  { name: 'metamask', group: 2, type: 'blockchain'},
  { name: 'btc', group: 2, type: 'blockchain'},
  { name: 'binance', group: 2, type: 'blockchain'},
  { name: 'pancakeswap', group: 2, type: 'blockchain'},
  // group 3
  { name: '1inch', group: 3, type: 'blockchain'},
  { name: 'spork', group: 3, type: 'blockchain'},
  { name: 'cryptopunks', group: 3, type: 'blockchain'},
  { name: 'sushiswap', group: 3, type: 'blockchain'},
  { name: 'uniswap', group: 3, type: 'blockchain'},
  { name: 'timeless', group: 3, type: 'blockchain'},
  { name: 'zksync', group: 3, type: 'blockchain'},
  { name: 'boredapes', group: 3, type: 'blockchain'},
  { name: 'ledger', group: 3, type: 'blockchain'},
  { name: 'consensys', group: 3, type: 'blockchain'},
  { name: 'okx', group: 3, type: 'blockchain'},
  { name: 'gnosis', group: 3, type: 'blockchain'},
]

// export const TopicsList: UserTopic[] = [
//   { name: 'chainlink', group: 1, type: 'blockchain', logoOutline: 'https://jmp.sh/F9cYk5IG', logo: 'https://jmp.sh/7KmqmYMp' },
//   { name: 'base', group: 1, type: 'blockchain', logoOutline: oneOutline, logo: oneColor },
//   { name: 'trustwallet', group: 1, type: 'blockchain', logoOutline: oneOutline, logo: oneColor },
//   { name: 'optimism', group: 1, type: 'blockchain', logoOutline: oneOutline, logo: oneColor },
//   { name: 'sandbox', group: 1, type: 'blockchain', logoOutline: oneOutline, logo: oneColor },
//   { name: 'opensea', group: 1, type: 'blockchain', logoOutline: oneOutline, logo: oneColor },
//   { name: 'arbitrum', group: 1, type: 'blockchain', logoOutline: oneOutline, logo: oneColor },
//   { name: 'ethfoundation', group: 1, type: 'blockchain', logoOutline: oneOutline, logo: oneColor },
//   { name: 'ethdenver', group: 1, type: 'blockchain', logoOutline: oneOutline, logo: oneColor },
//   { name: 'polygon', group: 1, type: 'blockchain', logoOutline: oneOutline, logo: oneColor },
//   { name: 'kraken', group: 1, type: 'blockchain', logoOutline: oneOutline, logo: oneColor },
//   { name: 'eth', group: 1, type: 'blockchain', logoOutline: oneOutline, logo: oneColor },
//   // group 2
//   { name: 'sol', group: 2, type: 'blockchain', logoOutline: oneOutline, logo: oneColor },
//   { name: 'one', group: 2, type: 'blockchain', logoOutline: oneOutline, logo: oneColor },
//   { name: 'kucoin', group: 2, type: 'blockchain', logoOutline: oneOutline, logo: oneColor },
//   { name: 'compound', group: 2, type: 'blockchain', logoOutline: oneOutline, logo: oneColor },
//   { name: 'metamask', group: 2, type: 'blockchain', logoOutline: oneOutline, logo: oneColor },
//   { name: 'btc', group: 2, type: 'blockchain', logoOutline: oneOutline, logo: oneColor },
//   { name: 'binance', group: 2, type: 'blockchain', logoOutline: oneOutline, logo: oneColor },
//   { name: 'pancakeswap', group: 2, type: 'blockchain', logoOutline: oneOutline, logo: oneColor },
//   // group 3
//   { name: '1inch', group: 3, type: 'blockchain', logoOutline: oneOutline, logo: oneColor },
//   { name: 'spork', group: 3, type: 'blockchain', logoOutline: oneOutline, logo: oneColor },
//   { name: 'cryptopunks', group: 3, type: 'blockchain', logoOutline: oneOutline, logo: oneColor },
//   { name: 'sushiswap', group: 3, type: 'blockchain', logoOutline: oneOutline, logo: oneColor },
//   { name: 'uniswap', group: 3, type: 'blockchain', logoOutline: oneOutline, logo: oneColor },
//   { name: 'timeless', group: 3, type: 'blockchain', logoOutline: oneOutline, logo: oneColor },
//   { name: 'zksync', group: 3, type: 'blockchain', logoOutline: oneOutline, logo: oneColor },
//   { name: 'boredapes', group: 3, type: 'blockchain', logoOutline: oneOutline, logo: oneColor },
//   { name: 'ledger', group: 3, type: 'blockchain', logoOutline: oneOutline, logo: oneColor },
//   { name: 'consensys', group: 3, type: 'blockchain', logoOutline: oneOutline, logo: oneColor },
//   { name: 'okx', group: 3, type: 'blockchain', logoOutline: oneOutline, logo: oneColor },
//   { name: 'gnosis', group: 3, type: 'blockchain', logoOutline: oneOutline, logo: oneColor },
// ]

export const getTopicLits = async (): Promise<UserTopic[]> => {
  const colorPath = './assets/logos'
  
  const logoPromises = baseTopicList.map(async (logo) => {
    const logoName = 'one' // logo.name for testing. Waiting the rest of logos on logoname-color.svg logoname-grey.svg format
    const [logoColor, logoOutline] = await Promise.all([
        import(`${colorPath}/${logoName}-color.svg`),
        import(`${colorPath}/${logoName}-grey.svg`)
    ]);

    return {
        name: logo.name,
        logoOutline: logoOutline.default,
        logo: logoColor.default,
        type: logo.type as UserTopicType,
        group: logo.group
    };
  })

  const logosPromise = await Promise.all(logoPromises);
  
  return logosPromise
}


