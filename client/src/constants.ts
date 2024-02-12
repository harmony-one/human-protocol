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

export const TopicsList = [
  'arbitrum', 'base', 'boredApeYachtClub', 'compound', 'cryptopunks',
  'ethDenver', 'ethereum', 'gnosisSafe', 'harmony', 'metamask',
  'opensea', 'optimism', 'polygon', 'sporkDao', 'uniswap', 'zksync',
];

interface Asset {
  logo: string;
  initials: string;
  displayName: string;
}

export const TopicAssets: Record<string, Asset> = {
  arbitrum: { logo: arbitrum, initials: 'Ar', displayName: 'Arbitrum' },
  base: { logo: base, initials: 'B', displayName: 'Base' },
  boredApeYachtClub: { logo: boredApeYachtClub, initials: 'Ba', displayName: 'Bored Ape Yacht Club' },
  compound: { logo: compound, initials: 'Co', displayName: 'Compound' },
  cryptopunks: { logo: cryptoPunks, initials: 'Cp', displayName: 'CryptoPunks' },
  ethDenver: { logo: ethDenver, initials: 'Ed', displayName: 'ETH Denver' },
  ethereum: { logo: ethereum, initials: 'Et', displayName: 'Ethereum' },
  gnosisSafe: { logo: gnosis, initials: 'Gs', displayName: 'Gnosis Safe' },
  harmony: { logo: harmony, initials: 'H1', displayName: 'Harmony' },
  metamask: { logo: metamask, initials: 'Mm', displayName: 'MetaMask' },
  opensea: { logo: openSea, initials: 'Os', displayName: 'OpenSea' },
  optimism: { logo: optimism, initials: 'Op', displayName: 'Optimism' },
  polygon: { logo: polygon, initials: 'Pg', displayName: 'Polygon' },
  sporkDao: { logo: sporkDao, initials: 'Sd', displayName: 'SporkDAO' },
  uniswap: { logo: uniswap, initials: 'Us', displayName: 'Uniswap' },
  zksync: { logo: zkGame, initials: 'Zs', displayName: 'zkSync' },
};
