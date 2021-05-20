import styled from 'styled-components';
import { useState } from 'react';

export default function Tags({ tags, onUpdateTags, toDelete }) {
  const [tag, setTag] = useState('');

  function handleChange(event) {
    setTag(event.target.value);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      onUpdateTags(tag);
      setTag('');
    } else if (tag.length === 0 && event.key === 'Backspace') {
      toDelete(tags.pop());
    }
  }

  return (
    <Tag>
      <label htmlFor="tag">Player Skills</label>
      <TagCloud>
        {tags.map((tag, index) => (
          <span key={index + tag}>
            {tag}
            <button onClick={() => toDelete(tag)}>x</button>
          </span>
        ))}
        <input
          type="text"
          name="tag"
          value={tag}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="write here...."
        />
      </TagCloud>
    </Tag>
  );
}

const Tag = styled.section`
  display: grid;
  font-family: sans-serif;
  gap: 0.4rem;

  input {
    border: none;
    outline: none;
    padding: 0.5rem;
    width: 100%;
  }
`;

const TagCloud = styled.div`
  border: 2px solid black;
  display: flex;

  span {
    background: limegreen;
    border-radius: 0.3rem;
    color: ivory;
    display: flex;
    margin: 0.1rem;
    padding: 0.3rem;
  }
`;
