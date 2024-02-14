import arbitrum from './assets/logos/arbitrum.svg';
import base from './assets/logos/base.svg';
import boredApeYachtClub from './assets/logos/boredApeYachtClub.svg';
import compound from './assets/logos/compound.svg';
import cryptoPunks from './assets/logos/cryptoPunks.svg';
import ethDenver from './assets/logos/ethDenver.svg';
import ethereum from './assets/logos/ethereum.svg';
import gnosis from './assets/logos/gnosis.svg';
import harmony from './assets/logos/harmony.svg';
import metamask from './assets/logos/metamask.svg';
import openSea from './assets/logos/openSea.svg';
import optimism from './assets/logos/optimism.svg';
import polygon from './assets/logos/polygon.svg';
import sporkDao from './assets/logos/sporkDao.svg';
import uniswap from './assets/logos/uniswap.svg';
import zkGame from './assets/logos/zkGame.svg';
import {UserTopic} from "./types";

export const TopicsList: UserTopic[] = [
  { name: 'arb', logo: arbitrum, type: 'blockchain' },
  { name: 'base', logo: base, type: 'blockchain' },
  { name: 'boredApeYachtClub', logo: boredApeYachtClub, type: 'nft' },
  { name: 'comp', logo: compound, type: 'blockchain' },
  { name: 'cryptopunks', logo: cryptoPunks, type: 'nft' },
  { name: 'ethDenver', logo: ethDenver, type: 'event' },
  { name: 'eth', logo: ethereum, type: 'blockchain' },
  { name: 'gnosisSafe', logo: gnosis, type: 'app' },
  { name: 'one', logo: harmony, type: 'blockchain' },
  { name: 'metamask', logo: metamask, type: 'app' },
  { name: 'opensea', logo: openSea, type: 'nft' },
  { name: 'op', logo: optimism, type: 'blockchain' },
  { name: 'matic', logo: polygon, type: 'blockchain' },
  { name: 'sporkDao', logo: sporkDao, type: 'dao' },
  { name: 'uniswap', logo: uniswap, type: 'app' },
  { name: 'zksync', logo: zkGame, type: 'protocol' }
];
