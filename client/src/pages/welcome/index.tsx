import React, {useState, useEffect} from 'react'
import { Box } from "grommet";
import {postUserTopics} from "../../api/worker";
import {toast} from "react-toastify";
import {TopicsList} from "../../constants";
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


const TopicItemImage = styled.img`
  width: 60%;
  margin-top: 10%;
`;

const TopicInitials = styled.span`
  position: absolute;
  bottom: 5px;
  right: 5px;
  font-weight: bold;
  font-size: 0.9em;
`;

interface TopicItemProps {
  topic: { name: string; logo: string; initials: string };
  isSelected: boolean;
  onClick: () => void;
}


const TopicItem: React.FC<TopicItemProps> = ({ topic, isSelected, onClick }) => {
  return (
    <TopicItemContainer isSelected={isSelected} onClick={onClick}>
      <TopicItemImage src={topic.logo} alt={`${topic.name} logo`} />
      <TopicInitials>{topic.initials}</TopicInitials>
    </TopicItemContainer>
  );
};


export const WelcomePage: React.FC = () => {
  // const { user } = useUser();
  const { wallet } = useUserContext();

  const navigate = useNavigate();
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

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

  const handleTopicClick = (topicName: string) => {
    setSelectedTopics(prevSelectedTopics => {
      const isAlreadySelected = prevSelectedTopics.includes(topicName);
      if (isAlreadySelected) {
        return prevSelectedTopics.filter(t => t !== topicName);
      }
      return [...prevSelectedTopics, topicName];
    });
  };

  return (
    <Box pad="medium">
      <TopicsContainer>
        {TopicsList.map(topic => (
          <TopicItem
            key={topic.name}
            topic={topic}
            isSelected={selectedTopics.includes(topic.name)}
            onClick={() => handleTopicClick(topic.name)}
          />
        ))}
      </TopicsContainer>
    </Box>
  );
};
