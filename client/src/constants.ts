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
  { name: 'arbitrum', logo: arbitrum, alias: 'arb' },
  { name: 'base', logo: base, alias: 'bs' },
  { name: 'boredApeYachtClub', logo: boredApeYachtClub, alias: 'bayc' },
  { name: 'compound', logo: compound, alias: 'cmp' },
  { name: 'cryptopunks', logo: cryptoPunks, alias: 'punk' },
  { name: 'ethDenver', logo: ethDenver, alias: 'denv' },
  { name: 'ethereum', logo: ethereum, alias: 'eth' },
  { name: 'gnosisSafe', logo: gnosis, alias: 'safe' },
  { name: 'harmony', logo: harmony, alias: 'one' },
  { name: 'metamask', logo: metamask, alias: 'mm' },
  { name: 'opensea', logo: openSea, alias: 'os' },
  { name: 'optimism', logo: optimism, alias: 'opt' },
  { name: 'polygon', logo: polygon, alias: 'plg' },
  { name: 'sporkDao', logo: sporkDao, alias: 'sprk' },
  { name: 'uniswap', logo: uniswap, alias: 'uni' },
  { name: 'zksync', logo: zkGame, alias: 'zk' }
];
