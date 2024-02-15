
import placeholder from './assets/logos/placeholder.png';
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

export const getTopicLits = async (): Promise<UserTopic[]> => {
  const colorPath = './assets/logos'
  
  const logoPromises = baseTopicList.map(async (logo) => {
    try {
      const logoName = logo.name
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
    } catch(e) {
      console.log(e)
      return {
          name: logo.name,
          logoOutline: placeholder,
          logo: placeholder,
          type: logo.type as UserTopicType,
          group: logo.group
    
      }
    }
  })

  const logosPromise = await Promise.all(logoPromises);
  
  return logosPromise
}


