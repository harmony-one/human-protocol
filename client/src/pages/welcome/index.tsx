import React, {useState, useEffect} from 'react'
import {Box, Grid} from "grommet";
import {useUserAccount} from "../../hooks/useUserAccount";
import {postUserTopics} from "../../api/worker";
import {toast} from "react-toastify";
import {TopicsList} from "../../constants";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";

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
  max-width: 100%;
  max-height: 100%;
`;

interface TopicItemProps {
  topic: { name: string; logo: string };
  isSelected: boolean;
  onClick: () => void;
}

const TopicItem: React.FC<TopicItemProps> = ({ topic, isSelected, onClick }) => {
  return (
    <TopicItemContainer isSelected={isSelected} onClick={onClick}>
      <TopicItemImage src={topic.logo} alt={`${topic.name} logo`} />
    </TopicItemContainer>
  );
};

export const WelcomePage: React.FC = () => {
  const { account } = useUserAccount();
  const navigate = useNavigate();
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  useEffect(() => {
    if (selectedTopics.length === 4 && account?.address) {
      postUserTopics(account.address, selectedTopics)
        .then(() => {
          // toast.success(`Added ${selectedTopics.length} topics!`, { autoClose: 10000 });
          navigate('/feed');
        })
        .catch(e => {
          toast.error(`Cannot add topics: ${e.message}`, { autoClose: 1000 });
        });
    }
  }, [selectedTopics, account?.address, navigate]);

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
