import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './TagInput.css';

const TagInput = (props) => {
    const [tagInput, setTagInput] = useState('');
    const [tags, setTags] = useState([]);
    const datalistId = `${ props.name || 'tagData' }_list`;

    const onKeyPress = (e) => {
        let tag = tagInput.trim();

        if (e.charCode === 13) {
            e.preventDefault();
            if(!tags.includes(tag)) setTags([...tags, tag]);
            setTagInput('');
        }
    }

    const onKeyUp = ({ keyCode }) => {
        let tag = tagInput.trim();

        if(keyCode === 8 && !tag.length && tags.length) {
            const lastTag = tags[tags.length - 1];
            setTags(tags.filter(t => t !== lastTag));
            setTagInput(lastTag);
        }
    }

    const deleteTag = (index) => {
        setTags(tags.filter((t, i) => i !== index));
    }

    const tagStyle = {
        backgroundColor: props.tagBackgroundColor || 'mediumseagreen',
        border: `1px solid ${props.tagBackgroundColor || 'mediumseagreen'}`,
        color: props.tagColor || 'white'
    }

    const buttonStyle = {
        color: props.tagColor || 'white'
    }
 
    return (
        <div className="tag-container">
            {tags.map((tag, index) => (
                <div 
                    className="tag" 
                    key={index}
                    style={tagStyle}
                >
                    {tag}
                    <button 
                        style={buttonStyle}
                        onClick={(e) => {
                            e.preventDefault();
                            deleteTag(index);
                        }}
                    >x</button>
                </div>
            ))}
            <input 
                value={tagInput}
                placeholder={props.placeholder || "Enter a tag"}
                onChange={(e) => { setTagInput(e.target.value) }}
                onKeyPress={onKeyPress}
                onKeyUp={onKeyUp}
            />
            {props.data && (
                <datalist id={datalistId}>
                    {props.data.map((item, index) => <option key={index}>{item}</option>)}
                </datalist>
            )}
            
        </div>
    );
}

TagInput.propTypes = {
    name: PropTypes.string,
    placeholder: PropTypes.string,
    data: PropTypes.array,
    tagBackgroundColor: PropTypes.string,
    tagColor: PropTypes.string
}

export default TagInput;