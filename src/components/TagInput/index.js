import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import 'components/TagInput/style.css';

const TagInput = (props) => {
    const { 
        name,
        onChange,
        onDelete,
        tagBackgroundColor,
        tagColor,
        listData,
        placeholder,
        value
    } = props;

    const [tagInput, setTagInput] = useState('');
    const [tags, setTags] = useState(value);
    const datalistId = `${ name || 'tagData' }_list`;

    const addTag = (tag) => {
        if(!tags.includes(tag)) setTags([...tags, tag]);
    }

    const deleteTag = (index) => {
        const deletedTags = tags.filter((_, i) => i === index);
        setTags(tags.filter((_, i) => i !== index));
        
        if(onDelete && deletedTags.length) { 
            onDelete(deletedTags[0]);
        }
    }

    const onKeyPress = (e) => {
        let tag = tagInput.trim();

        if (e.charCode === 13) {
            e.preventDefault();
            addTag(tag);
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

    const onBlur = () => {
        let tag = tagInput.trim();

        if(tag.length) {
            addTag(tag);
            setTagInput('');
        }
    }

    const tagStyle = {
        backgroundColor: tagBackgroundColor || 'mediumseagreen',
        border: `1px solid ${tagBackgroundColor || 'mediumseagreen'}`,
        color: tagColor || 'white'
    }

    const buttonStyle = {
        color: tagColor || 'white'
    }

    useEffect(() => {
        let mounted = true;
        if(onChange && mounted) onChange(tags);

        return () => { mounted = false; }
    }, [tags]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        let mounted = true;
        if(mounted) setTags(value);

        return () => { mounted = false; }
    }, [value]);
  
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
                placeholder={placeholder || "Enter a tag"}
                onChange={(e) => { setTagInput(e.target.value) }}
                onKeyPress={onKeyPress}
                onKeyUp={onKeyUp}
                onBlur={onBlur}
                list={datalistId}
            />
            <datalist id={datalistId}>
                {listData && listData.map((item, index) => <option key={index}>{item}</option>)}
            </datalist>
            
        </div>
    );
}

TagInput.propTypes = {
    name: PropTypes.string,
    placeholder: PropTypes.string,
    listData: PropTypes.array,
    tagBackgroundColor: PropTypes.string,
    tagColor: PropTypes.string,
    onChange: PropTypes.func,
    onDelete: PropTypes.func,
    value: PropTypes.array.isRequired
}

export default TagInput;