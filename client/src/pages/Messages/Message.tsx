import React from 'react'
import {Link} from "react-router-dom";
import {extractStreet, extractZip, parseMessage} from "../../utils";
import {IMessage} from "../../firebase/interfaces";
import {Box} from "grommet";
import styled from "styled-components";

const MessageContainer = styled(Box)`
    width: 600px;
    max-width: 100%;
    border: 1px solid #ddd;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    margin-bottom: 10px;
    position: relative;
    overflow-wrap: break-word;
    align-items: center;
`

const SubmissionHeader = styled(Box)`
    position: absolute;
    top: -10px;
    left: 20px;
    background-color: #fff;
    padding: 0 5px;
    border-radius: 3px;
    font-weight: bold;
    color: #007bff;
`

const MessageContent = styled(Box)`
    font-size: 14px;
    text-align: left;
`

export const UserMessage = (props: { message: IMessage }) => {
  const { message } = props

  return <MessageContainer key={message.id}>
    <SubmissionHeader>
      <Link to={`/${message.username}`} className="username-link">
        {message.username ? `@${message.username}` : "Anonymous"}
      </Link>
    </SubmissionHeader>
    <MessageContent>
      <p
        dangerouslySetInnerHTML={{__html: parseMessage(message.text)}}
      ></p>
      {message.images &&
        message.images.map((imageUrl) => (
          <img
            key={imageUrl}
            src={imageUrl}
            alt="Posted"
            className="submission-image"
          />
        ))}
      <div className="submission-timestamp">
        <small>
          {new Date(message.timestamp).toLocaleDateString("en-US", {
              month: "numeric",
              day: "numeric",
            }) +
            " " +
            new Date(message.timestamp).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}{" "}
          {/* Added a space inside the curly braces */}
        </small>
        <small>
          {(() => {
            const street = extractStreet(message.address);
            const zip = extractZip(message.address);
            if (street && zip) {
              return ` ${street}, ${zip}`; // Ensure there is a space at the start of this string
            } else {
              return "No Location";
            }
          })()}
        </small>
      </div>
    </MessageContent>
  </MessageContainer>
}
