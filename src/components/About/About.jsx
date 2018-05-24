import React, { Component } from 'react';
import styled from 'styled-components';
import {
  FaGithub,
  FaTwitter,
  FaLinkedinSquare,
  FaFacebookSquare,
  FaWordpress
} from 'react-icons/lib/fa';

const ProfileImg = styled.img`
  border-radius: 50%;
`;

const LeftContainer = styled.div`
  padding: 20px;
  margin-top: 30px;
  align-self: start;
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 3;

  @media screen and (max-width: 600px) {
    align-self: center;
  }
`;

const RightContainer = styled.div`
  align-self: start;
  padding: 20px;
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 2;
  grid-row-end: 3;
`;

const GridContainer = styled.div`
  margin: 0 auto;
  height: 100vh;
  display: grid;
  grid-template-columns: 0.1fr 250px 1fr 0.1fr;
  grid-template-rows: 0.1fr 1fr;

  @media screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
    height: inherit;
  }
`;

const iconStyle = {
  width: '20px',
  height: '20px'
};

const UserIcon = styled.a`
  margin-left: 5px;
  margin-right: 10px;
  color: black;
  &:hover {
    color: rgba(0, 0, 0, 0.5);
    border-bottom: none;
  }
`;

const WebLink = styled.a`
  color: black;
  border-bottom: 1px dashed;
`;

const SmallerText = styled.span`
  font-size: medium;
`;

const List = styled.ul`
  margin: 10px 0;
`;

const Section = styled.div`
  margin: 10px 0;
  font-size: 1.8rem;
`;

const SubHeading = styled.h4`
  margin-top: 20px;
  margin-bottom: 5px;
`;

class About extends Component {
  render() {
    return (
      <GridContainer>
        <LeftContainer>
          <ProfileImg src="/images/profile.jpg" />
        </LeftContainer>
        <RightContainer>
          <h3>
            Lek Hsiang Hui <SmallerText>PhD</SmallerText>
          </h3>
          <SubHeading>Professional</SubHeading>
          <Section>
            Lecturer at{' '}
            <WebLink
              href="http://www.comp.nus.edu.sg/disa/bio/lekhsian/"
              target="_blank"
            >
              School of Computing, National University of Singapore (NUS)
            </WebLink>
          </Section>
          <Section>
            Teaches (Undergraduates at NUS):
            <List>
              <li>Enterprise Systems Development</li>
              <li>Data Analytics</li>
            </List>
          </Section>
          <Section>
            Executive Training:
            <List>
              <li>
                Healthcare Analytics for Professionals (<WebLink
                  href="http://chi.nus.edu.sg/"
                  target="_blank"
                >
                  Centre for Healthcare Informatics
                </WebLink>)
              </li>
            </List>
          </Section>
          <SubHeading>Personal</SubHeading>
          <Section>
            Mobile App Developer (<WebLink
              href="http://www.blackfacility.com"
              target="_blank"
            >
              See Some Apps
            </WebLink>)
          </Section>
          <Section>
            Interested in Analytics, Marketing, Entrepreneurship, EdTech,
            Natural Language Processing (NLP), Coding <br />- particularly
            Javascript platforms (React, Node, etc)
          </Section>
          <SubHeading>Links/Social</SubHeading>
          <Section>
            <UserIcon href="https://github.com/xianghui" target="_blank">
              <FaGithub style={iconStyle} />
            </UserIcon>
            <UserIcon href="https://twitter.com/hsianghui" target="_blank">
              <FaTwitter style={iconStyle} />
            </UserIcon>
            <UserIcon
              href="https://www.linkedin.com/in/hsianghui"
              target="_blank"
            >
              <FaLinkedinSquare style={iconStyle} />
            </UserIcon>
            <UserIcon href="https://www.facebook.com/hsianghui" target="_blank">
              <FaFacebookSquare style={iconStyle} />
            </UserIcon>
            <UserIcon href="https://xhdev.wordpress.com/" target="_blank">
              <FaWordpress style={iconStyle} />
            </UserIcon>
          </Section>
        </RightContainer>
      </GridContainer>
    );
  }
}

export default About;
