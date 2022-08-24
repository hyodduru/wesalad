import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { AiOutlineCheck } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import Tag from 'antd/lib/tag';
import { devices } from 'styles/devices';

export interface CardsProps {
  id: number;
  cardtype: string;
  title: string;
  period: string;
  number_of_front: string;
  number_of_back: string;
  start_date: string;
  post_stack: IPostStack[];
  post_place: { id: number; title: string };
  post_answer: [
    {
      primary_answer: {
        id: number;
        description: string;
        image_url: string;
      }[];
      secondary_answer: {
        id: number;
        description: string;
        image_url: string;
      }[];
    },
  ];
  status: string;
}

interface IPostStack {
  id: number;
  title: string;
  image_url: string;
  description: string;
}

const Card: FunctionComponent<CardsProps> = ({
  id,
  title,
  period,
  number_of_front,
  number_of_back,
  start_date,
  post_stack,
  post_place,
  post_answer,
  cardtype,
  status,
}) => {
  const navigate = useNavigate();
  const handleCardClick = (id: number) => {
    navigate(`project/${id}`);
  };

  return (
    <MainCard cardtype={cardtype} onClick={() => handleCardClick(id)}>
      <CardTitle>{title}</CardTitle>
      {status === 'active' ? (
        <Tag color="blue" style={{ position: 'absolute', right: 10, top: 20 }}>
          현재 모집 중
        </Tag>
      ) : (
        <Tag color="gray" style={{ position: 'absolute', right: 10, top: 20 }}>
          모집 마감
        </Tag>
      )}

      <CardDescriptions>
        <CardDescription>
          <DescriptionIcon>
            <AiOutlineCheck />
          </DescriptionIcon>
          <DescriptionText>
            {post_place.title} / {period}
          </DescriptionText>
        </CardDescription>
        <CardDescription>
          <DescriptionIcon>
            <AiOutlineCheck />
          </DescriptionIcon>
          <DescriptionText>
            프론트 {number_of_front} / 백 {number_of_back}
          </DescriptionText>
        </CardDescription>
        <CardDescription>
          <DescriptionIcon>
            <AiOutlineCheck />
          </DescriptionIcon>
          <DescriptionText>{start_date.slice(0, 10)} 시작</DescriptionText>
        </CardDescription>
      </CardDescriptions>
      <CharacterCardAndStakLogos>
        <ChacracterCardsWrapper>
          <CardsDescription>이런 분을 찾아요!</CardsDescription>
          {post_answer?.[0]?.primary_answer?.map(
            ({ description, image_url }) => (
              <ChacracterCardWrapper color="#693BFB" key={image_url}>
                <CharacterCardImg src={image_url} alt={description} />
                <ChacracterCardText>{description}</ChacracterCardText>
              </ChacracterCardWrapper>
            ),
          )}
        </ChacracterCardsWrapper>
        <StackLogos>
          {post_stack.map(({ title, image_url }) => (
            <StackLogo key={title + image_url}>
              <Img src={image_url} alt={title} />
            </StackLogo>
          ))}
        </StackLogos>
      </CharacterCardAndStakLogos>
    </MainCard>
  );
};

export default Card;

interface IMainCard {
  cardtype: string;
}

const MainCard = styled.div<IMainCard>`
  min-width: 350px;
  max-width: 420px;
  height: 500px;
  margin: 20px;
  padding: 20px 25px;
  border: 1px solid
    ${({ theme, cardtype }) =>
      cardtype === 'promo' ? theme.mainViolet : '#b9b9b9'};
  border-radius: 5px;
  position: relative;
  cursor: pointer;

  :hover {
    transform: scale(1);
    border: none;
    -webkit-box-shadow: 1px 4px 40px -2px rgba(221, 221, 221, 0.95);
    box-shadow: 1px 5px 40px -2px rgba(221, 221, 221, 0.95);
  }
`;

const StackLogos = styled.div`
  display: flex;
  padding-bottom: 25px;
`;

const StackLogo = styled.div`
  height: 40px;
  width: 40px;
  margin-right: 8px;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;

const CardTitle = styled.div`
  margin-top: 20px;
  font-size: ${({ theme }) => theme.fontMedium};
  font-weight: ${({ theme }) => theme.weightSemiBold};
  line-height: 1.3em;
`;

const CardDescriptions = styled.div`
  margin: 15px 10px;
`;

const CardDescription = styled.div`
  margin-bottom: 7px;
`;

const DescriptionIcon = styled.span`
  margin-right: 5px;
`;

const DescriptionText = styled.span`
  font-size: ${({ theme }) => theme.fontRegular};
  color: #8e8e8e;
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSmall};
  padding-top: 5px;
  padding-left: 3px;
  letter-spacing: 3px;
`;

const CharacterCardAndStakLogos = styled.div`
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ChacracterCardsWrapper = styled.div`
  margin-top: 10px;
`;

const ChacracterCardWrapper = styled.div`
  ${({ theme }) => theme.flexMixIn('center', 'center')};
  margin: 10px;
  padding: 7px;
  border-radius: 5px;
  border: 1px solid ${(props) => props.color};
`;

const CardsDescription = styled.div`
  margin-left: 10px;
`;

const CharacterCardImg = styled.img`
  width: 30px;
  height: 30px;
`;
const ChacracterCardText = styled.div`
  font-size: ${({ theme }) => theme.fontSemiMedium};
  margin-left: 5px;
  font-family: Jua;
`;
