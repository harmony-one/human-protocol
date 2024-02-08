import React, {useState, useEffect} from 'react'
import {Box, Grid} from "grommet";
import {useUserAccount} from "../../hooks/useUserAccount";
import {postUserTopics} from "../../api/worker";
import {toast} from "react-toastify";
import {Button, Typography} from "antd";
import {TopicsList} from "../../constants";
import styled from "styled-components";
import { CheckOutlined } from '@ant-design/icons';
import {useNavigate} from "react-router-dom";

const TopicItemContainer = styled(Box)`
    position: relative;
    width: 140px;
    height: 140px;
    user-select: none;
    box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 16px;
    border-radius: 6px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px;
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
    <TopicItemContainer onClick={onClick}>
      {isSelected && (
        <Box style={{ position: 'absolute', top: '10px', right: '10px' }}>
          <CheckOutlined style={{ color: 'green', fontSize: '20px' }} />
        </Box>
      )}
      <TopicItemImage src={topic.logo} alt={`${topic.name} logo`} />
    </TopicItemContainer>
  );
};

const WelcomePage: React.FC = () => {
  const { account } = useUserAccount();
  const navigate = useNavigate();
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  useEffect(() => {
    if (selectedTopics.length === 4 && account?.address) {
      postUserTopics(account.address, selectedTopics)
        .then(() => {
          toast.success(`Added ${selectedTopics.length} topics!`, { autoClose: 10000 });
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
      <Grid
        rows="small"
        columns={{ count: 4, size: 'auto' }}
        gap="small"
        align="center"
        justify="center"
      >
        {TopicsList.map(topic => (
          <TopicItem
            key={topic.name}
            topic={topic}
            isSelected={selectedTopics.includes(topic.name)}
            onClick={() => handleTopicClick(topic.name)}
          />
        ))}
      </Grid>
    </Box>
  );
};

export default WelcomePage;