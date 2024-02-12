import React, {useState, useEffect, useRef} from 'react'
import { Box } from "grommet";
import {postUserTopics} from "../../api/worker";
import {toast} from "react-toastify";
import {TopicsList, TopicAssets} from "../../constants";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import { useUserContext } from '../../context/UserContext';


const TopicsContainer = styled(Box)`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20%, 1fr));
    gap: 16px;
    padding: 16px;
`

const TopicItemContainer = styled(Box)<{ isSelected?: boolean }>`
    aspect-ratio: 1 / 1;
    width: 100%;
    max-height: 100%;
    position: relative;
    user-select: none;
    box-shadow: rgba(0, 0, 0, 0.08) 0 4px 16px;
    border-radius: 6px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 10%;

    transition: transform 250ms;
    &:hover {
        transform: scale(1.1);
    }
    //&:active {
    //    transform: scale(1.12);
    //}
    ${props => (props.isSelected) && `
      transform: scale(1.1);
      border: 2px solid #A1EEBD;
    `}
`

const TopicItemImageContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding-top: 5%;
`;

const TopicItemImage = styled.img`
  height: 70%;
  width: auto;
  object-fit: contain;
  margin: auto;
`;

const TopicInitials = styled.span`
  position: absolute;
  bottom: 0px;
  right: 6px;
  font-weight: bold;
  font-size: 0.8em;
`;

const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000; // Ensure it's above other content
  display: flex;
  justify-content: center;
  align-items: center;
`;


interface TopicItemProps {
  topic: string;
  isSelected: boolean;
  onClick: () => void;
}

const TopicItem: React.FC<TopicItemProps> = ({ topic, isSelected, onClick }) => {
  const asset = TopicAssets[topic];
  return (
    <TopicItemContainer isSelected={isSelected} onClick={onClick}>
      {/* Wrap TopicItemImage with TopicItemImageContainer */}
      <TopicItemImageContainer>
        <TopicItemImage src={asset.logo} alt={`${topic} logo`} />
      </TopicItemImageContainer>
      <TopicInitials>{asset.initials}</TopicInitials>
    </TopicItemContainer>
  );
};


export const WelcomePage: React.FC = () => {
  // const { user } = useUser();
  const { wallet } = useUserContext();

  const navigate = useNavigate();
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedTopicName, setSelectedTopicName] = useState<string | null>(null);
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);

  useEffect(() => {
    if (selectedTopics.length === 4 && wallet?.address) {
      postUserTopics(wallet.address, selectedTopics)
        .then(() => {
          // toast.success(`Added ${selectedTopics.length} topics!`, { autoClose: 10000 });
          navigate('/feed');
        })
        .catch(e => {
          toast.error(`Cannot add topics: ${e.message}`, { autoClose: 1000 });
        });
    }
  }, [selectedTopics, wallet?.address, navigate]);



  const popupTimeoutRef = useRef<number | null>(null);

  const handleTopicClick = (topicName: string) => {
    
    setSelectedTopics(prevSelectedTopics => {
      const isAlreadySelected = prevSelectedTopics.includes(topicName);
      if (isAlreadySelected) {
        setIsPopupVisible(false);
        if (popupTimeoutRef.current) {
          clearTimeout(popupTimeoutRef.current);
        }
        return prevSelectedTopics.filter(t => t !== topicName);
      } else {
        
        setSelectedTopicName(topicName);
        setIsPopupVisible(true);


        if (popupTimeoutRef.current) {
          clearTimeout(popupTimeoutRef.current);
        }

        popupTimeoutRef.current = window.setTimeout(() => {
          setIsPopupVisible(false);
      }, 1500) as unknown as number;
      

        setTimeout(() => {
          const hidePopup = (event: MouseEvent | TouchEvent) => {
            let clickedTopicName: string | undefined;

            if ('touches' in event) {
              const touch = event.touches[0];
              const target = document.elementFromPoint(touch.clientX, touch.clientY) as HTMLElement;
              clickedTopicName = target.dataset.topicName;
            } else {
              const target = event.target as HTMLElement;
              clickedTopicName = target.dataset.topicName;
            }

            if (clickedTopicName === topicName) {
              setIsPopupVisible(false);
              document.removeEventListener('click', hidePopup);
              document.removeEventListener('touchstart', hidePopup);
              if (popupTimeoutRef.current) {
                clearTimeout(popupTimeoutRef.current);
              }
            }
          };
          document.addEventListener('click', hidePopup, { once: true });
          document.addEventListener('touchstart', hidePopup, { once: true, passive: true });
        }, 10);

      }
      return [...prevSelectedTopics, topicName];
    });
  };  
  
  useEffect(() => {
    return () => {
      if (popupTimeoutRef.current) {
        clearTimeout(popupTimeoutRef.current);
      }
    };
  }, []);
  

  return (
    <Box pad="medium">
      {isPopupVisible && selectedTopicName && (
        <PopupContainer>
          <strong>{TopicAssets[selectedTopicName]?.displayName}</strong>
        </PopupContainer>
      )}
      <TopicsContainer>
        {TopicsList.map(topicName => (
          <TopicItem
            key={topicName}
            topic={topicName}
            isSelected={selectedTopics.includes(topicName)}
            onClick={() => handleTopicClick(topicName)}
          />
        ))}
      </TopicsContainer>
    </Box>
  );  
};